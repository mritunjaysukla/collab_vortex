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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
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

@ApiTags('brand-profiles')
@Controller('brand-profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BrandProfileController {
  constructor(private readonly brandProfileService: BrandProfileService) { }

  @Post()
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create brand profile' })
  @ApiResponse({
    status: 201,
    description: 'Brand profile created successfully',
    type: BrandProfileResponseDto,
  })
  async create(
    @Request() req,
    @Body() createBrandProfileDto: CreateBrandProfileDto,
  ) {
    return await this.brandProfileService.create(req.user.id, createBrandProfileDto);
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

  @Get('verified')
  @ApiOperation({ summary: 'Get verified brand profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of verified brand profiles',
    type: [BrandProfileResponseDto],
  })
  async findVerified() {
    return await this.brandProfileService.findVerifiedBrands();
  }

  @Get('search/industry')
  @ApiOperation({ summary: 'Search brands by industry' })
  @ApiQuery({
    name: 'industry',
    description: 'Industry to filter by',
    example: 'Fashion & Lifestyle',
  })
  @ApiResponse({
    status: 200,
    description: 'List of brands in the specified industry',
    type: [BrandProfileResponseDto],
  })
  async findByIndustry(@Query('industry') industry: string) {
    return await this.brandProfileService.findByIndustry(industry);
  }

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

  @Get(':id')
  @ApiOperation({ summary: 'Get brand profile by ID' })
  @ApiParam({ name: 'id', description: 'Brand profile ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand profile found',
    type: BrandProfileResponseDto,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.brandProfileService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update brand profile' })
  @ApiParam({ name: 'id', description: 'Brand profile ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand profile updated successfully',
    type: BrandProfileResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandProfileDto: UpdateBrandProfileDto,
  ) {
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
