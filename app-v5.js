const guestTopbar=document.getElementById('guestTopbar');
const guestEmpty=document.getElementById('guestEmpty');
const playerDashboard=document.getElementById('playerDashboard');
const loginBtn=document.getElementById('loginBtn');
const registerBtn=document.getElementById('registerBtn');
const logoutBtn=document.getElementById('logoutBtn');
const backBtn=document.getElementById('backBtn');
const settingsBtn=document.getElementById('settingsBtn');
const settingsMenu=document.getElementById('settingsMenu');

const profileAvatar=document.getElementById('profileAvatar');
const avatarPlaceholder=document.getElementById('avatarPlaceholder');
const profilePhotoInput=document.getElementById('profilePhotoInput');
const dashboardPlayerName=document.getElementById('dashboardPlayerName');
const countryFlag=document.getElementById('countryFlag');
const countryName=document.getElementById('countryName');
const dashboardElo=document.getElementById('dashboardElo');
const dashboardWins=document.getElementById('dashboardWins');
const dashboardLosses=document.getElementById('dashboardLosses');
const gamesPlayed=document.getElementById('gamesPlayed');
const winRate=document.getElementById('winRate');
const currentStreak=document.getElementById('currentStreak');
const bestElo=document.getElementById('bestElo');
const dashboardMessage=document.getElementById('dashboardMessage');
const rankBadgeText=document.getElementById('rankBadgeText');
const rankTitle=document.getElementById('rankTitle');

const registerModal=document.getElementById('registerModal');
const closeRegisterModalBtn=document.getElementById('closeRegisterModal');
const registerForm=document.getElementById('registerForm');
const registerSubmit=document.getElementById('registerSubmit');
const registerError=document.getElementById('registerError');
const username=document.getElementById('username');
const password=document.getElementById('password');
const gameId=document.getElementById('gameId');
const accountName=document.getElementById('accountName');
const country=document.getElementById('country');
const accountScreenshot=document.getElementById('accountScreenshot');
const uploadBox=document.getElementById('uploadBox');
const previewWrap=document.getElementById('previewWrap');
const imagePreview=document.getElementById('imagePreview');
const removeImage=document.getElementById('removeImage');

const loginModal=document.getElementById('loginModal');
const closeLoginModalBtn=document.getElementById('closeLoginModal');
const loginForm=document.getElementById('loginForm');
const loginSubmit=document.getElementById('loginSubmit');
const loginError=document.getElementById('loginError');
const loginUsername=document.getElementById('loginUsername');
const loginPassword=document.getElementById('loginPassword');
const toast=document.getElementById('toast');

let supabaseClient=null;
let currentUser=null;
let currentProfile=null;
let screenshotPreviewUrl='';
let avatarPreviewUrl='';
let toastTimer;

const cloudConfig=window.SUPABASE_CONFIG||{};
const cloudReady=typeof window.supabase!=='undefined'&&typeof cloudConfig.url==='string'&&cloudConfig.url.startsWith('https://')&&typeof cloudConfig.key==='string'&&cloudConfig.key.length>20;
if(cloudReady){supabaseClient=window.supabase.createClient(cloudConfig.url,cloudConfig.key)}

function normalizeUsername(value){return value.trim().toLowerCase()}
function usernameToInternalEmail(value){return normalizeUsername(value)+'@login.rankingikar8bp.com'}
function validUsername(value){return /^[a-zA-Z0-9._-]{3,30}$/.test(value)}
function safeFileName(name){return name.toLowerCase().replace(/[^a-z0-9._-]/g,'-').replace(/-+/g,'-').slice(-80)}

function showToast(message){
  toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3000)
}
function openModal(modal,focusTarget){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>focusTarget?.focus(),60)}
function closeModal(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');if(!document.querySelector('.modal-backdrop.open'))document.body.classList.remove('modal-open')}
function setRegisterBusy(busy){registerSubmit.disabled=busy;registerSubmit.textContent=busy?'Guardando...':'Crear cuenta'}
function setLoginBusy(busy){loginSubmit.disabled=busy;loginSubmit.textContent=busy?'Entrando...':'Entrar'}

function getFlag(value){
  const c=(value||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const flags={
    mexico:'🇲🇽',ecuador:'🇪🇨',colombia:'🇨🇴',argentina:'🇦🇷',peru:'🇵🇪',chile:'🇨🇱',venezuela:'🇻🇪',
    espana:'🇪🇸',spain:'🇪🇸',brasil:'🇧🇷',brazil:'🇧🇷',uruguay:'🇺🇾',paraguay:'🇵🇾',bolivia:'🇧🇴',
    'estados unidos':'🇺🇸',usa:'🇺🇸','united states':'🇺🇸','republica dominicana':'🇩🇴',dominicana:'🇩🇴',
    guatemala:'🇬🇹',honduras:'🇭🇳','el salvador':'🇸🇻',nicaragua:'🇳🇮','costa rica':'🇨🇷',panama:'🇵🇦',
    cuba:'🇨🇺','puerto rico':'🇵🇷',francia:'🇫🇷',italia:'🇮🇹',alemania:'🇩🇪',canada:'🇨🇦'
  };
  return flags[c]||'🌎'
}

function setGuestUI(){
  currentUser=null;currentProfile=null;guestTopbar.hidden=false;guestEmpty.hidden=false;playerDashboard.hidden=true;settingsMenu.hidden=true;clearAvatar()
}
function clearAvatar(){
  if(avatarPreviewUrl){URL.revokeObjectURL(avatarPreviewUrl);avatarPreviewUrl=''}
  profileAvatar.hidden=true;profileAvatar.removeAttribute('src');avatarPlaceholder.hidden=false
}
async function loadAvatar(path){
  if(!supabaseClient||!path){clearAvatar();return}
  const {data,error}=await supabaseClient.storage.from('profile-photos').createSignedUrl(path,3600);
  if(error||!data?.signedUrl){clearAvatar();return}
  profileAvatar.src=data.signedUrl;profileAvatar.hidden=false;avatarPlaceholder.hidden=true
}

async function setPlayerUI(profile,user){
  currentUser=user||currentUser;currentProfile=profile||currentProfile;
  guestTopbar.hidden=true;guestEmpty.hidden=true;playerDashboard.hidden=false;

  const playerName=profile?.username||user?.user_metadata?.username||profile?.account_name||'Jugador';
  const rankName=profile?.rank_name||'Latón';
  const elo=Number.isFinite(Number(profile?.elo_points))?Number(profile.elo_points):200;
  const wins=Number.isFinite(Number(profile?.wins))?Number(profile.wins):0;
  const losses=Number.isFinite(Number(profile?.losses))?Number(profile.losses):0;
  const games=wins+losses;
  const rate=games>0?Math.round((wins/games)*100):0;

  dashboardPlayerName.textContent=String(playerName).toUpperCase();
  countryName.textContent=profile?.country||'País';
  countryFlag.textContent=getFlag(profile?.country);
  dashboardElo.textContent=elo;
  dashboardWins.textContent=wins;
  dashboardLosses.textContent=losses;
  gamesPlayed.textContent=games;
  winRate.textContent=rate+'%';
  currentStreak.textContent='0';
  bestElo.textContent=elo;
  rankBadgeText.textContent=rankName;
  rankTitle.textContent='Rango '+rankName;
  dashboardMessage.textContent='';

  if(profile?.avatar_path){await loadAvatar(profile.avatar_path)}else{clearAvatar()}
}

async function getProfile(userId){
  if(!supabaseClient||!userId)return null;
  const {data,error}=await supabaseClient.from('profiles')
    .select('id, username, game_id, account_name, country, screenshot_path, avatar_path, rank_name, elo_points, wins, losses, created_at')
    .eq('id',userId).maybeSingle();
  if(error){console.error('Error cargando perfil:',error);return null}
  return data
}

async function restoreSession(){
  if(!cloudReady){setGuestUI();return}
  const {data,error}=await supabaseClient.auth.getSession();
  if(error||!data.session){setGuestUI();return}
  const profile=await getProfile(data.session.user.id);
  await setPlayerUI(profile,data.session.user)
}

function resetScreenshot(){
  accountScreenshot.value='';uploadBox.hidden=false;previewWrap.hidden=true;imagePreview.removeAttribute('src');
  if(screenshotPreviewUrl){URL.revokeObjectURL(screenshotPreviewUrl);screenshotPreviewUrl=''}
}

loginBtn.addEventListener('click',()=>{loginError.textContent='';openModal(loginModal,loginUsername)});
registerBtn.addEventListener('click',()=>{registerError.textContent='';openModal(registerModal,username)});
closeRegisterModalBtn.addEventListener('click',()=>closeModal(registerModal));
closeLoginModalBtn.addEventListener('click',()=>closeModal(loginModal));
[registerModal,loginModal].forEach(modal=>modal.addEventListener('click',e=>{if(e.target===modal)closeModal(modal)}));
window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal(registerModal);closeModal(loginModal);settingsMenu.hidden=true}});
backBtn.addEventListener('click',()=>showToast('Perfil del jugador'));
settingsBtn.addEventListener('click',()=>{settingsMenu.hidden=!settingsMenu.hidden});

accountScreenshot.addEventListener('change',()=>{
  registerError.textContent='';const file=accountScreenshot.files?.[0];
  if(!file){resetScreenshot();return}
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){registerError.textContent='La captura debe ser PNG, JPG o WEBP.';resetScreenshot();return}
  if(file.size>10*1024*1024){registerError.textContent='La captura no puede pesar más de 10 MB.';resetScreenshot();return}
  if(screenshotPreviewUrl)URL.revokeObjectURL(screenshotPreviewUrl);
  screenshotPreviewUrl=URL.createObjectURL(file);imagePreview.src=screenshotPreviewUrl;uploadBox.hidden=true;previewWrap.hidden=false
});
removeImage.addEventListener('click',resetScreenshot);

profilePhotoInput.addEventListener('change',async()=>{
  dashboardMessage.textContent='';const file=profilePhotoInput.files?.[0];
  if(!file||!currentUser||!supabaseClient)return;
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){dashboardMessage.textContent='La foto debe ser JPG, PNG o WEBP.';profilePhotoInput.value='';return}
  if(file.size>5*1024*1024){dashboardMessage.textContent='La foto no puede pesar más de 5 MB.';profilePhotoInput.value='';return}

  if(avatarPreviewUrl)URL.revokeObjectURL(avatarPreviewUrl);
  avatarPreviewUrl=URL.createObjectURL(file);profileAvatar.src=avatarPreviewUrl;profileAvatar.hidden=false;avatarPlaceholder.hidden=true;

  try{
    const ext=(file.name.split('.').pop()||'jpg').toLowerCase();
    const newPath=currentUser.id+'/avatar-'+Date.now()+'.'+ext;
    const {error:uploadError}=await supabaseClient.storage.from('profile-photos').upload(newPath,file,{cacheControl:'3600',upsert:false,contentType:file.type});
    if(uploadError)throw uploadError;
    const oldPath=currentProfile?.avatar_path||null;
    const {data:updatedProfile,error:updateError}=await supabaseClient.from('profiles').update({avatar_path:newPath}).eq('id',currentUser.id)
      .select('id, username, game_id, account_name, country, screenshot_path, avatar_path, rank_name, elo_points, wins, losses, created_at').single();
    if(updateError)throw updateError;
    if(oldPath&&oldPath!==newPath)await supabaseClient.storage.from('profile-photos').remove([oldPath]);
    currentProfile=updatedProfile;profilePhotoInput.value='';await loadAvatar(newPath);showToast('Foto de perfil actualizada.')
  }catch(error){console.error(error);dashboardMessage.textContent='No se pudo guardar la foto de perfil.'}
});

registerForm.addEventListener('submit',async event=>{
  event.preventDefault();registerError.textContent='';
  if(!cloudReady){registerError.textContent='La nube todavía no está configurada.';return}

  const usernameValue=username.value.trim(),passwordValue=password.value,idValue=gameId.value.trim(),nameValue=accountName.value.trim(),countryValue=country.value.trim(),screenshot=accountScreenshot.files?.[0];
  if(!validUsername(usernameValue)){registerError.textContent='El usuario solo puede tener letras, números, punto, guion o guion bajo.';return}
  if(passwordValue.length<6){registerError.textContent='La contraseña debe tener al menos 6 caracteres.';return}
  if(!idValue||!nameValue||!countryValue||!screenshot){registerError.textContent='Completa todos los datos y sube la captura.';return}

  setRegisterBusy(true);
  try{
    const {data:registerData,error:registerFunctionError}=await supabaseClient.functions.invoke('register-user',{body:{username:usernameValue,password:passwordValue}});
    if(registerFunctionError||!registerData?.ok)throw new Error(registerData?.error||'No se pudo crear la cuenta.');

    const {data:loginData,error:loginAfterRegisterError}=await supabaseClient.auth.signInWithPassword({email:usernameToInternalEmail(usernameValue),password:passwordValue});
    if(loginAfterRegisterError||!loginData?.session||!loginData?.user)throw new Error('La cuenta se creó, pero no se pudo iniciar la sesión automáticamente.');

    const userId=loginData.user.id;
    const filePath=userId+'/'+Date.now()+'-'+safeFileName(screenshot.name||'captura.jpg');
    const {error:uploadError}=await supabaseClient.storage.from('account-captures').upload(filePath,screenshot,{cacheControl:'3600',upsert:false,contentType:screenshot.type});
    if(uploadError)throw new Error('No se pudo subir la captura: '+uploadError.message);

    const {data:newProfile,error:profileError}=await supabaseClient.from('profiles').insert({
      id:userId,username:normalizeUsername(usernameValue),game_id:idValue,account_name:nameValue,country:countryValue,screenshot_path:filePath,avatar_path:null
    }).select('id, username, game_id, account_name, country, screenshot_path, avatar_path, rank_name, elo_points, wins, losses, created_at').single();
    if(profileError)throw new Error('No se pudo guardar el perfil: '+profileError.message);

    registerForm.reset();resetScreenshot();closeModal(registerModal);await setPlayerUI(newProfile,loginData.user);showToast('Cuenta creada. Rango inicial: Latón · ELO 200.')
  }catch(error){console.error(error);registerError.textContent=error?.message||'No se pudo crear la cuenta.'}
  finally{setRegisterBusy(false)}
});

loginForm.addEventListener('submit',async event=>{
  event.preventDefault();loginError.textContent='';
  if(!cloudReady){loginError.textContent='La nube todavía no está configurada.';return}
  const usernameValue=loginUsername.value.trim(),passwordValue=loginPassword.value;
  if(!usernameValue||!passwordValue){loginError.textContent='Escribe tu usuario y contraseña.';return}

  setLoginBusy(true);
  try{
    const {data,error}=await supabaseClient.auth.signInWithPassword({email:usernameToInternalEmail(usernameValue),password:passwordValue});
    if(error||!data.session)throw new Error('Usuario o contraseña incorrectos.');
    const profile=await getProfile(data.user.id);loginForm.reset();closeModal(loginModal);await setPlayerUI(profile,data.user);showToast('Sesión iniciada correctamente.')
  }catch(error){console.error(error);loginError.textContent=error?.message||'No se pudo iniciar sesión.'}
  finally{setLoginBusy(false)}
});

logoutBtn.addEventListener('click',async()=>{settingsMenu.hidden=true;if(supabaseClient)await supabaseClient.auth.signOut();setGuestUI();showToast('Sesión cerrada.')});

if(cloudReady){
  supabaseClient.auth.onAuthStateChange(async(event,session)=>{
    if(!session||event==='SIGNED_OUT'){setGuestUI();return}
    if(event==='SIGNED_IN'||event==='INITIAL_SESSION'||event==='TOKEN_REFRESHED'){const profile=await getProfile(session.user.id);await setPlayerUI(profile,session.user)}
  })
}
restoreSession();