import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Achievement } from '../../generated/prisma/client.js';

type ExperienceId = number;
type ExperienceAchievementsInfo = Aggregated<ExperienceId, Achievement>;

export type AchievementLoader = LoaderFrom<AchievementLoaderFactory>;

@Injectable()
export class AchievementLoaderFactory extends DataloaderFactory<
  ExperienceId,
  ExperienceAchievementsInfo
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async load(ids: ExperienceId[], _context: ExecutionContext) {
    const achievements = await this.prisma.achievement.findMany({
      where: { experienceId: { in: ids } },
    });
    return this.aggregateBy(achievements, (a) => a.experienceId);
  }

  id(entity: ExperienceAchievementsInfo): number {
    return entity.id;
  }
}
