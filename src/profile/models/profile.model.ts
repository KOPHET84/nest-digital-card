import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Link } from './link.model.js';
import { Skill } from './skill.model.js';
import { Experience } from './experience.model.js';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field(() => [Link])
  links: Link[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];
}

// model Profile {
//   id          String   @id @default(uuid())
//   name        String   @db.VarChar(100)
//   description String   @db.VarChar(300)
//   createdAt   DateTime @default(now())
//   links       Link[]
//   skills      Skill[]
//   experience   Experience[]
// }
