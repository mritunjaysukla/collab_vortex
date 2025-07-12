export enum UserRole {
  CREATOR = 'creator',
  BRAND = 'brand',
}

export enum ProposalStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum ContractStatus {
  DRAFT = 'draft',
  PENDING_SIGNATURE = 'pending_signature',
  SIGNED = 'signed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum CollaborationStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum DeliverableStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REVISION_REQUESTED = 'revision_requested',
  REJECTED = 'rejected',
}

export enum NotificationType {
  NEW_CAMPAIGN = 'new_campaign',
  PROPOSAL_RECEIVED = 'proposal_received',
  PROPOSAL_ACCEPTED = 'proposal_accepted',
  PROPOSAL_REJECTED = 'proposal_rejected',
  CONTRACT_READY = 'contract_ready',
  DELIVERABLE_SUBMITTED = 'deliverable_submitted',
  DELIVERABLE_APPROVED = 'deliverable_approved',
  PAYMENT_RECEIVED = 'payment_received',
  MESSAGE_RECEIVED = 'message_received',
  COLLABORATION_COMPLETED = 'collaboration_completed',
}

export enum Platform {
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  FACEBOOK = 'facebook',
}

export enum ReviewVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  PLATFORM_ONLY = 'platform_only',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}
