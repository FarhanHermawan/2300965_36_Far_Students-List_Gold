// models/studentModel.js
const knex = require("../config/knex");

class StudentModel {
  static createStudent(student) {
    return knex("students").insert(student).returning("*");
  }

  static deleteStudent(id) {
    return knex("students").where("id", id).del();
  }

  static updateStudent(id, student) {
    return knex("students").where("id", id).update(student).returning("*");
  }

  static getAllStudents() {
    return knex("students");
  }

  static getStudentById(id) {
    return knex('students').where('id', id).first();
  }
}

module.exports = StudentModel;
