import { NextResponse } from 'next/server'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { SignUpData } from '@/types/auth'

export async function POST(request: Request) {
  try {
    const data: SignUpData = await request.json()

    // Validar dados
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { message: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Criar usuário no Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )

    // Atualizar perfil do usuário
    await updateProfile(userCredential.user, {
      displayName: data.name
    })

    // Remover senha do retorno
    const { password: _, ...userWithoutPassword } = {
      id: userCredential.user.uid,
      name: data.name,
      email: data.email,
      professionalRegister: data.professionalRegister
    }

    return NextResponse.json(userWithoutPassword)
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error)

    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}