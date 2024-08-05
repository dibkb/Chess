import express from "express";
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
