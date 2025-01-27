'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function AvaliacaoInicial() {
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
    telefone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
    endereco: 'Rua das Flores, 123 - Jardim Primavera',
    
    // Histórico
    queixaPrincipal: 'Dificuldades na comunicação verbal e interação social. Apresenta comportamentos repetitivos e interesse restrito em alguns assuntos.',
    historiaClinica: '- Diagnóstico de TEA aos 3 anos\n- Acompanhamento com fonoaudiólogo desde os 4 anos\n- Terapia ocupacional iniciada aos 5 anos\n- Sem intercorrências significativas na gestação e parto\n- Desenvolvimento neuropsicomotor com alguns atrasos',
    
    // Desenvolvimento
    desenvolvimentoMotor: '- Marcha independente aos 15 meses\n- Coordenação motora em desenvolvimento\n- Apresenta algumas estereotipias motoras\n- Boa motricidade fina\n- Consegue realizar atividades de vida diária com independência',
    
    desenvolvimentoLinguagem: '- Primeiras palavras aos 2 anos\n- Comunicação verbal limitada\n- Compreende comandos simples\n- Utiliza gestos para se comunicar\n- Ecolalia presente em algumas situações',
    
    desenvolvimentoCognitivo: '- Boa memória para assuntos de interesse\n- Foco de atenção seletivo\n- Compreende rotinas e sequências\n- Habilidades matemáticas preservadas\n- Interesse específico em números e letras',
    
    desenvolvimentoSocial: '- Interação social limitada com pares\n- Prefere brincar sozinho\n- Dificuldade em compartilhar interesses\n- Responde ao nome\n- Contato visual breve mas presente',
    
    // Aspectos Sensoriais
    sensibilidades: '- Hipersensibilidade auditiva a sons altos\n- Busca sensorial tátil\n- Seletividade alimentar moderada\n- Boa tolerância a diferentes texturas\n- Resposta positiva a estímulos visuais',
    
    // Aspectos Musicais
    experienciaMusical: '- Demonstra interesse por música\n- Reage positivamente a canções infantis\n- Gosta de instrumentos de percussão\n- Responde ritmicamente a músicas conhecidas\n- Sem experiência musical prévia estruturada',
    
    preferenciasMusicas: '- Músicas infantis com repetição\n- Canções com gestos\n- Sons de instrumentos de percussão\n- Melodias simples e previsíveis\n- Ritmos marcados e constantes',
    
    respostasMusicas: '- Sorri ao ouvir músicas preferidas\n- Movimenta-se com o ritmo\n- Tenta imitar algumas palavras das canções\n- Demonstra interesse por instrumentos musicais\n- Mantém atenção em atividades musicais',
    
    // Objetivos e Recomendações
    objetivosTerapeuticos: '1. Desenvolver habilidades de comunicação verbal e não-verbal\n2. Estimular interação social através da música\n3. Trabalhar autorregulação emocional\n4. Ampliar repertório de interesses\n5. Desenvolver habilidades de atenção compartilhada',
    
    recomendacoes: '- Início imediato da musicoterapia\n- Sessões semanais de 45 minutos\n- Abordagem individual inicialmente\n- Possibilidade futura de terapia em grupo\n- Reavaliação após 3 meses',
    
    observacoesAdicionais: '- Paciente demonstrou boa receptividade durante a avaliação\n- Família muito engajada no processo terapêutico\n- Potencial significativo para desenvolvimento através da musicoterapia\n- Necessidade de trabalho integrado com outros profissionais'
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
    doc.text('Avaliação Inicial Musicoterapêutica', 105, yPos, { align: 'center' })
    yPos += 15

    // Informações básicas
    doc.setFontSize(12)
    doc.text(`Data: ${formData.data}    Horário: ${formData.horario}`, 20, yPos)
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
Data de Nascimento: ${formData.dataNascimento}
Idade: ${formData.idade}
Responsável: ${formData.responsavel}
Contato: ${formData.telefone}
Email: ${formData.email}
Endereço: ${formData.endereco}`)

    // Adiciona todas as seções
    addSection('Queixa Principal:', formData.queixaPrincipal)
    addSection('História Clínica:', formData.historiaClinica)
    addSection('Desenvolvimento Motor:', formData.desenvolvimentoMotor)
    addSection('Desenvolvimento da Linguagem:', formData.desenvolvimentoLinguagem)
    addSection('Desenvolvimento Cognitivo:', formData.desenvolvimentoCognitivo)
    addSection('Desenvolvimento Social:', formData.desenvolvimentoSocial)
    addSection('Aspectos Sensoriais:', formData.sensibilidades)
    addSection('Experiência Musical:', formData.experienciaMusical)
    addSection('Preferências Musicais:', formData.preferenciasMusicas)
    addSection('Respostas à Música:', formData.respostasMusicas)
    addSection('Objetivos Terapêuticos:', formData.objetivosTerapeuticos)
    addSection('Recomendações:', formData.recomendacoes)
    addSection('Observações Adicionais:', formData.observacoesAdicionais)

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
    doc.save(`Avaliacao_Inicial_${formData.data.replace(/\//g, '-')}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Avaliação Inicial Musicoterapêutica</h1>

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
              <Label className="text-sm sm:text-base">Data de Nascimento</Label>
              <Input
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
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
              <Label className="text-sm sm:text-base">Telefone</Label>
              <Input
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:col-span-2">
              <Label className="text-sm sm:text-base">Endereço</Label>
              <Input
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Seções de Textarea */}
          <div className="space-y-4">
            {[
              { label: 'Queixa Principal', field: 'queixaPrincipal', rows: 3 },
              { label: 'História Clínica', field: 'historiaClinica', rows: 4 },
              { label: 'Desenvolvimento Motor', field: 'desenvolvimentoMotor', rows: 4 },
              { label: 'Desenvolvimento da Linguagem', field: 'desenvolvimentoLinguagem', rows: 4 },
              { label: 'Desenvolvimento Cognitivo', field: 'desenvolvimentoCognitivo', rows: 4 },
              { label: 'Desenvolvimento Social', field: 'desenvolvimentoSocial', rows: 4 },
              { label: 'Sensibilidades e Aspectos Sensoriais', field: 'sensibilidades', rows: 4 },
              { label: 'Experiência Musical', field: 'experienciaMusical', rows: 4 },
              { label: 'Preferências Musicais', field: 'preferenciasMusicas', rows: 4 },
              { label: 'Respostas à Música', field: 'respostasMusicas', rows: 4 },
              { label: 'Objetivos Terapêuticos', field: 'objetivosTerapeuticos', rows: 4 },
              { label: 'Recomendações', field: 'recomendacoes', rows: 4 },
              { label: 'Observações Adicionais', field: 'observacoesAdicionais', rows: 4 }
            ].map(({ label, field, rows }) => (
              <div key={field} className="w-full">
                <Label className="text-sm sm:text-base font-medium mb-1">{label}</Label>
                <Textarea
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  rows={rows}
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
