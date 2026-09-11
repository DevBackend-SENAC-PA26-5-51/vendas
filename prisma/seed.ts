import 'dotenv/config';

import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const databaseUrl = (process.env.DATABASE_URL ?? '').trim();

const adapter = new PrismaMariaDb(databaseUrl);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpeza na ordem reversa das dependências (FKs)
  await prisma.pagamentos.deleteMany();
  await prisma.itemvenda.deleteMany();
  await prisma.vendas.deleteMany();
  await prisma.funcionarios.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.produtos.deleteMany();
  await prisma.transportadoras.deleteMany();
  await prisma.cargo.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.endereco.deleteMany();

  // Tabelas independentes
  const [vendedor, gerente] = await Promise.all([
    prisma.cargo.create({ data: { nome: 'Vendedor' } }),
    prisma.cargo.create({ data: { nome: 'Gerente de Vendas' } }),
  ]);

  const [comercial, logistica] = await Promise.all([
    prisma.departamento.create({ data: { nome: 'Comercial' } }),
    prisma.departamento.create({ data: { nome: 'Logística' } }),
  ]);

  const [endereco1, endereco2] = await Promise.all([
    prisma.endereco.create({
      data: {
        logradouro: 'Rua das Flores',
        numero: 123,
        cidade: 'São Paulo',
        estado: 'SP',
        bairro: 'Centro',
        cep: '01001-000',
      },
    }),
    prisma.endereco.create({
      data: {
        logradouro: 'Av. Paulista',
        numero: 1000,
        cidade: 'São Paulo',
        estado: 'SP',
        bairro: 'Bela Vista',
        cep: '01310-100',
      },
    }),
  ]);

  const [cliente1, cliente2, cliente3] = await Promise.all([
    prisma.cliente.create({
      data: {
        cpf: '123.456.789-00',
        nome: 'Maria Silva',
        contato: '(11) 98765-4321',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        email: 'maria.silva@email.com',
      },
    }),
    prisma.cliente.create({
      data: {
        cpf: '987.654.321-00',
        nome: 'João Santos',
        contato: '(11) 97654-3210',
        endereco: 'Av. Paulista, 1000 - São Paulo/SP',
        email: 'joao.santos@email.com',
      },
    }),
    prisma.cliente.create({
      data: {
        cpf: '111.222.333-44',
        nome: 'Ana Oliveira',
        contato: '(11) 96543-2109',
        endereco: 'Rua Augusta, 500 - São Paulo/SP',
        email: 'ana.oliveira@email.com',
      },
    }),
  ]);

  const [camiseta, calca, tenis, bone] = await Promise.all([
    prisma.produtos.create({
      data: { nome: 'Camiseta Básica', quantidade: 100, tipo: 'Vestuário', preco: 49.9 },
    }),
    prisma.produtos.create({
      data: { nome: 'Calça Jeans', quantidade: 50, tipo: 'Vestuário', preco: 129.9 },
    }),
    prisma.produtos.create({
      data: { nome: 'Tênis Esportivo', quantidade: 30, tipo: 'Calçados', preco: 199.9 },
    }),
    prisma.produtos.create({
      data: { nome: 'Boné', quantidade: 5, tipo: 'Acessórios', preco: 29.9 },
    }),
  ]);

  const [transportadora1, transportadora2] = await Promise.all([
    prisma.transportadoras.create({
      data: { nome: 'Transportes Rápidos', contato: '(11) 3333-4444' },
    }),
    prisma.transportadoras.create({
      data: { nome: 'Entrega Express', contato: '(11) 5555-6666' },
    }),
  ]);

  // Funcionários (dependem de cargo, departamento e endereço)
  const [funcionario1, funcionario2] = await Promise.all([
    prisma.funcionarios.create({
      data: {
        nome: 'Carlos Vendedor',
        cpf: '222.333.444-55',
        rg: '12.345.678-9',
        data_nasc: new Date('1990-05-15'),
        estado_civil: 'Solteiro',
        contato: '(11) 98888-7777',
        endereco_id: endereco1.id,
        cargo_id: vendedor.id,
        departamento_id: comercial.id,
      },
    }),
    prisma.funcionarios.create({
      data: {
        nome: 'Fernanda Gerente',
        cpf: '333.444.555-66',
        rg: '98.765.432-1',
        data_nasc: new Date('1985-10-20'),
        estado_civil: 'Casada',
        contato: '(11) 97777-6666',
        endereco_id: endereco2.id,
        cargo_id: gerente.id,
        departamento_id: logistica.id,
      },
    }),
  ]);

  // Vendas (dependem de cliente, transportadora e funcionário)
  const [venda1, venda2, venda3] = await Promise.all([
    prisma.vendas.create({
      data: {
        id_status: 'concluida',
        cliente_id: cliente1.id,
        transportadoras_id: transportadora1.id,
        funcionarios_id: funcionario1.id,
      },
    }),
    prisma.vendas.create({
      data: {
        id_status: 'pendente',
        cliente_id: cliente2.id,
        transportadoras_id: transportadora2.id,
        funcionarios_id: funcionario1.id,
      },
    }),
    prisma.vendas.create({
      data: {
        id_status: 'concluida',
        cliente_id: cliente3.id,
        transportadoras_id: transportadora1.id,
        funcionarios_id: funcionario2.id,
      },
    }),
  ]);

  // Itens de venda (dependem de venda e produto)
  await Promise.all([
    prisma.itemvenda.create({
      data: { quantidade: 2, preco: 49.9, vendas_id: venda1.id, produtos_id: camiseta.id },
    }),
    prisma.itemvenda.create({
      data: { quantidade: 1, preco: 129.9, vendas_id: venda1.id, produtos_id: calca.id },
    }),
    prisma.itemvenda.create({
      data: { quantidade: 1, preco: 199.9, vendas_id: venda2.id, produtos_id: tenis.id },
    }),
    prisma.itemvenda.create({
      data: { quantidade: 3, preco: 29.9, vendas_id: venda3.id, produtos_id: bone.id },
    }),
  ]);

  // Pagamentos (dependem de venda)
  await Promise.all([
    prisma.pagamentos.create({
      data: {
        metodo_pagamento: 'cartao_credito',
        valo_pagamento: 229.7,
        status_pagamento: 'aprovado',
        data_pagamento: new Date('2026-09-10'),
        vendas_id: venda1.id,
      },
    }),
    prisma.pagamentos.create({
      data: {
        metodo_pagamento: 'boleto',
        valo_pagamento: 199.9,
        status_pagamento: 'pendente',
        data_pagamento: new Date('2026-09-11'),
        vendas_id: venda2.id,
      },
    }),
    prisma.pagamentos.create({
      data: {
        metodo_pagamento: 'pix',
        valo_pagamento: 89.7,
        status_pagamento: 'aprovado',
        data_pagamento: new Date('2026-09-11'),
        vendas_id: venda3.id,
      },
    }),
  ]);

  console.log('Seed executado com sucesso.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
