const form = document.getElementById('registrationForm');
const table = document.getElementById('entriesTable');

function getEntries() {
  return JSON.parse(localStorage.getItem('user-entries')) || [];
}

function displayEntries() {
  const entries = getEntries();
  table.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
    table.appendChild(row);
  });
}

function isValidDOB(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('acceptTerms').checked;

  const age = isValidDOB(dob);
  if (age < 18 || age > 55) {
    alert('Age must be between 18 and 55.');
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };

  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem('user-entries', JSON.stringify(entries));
  displayEntries();
});

window.addEventListener('load', displayEntries);
