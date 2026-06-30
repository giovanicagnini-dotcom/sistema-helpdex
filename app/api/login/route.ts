import { NextResponse } from "next/server";
import { Usuario } from "@/app/classes/Usuario";
import { buscarUsuarioPorCPF } from "@/app/data/usuarioData";


export async function POST(request: Request) {
    const body = await request.json();
    const {CPF, senha} = body;

    if (!CPF || !senha) {
        return NextResponse.json(
            { erro: "CPF e senha são obrigatórios" },
            { status: 400 }
        );
    }

   const usuarioEncontrado = await buscarUsuarioPorCPF(CPF);
    if (!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
        return NextResponse.json(
            { erro: "CPF ou senha inválidos" },
            { status: 401 }
        );
    }

    const usuarioLogado = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        CPF: usuarioEncontrado.cpf
    };

    return NextResponse.json(
        { mensagem: "Login realizado com sucesso", usuario: usuarioLogado },
        { status: 200 }
    );
}

    

