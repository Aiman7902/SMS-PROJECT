import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Admin
  const admin = await prisma.users.upsert({
    where: { email: 'admin@school.com' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'admin@school.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'admin',
      lockCount: 0
    },
  });

  // 2. Create Classroom (findFirst to avoid duplicate, create if not exists)
  let classroom = await prisma.classroom.findFirst({
    where: { className: 'Grade 10 - Alpha' }
  });

  if (!classroom) {
    classroom = await prisma.classroom.create({
      data: {
        className: 'Grade 10 - Alpha',
        createdById: admin.id,
        updatedById: admin.id,
        lockCount: 0
      }
    });
  }

  // 3. Create Student (findFirst to avoid duplicate, create if not exists)
  const existingStudent = await prisma.student.findFirst({
    where: { studentId: '2026-001' }
  });

  if (!existingStudent) {
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
  }

  console.log('✅ Seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });