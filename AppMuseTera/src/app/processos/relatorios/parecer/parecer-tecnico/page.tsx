'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function ParecerTecnico() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações Básicas
    data: new Date().toISOString().split('T')[0],
    numeroProcesso: 'MT-2024/001',
    
    // Dados do Paciente
    paciente: 'João Silva',
    idade: '8',
    dataNascimento: '2016-03-15',
    diagnostico: 'TEA - Grau Leve',
    
    // Solicitante
    solicitante: 'Dra. Ana Santos - Neuropediatra',
    instituicao: 'Centro Médico Especializado',
    motivoSolicitacao: 'Avaliação do desenvolvimento neuropsicomotor e indicação terapêutica',
    
    // Histórico
    historicoClinico: `Histórico Clínico:

1. Antecedentes:
- Desenvolvimento neuropsicomotor com atrasos
- Atraso na aquisição da linguagem
- Comportamentos repetitivos desde 2 anos
- Seletividade alimentar

2. Intervenções Anteriores:
- Acompanhamento neuropediátrico desde 2022
- Fonoaudiologia (6 meses)
- Terapia Ocupacional (8 meses)
- Psicologia (em andamento)

3. Medicações:
- Risperidona 0,5mg
- Melatonina 3mg`,

    // Avaliação
    avaliacaoRealizada: `Avaliação Musicoterapêutica:

1. Metodologia:
- Avaliação inicial: 4 sessões
- Frequência: 2x por semana
- Duração: 45 minutos
- Protocolos utilizados: Perfil Musicoterapêutico e Escala de Desenvolvimento Musical

2. Instrumentos de Avaliação:
- Observação clínica estruturada
- Anamnese musicoterapêutica
- Protocolo de avaliação sonoro-musical
- Registro audiovisual
- Escalas de desenvolvimento`,

    // Aspectos Avaliados
    aspectosAvaliados: `Aspectos Avaliados:

1. Desenvolvimento Musical:
- Percepção sonora preservada
- Resposta a estímulos musicais
- Preferências sonoras definidas
- Memória musical presente

2. Aspectos Comunicativos:
- Comunicação não-verbal predominante
- Vocalizações espontâneas
- Compreensão de comandos simples
- Ecolalia presente

3. Aspectos Motores:
- Coordenação motora em desenvolvimento
- Ritmo e sincronização adequados
- Exploração instrumental presente
- Movimentação espontânea

4. Aspectos Cognitivos:
- Atenção seletiva presente
- Memória de trabalho preservada
- Capacidade de imitação
- Compreensão sequencial`,

    // Análise Técnica
    analiseTecnica: `Análise Técnica:

1. Fundamentação Teórica:
- Neurociência da música
- Musicoterapia neurológica
- Desenvolvimento infantil
- Processamento sensorial

2. Correlações Clínicas:
- Perfil sensorial
- Desenvolvimento neuropsicomotor
- Aspectos comportamentais
- Funções executivas

3. Evidências Observadas:
- Responsividade musical significativa
- Potencial comunicativo através da música
- Regulação comportamental com suporte musical
- Desenvolvimento social emergente`,

    // Conclusões
    conclusoes: `Conclusões:

1. Diagnóstico Musicoterapêutico:
- Responsividade musical preservada
- Potencial terapêutico significativo
- Indicação para intervenção sistemática
- Prognóstico favorável

2. Aspectos Favoráveis:
- Interesse por música
- Capacidade de imitação
- Memória musical
- Vínculo terapêutico

3. Aspectos Desafiadores:
- Regulação sensorial
- Comunicação verbal
- Interação social
- Comportamentos repetitivos`,

    // Recomendações
    recomendacoes: `Recomendações:

1. Intervenção Musicoterapêutica:
- Frequência: 2x por semana
- Duração: 45 minutos
- Abordagem: Musicoterapia Neurológica
- Metodologia: Individual

2. Objetivos Propostos:
- Desenvolvimento da comunicação
- Regulação sensorial
- Interação social
- Desenvolvimento motor

3. Suporte Adicional:
- Manutenção do acompanhamento multidisciplinar
- Orientação familiar
- Integração escolar
- Monitoramento médico`,

    // Considerações Finais
    consideracoesFinais: `Considerações Finais:
- Necessidade de intervenção sistemática
- Importância do trabalho interdisciplinar
- Envolvimento familiar no processo
- Monitoramento regular do desenvolvimento
- Reavaliação periódica dos objetivos
- Adaptação do plano conforme evolução
- Documentação contínua do processo`,

    // Referências
    referencias: `Referências Técnicas:

1. Bases Teóricas:
- Neurociência da Música (Thaut, 2014)
- Musicoterapia no TEA (Wigram, 2006)
- Desenvolvimento Infantil (Papalia, 2013)

2. Protocolos:
- Perfil Musicoterapêutico (Ferrari, 2018)
- Escala de Desenvolvimento Musical (Gattino, 2016)
- Avaliação Neurológica (Thaut, 2015)

3. Diretrizes:
- AMTA Guidelines (2020)
- UBAM - Diretrizes Brasileiras
- Protocolo TEA (Ministério da Saúde)`
  })

  // Estado para os dados do profissional
  const [profissional, setProfissional] = useState({
    nome: '',
    registro: '',
    especialidade: '',
    formacaoAdicional: ''
  })

  // Carrega os dados do profissional do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional)
      setProfissional({
        nome: data.nome || '',
        registro: data.registro || '',
        especialidade: data.especialidade || '',
        formacaoAdicional: data.formacaoAdicional || ''
      })
    }
  }, [])

  // Manipulador de mudanças nos campos
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF()
    let yPos = 20

    // Título
    doc.setFontSize(16)
    doc.text('Parecer Técnico Musicoterapêutico', 105, yPos, { align: 'center' })
    yPos += 15

    // Informações básicas
    doc.setFontSize(12)
    doc.text(`Data: ${formData.data}`, 20, yPos)
    doc.text(`Processo: ${formData.numeroProcesso}`, 120, yPos)
    yPos += 10

    // Função auxiliar para adicionar seções
    const addSection = (title: string, content: string) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(title, 20, yPos)
      yPos += 7
      doc.setFont('helvetica', 'normal')
      doc.text(content, 30, yPos, { maxWidth: 150 })
      yPos += doc.getTextDimensions(content, { maxWidth: 150 }).h + 10
    }

    // Dados do paciente
    addSection('Dados do Paciente:', 
      `Nome: ${formData.paciente}
Idade: ${formData.idade}
Data de Nascimento: ${formData.dataNascimento}
Diagnóstico: ${formData.diagnostico}
Solicitante: ${formData.solicitante}
Instituição: ${formData.instituicao}`)

    // Adiciona todas as seções
    addSection('Histórico Clínico', formData.historicoClinico)
    addSection('Avaliação Realizada', formData.avaliacaoRealizada)
    addSection('Aspectos Avaliados', formData.aspectosAvaliados)
    addSection('Análise Técnica', formData.analiseTecnica)
    addSection('Conclusões', formData.conclusoes)
    addSection('Recomendações', formData.recomendacoes)
    addSection('Considerações Finais', formData.consideracoesFinais)
    addSection('Referências', formData.referencias)

    // Adiciona assinatura do profissional
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    yPos += 10
    doc.text('_'.repeat(50), 65, yPos, { align: 'center' })
    yPos += 5
    doc.text(profissional.nome, 105, yPos, { align: 'center' })
    yPos += 5
    doc.text(`Musicoterapeuta - MT ${profissional.registro}`, 105, yPos, { align: 'center' })
    yPos += 5
    doc.text(profissional.especialidade, 105, yPos, { align: 'center' })
    if (profissional.formacaoAdicional) {
      yPos += 5
      doc.text(profissional.formacaoAdicional, 105, yPos, { align: 'center' })
    }

    // Salva o PDF
    doc.save(`Parecer_Tecnico_${formData.data}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Parecer Técnico Musicoterapêutico</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Data</Label>
              <Input
                type="date"
                value={formData.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Número do Processo</Label>
              <Input
                value={formData.numeroProcesso}
                onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Dados do Paciente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Nome do Paciente</Label>
              <Input
                value={formData.paciente}
                onChange={(e) => handleInputChange('paciente', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Idade</Label>
              <Input
                value={formData.idade}
                onChange={(e) => handleInputChange('idade', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Data de Nascimento</Label>
              <Input
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Diagnóstico</Label>
              <Input
                value={formData.diagnostico}
                onChange={(e) => handleInputChange('diagnostico', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Solicitante */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Solicitante</Label>
              <Input
                value={formData.solicitante}
                onChange={(e) => handleInputChange('solicitante', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Instituição</Label>
              <Input
                value={formData.instituicao}
                onChange={(e) => handleInputChange('instituicao', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full col-span-full">
              <Label className="text-sm sm:text-base">Motivo da Solicitação</Label>
              <Input
                value={formData.motivoSolicitacao}
                onChange={(e) => handleInputChange('motivoSolicitacao', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Seções de Texto */}
          <div className="space-y-4">
            {[
              { label: 'Histórico Clínico', field: 'historicoClinico', rows: 10 },
              { label: 'Avaliação Realizada', field: 'avaliacaoRealizada', rows: 10 },
              { label: 'Aspectos Avaliados', field: 'aspectosAvaliados', rows: 12 },
              { label: 'Análise Técnica', field: 'analiseTecnica', rows: 10 },
              { label: 'Conclusões', field: 'conclusoes', rows: 10 },
              { label: 'Recomendações', field: 'recomendacoes', rows: 10 },
              { label: 'Considerações Finais', field: 'consideracoesFinais', rows: 8 },
              { label: 'Referências', field: 'referencias', rows: 10 }
            ].map(({ label, field, rows }) => (
              <div key={field} className="w-full p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm sm:text-base font-medium mb-2">{label}</Label>
                <Textarea
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  rows={rows}
                  className="w-full min-h-[100px] text-sm sm:text-base mt-1"
                />
              </div>
            ))}
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={generatePDF}
              className="w-full sm:w-auto"
            >
              Gerar PDF
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
