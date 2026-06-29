export class Atendimento {
    id: number;
    data_inicio: String;
    data_fim: String;
    prioridade: string;

    constructor(
        id: number,
        data_inicio: String,
        data_fim: String, 
        prioridade: string
    ) {
        this.id = id;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.prioridade = prioridade;
    }
    validar(): string | null {
        if (!this.id|| this.id === 0) {
            return "ID é obrigatório.";
        }
        if (!this.data_inicio || this.data_inicio.trim() === "") {
            return "Data de início é obrigatória.";
        }
        if (!this.data_fim || this.data_fim.trim() === "") {
            return "Data de fim é obrigatória.";
        }
        if (!this.prioridade || this.prioridade.trim() === "") {
            return "Prioridade é obrigatória.";
        }
        return null;
    }
}
