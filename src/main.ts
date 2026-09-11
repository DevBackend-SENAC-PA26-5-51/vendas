import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Vendas')
    .setDescription(
      'Documentação da API de Vendas — referência para os devs front-end. Use o botão "Try it out" para testar os endpoints.',
    )
    .setVersion('1.0')
    .addTag('clientes', 'Cadastro e gestão de clientes')
    .addTag('produtos', 'Cadastro e gestão de produtos')
    .addTag('vendas', 'Registro e gestão de vendas')
    .addTag('estoque', 'Controle de estoque')
    .addTag('pagamentos', 'Gestão de pagamentos')
    .addTag('relatorios', 'Relatórios gerenciais')
    .addTag('dashboard', 'Dados agregados para dashboards')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: 'api/docs/json',
    yamlDocumentUrl: 'api/docs/yaml',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
