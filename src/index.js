import express from "express";
import authRouter from "./routes/auth";
import userRouter from"./routes/users";
const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);

export default app;