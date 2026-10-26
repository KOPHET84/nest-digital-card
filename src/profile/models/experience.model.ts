import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Achievement } from './achievement.model.js';
import { Project } from './project.model.js';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [Achievement])
  achievements: Achievement[];

  @Field(() => [Project])
  projects: Project[];

  @Field()
  profileId: string;
}

// model Experience {
//   id           Int           @id @default(autoincrement())
//   company      String        @default("NDA") @db.VarChar(100)
//   position     String        @db.VarChar(100)
//   startDate    DateTime      @db.Date
//   endDate      DateTime?     @db.Date
//   achievements Achievement[]
//   projects     Project[]
//   profileId    String
//   profile      Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
// }
