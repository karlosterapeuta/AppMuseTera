'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import { Logo } from '@/components/Logo'
import { TEMPLATES_RELATORIO } from '@/types/relatorio'
import { RelatorioPDF } from '@/components/processos/RelatorioPDF'

export default function RelatorioPage() {
  const template = TEMPLATES_RELATORIO.interacao_musical
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [relatorioData, setRelatorioData] = useState({
    objetivos: template.secoes.find(s => s.id === 'objetivos')?.opcoes || [],
    atividades: template.secoes.find(s => s.id === 'atividades')?.opcoes || [],
    observacoes: template.secoes.find(s => s.id === 'observacoes')?.valor || '',
    resultados: template.secoes.find(s => s.id === 'resultados')?.valor || '',
    plano: template.secoes.find(s => s.id === 'plano')?.valor || ''
  })
  const [editMode, setEditMode] = useState(false)

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar o relatório
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Logo size="sm" />
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{template.titulo}</h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {editMode ? 'Visualizar' : 'Editar'}
                  </button>
                  {selectedPatient && (
                    <RelatorioPDF 
                      patient={selectedPatient}
                      data={relatorioData}
                    />
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione o Paciente
                </label>
                <PatientSelect
                  onSelect={setSelectedPatient}
                  selectedId={selectedPatient?.id}
                  className="w-full"
                />
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Objetivos Terapêuticos</h2>
                  {editMode ? (
                    <div className="space-y-2">
                      {relatorioData.objetivos.map((objetivo, index) => (
                        <textarea
                          key={index}
                          value={objetivo}
                          onChange={(e) => {
                            const newObjetivos = [...relatorioData.objetivos]
                            newObjetivos[index] = e.target.value
                            setRelatorioData({ ...relatorioData, objetivos: newObjetivos })
                          }}
                          className="w-full p-2 border rounded-md"
                          rows={2}
                        />
                      ))}
                    </div>
                  ) : (
                    <ul className="list-disc pl-5 space-y-2">
                      {relatorioData.objetivos.map((objetivo, index) => (
                        <li key={index} className="text-gray-700">{objetivo}</li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividades Realizadas</h2>
                  {editMode ? (
                    <div className="space-y-2">
                      {relatorioData.atividades.map((atividade, index) => (
                        <textarea
                          key={index}
                          value={atividade}
                          onChange={(e) => {
                            const newAtividades = [...relatorioData.atividades]
                            newAtividades[index] = e.target.value
                            setRelatorioData({ ...relatorioData, atividades: newAtividades })
                          }}
                          className="w-full p-2 border rounded-md"
                          rows={2}
                        />
                      ))}
                    </div>
                  ) : (
                    <ul className="list-disc pl-5 space-y-2">
                      {relatorioData.atividades.map((atividade, index) => (
                        <li key={index} className="text-gray-700">{atividade}</li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Observações Clínicas</h2>
                  {editMode ? (
                    <textarea
                      value={relatorioData.observacoes}
                      onChange={(e) => setRelatorioData({ ...relatorioData, observacoes: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">{relatorioData.observacoes}</p>
                  )}
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Resultados e Progresso</h2>
                  {editMode ? (
                    <textarea
                      value={relatorioData.resultados}
                      onChange={(e) => setRelatorioData({ ...relatorioData, resultados: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">{relatorioData.resultados}</p>
                  )}
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Plano para a Próxima Sessão</h2>
                  {editMode ? (
                    <textarea
                      value={relatorioData.plano}
                      onChange={(e) => setRelatorioData({ ...relatorioData, plano: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">{relatorioData.plano}</p>
                  )}
                </section>

                {editMode && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
