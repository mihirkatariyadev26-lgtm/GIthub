import express from "express";
import { issueController } from "../controllers/issue.controller.js";
export const issueRourter = express.Router();
issueRourter.post("/issue/create", issueController.createIssue);
issueRourter.put("/issue/update/:id", issueController.updateIssue);
issueRourter.delete("/issue/delete/:id", issueController.deleteIssue);
issueRourter.get("/issue/all", issueController.getAllIssues);
issueRourter.get("/issue/:id", issueController.getIssue);
