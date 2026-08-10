import 'dotenv/config';

import { PrismaClient } from '../../generated/prisma/cliente.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const rawDatabaseUrl = process.env.DATABASE_URL;
const databaseUrl = (rawDatabaseUrl ?? '').trim();

const adapter = new PrismaMariaDb(databaseUrl, {
  // Additional options can be provided here if needed
  // For example, you can specify the database name or useTextProtocol option
  // database: 'your_database_name',
  // useTextProtocol: true,
});

export const prismaClientOptions = { adapter };

export function createPrismaClient(): PrismaClient {
  return new PrismaClient(prismaClientOptions);
}
