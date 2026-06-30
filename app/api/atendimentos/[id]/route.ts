import { NextResponse } from "next/server";
import { Atendimento } from "@/app/classes/Atendimento";
import { buscarAtendimentoPorID, atualizarAtendimento, deletarAtendimento } from "@/app/data/atendimentos";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    request: Request,
    { params }: Params
) {
    const { id } = await params;
    const atendimentoid = Number(id);

    const [atendimento]: any = buscarAtendimentoPorID(atendimentoid);

    if (!atendimento) {
        return NextResponse.json(
            { mensagem: "atendimento não encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(atendimento);
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = await params;
    const atendimentoid = Number(id);

    const body = await request.json();

    const atendimentoAtualizado = new Atendimento(
        atendimentoid,
        body.status,
        body.data_inicio,
        body.data_encerramento,
        body.prioridade
    );

    const erro = atendimentoAtualizado.validar();

    if (erro) {
        return NextResponse.json(
            { mensagem: erro },
            { status: 400 }
        );
    }

    const [resultado]: any = await atualizarAtendimento(atendimentoAtualizado);

    if (resultado.affectedRows === 0) {
        return NextResponse.json(
            { mensagem: "atendimento nao encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(atendimentoAtualizado, { status: 204 })
}

export async function DELETE(
        request: Request,
        { params }: Params
    ) {
        const { id } = await params;
        const atendimentoid = Number(id);

        const [resultado]: any = await deletarAtendimento(atendimentoid);

        if (resultado.affectedRows === 0) {
            return NextResponse.json(
                { mensagem: "atendimento não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "atendimento removido com sucesso"
        });
    }