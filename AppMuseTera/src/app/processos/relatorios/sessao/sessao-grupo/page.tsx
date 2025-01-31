'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'

// Dynamic imports
const RelatorioForm = dynamic(
  () => import('./components/RelatorioForm'),
  { 
    loading: () => <div>Carregando formulário...</div>,
    ssr: false
  }
)

const PDFReport = dynamic(
  () => import('./components/PDFReport'),
  { ssr: false }
)

export default function RelatorioSessaoGrupo() {
  const { data: session } = useSession()
  const router = useRouter()
  const [relatorio, setRelatorio] = React.useState({
    data: new Date().toLocaleDateString(),
    horario: new Date().toLocaleTimeString().slice(0, 5),
    numeroSessao: '1',
    participantes: [
      {
        nome: '',
        idade: '',
        responsavel: '',
        diagnostico: '',
        objetivosEspecificos: ''
      }
    ],
    estadoGeral: {
      Tranquilo: false,
      Agitado: false,
      Colaborativo: false,
      Resistente: false,
      Sonolento: false,
      Atento: false
    },
    humorInicial: {
      Alegre: false,
      Irritado: false,
      Neutro: false,
      Ansioso: false,
      Triste: false,
      Eufórico: false
    },
    disposicao: {
      Participativo: false,
      Disperso: false,
      Interativo: false,
      Isolado: false,
      Motivado: false,
      Desmotivado: false
    },
    objetivosPrincipais: '',
    objetivosSecundarios: '',
    atividadesRealizadas: '',
    recursosUtilizados: '',
    respostasMusicalidade: {
      percepcaoRitmica: '',
      participacaoMusical: '',
      preferenciasInstrumentais: '',
      respostaSonora: '',
      improvisacao: ''
    },
    respostasSocioEmocional: '',
    respostasComunicacao: '',
    analiseComportamental: '',
    progressosObservados: '',
    desafiosIdentificados: '',
    recomendacoes: '',
    planejamentoProximaSessao: ''
  })

  const [profissional, setProfissional] = React.useState({
    nome: '',
    registro: ''
  })

  React.useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional)
      setProfissional({
        nome: data.nome || '',
        registro: data.registro || ''
      })
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setRelatorio(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (section: string, field: string) => {
    setRelatorio(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }))
  }

  const handleParticipanteChange = (index: number, field: string, value: string) => {
    setRelatorio(prev => {
      const participantes = [...prev.participantes]
      participantes[index] = {
        ...participantes[index],
        [field]: value
      }
      return {
        ...prev,
        participantes
      }
    })
  }

  const addParticipante = () => {
    setRelatorio(prev => ({
      ...prev,
      participantes: [...prev.participantes, { nome: '', idade: '', responsavel: '', diagnostico: '', objetivosEspecificos: '' }]
    }))
  }

  const removeParticipante = (index: number) => {
    setRelatorio(prev => ({
      ...prev,
      participantes: prev.participantes.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { PDFDocument } = await import('@react-pdf/renderer')
      const blob = await PDFDocument.create(
        <PDFReport relatorio={relatorio} profissional={profissional} />
      ).toBlob()
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Relatorio_Sessao_${relatorio.numeroSessao}_${relatorio.data.replace(/\//g, '-')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Relatório de Sessão em Grupo</h1>
      <RelatorioForm
        relatorio={relatorio}
        profissional={profissional}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onParticipanteChange={handleParticipanteChange}
        onAddParticipante={addParticipante}
        onRemoveParticipante={removeParticipante}
      />
    </div>
  )
}
