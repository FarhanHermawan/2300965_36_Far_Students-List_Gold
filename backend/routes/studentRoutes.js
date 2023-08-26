const express = require("express");
const studentController = require("../controller/studentController");
const apiPath = "/api/v1/students";
const router = express.Router();

// Create a new student
router.post(apiPath + "/", studentController.createStudent);

// Get all students
router.get(apiPath + "/", studentController.getAllStudents);

// Get a specific student by ID
router.get(apiPath + "/:id", studentController.getStudentById);

// Update a student by ID
router.put(apiPath + "/:id", studentController.updateStudent);

// Delete a student by ID
router.delete(apiPath + "/:id", studentController.deleteStudent);

module.exports = router;
