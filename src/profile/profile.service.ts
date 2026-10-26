import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    return this.prisma.profile.findFirst();
  }
}
