import express from "express";
const PORT = 3000;

const app = express();
const expressServer = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
