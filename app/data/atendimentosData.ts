import { conexao } from '@lib/conexao';
import { Atendimento } from '@lib/atendimento';

export async function listarAtendimentos() {
    const [rows] = await conexao.query('SELECT * FROM atendimentos');
    return rows as Atendimento[];
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
    const resultado = await conexao.query(
        'UPDATE atendimentos SET data_inicio = ?, data_fim = ?, prioridade = ? WHERE id = ?',
        [atendimento.data_inicio, 
         atendimento.data_fim,
         atendimento.prioridade,
         atendimento.id]
    );
    return resultado.affectedRows > 0;
}

export async function excluirAtendimento(id: number) {
    const resultado = await conexao.query(
        'DELETE FROM atendimentos WHERE id = ?',
        [id]
    );
    return resultado.affectedRows > 0;
}

export async function buscarAtendimentoPorId(id: number) {
    const [rows] = await conexao.query(
        'SELECT * FROM atendimentos WHERE id = ?',
        [id]
    );
    return (rows as Atendimento[])[0];
}

export async function buscarAtendimentosPorPrioridade(prioridade: string) {
    const [rows] = await conexao.query(
        'SELECT * FROM atendimentos WHERE prioridade = ?',
        [prioridade]
    );
    return rows as Atendimento[];
}
export async function buscarAtendimentosPorData(data_inicio: string, data_fim: string) {
    const [rows] = await conexao.query(
        'SELECT * FROM atendimentos WHERE data_inicio >= ? AND data_fim <= ?',
        [data_inicio, data_fim]
    );
    return rows as Atendimento[];
}

