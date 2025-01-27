'use client'

import { Patient } from '@/types'
import jsPDF from 'jspdf'
import { ESCALA_DEMUCA } from '@/data/escalaDemuca'

// Interface para os dados da avaliação
type AvaliacaoValue = 'nao' | 'pouco' | 'muito'

interface AvaliacaoData {
  [key: string]: AvaliacaoValue
}

interface AvaliacaoPDFProps {
  patient: {
    nome: string
  }
  data: AvaliacaoData
  observacoes: string
}

// Função para classificar o desempenho
const classificarDesempenho = (percentual: number): string => {
  if (percentual >= 80) return 'Excelente'
  if (percentual >= 60) return 'Adequado'
  if (percentual >= 40) return 'Moderado'
  if (percentual >= 20) return 'Baixo'
  return 'Muito Baixo'
}

// Função para carregar imagem
const loadImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = url
  })
}

export function AvaliacaoPDF({ patient, data, observacoes }: AvaliacaoPDFProps) {
  const handleDownload = async () => {
    if (!patient?.nome) return

    try {
      // Carrega a logo
      const logoDataUrl = await loadImage('/MuseTera-logo.png')

      // Recupera os dados do profissional do localStorage
      const profissionalData = localStorage.getItem('professional')
      const profissional = profissionalData ? JSON.parse(profissionalData) : { nome: '', registro: '' }

      // Cria o documento PDF
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20
      let yPos = margin

      // Função auxiliar para verificar se precisa de nova página
      const checkNewPage = (requiredSpace: number) => {
        if (yPos + requiredSpace > pageHeight - margin) {
          doc.addPage()
          yPos = margin
          return true
        }
        return false
      }

      // Função para adicionar cabeçalho em cada página
      const addHeader = () => {
        // Adiciona a logo
        doc.addImage(logoDataUrl, 'PNG', margin, yPos - 5, 30, 15)
        
        // Data no canto superior direito
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        const dataAtual = new Date().toLocaleDateString('pt-BR')
        doc.text(dataAtual, pageWidth - margin, yPos + 5, { align: 'right' })
        
        yPos += 25
      }

      // Função para adicionar rodapé
      const addFooter = (pageNumber: number) => {
        const footerY = pageHeight - margin

        // Linha divisória
        doc.setDrawColor(200, 200, 200)
        doc.line(margin, footerY - 15, pageWidth - margin, footerY - 15)

        // Dados do profissional
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100) // Cinza
        
        // Nome e registro do profissional
        if (profissional.nome || profissional.registro) {
          doc.setFont('helvetica', 'normal')
          const profissionalText = `${profissional.nome}${profissional.registro ? ` - MT ${profissional.registro}` : ''}`
          doc.text(profissionalText, margin, footerY - 5)
        }

        // Número da página
        doc.text(`Página ${pageNumber}`, pageWidth - margin, footerY - 5, { align: 'right' })
        
        // Reseta a cor do texto para preto
        doc.setTextColor(0, 0, 0)
      }

      // Adiciona cabeçalho
      addHeader()

      // Título do documento
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('Avaliação Musicoterapêutica', pageWidth / 2, yPos, { align: 'center' })
      yPos += 20

      // Informações do paciente em uma caixa
      doc.setDrawColor(220, 220, 220)
      doc.setFillColor(250, 250, 250)
      const infoBoxHeight = 30
      doc.roundedRect(margin, yPos, pageWidth - 2 * margin, infoBoxHeight, 3, 3, 'FD')
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Paciente:', margin + 5, yPos + 12)
      doc.setFont('helvetica', 'normal')
      doc.text(patient.nome, margin + 50, yPos + 12)
      
      doc.setFont('helvetica', 'bold')
      doc.text('Data:', margin + 5, yPos + 24)
      doc.setFont('helvetica', 'normal')
      doc.text(new Date().toLocaleDateString('pt-BR'), margin + 50, yPos + 24)
      
      yPos += infoBoxHeight + 20

      // Título dos resultados
      checkNewPage(40)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Resultados da Escala de Avaliação TEA', pageWidth / 2, yPos, { align: 'center' })
      yPos += 15

      // Configurações da tabela
      const colWidths = {
        categoria: Math.max((pageWidth - 2 * margin) * 0.35, 70),
        pontos: 25,
        total: 25,
        percentual: 30,
        classificacao: 50
      }
      const rowHeight = 12
      const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0)
      const startX = (pageWidth - tableWidth) / 2

      // Função para desenhar linha da tabela
      const drawTableLine = (y: number) => {
        doc.setDrawColor(200, 200, 200)
        doc.line(startX, y, startX + tableWidth, y)
      }

      // Cabeçalho da tabela
      doc.setFillColor(240, 240, 240)
      doc.rect(startX, yPos, tableWidth, rowHeight, 'F')
      drawTableLine(yPos)
      drawTableLine(yPos + rowHeight)
      
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      let currentX = startX
      
      // Textos do cabeçalho
      const headers = [
        { text: 'Categoria', width: colWidths.categoria },
        { text: 'Pontos', width: colWidths.pontos },
        { text: 'Total', width: colWidths.total },
        { text: '%', width: colWidths.percentual },
        { text: 'Classificação', width: colWidths.classificacao }
      ]
      
      headers.forEach(header => {
        doc.text(header.text, currentX + 5, yPos + 8)
        doc.line(currentX, yPos, currentX, yPos + rowHeight)
        currentX += header.width
      })
      doc.line(currentX, yPos, currentX, yPos + rowHeight)
      
      yPos += rowHeight

      // Dados da tabela
      doc.setFont('helvetica', 'normal')
      let isGray = false
      
      ESCALA_DEMUCA.forEach(categoria => {
        if (checkNewPage(rowHeight)) {
          // Se adicionar nova página, redesenha o cabeçalho da tabela
          addHeader()
          yPos += 10
        }

        // Cor de fundo alternada
        if (isGray) {
          doc.setFillColor(248, 248, 248)
          doc.rect(startX, yPos, tableWidth, rowHeight, 'F')
        }
        isGray = !isGray

        const dadosCategoria: Record<string, string> = {}
        categoria.parametros.forEach(param => {
          const nomeParam = typeof param === 'string' ? param : param.nome
          dadosCategoria[nomeParam] = data[nomeParam]
        })

        const resultado = calcularResultadosCategoria(categoria.categoria, dadosCategoria)
        
        // Escreve os dados da linha
        currentX = startX
        
        // Categoria (com quebra de linha se necessário)
        const categoriaText = doc.splitTextToSize(categoria.categoria, colWidths.categoria - 10)
        const textHeight = categoriaText.length * 5
        const textY = yPos + (rowHeight - textHeight) / 2 + 5
        doc.text(categoriaText, currentX + 5, textY)
        currentX += colWidths.categoria
        
        // Outros dados
        const dados = [
          resultado.pontos.toString(),
          resultado.total.toString(),
          resultado.percentual.toFixed(1) + '%',
          classificarDesempenho(resultado.percentual)
        ]
        
        dados.forEach((valor, index) => {
          const width = [colWidths.pontos, colWidths.total, colWidths.percentual, colWidths.classificacao][index]
          doc.text(valor, currentX + 5, yPos + 8)
          doc.line(currentX, yPos, currentX, yPos + rowHeight)
          currentX += width
        })
        
        doc.line(currentX, yPos, currentX, yPos + rowHeight)
        drawTableLine(yPos + rowHeight)
        
        yPos += rowHeight
      })

      // Observações
      if (observacoes) {
        if (checkNewPage(60)) {
          addHeader()
        }
        yPos += 20
        
        // Caixa de observações
        doc.setDrawColor(220, 220, 220)
        doc.setFillColor(250, 250, 250)
        const obsBoxHeight = 50
        doc.roundedRect(margin, yPos, pageWidth - 2 * margin, obsBoxHeight, 3, 3, 'FD')
        
        doc.setFont('helvetica', 'bold')
        doc.text('Observações:', margin + 5, yPos + 12)
        doc.setFont('helvetica', 'normal')
        
        // Quebra o texto das observações em linhas
        const obsLines = doc.splitTextToSize(observacoes, pageWidth - 2 * margin - 10)
        doc.text(obsLines, margin + 5, yPos + 24)
      }

      // Adiciona rodapé em todas as páginas
      const totalPages = doc.internal.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        addFooter(i)
      }

      // Salva o PDF
      doc.save(`avaliacao_${patient.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Exportar PDF
    </button>
  )
}

// Função para calcular resultados por categoria
const calcularResultadosCategoria = (categoria: string, dados: Record<string, string>) => {
  let total = 0
  let pontos = 0
  
  // Pega a configuração da escala para a categoria
  const configCategoria = ESCALA_DEMUCA.find(c => c.categoria === categoria)
  if (!configCategoria) return { pontos: 0, total: 0, percentual: 0 }

  // Mapeia os parâmetros com seus multiplicadores
  const parametrosComMultiplicador = configCategoria.parametros.map(p => {
    if (typeof p === 'string') return { nome: p, multiplicador: 1 }
    return p
  })

  // Calcula os pontos
  parametrosComMultiplicador.forEach(param => {
    const valor = dados[param.nome]
    if (valor) {
      total += 2 * param.multiplicador // O total máximo possível
      
      let pontosBase = 0
      switch (valor) {
        case 'nao':
          pontosBase = configCategoria.escala.nao
          break
        case 'pouco':
          pontosBase = configCategoria.escala.pouco
          break
        case 'muito':
          pontosBase = configCategoria.escala.muito
          break
      }
      
      pontos += pontosBase * param.multiplicador
    }
  })

  const percentual = total > 0 ? (pontos / total) * 100 : 0
  return { pontos, total, percentual }
}
