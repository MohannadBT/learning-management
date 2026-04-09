<div align="center">

# 🎓 Udumohannad LMS

### A full-stack Learning Management System built with modern web technologies

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![AWS](https://img.shields.io/badge/AWS-Lambda-FF9900?style=for-the-badge&logo=amazonaws)](https://aws.amazon.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

**[Live Demo →](https://learning-management-ebon.vercel.app)**

</div>

---

## ✨ Features

- 🔐 **Authentication** — Role-based access control (Student / Teacher) powered by Clerk
- 🎥 **Video Learning** — Stream course videos via CloudFront CDN with auto progress tracking
- 💳 **Payments** — Full Stripe integration with PaymentIntent flow
- 📊 **Progress Tracking** — Per-chapter completion tracking with overall progress calculation
- 👨‍🏫 **Teacher Dashboard** — Create and manage courses with drag-and-drop section/chapter ordering
- 🔍 **Course Discovery** — Browse and filter courses by category with live preview
- 📱 **Responsive Design** — Fully responsive across desktop and mobile
- ⚡ **Serverless Backend** — Express API deployed on AWS Lambda with DynamoDB

---

## 🖼️ Screenshots

|              Landing Page              |       Course Search        |       Teacher Dashboard        |
| :------------------------------------: | :------------------------: | :----------------------------: |
| Browse featured courses and categories | Search and preview courses | Create and manage your courses |

|            Course Player            |         Checkout          |       Billing        |
| :---------------------------------: | :-----------------------: | :------------------: |
| Watch videos with progress tracking | Stripe-powered enrollment | View payment history |

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────────────────────┐
│                 │  HTTPS  │           AWS Cloud               │
│  Vercel (CDN)   │────────▶│  API Gateway → Lambda (Express)  │
│  Next.js 16     │         │  DynamoDB (Database)              │
│  React 19       │         │  S3 + CloudFront (Videos)        │
│                 │         └──────────────────────────────────┘
└─────────────────┘
         │
         │  Auth
         ▼
   ┌──────────┐         ┌─────────┐
   │  Clerk   │         │ Stripe  │
   │  (Auth)  │         │(Payments│
   └──────────┘         └─────────┘
```

---

## 🛠️ Tech Stack

### Frontend

|     | Technology                  | Purpose                          |
| --- | --------------------------- | -------------------------------- |
| ⚡  | Next.js 16 (App Router)     | React framework with SSR         |
| ⚛️  | React 19                    | UI library                       |
| 🔷  | TypeScript 5                | Type safety                      |
| 🎨  | Tailwind CSS v4 + shadcn/ui | Styling & components             |
| 🗃️  | Redux Toolkit + RTK Query   | State management & API calls     |
| 🔐  | Clerk                       | Authentication & user management |
| 💳  | Stripe React                | Payment UI components            |
| 🎬  | React Player                | Video playback                   |
| 📋  | React Hook Form + Zod       | Form handling & validation       |
| 🗂️  | FilePond                    | File & video uploads             |
| 🍞  | Sonner                      | Toast notifications              |
| 🎭  | Framer Motion               | Animations                       |

### Backend

|     | Technology             | Purpose                 |
| --- | ---------------------- | ----------------------- |
| 🟢  | Node.js 22 + Express 5 | HTTP server             |
| 🔷  | TypeScript 5           | Type safety             |
| ☁️  | AWS Lambda             | Serverless deployment   |
| 🗄️  | DynamoDB + Dynamoose   | NoSQL database & ORM    |
| 🔐  | Clerk Express          | Auth middleware         |
| 💳  | Stripe                 | Payment intent creation |
| 📦  | AWS S3                 | Video storage           |
| 🌐  | CloudFront             | Video CDN delivery      |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Java (for DynamoDB Local)
- Docker Desktop
- AWS CLI configured
- Clerk account
- Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/MohannadBT/learning-management.git
cd learning-management
```

### 2. Start DynamoDB Local

Download [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run:

```bash
java --enable-native-access=ALL-UNNAMED \
  -D"java.library.path=./DynamoDBLocal_lib" \
  -jar DynamoDBLocal.jar \
  -dbPath /path/to/learning-management \
  -sharedDb
```

### 3. Set up the Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=8001
NODE_ENV=development
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket
CLOUDFRONT_DOMAIN=https://your-cloudfront-domain.cloudfront.net
STRIPE_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Seed the database and start:

```bash
npm run seed
npm run dev
```

### 4. Set up the Client

```bash
cd client
npm install --legacy-peer-deps
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_LOCAL_URL=localhost:3000
```

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 📁 Project Structure

```
learning-management/
├── client/                     # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── (auth)/         # Sign in / Sign up
│       │   ├── (dashboard)/    # Protected dashboard
│       │   │   ├── user/       # Student routes
│       │   │   └── teacher/    # Teacher routes
│       │   └── (nondashboard)/ # Public pages
│       ├── components/         # Reusable components
│       ├── hooks/              # Custom React hooks
│       └── state/              # Redux store & API
└── server/                     # Express backend
    └── src/
        ├── controllers/        # Route handlers
        ├── models/             # DynamoDB models
        ├── routes/             # Express routers
        ├── seed/               # DB seeding
        └── utils/              # Helpers
```

---

## 🗄️ Database Schema

### Course

```typescript
{
  courseId: string        // Hash key
  teacherId: string
  teacherName: string
  title: string
  description: string
  category: string
  image: string           // S3/CloudFront URL
  price: number
  level: "Beginner" | "Intermediate" | "Advanced"
  status: "Draft" | "Published"
  sections: Section[]     // Nested: chapters, videos, quizzes
  enrollments: { userId: string }[]
}
```

### Transaction

```typescript
{
  userId: string; // Hash key
  transactionId: string; // Range key
  courseId: string;
  dateTime: string;
  paymentProvider: "stripe";
  amount: number;
}
```

### UserCourseProgress

```typescript
{
  userId: string          // Hash key
  courseId: string        // Range key
  enrollmentDate: string
  overallProgress: number
  sections: SectionProgress[]
  lastAccessedTimestamp: string
}
```

---

## 🔌 API Reference

### Courses

```
GET    /api/courses                     List courses (filter: ?category=)
GET    /api/courses/:id                 Get course by ID
POST   /api/courses                     Create course (auth)
PUT    /api/courses/:id                 Update course with image (auth)
DELETE /api/courses/:id                 Delete course (auth)
POST   /api/courses/:id/sections/:sid/chapters/:cid/get-upload-url
```

### Transactions

```
GET    /api/transactions?userId=        User transaction history
POST   /api/transactions                Create transaction + enrollment
POST   /api/transactions/stripe/payment-intent
```

### Progress

```
GET    /api/users/course-progress/:userId/enrolled-courses
GET    /api/users/course-progress/:userId/courses/:courseId
PUT    /api/users/course-progress/:userId/courses/:courseId
```

### Users

```
PUT    /api/users/clerk/:userId         Update user metadata
```

---

## ☁️ Deployment

### Client → Vercel

The client auto-deploys from the `master` branch via Vercel's GitHub integration.

### Server → AWS Lambda

```bash
# Build
cd server && npm run build

# Build & push Docker image
docker build -t lm_lambda .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag lm_lambda:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/lm-server:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/lm-server:latest

# Update Lambda
aws lambda update-function-code \
  --function-name lm_lambda \
  --image-uri <account-id>.dkr.ecr.us-east-1.amazonaws.com/lm-server:latest \
  --region us-east-1
```

---

## 🧪 Testing Payments

Use Stripe's test card:

```
Card number:  4242 4242 4242 4242
Expiry:       Any future date
CVC:          Any 3 digits
```

---

## 📝 Notes

- Install client dependencies with `--legacy-peer-deps` due to a peer dependency conflict between `@clerk/clerk-js` (which pins `@stripe/stripe-js@5`) and `@stripe/react-stripe-js@6+`
- DynamoDB Local must be running before starting the server in development
- To create a teacher account, set `{ "userType": "teacher" }` in the user's Public Metadata via the Clerk Dashboard

---

<div align="center">

Built as a learning project by **Mohannad Banattaf**

[![GitHub](https://img.shields.io/badge/GitHub-MohannadBT-181717?style=flat-square&logo=github)](https://github.com/MohannadBT)

</div>
