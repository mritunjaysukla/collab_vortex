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
    let fileData = null;
    if (profileImage) {
      fileData = await this.fileUploadService.saveFile(profileImage, 'creator-profiles');
      createCreatorProfileDto.profileImageFilename = fileData.filename;
      createCreatorProfileDto.profileImageMimetype = fileData.mimetype;
    }

    return await this.creatorProfileService.create(req.user.id, createCreatorProfileDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all creator profiles' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of all creator profiles',
  //   type: [CreatorProfileResponseDto],
  // })
  // async findAll() {
  //   return await this.creatorProfileService.findAll();
  // }

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
}
