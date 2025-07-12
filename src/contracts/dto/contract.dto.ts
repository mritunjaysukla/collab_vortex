import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsEnum, IsBoolean, IsUUID } from 'class-validator';

export enum ContractStatus {
  DRAFT = 'draft',
  PENDING_SIGNATURE = 'pending_signature',
  SIGNED = 'signed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export class CreateContractDto {
  @ApiProperty({ description: 'Contract terms and conditions' })
  @IsString()
  terms: string;

  @ApiProperty({ description: 'Contract milestones', required: false })
  @IsOptional()
  @IsObject()
  milestones?: Record<string, any>;

  @ApiProperty({ description: 'Additional terms', required: false })
  @IsOptional()
  @IsString()
  additionalTerms?: string;

  @ApiProperty({ description: 'Collaboration ID' })
  @IsUUID()
  collaborationId: string;
}

export class UpdateContractDto {
  @ApiProperty({ description: 'Contract terms and conditions', required: false })
  @IsOptional()
  @IsString()
  terms?: string;

  @ApiProperty({ description: 'Contract milestones', required: false })
  @IsOptional()
  @IsObject()
  milestones?: Record<string, any>;

  @ApiProperty({ enum: ContractStatus, description: 'Contract status', required: false })
  @IsOptional()
  @IsEnum(ContractStatus)
  status?: ContractStatus;

  @ApiProperty({ description: 'Whether contract is approved', required: false })
  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @ApiProperty({ description: 'Creator signature', required: false })
  @IsOptional()
  @IsString()
  creatorSignature?: string;

  @ApiProperty({ description: 'Brand signature', required: false })
  @IsOptional()
  @IsString()
  brandSignature?: string;

  @ApiProperty({ description: 'Additional terms', required: false })
  @IsOptional()
  @IsString()
  additionalTerms?: string;
}

export class ContractResponseDto {
  @ApiProperty({ description: 'Contract ID' })
  id: string;

  @ApiProperty({ description: 'Contract terms and conditions' })
  terms: string;

  @ApiProperty({ description: 'Contract milestones' })
  milestones?: Record<string, any>;

  @ApiProperty({ description: 'When contract was signed' })
  signedAt?: Date;

  @ApiProperty({ enum: ContractStatus, description: 'Contract status' })
  status: ContractStatus;

  @ApiProperty({ description: 'Whether contract is approved' })
  approved: boolean;

  @ApiProperty({ description: 'Creator signature' })
  creatorSignature?: string;

  @ApiProperty({ description: 'Brand signature' })
  brandSignature?: string;

  @ApiProperty({ description: 'Additional terms' })
  additionalTerms?: string;

  @ApiProperty({ description: 'When contract was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When contract was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'Associated collaboration' })
  collaboration: {
    id: string;
    status: string;
  };
}
