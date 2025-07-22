import { Controller, Get, Param, Res, NotFoundException, StreamableFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';
import { FileUploadService } from '../services/file-upload.service';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Get('creator-profiles/:filename')
  @ApiOperation({ summary: 'Get creator profile image' })
  @ApiParam({ name: 'filename', description: 'Image filename' })
  async getCreatorProfileImage(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.serveFile(filename, 'creator-profiles', res);
  }

  @Get('brand-profiles/:filename')
  @ApiOperation({ summary: 'Get brand profile logo' })
  @ApiParam({ name: 'filename', description: 'Logo filename' })
  async getBrandProfileLogo(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.serveFile(filename, 'brand-profiles', res);
  }

  @Get('deliverables/:filename')
  @ApiOperation({ summary: 'Get deliverable content' })
  @ApiParam({ name: 'filename', description: 'Content filename' })
  async getDeliverableContent(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.serveFile(filename, 'deliverables', res);
  }

  private async serveFile(
    filename: string,
    subfolder: string,
    res: Response,
  ): Promise<StreamableFile> {
    const filePath = this.fileUploadService.getFilePath(filename, subfolder);

    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    // Set content type based on file extension
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        res.set('Content-Type', 'image/jpeg');
        break;
      case 'png':
        res.set('Content-Type', 'image/png');
        break;
      default:
        res.set('Content-Type', 'application/octet-stream');
    }

    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
}
