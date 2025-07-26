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
  UsePipes,
  ValidationPipe,
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
import { BrandProfileService } from './brand-profile.service';
import {
  CreateBrandProfileDto,
  UpdateBrandProfileDto,
  BrandProfileResponseDto,
} from './dto/brand-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { FileUploadService } from '../common/services/file-upload.service';
import { IsProfileCreationRoute } from '../common/decorators/profile-completion.decorator';

@ApiTags('brand-profiles')
@Controller('brand-profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BrandProfileController {
  constructor(
    private readonly brandProfileService: BrandProfileService,
    private readonly fileUploadService: FileUploadService
  ) { }

  @Post()
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @IsProfileCreationRoute() // MOVED HERE - Allow access without completed profile
  @ApiOperation({ summary: 'Create brand profile' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Brand profile created successfully',
    type: BrandProfileResponseDto,
  })
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @Request() req,
    @Body() createBrandProfileDto: CreateBrandProfileDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    // Handle file upload if present
    if (logo) {
      const fileData = await this.fileUploadService.saveFile(logo, 'brand-profiles');
      createBrandProfileDto.logoFilename = fileData.filename;
      createBrandProfileDto.logoMimetype = fileData.mimetype;
    }

    return this.brandProfileService.create(req.user.sub, createBrandProfileDto);
  }

  @Get('completion-status')
  @Roles(UserRole.BRAND) // FIXED: Should be BRAND, not CREATOR
  @UseGuards(RolesGuard)
  @IsProfileCreationRoute() // Allow access without completed profile
  @ApiOperation({
    summary: 'Get brand profile completion status',
    description: 'Check if the current brand user has completed their profile setup'
  })
  @ApiResponse({ status: 200, description: 'Profile completion status' })
  async getProfileCompletionStatus(@Request() req) {
    try {
      const profile = await this.brandProfileService.findByUserId(req.user.sub); // FIXED: Use req.user.sub
      return {
        isComplete: !!profile && req.user.isActive,
        profile: profile || null
      };
    } catch (error) {
      return {
        isComplete: false,
        profile: null
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all brand profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of brand profiles',
    type: [BrandProfileResponseDto],
  })
  async findAll() {
    return await this.brandProfileService.findAll();
  }

  @Get('me')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @IsProfileCreationRoute()
  @ApiOperation({ summary: 'Get current user brand profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user brand profile',
    type: BrandProfileResponseDto,
  })
  async getMyProfile(@Request() req) {
    return await this.brandProfileService.findByUserId(req.user.sub); // FIXED: Use req.user.sub
  }

  @Patch(':id')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update brand profile' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Brand profile ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand profile updated successfully',
    type: BrandProfileResponseDto,
  })
  @UseInterceptors(FileInterceptor('logo'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandProfileDto: UpdateBrandProfileDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    try {
      // Parse arrays from form data
      if (updateBrandProfileDto.targetAudience) {
        if (typeof updateBrandProfileDto.targetAudience === 'string') {
          try {
            updateBrandProfileDto.targetAudience = JSON.parse(updateBrandProfileDto.targetAudience);
          } catch (e) {
            throw new BadRequestException('Invalid JSON format for targetAudience');
          }
        }
        // Ensure it's an array if provided
        if (updateBrandProfileDto.targetAudience !== undefined && !Array.isArray(updateBrandProfileDto.targetAudience)) {
          throw new BadRequestException('targetAudience must be an array');
        }
      }

      // If a new logo is uploaded, save it and update the DTO
      if (logo) {
        // Get the existing profile to see if we need to delete an old logo
        const existingProfile = await this.brandProfileService.findOne(id);

        // Delete the old logo if it exists
        if (existingProfile.logoFilename) {
          await this.fileUploadService.deleteFile(
            existingProfile.logoFilename,
            'brand-profiles'
          );
        }

        // Save the new logo
        const fileData = await this.fileUploadService.saveFile(logo, 'brand-profiles');
        updateBrandProfileDto.logoFilename = fileData.filename;
        updateBrandProfileDto.logoMimetype = fileData.mimetype;
      }

      return await this.brandProfileService.update(id, updateBrandProfileDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw error;
    }
  }

  @Delete(':id')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete brand profile' })
  @ApiParam({ name: 'id', description: 'Brand profile ID' })
  @ApiResponse({ status: 200, description: 'Brand profile deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.brandProfileService.remove(id);
    return { message: 'Brand profile deleted successfully' };
  }
}
