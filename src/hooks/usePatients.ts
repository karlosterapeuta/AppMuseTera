import { useState, useEffect } from 'react'
import { Patient } from '@/types'

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  const loadPatients = () => {
    try {
      const savedPatients = JSON.parse(localStorage.getItem('patients') || '[]')
      console.log('Pacientes carregados do localStorage:', savedPatients) // Debug log
      
      const formattedPatients = savedPatients.map((patient: any) => ({
        id: patient.id,
        nome: patient.nome,
        dataNascimento: new Date(patient.dataNascimento),
        telefone: patient.telefone || '',
        therapistId: patient.therapistId,
        status: patient.status,
        createdAt: new Date(patient.createdAt)
      }))

      console.log('Pacientes formatados:', formattedPatients) // Debug log
      setPatients(formattedPatients)
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error)
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

  const addPatient = (newPatient: Patient) => {
    const existingPatients = [...patients]
    const updatedPatients = [...existingPatients, newPatient]
    
    localStorage.setItem('patients', JSON.stringify(updatedPatients))
    window.dispatchEvent(new Event('patientsUpdated'))
  }

  const updatePatient = (updatedPatient: Patient) => {
    const existingPatients = [...patients]
    const index = existingPatients.findIndex(p => p.id === updatedPatient.id)
    
    if (index !== -1) {
      existingPatients[index] = updatedPatient
      localStorage.setItem('patients', JSON.stringify(existingPatients))
      window.dispatchEvent(new Event('patientsUpdated'))
    }
  }

  const deletePatient = (patientId: string) => {
    const existingPatients = patients.filter(p => p.id !== patientId)
    localStorage.setItem('patients', JSON.stringify(existingPatients))
    window.dispatchEvent(new Event('patientsUpdated'))
  }

  useEffect(() => {
    loadPatients()
    window.addEventListener('patientsUpdated', loadPatients)
    return () => window.removeEventListener('patientsUpdated', loadPatients)
  }, [])

  return {
    patients,
    loading,
    addPatient,
    updatePatient,
    deletePatient,
    refreshPatients: loadPatients
  }
}