import Project from "../models/project.model.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: "Failed to create project" });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("groupId", "groupName");
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ success: false, message: "Failed to fetch projects" });
  }
};
