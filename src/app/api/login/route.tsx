import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/database/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json();

    // 1. Validação simples
    if (!email || !senha) {
      return NextResponse.json({ erro: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // 2. Busca o usuário no banco
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if ((rows as any).length === 0) {
      return NextResponse.json({ erro: 'Usuário não encontrado' }, { status: 401 });
    }

    const usuario = (rows as any)[0];

    // 3. Compara a senha com o hash
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return NextResponse.json({ erro: 'Senha incorreta' }, { status: 401 });
    }

    // 4. Remove a senha antes de retornar
    const { senha: _, ...usuarioSemSenha } = usuario;

    // 5. Cria a resposta
    const response = NextResponse.json({ usuario: usuarioSemSenha });

    // 6. Define cookies seguros (somente backend pode ler)
    response.cookies.set('usuario_id', String(usuario.id), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    response.cookies.set('usuario_nome', String(usuario.nome), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    response.cookies.set('usuario_email', String(usuario.email), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    console.error('Erro no login:', error);
    return NextResponse.json({ erro: 'Erro interno no servidor' }, { status: 500 });
  }
}