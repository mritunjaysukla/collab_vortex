import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandProfile } from './entities/brand-profile.entity';
import { CreateBrandProfileDto, UpdateBrandProfileDto } from './dto/brand-profile.dto';
import { UsersService } from '../users/users.service';
import { FileUploadService } from '../common/services/file-upload.service';

@Injectable()
export class BrandProfileService {
  constructor(
    @InjectRepository(BrandProfile)
    private readonly brandProfileRepository: Repository<BrandProfile>,
    private readonly usersService: UsersService,
    private readonly fileUploadService: FileUploadService
  ) { }

  async create(
    userId: string,
    createBrandProfileDto: CreateBrandProfileDto,
  ): Promise<BrandProfile> {
    // Create the profile
    const profile = this.brandProfileRepository.create({
      ...createBrandProfileDto,
      user: { id: userId } as any,
    });
    const savedProfile = await this.brandProfileRepository.save(profile);

    // Activate the user once profile is created
    await this.usersService.activate(userId);

    return savedProfile;
  }

  async findAll(): Promise<BrandProfile[]> {
    return await this.brandProfileRepository.find({
      relations: ['user', 'campaigns'],
    });
  }

  async findOne(id: string): Promise<BrandProfile> {
    const profile = await this.brandProfileRepository.findOne({
      where: { id },
      relations: ['user', 'campaigns'],
    });

    if (!profile) {
      throw new NotFoundException(`Brand profile with ID ${id} not found`);
    }

    return profile;
  }

  async findByUserId(userId: string): Promise<BrandProfile | null> {
    return await this.brandProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'campaigns'],
    });
  }

  async update(
    id: string,
    updateBrandProfileDto: UpdateBrandProfileDto,
  ): Promise<BrandProfile> {
    const profile = await this.findOne(id);
    Object.assign(profile, updateBrandProfileDto);
    return await this.brandProfileRepository.save(profile);
  }

  async remove(id: string): Promise<void> {
    const profile = await this.findOne(id);
    await this.brandProfileRepository.remove(profile);
  }

  async findVerifiedBrands(): Promise<BrandProfile[]> {
    return await this.brandProfileRepository.find({
      where: { verified: true },
      relations: ['user'],
    });
  }

  async findByIndustry(industry: string): Promise<BrandProfile[]> {
    return await this.brandProfileRepository.find({
      where: { industry },
      relations: ['user'],
    });
  }
}
