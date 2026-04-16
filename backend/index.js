import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import yargs from "yargs"; //use for reading command from terminal
import { hideBin } from "yargs/helpers"; //use for reading parameters of commands from terminal
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { pullRepo } from "./controllers/pull.js";
import { commitRepo } from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { revertRepo } from "./controllers/revert.js";
import { mainRouter } from "./routes/main.route.js";
yargs(hideBin(process.argv))
  .command("start", "start the server", {}, startServer)
  //INIT COMMAND
  .command("init", "initalise a new repository", {}, initRepo) //ADD COMMAND
  .command(
    "add <file>",
    "Add file to repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  ) //COMMIT COMMAND
  .command(
    "commit <Message>",
    "commit to the repository",
    (yargs) => {
      yargs.positional("Message", {
        describe: "commit to the repository ",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.Message);
    },
  ) //PUSH COMMAND
  .command("push", "push to  the repository", {}, pushRepo) //PULL COMMAND
  .command("pull", "Pull the repository", {}, pullRepo) //REVERT COMMAND
  .command(
    "revert <commitId>",
    "Revert to the old changes",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "Revert to the old changes ",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    },
  )
  .demandCommand(1, "You need at least one command ")
  .help().argv; //args:command,description,commands parame1ters,config method/function

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());
  const mongoUrl = process.env.MONGODB_URL;
  mongoose
    .connect(mongoUrl, {
      family: 4, // Forces IPv4
    })
    .then(() => console.log("DB connected successfully!!"))
    .catch((e) => console.error("Error in DB connection!!", e));

  app.use(cors({ origin: "*" }));
  app.use("/", mainRouter);
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methodes: ["GET", "POST"],
    },
  });
  io.on("connection", (soket) => {
    soket.on("JoinRoom", (userID) => {
      user = userID;
      console.log("=========");
      console.log(user);
      console.log("=========");
      soket.join(userID);
    });
  });
  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("CRUD opreation called");
    //CRUD opreations
  });
  httpServer.listen(port, () => {
    console.log(`Server is running on port :${port}`);
  });
}
