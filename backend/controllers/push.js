import fs from "fs/promises";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, S3_BUCKET } from "../config/aws-config.js";

export async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".Arbor");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir); //this will use to create the folders which are present in the commit folder
      //movig to the copying the files which are prensent in the each commite folder
      const files = await fs.readdir(commitPath);
      for (const file of files) {
        const filePath = path.join(commitPath, file); //getting the each file which is present in the folder
        const fileContent = await fs.readFile(filePath); //reading the file content

        const params = {
          Bucket: S3_BUCKET, //service name
          Key: `commits/${commitDir}/${file}`, //how we want to save the files in which structure
          Body: fileContent, //what will be the body
        };

        await s3.send(new PutObjectCommand(params)); //sending the files to the S3 bucket PutObjectCommand is used to send the files to the S3 bucket
      }
    }
    console.log("files are pushed to the S3");
  } catch (error) {
    console.error("Error to push to S3:", error);
  }
}
