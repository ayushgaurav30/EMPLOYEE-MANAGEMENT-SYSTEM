const api = "https://your-backend-name.onrender.com/employees";


/* ---------- TOAST FUNCTION ---------- */
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.className = isError ? 'error' : '';
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

/* ---------- LOAD EMPLOYEES ---------- */
fetch(api)
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('tbody');
    if (!tbody) return;

    data.forEach(emp => {
      tbody.innerHTML += `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.department}</td>
          <td>${emp.salary}</td>
          <td>
           <button onclick="openModal(${emp.id}, '${emp.name}', '${emp.email}', '${emp.department}', ${emp.salary})">
            Edit
            </button>

            <button onclick="deleteEmp(${emp.id})">Delete</button>
          </td>

        </tr>`;
    });
  })
  .catch(() => showToast('Failed to load employees', true));

/* ---------- ADD EMPLOYEE ---------- */
function addEmployee() {
  const nameValue = document.getElementById('name').value;
  const emailValue = document.getElementById('email').value;
  const deptValue = document.getElementById('department').value;
  const salaryValue = document.getElementById('salary').value;

  console.log(nameValue, emailValue, deptValue, salaryValue); // DEBUG

  fetch('http://localhost:3000/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameValue,
      email: emailValue,
      department: deptValue,
      salary: salaryValue
    })
  })
  .then(() => {
    showToast('Employee added successfully');
    setTimeout(() => window.location.href = 'index.html', 1200);
  })
  .catch(() => showToast('Failed to add employee', true));
}

/* ---------- DELETE EMPLOYEE ---------- */
function deleteEmp(id) {
  fetch(`${api}/${id}`, { method: 'DELETE' })
    .then(() => {
      showToast('Employee deleted');
      setTimeout(() => location.reload(), 800);
    })
    .catch(() => showToast('Delete failed', true));
}
function openModal(id, name, email, dept, salary) {
  editId.value = id;
  editName.value = name;
  editEmail.value = email;
  editDepartment.value = dept;
  editSalary.value = salary;

  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

function updateEmployee() {
  fetch(`http://localhost:3000/employees/${editId.value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: editName.value,
      email: editEmail.value,
      department: editDepartment.value,
      salary: editSalary.value
    })
  }).then(() => {
    closeModal();
    location.reload();
  });
}








