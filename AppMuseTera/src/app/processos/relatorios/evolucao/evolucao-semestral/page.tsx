'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function EvolucaoSemestral() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações do Período
    semestre: '1º Semestre 2024',
    periodoInicio: '2024-01-01',
    periodoFim: '2024-06-30',
    
    // Dados do Paciente
    paciente: 'João Silva',
    idade: '8',
    responsavel: 'Maria Silva',
    diagnostico: 'TEA - Grau Leve',
    
    // Dados do Tratamento
    frequencia: 'Duas vezes por semana',
    totalSessoes: '48 sessões realizadas',
    duracaoSessoes: '45 minutos',
    
    // Análise Comparativa
    analiseComparativa: `Comparação com período anterior:
1. Musicalidade:
- Aumento significativo na participação musical
- Maior exploração de instrumentos
- Desenvolvimento da percepção rítmica e melódica
- Melhor coordenação sonoro-motora
- Expansão do repertório musical

2. Comunicação:
- Ampliação do vocabulário funcional
- Maior uso de frases completas
- Melhora na prosódia da fala
- Aumento das iniciativas comunicativas
- Melhor compreensão de comandos complexos

3. Interação Social:
- Maior engajamento em atividades grupais
- Aumento do contato visual
- Melhora na reciprocidade social
- Desenvolvimento da atenção compartilhada
- Maior participação em jogos interativos`,

    // Evolução por Áreas
    evolucaoMusicalidade: `Desenvolvimento Musical:
- Domínio de ritmos mais complexos
- Exploração vocal mais elaborada
- Maior repertório de canções
- Melhor coordenação em atividades rítmicas
- Desenvolvimento da expressão musical
- Maior tempo de engajamento em atividades musicais
- Iniciativas próprias na criação musical`,

    evolucaoComunicacao: `Desenvolvimento da Comunicação:
- Aumento significativo do vocabulário
- Uso mais frequente de comunicação verbal
- Melhor articulação das palavras
- Maior compreensão de instruções
- Uso de frases mais complexas
- Maior expressão de necessidades e desejos
- Melhor prosódia na fala`,

    evolucaoSocial: `Desenvolvimento Social:
- Maior participação em atividades grupais
- Melhor interação com pares
- Aumento do contato visual
- Desenvolvimento da empatia
- Maior reciprocidade social
- Melhor compreensão de regras sociais
- Iniciativas de interação mais frequentes`,

    evolucaoComportamental: `Desenvolvimento Comportamental:
- Redução significativa de comportamentos repetitivos
- Melhor regulação emocional
- Maior flexibilidade nas rotinas
- Diminuição da ansiedade
- Comportamentos mais adaptativos
- Melhor tolerância a mudanças
- Maior independência nas atividades`,

    // Objetivos e Resultados
    objetivosAlcancados: `1. Desenvolvimento da comunicação verbal funcional
2. Aumento da participação em atividades grupais
3. Melhora significativa na coordenação motora
4. Desenvolvimento da expressão musical
5. Redução de comportamentos repetitivos
6. Maior autonomia nas atividades diárias
7. Melhor regulação emocional através da música
8. Expansão do repertório musical`,

    objetivosAndamento: `1. Ampliar complexidade da comunicação verbal
2. Desenvolver habilidades sociais mais elaboradas
3. Aprofundar exploração musical criativa
4. Aumentar tempo de atenção sustentada
5. Desenvolver narrativas musicais próprias
6. Expandir interações em grupos maiores
7. Trabalhar autorregulação em diferentes contextos
8. Desenvolver improvisação musical`,

    // Impacto e Generalização
    impactoFamiliar: `Observações da Família:
- Maior comunicação em casa
- Uso da música no dia a dia
- Melhor interação com irmãos
- Participação em atividades familiares
- Redução de crises comportamentais
- Maior independência nas rotinas
- Uso de música para autorregulação`,

    impactoEscolar: `Feedback Escolar:
- Melhor participação em sala
- Maior interação com colegas
- Aumento do tempo de atenção
- Melhor compreensão de instruções
- Participação em atividades musicais
- Redução de comportamentos disruptivos
- Maior engajamento acadêmico`,

    // Recomendações
    recomendacoesTerapeuticas: `Recomendações para Próximo Semestre:
1. Manter frequência atual das sessões
2. Aumentar complexidade das atividades musicais
3. Introduzir mais atividades em grupo
4. Expandir repertório musical
5. Integrar objetivos com equipe multidisciplinar
6. Manter envolvimento familiar
7. Desenvolver projetos musicais específicos
8. Trabalhar improvisação musical`,

    planejamentoProximo: `Planejamento para Próximo Semestre:
1. Introdução de instrumentos mais complexos
2. Atividades em grupos maiores
3. Projetos musicais colaborativos
4. Trabalho com composição musical
5. Integração sensorial através da música
6. Desenvolvimento de narrativas musicais
7. Exploração de diferentes gêneros musicais
8. Atividades de improvisação estruturada`
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
    doc.text('Relatório de Evolução Semestral', 105, yPos, { align: 'center' })
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
Total de Sessões: ${formData.totalSessoes}
Duração: ${formData.duracaoSessoes}`)

    // Adiciona todas as seções
    addSection('Análise Comparativa', formData.analiseComparativa)
    addSection('Evolução - Musicalidade', formData.evolucaoMusicalidade)
    addSection('Evolução - Comunicação', formData.evolucaoComunicacao)
    addSection('Evolução - Social', formData.evolucaoSocial)
    addSection('Evolução - Comportamental', formData.evolucaoComportamental)
    addSection('Objetivos Alcançados', formData.objetivosAlcancados)
    addSection('Objetivos em Andamento', formData.objetivosAndamento)
    addSection('Impacto Familiar', formData.impactoFamiliar)
    addSection('Impacto Escolar', formData.impactoEscolar)
    addSection('Recomendações Terapêuticas', formData.recomendacoesTerapeuticas)
    addSection('Planejamento para o Próximo Semestre', formData.planejamentoProximo)

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
    doc.save(`Evolucao_Semestral_${formData.semestre}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório de Evolução Semestral</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Período */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Semestre</Label>
              <Input
                value={formData.semestre}
                onChange={(e) => handleInputChange('semestre', e.target.value)}
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
              <Label className="text-sm sm:text-base">Total de Sessões</Label>
              <Input
                value={formData.totalSessoes}
                onChange={(e) => handleInputChange('totalSessoes', e.target.value)}
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
              { label: 'Análise Comparativa com Período Anterior', field: 'analiseComparativa', rows: 8 },
              { label: 'Evolução - Musicalidade', field: 'evolucaoMusicalidade', rows: 6 },
              { label: 'Evolução - Comunicação', field: 'evolucaoComunicacao', rows: 6 },
              { label: 'Evolução - Social', field: 'evolucaoSocial', rows: 6 },
              { label: 'Evolução - Comportamental', field: 'evolucaoComportamental', rows: 6 },
              { label: 'Objetivos Alcançados', field: 'objetivosAlcancados', rows: 6 },
              { label: 'Objetivos em Andamento', field: 'objetivosAndamento', rows: 6 },
              { label: 'Impacto no Ambiente Familiar', field: 'impactoFamiliar', rows: 6 },
              { label: 'Impacto no Ambiente Escolar', field: 'impactoEscolar', rows: 6 },
              { label: 'Recomendações Terapêuticas', field: 'recomendacoesTerapeuticas', rows: 6 },
              { label: 'Planejamento para o Próximo Semestre', field: 'planejamentoProximo', rows: 6 }
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
