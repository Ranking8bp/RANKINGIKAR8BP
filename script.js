const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const guestActions = document.getElementById('guestActions');
const userActions = document.getElementById('userActions');
const loggedUser = document.getElementById('loggedUser');

const registerModal = document.getElementById('registerModal');
const closeRegisterModalBtn = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('registerForm');
const registerSubmit = document.getElementById('registerSubmit');
const registerError = document.getElementById('registerError');

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

const loginModal = document.getElementById('loginModal');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const loginSubmit = document.getElementById('loginSubmit');
const loginError = document.getElementById('loginError');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

const toast = document.getElementById('toast');

let previewUrl = '';
let toastTimer;
let supabaseClient = null;

const cloudConfig = window.SUPABASE_CONFIG || {};
const cloudReady =
  typeof window.supabase !== 'undefined' &&
  typeof cloudConfig.url === 'string' &&
  cloudConfig.url.startsWith('https://') &&
  typeof cloudConfig.key === 'string' &&
  cloudConfig.key.length > 20;

if (cloudReady) {
  supabaseClient = window.supabase.createClient(cloudConfig.url, cloudConfig.key);
}

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function usernameToInternalEmail(value) {
  return normalizeUsername(value) + '@login.rankingikar8bp.com';
}

function validUsername(value) {
  return /^[a-zA-Z0-9._-]{3,30}$/.test(value);
}

function safeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(-80);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function openModal(modal, focusTarget) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => focusTarget?.focus(), 60);
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal-backdrop.open')) {
    document.body.classList.remove('modal-open');
  }
}

function resetScreenshot() {
  accountScreenshot.value = '';
  uploadBox.hidden = false;
  previewWrap.hidden = true;
  imagePreview.removeAttribute('src');
  uploadTitle.textContent = 'Subir captura';
  uploadText.textContent = 'PNG, JPG o WEBP · máximo 10 MB';

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = '';
  }
}

function setRegisterBusy(busy) {
  registerSubmit.disabled = busy;
  registerSubmit.textContent = busy ? 'Guardando...' : 'Crear cuenta';
}

function setLoginBusy(busy) {
  loginSubmit.disabled = busy;
  loginSubmit.textContent = busy ? 'Entrando...' : 'Entrar';
}

function setGuestUI() {
  guestActions.hidden = false;
  userActions.hidden = true;
  loggedUser.textContent = 'Jugador';
}

function setUserUI(profile) {
  guestActions.hidden = true;
  userActions.hidden = false;
  loggedUser.textContent = profile?.account_name || profile?.username || 'Jugador';
}

async function getProfile(userId) {
  if (!supabaseClient || !userId) return null;

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('id, username, game_id, account_name, country, screenshot_path, created_at')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error cargando perfil:', error);
    return null;
  }

  return data;
}

async function restoreSession() {
  if (!cloudReady) {
    setGuestUI();
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();

  if (error || !data.session) {
    setGuestUI();
    return;
  }

  const profile = await getProfile(data.session.user.id);
  setUserUI(profile || { username: data.session.user.user_metadata?.username });
}

loginBtn.addEventListener('click', () => {
  loginError.textContent = '';
  openModal(loginModal, loginUsername);
});

registerBtn.addEventListener('click', () => {
  registerError.textContent = '';
  openModal(registerModal, username);
});

closeRegisterModalBtn.addEventListener('click', () => closeModal(registerModal));
closeLoginModalBtn.addEventListener('click', () => closeModal(loginModal));

[registerModal, loginModal].forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (registerModal.classList.contains('open')) closeModal(registerModal);
  if (loginModal.classList.contains('open')) closeModal(loginModal);
});

accountScreenshot.addEventListener('change', () => {
  registerError.textContent = '';
  const file = accountScreenshot.files?.[0];

  if (!file) {
    resetScreenshot();
    return;
  }

  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    registerError.textContent = 'La captura debe ser PNG, JPG o WEBP.';
    resetScreenshot();
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    registerError.textContent = 'La captura no puede pesar más de 10 MB.';
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

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  registerError.textContent = '';

  if (!cloudReady) {
    registerError.textContent = 'La nube todavía no está configurada. Falta conectar Supabase.';
    return;
  }

  const usernameValue = username.value.trim();
  const passwordValue = password.value;
  const idValue = gameId.value.trim();
  const nameValue = accountName.value.trim();
  const countryValue = country.value.trim();
  const screenshot = accountScreenshot.files?.[0];

  if (!validUsername(usernameValue)) {
    registerError.textContent = 'El usuario solo puede tener letras, números, punto, guion o guion bajo.';
    username.focus();
    return;
  }

  if (passwordValue.length < 6) {
    registerError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    password.focus();
    return;
  }

  if (!idValue) {
    registerError.textContent = 'Escribe el ID del juego.';
    gameId.focus();
    return;
  }

  if (!nameValue) {
    registerError.textContent = 'Escribe el nombre que tiene la cuenta.';
    accountName.focus();
    return;
  }

  if (!countryValue) {
    registerError.textContent = 'Escribe tu país.';
    country.focus();
    return;
  }

  if (!screenshot) {
    registerError.textContent = 'Debes subir una captura donde se vea el ID.';
    return;
  }

  setRegisterBusy(true);

  try {
    const { data: registerData, error: registerFunctionError } = await supabaseClient.functions.invoke('register-user', {
      body: {
        username: usernameValue,
        password: passwordValue
      }
    });

    if (registerFunctionError) {
      throw new Error(registerData?.error || 'No se pudo crear la cuenta.');
    }

    if (!registerData?.ok) {
      throw new Error(registerData?.error || 'No se pudo crear la cuenta.');
    }

    const internalEmail = usernameToInternalEmail(usernameValue);

    const { data: loginData, error: loginAfterRegisterError } = await supabaseClient.auth.signInWithPassword({
      email: internalEmail,
      password: passwordValue
    });

    if (loginAfterRegisterError || !loginData?.session || !loginData?.user) {
      throw new Error('La cuenta se creó, pero no se pudo iniciar la sesión automáticamente.');
    }

    const userId = loginData.user.id;
    const filePath = `${userId}/${Date.now()}-${safeFileName(screenshot.name || 'captura.jpg')}`;

    const { error: uploadError } = await supabaseClient.storage
      .from('account-captures')
      .upload(filePath, screenshot, {
        cacheControl: '3600',
        upsert: false,
        contentType: screenshot.type
      });

    if (uploadError) {
      throw new Error('La cuenta se creó, pero no se pudo subir la captura: ' + uploadError.message);
    }

    const { error: profileError } = await supabaseClient
      .from('profiles')
      .insert({
        id: userId,
        username: normalizeUsername(usernameValue),
        game_id: idValue,
        account_name: nameValue,
        country: countryValue,
        screenshot_path: filePath
      });

    if (profileError) {
      throw new Error('La cuenta se creó, pero no se pudo guardar el perfil: ' + profileError.message);
    }

    const profile = await getProfile(userId);
    setUserUI(profile || { username: usernameValue, account_name: nameValue });

    registerForm.reset();
    resetScreenshot();
    closeModal(registerModal);
    showToast('Cuenta creada y guardada en la nube.');
  } catch (error) {
    console.error(error);
    registerError.textContent = error?.message || 'No se pudo crear la cuenta.';
  } finally {
    setRegisterBusy(false);
  }
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.textContent = '';

  if (!cloudReady) {
    loginError.textContent = 'La nube todavía no está configurada. Falta conectar Supabase.';
    return;
  }

  const usernameValue = loginUsername.value.trim();
  const passwordValue = loginPassword.value;

  if (!usernameValue || !passwordValue) {
    loginError.textContent = 'Escribe tu usuario y contraseña.';
    return;
  }

  setLoginBusy(true);

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: usernameToInternalEmail(usernameValue),
      password: passwordValue
    });

    if (error || !data.session) {
      throw new Error('Usuario o contraseña incorrectos.');
    }

    const profile = await getProfile(data.user.id);
    setUserUI(profile || { username: usernameValue });

    loginForm.reset();
    closeModal(loginModal);
    showToast('Sesión iniciada correctamente.');
  } catch (error) {
    console.error(error);
    loginError.textContent = error?.message || 'No se pudo iniciar sesión.';
  } finally {
    setLoginBusy(false);
  }
});

logoutBtn.addEventListener('click', async () => {
  if (!supabaseClient) {
    setGuestUI();
    return;
  }

  await supabaseClient.auth.signOut();
  setGuestUI();
  showToast('Sesión cerrada.');
});

if (cloudReady) {
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      setGuestUI();
      return;
    }

    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
      const profile = await getProfile(session.user.id);
      setUserUI(profile || { username: session.user.user_metadata?.username });
    }
  });
}

restoreSession();
