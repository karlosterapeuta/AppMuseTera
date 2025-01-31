'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function ComunicacaoFamilia() {
  const router = useRouter()
  
  // Estado para os dados do formulário com valores preenchidos
  const [formData, setFormData] = useState({
    // Informações Básicas
    data: new Date().toISOString().split('T')[0],
    
    // Dados do Paciente
    paciente: 'João Silva',
    idade: '8',
    responsavel: 'Maria Silva',
    
    // Resumo do Período
    periodoAvaliado: 'Janeiro 2024',
    numeroSessoes: '8 sessões',
    
    // Atividades Realizadas
    atividadesRealizadas: `Principais Atividades:
1. Músicas e Canções:
- Canções de rotina e saudação
- Músicas com gestos e movimentos
- Canções preferidas do João

2. Instrumentos Musicais:
- Exploração do tambor e chocalho
- Atividades rítmicas simples
- Jogos musicais interativos

3. Brincadeiras Musicais:
- Dança e movimento
- Jogos de imitação
- Atividades de turno`,

    // Respostas e Participação
    respostasObservadas: `Como João Participou:
- Demonstrou interesse pelas músicas
- Sorriu durante as atividades
- Pegou instrumentos quando oferecidos
- Bateu palmas em alguns momentos
- Tentou imitar alguns gestos
- Manteve atenção por períodos curtos
- Demonstrou preferência por tambor`,

    // Evolução Observada
    progressos: `Avanços que Observamos:
1. Comunicação:
- Começou a vocalizar mais
- Tenta imitar algumas palavras
- Responde quando chamamos

2. Interação:
- Mais contato visual
- Aceita atividades em grupo
- Compartilha instrumentos

3. Comportamento:
- Mais calmo durante as sessões
- Menos resistente a mudanças
- Participa por mais tempo`,

    // Dicas para Casa
    dicasCasa: `Sugestões para Casa:
1. Músicas:
- Cantar músicas preferidas
- Usar música na rotina
- Fazer gestos junto com as canções

2. Brincadeiras:
- Dançar juntos
- Bater palmas no ritmo
- Usar instrumentos caseiros

3. Momentos do Dia:
- Na hora do banho
- Durante as refeições
- Antes de dormir`,

    // Orientações Específicas
    orientacoes: `Como Ajudar em Casa:
1. Rotina Musical:
- Escolher horários fixos
- Usar músicas calmas
- Repetir atividades preferidas

2. Comunicação:
- Esperar respostas
- Elogiar tentativas
- Usar gestos junto

3. Participação:
- Respeitar o tempo dele
- Começar com tempo curto
- Aumentar aos poucos`,

    // Próximos Passos
    proximosPassos: `O Que Vamos Trabalhar:
1. Comunicação:
- Mais palavras
- Sons de animais
- Pedidos simples

2. Interação:
- Atividades em dupla
- Jogos de turno
- Imitação

3. Música:
- Novos instrumentos
- Ritmos diferentes
- Canções com história`,

    // Observações Importantes
    observacoes: `Informações Importantes:
- Manter rotina das sessões
- Avisar faltas com antecedência
- Trazer água e toalha
- Usar roupas confortáveis
- Compartilhar mudanças observadas
- Informar alterações de medicação
- Manter contato pelo WhatsApp`,

    // Próximo Encontro
    proximoEncontro: `Próximas Sessões:
- Dias: Terças e Quintas
- Horário: 14:00
- Duração: 45 minutos
- Local: Sala de Musicoterapia`
  })

  // Estado para os dados do profissional
  const [profissional, setProfissional] = useState({
    nome: '',
    registro: '',
    contato: ''
  })

  // Carrega os dados do profissional do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional)
      setProfissional({
        nome: data.nome || '',
        registro: data.registro || '',
        contato: data.contato || ''
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
    doc.text('Comunicação com a Família', 105, yPos, { align: 'center' })
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
    addSection('Informações:', 
      `Paciente: ${formData.paciente}
Idade: ${formData.idade}
Responsável: ${formData.responsavel}
Período: ${formData.periodoAvaliado}
Sessões: ${formData.numeroSessoes}`)

    // Adiciona todas as seções
    addSection('Atividades Realizadas', formData.atividadesRealizadas)
    addSection('Como Foi a Participação', formData.respostasObservadas)
    addSection('Progressos Observados', formData.progressos)
    addSection('Sugestões para Casa', formData.dicasCasa)
    addSection('Como Ajudar em Casa', formData.orientacoes)
    addSection('Próximos Objetivos', formData.proximosPassos)
    addSection('Informações Importantes', formData.observacoes)
    addSection('Próximas Sessões', formData.proximoEncontro)

    // Adiciona contato do profissional
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
    doc.text(`Contato: ${profissional.contato}`, 105, yPos, { align: 'center' })

    // Salva o PDF
    doc.save(`Comunicacao_Familia_${formData.data}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Comunicação com a Família</h1>

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
              <Label className="text-sm sm:text-base">Responsável</Label>
              <Input
                value={formData.responsavel}
                onChange={(e) => handleInputChange('responsavel', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Período Avaliado</Label>
              <Input
                value={formData.periodoAvaliado}
                onChange={(e) => handleInputChange('periodoAvaliado', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Seções de Texto */}
          <div className="space-y-4">
            {[
              { label: 'Atividades Realizadas', field: 'atividadesRealizadas', rows: 8 },
              { label: 'Como Foi a Participação', field: 'respostasObservadas', rows: 6 },
              { label: 'Progressos Observados', field: 'progressos', rows: 8 },
              { label: 'Sugestões para Casa', field: 'dicasCasa', rows: 8 },
              { label: 'Como Ajudar em Casa', field: 'orientacoes', rows: 8 },
              { label: 'Próximos Objetivos', field: 'proximosPassos', rows: 8 },
              { label: 'Informações Importantes', field: 'observacoes', rows: 6 },
              { label: 'Próximas Sessões', field: 'proximoEncontro', rows: 4 }
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
