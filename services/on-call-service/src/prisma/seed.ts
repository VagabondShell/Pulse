import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Wipe out any old data
  await prisma.engineer.deleteMany();
  await prisma.team.deleteMany();
  // 2. Create the Team and the Engineers in one single query
  const paymentTeam = await prisma.team.create({
    data: {
      name: 'payment-api',
      description: 'The team responsible for payment gateways',
      engineers: {
        create: [
          { name: 'Alice (Senior)', email: 'alice@pulse.com' },
          { name: 'Bob (Mid-level)', email: 'bob@pulse.com' },
          { name: 'Charlie (Junior)', email: 'charlie@pulse.com' },
        ],
      },
    },
    // Ask Prisma to return the engineers so we can log them
    include: { engineers: true },
  });

  console.log(`✅ Created Team: ${paymentTeam.name}`);
  console.log(`👥 Added ${paymentTeam.engineers.length} engineers:`);
  paymentTeam.engineers.forEach((eng) =>
    console.log(`   - ${eng.name} (${eng.id})`),
  );
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
