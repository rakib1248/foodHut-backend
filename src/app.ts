import express, { Express } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import { authRoute } from "./modules/auth/auth.route";
import errorHandler from "./middleware/glowbalErrorHandaler";
import { userRoute } from "./modules/user/user.route";
import { categoryRoute } from "./modules/category/category.route";
import { providerRoute } from "./modules/provider/provider.route";
import { mealRoute } from "./modules/meal/meal.route";
import { orderRoute } from "./modules/order/order.route";
import { cardRoute } from "./modules/card/card.route";
import { reviewRoute } from "./modules/review/review.route";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", providerRoute);
app.use("/api", mealRoute);
app.use("/api", orderRoute);
app.use("/api", cardRoute);
app.use("/api", reviewRoute);

(app.all("/api/auth/*splat", toNodeHandler(auth)),
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  }));

app.use(notFound);
app.use(errorHandler);

export default app;
