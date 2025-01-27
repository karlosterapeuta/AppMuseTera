'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useSession } from 'next-auth/react';
import { pdf } from '@react-pdf/renderer';
import PDFReport from './components/PDFReport';

export default function RelatorioSessaoGrupo() {
  const { data: session } = useSession();
  const router = useRouter()
  const formRef = React.useRef<HTMLFormElement>(null)
  const [relatorio, setRelatorio] = React.useState({
    data: new Date().toLocaleDateString(),
    horario: new Date().toLocaleTimeString().slice(0, 5),
    numeroSessao: '1',
    participantes: [
      {
        nome: 'João Silva',
        idade: '8',
        responsavel: 'Maria Silva',
        diagnostico: 'TEA - Grau Leve',
        objetivosEspecificos: '- Desenvolver habilidades de comunicação verbal\n- Melhorar interação social\n- Trabalhar regulação sensorial'
      }
    ],
    estadoGeral: {
      Tranquilo: true,
      Agitado: false,
      Colaborativo: true,
      Resistente: false,
      Sonolento: false,
      Atento: true
    },
    humorInicial: {
      Alegre: true,
      Irritado: false,
      Neutro: false,
      Ansioso: false,
      Triste: false,
      Eufórico: false
    },
    disposicao: {
      Participativo: true,
      Disperso: false,
      Interativo: true,
      Isolado: false,
      Motivado: true,
      Desmotivado: false
    },
    objetivosPrincipais: '1. Desenvolvimento de habilidades sociais e comunicativas através da música\n2. Estimulação da expressão emocional\n3. Fortalecimento de vínculos grupais\n4. Desenvolvimento da atenção e foco',
    objetivosSecundarios: '1. Aprimoramento da coordenação motora\n2. Desenvolvimento da percepção musical\n3. Estímulo à criatividade\n4. Trabalho com ritmo e tempo musical',
    atividadesRealizadas: '1. Canção de abertura com instrumentos de percussão\n2. Atividade rítmica em grupo com tambores\n3. Improvisação musical livre com xilofone\n4. Momento de expressão corporal com música\n5. Relaxamento final com música suave',
    recursosUtilizados: 'Violão, tambores, chocalhos, pandeiros, xilofone, aparelho de som, colchonetes, bolas sensoriais',
    respostasMusicalidade: {
      percepcaoRitmica: 'Adequada, mantém ritmo básico',
      participacaoMusical: 'Ativa e entusiasmada',
      preferenciasInstrumentais: 'Tambor e chocalho',
      respostaSonora: 'Positiva, demonstra interesse',
      improvisacao: 'Em desenvolvimento, mais confiante'
    },
    respostasSocioEmocional: '- Boa interação com o grupo\n- Expressão emocional adequada através da música\n- Compartilhamento de instrumentos de forma colaborativa\n- Demonstra alegria durante as atividades musicais',
    respostasComunicacao: '- Comunicação verbal e não-verbal presente\n- Participação ativa nas atividades dialogadas\n- Boa expressão através dos instrumentos musicais\n- Responde adequadamente aos comandos musicais',
    analiseComportamental: '- Comportamento adequado durante toda a sessão\n- Boa resposta às intervenções propostas\n- Mantém atenção nas atividades por períodos apropriados\n- Segue instruções com facilidade',
    progressosObservados: '- Melhor integração com o grupo\n- Aumento da participação nas atividades musicais\n- Maior expressão emocional através da música\n- Desenvolvimento da coordenação rítmica',
    desafiosIdentificados: '- Manter o foco em atividades mais longas\n- Regular a intensidade sonora ao tocar instrumentos\n- Esperar sua vez nas atividades em grupo\n- Lidar com mudanças na rotina musical',
    recomendacoes: '- Continuar com atividades de integração grupal\n- Manter o trabalho com expressão musical\n- Introduzir gradualmente atividades mais complexas\n- Reforçar atividades de atenção compartilhada',
    planejamentoProximaSessao: '1. Atividades rítmicas em grupo com complexidade gradual\n2. Trabalho com canções temáticas sobre emoções\n3. Jogos musicais interativos\n4. Momentos de expressão livre com instrumentos variados'
  })

  // Obtém as informações do profissional da sessão
  const [profissional, setProfissional] = React.useState({
    nome: '',
    registro: ''
  });

  // Carrega os dados do profissional do localStorage
  React.useEffect(() => {
    const savedProfessional = localStorage.getItem('professional');
    if (savedProfessional) {
      const data = JSON.parse(savedProfessional);
      setProfissional({
        nome: data.nome || '',
        registro: data.registro || ''
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setRelatorio(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (section: string, field: string) => {
    setRelatorio(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }))
  }

  const handleParticipanteChange = (index: number, field: string, value: string) => {
    setRelatorio(prev => {
      const participantes = [...prev.participantes]
      participantes[index] = {
        ...participantes[index],
        [field]: value
      }
      return {
        ...prev,
        participantes
      }
    })
  }

  const addParticipante = () => {
    setRelatorio(prev => ({
      ...prev,
      participantes: [...prev.participantes, { nome: '', idade: '', responsavel: '', diagnostico: '', objetivosEspecificos: '' }]
    }))
  }

  const removeParticipante = (index: number) => {
    setRelatorio(prev => ({
      ...prev,
      participantes: prev.participantes.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(relatorio)
    // Aqui você pode enviar o relatório para a API
  }

  const handleExportPDF = async () => {
    try {
      // Mostrar dados do relatório no console
      console.log('Dados do Relatório:', {
        informacoesBasicas: {
          data: relatorio.data,
          horario: relatorio.horario,
          numeroSessao: relatorio.numeroSessao
        },
        participantes: relatorio.participantes,
        estadoGeral: relatorio.estadoGeral,
        humorInicial: relatorio.humorInicial,
        disposicao: relatorio.disposicao,
        objetivos: {
          principais: relatorio.objetivosPrincipais,
          secundarios: relatorio.objetivosSecundarios
        },
        atividades: {
          realizadas: relatorio.atividadesRealizadas,
          recursos: relatorio.recursosUtilizados
        },
        respostas: {
          musicalidade: relatorio.respostasMusicalidade,
          socioEmocional: relatorio.respostasSocioEmocional,
          comunicacao: relatorio.respostasComunicacao
        },
        analises: {
          comportamental: relatorio.analiseComportamental,
          progressos: relatorio.progressosObservados,
          desafios: relatorio.desafiosIdentificados
        },
        conclusoes: {
          recomendacoes: relatorio.recomendacoes,
          planejamento: relatorio.planejamentoProximaSessao
        },
        profissional: {
          nome: profissional.nome,
          registro: profissional.registro
        }
      });

      // Criar o documento PDF
      const blob = await pdf(
        <PDFReport relatorio={relatorio} profissional={profissional} />
      ).toBlob();

      // Criar URL do blob
      const url = URL.createObjectURL(blob);

      // Criar link temporário para download
      const link = document.createElement('a');
      link.href = url;
      link.download = `Relatorio_Sessao_${relatorio.numeroSessao}_${relatorio.data.replace(/\//g, '-')}.pdf`;
      
      // Simular clique para iniciar download
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-2 sm:p-4 md:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Relatório de Sessão em Grupo</h1>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            <div>
              <Label>Data</Label>
              <Input
                type="text"
                value={relatorio.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label>Horário</Label>
              <Input
                type="time"
                value={relatorio.horario}
                onChange={(e) => handleInputChange('horario', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label>Número da Sessão</Label>
              <Input
                type="text"
                value={relatorio.numeroSessao}
                onChange={(e) => handleInputChange('numeroSessao', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Participantes */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Participantes</Label>
              <Button
                type="button"
                onClick={addParticipante}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Adicionar Participante
              </Button>
            </div>

            {relatorio.participantes.map((participante, index) => (
              <Card key={index} className="p-2 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="col-span-1 sm:col-span-2 flex justify-between items-center">
                    <h3 className="font-semibold">Participante {index + 1}</h3>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeParticipante(index)}
                        variant="destructive"
                        size="sm"
                        className="text-xs sm:text-sm"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                  <div>
                    <Label>Nome</Label>
                    <Input
                      value={participante.nome}
                      onChange={(e) => handleParticipanteChange(index, 'nome', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Idade</Label>
                    <Input
                      value={participante.idade}
                      onChange={(e) => handleParticipanteChange(index, 'idade', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Responsável</Label>
                    <Input
                      value={participante.responsavel}
                      onChange={(e) => handleParticipanteChange(index, 'responsavel', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Diagnóstico</Label>
                    <Input
                      value={participante.diagnostico}
                      onChange={(e) => handleParticipanteChange(index, 'diagnostico', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <Label>Objetivos Específicos</Label>
                    <Textarea
                      value={participante.objetivosEspecificos}
                      onChange={(e) => handleParticipanteChange(index, 'objetivosEspecificos', e.target.value)}
                      className="w-full"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Estado Geral, Humor e Disposição */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Estado Geral */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Estado Geral</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(relatorio.estadoGeral).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => handleCheckboxChange('estadoGeral', key)}
                      id={`estadoGeral-${key}`}
                    />
                    <label
                      htmlFor={`estadoGeral-${key}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Humor Inicial */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Humor Inicial</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(relatorio.humorInicial).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => handleCheckboxChange('humorInicial', key)}
                      id={`humorInicial-${key}`}
                    />
                    <label
                      htmlFor={`humorInicial-${key}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Disposição */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Disposição</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(relatorio.disposicao).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => handleCheckboxChange('disposicao', key)}
                      id={`disposicao-${key}`}
                    />
                    <label
                      htmlFor={`disposicao-${key}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Objetivos e Atividades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Objetivos Principais</Label>
              <Textarea
                value={relatorio.objetivosPrincipais}
                onChange={(e) => handleInputChange('objetivosPrincipais', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Objetivos Secundários</Label>
              <Textarea
                value={relatorio.objetivosSecundarios}
                onChange={(e) => handleInputChange('objetivosSecundarios', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Atividades Realizadas</Label>
              <Textarea
                value={relatorio.atividadesRealizadas}
                onChange={(e) => handleInputChange('atividadesRealizadas', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Recursos Utilizados</Label>
              <Textarea
                value={relatorio.recursosUtilizados}
                onChange={(e) => handleInputChange('recursosUtilizados', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
          </div>

          {/* Respostas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Respostas Socioemocionais</Label>
              <Textarea
                value={relatorio.respostasSocioEmocional}
                onChange={(e) => handleInputChange('respostasSocioEmocional', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Respostas de Comunicação</Label>
              <Textarea
                value={relatorio.respostasComunicacao}
                onChange={(e) => handleInputChange('respostasComunicacao', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
          </div>

          {/* Análises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Análise Comportamental</Label>
              <Textarea
                value={relatorio.analiseComportamental}
                onChange={(e) => handleInputChange('analiseComportamental', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Progressos Observados</Label>
              <Textarea
                value={relatorio.progressosObservados}
                onChange={(e) => handleInputChange('progressosObservados', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Desafios Identificados</Label>
              <Textarea
                value={relatorio.desafiosIdentificados}
                onChange={(e) => handleInputChange('desafiosIdentificados', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <Label>Recomendações</Label>
              <Textarea
                value={relatorio.recomendacoes}
                onChange={(e) => handleInputChange('recomendacoes', e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
          </div>

          {/* Planejamento */}
          <div>
            <Label>Planejamento para Próxima Sessão</Label>
            <Textarea
              value={relatorio.planejamentoProximaSessao}
              onChange={(e) => handleInputChange('planejamentoProximaSessao', e.target.value)}
              className="w-full"
              rows={4}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto"
            >
              Salvar
            </Button>
            <Button
              type="button"
              onClick={handleExportPDF}
              className="w-full sm:w-auto"
            >
              Exportar PDF
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
