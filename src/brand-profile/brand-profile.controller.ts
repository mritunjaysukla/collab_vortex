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
    @Body() createBrandProfileDto: CreateBrandProfileDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    let fileData = null;
    if (logo) {
      fileData = await this.fileUploadService.saveFile(logo, 'brand-profiles');
      createBrandProfileDto.logoFilename = fileData.filename;
      createBrandProfileDto.logoOriginalname = fileData.originalname;
      createBrandProfileDto.logoMimetype = fileData.mimetype;
    }

    return await this.brandProfileService.create(req.user.id, createBrandProfileDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all brand profiles' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of brand profiles',
  //   type: [BrandProfileResponseDto],
  // })
  // async findAll() {
  //   return await this.brandProfileService.findAll();
  // }

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
