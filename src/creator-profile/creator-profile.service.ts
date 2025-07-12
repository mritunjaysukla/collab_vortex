import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatorProfile } from './entities/creator-profile.entity';
import { CreateCreatorProfileDto, UpdateCreatorProfileDto } from './dto/creator-profile.dto';

@Injectable()
export class CreatorProfileService {
  constructor(
    @InjectRepository(CreatorProfile)
    private readonly creatorProfileRepository: Repository<CreatorProfile>,
  ) { }

  async create(
    userId: string,
    createCreatorProfileDto: CreateCreatorProfileDto,
  ): Promise<CreatorProfile> {
    const profile = this.creatorProfileRepository.create({
      ...createCreatorProfileDto,
      user: { id: userId } as any,
    });
    return await this.creatorProfileRepository.save(profile);
  }

  async findAll(): Promise<CreatorProfile[]> {
    return await this.creatorProfileRepository.find({
      relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
    });
  }

  async findOne(id: string): Promise<CreatorProfile> {
    const profile = await this.creatorProfileRepository.findOne({
      where: { id },
      relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
    });

    if (!profile) {
      throw new NotFoundException(`Creator profile with ID ${id} not found`);
    }

    return profile;
  }

  async findByUserId(userId: string): Promise<CreatorProfile | null> {
    return await this.creatorProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
    });
  }

  async update(
    id: string,
    updateCreatorProfileDto: UpdateCreatorProfileDto,
  ): Promise<CreatorProfile> {
    const profile = await this.findOne(id);
    Object.assign(profile, updateCreatorProfileDto);
    return await this.creatorProfileRepository.save(profile);
  }

  async remove(id: string): Promise<void> {
    const profile = await this.findOne(id);
    await this.creatorProfileRepository.remove(profile);
  }

  async findVerifiedCreators(): Promise<CreatorProfile[]> {
    return await this.creatorProfileRepository.find({
      where: { isVerified: true },
      relations: ['user'],
    });
  }

  async findByNiches(niches: string[]): Promise<CreatorProfile[]> {
    return await this.creatorProfileRepository
      .createQueryBuilder('creator')
      .leftJoinAndSelect('creator.user', 'user')
      .where('creator.niches && :niches', { niches })
      .getMany();
  }
}
