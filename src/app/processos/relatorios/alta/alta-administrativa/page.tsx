'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function AltaAdministrativa() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações Básicas
    data: new Date().toISOString().split('T')[0],
    
    // Dados do Paciente
    paciente: 'João Silva',
    idade: '8',
    responsavel: 'Maria Silva',
    diagnostico: 'TEA - Grau Leve',
    
    // Dados do Tratamento
    inicioTratamento: '2023-01-15',
    fimTratamento: '2024-01-15',
    frequencia: 'Duas vezes por semana',
    totalSessoes: '48 sessões realizadas',
    duracaoSessoes: '45 minutos',
    
    // Motivo da Alta Administrativa
    motivoAlta: `Motivo do Encerramento:
1. Faltas Consecutivas:
- Três faltas consecutivas sem justificativa
- Dificuldades de comparecimento nos horários agendados
- Tentativas de contato sem retorno

2. Questões Administrativas:
- Pendências financeiras
- Incompatibilidade de horários
- Mudança de cidade da família`,

    // Histórico do Tratamento
    historicoTratamento: `Histórico do Processo Terapêutico:
1. Período Inicial (3 meses):
- Boa adaptação ao setting terapêutico
- Participação ativa nas atividades
- Desenvolvimento de vínculo terapêutico

2. Período Intermediário (3 meses):
- Progresso consistente nos objetivos
- Boa resposta às intervenções
- Evolução na comunicação e interação

3. Período Final:
- Início das faltas frequentes
- Dificuldades de agenda
- Diminuição da frequência`,

    // Evolução e Objetivos
    evolucaoAlcancada: `Evolução Durante o Período de Atendimento:

1. Desenvolvimento Musical:
- Maior interesse por atividades musicais
- Exploração de instrumentos
- Participação em atividades rítmicas

2. Comunicação:
- Aumento do vocabulário funcional
- Melhora na expressão verbal
- Maior compreensão de comandos

3. Interação Social:
- Desenvolvimento do contato visual
- Participação em atividades grupais
- Melhora na reciprocidade social

4. Comportamento:
- Redução parcial de estereotipias
- Melhor regulação emocional
- Maior adaptabilidade`,

    objetivosAlcancados: `Objetivos Alcançados até o Momento:
1. Desenvolvimento inicial da comunicação verbal
2. Melhora na interação social básica
3. Redução parcial de comportamentos repetitivos
4. Início do desenvolvimento musical
5. Maior participação em atividades dirigidas`,

    objetivosPendentes: `Objetivos que Necessitam Continuidade:
1. Ampliação da comunicação verbal
2. Desenvolvimento de interações mais complexas
3. Trabalho continuado em regulação emocional
4. Aprofundamento das habilidades musicais
5. Generalização das habilidades adquiridas`,

    // Tentativas de Contato
    tentativasContato: `Registro de Tentativas de Contato:
1. Primeira Tentativa (DATA):
- Ligação telefônica
- Mensagem por WhatsApp
- E-mail enviado

2. Segunda Tentativa (DATA):
- Nova ligação
- Mensagem de texto
- Contato com responsável alternativo

3. Terceira Tentativa (DATA):
- Última tentativa de contato
- Notificação formal
- Prazo para retorno`,

    // Encaminhamentos
    encaminhamentos: `Encaminhamentos e Recomendações:
1. Continuidade do Tratamento:
- Indicação para novo profissional
- Sugestão de serviços próximos
- Opções de horários alternativos

2. Recomendações Terapêuticas:
- Manutenção das atividades musicais
- Continuidade do suporte terapêutico
- Acompanhamento multidisciplinar

3. Orientações à Família:
- Importância da continuidade
- Serviços disponíveis na região
- Possibilidade de retorno futuro`,

    observacoesFinais: `Observações Finais:
- Processo terapêutico interrompido antes da conclusão
- Necessidade de continuidade do tratamento
- Possibilidade de retorno ao serviço
- Importância do acompanhamento terapêutico
- Prognóstico reservado sem continuidade
- Disponibilidade para informações adicionais
- Documentação disponível quando solicitada`
  })

  // Estado para os dados do profissional
  const [profissional, setProfissional] = useState({
    nome: '',
    registro: ''
  })

  // Carrega os dados do profissional do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional)
      setProfissional({
        nome: data.nome || '',
        registro: data.registro || ''
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
    doc.text('Relatório de Alta Administrativa', 105, yPos, { align: 'center' })
    yPos += 15

    // Informações básicas
    doc.setFontSize(12)
    doc.text(`Data: ${formData.data}`, 20, yPos)
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
Responsável: ${formData.responsavel}
Diagnóstico: ${formData.diagnostico}
Início do Tratamento: ${formData.inicioTratamento}
Término do Tratamento: ${formData.fimTratamento}
Total de Sessões: ${formData.totalSessoes}`)

    // Adiciona todas as seções
    addSection('Motivo da Alta Administrativa', formData.motivoAlta)
    addSection('Histórico do Tratamento', formData.historicoTratamento)
    addSection('Evolução Alcançada', formData.evolucaoAlcancada)
    addSection('Objetivos Alcançados', formData.objetivosAlcancados)
    addSection('Objetivos Pendentes', formData.objetivosPendentes)
    addSection('Tentativas de Contato', formData.tentativasContato)
    addSection('Encaminhamentos', formData.encaminhamentos)
    addSection('Observações Finais', formData.observacoesFinais)

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

    // Salva o PDF
    doc.save(`Alta_Administrativa_${formData.data}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório de Alta Administrativa</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Data */}
          <div className="w-full sm:w-1/3">
            <Label className="text-sm sm:text-base">Data da Alta</Label>
            <Input
              type="date"
              value={formData.data}
              onChange={(e) => handleInputChange('data', e.target.value)}
              className="w-full"
            />
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
              <Label className="text-sm sm:text-base">Responsável</Label>
              <Input
                value={formData.responsavel}
                onChange={(e) => handleInputChange('responsavel', e.target.value)}
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

          {/* Dados do Tratamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Início do Tratamento</Label>
              <Input
                type="date"
                value={formData.inicioTratamento}
                onChange={(e) => handleInputChange('inicioTratamento', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Término do Tratamento</Label>
              <Input
                type="date"
                value={formData.fimTratamento}
                onChange={(e) => handleInputChange('fimTratamento', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Total de Sessões</Label>
              <Input
                value={formData.totalSessoes}
                onChange={(e) => handleInputChange('totalSessoes', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Seções de Texto */}
          <div className="space-y-4">
            {[
              { label: 'Motivo da Alta Administrativa', field: 'motivoAlta', rows: 8 },
              { label: 'Histórico do Tratamento', field: 'historicoTratamento', rows: 8 },
              { label: 'Evolução Alcançada', field: 'evolucaoAlcancada', rows: 10 },
              { label: 'Objetivos Alcançados', field: 'objetivosAlcancados', rows: 6 },
              { label: 'Objetivos Pendentes', field: 'objetivosPendentes', rows: 6 },
              { label: 'Tentativas de Contato', field: 'tentativasContato', rows: 8 },
              { label: 'Encaminhamentos e Recomendações', field: 'encaminhamentos', rows: 8 },
              { label: 'Observações Finais', field: 'observacoesFinais', rows: 6 }
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
