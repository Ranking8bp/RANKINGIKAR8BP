const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');
const registerForm = document.getElementById('registerForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const gameId = document.getElementById('gameId');
const accountName = document.getElementById('accountName');
const country = document.getElementById('country');
const accountScreenshot = document.getElementById('accountScreenshot');
const uploadBox = document.getElementById('uploadBox');
const uploadTitle = document.getElementById('uploadTitle');
const uploadText = document.getElementById('uploadText');
const previewWrap = document.getElementById('previewWrap');
const imagePreview = document.getElementById('imagePreview');
const removeImage = document.getElementById('removeImage');
const formError = document.getElementById('formError');
const toast = document.getElementById('toast');

let previewUrl = '';
let toastTimer;

function openRegisterModal() {
  registerModal.classList.add('open');
  registerModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => username.focus(), 60);
}

function closeRegisterModal() {
  registerModal.classList.remove('open');
  registerModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  formError.textContent = '';
}

function resetScreenshot() {
  accountScreenshot.value = '';
  uploadBox.hidden = false;
  previewWrap.hidden = true;
  imagePreview.removeAttribute('src');
  uploadTitle.textContent = 'Subir captura';
  uploadText.textContent = 'PNG, JPG o WEBP';

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = '';
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

loginBtn.addEventListener('click', () => showToast('Inicio de sesión listo para configurar.'));
registerBtn.addEventListener('click', openRegisterModal);
closeModal.addEventListener('click', closeRegisterModal);

registerModal.addEventListener('click', (event) => {
  if (event.target === registerModal) {
    closeRegisterModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && registerModal.classList.contains('open')) {
    closeRegisterModal();
  }
});

accountScreenshot.addEventListener('change', () => {
  formError.textContent = '';
  const file = accountScreenshot.files?.[0];

  if (!file) {
    resetScreenshot();
    return;
  }

  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    formError.textContent = 'La captura debe ser una imagen PNG, JPG o WEBP.';
    resetScreenshot();
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    formError.textContent = 'La captura no puede pesar más de 10 MB.';
    resetScreenshot();
    return;
  }

  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);
  imagePreview.src = previewUrl;
  uploadBox.hidden = true;
  previewWrap.hidden = false;
});

removeImage.addEventListener('click', resetScreenshot);

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formError.textContent = '';

  const usernameValue = username.value.trim();
  const passwordValue = password.value;
  const idValue = gameId.value.trim();
  const nameValue = accountName.value.trim();
  const countryValue = country.value.trim();
  const screenshot = accountScreenshot.files?.[0];

  if (!usernameValue) {
    formError.textContent = 'Escribe un nombre de usuario.';
    username.focus();
    return;
  }

  if (!passwordValue) {
    formError.textContent = 'Escribe una contraseña.';
    password.focus();
    return;
  }

  if (passwordValue.length < 4) {
    formError.textContent = 'La contraseña debe tener al menos 4 caracteres.';
    password.focus();
    return;
  }

  if (!idValue) {
    formError.textContent = 'Escribe el ID del juego.';
    gameId.focus();
    return;
  }

  if (!nameValue) {
    formError.textContent = 'Escribe el nombre que tiene la cuenta.';
    accountName.focus();
    return;
  }

  if (!countryValue) {
    formError.textContent = 'Escribe tu país.';
    country.focus();
    return;
  }

  if (!screenshot) {
    formError.textContent = 'Debes subir una captura donde se vea el ID.';
    return;
  }

  // El formulario ya valida los datos. La conexión a una base de datos
  // se puede agregar en el siguiente paso para guardar registros reales.
  showToast('Registro completado correctamente.');
  closeRegisterModal();
});
