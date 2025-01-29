import { db } from './firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { Patient, Session } from '@/types/patient'

export async function getPatient(id: string): Promise<Patient | null> {
  try {
    const patientDoc = await getDoc(doc(db, 'patients', id))
    if (!patientDoc.exists()) {
      return null
    }
    return { id: patientDoc.id, ...patientDoc.data() } as Patient
  } catch (error) {
    console.error('Erro ao buscar paciente:', error)
    return null
  }
}

export async function getPatientSessions(patientId: string): Promise<Session[]> {
  try {
    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('patientId', '==', patientId)
    )
    const sessionsSnapshot = await getDocs(sessionsQuery)
    return sessionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Session[]
  } catch (error) {
    console.error('Erro ao buscar sessões:', error)
    return []
  }
}
