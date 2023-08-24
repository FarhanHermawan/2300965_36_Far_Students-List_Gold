// controllers/studentController.js
const StudentModel = require("../models/studentModels");

class StudentController {
  static async createStudent(req, res) {
    try {
      const student = await StudentModel.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteStudent(req, res) {
    const id = req.params.id;
    try {
      await StudentModel.deleteStudent(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateStudent(req, res) {
    const id = req.params.id;
    try {
      const updatedStudent = await StudentModel.updateStudent(id, req.body);
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllStudents(req, res) {
    try {
      const students = await StudentModel.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getStudentById(req, res) {
    const id = req.params.id;
    try {
      const student = await StudentModel.getStudentById(id);
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = StudentController;
