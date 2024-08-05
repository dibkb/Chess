import express from "express";
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";
import bodyParser from "body-parser";
import { router } from "./routes";
const PORT = 3000;

const app = express();
// default middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
