import { Injectable, type ExecutionContext } from '@nestjs/common';
import { Skill } from '../../generated/prisma/client.js';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { PrismaService } from '../../prisma/prisma.service.js';

type ProfileId = string;

type ProfileSkillsInfo = Aggregated<ProfileId, Skill>;

export type SkillsLoader = LoaderFrom<SkillsLoaderFactory>;

@Injectable()
export class SkillsLoaderFactory extends DataloaderFactory<
  ProfileId,
  ProfileSkillsInfo
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async load(ids: ProfileId[], _context: ExecutionContext) {
    const skills = await this.prisma.skill.findMany({
      where: { profileId: { in: ids } },
    });

    return this.aggregateBy(skills, (skill) => skill.profileId);
  }

  id(entity: ProfileSkillsInfo) {
    return entity.id;
  }
}
