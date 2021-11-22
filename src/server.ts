import express from "express";

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});