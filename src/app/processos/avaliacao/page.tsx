'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import { formatarData } from '@/utils/formatters'
import { ClipboardDocumentCheckIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { ResultadosGraficos } from '@/components/processos/ResultadosGraficos'
import { ESCALA_DEMUCA } from '@/data/escalaDemuca'
import { Logo } from '@/components/Logo'
import Image from 'next/image'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function AvaliacaoPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [avaliacoes, setAvaliacoes] = useState<Record<string, string>>({})
  const [observacoes, setObservacoes] = useState('')
  const pieChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const [gerando, setGerando] = useState(false)

  const gerarPDF = async () => {
    if (!selectedPatient) {
      alert('Por favor, selecione um paciente antes de gerar o PDF.')
      return
    }

    if (gerando) {
      return
    }

    try {
      setGerando(true)
      const doc = new jsPDF()

      // Configurações iniciais
      doc.setFont('helvetica')
      doc.setFontSize(16)

      // Título
      doc.setFontSize(20)
      doc.setTextColor(33, 33, 33)
      doc.text('ESCALA PARA AVALIAÇÃO TEA', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' })

      // Informações do paciente
      doc.setFontSize(12)
      doc.setTextColor(66, 66, 66)
      doc.text(`Paciente: ${selectedPatient.nome}`, 15, 60)
      doc.text(`Data de Nascimento: ${formatarData(selectedPatient.dataNascimento)}`, 15, 70)
      doc.text(`Data da Avaliação: ${new Date().toLocaleDateString('pt-BR')}`, 15, 80)

      // Adicionar resultados das avaliações
      let yPos = 100
      
      doc.setFontSize(14)
      doc.setTextColor(33, 33, 33)
      doc.text('Resultados da Avaliação', 15, yPos)
      yPos += 10

      ESCALA_DEMUCA.forEach((categoria) => {
        if (yPos > 250) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(12)
        doc.setTextColor(33, 33, 33)
        doc.text(categoria.categoria, 15, yPos)
        yPos += 10

        categoria.parametros.forEach(parametro => {
          if (yPos > 270) {
            doc.addPage()
            yPos = 20
          }

          const nomeParametro = typeof parametro === 'string' ? parametro : parametro.nome
          const resposta = avaliacoes[nomeParametro] || 'Não avaliado'

          doc.setFontSize(10)
          doc.setTextColor(66, 66, 66)
          doc.text(`${nomeParametro}: ${resposta.toUpperCase()}`, 20, yPos)
          yPos += 7
        })

        yPos += 5
      })

      // Adicionar observações
      if (observacoes) {
        if (yPos > 250) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(14)
        doc.setTextColor(33, 33, 33)
        doc.text('Observações:', 15, yPos)
        yPos += 10

        doc.setFontSize(10)
        doc.setTextColor(66, 66, 66)
        const observacoesLines = doc.splitTextToSize(observacoes, doc.internal.pageSize.getWidth() - 30)
        observacoesLines.forEach(line => {
          if (yPos > 270) {
            doc.addPage()
            yPos = 20
          }
          doc.text(line, 15, yPos)
          yPos += 7
        })
      }

      // Adicionar gráficos
      if (pieChartRef.current && barChartRef.current) {
        try {
          doc.addPage()

          const pieCanvas = await html2canvas(pieChartRef.current)
          const pieImgData = pieCanvas.toDataURL('image/png')
          doc.addImage(pieImgData, 'PNG', 15, 20, 180, 120)

          const barCanvas = await html2canvas(barChartRef.current)
          const barImgData = barCanvas.toDataURL('image/png')
          doc.addImage(barImgData, 'PNG', 15, 150, 180, 120)
        } catch (error) {
          console.error('Erro ao adicionar gráficos:', error)
        }
      }

      // Adicionar rodapé em todas as páginas
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        
        const pageHeight = doc.internal.pageSize.getHeight()
        doc.setFontSize(10)
        doc.setTextColor(128, 128, 128)
        
        // Linha horizontal
        doc.setDrawColor(200, 200, 200)
        doc.line(15, pageHeight - 25, doc.internal.pageSize.getWidth() - 15, pageHeight - 25)
        
        // Informações do profissional
        let profissionalInfo = { nome: '', registro: '' }
        const savedProfessional = localStorage.getItem('professional')
        if (savedProfessional) {
          const profissionalData = JSON.parse(savedProfessional)
          profissionalInfo = {
            nome: profissionalData.nome,
            registro: profissionalData.registro
          }
        }
        
        const footerText = [
          profissionalInfo.nome,
          `Musicoterapeuta - MT ${profissionalInfo.registro}`,
          `Página ${i} de ${pageCount}`
        ]
        
        footerText.forEach((text, index) => {
          const textWidth = doc.getStringUnitWidth(text) * 10 / doc.internal.scaleFactor
          const x = (doc.internal.pageSize.getWidth() - textWidth) / 2
          doc.text(text, x, pageHeight - 20 + (index * 5))
        })
      }

      // Salvar o PDF
      doc.save(`avaliacao_${selectedPatient.nome}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.')
    } finally {
      setGerando(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Escala para Avaliação TEA
          </h1>
          <div className="space-y-4">
            <PatientSelect
              onSelect={setSelectedPatient}
              selectedId={selectedPatient?.id}
              className="w-full"
            />
          </div>
        </div>

        {/* Formulário de Avaliação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ESCALA_DEMUCA.map((categoria, index) => (
            <Card key={index} className="p-4 sm:p-6 bg-white">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                {categoria.categoria}
              </h2>
              <div className="space-y-4">
                {categoria.parametros.map((parametro, pIndex) => {
                  const nomeParametro = typeof parametro === 'string' ? parametro : parametro.nome
                  return (
                    <div key={pIndex} className="space-y-2">
                      <label className="block text-sm sm:text-base font-medium text-gray-700">
                        {nomeParametro}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['nao', 'pouco', 'muito'].map((opcao) => (
                          <label
                            key={opcao}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={nomeParametro}
                              value={opcao}
                              checked={avaliacoes[nomeParametro] === opcao}
                              onChange={(e) => {
                                setAvaliacoes((prev) => ({
                                  ...prev,
                                  [nomeParametro]: e.target.value,
                                }))
                              }}
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm sm:text-base text-gray-700 capitalize">
                              {opcao}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Observações */}
        <Card className="p-4 sm:p-6 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Observações
          </h2>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full h-32 sm:h-40 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            placeholder="Digite suas observações aqui..."
          />
        </Card>

        {/* Resultados */}
        {Object.keys(avaliacoes).length > 0 && (
          <ResultadosGraficos
            avaliacoes={avaliacoes}
            pieChartRef={pieChartRef}
            barChartRef={barChartRef}
          />
        )}

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={() => {
              setAvaliacoes({})
              setObservacoes('')
              setSelectedPatient(null)
            }}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Limpar Formulário
          </button>
          <button
            onClick={gerarPDF}
            disabled={gerando || Object.keys(avaliacoes).length === 0}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            {gerando ? 'Gerando PDF...' : 'Gerar PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}