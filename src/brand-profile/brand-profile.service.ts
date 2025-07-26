import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandProfile } from './entities/brand-profile.entity';
import { CreateBrandProfileDto, UpdateBrandProfileDto, BrandProfileResponseDto } from './dto/brand-profile.dto'; // ADD BrandProfileResponseDto
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
  ): Promise<BrandProfileResponseDto> { // CHANGED: Return ResponseDto
    // Create the profile with verified = true
    const profile = this.brandProfileRepository.create({
      ...createBrandProfileDto,
      verified: true,
      user: { id: userId } as any,
    });
    const savedProfile = await this.brandProfileRepository.save(profile);

    // Update user status to active and profile complete
    await this.usersService.updateProfileStatus(userId);

    return this.mapToResponseDto(savedProfile); // CHANGED: Map to ResponseDto
  }

  async findAll(): Promise<BrandProfileResponseDto[]> { // CHANGED: Return ResponseDto[]
    const profiles = await this.brandProfileRepository.find({
      relations: ['user', 'campaigns'],
    });
    return profiles.map(profile => this.mapToResponseDto(profile));
  }

  async findOne(id: string): Promise<BrandProfileResponseDto> { // CHANGED: Return ResponseDto
    const profile = await this.brandProfileRepository.findOne({
      where: { id },
      relations: ['user', 'campaigns'],
    });

    if (!profile) {
      throw new NotFoundException(`Brand profile with ID ${id} not found`);
    }

    return this.mapToResponseDto(profile);
  }

  async findByUserId(userId: string): Promise<BrandProfileResponseDto | null> { // CHANGED: Return ResponseDto
    const profile = await this.brandProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'campaigns'],
    });

    return profile ? this.mapToResponseDto(profile) : null;
  }

  async update(
    id: string,
    updateBrandProfileDto: UpdateBrandProfileDto,
  ): Promise<BrandProfileResponseDto> { // CHANGED: Return ResponseDto
    const profileEntity = await this.brandProfileRepository.findOne({
      where: { id },
      relations: ['user', 'campaigns'],
    });

    if (!profileEntity) {
      throw new NotFoundException(`Brand profile with ID ${id} not found`);
    }

    Object.assign(profileEntity, updateBrandProfileDto);
    const updatedProfile = await this.brandProfileRepository.save(profileEntity);
    return this.mapToResponseDto(updatedProfile);
  }

  async remove(id: string): Promise<void> {
    const profile = await this.brandProfileRepository.findOne({
      where: { id },
      relations: ['user', 'campaigns'],
    });

    if (!profile) {
      throw new NotFoundException(`Brand profile with ID ${id} not found`);
    }

    await this.brandProfileRepository.remove(profile);
  }

  async findVerifiedBrands(): Promise<BrandProfileResponseDto[]> { // CHANGED: Return ResponseDto[]
    const profiles = await this.brandProfileRepository.find({
      where: { verified: true },
      relations: ['user'],
    });
    return profiles.map(profile => this.mapToResponseDto(profile));
  }

  async findByIndustry(industry: string): Promise<BrandProfileResponseDto[]> { // CHANGED: Return ResponseDto[]
    const profiles = await this.brandProfileRepository.find({
      where: { industry },
      relations: ['user'],
    });
    return profiles.map(profile => this.mapToResponseDto(profile));
  }

  // ADD: mapToResponseDto method
  private mapToResponseDto(profile: BrandProfile): BrandProfileResponseDto {
    // Generate logo URLs
    const logoUrls = this.fileUploadService.getImageUrls(
      profile.logoFilename,
      'brand-profiles'
    );

    return {
      id: profile.id,
      companyName: profile.companyName,
      industry: profile.industry,
      description: profile.description,
      website: profile.website,
      location: profile.location,
      logoFilename: profile.logoFilename,
      logoMimetype: profile.logoMimetype,
      verified: profile.verified,
      teamSize: profile.teamSize,
      targetAudience: profile.targetAudience || [],
      monthlyBudget: profile.monthlyBudget,

      // NEW: Direct logo URLs
      logoUrl: this.fileUploadService.getFileUrl(
        profile.logoFilename,
        'brand-profiles'
      ),
      logoUrls: logoUrls,
      logoCdnUrl: this.fileUploadService.getCdnUrl(
        profile.logoFilename,
        'brand-profiles'
      ),

      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      user: profile.user ? {
        id: profile.user.id,
        email: profile.user.email,
        role: profile.user.role,
      } : undefined,
    };
  }
}
