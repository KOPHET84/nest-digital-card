import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../dist/generated/prisma/client.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profile.deleteMany({});

  await prisma.profile.create({
    data: {
      name: 'Новое имя 2',
      description: 'Описание',
      skills: {
        create: [{ name: 'TypeScript' }, { name: 'NestJS' }],
      },
      links: {
        create: [{ name: 'GitHub', url: 'example.com' }],
      },
      experience: {
        create: [
          {
            company: 'Компания 1',
            position: 'Разработчик',
            startDate: new Date(),
            achievements: {
              create: [{ description: 'Сделал крутую фичу' }],
            },
            projects: {
              create: [
                { name: 'Проект 1', miniDescription: 'ПРоект для военных' },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
