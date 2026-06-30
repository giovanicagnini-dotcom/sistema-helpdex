import { NextResponse } from "next/server";
import { Usuario } from "@/app/classes/Usuario";
import { buscarUsuarioPorEmail } from "@/app/data/usuarioData";


export async function POST(request: Request) {
    const body = await request.json();
    const {email, senha} = body;

    if (!email || !senha) {
        return NextResponse.json(
            { erro: "Email e senha são obrigatórios" },
            { status: 400 }
        );
    }

   const usuarioEncontrado = await buscarUsuarioPorEmail(email);
    if (!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
        return NextResponse.json(
            { erro: "Email ou senha inválidos" },
            { status: 401 }
        );
    }

    const usuarioLogado = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
    };

    const 

