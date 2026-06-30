import {conexao} from '@lib/conexao';
import {Usuario} from '@lib/usuario';

export async function listarUsuarios() {
    const [resultado] = await conexao.query('SELECT * FROM usuarios');
    return resultado as Usuario[];
}   
export async function cadastrarUsuario(usuario: Usuario) {
    const [resultado] = await conexao.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [usuario.nome, usuario.email, usuario.senha]
    );
    return (resultado as any).insertId;
}   
export async function editarUsuario(usuario: Usuario) {
    const [resultado] = await conexao.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
        [usuario.nome, usuario.email, usuario.senha, usuario.id]
    );
    return resultado.affectedRows > 0;
}
export async function excluirUsuario(id: number) {
    const [resultado] = await conexao.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
    );
    return resultado.affectedRows > 0;
}
export async function buscarUsuarioPorId(id: number) {
    const [resultado] = await conexao.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
    );
    return (resultado as Usuario[])[0];
}
    export async function buscarUsuarioPorEmail(email: string) {
    const [resultado] = await conexao.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );
    return (resultado as Usuario[])[0];
}

export async function buscarUsuarioPorCPF(cpf: string) {
    const [resultado] = await conexao.query(
        'SELECT * FROM usuarios WHERE cpf = ?',
        [cpf]
    );
    return (resultado as Usuario[])[0];
}
