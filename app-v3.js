const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const guestActions = document.getElementById('guestActions');
const userActions = document.getElementById('userActions');
const loggedUser = document.getElementById('loggedUser');
const profileScreen = document.getElementById('profileScreen');

const profileForm = document.getElementById('profileForm');
const profileUsername = document.getElementById('profileUsername');
const profileGameId = document.getElementById('profileGameId');
const profileAccountName = document.getElementById('profileAccountName');
const profileCountry = document.getElementById('profileCountry');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const profileAvatar = document.getElementById('profileAvatar');
const avatarPlaceholder = document.getElementById('avatarPlaceholder');
const profileError = document.getElementById('profileError');
const profileSaveBtn = document.getElementById('profileSaveBtn');

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

let screenshotPreviewUrl = '';
let avatarPreviewUrl = '';
let selectedAvatarFile = null;
let currentProfile = null;
let currentUser = null;
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
  return name.toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/-+/g, '-').slice(-80);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
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

function setGuestUI() {
  currentUser = null;
  currentProfile = null;
  guestActions.hidden = false;
  userActions.hidden = true;
  profileScreen.hidden = true;
  loggedUser.textContent = 'Jugador';
  selectedAvatarFile = null;
  clearAvatarPreview();
}

async function setUserUI(profile, user) {
  currentUser = user || currentUser;
  currentProfile = profile || currentProfile;

  guestActions.hidden = true;
  userActions.hidden = false;
  profileScreen.hidden = false;

  const display = profile?.account_name || profile?.username || user?.user_metadata?.username || 'Jugador';
  loggedUser.textContent = display;

  profileUsername.value = profile?.username || user?.user_metadata?.username || '';
  profileGameId.value = profile?.game_id || '';
  profileAccountName.value = profile?.account_name || '';
  profileCountry.value = profile?.country || '';
  profileError.textContent = '';

  if (profile?.avatar_path) {
    await loadAvatar(profile.avatar_path);
  } else {
    clearAvatarPreview();
  }
}

function clearAvatarPreview() {
  if (avatarPreviewUrl) {
    URL.revokeObjectURL(avatarPreviewUrl);
    avatarPreviewUrl = '';
  }
  profileAvatar.hidden = true;
  profileAvatar.removeAttribute('src');
  avatarPlaceholder.hidden = false;
}

async function loadAvatar(path) {
  if (!supabaseClient || !path) {
    clearAvatarPreview();
    return;
  }

  const { data, error } = await supabaseClient.storage
    .from('profile-photos')
    .createSignedUrl(path, 3600);

  if (error || !data?.signedUrl) {
    clearAvatarPreview();
    return;
  }

  profileAvatar.src = data.signedUrl;
  profileAvatar.hidden = false;
  avatarPlaceholder.hidden = true;
}

function setRegisterBusy(busy) {
  registerSubmit.disabled = busy;
  registerSubmit.textContent = busy ? 'Guardando...' : 'Crear cuenta';
}

function setLoginBusy(busy) {
  loginSubmit.disabled = busy;
  loginSubmit.textContent = busy ? 'Entrando...' : 'Entrar';
}

function setProfileBusy(busy) {
  profileSaveBtn.disabled = busy;
  profileSaveBtn.textContent = busy ? 'Guardando...' : '💾 Guardar cambios';
}

async function getProfile(userId) {
  if (!supabaseClient || !userId) return null;

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('id, username, game_id, account_name, country, screenshot_path, avatar_path, created_at')
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
  await setUserUI(profile, data.session.user);
}

function resetScreenshot() {
  accountScreenshot.value = '';
  uploadBox.hidden = false;
  previewWrap.hidden = true;
  imagePreview.removeAttribute('src');
  uploadTitle.textContent = 'Subir captura';
  uploadText.textContent = 'PNG, JPG o WEBP · máximo 10 MB';

  if (screenshotPreviewUrl) {
    URL.revokeObjectURL(screenshotPreviewUrl);
    screenshotPreviewUrl = '';
  }
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

  if (screenshotPreviewUrl) URL.revokeObjectURL(screenshotPreviewUrl);
  screenshotPreviewUrl = URL.createObjectURL(file);
  imagePreview.src = screenshotPreviewUrl;
  uploadBox.hidden = true;
  previewWrap.hidden = false;
});

removeImage.addEventListener('click', resetScreenshot);

profilePhotoInput.addEventListener('change', () => {
  profileError.textContent = '';
  const file = profilePhotoInput.files?.[0];
  if (!file) return;

  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    profileError.textContent = 'La foto debe ser JPG, PNG o WEBP.';
    profilePhotoInput.value = '';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    profileError.textContent = 'La foto no puede pesar más de 5 MB.';
    profilePhotoInput.value = '';
    return;
  }

  selectedAvatarFile = file;

  if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
  avatarPreviewUrl = URL.createObjectURL(file);
  profileAvatar.src = avatarPreviewUrl;
  profileAvatar.hidden = false;
  avatarPlaceholder.hidden = true;
});

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  profileError.textContent = '';

  if (!supabaseClient || !currentUser) {
    profileError.textContent = 'Tu sesión no está disponible. Vuelve a iniciar sesión.';
    return;
  }

  const gameIdValue = profileGameId.value.trim();
  const accountNameValue = profileAccountName.value.trim();
  const countryValue = profileCountry.value.trim();

  if (!gameIdValue || !accountNameValue || !countryValue) {
    profileError.textContent = 'Completa todos los datos del perfil.';
    return;
  }

  setProfileBusy(true);

  try {
    let avatarPath = currentProfile?.avatar_path || null;

    if (selectedAvatarFile) {
      const ext = (selectedAvatarFile.name.split('.').pop() || 'jpg').toLowerCase();
      const newPath = currentUser.id + '/avatar-' + Date.now() + '.' + ext;

      const { error: uploadError } = await supabaseClient.storage
        .from('profile-photos')
        .upload(newPath, selectedAvatarFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: selectedAvatarFile.type
        });

      if (uploadError) {
        throw new Error('No se pudo subir la foto de perfil: ' + uploadError.message);
      }

      const oldPath = avatarPath;
      avatarPath = newPath;

      if (oldPath && oldPath !== newPath) {
        await supabaseClient.storage.from('profile-photos').remove([oldPath]);
      }
    }

    const { data, error } = await supabaseClient
      .from('profiles')
      .update({
        game_id: gameIdValue,
        account_name: accountNameValue,
        country: countryValue,
        avatar_path: avatarPath
      })
      .eq('id', currentUser.id)
      .select('id, username, game_id, account_name, country, screenshot_path, avatar_path, created_at')
      .single();

    if (error) {
      throw new Error('No se pudieron guardar los cambios: ' + error.message);
    }

    currentProfile = data;
    selectedAvatarFile = null;
    profilePhotoInput.value = '';
    await setUserUI(data, currentUser);
    showToast('Perfil actualizado correctamente.');
  } catch (error) {
    console.error(error);
    profileError.textContent = error?.message || 'No se pudo actualizar el perfil.';
  } finally {
    setProfileBusy(false);
  }
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  registerError.textContent = '';

  if (!cloudReady) {
    registerError.textContent = 'La nube todavía no está configurada.';
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
    return;
  }

  if (passwordValue.length < 6) {
    registerError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }

  if (!idValue || !nameValue || !countryValue || !screenshot) {
    registerError.textContent = 'Completa todos los datos y sube la captura.';
    return;
  }

  setRegisterBusy(true);

  try {
    const { data: registerData, error: registerFunctionError } =
      await supabaseClient.functions.invoke('register-user', {
        body: { username: usernameValue, password: passwordValue }
      });

    if (registerFunctionError || !registerData?.ok) {
      throw new Error(registerData?.error || 'No se pudo crear la cuenta.');
    }

    const { data: loginData, error: loginAfterRegisterError } =
      await supabaseClient.auth.signInWithPassword({
        email: usernameToInternalEmail(usernameValue),
        password: passwordValue
      });

    if (loginAfterRegisterError || !loginData?.session || !loginData?.user) {
      throw new Error('La cuenta se creó, pero no se pudo iniciar la sesión automáticamente.');
    }

    const userId = loginData.user.id;
    const filePath = userId + '/' + Date.now() + '-' + safeFileName(screenshot.name || 'captura.jpg');

    const { error: uploadError } = await supabaseClient.storage
      .from('account-captures')
      .upload(filePath, screenshot, {
        cacheControl: '3600',
        upsert: false,
        contentType: screenshot.type
      });

    if (uploadError) {
      throw new Error('No se pudo subir la captura: ' + uploadError.message);
    }

    const { data: newProfile, error: profileError } = await supabaseClient
      .from('profiles')
      .insert({
        id: userId,
        username: normalizeUsername(usernameValue),
        game_id: idValue,
        account_name: nameValue,
        country: countryValue,
        screenshot_path: filePath,
        avatar_path: null
      })
      .select('id, username, game_id, account_name, country, screenshot_path, avatar_path, created_at')
      .single();

    if (profileError) {
      throw new Error('No se pudo guardar el perfil: ' + profileError.message);
    }

    registerForm.reset();
    resetScreenshot();
    closeModal(registerModal);
    await setUserUI(newProfile, loginData.user);
    showToast('Cuenta creada. Ahora puedes agregar tu foto de perfil.');
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
    loginError.textContent = 'La nube todavía no está configurada.';
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
    loginForm.reset();
    closeModal(loginModal);
    await setUserUI(profile, data.user);
    showToast('Sesión iniciada correctamente.');
  } catch (error) {
    console.error(error);
    loginError.textContent = error?.message || 'No se pudo iniciar sesión.';
  } finally {
    setLoginBusy(false);
  }
});

logoutBtn.addEventListener('click', async () => {
  if (supabaseClient) await supabaseClient.auth.signOut();
  setGuestUI();
  showToast('Sesión cerrada.');
});

if (cloudReady) {
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (!session || event === 'SIGNED_OUT') {
      setGuestUI();
      return;
    }

    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
      const profile = await getProfile(session.user.id);
      await setUserUI(profile, session.user);
    }
  });
}

restoreSession();
