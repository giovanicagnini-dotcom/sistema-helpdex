import { NextResponse } from "next/server";
import { Usuario } from "@/app/classes/Usuario";
import { usuarios } from "@/app/data/usuarioData";

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

    const usuario = usuarios.find((usuario: Usuario) => usuario.id === usuariosId);

    if (!usuario) {
        return NextResponse.json(
            { erro: "produto nao encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(usuario);
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

    const indiceUsuario = usuarios.findIndex((usuario: Usuario) => usuario.id === usuariosId);
    const body = await request.json();
    if (indiceUsuario === -1) {
        return NextResponse.json(
            { erro: "Usuario nao encontrado" },
            { status: 404 }
        );
    }

        const usuarioAtualizado = usuarios[indiceUsuario];
        Object.assign(usuarioAtualizado, body, { id: usuariosId });

        const erro = usuarioAtualizado.validar();

        if (erro) {
            return NextResponse.json(
                { erro: erro },
                { status: 400 }
            );
        }

        usuarios[indiceUsuario] = usuarioAtualizado;
        return NextResponse.json(usuarioAtualizado, { status: 200 });

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

    const indiceUsuario = usuarios.findIndex((usuario: Usuario) => usuario.id === usuariosId);

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


