import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  profileId: string;
}

// model Link {
//   id        Int     @id @default(autoincrement())
//   name      String  @db.VarChar(100)
//   url       String
//   profileId String
//   profile   Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
// }
