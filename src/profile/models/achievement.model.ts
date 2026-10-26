import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Achievement {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;

  @Field(() => Int)
  experienceId: number;
}

// model Achievement {
//   id           Int        @id @default(autoincrement())
//   description  String     @db.VarChar(300)
//   experienceId Int
//   experience   Experience @relation(fields: [experienceId], references: [id], onDelete: Cascade)
// }
