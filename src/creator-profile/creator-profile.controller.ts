import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ForbiddenException,
  Logger,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CreatorProfileService } from './creator-profile.service';
import {
  CreateCreatorProfileDto,
  UpdateCreatorProfileDto,
  CreatorProfileResponseDto,
  CreatorProfileQueryDto,
  CreatorProfileStatsDto,
  CreatorNiche,
} from './dto/creator-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { FileUploadService } from '../common/services/file-upload.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { IsProfileCreationRoute } from '../common/decorators/profile-completion.decorator';

@ApiTags('creator-profiles')
@Controller('creator-profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreatorProfileController {
  private readonly logger = new Logger(CreatorProfileController.name);

  constructor(
    private readonly creatorProfileService: CreatorProfileService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  @Post()
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @IsProfileCreationRoute() // ADD THIS DECORATOR - This allows access without completed profile
  @ApiOperation({
    summary: 'Create creator profile',
    description: 'Create a new creator profile with platform statistics and media uploads. Only users with CREATOR role can create profiles.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Creator profile data with optional image upload',
    type: CreateCreatorProfileDto,
    examples: {
      'complete-profile': {
        summary: 'Complete Creator Profile',
        description: 'Full creator profile with all fields',
        value: {
          name: 'Sarah Johnson',
          bio: 'Passionate lifestyle and fashion content creator',
          platformStats: '[{"platform":"instagram","followers":50000,"engagementRate":5.2,"avgViews":15000},{"platform":"tiktok","followers":25000,"engagementRate":7.8,"avgViews":30000}]',
          niches: '["lifestyle","fashion","beauty"]',
          location: 'New York, NY',
          website: 'https://sarahjohnson.com',
          portfolioUrl: 'https://portfolio.sarahjohnson.com',
          mediaKit: 'https://drive.google.com/file/d/mediakit',
          baseRate: '750',
          socialLinks: '{"instagram":"https://instagram.com/sarah","tiktok":"https://tiktok.com/@sarah"}',
          isAvailable: 'true',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Creator profile created successfully',
    type: CreatorProfileResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 409,
    description: 'Creator profile already exists',
  })
  @UseInterceptors(FileInterceptor('profileImage'))
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createCreatorProfileDto: CreateCreatorProfileDto,
    @UploadedFile() profileImage?: Express.Multer.File,
  ): Promise<CreatorProfileResponseDto> {
    try {
      // Handle file uploads
      if (profileImage) {
        const fileData = await this.fileUploadService.saveFile(profileImage, 'creator-profiles');
        createCreatorProfileDto.profileImageFilename = fileData.filename;
        createCreatorProfileDto.profileImageMimetype = fileData.mimetype;
        createCreatorProfileDto.profileImageSize = fileData.size;
      }

      return await this.creatorProfileService.create(user.sub, createCreatorProfileDto);
    } catch (error) {
      this.logger.error(`Error creating creator profile: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Add profile completion status endpoint
  @Get('profile-completion-status')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @IsProfileCreationRoute() // ADD THIS DECORATOR - Allow access without completed profile
  @ApiOperation({
    summary: 'Get creator profile completion status',
    description: 'Check if the current creator user has completed their profile setup'
  })
  @ApiResponse({
    status: 200,
    description: 'Profile completion status',
    schema: {
      type: 'object',
      properties: {
        isComplete: { type: 'boolean' },
        profile: { type: 'object', nullable: true }
      }
    }
  })
  async getProfileCompletionStatus(@Request() req) {
    try {
      const profile = await this.creatorProfileService.findByUserId(req.user.sub);
      return {
        isComplete: !!profile && req.user.isActive,
        profile: profile || null
      };
    } catch (error) {
      // If profile not found, it's not complete
      return {
        isComplete: false,
        profile: null
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all creator profiles with optional filtering' })
  @ApiResponse({
    status: 200,
    description: 'List of creator profiles',
    type: [CreatorProfileResponseDto],
  })
  async findAll(@Query() queryDto: CreatorProfileQueryDto): Promise<CreatorProfileResponseDto[]> {
    return this.creatorProfileService.findAll(queryDto);
  }

  @Get('verified')
  @ApiOperation({ summary: 'Get verified creator profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of verified creator profiles',
    type: [CreatorProfileResponseDto],
  })
  async findVerified(): Promise<CreatorProfileResponseDto[]> {
    return this.creatorProfileService.findVerifiedCreators();
  }

  @Get('niche/:niche')
  @ApiOperation({ summary: 'Get creators by niche' })
  @ApiResponse({
    status: 200,
    description: 'Creators in the specified niche',
    type: [CreatorProfileResponseDto],
  })
  @ApiParam({ name: 'niche', description: 'Niche name', enum: CreatorNiche })
  async findByNiche(@Param('niche') niche: string): Promise<CreatorProfileResponseDto[]> {
    return this.creatorProfileService.findByNiche(niche);
  }

  @Get('me')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @IsProfileCreationRoute()
  @ApiOperation({ summary: 'Get current user creator profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user creator profile',
    type: CreatorProfileResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Creator profile not found',
  })
  async getMyProfile(@CurrentUser() user: JwtPayload): Promise<CreatorProfileResponseDto> {
    return this.creatorProfileService.findByUserId(user.sub);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get creator profile statistics' })
  @ApiResponse({
    status: 200,
    description: 'Creator profile statistics',
    type: CreatorProfileStatsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Creator profile not found',
  })
  @ApiParam({ name: 'id', description: 'Creator profile ID' })
  async getStatistics(@Param('id', ParseUUIDPipe) id: string): Promise<CreatorProfileStatsDto> {
    return this.creatorProfileService.getStatistics(id);
  }

  @Patch(':id')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update creator profile' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Creator profile ID' })
  @ApiResponse({
    status: 200,
    description: 'Creator profile updated successfully',
    type: CreatorProfileResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Creator profile not found',
  })
  @UseInterceptors(FileInterceptor('profileImage'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCreatorProfileDto: UpdateCreatorProfileDto,
    @UploadedFile() profileImage: Express.Multer.File,
    @CurrentUser() user: JwtPayload,
  ): Promise<CreatorProfileResponseDto> {
    try {
      // Verify ownership
      const existingProfile = await this.creatorProfileService.findOne(id);
      if (existingProfile.user?.id !== user.sub) {
        throw new ForbiddenException('You can only update your own profile');
      }

      // Handle file upload
      if (profileImage) {
        // Delete old image if it exists
        if (existingProfile.profileImageFilename) {
          await this.fileUploadService.deleteFile(
            existingProfile.profileImageFilename,
            'creator-profiles'
          );
        }

        // Save new image
        const fileData = await this.fileUploadService.saveFile(profileImage, 'creator-profiles');
        updateCreatorProfileDto.profileImageFilename = fileData.filename;
        updateCreatorProfileDto.profileImageMimetype = fileData.mimetype;
        updateCreatorProfileDto.profileImageSize = fileData.size;
      }

      return this.creatorProfileService.update(id, updateCreatorProfileDto);
    } catch (error) {
      this.logger.error(`Error updating creator profile: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Patch(':id/availability')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update creator availability status' })
  @ApiParam({ name: 'id', description: 'Creator profile ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isAvailable: {
          type: 'boolean',
          description: 'Availability status',
        },
      },
      required: ['isAvailable'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Availability updated successfully',
    type: CreatorProfileResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Creator profile not found',
  })
  async updateAvailability(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('isAvailable') isAvailable: boolean,
    @CurrentUser() user: JwtPayload,
  ): Promise<CreatorProfileResponseDto> {
    try {
      // Verify ownership
      const existingProfile = await this.creatorProfileService.findOne(id);
      if (existingProfile.user?.id !== user.sub) {
        throw new ForbiddenException('You can only update your own profile');
      }

      return this.creatorProfileService.updateAvailability(id, isAvailable);
    } catch (error) {
      this.logger.error(`Error updating availability: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Delete(':id')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete creator profile' })
  @ApiParam({ name: 'id', description: 'Creator profile ID' })
  @ApiResponse({
    status: 204,
    description: 'Creator profile deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Creator profile not found',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    try {
      // Verify ownership
      const existingProfile = await this.creatorProfileService.findOne(id);
      if (existingProfile.user?.id !== user.sub) {
        throw new ForbiddenException('You can only delete your own profile');
      }

      // Delete associated files
      if (existingProfile.profileImageFilename) {
        await this.fileUploadService.deleteFile(
          existingProfile.profileImageFilename,
          'creator-profiles'
        );
      }

      return this.creatorProfileService.remove(id);
    } catch (error) {
      this.logger.error(`Error deleting creator profile: ${error.message}`, error.stack);
      throw error;
    }
  }
}
