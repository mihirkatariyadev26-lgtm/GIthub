import fs from "fs/promises";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { s3, S3_BUCKET } from "../config/aws-config.js";

//Process :1 ListObjectsV2Command is used to list the objects in the S3 bucket
//Process :2 GetObjectCommand is used to get the objects from the S3 bucket
//Process :3 transformToByteArray is used to convert the objects to byte array
//Process :4 writeFile is used to write the objects to the file
export async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".Arbor");
  const commitPath = path.join(repoPath, "commits");

  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: S3_BUCKET,
        Prefix: "commits/",
      }),
    );

    const objects = data.Contents;

    if (objects) {
      for (const object of objects) {
        const key = object.Key;
        const commitDir = path.join(
          commitPath,
          path.dirname(key).split("/").pop(),
        );
        await fs.mkdir(commitDir, { recursive: true });
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
        };
        const fileContent = await s3.send(new GetObjectCommand(params));
        const byteArray = await fileContent.Body.transformToByteArray();
        await fs.writeFile(path.join(repoPath, key), Buffer.from(byteArray));
      }
      console.log("All commits are pulled from S3");
    }
  } catch (error) {
    console.error("Error occured in Pulling:", error);
  }
}
