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

export default function RelatorioSessaoIndividual() {
  const router = useRouter()
  const [profissional, setProfissional] = useState({
    nome: '',
    registro: '',
    especialidade: 'Musicoterapeuta',
    formacao: '',
    email: '',
    telefone: ''
  })

  // Buscar dados do profissional do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional)
      setProfissional({
        nome: data.nome,
        registro: data.registro,
        especialidade: data.especialidade,
        formacao: data.especialidade, // usando especialidade como formação também
        email: data.email,
        telefone: data.telefone
      })
    }
  }, [])

  const [relatorio, setRelatorio] = useState({
    // Dados do Paciente
    paciente: '',
    idade: '',
    responsavel: '',
    
    // Dados da Sessão
    data: new Date().toISOString().split('T')[0],
    horario: '',
    numeroSessao: '',
    
    // Estado Geral
    estadoGeral: [] as string[],
    humorInicial: [] as string[],
    disposicao: [] as string[],
    estadoGeralOutros: '',
    humorInicialOutros: '',
    disposicaoOutros: '',
    
    // Objetivos da Sessão
    objetivosPrincipais: `1. Desenvolver habilidades de comunicação não-verbal através da interação musical
2. Promover autorregulação emocional através de experiências sonoro-musicais
3. Estimular a reciprocidade social e atenção compartilhada`,
    
    objetivosSecundarios: `1. Ampliar o tempo de permanência nas atividades propostas
2. Desenvolver habilidades motoras através de instrumentos musicais`,
    
    // Desenvolvimento da Sessão
    atividadesRealizadas: `1. Acolhimento e Check-in Musical (5 min)
   - Canção de chegada com violão
   - Reconhecimento do ambiente e instrumentos

2. Exploração Sonora Livre (10 min)
   - Exploração de instrumentos de percussão
   - Observação das preferências sonoras

3. Atividade de Interação Musical Estruturada (15 min)
   - Jogos de imitação rítmica
   - Revezamento de instrumentos
   - Canções com comandos simples

4. Momento de Regulação (10 min)
   - Audição musical receptiva
   - Técnicas de relaxamento com música

5. Fechamento (5 min)
   - Canção de despedida
   - Organização dos instrumentos`,
    
    recursosUtilizados: `Instrumentos Musicais:
- Violão
- Tambor
- Chocalhos
- Pau de chuva
- Metalofone
- Piano/Teclado

Outros Materiais:
- Tapete sensorial
- Lenços coloridos para movimento
- Sistema de som para audição musical
- Imagens de apoio visual para rotina`,
    
    // Respostas e Observações
    respostasMusicalidade: `Ritmo:
- Capacidade de acompanhar pulsação básica
- Resposta a mudanças de andamento
- Preferência por ritmos regulares

Melodia:
- Reconhecimento de melodias familiares
- Vocalizações espontâneas durante as músicas
- Resposta a diferentes alturas sonoras

Expressão Musical:
- Exploração de intensidades (forte/fraco)
- Escolha de instrumentos preferidos
- Momentos de produção sonora intencional`,
    
    respostasSocioEmocional: `Interação:
- Contato visual durante as canções
- Momentos de atenção compartilhada
- Participação em atividades de revezamento

Expressão Emocional:
- Demonstrações de prazer/desprazer
- Regulação através da música
- Comunicação de preferências

Autorregulação:
- Resposta a mudanças de atividade
- Uso da música para acalmar
- Tolerância a diferentes estímulos sonoros`,
    
    respostasComunicacao: `Verbal:
- Vocalizações durante as músicas
- Uso de palavras-chave das canções
- Pedidos ou escolhas verbais

Não-Verbal:
- Gestos e expressões faciais
- Linguagem corporal
- Uso de instrumentos para comunicar

Musicalidade Comunicativa:
- Iniciativas de interação musical
- Respostas a chamados musicais
- Imitação de padrões sonoros`,
    
    // Análise e Conclusões
    analiseComportamental: `O paciente demonstrou [boa/moderada] resposta às intervenções musicais, com destaque para:
- Padrões de interação durante as atividades musicais
- Respostas aos estímulos sonoro-musicais
- Comportamentos repetitivos e estereotipias
- Momentos de regulação e desregulação`,
    
    progressosObservados: `- Aumento no tempo de engajamento nas atividades
- Maior tolerância a mudanças na rotina musical
- Desenvolvimento na interação musical
- Ampliação do repertório comunicativo`,
    
    desafiosIdentificados: `- Manutenção da atenção em atividades estruturadas
- Transições entre atividades
- Flexibilidade no uso dos instrumentos
- Interação com novos elementos musicais`,
    
    // Plano para Próxima Sessão
    recomendacoes: `- Manter rotina musical estruturada
- Continuar trabalho de autorregulação através da música
- Incentivar escolhas e iniciativas musicais
- Usar suporte visual quando necessário`,
    
    planejamentoProximaSessao: `- Introduzir novas canções gradualmente
- Expandir tempo de atividades interativas
- Trabalhar alternância de instrumentos
- Focar na comunicação musical expressiva`,
    
    // Observações Adicionais
    observacoesGerais: `- Aspectos sensoriais observados durante a sessão
- Interesses específicos que podem ser incorporados
- Sugestões para equipe/família
- Necessidades de adaptação do ambiente`
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Formatar o relatório em texto
    const relatorioFormatado = `
RELATÓRIO DE SESSÃO INDIVIDUAL DE MUSICOTERAPIA

Data: ${relatorio.data}
Horário: ${relatorio.horario}
Sessão Nº: ${relatorio.numeroSessao}

IDENTIFICAÇÃO
Paciente: ${relatorio.paciente}
Idade: ${relatorio.idade}
Responsável: ${relatorio.responsavel}

ESTADO GERAL DO PACIENTE
Estado Geral: ${relatorio.estadoGeral.join(', ')}${relatorio.estadoGeralOutros ? '. ' + relatorio.estadoGeralOutros : ''}
Humor Inicial: ${relatorio.humorInicial.join(', ')}${relatorio.humorInicialOutros ? '. ' + relatorio.humorInicialOutros : ''}
Disposição: ${relatorio.disposicao.join(', ')}${relatorio.disposicaoOutros ? '. ' + relatorio.disposicaoOutros : ''}

OBJETIVOS DA SESSÃO
Principais:
${relatorio.objetivosPrincipais}

Secundários:
${relatorio.objetivosSecundarios}

DESENVOLVIMENTO DA SESSÃO
Atividades Realizadas:
${relatorio.atividadesRealizadas}

Recursos Utilizados:
${relatorio.recursosUtilizados}

RESPOSTAS E OBSERVAÇÕES

Musicalidade:
${relatorio.respostasMusicalidade}

Aspectos Socioemocionais:
${relatorio.respostasSocioEmocional}

Comunicação:
${relatorio.respostasComunicacao}

ANÁLISE E CONCLUSÕES
Análise Comportamental:
${relatorio.analiseComportamental}

Progressos Observados:
${relatorio.progressosObservados}

Desafios Identificados:
${relatorio.desafiosIdentificados}

PLANEJAMENTO
Recomendações:
${relatorio.recomendacoes}

Plano para Próxima Sessão:
${relatorio.planejamentoProximaSessao}

OBSERVAÇÕES ADICIONAIS
${relatorio.observacoesGerais}
`

    // Salvar no localStorage
    const relatorios = JSON.parse(localStorage.getItem('relatorios') || '[]')
    relatorios.push({
      id: Date.now(),
      tipo: 'sessao-individual',
      data: relatorio.data,
      paciente: relatorio.paciente,
      conteudo: relatorioFormatado
    })
    localStorage.setItem('relatorios', JSON.stringify(relatorios))

    // Redirecionar para a lista de relatórios
    router.push('/processos/relatorios/lista')
  }

  const handleExport = () => {
    const doc = new jsPDF()
    
    // Configurar fonte e tamanhos
    doc.setFont('helvetica')
    
    // Título
    doc.setFontSize(16)
    doc.text('RELATÓRIO DE SESSÃO INDIVIDUAL DE MUSICOTERAPIA', 105, 20, { align: 'center' })
    
    // Função auxiliar para adicionar texto com quebra de linha
    const addText = (text: string, y: number) => {
      const splitText = doc.splitTextToSize(text, 180)
      doc.text(splitText, 15, y)
      return y + (splitText.length * 7)
    }
    
    // Configurar fonte para o conteúdo
    doc.setFontSize(12)
    
    let yPos = 40 // Posição inicial Y
    
    // Dados da Sessão
    doc.setFont('helvetica', 'bold')
    yPos = addText(`Data: ${relatorio.data}`, yPos)
    yPos = addText(`Horário: ${relatorio.horario}`, yPos + 7)
    yPos = addText(`Sessão Nº: ${relatorio.numeroSessao}`, yPos + 7)
    
    // Identificação
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.text('IDENTIFICAÇÃO', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText(`Paciente: ${relatorio.paciente}`, yPos + 7)
    yPos = addText(`Idade: ${relatorio.idade}`, yPos + 7)
    yPos = addText(`Responsável: ${relatorio.responsavel}`, yPos + 7)
    
    // Estado Geral
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.text('ESTADO GERAL DO PACIENTE', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText(`Estado Geral: ${relatorio.estadoGeral.join(', ')}${relatorio.estadoGeralOutros ? '. ' + relatorio.estadoGeralOutros : ''}`, yPos + 7)
    yPos = addText(`Humor Inicial: ${relatorio.humorInicial.join(', ')}${relatorio.humorInicialOutros ? '. ' + relatorio.humorInicialOutros : ''}`, yPos + 7)
    yPos = addText(`Disposição: ${relatorio.disposicao.join(', ')}${relatorio.disposicaoOutros ? '. ' + relatorio.disposicaoOutros : ''}`, yPos + 7)
    
    // Objetivos
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.text('OBJETIVOS DA SESSÃO', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText('Principais:', yPos + 7)
    yPos = addText(relatorio.objetivosPrincipais, yPos + 7)
    yPos = addText('Secundários:', yPos + 7)
    yPos = addText(relatorio.objetivosSecundarios, yPos + 7)
    
    // Verificar se precisa de nova página
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    
    // Desenvolvimento
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.text('DESENVOLVIMENTO DA SESSÃO', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText('Atividades Realizadas:', yPos + 7)
    yPos = addText(relatorio.atividadesRealizadas, yPos + 7)
    yPos = addText('Recursos Utilizados:', yPos + 7)
    yPos = addText(relatorio.recursosUtilizados, yPos + 7)
    
    // Nova página para Respostas e Observações
    doc.addPage()
    yPos = 20
    
    // Respostas e Observações
    doc.setFont('helvetica', 'bold')
    doc.text('RESPOSTAS E OBSERVAÇÕES', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText('Musicalidade:', yPos + 7)
    yPos = addText(relatorio.respostasMusicalidade, yPos + 7)
    yPos = addText('Aspectos Socioemocionais:', yPos + 7)
    yPos = addText(relatorio.respostasSocioEmocional, yPos + 7)
    yPos = addText('Comunicação:', yPos + 7)
    yPos = addText(relatorio.respostasComunicacao, yPos + 7)
    
    // Nova página para Análise e Conclusões
    doc.addPage()
    yPos = 20
    
    // Análise e Conclusões
    doc.setFont('helvetica', 'bold')
    doc.text('ANÁLISE E CONCLUSÕES', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText('Análise Comportamental:', yPos + 7)
    yPos = addText(relatorio.analiseComportamental, yPos + 7)
    yPos = addText('Progressos Observados:', yPos + 7)
    yPos = addText(relatorio.progressosObservados, yPos + 7)
    yPos = addText('Desafios Identificados:', yPos + 7)
    yPos = addText(relatorio.desafiosIdentificados, yPos + 7)
    
    // Planejamento
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.text('PLANEJAMENTO', 15, yPos)
    doc.setFont('helvetica', 'normal')
    yPos = addText('Recomendações:', yPos + 7)
    yPos = addText(relatorio.recomendacoes, yPos + 7)
    yPos = addText('Plano para Próxima Sessão:', yPos + 7)
    yPos = addText(relatorio.planejamentoProximaSessao, yPos + 7)
    
    // Verificar se precisa de nova página para Observações Adicionais
    if (yPos > 230) {
      doc.addPage()
      yPos = 20
    }
    
    // Observações Adicionais
    if (relatorio.observacoesGerais && relatorio.observacoesGerais.trim() !== '') {
      yPos += 10
      doc.setFont('helvetica', 'bold')
      doc.text('OBSERVAÇÕES ADICIONAIS', 15, yPos)
      doc.setFont('helvetica', 'normal')
      yPos = addText(relatorio.observacoesGerais, yPos + 7)
    }
    
    // Verificar se precisa de nova página para assinatura
    if (yPos > 230) {
      doc.addPage()
      yPos = 20
    }
    
    // Rodapé com assinatura
    doc.setFont('helvetica', 'normal')
    const dataAtual = new Date().toLocaleDateString('pt-BR')
    yPos = doc.internal.pageSize.height - 40
    
    // Local e data
    doc.text(`Recife, ${dataAtual}`, 15, yPos)
    
    // Linha para assinatura
    doc.text('_'.repeat(50), 105, yPos + 15, { align: 'center' })
    
    // Dados do profissional - apenas nome e registro
    doc.setFontSize(10)
    doc.text([
      profissional.nome,
      `Registro: ${profissional.registro}`
    ], 105, yPos + 25, { align: 'center' })
    
    // Salvar o PDF
    const fileName = `Relatório_${relatorio.paciente.replace(/\s+/g, '_')}_${relatorio.data}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card className="bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          {/* Cabeçalho */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Relatório de Sessão Individual</h1>
            <p className="mt-1 text-sm text-gray-600">
              Preencha os dados da sessão de musicoterapia
            </p>
          </div>

          {/* Grid de 2 colunas para dados principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1 - Dados do Paciente */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="paciente" className="text-base">Dados do Paciente</Label>
                <Input
                  id="paciente"
                  value={relatorio.paciente}
                  onChange={(e) => setRelatorio({...relatorio, paciente: e.target.value})}
                  placeholder="Nome do Paciente"
                  className="mt-2"
                />
              </div>
              <div>
                <Input
                  id="idade"
                  value={relatorio.idade}
                  onChange={(e) => setRelatorio({...relatorio, idade: e.target.value})}
                  placeholder="Idade"
                />
              </div>
              <div>
                <Input
                  id="responsavel"
                  value={relatorio.responsavel}
                  onChange={(e) => setRelatorio({...relatorio, responsavel: e.target.value})}
                  placeholder="Nome do Responsável"
                />
              </div>
            </div>

            {/* Coluna 2 - Dados da Sessão */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="sessao" className="text-base">Dados da Sessão</Label>
                <Input
                  id="data"
                  type="date"
                  value={relatorio.data}
                  onChange={(e) => setRelatorio({...relatorio, data: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Input
                  id="horario"
                  type="time"
                  value={relatorio.horario}
                  onChange={(e) => setRelatorio({...relatorio, horario: e.target.value})}
                />
              </div>
              <div>
                <Input
                  id="numeroSessao"
                  type="number"
                  value={relatorio.numeroSessao}
                  onChange={(e) => setRelatorio({...relatorio, numeroSessao: e.target.value})}
                  placeholder="Número da Sessão"
                />
              </div>
            </div>
          </div>

          {/* Estado Geral - Layout em Cards */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Estado Geral do Paciente</h2>
            <div className="space-y-6">
              {/* Estado Geral */}
              <div>
                <Label htmlFor="estadoGeral">Estado Geral</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {OPCOES_ESTADO.map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      onClick={() => {
                        const novoEstado = relatorio.estadoGeral.includes(opcao)
                          ? relatorio.estadoGeral.filter(e => e !== opcao)
                          : [...relatorio.estadoGeral, opcao]
                        setRelatorio({...relatorio, estadoGeral: novoEstado})
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${relatorio.estadoGeral.includes(opcao)
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
                <Input
                  className="mt-2"
                  placeholder="Outras observações sobre o estado geral..."
                  value={relatorio.estadoGeralOutros}
                  onChange={(e) => setRelatorio({...relatorio, estadoGeralOutros: e.target.value})}
                />
              </div>

              {/* Humor Inicial */}
              <div>
                <Label htmlFor="humorInicial">Humor Inicial</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {OPCOES_HUMOR.map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      onClick={() => {
                        const novoHumor = relatorio.humorInicial.includes(opcao)
                          ? relatorio.humorInicial.filter(h => h !== opcao)
                          : [...relatorio.humorInicial, opcao]
                        setRelatorio({...relatorio, humorInicial: novoHumor})
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${relatorio.humorInicial.includes(opcao)
                          ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
                <Input
                  className="mt-2"
                  placeholder="Outras observações sobre o humor..."
                  value={relatorio.humorInicialOutros}
                  onChange={(e) => setRelatorio({...relatorio, humorInicialOutros: e.target.value})}
                />
              </div>

              {/* Disposição */}
              <div>
                <Label htmlFor="disposicao">Disposição</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {OPCOES_DISPOSICAO.map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      onClick={() => {
                        const novaDisposicao = relatorio.disposicao.includes(opcao)
                          ? relatorio.disposicao.filter(d => d !== opcao)
                          : [...relatorio.disposicao, opcao]
                        setRelatorio({...relatorio, disposicao: novaDisposicao})
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${relatorio.disposicao.includes(opcao)
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
                <Input
                  className="mt-2"
                  placeholder="Outras observações sobre a disposição..."
                  value={relatorio.disposicaoOutros}
                  onChange={(e) => setRelatorio({...relatorio, disposicaoOutros: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Objetivos da Sessão */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Objetivos da Sessão</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="objetivosPrincipais">Objetivos Principais</Label>
                <Textarea
                  id="objetivosPrincipais"
                  value={relatorio.objetivosPrincipais}
                  onChange={(e) => setRelatorio({...relatorio, objetivosPrincipais: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="objetivosSecundarios">Objetivos Secundários</Label>
                <Textarea
                  id="objetivosSecundarios"
                  value={relatorio.objetivosSecundarios}
                  onChange={(e) => setRelatorio({...relatorio, objetivosSecundarios: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Desenvolvimento da Sessão */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Desenvolvimento da Sessão</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="atividadesRealizadas">Atividades Realizadas</Label>
                <Textarea
                  id="atividadesRealizadas"
                  value={relatorio.atividadesRealizadas}
                  onChange={(e) => setRelatorio({...relatorio, atividadesRealizadas: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="recursosUtilizados">Recursos Utilizados</Label>
                <Textarea
                  id="recursosUtilizados"
                  value={relatorio.recursosUtilizados}
                  onChange={(e) => setRelatorio({...relatorio, recursosUtilizados: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Respostas e Observações */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Respostas e Observações</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="respostasMusicalidade">Musicalidade</Label>
                <Textarea
                  id="respostasMusicalidade"
                  value={relatorio.respostasMusicalidade}
                  onChange={(e) => setRelatorio({...relatorio, respostasMusicalidade: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="respostasSocioEmocional">Aspectos Socioemocionais</Label>
                <Textarea
                  id="respostasSocioEmocional"
                  value={relatorio.respostasSocioEmocional}
                  onChange={(e) => setRelatorio({...relatorio, respostasSocioEmocional: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="respostasComunicacao">Comunicação</Label>
                <Textarea
                  id="respostasComunicacao"
                  value={relatorio.respostasComunicacao}
                  onChange={(e) => setRelatorio({...relatorio, respostasComunicacao: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Análise e Conclusões */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Análise e Conclusões</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="analiseComportamental">Análise Comportamental</Label>
                <Textarea
                  id="analiseComportamental"
                  value={relatorio.analiseComportamental}
                  onChange={(e) => setRelatorio({...relatorio, analiseComportamental: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="progressosObservados">Progressos Observados</Label>
                <Textarea
                  id="progressosObservados"
                  value={relatorio.progressosObservados}
                  onChange={(e) => setRelatorio({...relatorio, progressosObservados: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="desafiosIdentificados">Desafios Identificados</Label>
                <Textarea
                  id="desafiosIdentificados"
                  value={relatorio.desafiosIdentificados}
                  onChange={(e) => setRelatorio({...relatorio, desafiosIdentificados: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Planejamento */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Planejamento</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="recomendacoes">Recomendações</Label>
                <Textarea
                  id="recomendacoes"
                  value={relatorio.recomendacoes}
                  onChange={(e) => setRelatorio({...relatorio, recomendacoes: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="planejamentoProximaSessao">Plano para Próxima Sessão</Label>
                <Textarea
                  id="planejamentoProximaSessao"
                  value={relatorio.planejamentoProximaSessao}
                  onChange={(e) => setRelatorio({...relatorio, planejamentoProximaSessao: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Observações Adicionais */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Observações Adicionais</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="observacoesGerais">Observações Gerais</Label>
                <Textarea
                  id="observacoesGerais"
                  value={relatorio.observacoesGerais}
                  onChange={(e) => setRelatorio({...relatorio, observacoesGerais: e.target.value})}
                  className="mt-2 w-full"
                  rows={4}
                  placeholder="Observações adicionais relevantes para o caso..."
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/processos/relatorios')}
            >
              Cancelar
            </Button>
            <Button 
              type="button"
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Exportar Relatório
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
