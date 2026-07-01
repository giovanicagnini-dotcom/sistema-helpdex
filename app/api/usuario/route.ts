import { NextResponse } from "next/server";
import { cadastrarUsuario } from "@/app/data/usuarioData";
import { listarUsuarios } from "@/app/data/usuarioData";
import { Usuario } from "@/app/classes/Usuario";

export async function GET() {
    const usuarios = await listarUsuarios();

    return NextResponse.json(usuarios, {
        status: 200,
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    const usuario = new Usuario(
        0,
        body.nome,
        body.email,
        body.telefone,
        body.cpf,
        body.nivel_permissao,
        body.setor,
        body.senha
    );

    const erro = usuario.validar();

    if (erro) {
        return NextResponse.json(
            { erro },
            { status: 400 }
        );
    }

    const idNovoUsuario = await cadastrarUsuario(usuario);

    return NextResponse.json(
        {
            mensagem: "Usuario cadastrado com sucesso",
            usuario: {
                id: idNovoUsuario,
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone,
                cpf: usuario.cpf,
                nivel_permissao: usuario.nivel_permissao,
                setor: usuario.setor
            }
        },
        {
            status: 201
        }
    );
}