import fs from "fs/promises";
import path from "path";

export async function revertRepo(commitId) {
  const repoPath = path.resolve(process.cwd(), ".Arbor");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitPath, commitId);

    // Check if the commit folder exists
    try {
      await fs.access(commitDir);
    } catch (err) {
      console.error(`Error: Commit folder '${commitId}' does not exist.`);
      return; // Stop execution if the folder isn't found
    }

    const files = await fs.readdir(commitDir);
    const parentDir = path.resolve(repoPath, "../");
    for (const file of files) {
      await fs.copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }
    console.log(`Successfully Reverted to the Commit ${commitId}`);
  } catch (error) {
    console.error("error occured in the ", error);
  }
  console.log("revert function is called ");
}
