document.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("student-list");
  const addButton = document.getElementById("add-button");
  const editModal = document.getElementById("editModal");
  const editNimInput = document.getElementById("edit-nim");
  const editNameInput = document.getElementById("edit-name");
  const editClassInput = document.getElementById("edit-class");
  const updateButton = document.getElementById("update-button");
  const closeButtons = document.getElementsByClassName("close-button");

  // Function to fetch and display students from the API
  async function fetchStudents() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/students");
      const students = await response.json();

      studentList.innerHTML = "";

      students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.nim}</td>
          <td>${student.name}</td>
          <td>${student.class}</td>
          <td>
            <button class="btn btn-warning edit-button" data-id="${student.id}">Edit</button>
            <button class="btn btn-danger delete-button" data-id="${student.id}">Delete</button>
          </td>
        `;
        studentList.appendChild(row);
      });

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete);
      });

      const editButtons = document.querySelectorAll(".edit-button");
      editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit);
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  // Function to handle delete button click
  async function handleDelete(event) {
    const id = event.target.dataset.id;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/students/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchStudents(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  // Function to handle edit button click
  async function handleEdit(event) {
    const id = event.target.dataset.id;

    // Fetch student data by ID
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/students/${id}`
      );
      const student = await response.json();

      // Populate modal inputs with student data
      editNimInput.value = student.nim;
      editNameInput.value = student.name;
      editClassInput.value = student.class;

      // Display modal
      editModal.style.display = "block";

      // Update student data on "Update" button click
      updateButton.addEventListener("click", async () => {
        const newName = editNameInput.value;
        const newNim = editNimInput.value;
        const newClass = editClassInput.value;

        if (newName && newNim && newClass) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/v1/students/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: newName,
                  nim: newNim,
                  class: newClass,
                }),
              }
            );

            if (response.ok) {
              fetchStudents(); // Refresh the list after editing
              closeEditModal();
            }
          } catch (error) {
            console.error("Error editing student:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  }

  // Close modal function
  function closeEditModal() {
    editModal.style.display = "none";
    editNimInput.value = "";
    editNameInput.value = "";
    editClassInput.value = "";
  }

  // Close modal when close button is clicked
  for (let closeButton of closeButtons) {
    closeButton.addEventListener("click", closeEditModal);
  }

  // Function to handle add button click
  addButton.addEventListener("click", async () => {
    const nim = document.getElementById("nim").value;
    const name = document.getElementById("name").value;
    const studentClass = document.getElementById("class").value;

    if (nim && name && studentClass) {
      try {
        const response = await fetch("http://localhost:3000/api/v1/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nim, name, class: studentClass }),
        });

        if (response.ok) {
          fetchStudents();
          document.getElementById("nim").value = "";
          document.getElementById("name").value = "";
          document.getElementById("class").value = "";
        }
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
  });

  // Fetch students
  fetchStudents();
});
