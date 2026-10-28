# Digital Business Card

Backend-приложение «Digital Business Card»: GraphQL API, через которое можно получить
информацию о специалисте - профиль, навыки, опыт работы и проекты.

### Развернутое приложение на Render: https://nest-digital-card.onrender.com/

## Стек

- **TypeScript**
- **Node.js**
- **NestJS**
- **Prisma 7**
- **PostgreSQL**
- **GraphQL** (Apollo Sandbox)
- **Docker** / **Docker Compose**
- **DataLoader** (`@strv/nestjs-dataloader`)

## Клонирование проекта

```bash
git clone https://github.com/KOPHET84/nest-digital-card
```

## Запуск в Docker

```bash
docker compose up --build
```

## Локальная разработка

```bash
npm install
cp .env.example .env
docker compose up -d db # (Опционально)
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

## Наполнение БД(Опционально)

```bash
npm run seed
```

После запуска Apollo Sandbox доступен по адресу:

```
http://localhost:3000/graphql
```

## Пример запроса

```graphql
query {
  profile {
    name
    description
    id
    links {
      name
      url
    }
    skills {
      name
    }
    experience {
      company
      position
      achievements {
        description
      }
      projects {
        name
        miniDescription
      }
    }
  }
}
```

## Структура проекта

```
src/
├── prisma/                  # PrismaService, PrismaModule
├── generated/               # Prisma Client (генерируется)
└── profile/
    ├── loaders/             # DataLoaders для батчинга запросов
    ├── models/              # GraphQL-модели (ObjectType)
    ├── resolvers/           # GraphQL-резолверы
    ├── profile.module.ts
    └── profile.service.ts

prisma/
├── schema.prisma            # Схема БД
├── migrations/              # Миграции
└── seed.js                  # Наполнение БД
```

## База данных

- Схема: `prisma/schema.prisma`
- Миграции: `prisma/migrations/`
- Сиды: `prisma/seed.js`

Модели: `Profile`, `Skill`, `Experience`, `Project`, `Link`, `Achievement`.

## Деплой на Render

- Runtime: Docker
- База данных: Render PostgreSQL (Internal URL)
- Миграции и seed выполняются в `CMD` контейнера
- Health check: `/health`
