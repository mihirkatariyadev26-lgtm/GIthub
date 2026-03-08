import fs from "fs/promises";
import path from "path";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";
export async function commitRepo(Message) {
  const repoPath = path.resolve(process.cwd(), ".Arbor");
  const stagePath = path.join(repoPath, ".Staging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitId = uuidv4();
    const commitDir = path.join(commitPath, commitId); //making folder by the name of commit id in the commit Folder
    await fs.mkdir(commitDir, { recursive: true }); //making commit Directory

    let files = await fs.readdir(stagePath); //read all the files which are in the staging directory

    for (const file of files) {
      await fs.copyFile(path.join(stagePath, file), path.join(commitDir, file));
    } //this loop is copying the all the files which are in the staging folder into the comit folder

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ Message: Message, date: new Date().toISOString() }),
    ); //this is maintaining the record of the commits means at what time and with what message the commit is commited

    console.log(`commit is successful and the commitId is ${commitId} `);
  } catch (error) {
    console.error("error occured in the commiting the file ", error);
  }
}
