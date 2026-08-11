import { vendas } from "generated/prisma/client.js";


export class CreateClienteDto {
    cpf: string;
    nome: string;
    contato: number;
    endereco: string;
    email: string;
    vendas: vendas[];


    constructor(cpf: string, nome: string, contato: number, endereco:string, email: string, vendas:vendas[]){
        this.cpf = cpf;
        this.nome = nome;
        this.contato = contato;
        this.endereco = endereco;
        this.email = email;
        this.vendas = vendas;
    }

}
