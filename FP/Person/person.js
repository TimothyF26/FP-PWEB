document.addEventListener('DOMContentLoaded', function () {
  const personList = document.getElementById('person-list');
  const addPersonButton = document.getElementById('add-person-button');
  const deleteOverlay = document.createElement('div');
  deleteOverlay.id = 'delete-overlay';
  document.body.appendChild(deleteOverlay);

  const addOverlay = document.createElement('div');
  addOverlay.id = 'add-overlay';
  document.body.appendChild(addOverlay);

  // Load persons from localStorage
  const persons = JSON.parse(localStorage.getItem('persons')) || [];

  // Render person buttons
  function renderPersons() {
    personList.innerHTML = '';
    persons.forEach((person) => {
      const button = document.createElement('button');
      button.textContent = person.name;

      // Redirect to index.html when Person button is clicked
      button.addEventListener('click', () => {
        localStorage.setItem('activePerson', person.name); // Set active person in localStorage
        window.location.href = '../index.html'; // Redirect to the main page
      });

      personList.appendChild(button);
    });
  }

  // Open delete overlay
  function openDeleteOverlay() {
    deleteOverlay.innerHTML = ''; // Clear overlay content
    deleteOverlay.classList.add('active');

    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    const title = document.createElement('h2');
    title.textContent = 'Delete Person';
    overlayContent.appendChild(title);

    const deleteList = document.createElement('ul');
    persons.forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = person.name;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = index;
      listItem.appendChild(checkbox);
      deleteList.appendChild(listItem);
    });
    overlayContent.appendChild(deleteList);

    // Delete and Cancel Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
      deleteOverlay.classList.remove('active');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('confirm-delete');
    deleteButton.addEventListener('click', () => {
      const checkedBoxes = deleteList.querySelectorAll('input:checked');
      const indicesToDelete = Array.from(checkedBoxes).map(cb => parseInt(cb.value));
      indicesToDelete.sort((a, b) => b - a); // Sort in descending order for safe removal

      indicesToDelete.forEach(index => persons.splice(index, 1));
      localStorage.setItem('persons', JSON.stringify(persons));
      renderPersons();
      deleteOverlay.classList.remove('active');
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(deleteButton);
    overlayContent.appendChild(buttonContainer);

    deleteOverlay.appendChild(overlayContent);
  }

  // Open Add Person overlay
  function openAddOverlay() {
    // Cek apakah sudah mencapai batas maksimal 6 person
    if (persons.length >= 6) {
      alert('Maksimal 6 Person yang dapat ditambahkan.');
      return;
    }

    addOverlay.innerHTML = ''; // Clear overlay content
    addOverlay.classList.add('active');

    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    const title = document.createElement('h2');
    title.textContent = 'Add New Person';
    overlayContent.appendChild(title);

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Maksimal 20 huruf';
    inputField.maxLength = 20;
    inputField.classList.add('input-field');
    overlayContent.appendChild(inputField);

    // Add buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-add');
    cancelButton.addEventListener('click', () => {
      addOverlay.classList.remove('active');
    });

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.classList.add('confirm-add');
    okButton.addEventListener('click', () => {
      const personName = inputField.value.trim();
      if (personName) {
        if (personName.length <= 20) {
          persons.push({ name: personName });
          localStorage.setItem('persons', JSON.stringify(persons));
          renderPersons();
          addOverlay.classList.remove('active');
        } else {
          alert('Nama tidak boleh lebih dari 20 huruf.');
        }
      } else {
        alert('Nama tidak boleh kosong.');
      }
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(okButton);
    overlayContent.appendChild(buttonContainer);

    addOverlay.appendChild(overlayContent);
  }

  // Attach Add Person overlay to button
  addPersonButton.addEventListener('click', openAddOverlay);

  // Add delete overlay button
  const deletePageButton = document.createElement('button');
  deletePageButton.id = 'delete-page-button';
  deletePageButton.textContent = 'Delete';
  deletePageButton.addEventListener('click', openDeleteOverlay);
  document.body.appendChild(deletePageButton);

  renderPersons();
});