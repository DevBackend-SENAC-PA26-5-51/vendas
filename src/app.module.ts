import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { ProdutosModule } from './produtos/produtos.module.js';
import { EstoqueModule } from './estoque/estoque.module.js';
import { VendasModule } from './vendas/vendas.module.js';
import { PagamentosModule } from './pagamentos/pagamentos.module.js';
import { RelatoriosModule } from './relatorios/relatorios.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';

@Module({
  imports: [PrismaModule, ClientesModule, ProdutosModule, EstoqueModule, VendasModule, PagamentosModule, RelatoriosModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
