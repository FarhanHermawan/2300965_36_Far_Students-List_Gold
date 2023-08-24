// frontend/script.js
document.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("student-list");
  const addButton = document.getElementById("add-button");

  // Function to fetch and display students from the API
  async function fetchStudents() {
    try {
      const response = await fetch("http://localhost:3000/students");
      const students = await response.json();

      studentList.innerHTML = ""; // Clear existing list

      students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <span>NIM: ${student.nim}</span>
          <span>Name: ${student.name}</span>
          <span>Class: ${student.class}</span>
          <button class="delete-button" data-id="${student.id}">Delete</button>
        `;
        studentList.appendChild(listItem);
      });

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach(button => {
        button.addEventListener("click", handleDelete);
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  // Function to handle delete button click
  async function handleDelete(event) {
    const id = event.target.dataset.id;
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchStudents(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  // Function to handle add button click
  addButton.addEventListener("click", async () => {
    const nim = document.getElementById("nim").value;
    const name = document.getElementById("name").value;
    const studentClass = document.getElementById("class").value;

    if (nim && name && studentClass) {
      try {
        const response = await fetch("http://localhost:3000/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nim, name, class: studentClass }),
        });

        if (response.ok) {
          fetchStudents(); // Refresh the list after adding
          document.getElementById("nim").value = "";
          document.getElementById("name").value = "";
          document.getElementById("class").value = "";
        }
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
  });

  // Fetch students when the page loads
  fetchStudents();
});
