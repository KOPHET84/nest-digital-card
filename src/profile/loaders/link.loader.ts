import { Injectable, type ExecutionContext } from '@nestjs/common';
import { Link } from '../../generated/prisma/client.js';

import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { PrismaService } from '../../prisma/prisma.service.js';

type ProfileId = string;
type ProfileLinkInfo = Aggregated<ProfileId, Link>;
export type LinkLoader = LoaderFrom<LinkLoaderFactory>;

@Injectable()
export class LinkLoaderFactory extends DataloaderFactory<
  ProfileId,
  ProfileLinkInfo
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async load(ids: ProfileId[], _context: ExecutionContext) {
    const links = await this.prisma.link.findMany({
      where: { profileId: { in: ids } },
    });
    const out = this.aggregateBy(links, (link) => link.profileId);
    return out;
  }

  id(entity: ProfileLinkInfo): string {
    return entity.id;
  }
}
