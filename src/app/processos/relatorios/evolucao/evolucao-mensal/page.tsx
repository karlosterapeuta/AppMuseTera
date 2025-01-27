'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function EvolucaoMensal() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações Básicas
    mesAno: new Date().toISOString().slice(0, 7), // YYYY-MM
    periodoInicio: '2024-01-01',
    periodoFim: '2024-01-31',
    
    // Dados do Paciente
    paciente: 'João Silva',
    idade: '8',
    responsavel: 'Maria Silva',
    diagnostico: 'TEA - Grau Leve',
    
    // Dados do Tratamento
    frequencia: 'Duas vezes por semana',
    numeroSessoes: '8 sessões realizadas',
    duracaoSessoes: '45 minutos',
    
    // Evolução por Áreas
    evolucaoMusicalidade: `Área Musical:
- Maior engajamento com instrumentos de percussão
- Desenvolvimento da percepção rítmica
- Participação ativa em atividades melódicas
- Exploração vocal mais frequente
- Manutenção do foco em atividades musicais por períodos mais longos`,

    evolucaoComunicacao: `Comunicação:
- Aumento do vocabulário funcional
- Maior frequência de iniciativas comunicativas
- Melhor compreensão de comandos musicais
- Uso mais consistente de gestos comunicativos
- Vocalizações mais intencionais durante as músicas`,

    evolucaoSocial: `Interação Social:
- Contato visual mais frequente e sustentado
- Participação mais ativa em atividades em grupo
- Maior reciprocidade nas interações
- Melhor compartilhamento de instrumentos
- Desenvolvimento da atenção compartilhada`,

    evolucaoComportamental: `Comportamento:
- Redução de comportamentos repetitivos
- Melhor autorregulação emocional
- Maior flexibilidade nas transições
- Diminuição da ansiedade
- Comportamento mais adaptativo`,

    // Objetivos Alcançados
    objetivosAlcancados: `1. Desenvolvimento da comunicação verbal através de canções
2. Aumento da participação em atividades musicais em grupo
3. Melhora na coordenação motora através de atividades rítmicas
4. Maior expressão emocional através da música
5. Desenvolvimento da atenção e foco`,

    // Objetivos em Andamento
    objetivosAndamento: `1. Ampliar repertório de comunicação verbal
2. Desenvolver interações mais complexas em grupo
3. Trabalhar autorregulação em diferentes contextos
4. Expandir repertório musical
5. Aprimorar habilidades de imitação`,

    // Aspectos Relevantes
    aspectosRelevantes: `- Família muito participativa e engajada no processo
- Boa adaptação à rotina terapêutica
- Interesse crescente por atividades musicais
- Generalização de algumas habilidades para outros contextos
- Feedback positivo da escola sobre progressos observados`,

    // Desafios e Estratégias
    desafiosEstrategias: `Desafios:
- Manter atenção em atividades mais longas
- Participação em atividades menos estruturadas
- Transições entre atividades

Estratégias:
- Uso de suporte visual para sequência de atividades
- Introdução gradual de novos elementos
- Adaptação das atividades conforme interesse`,

    // Recomendações
    recomendacoes: `1. Manter frequência atual das sessões
2. Continuar envolvimento familiar no processo
3. Integração com outros profissionais da equipe
4. Uso de músicas e atividades em casa
5. Manutenção do trabalho com comunicação e interação`,

    // Planejamento Próximo Mês
    planejamentoProximo: `1. Introdução de novas canções para estimulação da fala
2. Atividades em pequenos grupos (2-3 participantes)
3. Trabalho com instrumentos melódicos
4. Foco em atividades de imitação e turno
5. Desenvolvimento de narrativas musicais`
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
    doc.text('Relatório de Evolução Mensal', 105, yPos, { align: 'center' })
    yPos += 15

    // Informações básicas
    doc.setFontSize(12)
    doc.text(`Período: ${formData.periodoInicio} a ${formData.periodoFim}`, 20, yPos)
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
Frequência: ${formData.frequencia}
Sessões Realizadas: ${formData.numeroSessoes}
Duração: ${formData.duracaoSessoes}`)

    // Adiciona todas as seções
    addSection('Evolução - Musicalidade', formData.evolucaoMusicalidade)
    addSection('Evolução - Comunicação', formData.evolucaoComunicacao)
    addSection('Evolução - Social', formData.evolucaoSocial)
    addSection('Evolução - Comportamental', formData.evolucaoComportamental)
    addSection('Objetivos Alcançados', formData.objetivosAlcancados)
    addSection('Objetivos em Andamento', formData.objetivosAndamento)
    addSection('Aspectos Relevantes', formData.aspectosRelevantes)
    addSection('Desafios e Estratégias', formData.desafiosEstrategias)
    addSection('Recomendações', formData.recomendacoes)
    addSection('Planejamento para o Próximo Mês', formData.planejamentoProximo)

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
    doc.save(`Evolucao_Mensal_${formData.mesAno}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório de Evolução Mensal</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Período */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Mês/Ano</Label>
              <Input
                type="month"
                value={formData.mesAno}
                onChange={(e) => handleInputChange('mesAno', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Data Inicial</Label>
              <Input
                type="date"
                value={formData.periodoInicio}
                onChange={(e) => handleInputChange('periodoInicio', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Data Final</Label>
              <Input
                type="date"
                value={formData.periodoFim}
                onChange={(e) => handleInputChange('periodoFim', e.target.value)}
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
            <div className="w-full">
              <Label className="text-sm sm:text-base">Duração das Sessões</Label>
              <Input
                value={formData.duracaoSessoes}
                onChange={(e) => handleInputChange('duracaoSessoes', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Seções de Evolução */}
          <div className="space-y-4">
            {[
              { label: 'Evolução - Musicalidade', field: 'evolucaoMusicalidade', rows: 5 },
              { label: 'Evolução - Comunicação', field: 'evolucaoComunicacao', rows: 5 },
              { label: 'Evolução - Social', field: 'evolucaoSocial', rows: 5 },
              { label: 'Evolução - Comportamental', field: 'evolucaoComportamental', rows: 5 },
              { label: 'Objetivos Alcançados', field: 'objetivosAlcancados', rows: 4 },
              { label: 'Objetivos em Andamento', field: 'objetivosAndamento', rows: 4 },
              { label: 'Aspectos Relevantes', field: 'aspectosRelevantes', rows: 4 },
              { label: 'Desafios e Estratégias', field: 'desafiosEstrategias', rows: 5 },
              { label: 'Recomendações', field: 'recomendacoes', rows: 4 },
              { label: 'Planejamento para o Próximo Mês', field: 'planejamentoProximo', rows: 4 }
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
