import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API do sistema de vendas, desenvolvida pelos alunos do curso de desenvolvimento web - backend do SENAC.';
  }
}
