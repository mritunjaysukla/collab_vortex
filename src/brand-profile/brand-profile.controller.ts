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
import { CreateBrandProfileFormDto } from './dto/brand-profile-form.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { FileUploadService } from '../common/services/file-upload.service';

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
    @Body() formData: CreateBrandProfileFormDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    try {
      // Create an empty DTO without any properties to avoid validation errors
      const createBrandProfileDto: any = {};

      // Parse monthlyBudget if provided
      if (formData.monthlyBudget) {
        const monthlyBudget = parseFloat(formData.monthlyBudget);
        if (isNaN(monthlyBudget) || monthlyBudget < 0) {
          throw new BadRequestException('monthlyBudget must be a positive number');
        }
        createBrandProfileDto.monthlyBudget = monthlyBudget;
      }

      // Parse arrays from form data
      if (formData.targetAudience) {
        try {
          const targetAudience = JSON.parse(formData.targetAudience);
          if (!Array.isArray(targetAudience)) {
            throw new BadRequestException('targetAudience must be an array');
          }

          // Don't validate the elements, just ensure it's an array
          createBrandProfileDto.targetAudience = targetAudience;
        } catch (e) {
          if (e instanceof BadRequestException) throw e;
          throw new BadRequestException('Invalid JSON format for targetAudience');
        }
      }

      // Handle the image upload
      if (logo) {
        const fileData = await this.fileUploadService.saveFile(logo, 'brand-profiles');
        createBrandProfileDto.logoFilename = fileData.filename;
        createBrandProfileDto.logoMimetype = fileData.mimetype;
      }

      // Only at the end, set the string fields
      if (formData.companyName) createBrandProfileDto.companyName = formData.companyName;
      if (formData.industry) createBrandProfileDto.industry = formData.industry;
      if (formData.teamSize) createBrandProfileDto.teamSize = formData.teamSize;
      if (formData.description) createBrandProfileDto.description = formData.description;
      if (formData.website) createBrandProfileDto.website = formData.website;
      if (formData.location) createBrandProfileDto.location = formData.location;

      // Parse arrays from form data
      if (formData.targetAudience) {
        try {
          const targetAudience = JSON.parse(formData.targetAudience);
          if (!Array.isArray(targetAudience)) {
            throw new BadRequestException('targetAudience must be an array');
          }

          // Don't validate the elements, just ensure it's an array
          createBrandProfileDto.targetAudience = targetAudience;
        } catch (e) {
          if (e instanceof BadRequestException) throw e;
          throw new BadRequestException('Invalid JSON format for targetAudience');
        }
      }

      return await this.brandProfileService.create(req.user.id, createBrandProfileDto as CreateBrandProfileDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw error;
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

  // @Get('verified')
  // @ApiOperation({ summary: 'Get verified brand profiles' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of verified brand profiles',
  //   type: [BrandProfileResponseDto],
  // })
  // async findVerified() {
  //   return await this.brandProfileService.findVerifiedBrands();
  // }

  // @Get('search/industry')
  // @ApiOperation({ summary: 'Search brands by industry' })
  // @ApiQuery({
  //   name: 'industry',
  //   description: 'Industry to filter by',
  //   example: 'Fashion & Lifestyle',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of brands in the specified industry',
  //   type: [BrandProfileResponseDto],
  // })
  // async findByIndustry(@Query('industry') industry: string) {
  //   return await this.brandProfileService.findByIndustry(industry);
  // }

  @Get('me')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get current user brand profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user brand profile',
    type: BrandProfileResponseDto,
  })
  async getMyProfile(@Request() req) {
    return await this.brandProfileService.findByUserId(req.user.id);
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get brand profile by ID' })
  // @ApiParam({ name: 'id', description: 'Brand profile ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Brand profile found',
  //   type: BrandProfileResponseDto,
  // })
  // async findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return await this.brandProfileService.findOne(id);
  // }

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

  @Get('completion-status')
  @ApiOperation({ summary: 'Check profile completion status' })
  @ApiResponse({ status: 200, description: 'Profile completion status' })
  async getProfileCompletionStatus(@Request() req) {
    const profile = await this.brandProfileService.findByUserId(req.user.id);
    return {
      isComplete: !!profile && req.user.isActive,
      profile: profile || null
    };
  }
}
