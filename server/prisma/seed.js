import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// 1. Setup the PostgreSQL pool using your environment variable
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Initialize the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma Client
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Admin
  const admin = await prisma.users.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      name: 'System Admin',
      password: 'password123', 
      role: 'admin',
      lockCount: 0
    },
  });

  // 2. Create Classroom
  const classroom = await prisma.classroom.create({
    data: {
      className: 'Grade 10 - Alpha',
      createdById: admin.id,
      updatedById: admin.id,
      lockCount: 0
    }
  });

  // 3. Create Student
  await prisma.student.create({
    data: {
      studentId: '2026-001',
      name: 'John Doe',
      email: 'john@example.com',
      grade: '10',
      status: 'active',
      classId: classroom.id,
      createdById: admin.id,
      updatedById: admin.id,
      lockCount: 0
    }
  });

  console.log('✅ Seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Important to close the DB pool
  });