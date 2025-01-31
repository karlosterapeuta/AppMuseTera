'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

const OPCOES_ESTADO = [
  'Calmo',
  'Agitado',
  'Sonolento',
  'Alerta',
  'Desorganizado',
  'Focado',
  'Disperso',
  'Colaborativo',
  'Resistente',
  'Ansioso'
]

const OPCOES_HUMOR = [
  'Alegre',
  'Tranquilo',
  'Irritado',
  'Choroso',
  'Entusiasmado',
  'Apático',
  'Agressivo',
  'Eufórico',
  'Triste',
  'Instável'
]

const OPCOES_DISPOSICAO = [
  'Participativo',
  'Interativo',
  'Observador',
  'Explorador',
  'Criativo',
  'Retraído',
  'Comunicativo',
  'Motivado',
  'Desinteressado',
  'Cooperativo'
]

export default function RelatorioEvolucaoDiaria() {
  const router = useRouter()
  
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    horario: new Date().toLocaleTimeString().slice(0, 5),
    paciente: 'João Silva',
    idade: '8',
    responsavel: 'Maria Silva',
    diagnostico: 'TEA - Grau Leve',
    estadoGeral: ['Calmo', 'Colaborativo', 'Focado'] as string[],
    humorInicial: ['Alegre', 'Tranquilo'] as string[],
    disposicao: ['Participativo', 'Interativo', 'Motivado'] as string[],
    objetivosSessao: '1. Desenvolvimento de habilidades comunicativas\n2. Estimulação da interação social\n3. Trabalho com regulação sensorial\n4. Fortalecimento de expressão emocional',
    atividadesRealizadas: '1. Canção de abertura com instrumentos de percussão\n2. Atividade rítmica com tambores\n3. Improvisação musical com xilofone\n4. Momento de expressão corporal\n5. Relaxamento com música suave',
    respostasMusicalidade: '- Boa percepção rítmica\n- Participação ativa nas atividades musicais\n- Demonstra preferência por instrumentos de percussão\n- Responde positivamente aos estímulos sonoros\n- Mantém atenção durante as atividades musicais',
    respostasSocioEmocional: '- Interação adequada com o terapeuta\n- Expressão emocional através da música\n- Demonstra prazer nas atividades\n- Compartilha instrumentos quando solicitado\n- Mantém contato visual apropriado',
    respostasComunicacao: '- Comunicação verbal e não-verbal presente\n- Responde aos comandos musicais\n- Inicia interações espontâneas\n- Utiliza gestos comunicativos\n- Vocaliza durante as atividades musicais',
    analiseComportamental: '- Comportamento adequado durante a sessão\n- Segue instruções com facilidade\n- Transições suaves entre atividades\n- Atenção sustentada apropriada\n- Autorregulação efetiva',
    progressosObservados: '- Aumento na participação musical\n- Melhor integração sensorial\n- Maior expressão verbal\n- Desenvolvimento da coordenação motora\n- Evolução na interação social',
    desafiosIdentificados: '- Manter foco em atividades mais longas\n- Aguardar sua vez em algumas atividades\n- Regular intensidade ao tocar instrumentos\n- Lidar com mudanças na rotina musical',
    observacoesGerais: '- Sessão produtiva e com boa evolução\n- Paciente demonstrou interesse e engajamento\n- Boa resposta às intervenções propostas\n- Família relata progressos em casa',
    planejamentoProximaSessao: '1. Continuar trabalho com percussão rítmica\n2. Introduzir novas canções temáticas\n3. Aumentar complexidade das atividades de interação\n4. Manter momentos de expressão livre'
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

  // Manipuladores de eventos
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }))
  }

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF()
    let yPos = 20

    // Título
    doc.setFontSize(16)
    doc.text('Relatório de Evolução Diária', 105, yPos, { align: 'center' })
    yPos += 15

    // Informações básicas
    doc.setFontSize(12)
    doc.text(`Data: ${formData.data}    Horário: ${formData.horario}`, 20, yPos)
    yPos += 10

    // Dados do paciente
    doc.text(`Paciente: ${formData.paciente}`, 20, yPos)
    yPos += 7
    doc.text(`Idade: ${formData.idade}    Responsável: ${formData.responsavel}`, 20, yPos)
    yPos += 7
    doc.text(`Diagnóstico: ${formData.diagnostico}`, 20, yPos)
    yPos += 10

    // Estado, humor e disposição
    doc.text('Estado Geral: ' + formData.estadoGeral.join(', '), 20, yPos)
    yPos += 7
    doc.text('Humor: ' + formData.humorInicial.join(', '), 20, yPos)
    yPos += 7
    doc.text('Disposição: ' + formData.disposicao.join(', '), 20, yPos)
    yPos += 10

    // Objetivos e atividades
    doc.text('Objetivos da Sessão:', 20, yPos)
    yPos += 7
    doc.text(formData.objetivosSessao, 30, yPos, { maxWidth: 150 })
    yPos += doc.getTextDimensions(formData.objetivosSessao, { maxWidth: 150 }).h + 7

    doc.text('Atividades Realizadas:', 20, yPos)
    yPos += 7
    doc.text(formData.atividadesRealizadas, 30, yPos, { maxWidth: 150 })
    yPos += doc.getTextDimensions(formData.atividadesRealizadas, { maxWidth: 150 }).h + 10

    // Respostas e análises
    const addSection = (title: string, content: string) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
      doc.text(title, 20, yPos)
      yPos += 7
      doc.text(content, 30, yPos, { maxWidth: 150 })
      yPos += doc.getTextDimensions(content, { maxWidth: 150 }).h + 10
    }

    addSection('Respostas Musicais:', formData.respostasMusicalidade)
    addSection('Respostas Socioemocionais:', formData.respostasSocioEmocional)
    addSection('Comunicação:', formData.respostasComunicacao)
    addSection('Análise Comportamental:', formData.analiseComportamental)
    addSection('Progressos:', formData.progressosObservados)
    addSection('Desafios:', formData.desafiosIdentificados)
    addSection('Observações Gerais:', formData.observacoesGerais)
    addSection('Planejamento:', formData.planejamentoProximaSessao)

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
    doc.save(`Evolucao_Diaria_${formData.data.replace(/\//g, '-')}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório de Evolução Diária</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
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
              <Label className="text-sm sm:text-base">Horário</Label>
              <Input
                type="time"
                value={formData.horario}
                onChange={(e) => handleInputChange('horario', e.target.value)}
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

          {/* Estado, Humor e Disposição */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium">Estado Geral</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OPCOES_ESTADO.map((opcao) => (
                  <label key={opcao} className="flex items-center space-x-2 text-sm sm:text-base">
                    <input
                      type="checkbox"
                      checked={formData.estadoGeral.includes(opcao)}
                      onChange={() => handleCheckboxChange('estadoGeral', opcao)}
                      className="rounded border-gray-300 w-4 h-4"
                    />
                    <span>{opcao}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium">Humor</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OPCOES_HUMOR.map((opcao) => (
                  <label key={opcao} className="flex items-center space-x-2 text-sm sm:text-base">
                    <input
                      type="checkbox"
                      checked={formData.humorInicial.includes(opcao)}
                      onChange={() => handleCheckboxChange('humorInicial', opcao)}
                      className="rounded border-gray-300 w-4 h-4"
                    />
                    <span>{opcao}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium">Disposição</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OPCOES_DISPOSICAO.map((opcao) => (
                  <label key={opcao} className="flex items-center space-x-2 text-sm sm:text-base">
                    <input
                      type="checkbox"
                      checked={formData.disposicao.includes(opcao)}
                      onChange={() => handleCheckboxChange('disposicao', opcao)}
                      className="rounded border-gray-300 w-4 h-4"
                    />
                    <span>{opcao}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Campos de texto */}
          <div className="space-y-3 sm:space-y-4">
            {[
              { label: 'Objetivos da Sessão', field: 'objetivosSessao' },
              { label: 'Atividades Realizadas', field: 'atividadesRealizadas' },
              { label: 'Respostas Musicais', field: 'respostasMusicalidade' },
              { label: 'Respostas Socioemocionais', field: 'respostasSocioEmocional' },
              { label: 'Comunicação', field: 'respostasComunicacao' },
              { label: 'Análise Comportamental', field: 'analiseComportamental' },
              { label: 'Progressos Observados', field: 'progressosObservados' },
              { label: 'Desafios Identificados', field: 'desafiosIdentificados' },
              { label: 'Observações Gerais', field: 'observacoesGerais' },
              { label: 'Planejamento para Próxima Sessão', field: 'planejamentoProximaSessao' }
            ].map(({ label, field }) => (
              <div key={field} className="w-full">
                <Label className="text-sm sm:text-base">{label}</Label>
                <Textarea
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  rows={3}
                  className="w-full min-h-[100px] text-sm sm:text-base"
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
