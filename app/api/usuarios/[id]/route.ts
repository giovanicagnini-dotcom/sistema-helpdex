import { NextResponse } from "next/server";
import { Usuario } from "@/classes/Usuario";
import { usuarios } from "@/data/usuarios";

type Params = {
    params: Promise<{
        id: string;
    }>;
};
export async function GET(request: Request, { params }: Params) {
    const { id } = await params;
    const usuariosId = Number(id);

    if (isNaN(usuariosId)) {
        return NextResponse.json(
            { erro: "id invalido." },
            { status: 400 }
        );
    }

    const usuarios = usuarios.find((usuarios) => usuarios.id === usuariosId);

    if (!usuarios) {
        return NextResponse.json(
            { erro: "produto nao encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(usuarios);
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = await params;
    const usuariosId = Number(id);

    if (isNaN(usuariosId)) {
        return NextResponse.json(
            { erro: "id invalido" },
            { status: 400 }
        );
    }

    const indiceUsuario = usuarios.findIndex((usuarios) => usuarios.id === usuariosId);
    const body = await request.json();
    if (indiceUsuario === -1) {
        return NextResponse.json(
            { erro: "Usuario nao encontrado" },
            { status: 404 }
        );
    }

        const usuariosAtualizado = new Usuario(
            UsuarioId,
            body.nome,
            Number(body.preco),
            Number(body.quantidade)
        );

        const erro = usuariosAtualizado.validar();

        if (erro) {
            return NextResponse.json(
                { erro: erro },
                { status: 400 }
            );
        }

        usuarios[indiceUsuario] = usuariosAtualizado;
        return NextResponse.json(usuariosAtualizado, { status: 200 });

    }

export async function DELETE(request: Request, { params }: Params) {
    const { id } = await params;
    const usuariosId = Number(id);

    if (isNaN(usuariosId)) {
        return NextResponse.json(
            { erro: "id invalido" },
            { status: 400 }
        );
    }

    const indiceUsuario = usuarios.findIndex((usuarios) => usuarios.id === usuariosId);

    if (indiceUsuario === -1) {
        return NextResponse.json(
            { erro: "usuario nao encontrado " },
            { status: 404 }
        );
    }

    usuarios.splice(indiceUsuario, 1);

    return NextResponse.json(
        { mensagem: "usuario excluido com sucesso" },
        { status: 200 }
    );
}


