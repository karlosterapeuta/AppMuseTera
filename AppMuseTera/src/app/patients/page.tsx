'use client'

import { useEffect, useState } from 'react'
import PatientList from '@/components/PatientList'

export default function PatientsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pacientes</h1>
      <PatientList />
    </div>
  )
}
