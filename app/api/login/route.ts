import { NextResponse } from "next/server";
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
    if (!usuarioEncontrado) {
        return NextResponse.json(
            { erro: "CPF ou senha inválidos" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { mensagem: "Login realizado com sucesso"},
        { status: 200 }
    );
}

    

