import express, { Express } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import { authRoute } from "./modules/auth/auth.route";
import errorHandler from "./middleware/glowbalErrorHandaler";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.8.169:3000"],
    credentials: true,
  }),
);
app.use("/api/auth", authRoute);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(notFound);
app.use(errorHandler);

export default app;
