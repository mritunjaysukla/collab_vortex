import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class FileUploadService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    // Set upload directory - could be configured from .env
    this.uploadDir = this.configService.get('UPLOAD_DIR') || join(process.cwd(), 'storage', 'uploads');

    // Ensure upload directory exists
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Saves an uploaded file to the server's filesystem
   * @param file The uploaded file
   * @param subfolder Optional subfolder within the uploads directory
   * @returns The saved file information
   */
  async saveFile(file: Express.Multer.File, subfolder: string = ''): Promise<{
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
  }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type (allow only jpeg, jpg, png)
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG, JPG, and PNG files are allowed');
    }

    // Generate a unique filename
    const fileExtension = file.originalname.split('.').pop();
    const randomName = crypto.randomBytes(16).toString('hex');
    const filename = `${randomName}.${fileExtension}`;

    // Create subfolder if needed
    const targetDir = subfolder ? join(this.uploadDir, subfolder) : this.uploadDir;
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    // Save the file
    const filepath = join(targetDir, filename);
    fs.writeFileSync(filepath, file.buffer);

    return {
      filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: subfolder ? join(subfolder, filename) : filename,
    };
  }

  /**
   * Deletes a file from the server's filesystem
   * @param filename The name of the file to delete
   * @param subfolder Optional subfolder within the uploads directory
   * @returns Boolean indicating success
   */
  async deleteFile(filename: string, subfolder: string = ''): Promise<boolean> {
    if (!filename) return false;

    const filepath = subfolder
      ? join(this.uploadDir, subfolder, filename)
      : join(this.uploadDir, filename);

    if (existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }

    return false;
  }

  /**
   * Gets the full path to a file
   * @param filename The name of the file
   * @param subfolder Optional subfolder within the uploads directory
   * @returns The full path to the file
   */
  getFilePath(filename: string, subfolder: string = ''): string {
    return subfolder
      ? join(this.uploadDir, subfolder, filename)
      : join(this.uploadDir, filename);
  }
}
