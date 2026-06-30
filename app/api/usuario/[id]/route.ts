import { NextResponse } from "next/server";
import { Usuario } from "@/app/classes/Usuario";
import { buscarUsuarioPorId } from "@/app/data/usuarioData";

type Params = {
    params: Promise<{
        id: string;
    }>;
};
export async function GET(request: Request, { params }: Params) {
    const { id } = await params;
    const usuarioId = Number(id);

    if (isNaN(usuarioId)) {
        return NextResponse.json(
            { erro: "id invalido" },
            { status: 400 }
        );
    }

    const resultado = await buscarUsuarioPorId(usuarioId);

    if (!resultado) {
        return NextResponse.json(
            { erro: "produto nao encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json({resultado}, {status:200});
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = await params;
    const usuarioId = Number(id);

    const body = request.json();

    if (isNaN(usuarioId)) {
        return NextResponse.json(
            { erro: "id invalido" },
            { status: 400 }
        );
    }

        const usuarioAtualizado = new Usuario(
            usuarioId,
            body.nome,
            body.email,
            body.telefone,
            body.cpf,
            body.nivel_permissao,
            body.setor,
            body.senha
        );

        const erro = usuarioAtualizado.validar();

        if (erro) {
            return NextResponse.json(
                { erro: erro },
                { status: 400 }
            );
        }

       const indiceUsuario = usuario(
    (usuario) => usuario.id === usuarioId
);

if (indiceUsuario === -1) {
    return NextResponse.json(
        { erro: "usuario nao encontrado" },
        { status: 404 }
    );
}

usuario[indiceUsuario] = usuarioAtualizado;

return NextResponse.json(
    usuarioAtualizado,
    { status: 200 }
);
    }

    const [indiceUsuario]: any = usuario.findIndex((usuario) => usuario.id === usuarioId);

    if (indiceUsuario === -1) {
        return NextResponse.json(
            { erro: "usuario nao encontrado " },
            { status: 404 }
        );
    }

    usuario.splice(indiceUsuario, 1);

    return NextResponse.json(
        { mensagem: "usuario excluido com sucesso" },
        { status: 200 }
    );
}


