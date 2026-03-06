import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
export async function commitRepo(Message) {
  const repoPath = path.resolve(process.cwd(), ".Arbor");
  const stagePath = path.join(process.cwd(), ".Staging");
  const commitPath = path.join(process.cwd(), ".commits");
}
