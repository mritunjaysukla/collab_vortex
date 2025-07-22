import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadService } from './services/file-upload.service';
import { MediaController } from './controllers/media.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MediaController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class CommonModule { }
