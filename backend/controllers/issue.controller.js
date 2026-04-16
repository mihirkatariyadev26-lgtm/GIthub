import mongoose from "mongoose";
import { Repository } from "../models/repomodel.js";
import { Issue } from "../models/issuemodel.js";
import { User } from "../models/usermodel.js";
const createIssue = async (req, res) => {
  const { title, discription } = req.body;
  const id = req.params; //repository id
  try {
    const issue = new Issue({
      title,
      discription,
      repository: id,
    });
    await issue.save();
    return res.status(201).json(issue);
  } catch (e) {
    console.log("error during creating an issue", e);
    return res.staus(500).send("Internal Server Error");
  }
};
const updateIssue = async (req, res) => {
  const { id } = req.params; //issue id
  const { title, discription, status } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json("Issue not found");
    }
    issue.title = title;
    issue.discription = discription;
    issue.status = status;
    const updatedIssue = await issue.save();
    return res.json(updatedIssue);
  } catch (e) {
    console.log("error during updating an issue", e);
    return res.staus(500).send("Internal Server Error");
  }
};
const deleteIssue = async (req, res) => {
  const id = req.params; //issue id
  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.json({ messege: "Issue not found" });
    }
    return res.json({ messege: "Issue is deleted" });
  } catch (e) {
    console.log("Error during deleting an issue", e);
    return res.json({ erorr: "internal server error" });
  }
};
const getAllIssues = async (req, res) => {
  const { id } = req.params; //repository id
  try {
    const issues = await Issue.find({ Repository: id });
    if (!issues) {
      return res.status(404).json({ messege: "No issues found" });
    }
    return res.staus(200).json(issues);
  } catch (e) {
    console.log("Error during getting all issues", e);
    return res.status(500).json({ messege: "Internal Server Error" });
  }
};
const getIssue = async (req, res) => {
  const { id } = req.params; //issue id
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json("Issue not found");
    }
    return res.json(issue);
  } catch (e) {
    console.log("error during findind an issue by id", e);
    return res.staus(500).send("Internal Server Error");
  }
};
export const issueController = {
  createIssue,
  updateIssue,
  deleteIssue,
  getAllIssues,
  getIssue,
};
