import yargs from "yargs"; //use for reading command from terminal
import { hideBin } from "yargs/helpers"; //use for reading parameters of commands from terminal
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { pullRepo } from "./controllers/pull.js";
import { commitRepo } from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { revertRepo } from "./controllers/revert.js";
yargs(hideBin(process.argv))
  .command("init", "initalise a new repository", {}, initRepo)
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
  )
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
  )
  .command("push", "push to  the repository", {}, pushRepo)
  .command("pull", "Pull the repository", {}, pullRepo)
  .command(
    "revert <commitId>",
    "Revert to the old changes",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "Revert to the old changes ",
        type: "string",
      });
    },
    revertRepo,
  )
  .demandCommand(1, "You need at least one command ")
  .help().argv; //args:command,description,commands parame1ters,config method/function
