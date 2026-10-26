import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Profile } from '.././models/profile.model.js';
import { Link } from '.././models/link.model.js';
import {
  type LinkLoader,
  LinkLoaderFactory,
} from '.././loaders/link.loader.js';
import { Loader } from '@strv/nestjs-dataloader';
import { Skill } from '.././models/skill.model.js';
import {
  type SkillsLoader,
  SkillsLoaderFactory,
} from '.././loaders/skill.loader.js';
import {
  type ExperienceLoader,
  ExperienceLoaderFactory,
} from '.././loaders/experience.loader.js';
import { Experience } from '.././models/experience.model.js';

@Resolver(() => Profile)
export class ProfileFieldsResolver {
  @ResolveField(() => [Link])
  async links(
    @Parent() profile: Profile,
    @Loader(LinkLoaderFactory) loader: LinkLoader,
  ) {
    const out = await loader.load(profile.id);
    return out?.values || [];
  }

  @ResolveField(() => [Skill])
  async skills(
    @Parent() profile: Profile,
    @Loader(SkillsLoaderFactory) loader: SkillsLoader,
  ) {
    const out = await loader.load(profile.id);
    return out?.values || [];
  }

  @ResolveField(() => [Experience])
  async experience(
    @Parent() profile: Profile,
    @Loader(ExperienceLoaderFactory) loader: ExperienceLoader,
  ) {
    const out = await loader.load(profile.id);
    return out?.values || [];
  }
}
