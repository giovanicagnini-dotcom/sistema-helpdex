import { NextResponse } from "next/server";
import { Usuario } from "@/app/classes/Usuario";
import { buscarUsuarioPorId, editarUsuario} from "@/app/data/usuarioData";

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

    if (isNaN(usuarioId)) {
        return NextResponse.json(
            { erro: "id invalido" },
            { status: 400 }
        );
    }
    const body = await request.json();

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

       const resultado = await editarUsuario(usuarioAtualizado);

       if(!resultado){
        return NextResponse.json(
            {mensagem:"usuario nao encontrado"},
            {status:404}
        );
       }

    return NextResponse.json(
        { mensagem: "usuario excluido com sucesso" },
        { status: 200 }
    );
}


