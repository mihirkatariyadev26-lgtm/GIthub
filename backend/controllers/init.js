import fs from "fs/promises";
import path from "path";
import os from "node:os"; //using to know the os of client to make the hidden folder (bcs there is the diffrent way to create in both mac/linux or windows)
import { exec } from "node:child_process";
export async function initRepo() {
  const system = os.platform(); //return the os
  const repoPath = path.resolve(process.cwd(), ".Arbor"); //it gives the current working directory/path (process.cwd() is give the current working directory )
  const commitPath = path.join(repoPath, "commits");
  console.log(`${system}`);

  if (system === "win32") {
    try {
      await fs.mkdir(repoPath, { recursive: true }); //create the folder (recursive true allow to make the nested structure inside the folder)
      await fs.mkdir(commitPath, { recursive: true });
      await fs.writeFile(
        path.join(repoPath, "config.json"),
        JSON.stringify({ buket: process.env.S3_BUKET }),
        console.log("Repository is created"),
      );
      exec(`attrib +h ${".Arbor"}`, (err) => {
        if (err) {
          console.error("error in hiden folder", err);
        } else {
          console.log("hidden folder created successfully");
        }
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      await fs.mkdir(repoPath, { recursive: true }); //create the folder (recursive true allow to make the nested structure inside the folder)
      await fs.mkdir(commitPath, { recursive: true });
      await fs.writeFile(
        path.join(repoPath, "config.json"),
        JSON.stringify({ buket: process.env.S3_BUKET }),
        console.log("Repository is created"),
      );
    } catch (e) {
      console.error("Error initializing repository", e);
    }
  }
}
