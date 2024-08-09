import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";
import { router } from "./routes";
const PORT = 3000;

const app = express();
// default middlewares
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// testing endpoint
app.get("/test", (req, res) => {
  return res.send("Test endpoint working 🎃");
});
app.use("/api", router);
const expressServer = app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});
// prisma client
export const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  console.log("Closing Prisma Client connection");
  await prisma.$disconnect();
  console.log("Prisma Client connection closed");
  expressServer.close(() => {
    console.log("Server shut down gracefully");
    process.exit(0);
  });
});
