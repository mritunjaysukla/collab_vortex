import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsArray, IsDateString, IsObject, IsUUID } from 'class-validator';

export enum DeliverableStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REVISION_REQUESTED = 'revision_requested',
  REJECTED = 'rejected'
}

export class CreateDeliverableDto {
  @ApiProperty({ description: 'Deliverable title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Deliverable description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Due date for the deliverable', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ description: 'Collaboration ID' })
  @IsUUID()
  collaborationId: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateDeliverableDto {
  @ApiProperty({ description: 'Deliverable title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Deliverable description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Content URL', required: false })
  @IsOptional()
  @IsString()
  contentUrl?: string;

  // File metadata properties
  contentFileName?: string;
  contentMimeType?: string;

  @ApiProperty({ enum: DeliverableStatus, description: 'Deliverable status', required: false })
  @IsOptional()
  @IsEnum(DeliverableStatus)
  status?: DeliverableStatus;

  @ApiProperty({ description: 'Feedback on the deliverable', required: false })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiProperty({ description: 'Due date for the deliverable', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ description: 'Attachment URLs', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class SubmitDeliverableDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Content file (jpeg, jpg, png)' })
  content?: any;

  // File metadata properties
  contentFileName?: string;
  contentMimeType?: string;

  @ApiProperty({ description: 'Attachment URLs', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class ReviewDeliverableDto {
  @ApiProperty({ enum: DeliverableStatus, description: 'Review decision' })
  @IsEnum(DeliverableStatus)
  status: DeliverableStatus.APPROVED | DeliverableStatus.REVISION_REQUESTED | DeliverableStatus.REJECTED;

  @ApiProperty({ description: 'Feedback on the deliverable', required: false })
  @IsOptional()
  @IsString()
  feedback?: string;
}

export class DeliverableResponseDto {
  @ApiProperty({ description: 'Deliverable ID' })
  id: string;

  @ApiProperty({ description: 'Deliverable title' })
  title: string;

  @ApiProperty({ description: 'Deliverable description' })
  description?: string;

  @ApiProperty({ description: 'Content URL' })
  contentUrl?: string;

  @ApiProperty({ enum: DeliverableStatus, description: 'Deliverable status' })
  status: DeliverableStatus;

  @ApiProperty({ description: 'Feedback on the deliverable' })
  feedback?: string;

  @ApiProperty({ description: 'Number of revisions requested' })
  revisionCount: number;

  @ApiProperty({ description: 'Due date for the deliverable' })
  dueDate?: Date;

  @ApiProperty({ description: 'When the deliverable was submitted' })
  submittedAt?: Date;

  @ApiProperty({ description: 'When the deliverable was approved' })
  approvedAt?: Date;

  @ApiProperty({ description: 'Attachment URLs' })
  attachments: string[];

  @ApiProperty({ description: 'Additional metadata' })
  metadata?: Record<string, any>;

  @ApiProperty({ description: 'When the deliverable was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the deliverable was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'Associated collaboration' })
  collaboration: {
    id: string;
    status: string;
  };
}
