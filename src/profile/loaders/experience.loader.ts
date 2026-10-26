import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Experience } from '../../generated/prisma/client.js';

type ProfileId = string;

type ProfileExperienceInfo = Aggregated<ProfileId, Experience>;

export type ExperienceLoader = LoaderFrom<ExperienceLoaderFactory>;

@Injectable()
export class ExperienceLoaderFactory extends DataloaderFactory<
  ProfileId,
  ProfileExperienceInfo
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async load(ids: ProfileId[], _context: ExecutionContext) {
    const experience = await this.prisma.experience.findMany({
      where: { profileId: { in: ids } },
    });
    return this.aggregateBy(experience, (e) => e.profileId);
  }

  id(entity: ProfileExperienceInfo) {
    return entity.id;
  }
}
