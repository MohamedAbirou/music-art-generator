import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import morgan from "morgan";
import passport from "passport";
import { corsOptions } from "./config/corsOptions";
import { logEvents, logger } from "./middleware/logger";
import rootRoute from "./routes/root";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import MongoStore from "connect-mongo";

import "dotenv/config";
import "./config/connection";
import "./strategies/google-strategy";
import "./config/corsOptions";

//* Initialize the express app
const app = express();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

//* Middlewares
app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

// logging HTTP requests
app.use(morgan("tiny"));

app.use(cors(corsOptions));

app.use(cookieParser(process.env.COOKIE_PARSER_KEY));
app.use(
  session({
    name: "session_cookie",
    secret: process.env.SESSION_SECRET_KEY as string,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// PORT
const Host = process.env.PORT;

//* API Routes
app.use("/", rootRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Google Auth
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(Host, () => {
  console.log(`Server running on http://localhost:${Host}`);
});
