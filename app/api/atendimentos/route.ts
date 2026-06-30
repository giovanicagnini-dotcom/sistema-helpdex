import { NextResponse } from "next/server";
import { Atendimento } from "@/classes/Atendimento";
import { cadastrarAtendimento, listarAtendimento} from "@/classes/Atendimento";
import { json } from "stream/consumers";

export async function GET() {
    const atendimento = await listarAtendimento()
    return NextResponse.json(atendimento, { status: 200 });
}

export async function POST(request: Request) {
    const body = await request.json();


    const atendimento = new Atendimento(
        0,
        body.status,
        body.data_inicio,
        body.data_encerramento,
        body.prioridade
    )

    const erro = atendimento.validar();

    if (erro) {
        return NextResponse.json(
            { erro: erro },
            { status: 400 }
        )
    }

    const idNovoAtendimento = await cadastrarAtendimento(atendimento);

    return NextResponse.json({
        mensagem: "Atendimento cadastrado com sucesso",
        Atendimento: {
            id: idNovoAtendimento,
            nome: atendimento.nome,
        },
    },
        { status: 201 }
    );
}
