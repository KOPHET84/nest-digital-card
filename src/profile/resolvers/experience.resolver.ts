import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import {
  ProjectLoaderFactory,
  type ProjectLoader,
} from '../loaders/project.loader.js';
import { Project } from '../models/project.model.js';
import { Achievement } from '../models/achievement.model.js';
import {
  AchievementLoaderFactory,
  type AchievementLoader,
} from '../loaders/achievement.loader.js';
import { Experience } from '../models/experience.model.js';

@Resolver(() => Experience)
export class ExperienceResolver {
  @ResolveField(() => [Project])
  async projects(
    @Parent() experience: Experience,
    @Loader(ProjectLoaderFactory) loader: ProjectLoader,
  ) {
    const out = await loader.load(experience.id);
    return out?.values || [];
  }

  @ResolveField(() => [Achievement])
  async achievements(
    @Parent() experience: Experience,
    @Loader(AchievementLoaderFactory) loader: AchievementLoader,
  ) {
    const out = await loader.load(experience.id);
    return out?.values || [];
  }
}
