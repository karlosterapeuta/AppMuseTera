'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function AltaTerapeutica() {
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
    fimTratamento: '2024-12-20',
    frequencia: 'Duas vezes por semana',
    totalSessoes: '96 sessões realizadas',
    duracaoSessoes: '45 minutos',
    
    // Histórico do Tratamento
    motivoEncaminhamento: `Paciente encaminhado para musicoterapia devido a:
- Dificuldades na comunicação verbal
- Desafios na interação social
- Comportamentos repetitivos
- Necessidade de regulação emocional
- Interesse especial por música`,

    avaliacaoInicial: `Avaliação inicial demonstrou:
1. Aspectos Musicais:
- Responsividade a estímulos sonoros
- Interesse por instrumentos de percussão
- Capacidade de manter ritmo simples
- Preferência por músicas infantis

2. Aspectos Comportamentais:
- Dificuldade em manter contato visual
- Comportamentos estereotipados frequentes
- Resistência a mudanças na rotina
- Comunicação verbal limitada`,

    // Evolução e Objetivos Alcançados
    evolucaoGeral: `Evolução ao longo do tratamento:

1. Desenvolvimento Musical:
- Domínio de diversos instrumentos
- Participação ativa em atividades musicais
- Desenvolvimento da expressão musical
- Ampliação do repertório musical
- Capacidade de improvisação

2. Comunicação:
- Aumento significativo do vocabulário
- Uso funcional da linguagem
- Melhor articulação verbal
- Iniciativas comunicativas espontâneas
- Expressão de necessidades e desejos

3. Interação Social:
- Melhora significativa no contato visual
- Participação em atividades grupais
- Desenvolvimento de habilidades sociais
- Maior reciprocidade nas interações
- Compreensão de regras sociais

4. Comportamento:
- Redução de comportamentos repetitivos
- Melhor regulação emocional
- Maior flexibilidade
- Comportamentos mais adaptativos
- Independência nas atividades`,

    objetivosAlcancados: `Objetivos Terapêuticos Alcançados:
1. Desenvolvimento da comunicação verbal funcional
2. Melhora significativa na interação social
3. Redução de comportamentos repetitivos
4. Desenvolvimento da expressão musical
5. Maior autonomia nas atividades diárias
6. Melhor regulação emocional
7. Participação efetiva em atividades grupais
8. Generalização das habilidades adquiridas`,

    // Impacto e Generalização
    impactoFamiliar: `Mudanças Observadas pela Família:
- Maior comunicação em ambiente familiar
- Participação em atividades familiares
- Melhor interação com irmãos
- Independência em rotinas diárias
- Uso da música como autorregulação
- Redução de crises comportamentais
- Melhor expressão de necessidades`,

    impactoEscolar: `Mudanças Observadas na Escola:
- Melhor desempenho acadêmico
- Maior participação em sala de aula
- Interação positiva com colegas
- Melhor compreensão de instruções
- Participação em atividades coletivas
- Comportamento mais adaptativo
- Uso funcional da comunicação`,

    // Critérios de Alta
    criteriosAlta: `Critérios para Alta Terapêutica:
1. Alcance dos objetivos terapêuticos propostos
2. Estabilidade nos ganhos terapêuticos
3. Generalização das habilidades
4. Autonomia nas atividades diárias
5. Desenvolvimento adequado da comunicação
6. Interação social satisfatória
7. Regulação emocional estabelecida
8. Feedback positivo da família e escola`,

    // Recomendações
    recomendacoesFuturas: `Recomendações Pós-Alta:
1. Manutenção de atividades musicais:
   - Aulas de música
   - Participação em coral
   - Prática de instrumentos

2. Atividades sociais:
   - Participação em grupos
   - Atividades esportivas
   - Eventos sociais

3. Acompanhamento:
   - Reavaliação semestral
   - Manutenção de outros atendimentos
   - Suporte escolar quando necessário

4. Estratégias para casa:
   - Rotina musical diária
   - Uso de música para autorregulação
   - Atividades de integração familiar`,

    observacoesFinais: `Observações Finais:
- Excelente resposta ao tratamento musicoterapêutico
- Desenvolvimento significativo em todas as áreas
- Boa generalização das habilidades adquiridas
- Suporte familiar consistente
- Prognóstico positivo para desenvolvimento contínuo
- Possibilidade de retorno se necessário
- Importância da manutenção das atividades musicais`
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
    doc.text('Relatório de Alta Terapêutica', 105, yPos, { align: 'center' })
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
    addSection('Motivo do Encaminhamento', formData.motivoEncaminhamento)
    addSection('Avaliação Inicial', formData.avaliacaoInicial)
    addSection('Evolução do Tratamento', formData.evolucaoGeral)
    addSection('Objetivos Alcançados', formData.objetivosAlcancados)
    addSection('Impacto no Ambiente Familiar', formData.impactoFamiliar)
    addSection('Impacto no Ambiente Escolar', formData.impactoEscolar)
    addSection('Critérios para Alta', formData.criteriosAlta)
    addSection('Recomendações Futuras', formData.recomendacoesFuturas)
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
    doc.save(`Alta_Terapeutica_${formData.data}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório de Alta Terapêutica</h1>

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
              { label: 'Motivo do Encaminhamento', field: 'motivoEncaminhamento', rows: 6 },
              { label: 'Avaliação Inicial', field: 'avaliacaoInicial', rows: 8 },
              { label: 'Evolução Geral do Tratamento', field: 'evolucaoGeral', rows: 12 },
              { label: 'Objetivos Alcançados', field: 'objetivosAlcancados', rows: 6 },
              { label: 'Impacto no Ambiente Familiar', field: 'impactoFamiliar', rows: 6 },
              { label: 'Impacto no Ambiente Escolar', field: 'impactoEscolar', rows: 6 },
              { label: 'Critérios para Alta', field: 'criteriosAlta', rows: 6 },
              { label: 'Recomendações Futuras', field: 'recomendacoesFuturas', rows: 8 },
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
