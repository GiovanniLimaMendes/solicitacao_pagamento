import { NextResponse } from 'next/server';
import { db } from '@/app/database/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket, OkPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { erro: 'Todos os campos (nome, email, senha) são obrigatórios para o cadastro.' },
        { status: 400 }
      );
    }

    const [existingUsers] = await db.query<UserRow[]>(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { erro: 'Este e-mail já está cadastrado. Tente outro ou faça login.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const [insertResult] = await db.query<OkPacket>(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    const newUserId = insertResult.insertId;

    console.log(`Novo usuário cadastrado no DB com ID: ${newUserId}, Email: ${email}`);

    return NextResponse.json(
      {
        mensagem: 'Usuário cadastrado com sucesso!',
        usuario: { id: newUserId, nome, email }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro no handler de cadastro:', error);
    return NextResponse.json(
      { erro: 'Ocorreu um erro interno no servidor ao tentar cadastrar o usuário.' },
      { status: 500 }
    );
  }
}
