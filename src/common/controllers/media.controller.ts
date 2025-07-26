import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
  StreamableFile,
  Query,
  Header,
  BadRequestException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FileUploadService } from '../services/file-upload.service';

// Only import sharp if needed, make it optional
let sharp: any;
try {
  sharp = require('sharp');
} catch (error) {
  console.warn('Sharp not installed. Image processing features will be disabled.');
}

@ApiTags('media')
@Controller()
export class MediaController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  // Standard media endpoint
  @Get('media/:subfolder/:filename')
  @ApiOperation({ summary: 'Get media file' })
  @ApiParam({ name: 'subfolder', description: 'File subfolder (e.g., creator-profiles, brand-profiles)' })
  @ApiParam({ name: 'filename', description: 'File name' })
  @ApiQuery({ name: 'size', required: false, description: 'Image size: thumbnail, medium, large' })
  @ApiResponse({ status: 200, description: 'File served successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getMediaFile(
    @Param('subfolder') subfolder: string,
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
    @Query('size') size?: 'thumbnail' | 'medium' | 'large', // MOVED: Optional parameter after Response
  ): Promise<StreamableFile> {
    try {
      const relativePath = `${subfolder}/${filename}`;
      const fileData = await this.fileUploadService.getFileStream(relativePath);

      // Set caching headers
      res.set({
        'Content-Type': fileData.contentType,
        'Content-Length': fileData.contentLength.toString(),
        'Cache-Control': 'public, max-age=31536000', // 1 year cache
        'ETag': `"${filename}"`,
        'Last-Modified': new Date().toUTCString(),
      });

      // If size is specified and it's an image, resize it
      if (size && fileData.contentType.startsWith('image/') && sharp) {
        const resizedStream = await this.resizeImage(fileData.stream, size);
        return new StreamableFile(resizedStream);
      }

      return new StreamableFile(fileData.stream);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  // CDN-style endpoint
  @Get('cdn/:subfolder/:filename')
  @ApiOperation({ summary: 'Get media file via CDN endpoint' })
  @Header('X-Served-By', 'CollabVortex-CDN')
  async getCdnFile(
    @Param('subfolder') subfolder: string,
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
    @Query('size') size?: 'thumbnail' | 'medium' | 'large', // MOVED: Optional parameter after Response
    @Query('format') format?: 'webp' | 'jpeg' | 'png', // MOVED: Optional parameter after Response
  ): Promise<StreamableFile> {
    try {
      const relativePath = `${subfolder}/${filename}`;
      const fileData = await this.fileUploadService.getFileStream(relativePath);

      // Enhanced caching headers for CDN
      res.set({
        'Content-Type': format ? `image/${format}` : fileData.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"${filename}-${size || 'original'}-${format || 'original'}"`,
        'Vary': 'Accept-Encoding',
        'X-Content-Type-Options': 'nosniff',
      });

      // Process image if needed
      if (fileData.contentType.startsWith('image/') && sharp) {
        const processedStream = await this.processImage(fileData.stream, size, format);
        return new StreamableFile(processedStream);
      }

      return new StreamableFile(fileData.stream);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  // Specific endpoints for each type
  @Get('media/creator-profiles/:filename')
  @ApiOperation({ summary: 'Get creator profile image' })
  async getCreatorProfileImage(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
    @Query('size') size?: 'thumbnail' | 'medium' | 'large', // MOVED: Optional parameter after Response
  ): Promise<StreamableFile> {
    return this.getMediaFile('creator-profiles', filename, res, size);
  }

  @Get('media/brand-profiles/:filename')
  @ApiOperation({ summary: 'Get brand profile logo' })
  async getBrandProfileLogo(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
    @Query('size') size?: 'thumbnail' | 'medium' | 'large', // MOVED: Optional parameter after Response
  ): Promise<StreamableFile> {
    return this.getMediaFile('brand-profiles', filename, res, size);
  }

  @Get('media/deliverables/:filename')
  @ApiOperation({ summary: 'Get deliverable content' })
  async getDeliverableContent(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.getMediaFile('deliverables', filename, res);
  }

  // Image processing helpers
  private async resizeImage(stream: any, size: 'thumbnail' | 'medium' | 'large'): Promise<Buffer> {
    if (!sharp) {
      throw new BadRequestException('Image processing not available');
    }

    const dimensions = {
      thumbnail: { width: 150, height: 150 },
      medium: { width: 400, height: 400 },
      large: { width: 800, height: 800 },
    };

    const { width, height } = dimensions[size];

    try {
      // Convert stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        // FIXED: Type assertion to ensure chunk is Buffer
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);

      // Resize image
      return await sharp(buffer)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toBuffer();
    } catch (error) {
      throw new BadRequestException('Failed to process image');
    }
  }

  private async processImage(
    stream: any,
    size?: 'thumbnail' | 'medium' | 'large',
    format?: 'webp' | 'jpeg' | 'png'
  ): Promise<Buffer> {
    if (!sharp) {
      throw new BadRequestException('Image processing not available');
    }

    try {
      // Convert stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        // FIXED: Type assertion to ensure chunk is Buffer
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);

      let sharpInstance = sharp(buffer);

      // Resize if size specified
      if (size) {
        const dimensions = {
          thumbnail: { width: 150, height: 150 },
          medium: { width: 400, height: 400 },
          large: { width: 800, height: 800 },
        };

        const { width, height } = dimensions[size];
        sharpInstance = sharpInstance.resize(width, height, {
          fit: 'cover',
          position: 'center'
        });
      }

      // Convert format if specified
      if (format === 'webp') {
        return await sharpInstance.webp({ quality: 85 }).toBuffer();
      } else if (format === 'jpeg') {
        return await sharpInstance.jpeg({ quality: 85 }).toBuffer();
      } else if (format === 'png') {
        return await sharpInstance.png({ quality: 85 }).toBuffer();
      }

      return await sharpInstance.toBuffer();
    } catch (error) {
      throw new BadRequestException('Failed to process image');
    }
  }
}
