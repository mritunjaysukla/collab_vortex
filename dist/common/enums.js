"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.ReviewVisibility = exports.Platform = exports.NotificationType = exports.DeliverableStatus = exports.CollaborationStatus = exports.ContractStatus = exports.ProposalStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["CREATOR"] = "creator";
    UserRole["BRAND"] = "brand";
})(UserRole || (exports.UserRole = UserRole = {}));
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PENDING"] = "pending";
    ProposalStatus["ACCEPTED"] = "accepted";
    ProposalStatus["REJECTED"] = "rejected";
})(ProposalStatus || (exports.ProposalStatus = ProposalStatus = {}));
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["DRAFT"] = "draft";
    ContractStatus["PENDING_SIGNATURE"] = "pending_signature";
    ContractStatus["SIGNED"] = "signed";
    ContractStatus["ACTIVE"] = "active";
    ContractStatus["COMPLETED"] = "completed";
    ContractStatus["CANCELLED"] = "cancelled";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
var CollaborationStatus;
(function (CollaborationStatus) {
    CollaborationStatus["PENDING"] = "pending";
    CollaborationStatus["ACTIVE"] = "active";
    CollaborationStatus["PAUSED"] = "paused";
    CollaborationStatus["COMPLETED"] = "completed";
    CollaborationStatus["CANCELLED"] = "cancelled";
})(CollaborationStatus || (exports.CollaborationStatus = CollaborationStatus = {}));
var DeliverableStatus;
(function (DeliverableStatus) {
    DeliverableStatus["PENDING"] = "pending";
    DeliverableStatus["SUBMITTED"] = "submitted";
    DeliverableStatus["APPROVED"] = "approved";
    DeliverableStatus["REVISION_REQUESTED"] = "revision_requested";
    DeliverableStatus["REJECTED"] = "rejected";
})(DeliverableStatus || (exports.DeliverableStatus = DeliverableStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["NEW_CAMPAIGN"] = "new_campaign";
    NotificationType["PROPOSAL_RECEIVED"] = "proposal_received";
    NotificationType["PROPOSAL_ACCEPTED"] = "proposal_accepted";
    NotificationType["PROPOSAL_REJECTED"] = "proposal_rejected";
    NotificationType["CONTRACT_READY"] = "contract_ready";
    NotificationType["DELIVERABLE_SUBMITTED"] = "deliverable_submitted";
    NotificationType["DELIVERABLE_APPROVED"] = "deliverable_approved";
    NotificationType["PAYMENT_RECEIVED"] = "payment_received";
    NotificationType["MESSAGE_RECEIVED"] = "message_received";
    NotificationType["COLLABORATION_COMPLETED"] = "collaboration_completed";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var Platform;
(function (Platform) {
    Platform["INSTAGRAM"] = "instagram";
    Platform["YOUTUBE"] = "youtube";
    Platform["TIKTOK"] = "tiktok";
    Platform["TWITTER"] = "twitter";
    Platform["LINKEDIN"] = "linkedin";
    Platform["FACEBOOK"] = "facebook";
})(Platform || (exports.Platform = Platform = {}));
var ReviewVisibility;
(function (ReviewVisibility) {
    ReviewVisibility["PUBLIC"] = "public";
    ReviewVisibility["PRIVATE"] = "private";
    ReviewVisibility["PLATFORM_ONLY"] = "platform_only";
})(ReviewVisibility || (exports.ReviewVisibility = ReviewVisibility = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PROCESSING"] = "processing";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=enums.js.map