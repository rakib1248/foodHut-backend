import express, { Express } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { notFound } from "./middleware/notFound.js";
import { authRoute } from "./modules/auth/auth.route.js";
import errorHandler from "./middleware/glowbalErrorHandaler.js";
import { userRoute } from "./modules/user/user.route.js";
import { categoryRoute } from "./modules/category/category.route.js";
import { providerRoute } from "./modules/provider/provider.route.js";
import { mealRoute } from "./modules/meal/meal.route.js";
import { orderRoute } from "./modules/order/order.route.js";
import { cardRoute } from "./modules/card/card.route.js";
import { reviewRoute } from "./modules/review/review.route.js";

const app: Express = express();


// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  "http://localhost:3000",
  "https://foodhub-frontend-tau.vercel.app",
  "https://foodhub-frontend.netlify.app",
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://foodhub-frontend-tau.vercel.app",
//       "https://foodhub-frontend.netlify.app",
//     ],
//     credentials: true,
//   }),
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/auth", authRoute);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", providerRoute);
app.use("/api", mealRoute);
app.use("/api", orderRoute);
app.use("/api", cardRoute);
app.use("/api", reviewRoute);
app.use(notFound);
app.use(errorHandler);

export default app;
