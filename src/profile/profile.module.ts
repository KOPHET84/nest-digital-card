import { Module } from '@nestjs/common';
import { ProfileResolver } from './resolvers/profile.resolver.js';
import { ProfileService } from './profile.service.js';
import { LinkLoaderFactory } from './loaders/link.loader.js';
import { ProjectLoaderFactory } from './loaders/project.loader.js';
import { AchievementLoaderFactory } from './loaders/achievement.loader.js';
import { SkillsLoaderFactory } from './loaders/skill.loader.js';
import { ExperienceLoaderFactory } from './loaders/experience.loader.js';
import { ExperienceResolver } from './resolvers/experience.resolver.js';
import { ProfileFieldsResolver } from './resolvers/profile-fields.resolver.js';

@Module({
  providers: [
    ProfileService,
    ProfileResolver,
    ProfileFieldsResolver,
    ExperienceResolver,
    LinkLoaderFactory,
    ProjectLoaderFactory,
    AchievementLoaderFactory,
    SkillsLoaderFactory,
    ExperienceLoaderFactory,
  ],
  exports: [
    LinkLoaderFactory,
    ProjectLoaderFactory,
    AchievementLoaderFactory,
    SkillsLoaderFactory,
    ExperienceLoaderFactory,
  ],
})
export class ProfileModule {}
