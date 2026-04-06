import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dynamoose from "dynamoose";
import serverless from "serverless-http";
import seed from "./seed/seedDynamodb.js";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";
/* ROUTES IMPORTS */
import courseRoutes from "./routes/courseRoutes.js";
import userClerkRoutes from "./routes/userClerkRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import userCourseProgressRoutes from "./routes/userCourseProgressRoutes.js";

/* CONFIGURATIONS */
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  dynamoose.aws.ddb.local();

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
  });
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY as string,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(clerkMiddleware());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/courses", courseRoutes);
app.use("/api/users/clerk", requireAuth(), userClerkRoutes);
app.use("/api/transactions", requireAuth(), transactionRoutes);
app.use("/api/users/course-progress", requireAuth(), userCourseProgressRoutes);

/* SERVER */
const port = process.env.PORT || 3000;
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// aws production environment
const serverlessApp = serverless(app);
export const handler = async (event: any, context: any) => {
  if (event.action === "seed") {
    await seed();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data seeded successfully" }),
    };
  } else {
    return serverlessApp(event, context);
  }
};
