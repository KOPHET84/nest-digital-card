import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  profileId: string;
}

// model Skill {
//   id        Int     @id @default(autoincrement())
//   name      String  @db.VarChar(100)
//   profileId String
//   profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
// }
