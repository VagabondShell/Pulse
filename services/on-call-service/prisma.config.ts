import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // We use ts-node instead of bun, pointing to your exact file path!
    seed: 'npx ts-node src/prisma/seed.ts',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
