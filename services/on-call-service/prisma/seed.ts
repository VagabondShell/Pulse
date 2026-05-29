// prisma/seed.ts
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

  // 1. Wipe out any old data (Order matters! We must delete child records before parents)
  await prisma.scheduleSlot.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.service.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.engineer.deleteMany();
  await prisma.team.deleteMany();

  // 2. Create Engineers first so we have their IDs to link
  const alice = await prisma.engineer.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '+1234567890',
    },
  });
  const bob = await prisma.engineer.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1234567891',
    },
  });
  const carol = await prisma.engineer.create({
    data: {
      name: 'Carol Williams',
      email: 'carol@example.com',
      phone: '+1234567892',
    },
  });
  const david = await prisma.engineer.create({
    data: {
      name: 'David Lee',
      email: 'david@example.com',
      phone: '+1234567893',
    },
  });

  console.log('✅ Created 4 Engineers');

  // 3. Create Teams, TeamMembers, and Services in a SINGLE query per team
  const platformTeam = await prisma.team.create({
    data: {
      name: 'Platform Engineering',
      description: 'Infrastructure and platform team',
      engineers: {
        // Creates the TeamMember join records
        create: [
          { engineerId: alice.id, role: 'lead' },
          { engineerId: david.id, role: 'member' },
        ],
      },
      services: {
        // Creates the registered Services
        create: [
          { name: 'kubernetes-cluster', description: 'K8s infrastructure' },
          { name: 'database-postgres', description: 'PostgreSQL database' },
        ],
      },
    },
    // Ask Prisma to return the nested data so we can log it cleanly
    include: {
      engineers: { include: { engineer: true } },
      services: true,
    },
  });

  console.log(`\n✅ Created Team: ${platformTeam.name}`);
  console.log(`👥 Added ${platformTeam.engineers.length} members:`);
  platformTeam.engineers.forEach((member) =>
    console.log(`   - ${member.engineer.name} [Role: ${member.role}]`),
  );
  console.log(`🔗 Registered ${platformTeam.services.length} services.`);

  const backendTeam = await prisma.team.create({
    data: {
      name: 'Backend Engineering',
      description: 'Backend API team',
      engineers: {
        create: [
          { engineerId: bob.id, role: 'lead' },
          { engineerId: carol.id, role: 'member' },
        ],
      },
      services: {
        create: [
          { name: 'frontend-api', description: 'Frontend API service' },
          { name: 'payment-service', description: 'Payment processing' },
        ],
      },
    },
    include: {
      engineers: { include: { engineer: true } },
      services: true,
    },
  });

  console.log(`\n✅ Created Team: ${backendTeam.name}`);
  console.log(`👥 Added ${backendTeam.engineers.length} members:`);
  backendTeam.engineers.forEach((member) =>
    console.log(`   - ${member.engineer.name} [Role: ${member.role}]`),
  );
  console.log(`🔗 Registered ${backendTeam.services.length} services.`);

  // 4. Set dynamic dates for the schedules (2 weeks ago so it's currently active)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  // 5. Create Schedules and Slots using nested writes
  const platformSchedule = await prisma.schedule.create({
    data: {
      teamId: platformTeam.id,
      name: 'Platform Rotation',
      type: 'weekly',
      startDate: twoWeeksAgo,
      isActive: true,
      escalationDelayMinutes: 5,
      slots: {
        create: [
          { engineerId: alice.id, role: 'primary', weekNumber: 1 },
          { engineerId: david.id, role: 'secondary', weekNumber: 1 },
          { engineerId: bob.id, role: 'primary', weekNumber: 2 },
          { engineerId: carol.id, role: 'primary', weekNumber: 3 },
        ],
      },
    },
    include: { slots: true },
  });
  console.log(
    `\n📅 Created ${platformSchedule.name} with ${platformSchedule.slots.length} shifts.`,
  );

  const backendSchedule = await prisma.schedule.create({
    data: {
      teamId: backendTeam.id,
      name: 'Backend Rotation',
      type: 'weekly',
      startDate: twoWeeksAgo,
      isActive: true,
      escalationDelayMinutes: 5,
      slots: {
        create: [
          { engineerId: bob.id, role: 'primary', weekNumber: 1 },
          { engineerId: carol.id, role: 'primary', weekNumber: 2 },
        ],
      },
    },
    include: { slots: true },
  });
  console.log(
    `📅 Created ${backendSchedule.name} with ${backendSchedule.slots.length} shifts.\n`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    // 👈 Don't forget to close the pg pool!
    await pool.end();
  });
