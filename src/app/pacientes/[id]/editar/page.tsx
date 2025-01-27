'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Patient } from '@/types'
import { usePatients } from '@/hooks/usePatients'

export default function EditarPacientePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id
  const { patients, updatePatient } = usePatients()
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    telefone: '',
  })

  useEffect(() => {
    const patient = patients.find(p => p.id === id)
    if (patient) {
      setFormData({
        nome: patient.nome,
        dataNascimento: new Date(patient.dataNascimento).toISOString().split('T')[0],
        telefone: patient.telefone || '',
      })
    }
  }, [id, patients])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedPatient: Patient = {
      id: id as string,
      nome: formData.nome,
      dataNascimento: new Date(formData.dataNascimento),
      telefone: formData.telefone,
      therapistId: '1',
      status: 'active',
      createdAt: new Date()
    }

    updatePatient(updatedPatient)
    router.push('/pacientes')
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <Card>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="border-b pb-3">
            <h2 className="text-xl font-semibold">Editar Paciente</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
