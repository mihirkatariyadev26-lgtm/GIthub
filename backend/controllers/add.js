import fs from "fs/promises";
import path from "path";
export async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".Arbor");
  const stagingPath = path.join(repoPath, ".Staging");
  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName)); //fs.copyFile : make copy of file ,args:source location,destination location && path.join give the destination location args:destination location and filename by you want to save the file
    console.log(`file ${fileName} added to tje staging area`);
  } catch (error) {
    console.error("Error Adding file in Staging area", error);
  }
}
