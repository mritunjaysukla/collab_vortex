import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
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
} from '@nestjs/swagger';
import { CreatorProfileService } from './creator-profile.service';
import {
  CreateCreatorProfileDto,
  UpdateCreatorProfileDto,
  CreatorProfileResponseDto,
} from './dto/creator-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { IsProfileCreationRoute } from '../common/decorators/profile-completion.decorator';
import { UserRole } from '../common/enums';
import { FileUploadService } from '../common/services/file-upload.service';

@ApiTags('creator-profiles')
@Controller('creator-profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreatorProfileController {
  constructor(
    private readonly creatorProfileService: CreatorProfileService,
    private readonly fileUploadService: FileUploadService
  ) { }

  @Post()
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create creator profile' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Creator profile created successfully',
    type: CreatorProfileResponseDto,
  })
  @UseInterceptors(FileInterceptor('profileImage'))
  async create(
    @Request() req,
    @Body() createCreatorProfileDto: CreateCreatorProfileDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    try {
      // Parse arrays from form data
      if (createCreatorProfileDto.platformStats) {
        if (typeof createCreatorProfileDto.platformStats === 'string') {
          try {
            createCreatorProfileDto.platformStats = JSON.parse(createCreatorProfileDto.platformStats);
          } catch (e) {
            throw new BadRequestException('Invalid JSON format for platformStats');
          }
        }
        // Ensure it's an array
        if (!Array.isArray(createCreatorProfileDto.platformStats)) {
          throw new BadRequestException('platformStats must be an array');
        }

        // Validate each platform stats object
        for (const stat of createCreatorProfileDto.platformStats) {
          if (typeof stat !== 'object' || stat === null) {
            throw new BadRequestException('Each platformStats item must be an object');
          }
          if (!stat.platform || typeof stat.platform !== 'string') {
            throw new BadRequestException('Each platformStats item must have a platform string');
          }
          if (typeof stat.followers !== 'number' || stat.followers < 0) {
            throw new BadRequestException('Each platformStats item must have a valid followers number');
          }
          if (typeof stat.engagementRate !== 'number' || stat.engagementRate < 0) {
            throw new BadRequestException('Each platformStats item must have a valid engagementRate number');
          }
          if (typeof stat.avgViews !== 'number' || stat.avgViews < 0) {
            throw new BadRequestException('Each platformStats item must have a valid avgViews number');
          }
        }
      } else {
        // Set default empty array if not provided
        createCreatorProfileDto.platformStats = [];
      }

      if (createCreatorProfileDto.niches) {
        if (typeof createCreatorProfileDto.niches === 'string') {
          try {
            createCreatorProfileDto.niches = JSON.parse(createCreatorProfileDto.niches);
          } catch (e) {
            throw new BadRequestException('Invalid JSON format for niches');
          }
        }
        // Ensure it's an array
        if (!Array.isArray(createCreatorProfileDto.niches)) {
          throw new BadRequestException('niches must be an array');
        }

        // Validate each niche is a string
        for (const niche of createCreatorProfileDto.niches) {
          if (typeof niche !== 'string') {
            throw new BadRequestException('Each niche must be a string');
          }
        }
      } else {
        // Set default empty array if not provided
        createCreatorProfileDto.niches = [];
      }

      let fileData = null;
      if (profileImage) {
        fileData = await this.fileUploadService.saveFile(profileImage, 'creator-profiles');
        createCreatorProfileDto.profileImageFilename = fileData.filename;
        createCreatorProfileDto.profileImageMimetype = fileData.mimetype;
      }

      return await this.creatorProfileService.create(req.user.id, createCreatorProfileDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof SyntaxError) {
        throw new BadRequestException(
          'Invalid JSON format for array fields. Please ensure platformStats and niches are valid JSON arrays.'
        );
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all creator profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of all creator profiles',
    type: [CreatorProfileResponseDto],
  })
  async findAll() {
    return await this.creatorProfileService.findAll();
  }

  @Get('verified')
  @ApiOperation({ summary: 'Get verified creator profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of verified creator profiles',
    type: [CreatorProfileResponseDto],
  })
  async findVerified() {
    return await this.creatorProfileService.findVerifiedCreators();
  }

  // @Get('search')
  // @ApiOperation({ summary: 'Search creators by niches' })
  // @ApiQuery({ name: 'niches', type: [String], example: ['lifestyle', 'fashion'] })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Creators matching the niches',
  //   type: [CreatorProfileResponseDto],
  // })
  // async searchByNiches(@Query('niches') niches: string[]) {
  //   const nichesArray = Array.isArray(niches) ? niches : [niches];
  //   return await this.creatorProfileService.findByNiches(nichesArray);
  // }

  @Get('me')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get current user creator profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user creator profile',
    type: CreatorProfileResponseDto,
  })
  async getMyProfile(@Request() req) {
    return await this.creatorProfileService.findByUserId(req.user.id);
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get creator profile by ID' })
  // @ApiParam({ name: 'id', description: 'Creator profile ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Creator profile found',
  //   type: CreatorProfileResponseDto,
  // })
  // async findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return await this.creatorProfileService.findOne(id);
  // }

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
  @UseInterceptors(FileInterceptor('profileImage'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCreatorProfileDto: UpdateCreatorProfileDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    try {
      // Parse arrays from form data
      if (updateCreatorProfileDto.platformStats) {
        if (typeof updateCreatorProfileDto.platformStats === 'string') {
          try {
            updateCreatorProfileDto.platformStats = JSON.parse(updateCreatorProfileDto.platformStats);
          } catch (e) {
            throw new BadRequestException('Invalid JSON format for platformStats');
          }
        }
        // Ensure it's an array if provided
        if (updateCreatorProfileDto.platformStats !== undefined && !Array.isArray(updateCreatorProfileDto.platformStats)) {
          throw new BadRequestException('platformStats must be an array');
        }

        // Validate each platform stats object
        if (Array.isArray(updateCreatorProfileDto.platformStats)) {
          for (const stat of updateCreatorProfileDto.platformStats) {
            if (typeof stat !== 'object' || stat === null) {
              throw new BadRequestException('Each platformStats item must be an object');
            }
            if (!stat.platform || typeof stat.platform !== 'string') {
              throw new BadRequestException('Each platformStats item must have a platform string');
            }
            if (typeof stat.followers !== 'number' || stat.followers < 0) {
              throw new BadRequestException('Each platformStats item must have a valid followers number');
            }
            if (typeof stat.engagementRate !== 'number' || stat.engagementRate < 0) {
              throw new BadRequestException('Each platformStats item must have a valid engagementRate number');
            }
            if (typeof stat.avgViews !== 'number' || stat.avgViews < 0) {
              throw new BadRequestException('Each platformStats item must have a valid avgViews number');
            }
          }
        }
      }

      if (updateCreatorProfileDto.niches) {
        if (typeof updateCreatorProfileDto.niches === 'string') {
          try {
            updateCreatorProfileDto.niches = JSON.parse(updateCreatorProfileDto.niches);
          } catch (e) {
            throw new BadRequestException('Invalid JSON format for niches');
          }
        }
        // Ensure it's an array if provided
        if (updateCreatorProfileDto.niches !== undefined && !Array.isArray(updateCreatorProfileDto.niches)) {
          throw new BadRequestException('niches must be an array');
        }

        // Validate each niche is a string
        if (Array.isArray(updateCreatorProfileDto.niches)) {
          for (const niche of updateCreatorProfileDto.niches) {
            if (typeof niche !== 'string') {
              throw new BadRequestException('Each niche must be a string');
            }
          }
        }
      }

      // If a new image is uploaded, save it and update the DTO
      if (profileImage) {
        // Get the existing profile to see if we need to delete an old image
        const existingProfile = await this.creatorProfileService.findOne(id);

        // Delete the old image if it exists
        if (existingProfile.profileImageFilename) {
          await this.fileUploadService.deleteFile(
            existingProfile.profileImageFilename,
            'creator-profiles'
          );
        }

        // Save the new image
        const fileData = await this.fileUploadService.saveFile(profileImage, 'creator-profiles');
        updateCreatorProfileDto.profileImageFilename = fileData.filename;
        updateCreatorProfileDto.profileImageOriginalname = fileData.originalname;
        updateCreatorProfileDto.profileImageMimetype = fileData.mimetype;
      }

      return await this.creatorProfileService.update(id, updateCreatorProfileDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof SyntaxError) {
        throw new BadRequestException(
          'Invalid JSON format for array fields. Please ensure platformStats and niches are valid JSON arrays.'
        );
      }
      throw error;
    }
  }

  @Delete(':id')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete creator profile' })
  @ApiParam({ name: 'id', description: 'Creator profile ID' })
  @ApiResponse({ status: 200, description: 'Creator profile deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.creatorProfileService.remove(id);
    return { message: 'Creator profile deleted successfully' };
  }

  @Get('completion-status')
  @UseGuards(JwtAuthGuard) // Only JwtAuthGuard, no ProfileCompletionGuard
  @IsProfileCreationRoute() // Mark as a profile creation route
  @ApiOperation({ summary: 'Check profile completion status' })
  @ApiResponse({ status: 200, description: 'Profile completion status' })
  async getProfileCompletionStatus(@Request() req) {
    const user = await this.creatorProfileService.findByUserId(req.user.id);
    return {
      isComplete: !!user && req.user.isActive,
      profile: user || null
    };
  }
}
