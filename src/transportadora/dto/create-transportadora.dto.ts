export class CreateTransportadoraDto {
  nome: string;
  contato: string;

  constructor(nome: string, contato: string = '') {
    this.nome = nome;
    this.contato = contato;
  }
}
