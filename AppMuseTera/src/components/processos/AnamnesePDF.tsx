'use client'

import { Patient } from '@/types'
import { AnamneseQuestion, ANAMNESE_QUESTIONS } from '@/types/anamnese'
import jsPDF from 'jspdf'

interface AnamnesePDFProps {
  patient: Patient
  data: Record<string, string | string[]>
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

export function AnamnesePDF({ patient, data }: AnamnesePDFProps) {
  const handleDownload = async () => {
    try {
      // Carrega a logo
      const logoDataUrl = await loadImage('/MuseTera-logo.png')

      // Criar nova instância do PDF
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
            nome: profissionalData.nome || '',
            registro: profissionalData.registro || ''
          }
        }
      }

      // Adiciona a logo
      doc.addImage(logoDataUrl, 'PNG', 20, yPos - 5, 30, 15)

      // Título
      doc.setFontSize(18)
      doc.text('Anamnese Musicoterapêutica', doc.internal.pageSize.getWidth() / 2, yPos + 5, { align: 'center' })
      yPos += 15

      // Data e identificação
      doc.setFontSize(10)
      doc.text(new Date().toLocaleDateString('pt-BR'), doc.internal.pageSize.getWidth() - 20, yPos, { align: 'right' })
      yPos += 20

      // Dados do Paciente
      doc.setFontSize(14)
      doc.text('Dados do Paciente', 20, yPos)
      yPos += 10

      doc.setFontSize(12)
      doc.text(`Nome: ${patient?.nome || 'Não informado'}`, 20, yPos)
      yPos += 7
      doc.text(`Data de Nascimento: ${patient?.dataNascimento ? new Date(patient.dataNascimento).toLocaleDateString('pt-BR') : 'Não informado'} (${calculateAge(patient.dataNascimento)} anos)`, 20, yPos)
      yPos += 7
      doc.text(`Telefone: ${patient?.telefone ? formatPhoneNumber(patient.telefone) : 'Não informado'}`, 20, yPos)
      yPos += 7
      doc.text(`Status: ${patient?.status === 'active' ? 'Ativo' : 'Inativo'}`, 20, yPos)
      yPos += 15

      // Questões da Anamnese
      const questionsByCategory = ANAMNESE_QUESTIONS.reduce((acc, question) => {
        if (!acc[question.category]) {
          acc[question.category] = []
        }
        acc[question.category].push(question)
        return acc
      }, {} as Record<string, AnamneseQuestion[]>)

      Object.entries(questionsByCategory).forEach(([category, questions]) => {
        // Verifica se precisa adicionar nova página
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          yPos = 20
        }

        // Título da categoria
        doc.setFontSize(14)
        doc.text(translateCategory(category), 20, yPos)
        yPos += 10

        // Questões
        doc.setFontSize(12)
        questions.forEach(question => {
          // Verifica se precisa adicionar nova página
          if (yPos > doc.internal.pageSize.getHeight() - 40) {
            doc.addPage()
            yPos = 20
          }

          doc.setFont('helvetica', 'bold')
          doc.text(question.question, 20, yPos)
          yPos += 7

          doc.setFont('helvetica', 'normal')
          const resposta = formatValue(data?.[question.id])
          const linhas = doc.splitTextToSize(resposta, doc.internal.pageSize.getWidth() - 40)
          linhas.forEach((linha: string) => {
            if (yPos > doc.internal.pageSize.getHeight() - 20) {
              doc.addPage()
              yPos = 20
            }
            doc.text(linha, 20, yPos)
            yPos += 7
          })
          yPos += 3
        })
        yPos += 10
      })

      // Adicionar rodapé em todas as páginas
      const totalPages = doc.internal.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        addFooter(doc, profissionalInfo, i, totalPages)
      }

      // Salvar o PDF
      const filename = `anamnese_${patient.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`
      doc.save(filename)
      
      console.log('PDF gerado com sucesso:', filename)
      console.log('Dados do paciente:', patient) // Para debug
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar o PDF. Por favor, tente novamente.')
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
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

function translateCategory(category: string) {
  const translations: Record<string, string> = {
    dados_pessoais: 'Dados Pessoais e Familiares',
    historia_musical: 'História Musical',
    desenvolvimento: 'Desenvolvimento',
    comportamento: 'Comportamento',
    saude: 'Saúde',
    social: 'Aspectos Sociais',
    preferencias_musicais: 'Preferências Musicais'
  }
  return translations[category] || category
}

function formatValue(value: string | string[] | undefined): string {
  if (!value) return 'Não informado'
  if (Array.isArray(value)) return value.join(', ')
  return value
}

function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D+/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}

function addFooter(doc: jsPDF, profissionalInfo: { nome: string, registro: string }, currentPage: number, totalPages: number) {
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
  doc.text(`Página ${currentPage} de ${totalPages}`, pageWidth - 20, pageHeight - 10, { align: 'right' })
  
  doc.setTextColor(0) // Reset cor do texto
}

function calculateAge(birthDate: Date | string): number {
  if (typeof birthDate === 'string') {
    birthDate = new Date(birthDate)
  }
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}