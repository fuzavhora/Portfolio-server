const asyncHandler = require("../utils/asyncHandler");
const Project = require("../models/project.model");

const createProject = asyncHandler(async (req, res) => {
  let { title, technologies, imageUrl, description, gitHubUrl, liveUrl } =
    req.body;

  console.log("Creating project with data:", req.body);

  if (!title) {
    return res.status(400).json({ message: "title are required" });
  }
  if (!technologies) {
    return res
      .status(400)
      .json({ message: "technologies fields are required" });
  }
  if (!imageUrl) {
    return res.status(400).json({ message: "image fields are required" });
  }
  if (!description) {
    return res.status(400).json({ message: "description fields are required" });
  }
  if (!gitHubUrl) {
    return res.status(400).json({ message: "github fields are required" });
  }
  if (!liveUrl) {
    return res.status(400).json({ message: "liveurl fields are required" });
  }
  technologies = technologies.split(",").map((tech) => tech.trim());

  const newProject = await Project.create({
    title,
    technologies,
    imageUrl,
    description,
    gitHubUrl,
    liveUrl,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project: newProject,
  });
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    projects,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { title } = req.params;

  const project = await Project.findOne({title});
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  await Project.deleteOne({ title });
  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

module.exports = { createProject, getAllProjects, deleteProject };
