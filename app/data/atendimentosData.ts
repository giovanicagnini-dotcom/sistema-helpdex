import { conexao } from '@/app/lib/conexao';
import { Atendimento } from '@/app/classes/Atendimento';

export async function listarAtendimentos() {
    const [resultado] = await conexao.query('SELECT * FROM atendimentos');
    return resultado as Atendimento[];
}

export async function cadastrarAtendimento(atendimento: Atendimento) {
    const [resultado] = await conexao.query(
        'INSERT INTO atendimentos (data_inicio, data_fim, prioridade) VALUES (?, ?, ?)',
        [atendimento.data_inicio,
         atendimento.data_fim,
          atendimento.prioridade
        ]
    );
    return (resultado as any).insertId;
}


export async function editarAtendimento(atendimento: Atendimento) {
    const [resultado]: any = await conexao.query(
        'UPDATE atendimentos SET data_inicio = ?, data_fim = ?, prioridade = ?, status = ? WHERE id = ?',
        [atendimento.data_inicio, 
         atendimento.data_fim,
         atendimento.status,
         atendimento.prioridade,
         atendimento.id]
    );
    return resultado.affectedRows > 0;
}

export async function excluirAtendimento(id: number) {
    const [resultado]:any  = await conexao.query(
        'DELETE FROM atendimentos WHERE id = ?',
        [id]
    );
    return resultado.affectedRows > 0;
}

export async function buscarAtendimentoPorId(id: number) {
    const [resultado] = await conexao.query(
        'SELECT * FROM atendimentos WHERE id = ?',
        [id]
    );
    return (resultado as Atendimento[])[0];
}

export async function buscarAtendimentosPorPrioridade(prioridade: string) {
    const [resultado] = await conexao.query(
        'SELECT * FROM atendimentos WHERE prioridade = ?',
        [prioridade]
    );
    return resultado as Atendimento[];
}
export async function buscarAtendimentosPorData(data_inicio: string, data_fim: string) {
    const [resultado] = await conexao.query(
        'SELECT * FROM atendimentos WHERE data_inicio >= ? AND data_fim <= ?',
        [data_inicio, data_fim]
    );
    return resultado as Atendimento[];
}
export async function buscarAtendimentosPorStatus(status: string) {
    const [resultado] = await conexao.query(
        'SELECT * FROM atendimentos WHERE status = ?',
        [status]
    );
    return resultado as Atendimento[];
}

