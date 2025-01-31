'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

// Definição das áreas da escala DEMUCA
const AREAS_AVALIACAO = {
  musicalidade: {
    titulo: 'Musicalidade',
    itens: [
      'Percepção Rítmica',
      'Percepção Melódica',
      'Expressão Musical',
      'Coordenação Sonoro-Motora',
      'Atenção Musical'
    ]
  },
  comunicacao: {
    titulo: 'Comunicação',
    itens: [
      'Comunicação Verbal',
      'Comunicação Não-Verbal',
      'Interação Musical',
      'Expressão Vocal',
      'Compreensão de Comandos'
    ]
  },
  interacaoSocial: {
    titulo: 'Interação Social',
    itens: [
      'Contato Visual',
      'Atenção Compartilhada',
      'Participação em Grupo',
      'Reciprocidade Social',
      'Imitação'
    ]
  },
  comportamento: {
    titulo: 'Comportamento',
    itens: [
      'Estereotipias',
      'Autorregulação',
      'Flexibilidade',
      'Interesse Musical',
      'Comportamento Adaptativo'
    ]
  }
}

// Escala de pontuação
const ESCALA_PONTUACAO = [
  { valor: 1, descricao: 'Ausente/Muito Baixo' },
  { valor: 2, descricao: 'Baixo/Emergente' },
  { valor: 3, descricao: 'Moderado' },
  { valor: 4, descricao: 'Adequado' },
  { valor: 5, descricao: 'Excelente' }
]

export default function EscalaTEA() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações Básicas
    data: new Date().toISOString().split('T')[0],
    horario: new Date().toLocaleTimeString().slice(0, 5),
    
    // Dados do Paciente
    paciente: 'João Silva',
    dataNascimento: '2015-05-15',
    idade: '8',
    responsavel: 'Maria Silva',
    
    // Pontuações (exemplo preenchido)
    pontuacoes: {
      musicalidade: {
        'Percepção Rítmica': 3,
        'Percepção Melódica': 2,
        'Expressão Musical': 3,
        'Coordenação Sonoro-Motora': 2,
        'Atenção Musical': 3
      },
      comunicacao: {
        'Comunicação Verbal': 2,
        'Comunicação Não-Verbal': 3,
        'Interação Musical': 3,
        'Expressão Vocal': 2,
        'Compreensão de Comandos': 3
      },
      interacaoSocial: {
        'Contato Visual': 2,
        'Atenção Compartilhada': 2,
        'Participação em Grupo': 2,
        'Reciprocidade Social': 2,
        'Imitação': 3
      },
      comportamento: {
        'Estereotipias': 2,
        'Autorregulação': 2,
        'Flexibilidade': 2,
        'Interesse Musical': 4,
        'Comportamento Adaptativo': 3
      }
    },
    
    // Observações por área
    observacoes: {
      musicalidade: '- Demonstra interesse por ritmos simples e repetitivos\n- Responde bem a melodias familiares\n- Coordenação em desenvolvimento\n- Mantém atenção por períodos curtos\n- Explora instrumentos com curiosidade',
      comunicacao: '- Vocabulário limitado mas funcional\n- Usa gestos para se comunicar\n- Responde a chamados musicais\n- Vocaliza durante atividades preferidas\n- Compreende comandos simples',
      interacaoSocial: '- Contato visual breve mas presente\n- Compartilha alguns momentos musicais\n- Prefere atividades individuais\n- Interage quando motivado\n- Imita gestos simples',
      comportamento: '- Apresenta algumas estereotipias motoras\n- Busca música para autorregulação\n- Aceita mudanças graduais na rotina\n- Demonstra prazer em atividades musicais\n- Adapta-se bem ao setting terapêutico'
    },
    
    // Conclusões e Recomendações
    conclusaoGeral: 'O paciente demonstra potencial significativo para intervenção musicoterapêutica. Apresenta respostas positivas a estímulos musicais, especialmente rítmicos, e utiliza a música como meio de autorregulação. As áreas de maior necessidade são comunicação e interação social, onde a música pode ser uma ferramenta valiosa de desenvolvimento.',
    
    recomendacoes: '1. Sessões semanais de musicoterapia\n2. Foco inicial em atividades rítmicas e de atenção compartilhada\n3. Uso de instrumentos de percussão e canções estruturadas\n4. Gradual introdução de atividades em pequenos grupos\n5. Envolvimento familiar no processo terapêutico',
    
    planejamentoTerapeutico: '- Início com sessões individuais de 45 minutos\n- Utilização de instrumentos de interesse do paciente\n- Atividades focadas em comunicação e interação\n- Trabalho com músicas preferidas e familiares\n- Reavaliação após 3 meses de intervenção'
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

  // Manipulador de mudanças nas pontuações
  const handlePontuacaoChange = (area: string, item: string, valor: number) => {
    setFormData(prev => ({
      ...prev,
      pontuacoes: {
        ...prev.pontuacoes,
        [area]: {
          ...prev.pontuacoes[area],
          [item]: valor
        }
      }
    }))
  }

  // Manipulador de mudanças nas observações
  const handleObservacaoChange = (area: string, valor: string) => {
    setFormData(prev => ({
      ...prev,
      observacoes: {
        ...prev.observacoes,
        [area]: valor
      }
    }))
  }

  // Função para calcular média de uma área
  const calcularMediaArea = (area: string) => {
    const pontuacoes = Object.values(formData.pontuacoes[area])
    const soma = pontuacoes.reduce((acc, curr) => acc + curr, 0)
    return (soma / pontuacoes.length).toFixed(1)
  }

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF()
    let yPos = 20

    // Título
    doc.setFontSize(16)
    doc.text('Escala DEMUCA - Avaliação TEA', 105, yPos, { align: 'center' })
    yPos += 15

    // Informações básicas
    doc.setFontSize(12)
    doc.text(`Data: ${formData.data}    Horário: ${formData.horario}`, 20, yPos)
    yPos += 10

    // Dados do paciente
    doc.text(`Paciente: ${formData.paciente}`, 20, yPos)
    yPos += 7
    doc.text(`Data de Nascimento: ${formData.dataNascimento}    Idade: ${formData.idade}`, 20, yPos)
    yPos += 7
    doc.text(`Responsável: ${formData.responsavel}`, 20, yPos)
    yPos += 15

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

    // Adiciona resultados por área
    Object.keys(AREAS_AVALIACAO).forEach(area => {
      const areaTitle = AREAS_AVALIACAO[area].titulo
      const pontuacoes = AREAS_AVALIACAO[area].itens.map(item => 
        `${item}: ${formData.pontuacoes[area][item]}`
      ).join('\n')
      
      addSection(`${areaTitle} (Média: ${calcularMediaArea(area)})`, pontuacoes)
      addSection(`Observações - ${areaTitle}`, formData.observacoes[area])
    })

    // Adiciona conclusões e recomendações
    addSection('Conclusão Geral', formData.conclusaoGeral)
    addSection('Recomendações', formData.recomendacoes)
    addSection('Planejamento Terapêutico', formData.planejamentoTerapeutico)

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
    doc.save(`Escala_DEMUCA_${formData.data.replace(/\//g, '-')}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Escala DEMUCA - Avaliação TEA</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="data">Data</Label>
              <Input
                type="date"
                id="data"
                value={formData.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="horario">Horário</Label>
              <Input
                type="time"
                id="horario"
                value={formData.horario}
                onChange={(e) => handleInputChange('horario', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="paciente">Paciente</Label>
              <Input
                type="text"
                id="paciente"
                value={formData.paciente}
                onChange={(e) => handleInputChange('paciente', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                type="text"
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => handleInputChange('responsavel', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Áreas de Avaliação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {Object.entries(AREAS_AVALIACAO).map(([areaKey, area]) => (
          <Card key={areaKey} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-3">{area.titulo}</h2>
            <div className="space-y-6">
              {area.itens.map((item) => (
                <div key={item} className="space-y-3">
                  <Label className="block text-sm font-medium text-gray-700">{item}</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['nao', 'pouco', 'muito'].map((opcao) => (
                      <label 
                        key={opcao} 
                        className={`
                          flex items-center justify-center p-2.5 rounded-lg border cursor-pointer
                          ${formData.pontuacoes[areaKey]?.[item] === opcao 
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-600 ring-2 ring-indigo-200' 
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }
                          transition-all duration-200 ease-in-out
                        `}
                      >
                        <input
                          type="radio"
                          name={`${areaKey}.${item}`}
                          value={opcao}
                          checked={formData.pontuacoes[areaKey]?.[item] === opcao}
                          onChange={() => handlePontuacaoChange(areaKey, item, opcao)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium capitalize">
                          {opcao === 'nao' ? 'Não' : opcao}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Linha de Pontuação */}
              <div className="pt-4 border-t">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 mr-auto">Pontuação</span>
                  <div className="grid grid-cols-3 gap-3 w-[200px]">
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">2</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">1</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <Label htmlFor={`obs-${areaKey}`} className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </Label>
              <Textarea
                id={`obs-${areaKey}`}
                value={formData.observacoes[areaKey] || ''}
                onChange={(e) => handleObservacaoChange(areaKey, e.target.value)}
                className="w-full min-h-[100px] resize-y"
                placeholder="Adicione suas observações aqui..."
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Conclusão e Recomendações */}
      <div className="space-y-6 mb-8">
        <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-3">Conclusão Geral</h2>
          <Textarea
            value={formData.conclusaoGeral}
            onChange={(e) => handleInputChange('conclusaoGeral', e.target.value)}
            className="w-full min-h-[120px] resize-y"
            placeholder="Digite a conclusão geral da avaliação..."
          />
        </Card>

        <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-3">Recomendações</h2>
          <Textarea
            value={formData.recomendacoes}
            onChange={(e) => handleInputChange('recomendacoes', e.target.value)}
            className="w-full min-h-[120px] resize-y"
            placeholder="Digite as recomendações..."
          />
        </Card>
      </div>

      {/* Dados do Profissional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <Label htmlFor="profissional-nome">Nome do Profissional</Label>
          <Input
            id="profissional-nome"
            value={profissional.nome}
            onChange={(e) => setProfissional(prev => ({ ...prev, nome: e.target.value }))}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="profissional-registro">Registro Profissional</Label>
          <Input
            id="profissional-registro"
            value={profissional.registro}
            onChange={(e) => setProfissional(prev => ({ ...prev, registro: e.target.value }))}
            className="w-full"
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Voltar
        </Button>
        <Button
          type="button"
          onClick={generatePDF}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Exportar PDF
        </Button>
      </div>
    </div>
  )
}
