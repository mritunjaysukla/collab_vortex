import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private readonly uploadsDir: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.uploadsDir = this.configService.get('UPLOADS_DIR', './uploads');
    this.baseUrl = this.configService.get('BASE_URL', 'http://localhost:3001');
    this.ensureDirectoryExists(this.uploadsDir);
  }

  /**
   * Saves file and returns file info with direct access URL
   */
  async saveFile(file: Express.Multer.File, subfolder: string = ''): Promise<{
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
    url: string; // NEW: Direct access URL
    cdnUrl: string; // NEW: CDN-style URL for direct access
  }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/mpeg',
      'application/pdf'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('File too large. Maximum size is 10MB');
    }

    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const randomName = crypto.randomBytes(16).toString('hex');
    const filename = `${randomName}.${fileExtension}`;

    // Create subfolder path
    const folderPath = path.join(this.uploadsDir, subfolder);
    this.ensureDirectoryExists(folderPath);

    const filePath = path.join(folderPath, filename);
    const relativePath = path.join(subfolder, filename);

    try {
      // Save file to disk
      fs.writeFileSync(filePath, file.buffer);

      this.logger.log(`File saved: ${relativePath}`);

      return {
        filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: relativePath,
        url: `${this.baseUrl}/media/${subfolder}/${filename}`, // Direct media URL
        cdnUrl: `${this.baseUrl}/cdn/${subfolder}/${filename}`, // CDN-style URL
      };
    } catch (error) {
      this.logger.error('File save failed:', error);
      throw new BadRequestException('File upload failed');
    }
  }

  /**
   * Gets file stream for serving
   */
  async getFileStream(relativePath: string): Promise<{
    stream: fs.ReadStream;
    contentType: string;
    contentLength: number;
    filename: string;
  }> {
    const fullPath = path.join(this.uploadsDir, relativePath);

    if (!fs.existsSync(fullPath)) {
      throw new BadRequestException('File not found');
    }

    try {
      const stats = fs.statSync(fullPath);
      const stream = fs.createReadStream(fullPath);

      // Determine content type based on file extension
      const ext = path.extname(fullPath).toLowerCase();
      const contentType = this.getContentType(ext);

      return {
        stream,
        contentType,
        contentLength: stats.size,
        filename: path.basename(fullPath),
      };
    } catch (error) {
      this.logger.error(`Failed to read file: ${relativePath}`, error);
      throw new BadRequestException('Failed to read file');
    }
  }

  /**
   * Deletes file from storage
   */
  async deleteFile(filename: string, subfolder: string = ''): Promise<boolean> {
    const filePath = path.join(this.uploadsDir, subfolder, filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.log(`File deleted: ${subfolder}/${filename}`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Failed to delete file: ${subfolder}/${filename}`, error);
      return false;
    }
  }

  /**
   * Gets direct URL for file access
   */
  getFileUrl(filename: string, subfolder: string = ''): string {
    if (!filename) return null;
    return `${this.baseUrl}/media/${subfolder}/${filename}`;
  }

  /**
   * Gets CDN-style URL for file access
   */
  getCdnUrl(filename: string, subfolder: string = ''): string {
    if (!filename) return null;
    return `${this.baseUrl}/cdn/${subfolder}/${filename}`;
  }

  /**
   * Generates multiple size URLs for images (thumbnail, medium, large)
   */
  getImageUrls(filename: string, subfolder: string = ''): {
    original: string;
    thumbnail: string;
    medium: string;
    large: string;
  } {
    if (!filename) {
      return {
        original: null,
        thumbnail: null,
        medium: null,
        large: null,
      };
    }

    const baseUrl = `${this.baseUrl}/media/${subfolder}/${filename}`;

    return {
      original: baseUrl,
      thumbnail: `${baseUrl}?size=thumbnail`, // 150x150
      medium: `${baseUrl}?size=medium`,       // 400x400
      large: `${baseUrl}?size=large`,         // 800x800
    };
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      this.logger.log(`Directory created: ${dirPath}`);
    }
  }

  private getContentType(extension: string): string {
    const contentTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4',
      '.mpeg': 'video/mpeg',
      '.pdf': 'application/pdf',
    };

    return contentTypes[extension] || 'application/octet-stream';
  }
}
