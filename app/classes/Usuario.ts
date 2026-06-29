export class Usuario {
    id: number
    nome: string;
    email: string
    telefone: string
    cpf: string
    nivel_permissao: string
    setor: string
    senha: string

    constructor(
        id: number,
        nome: string,
        email: string,
        telefone: string,
        cpf: string,
        nivel_permissao: string,
        setor: string,
        senha: string
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.nivel_permissao = nivel_permissao;
        this.setor = setor;
        this.senha = senha;
    }

    validar(): string | null {
        if (!this.id || this.id === 0) {
            return "ID é obrigatório.";
        }
        if (!this.nome || this.nome.trim().length === 0) {
            return "Nome é obrigatório.";
        } 
        if (!this.email || this.email.trim().length === 0) {                            
            return "Email é obrigatório.";
        }
        if (!this.telefone || this.telefone.trim().length === 0) {
            return "Telefone é obrigatório.";
        }                                                                       
        if (!this.cpf || this.cpf.trim().length === 0) {
            return "CPF é obrigatório.";
        }
        if (!this.nivel_permissao || this.nivel_permissao.trim().length === 0) {
            return "Nível de permissão é obrigatório.";
        }
        if (!this.setor || this.setor.trim().length === 0) {
            return "Setor é obrigatório.";
        }
        if (!this.senha || this.senha.trim().length === 0) {
            return "Senha é obrigatória.";
        }
        if (this.senha.length < 6) {
            return "Senha deve ter no mínimo 6 caracteres.";
        }
        return null;
    }   
}