import { Injectable, type ExecutionContext } from '@nestjs/common';
import { Project } from '../../generated/prisma/client.js';

import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { PrismaService } from '../../prisma/prisma.service.js';

type ExperienceId = number;
type ExperienceProjectsInfo = Aggregated<ExperienceId, Project>;

export type ProjectLoader = LoaderFrom<ProjectLoaderFactory>;

@Injectable()
export class ProjectLoaderFactory extends DataloaderFactory<
  ExperienceId,
  ExperienceProjectsInfo
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async load(ids: ExperienceId[], _context: ExecutionContext) {
    const projects = await this.prisma.project.findMany({
      where: { experienceId: { in: ids } },
    });

    return this.aggregateBy(projects, (project) => project.experienceId);
  }

  id(entity: ExperienceProjectsInfo) {
    return entity.id;
  }
}
