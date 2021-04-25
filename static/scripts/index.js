function filterContacts() {
  const bar = document.getElementById('chat-search');
  const clear = document.getElementById('chat-search-clear');
  const val = bar.value;
  if (val.length > 0) {
    clear.classList.remove('hidden');
  } else if (!clear.classList.contains('hidden')) {
    clear.classList.add('hidden');
  }
  const contacts = document.querySelectorAll('.contacts__contact');
  [].forEach.call(contacts, (contact) => {
    if (contact.classList.contains('hidden')) {
      contact.classList.remove('hidden');
    }
    const name = contact.querySelector('.contact__name');
    if (name && name.innerHTML.indexOf(val) === -1) {
      contact.classList.add('hidden');
    }
  });
}

function clearSearch() {
  const bar = document.getElementById('chat-search');
  bar.value = '';
  filterContacts();
  const clear = document.getElementById('chat-search-clear');
  clear.classList.add('hidden');
}

window.addEventListener('load', () => {
  const clear = document.getElementById('chat-search-clear');
  const bar = document.getElementById('chat-search');
  if (clear) {
    clear.classList.add('hidden');
    clear.addEventListener('click', clearSearch);
  }
  if (bar) {
    bar.addEventListener('input', filterContacts);
  }
});
