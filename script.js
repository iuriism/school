// Signup form validation
const signupForm = document.getElementById('signup-form');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const selectCourse = document.getElementById('select-course');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorCourse = document.getElementById('error-course');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Reset errors
  errorName.textContent = '';
  errorEmail.textContent = '';
  errorCourse.textContent = '';

  if (inputName.value.trim() === '') {
    errorName.textContent = 'Name is required';
    isValid = false;
  }

  if (inputEmail.value.trim() === '' || !inputEmail.value.includes('@')) {
    errorEmail.textContent = 'Valid email is required';
    isValid = false;
  }

  if (selectCourse.value === '') {
    errorCourse.textContent = 'Please select a course';
    isValid = false;
  }

  if (isValid) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
      name: inputName.value,
      email: inputEmail.value,
      course: selectCourse.value
    });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Thank you for signing up!');
    signupForm.reset();
  }
});

// Contact form alert only
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Message sent! We will get back to you soon.');
  contactForm.reset();
});

// Load users table with delete button
const btnLoadUsers = document.getElementById('btn-load-users');
const usersTable = document.getElementById('users-table');
const usersTableBody = document.getElementById('users-table-body');

btnLoadUsers.addEventListener('click', () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  usersTableBody.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.course}</td>
      <td><button class="btn-delete-user" data-index="${index}">Delete</button></td>
    `;
    usersTableBody.appendChild(row);
  });
  usersTable.style.display = users.length ? 'table' : 'none';

  document.querySelectorAll('.btn-delete-user').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users));
      btnLoadUsers.click(); // Reload table
    });
  });
});
