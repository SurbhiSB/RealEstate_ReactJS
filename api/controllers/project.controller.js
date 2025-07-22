import Project from "../models/project.model.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const {
      groupId,
      projectName,
      displayName,
      mouza,
      khNo,
      address,
      locationMapLink,
      state,
      city,
      pinCode,
      status,
      registrarOffice,
      reraNumber,
      imageUrl,
      projectType,
      documents, // array of { documentName, documentUrl, status }
    } = req.body;

    const newProject = new Project({
      groupId,
      projectName,
      displayName,
      mouza,
      khNo,
      address,
      locationMapLink,
      state,
      city,
      pinCode,
      status,
      registrarOffice,
      reraNumber,
      imageUrl,
      projectType,
      documents,
    });

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


// ✅ Make sure this function appears only once
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ success: false, message: "Failed to update project" });
  }
};

