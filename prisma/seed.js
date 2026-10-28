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
      name: 'Денис',
      description:
        'Fullstack-разработчик c опытом создания цифровых продуктов в сферах FinTech, EdTech (c внедрением AI), PropTech, TravelTech и E-commerce & Retail',
      skills: {
        create: [
          { name: 'TypeScript' },
          { name: 'Node.js' },
          { name: 'NestJS' },
          { name: 'Next.js' },
          { name: 'Prisma' },
          { name: 'Git' },
          { name: 'React' },
          { name: 'PostgreSQL' },
          { name: 'Docker' },
          { name: 'WebSocket' },
          { name: 'MongoDB' },
        ],
      },
      links: {
        create: [
          { name: 'GitHub', url: 'https://github.com/KOPHET84' },
          { name: 'Telegram', url: 'https://t.me/net_start_m' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Bell Integrator',
            position: 'Fullstack-разработчик',
            startDate: new Date('2023-02-01'),
            endDate: new Date('2026-08-28'),
            achievements: {
              create: [
                {
                  description:
                    'Разработал AI-конструктор курсов c LLM-интеграцией, что ускорило создание полноценных курсов до 5 минут',
                },
                {
                  description:
                    'Спроектировал и перенес документацию REST API в Swagger для админ-панели',
                },
                {
                  description:
                    'Реализовал поэтапную миграцию fullstack-приложения c Next.js на новую архитектуру',
                },
                {
                  description:
                    'Спроектировал и внедрил микрофронтенд-архитектуру на базе Vite Module Federation',
                },
                {
                  description:
                    'Автоматизировал процесс контроля качества: настроил тестовое окружение и интегрировал запуск тестов в CI/CD пайплайн',
                },
                {
                  description:
                    'Разработал калькулятор военной ипотеки (React), реализовав на BFF (Node.js) сквозную интеграцию c API 10+ банков и кэширование их тарифов',
                },

                {
                  description:
                    'Провел 5 технических собеседований, успешно онбордил новых сотрудников и участвовал в code-review',
                },
              ],
            },
            projects: {
              create: [
                {
                  name: 'ВИК',
                  miniDescription:
                    'Банковская финтех-платформа «ВИК» для автоматизации подбора, оформления военной ипотеки и сопровождения сделок ',
                },
                {
                  name: 'China Campus Network',
                  miniDescription:
                    'EdTech-платформа для «China Campus Network» на базе искусственного интеллекта c AI-генерацией курсов и заданий',
                },
              ],
            },
          },
          {
            company: 'Frog Studios',
            position: 'Fullstack-разработчик',
            startDate: new Date('2021-04-01'),
            endDate: new Date('2023-02-01'),
            achievements: {
              create: [
                {
                  description:
                    'Запустил Telegram Mini App c интеграцией Telegram SDK: приложение привлекло 50+ B2B-партнеров для премиального ЖК ',
                },
                {
                  description:
                    'Спроектировал и реализовал модуль интерактивного real-time чата (Socket.io)',
                },
                {
                  description:
                    'Спроектировал и успешно внедрил систему 2FA, интегрировав авторизацию по JWT c верификацией через Email-коды и Telegram ID',
                },
                {
                  description:
                    'Автоматизировал генерацию и отправку PDF-чеков после оплаты через jsPDF, что автоматизировало ручную работу бухгалтерии',
                },
              ],
            },
            projects: {
              create: [
                {
                  name: 'High Life',
                  miniDescription:
                    'Digital-платформа для 45.000 жителей элитных жилых комплексов «High Life»',
                },
                {
                  name: "Karmann's",
                  miniDescription:
                    "Главный клиентский портал для крупного отеля «Karmann's» c собственным движком бронирований",
                },
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
