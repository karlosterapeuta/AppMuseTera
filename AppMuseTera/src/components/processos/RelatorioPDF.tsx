'use client'

import { Patient } from '@/types'
import jsPDF from 'jspdf'

interface RelatorioPDFProps {
  patient: Patient
  data: {
    objetivos: string[]
    atividades: string[]
    observacoes: string
    resultados: string
    plano: string
  }
}

export function RelatorioPDF({ patient, data }: RelatorioPDFProps) {
  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const doc = new jsPDF()
    let yPos = 20

    // Recuperar dados do musicoterapeuta
    let profissionalInfo = {
      nome: '',
      registro: ''
    }

    if (typeof window !== 'undefined') {
      const savedProfessional = localStorage.getItem('professional')
      if (savedProfessional) {
        const profissionalData = JSON.parse(savedProfessional)
        profissionalInfo = {
          nome: profissionalData.nome,
          registro: profissionalData.registro
        }
      }
    }

    // Função para adicionar o rodapé
    const addFooter = (pageNumber: number, totalPages: number) => {
      const pageHeight = doc.internal.pageSize.getHeight()
      const pageWidth = doc.internal.pageSize.getWidth()
      
      doc.setFontSize(8)
      doc.setTextColor(128)
      
      // Linha divisória
      doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20)
      
      // Informações do profissional
      doc.text(`Musicoterapeuta: ${profissionalInfo.nome}`, 20, pageHeight - 15)
      doc.text(`Registro Profissional: ${profissionalInfo.registro}`, 20, pageHeight - 10)
      
      // Número da página
      doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth - 20, pageHeight - 10, { align: 'right' })
      
      doc.setTextColor(0)
    }

    // Título
    doc.setFontSize(18)
    doc.text('Relatório de Sessão - Interação Musical', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 15

    // Data e identificação
    doc.setFontSize(10)
    doc.text(new Date().toLocaleDateString('pt-BR'), doc.internal.pageSize.getWidth() - 20, yPos, { align: 'right' })
    doc.text('MuseTera', doc.internal.pageSize.getWidth() - 20, yPos + 5, { align: 'right' })
    yPos += 20

    // Dados do Paciente
    doc.setFontSize(14)
    doc.text('Dados do Paciente', 20, yPos)
    yPos += 10
    
    doc.setFontSize(12)
    doc.text(`Nome: ${patient?.nome || 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Data de Nascimento: ${patient?.dataNascimento ? new Date(patient.dataNascimento).toLocaleDateString('pt-BR') : 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Telefone: ${patient?.telefone ? formatPhoneNumber(patient.telefone) : 'Não informado'}`, 20, yPos)
    yPos += 15

    // Objetivos Terapêuticos
    doc.setFontSize(14)
    doc.text('Objetivos Terapêuticos', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    data.objetivos.forEach(objetivo => {
      const linhas = doc.splitTextToSize(`• ${objetivo}`, 170)
      linhas.forEach((linha: string) => {
        if (yPos > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage()
          yPos = 20
        }
        doc.text(linha, 20, yPos)
        yPos += 7
      })
    })
    yPos += 10

    // Atividades Realizadas
    doc.setFontSize(14)
    doc.text('Atividades Realizadas', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    data.atividades.forEach(atividade => {
      const linhas = doc.splitTextToSize(`• ${atividade}`, 170)
      linhas.forEach((linha: string) => {
        if (yPos > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage()
          yPos = 20
        }
        doc.text(linha, 20, yPos)
        yPos += 7
      })
    })
    yPos += 10

    // Observações Clínicas
    if (yPos > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(14)
    doc.text('Observações Clínicas', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    const observacoesLinhas = doc.splitTextToSize(data.observacoes, 170)
    observacoesLinhas.forEach((linha: string) => {
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage()
        yPos = 20
      }
      doc.text(linha, 20, yPos)
      yPos += 7
    })
    yPos += 10

    // Resultados e Progresso
    if (yPos > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(14)
    doc.text('Resultados e Progresso', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    const resultadosLinhas = doc.splitTextToSize(data.resultados, 170)
    resultadosLinhas.forEach((linha: string) => {
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage()
        yPos = 20
      }
      doc.text(linha, 20, yPos)
      yPos += 7
    })
    yPos += 10

    // Plano para a Próxima Sessão
    if (yPos > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(14)
    doc.text('Plano para a Próxima Sessão', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    const planoLinhas = doc.splitTextToSize(data.plano, 170)
    planoLinhas.forEach((linha: string) => {
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage()
        yPos = 20
      }
      doc.text(linha, 20, yPos)
      yPos += 7
    })

    // Adicionar rodapé em todas as páginas
    const totalPages = doc.internal.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      addFooter(i, totalPages)
    }

    // Salvar o PDF
    doc.save(`relatorio_${patient?.nome ? patient.nome.toLowerCase().replace(/\s+/g, '_') : 'sem_nome'}.pdf`)
  }

  return (
    <button
      onClick={handleDownload}
      type="button"
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      Exportar PDF
    </button>
  )
}

function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D+/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}

export default RelatorioPDF
