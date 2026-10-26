import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  miniDescription?: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => Int)
  experienceId: number;
}

// model Project {
//   id              Int        @id @default(autoincrement())
//   name            String     @unique @db.VarChar(100)
//   miniDescription String?    @db.VarChar(300)
//   url             String?
//   experienceId    Int
//   experience      Experience @relation(fields: [experienceId], references: [id], onDelete: Cascade)
// }
