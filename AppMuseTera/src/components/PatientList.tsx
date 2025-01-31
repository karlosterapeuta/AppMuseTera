'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline'

interface Patient {
  id: string
  name: string
  email: string | null
  phone: string | null
  status: string
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch('/api/patients')
        if (!response.ok) {
          throw new Error('Failed to fetch patients')
        }
        const data = await response.json()
        setPatients(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load patients')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatients()
  }, [])

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <div>Carregando pacientes...</div>
  if (error) return <div>Error: {error}</div>
  if (!patients.length) return <div>Nenhum paciente encontrado.</div>

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Barra de pesquisa e botão de adicionar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar pacientes..."
          className="flex-1 p-2 border rounded-lg w-full sm:w-auto text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href="/patients/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 w-full sm:w-auto"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Novo Paciente</span>
        </Link>
      </div>

      {/* Lista de pacientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.email || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.phone || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/patients/${patient.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
          {searchTerm 
            ? 'Nenhum paciente encontrado com este termo de busca'
            : 'Nenhum paciente cadastrado ainda'}
        </div>
      )}
    </div>
  )
}
