import { conexao } from "../lib/conexao";

export async function realizarLogin(cpf: string, senha: string) {
   const resultado = await conexao.query(
        'SELECT * FROM usuarios WHERE cpf = ? AND senha = ?',
        [cpf, senha]
    );
    return resultado.length > 0;
}