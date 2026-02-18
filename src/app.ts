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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://foodhub-frontend-tau.vercel.app",
    ],
    credentials: true,
  }),
);

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
