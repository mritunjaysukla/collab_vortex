# CollabVortex 🌟

> **A Collaboration Platform for Content Creators and Brands**

CollabVortex is a backend platform that connects brands with content creators for managing influencer campaigns. It handles everything from user authentication, campaign creation, proposals, contracts, and messaging to analytics and payments.

Built with **NestJS**, **PostgreSQL**, and **TypeORM**, it offers a solid foundation for scalable, modern web applications.

---

## 🚀 Key Features

### 👤 User Management
- **Two user types**: Brands & Creators
- Secure JWT authentication with role-based access
- Password reset support and user status handling

### 🏢 Brand Tools
- Create & manage brand profiles
- Run targeted campaigns with deliverables, budget, audience
- Review creator proposals and manage collaborations
- Sign digital contracts and track milestones
- Rate and review creators post-collaboration

### 🎨 Creator Tools
- Create detailed creator profiles
- Discover and apply to brand campaigns
- Submit proposals with custom rates and portfolios
- Upload deliverables and track approvals
- Monitor revenue and collaboration history

### 🔁 Core Platform Features
- Real-time messaging and notifications
- Campaign and performance analytics
- Social media integrations (Instagram, TikTok, YouTube)
- Platform integration token management
- Contract automation and deliverable tracking

---

## 🛠 Tech Stack

| Layer        | Tool               |
| ------------ | ------------------ |
| Backend      | NestJS (Node.js)   |
| ORM          | TypeORM            |
| Database     | PostgreSQL         |
| Auth         | JWT (access + refresh tokens) |
| Docs         | Swagger (OpenAPI)  |
| File Uploads | Multer + Local FS  |
| Realtime     | WebSockets         |

---

## 📁 Project Structure

```
src/
├── auth/                   # Login, signup, guards, tokens
├── users/                  # User entity & services
├── creators/               # Creator profile & analytics
├── brands/                 # Brand profiles & targets
├── campaigns/              # Campaign management
├── proposals/              # Proposal handling
├── collaborations/         # Collaboration & contracts
├── deliverables/           # Content delivery system
├── messages/               # Real-time messaging
├── payments/               # Payment tracking
├── notifications/          # Alerts and system messages
├── reviews/                # Review and rating system
├── analytics/              # Engagement and performance metrics
├── platform-integrations/  # Social media connections
├── common/                 # Shared decorators, filters, guards
└── main.ts                 # Application entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- Yarn (v1.22+)
- PostgreSQL (v13+)

### Setup Instructions

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/collabvortex.git
   cd collabvortex
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your DB and JWT configs.

4. **Database Setup**
   ```bash
   yarn migration:run
   # Optional: yarn seed
   ```

5. **Run the App**
   ```bash
   yarn start:dev
   ```

## 📚 API Docs
Swagger UI: http://localhost:3000/api/docs

## 🧪 Testing
```bash
yarn test        # Unit tests
yarn test:e2e    # End-to-end tests
```

## 🔐 Security Highlights
- JWT-based Auth with Refresh Tokens
- Role-based Access Control (RBAC)
- Input Validation (class-validator)
- CORS, Helmet, Rate Limiting

## 🧱 Database Overview (ERD Summary)
**Core Tables:**
- users, brand_profiles, creator_profiles
- campaigns, proposals, collaborations, contracts
- deliverables, payments, reviews
- messages, notifications
- creator_analytics, campaign_analytics
- platform_integrations

Each entity is designed for scalability using relational modeling with foreign keys and status enums.

## 📦 Deployment (Local)
```bash
docker-compose up --build
```

## 🎯 Roadmap
- ✅ Core feature implementation
- ✅ Authentication + RBAC
- ✅ Campaign & Proposal Workflow
- 🔄 Notification system via email
- 🔄 Real-time messaging via gateway
- 🚀 Microservice architecture with Redis/RMQ

## 🏁 License
Licensed under the MIT License.

---

**Made with ❤️ by Mritunjay Sukla**