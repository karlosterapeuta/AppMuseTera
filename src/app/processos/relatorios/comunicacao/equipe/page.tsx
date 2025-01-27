'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function ComunicacaoEquipe() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações Básicas
    data: new Date().toISOString().split('T')[0],
    
    // Dados do Paciente
    paciente: 'João Silva',
    idade: '8',
    diagnostico: 'TEA - Grau Leve',
    encaminhamento: 'Neuropediatra Dra. Ana Santos',
    
    // Período de Avaliação
    periodoAvaliado: 'Janeiro 2024',
    frequencia: 'Duas vezes por semana',
    numeroSessoes: '8 sessões realizadas',
    
    // Avaliação Musicoterapêutica
    avaliacaoMusical: `Avaliação Musicoterapêutica:

1. Aspectos Musicais:
- Responsividade significativa a estímulos sonoros
- Preferência por instrumentos de percussão
- Capacidade de manter padrões rítmicos simples
- Exploração vocal emergente
- Reconhecimento de melodias familiares

2. Aspectos Sensório-Motores:
- Coordenação motora adequada para manipulação de instrumentos
- Resposta positiva a estímulos vibro-acústicos
- Movimentação corporal sincronizada com ritmos simples
- Lateralidade em desenvolvimento
- Equilíbrio preservado durante atividades musicais`,

    // Intervenções e Metodologia
    intervencoes: `Intervenções Musicoterapêuticas:

1. Métodos Utilizados:
- Improvisação Musical Clínica
- Recriação Musical
- Composição Terapêutica
- Técnicas Receptivas

2. Abordagens Específicas:
- Musicoterapia Neurológica
- Técnicas de ISO Princípio
- Facilitação Rítmica
- Estimulação da Comunicação Musical

3. Recursos Terapêuticos:
- Instrumentos de Percussão
- Instrumentos Melódicos
- Material Sonoro-Musical
- Recursos Tecnológicos`,

    // Respostas e Comportamentos
    respostasComportamentais: `Respostas Comportamentais:

1. Aspectos Comunicativos:
- Aumento de vocalizações intencionais
- Maior reciprocidade comunicativa
- Iniciativas de interação sonoro-musical
- Compreensão de comandos musicais
- Expressão não-verbal aprimorada

2. Aspectos Sociais:
- Melhora no contato visual
- Maior tolerância à proximidade
- Participação em atividades grupais
- Compartilhamento de instrumentos
- Imitação de modelos musicais

3. Aspectos Comportamentais:
- Redução de comportamentos repetitivos
- Melhor regulação sensorial
- Maior tempo de permanência nas atividades
- Diminuição da resistência a mudanças
- Comportamentos mais adaptativos`,

    // Evolução Clínica
    evolucaoClinica: `Evolução Clínica:

1. Desenvolvimento Neuropsicomotor:
- Aprimoramento da coordenação motora
- Melhor integração sensorial
- Desenvolvimento da lateralidade
- Esquema corporal mais organizado

2. Desenvolvimento Cognitivo:
- Aumento do tempo de atenção
- Melhor processamento sequencial
- Maior capacidade de planejamento
- Memória musical preservada

3. Desenvolvimento Socioemocional:
- Maior expressão emocional
- Melhor autorregulação
- Interações mais apropriadas
- Vínculos mais consistentes`,

    // Objetivos Terapêuticos
    objetivosTerapeuticos: `Objetivos Terapêuticos:

1. Objetivos Primários:
- Desenvolvimento da comunicação verbal
- Ampliação da interação social
- Regulação sensorial e comportamental
- Desenvolvimento neuropsicomotor

2. Objetivos Específicos:
- Expansão do vocabulário funcional
- Aumento da reciprocidade social
- Redução de comportamentos estereotipados
- Melhora da coordenação motora

3. Metas em Andamento:
- Generalização das habilidades
- Ampliação do repertório musical
- Desenvolvimento da expressão verbal
- Autorregulação emocional`,

    // Correlações Clínicas
    correlacoesClincias: `Correlações Clínicas:

1. Aspectos Neurológicos:
- Processamento auditivo
- Integração sensorial
- Funções executivas
- Plasticidade neural

2. Aspectos Fonoaudiológicos:
- Desenvolvimento da linguagem
- Processamento auditivo
- Praxias orofaciais
- Comunicação funcional

3. Aspectos Ocupacionais:
- Coordenação motora
- Integração sensorial
- Planejamento motor
- Atividades funcionais`,

    // Recomendações
    recomendacoesTecnicas: `Recomendações Técnicas:

1. Intervenções Sugeridas:
- Manutenção do trabalho interdisciplinar
- Integração de abordagens terapêuticas
- Continuidade do suporte familiar
- Acompanhamento escolar

2. Adaptações Propostas:
- Uso de recursos visuais
- Adequação sensorial
- Rotinas estruturadas
- Comunicação alternativa

3. Orientações Específicas:
- Estratégias de regulação
- Suporte comportamental
- Estimulação cognitiva
- Desenvolvimento social`,

    // Observações Técnicas
    observacoesTecnicas: `Observações Técnicas Adicionais:
- Necessidade de avaliação audiológica
- Monitoramento do processamento sensorial
- Acompanhamento do desenvolvimento neuropsicomotor
- Avaliação periódica das funções executivas
- Observação da integração social
- Documentação sistemática dos progressos
- Reavaliação trimestral dos objetivos`,

    // Encaminhamentos
    encaminhamentos: `Encaminhamentos e Sugestões:
1. Avaliações Complementares:
- Processamento Auditivo
- Integração Sensorial
- Desenvolvimento Neuropsicomotor

2. Intervenções Sugeridas:
- Fonoaudiologia
- Terapia Ocupacional
- Psicologia

3. Acompanhamentos:
- Neuropediatria
- Psiquiatria Infantil
- Equipe Interdisciplinar`
  })

  // Estado para os dados do profissional
  const [profissional, setProfissional] = useState({
    nome: '',
    registro: '',
    especialidade: ''
  })

  // Carrega os dados do profissional do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional)
      setProfissional({
        nome: data.nome || '',
        registro: data.registro || '',
        especialidade: data.especialidade || ''
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
    doc.text('Relatório Técnico - Equipe Interdisciplinar', 105, yPos, { align: 'center' })
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
Diagnóstico: ${formData.diagnostico}
Encaminhamento: ${formData.encaminhamento}
Período: ${formData.periodoAvaliado}
Frequência: ${formData.frequencia}
Sessões: ${formData.numeroSessoes}`)

    // Adiciona todas as seções
    addSection('Avaliação Musicoterapêutica', formData.avaliacaoMusical)
    addSection('Intervenções Realizadas', formData.intervencoes)
    addSection('Respostas Comportamentais', formData.respostasComportamentais)
    addSection('Evolução Clínica', formData.evolucaoClinica)
    addSection('Objetivos Terapêuticos', formData.objetivosTerapeuticos)
    addSection('Correlações Clínicas', formData.correlacoesClincias)
    addSection('Recomendações Técnicas', formData.recomendacoesTecnicas)
    addSection('Observações Técnicas', formData.observacoesTecnicas)
    addSection('Encaminhamentos', formData.encaminhamentos)

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

    // Salva o PDF
    doc.save(`Relatorio_Tecnico_${formData.data}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório Técnico - Equipe Interdisciplinar</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Data */}
          <div className="w-full sm:w-1/3">
            <Label className="text-sm sm:text-base">Data</Label>
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
              <Label className="text-sm sm:text-base">Diagnóstico</Label>
              <Input
                value={formData.diagnostico}
                onChange={(e) => handleInputChange('diagnostico', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Encaminhamento</Label>
              <Input
                value={formData.encaminhamento}
                onChange={(e) => handleInputChange('encaminhamento', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Período */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Período Avaliado</Label>
              <Input
                value={formData.periodoAvaliado}
                onChange={(e) => handleInputChange('periodoAvaliado', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Frequência</Label>
              <Input
                value={formData.frequencia}
                onChange={(e) => handleInputChange('frequencia', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Número de Sessões</Label>
              <Input
                value={formData.numeroSessoes}
                onChange={(e) => handleInputChange('numeroSessoes', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Seções de Texto */}
          <div className="space-y-4">
            {[
              { label: 'Avaliação Musicoterapêutica', field: 'avaliacaoMusical', rows: 10 },
              { label: 'Intervenções Realizadas', field: 'intervencoes', rows: 10 },
              { label: 'Respostas Comportamentais', field: 'respostasComportamentais', rows: 10 },
              { label: 'Evolução Clínica', field: 'evolucaoClinica', rows: 10 },
              { label: 'Objetivos Terapêuticos', field: 'objetivosTerapeuticos', rows: 10 },
              { label: 'Correlações Clínicas', field: 'correlacoesClincias', rows: 10 },
              { label: 'Recomendações Técnicas', field: 'recomendacoesTecnicas', rows: 10 },
              { label: 'Observações Técnicas', field: 'observacoesTecnicas', rows: 6 },
              { label: 'Encaminhamentos', field: 'encaminhamentos', rows: 8 }
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
