const guestTopbar=document.getElementById('guestTopbar');
const guestEmpty=document.getElementById('guestEmpty');
const playerDashboard=document.getElementById('playerDashboard');
const guestRankingList=document.getElementById('guestRankingList');
const guestRankingCount=document.getElementById('guestRankingCount');
const guestRankShowcase=document.getElementById('guestRankShowcase');
const loginBtn=document.getElementById('loginBtn');
const registerBtn=document.getElementById('registerBtn');
const logoutBtn=document.getElementById('logoutBtn');
const deleteAccountBtn=document.getElementById('deleteAccountBtn');
const adminModeBtn=document.getElementById('adminModeBtn');
const moderatorAdminBtn=document.getElementById('moderatorAdminBtn');
const moderatorPanel=document.getElementById('moderatorPanel');
const moderatorCloseBtn=document.getElementById('moderatorCloseBtn');
const moderatorRefreshBtn=document.getElementById('moderatorRefreshBtn');
const moderatorMatchList=document.getElementById('moderatorMatchList');
const adminPanel=document.getElementById('adminPanel');
const adminCloseBtn=document.getElementById('adminCloseBtn');
const adminRefreshBtn=document.getElementById('adminRefreshBtn');
const adminMatchList=document.getElementById('adminMatchList');
const adminPlayerList=document.getElementById('adminPlayerList');
const adminVsTab=document.getElementById('adminVsTab');
const adminPlayersTab=document.getElementById('adminPlayersTab');
const adminResultsTab=document.getElementById('adminResultsTab');
const adminResultsList=document.getElementById('adminResultsList');
const backBtn=document.getElementById('backBtn');
const settingsBtn=document.getElementById('settingsBtn');
const settingsMenu=document.getElementById('settingsMenu');
const activityBtn=document.getElementById('activityBtn');
const activityPanel=document.getElementById('activityPanel');
const activityList=document.getElementById('activityList');
const refreshActivityBtn=document.getElementById('refreshActivityBtn');

const profileAvatar=document.getElementById('profileAvatar');
const avatarPlaceholder=document.getElementById('avatarPlaceholder');
const profilePhotoInput=document.getElementById('profilePhotoInput');
const dashboardPlayerName=document.getElementById('dashboardPlayerName');
const dashboardFollowersCount=document.getElementById('dashboardFollowersCount');
const dashboardFollowingCount=document.getElementById('dashboardFollowingCount');
const countryFlag=document.getElementById('countryFlag');
const countryName=document.getElementById('countryName');
const dashboardElo=document.getElementById('dashboardElo');
const dashboardWins=document.getElementById('dashboardWins');
const dashboardLosses=document.getElementById('dashboardLosses');
const dashboardPlayBtn=document.getElementById('dashboardPlayBtn');
const matchmakingModal=document.getElementById('matchmakingModal');
const matchmakingClose=document.getElementById('matchmakingClose');
const matchmakingSearching=document.getElementById('matchmakingSearching');
const matchmakingVersus=document.getElementById('matchmakingVersus');
const versusMe=document.getElementById('versusMe');
const versusMyElo=document.getElementById('versusMyElo');
const versusOpponent=document.getElementById('versusOpponent');
const versusOpponentElo=document.getElementById('versusOpponentElo');
const versusMyAvatar=document.getElementById('versusMyAvatar'),versusOpponentAvatar=document.getElementById('versusOpponentAvatar');
const versusMyRank=document.getElementById('versusMyRank'),versusOpponentRank=document.getElementById('versusOpponentRank');
const versusMyRankBadge=document.getElementById('versusMyRankBadge'),versusOpponentRankBadge=document.getElementById('versusOpponentRankBadge');
const versusMyPosition=document.getElementById('versusMyPosition'),versusOpponentPosition=document.getElementById('versusOpponentPosition');
const pendingMatchesCount=document.getElementById('pendingMatchesCount');
const abandonRankedBtn=document.getElementById('abandonRankedBtn');
const playerVsSafety=document.getElementById('playerVsSafety'),playerCancelVsBtn=document.getElementById('playerCancelVsBtn'),playerPlayingBtn=document.getElementById('playerPlayingBtn'),playerPlayingLocked=document.getElementById('playerPlayingLocked'),playerVsSafetyNotice=document.getElementById('playerVsSafetyNotice');
const confirmedMatchWarning=document.getElementById('confirmedMatchWarning');
let pendingMatchesTimer=null;
let matchmakingTimer=null,currentRankedMatchId=null,matchmakingHeartbeatTimer=null;
const gamesPlayed=document.getElementById('gamesPlayed');
const winRate=document.getElementById('winRate');
const currentStreak=document.getElementById('currentStreak');
const bestElo=document.getElementById('bestElo');
const dashboardMessage=document.getElementById('dashboardMessage');
const rankBadgeImage=document.getElementById('rankBadgeImage');
const rankingList=document.getElementById('rankingList');
const rankingCount=document.getElementById('rankingCount');
const playerDetailModal=document.getElementById('playerDetailModal');
const closePlayerDetail=document.getElementById('closePlayerDetail');
const playerDetailAvatar=document.getElementById('playerDetailAvatar');
const playerDetailName=document.getElementById('playerDetailName');
const playerDetailFlag=document.getElementById('playerDetailFlag');
const playerDetailCountry=document.getElementById('playerDetailCountry');
const playerDetailGameId=document.getElementById('playerDetailGameId');
const playerDetailElo=document.getElementById('playerDetailElo');
const playerDetailWins=document.getElementById('playerDetailWins');
const playerDetailLosses=document.getElementById('playerDetailLosses');
const playerDetailRank=document.getElementById('playerDetailRank');
const playerDetailRankBadge=document.getElementById('playerDetailRankBadge');
const playerHeartBtn=document.getElementById('playerHeartBtn');
const playerHeartCount=document.getElementById('playerHeartCount');
const playerHeartCountLabel=document.getElementById('playerHeartCountLabel');
const playerFollowBtn=document.getElementById('playerFollowBtn');
const playerPlayBtn=document.getElementById('playerPlayBtn');
const playerMessageBtn=document.getElementById('playerMessageBtn');
const playerModeratorBtn=document.getElementById('playerModeratorBtn');
const privateMessageModal=document.getElementById('privateMessageModal');
const privateMessageClose=document.getElementById('privateMessageClose');
const privateMessageTo=document.getElementById('privateMessageTo');
const privateMessageInput=document.getElementById('privateMessageInput');
const privateMessageSend=document.getElementById('privateMessageSend');
const playerFollowersCount=document.getElementById('playerFollowersCount');
const playerFollowingCount=document.getElementById('playerFollowingCount');
const profileCommentForm=document.getElementById('profileCommentForm');
const profileCommentInput=document.getElementById('profileCommentInput');
const profileCommentSubmit=document.getElementById('profileCommentSubmit');
const profileCommentsList=document.getElementById('profileCommentsList');
const profileCommentCount=document.getElementById('profileCommentCount');
const inboxBtn=document.getElementById('inboxBtn');
const inboxPanel=document.getElementById('inboxPanel');
const inboxList=document.getElementById('inboxList');
const refreshInboxBtn=document.getElementById('refreshInboxBtn');
const conversationPanel=document.getElementById('conversationPanel');
const conversationTitle=document.getElementById('conversationTitle');
const conversationMessages=document.getElementById('conversationMessages');
const conversationInput=document.getElementById('conversationInput');
const conversationSendBtn=document.getElementById('conversationSendBtn');
const conversationBackBtn=document.getElementById('conversationBackBtn');
const conversationCloseBtn=document.getElementById('conversationCloseBtn');
let inboxMessagesCache=[],activeConversationUser=null;
const notificationBtn=document.getElementById('notificationBtn');
const notificationBadge=document.getElementById('notificationBadge');
const notificationPanel=document.getElementById('notificationPanel');
const notificationList=document.getElementById('notificationList');
const markNotificationsRead=document.getElementById('markNotificationsRead');

const registerModal=document.getElementById('registerModal');
const closeRegisterModalBtn=document.getElementById('closeRegisterModal');
const registerForm=document.getElementById('registerForm');
const registerSubmit=document.getElementById('registerSubmit');
const registerError=document.getElementById('registerError');
const username=document.getElementById('username');
const password=document.getElementById('password');
const gameId=document.getElementById('gameId');
const country=document.getElementById('country');
const loginModal=document.getElementById('loginModal');
const closeLoginModalBtn=document.getElementById('closeLoginModal');
const loginForm=document.getElementById('loginForm');
const loginSubmit=document.getElementById('loginSubmit');
const loginError=document.getElementById('loginError');
const loginUsername=document.getElementById('loginUsername');
const loginPassword=document.getElementById('loginPassword');
const toast=document.getElementById('toast');
const whatsappContactBtn=document.getElementById('whatsappContactBtn');
const OFFICIAL_WHATSAPP_GROUP_URL=window.RANKING_WHATSAPP_GROUP_URL||'';


let supabaseClient=null;
let currentUser=null;
let currentProfile=null;
let avatarPreviewUrl='';
let toastTimer;
let currentDetailPlayer=null;
let currentDetailHearted=false;
let currentDetailHeartBusy=false;

const cloudConfig=window.SUPABASE_CONFIG||{};
const cloudReady=typeof window.supabase!=='undefined'&&typeof cloudConfig.url==='string'&&cloudConfig.url.startsWith('https://')&&typeof cloudConfig.key==='string'&&cloudConfig.key.length>20;

if(cloudReady){supabaseClient=window.supabase.createClient(cloudConfig.url,cloudConfig.key)}

/* Inicialización temprana de acceso: estos controles se registran antes del resto
   de la interfaz para que un error de una función secundaria no deje bloqueados
   los botones de Iniciar sesión / Registrarse. */
function bindAuthModalsEarly(){
  const open=(modal,focusTarget)=>{
    if(!modal)return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    setTimeout(()=>focusTarget?.focus(),60);
  };
  const close=(modal)=>{
    if(!modal)return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    if(!document.querySelector('.modal-backdrop.open'))document.body.classList.remove('modal-open');
  };

  loginBtn?.addEventListener('click',()=>{
    if(loginError)loginError.textContent='';
    open(loginModal,loginUsername);
  });
  registerBtn?.addEventListener('click',()=>{
    if(registerError)registerError.textContent='';
    open(registerModal,username);
  });
  closeLoginModalBtn?.addEventListener('click',()=>close(loginModal));
  closeRegisterModalBtn?.addEventListener('click',()=>close(registerModal));
  [registerModal,loginModal].forEach(modal=>{
    modal?.addEventListener('click',e=>{if(e.target===modal)close(modal)});
  });

  registerForm?.addEventListener('submit',async event=>{
    event.preventDefault();
    if(registerError)registerError.textContent='';
    if(!cloudReady){if(registerError)registerError.textContent='La nube todavía no está configurada.';return}
    const usernameValue=username.value.trim(),passwordValue=password.value,idValue=gameId.value.trim(),countryValue=country.value.trim();
    if(!validUsername(usernameValue)){registerError.textContent='El usuario solo puede tener letras, números, punto, guion o guion bajo.';return}
    if(passwordValue.length<6){registerError.textContent='La contraseña debe tener al menos 6 caracteres.';return}
    if(!idValue||!countryValue){registerError.textContent='Completa todos los datos.';return}
    setRegisterBusy(true);
    try{
      const {data:registerData,error:registerFunctionError}=await supabaseClient.functions.invoke('register-user',{body:{username:usernameValue,password:passwordValue}});
      if(registerFunctionError||!registerData?.ok)throw new Error(registerData?.error||'No se pudo crear la cuenta.');
      const {data:loginData,error:loginAfterRegisterError}=await supabaseClient.auth.signInWithPassword({email:usernameToInternalEmail(usernameValue),password:passwordValue});
      if(loginAfterRegisterError||!loginData?.session||!loginData?.user)throw new Error('La cuenta se creó, pero no se pudo iniciar la sesión automáticamente.');
      const userId=loginData.user.id;
      const {data:newProfile,error:profileError}=await supabaseClient.from('profiles').insert({
        id:userId,username:normalizeUsername(usernameValue),game_id:idValue,account_name:usernameValue.trim(),country:countryValue,screenshot_path:null,avatar_path:null
      }).select('id, username, game_id, account_name, country, screenshot_path, avatar_path, rank_name, elo_points, wins, losses, is_admin, is_moderator, created_at').single();
      if(profileError)throw new Error('No se pudo guardar el perfil: '+profileError.message);
      registerForm.reset();
      close(registerModal);
      await setPlayerUI(newProfile,loginData.user);
      showToast('Cuenta creada. Rango inicial: Latón · ELO 200.');
    }catch(error){
      console.error(error);
      if(registerError)registerError.textContent=error?.message||'No se pudo crear la cuenta.';
    }finally{setRegisterBusy(false)}
  });

  loginForm?.addEventListener('submit',async event=>{
    event.preventDefault();
    if(loginError)loginError.textContent='';
    if(!cloudReady){if(loginError)loginError.textContent='La nube todavía no está configurada.';return}
    const usernameValue=loginUsername.value.trim(),passwordValue=loginPassword.value;
    if(!usernameValue||!passwordValue){loginError.textContent='Escribe tu usuario y contraseña.';return}
    setLoginBusy(true);
    try{
      const {data,error}=await supabaseClient.auth.signInWithPassword({email:usernameToInternalEmail(usernameValue),password:passwordValue});
      if(error||!data.session)throw new Error('Usuario o contraseña incorrectos.');
      const profile=await getProfile(data.user.id);
      loginForm.reset();
      close(loginModal);
      await setPlayerUI(profile,data.user);
      showToast('Sesión iniciada correctamente.');
    }catch(error){
      console.error(error);
      if(loginError)loginError.textContent=error?.message||'No se pudo iniciar sesión.';
    }finally{setLoginBusy(false)}
  });
}
bindAuthModalsEarly();



const RANKS=[
  {min:0,name:'Latón I',image:'rangos/LatonI.png'},
  {min:25,name:'Latón II',image:'rangos/LatonII.png'},
  {min:50,name:'Latón III',image:'rangos/LatonIII.png'},
  {min:100,name:'Latón IV',image:'rangos/LatonIV.png'},
  {min:150,name:'Latón V',image:'rangos/LatonV.png'},
  {min:200,name:'Bronce I',image:'rangos/bronceI.png'},
  {min:275,name:'Bronce II',image:'rangos/BronceII.png'},
  {min:350,name:'Bronce III',image:'rangos/BronceIII.png'},
  {min:450,name:'Bronce IV',image:'rangos/BronceIV.png'},
  {min:550,name:'Bronce V',image:'rangos/BronceV.png'},
  {min:675,name:'Plata I',image:'rangos/PlataI.png'},
  {min:800,name:'Plata II',image:'rangos/PlataII.png'},
  {min:950,name:'Plata III',image:'rangos/PlataIII.png'},
  {min:1125,name:'Plata IV',image:'rangos/PlataIV.png'},
  {min:1300,name:'Plata V',image:'rangos/PlataV.png'},
  {min:1500,name:'Oro I',image:'rangos/OroI.png'},
  {min:1700,name:'Oro II',image:'rangos/OroII.png'},
  {min:1925,name:'Oro III',image:'rangos/OroIII.png'},
  {min:2175,name:'Oro IV',image:'rangos/OroIV.png'},
  {min:2425,name:'Oro V',image:'rangos/OroV.png'},
  {min:2700,name:'Platino I',image:'rangos/PlatinoI.png'},
  {min:3000,name:'Platino II',image:'rangos/PlatinoII.png'},
  {min:3300,name:'Platino III',image:'rangos/PlatinoIII.png'},
  {min:3625,name:'Platino IV',image:'rangos/PlatinoIV.png'},
  {min:3975,name:'Platino V',image:'rangos/PlatinoV.png'},
  {min:4350,name:'Titanio I',image:'rangos/TitanioI.png'},
  {min:4725,name:'Titanio II',image:'rangos/TitanioII.png'},
  {min:5125,name:'Titanio III',image:'rangos/TitanioIII.png'},
  {min:5550,name:'Titanio IV',image:'rangos/TitanioIV.png'},
  {min:6000,name:'Titanio V',image:'rangos/TitanioV.png'},
  {min:6475,name:'Diamante I',image:'rangos/DiamanteI.png'},
  {min:6950,name:'Diamante II',image:'rangos/DiamanteII.png'},
  {min:7450,name:'Diamante III',image:'rangos/DiamanteIII.png'},
  {min:7975,name:'Diamante IV',image:'rangos/DiamanteIV.png'},
  {min:8525,name:'Diamante V',image:'rangos/DiamanteV.png'},
  {min:9100,name:'Diamante Negro I',image:'rangos/DiamantenegroI.png'},
  {min:9700,name:'Diamante Negro II',image:'rangos/DiamantenegroII.png'},
  {min:10325,name:'Diamante Negro III',image:'rangos/DiamantenegroIII.png'},
  {min:10975,name:'Diamante Negro IV',image:'rangos/DiamantenegroIV.png'},
  {min:11625,name:'Diamante Negro V',image:'rangos/DiamantenegroV.png'},
  {min:12300,name:'Élite I',image:'rangos/EliteI.png'},
  {min:13000,name:'Élite II',image:'rangos/EliteII.png'},
  {min:13725,name:'Élite III',image:'rangos/EliteIII.png'},
  {min:14475,name:'Élite IV',image:'rangos/EliteIV.png'},
  {min:15250,name:'Élite V',image:'rangos/EliteV.png'},
  {min:16050,name:'Maestro I',image:'rangos/MaestroI.png'},
  {min:16875,name:'Maestro II',image:'rangos/MaestroII.png'},
  {min:17725,name:'Maestro III',image:'rangos/MaestroIII.png'},
  {min:18600,name:'Maestro IV',image:'rangos/MaestroIV.png'},
  {min:19500,name:'Maestro V',image:'rangos/MaestroV.png'},
  {min:20425,name:'Gran Maestro I',image:'rangos/GranmaestroI.png'},
  {min:21375,name:'Gran Maestro II',image:'rangos/GranmaestroII.png'},
  {min:22350,name:'Gran Maestro III',image:'rangos/GranmaestroIII.png'},
  {min:23350,name:'Gran Maestro IV',image:'rangos/GranmaestroIV.png'},
  {min:24375,name:'Gran Maestro V',image:'rangos/GranmaestroV.png'},
  {min:25425,name:'MÍTICO I',image:'rangos/MiticoI.png'},
  {min:26525,name:'MÍTICO II',image:'rangos/MiticoII.png'},
  {min:27650,name:'MÍTICO III',image:'rangos/MiticoIII.png'},
  {min:28800,name:'MÍTICO IV',image:'rangos/MiticoIV.png'},
  {min:30000,name:'MÍTICO V',image:'rangos/MiticoV.png'}
];


function getRankByElo(value){
  const elo=Number.isFinite(Number(value))?Math.max(0,Number(value)):0;
  let index=0;
  for(let i=0;i<RANKS.length;i++){
    if(elo>=RANKS[i].min)index=i;
    else break;
  }
  return {...RANKS[index],index};
}

function applyRankBadge(el,rank){
  if(!el||!rank)return;
  el.textContent=''; el.setAttribute('aria-label','Insignia '+rank.name); el.title='Rango '+rank.name;
  el.style.backgroundImage='url(\"'+rank.image+'\")'; el.style.backgroundPosition='center';
  el.style.backgroundRepeat='no-repeat'; el.style.backgroundSize='contain';
}
async function renderRankBadge(arg1,arg2){
  if(arg1 instanceof HTMLElement){applyRankBadge(arg1,getRankByElo(arg2));return}
  applyRankBadge(rankBadgeImage,arg1);
}
async function renderPlayerDetailRankBadge(rank){applyRankBadge(playerDetailRankBadge,rank)}

async function abandonRankedMatch(){
 if(!currentRankedMatchId||!supabaseClient)return;
 if(!confirm('¿Abandonar este emparejamiento? Tu rival volverá automáticamente a buscar rival.'))return;
 const id=currentRankedMatchId;
 try{
  const {error}=await supabaseClient.rpc('abandon_ranked_match',{p_match_id:id});if(error)throw error;
  currentRankedMatchId=null;clearInterval(matchmakingTimer);clearInterval(pendingMatchesTimer);matchmakingTimer=null;pendingMatchesTimer=null;
  if(matchmakingModal)matchmakingModal.hidden=true;showToast('Abandonaste el emparejamiento.');
 }catch(e){console.error(e);const msg=String(e?.message||'');if(msg.includes('match locked')){showToast('VS confirmado por el administrador. Ya no puedes abandonar.');if(abandonRankedBtn){abandonRankedBtn.disabled=true;abandonRankedBtn.textContent='VS CONFIRMADO · NO SE PUEDE ABANDONAR'}}else showToast('No se pudo abandonar el emparejamiento.')}
}

function mountPlayerVsSafety(){
 if(!playerVsSafety)return;
 const chat=document.querySelector('.ranked-match-chat,.ranked-chat,.match-chat,[id*="rankedChat"],[id*="matchChat"],[class*="chat-vs"],[class*="vs-chat"]');
 const mount=document.getElementById('vsSafetyMount');
 if(chat&&chat.parentNode){chat.insertAdjacentElement('afterend',playerVsSafety)}
 else if(mount&&playerVsSafety.parentNode!==mount)mount.appendChild(playerVsSafety);
}
async function refreshPlayerVsSafety(){
 mountPlayerVsSafety();
 if(!currentRankedMatchId||!supabaseClient||!playerVsSafety)return;
 try{
  const {data,error}=await supabaseClient.rpc('get_ranked_player_action_status',{p_match_id:currentRankedMatchId});
  if(error)throw error;
  const st=Array.isArray(data)?data[0]:data;
  const ready=Boolean(st&&st.both_messaged);
  const locked=Boolean(st&&st.players_playing);
  playerVsSafety.hidden=!ready;
  playerVsSafety.style.display=ready?'block':'none';
  if(!ready)return;
  mountPlayerVsSafety();
  playerVsSafety.hidden=false;
  playerVsSafety.style.display='block';
  if(playerCancelVsBtn){playerCancelVsBtn.hidden=locked;playerCancelVsBtn.disabled=locked;playerCancelVsBtn.style.display=locked?'none':'inline-flex'}
  if(playerPlayingBtn){playerPlayingBtn.hidden=locked;playerPlayingBtn.disabled=locked;playerPlayingBtn.style.display=locked?'none':'inline-flex'}
  if(playerVsSafetyNotice)playerVsSafetyNotice.hidden=locked;
  if(playerPlayingLocked)playerPlayingLocked.hidden=!locked;
  if(abandonRankedBtn)abandonRankedBtn.hidden=true;
 }catch(e){console.error('Estado seguridad VS:',e)}
}
async function cancelVsByPlayers(){
 if(!currentRankedMatchId||!supabaseClient)return;if(!confirm('¿ANULAR ESTE VS? Solo hazlo si todavía NO han comenzado a jugar.'))return;
 try{const {error}=await supabaseClient.rpc('player_cancel_ranked_match',{p_match_id:currentRankedMatchId});if(error)throw error;showToast('VS anulado.');currentRankedMatchId=null;if(matchmakingModal)matchmakingModal.hidden=true}catch(e){console.error(e);showToast(String(e?.message||'').includes('MATCH_PLAYING_LOCKED')?'Este VS ya está jugando y no puede anularse.':'No se pudo anular el VS.')}
}
async function markVsPlaying(){
 if(!currentRankedMatchId||!supabaseClient)return;if(!confirm('IMPORTANTE: toca ACEPTAR solo si tú y tu rival YA ESTÁN JUGANDO. Después de esto ninguno podrá anular el VS.'))return;
 try{const {error}=await supabaseClient.rpc('mark_ranked_match_playing',{p_match_id:currentRankedMatchId});if(error)throw error;showToast('VS bloqueado: partida en juego.');await refreshPlayerVsSafety()}catch(e){console.error(e);showToast('No se pudo marcar el VS como jugando.')}
}
async function updatePendingMatchesCount(){
 if(!currentUser||!supabaseClient||!pendingMatchesCount)return;
 try{const {data,error}=await supabaseClient.rpc('get_pending_ranked_matches_count');if(error)throw error;const n=Number(data)||0;pendingMatchesCount.textContent=n+' '+(n===1?'PARTIDO PENDIENTE':'PARTIDOS PENDIENTES')}catch(e){console.error(e)}
}

function showRankedMatch(match){
 if(!matchmakingModal)return;
 currentRankedMatchId=match.match_id;
 matchmakingSearching.hidden=true;matchmakingVersus.hidden=false;
 versusMe.textContent=String(currentProfile?.account_name||currentProfile?.username||'TÚ').toUpperCase();
 versusMyElo.textContent='ELO '+String(match.my_elo||200);
 versusOpponent.textContent=String(match.opponent_name||'RIVAL').toUpperCase();
 versusOpponentElo.textContent='ELO '+String(match.opponent_elo||200);
 if(versusMyRank)versusMyRank.textContent=getRankByElo(match.my_elo).name.toUpperCase();
 if(versusOpponentRank)versusOpponentRank.textContent=getRankByElo(match.opponent_elo).name.toUpperCase();
 const renderVsRankBadge=async(el,elo)=>{if(!el)return;applyRankBadge(el,getRankByElo(elo));};
 renderVsRankBadge(versusMyRankBadge,match.my_elo);renderVsRankBadge(versusOpponentRankBadge,match.opponent_elo);
 if(versusMyPosition)versusMyPosition.textContent='RANKING #'+String(match.my_position||'--');
 if(versusOpponentPosition)versusOpponentPosition.textContent='RANKING #'+String(match.opponent_position||'--');
 const setVsAvatar=(el,path,name)=>{if(!el)return;el.replaceChildren();if(path){const {data}=supabaseClient.storage.from('profile-photos').getPublicUrl(path);if(data?.publicUrl){const img=document.createElement('img');img.src=data.publicUrl;img.alt=name;el.appendChild(img);return}}const s=document.createElement('span');s.textContent=String(name||'?').charAt(0).toUpperCase();el.appendChild(s)};
 setVsAvatar(versusMyAvatar,match.my_avatar_path,currentProfile?.account_name||currentProfile?.username||'TÚ');
 setVsAvatar(versusOpponentAvatar,match.opponent_avatar_path,match.opponent_name);
 if(confirmedMatchWarning)confirmedMatchWarning.hidden=true;if(abandonRankedBtn){abandonRankedBtn.hidden=true;abandonRankedBtn.style.display='none';abandonRankedBtn.disabled=true}if(matchmakingClose){matchmakingClose.hidden=!!match.admin_confirmed;matchmakingClose.disabled=!!match.admin_confirmed}
 updatePendingMatchesCount();refreshPlayerVsSafety();
 clearInterval(pendingMatchesTimer);pendingMatchesTimer=setInterval(()=>{
    if(document.hidden||!currentUser)return;
    updatePendingMatchesCount();
    refreshPlayerVsSafety();
    watchCurrentRankedMatch();
  },2000);
}
async function watchCurrentRankedMatch(){
 if(!currentRankedMatchId||!supabaseClient)return;
 try{
  const {data,error}=await supabaseClient.rpc('get_my_active_ranked_match');if(error)throw error;
  if(data&&data.length&&Number(data[0].match_id)===Number(currentRankedMatchId)){const confirmed=!!data[0].admin_confirmed;if(confirmedMatchWarning)confirmedMatchWarning.hidden=true;if(abandonRankedBtn){abandonRankedBtn.hidden=true;abandonRankedBtn.style.display='none';abandonRankedBtn.disabled=true}if(matchmakingClose){matchmakingClose.hidden=confirmed;matchmakingClose.disabled=confirmed}}
  if(!data||!data.length||Number(data[0].match_id)!==Number(currentRankedMatchId)){
   currentRankedMatchId=null;clearInterval(pendingMatchesTimer);pendingMatchesTimer=null;
   if(matchmakingModal)matchmakingModal.hidden=false;if(matchmakingSearching)matchmakingSearching.hidden=false;if(matchmakingVersus)matchmakingVersus.hidden=true;
   showToast('Tu rival abandonó. Buscando un nuevo rival...');
   await startRankedMatchmaking();return;
  }
 }catch(e){console.error(e)}
}

async function pollRankedMatch(){
 if(!currentUser||!supabaseClient)return;
 try{const {data,error}=await supabaseClient.rpc('get_my_active_ranked_match');if(error)throw error;const m=Array.isArray(data)?data[0]:data;if(m){clearInterval(matchmakingTimer);matchmakingTimer=null;showRankedMatch(m)}}catch(e){console.error(e)}
}
async function heartbeatRankedSearch(){
 if(currentRankedMatchId||!currentUser||!supabaseClient)return;
 try{await supabaseClient.rpc('heartbeat_ranked_matchmaking')}catch(e){console.error(e)}
}
async function startRankedMatchmaking(){
 if(!currentUser||!supabaseClient)return;
 matchmakingModal.hidden=false;matchmakingSearching.hidden=false;matchmakingVersus.hidden=true;
 try{
  const {data,error}=await supabaseClient.rpc('join_ranked_matchmaking');if(error)throw error;const m=Array.isArray(data)?data[0]:data;
  if(m?.matched){showRankedMatch(m);return}
  clearInterval(matchmakingTimer);matchmakingTimer=setInterval(()=>{if(!document.hidden)pollRankedMatch()},3000);
  clearInterval(matchmakingHeartbeatTimer);matchmakingHeartbeatTimer=setInterval(()=>{if(!document.hidden)heartbeatRankedSearch()},10000);heartbeatRankedSearch();
 }catch(e){console.error(e);matchmakingModal.hidden=true;showToast('No se pudo iniciar la búsqueda de rival.')}
}
async function closeRankedMatchmaking(){
 if(currentRankedMatchId&&supabaseClient){try{const {data}=await supabaseClient.rpc('get_my_active_ranked_match');const m=Array.isArray(data)?data[0]:data;if(m?.admin_confirmed){showToast('Este VS está confirmado. Debes esperar el resultado.');return}}catch(e){console.error(e)}}
 clearInterval(matchmakingTimer);matchmakingTimer=null;clearInterval(matchmakingHeartbeatTimer);matchmakingHeartbeatTimer=null;clearInterval(pendingMatchesTimer);pendingMatchesTimer=null;
 if(matchmakingModal)matchmakingModal.hidden=true;
 if(!currentRankedMatchId&&currentUser&&supabaseClient)await supabaseClient.rpc('cancel_ranked_matchmaking');
}



async function loadAdminPlayers(){
 if(!adminPlayerList||!supabaseClient)return;adminPlayerList.innerHTML='<div class="admin-empty">Cargando jugadores...</div>';
 try{
  const {data,error}=await supabaseClient.rpc('get_ranking');if(error)throw error;const players=Array.isArray(data)?data:[];
  let moderatorMap=new Map();const {data:mods,error:modsError}=await supabaseClient.rpc('admin_get_moderator_statuses');if(!modsError)moderatorMap=new Map((mods||[]).map(x=>[x.player_id,!!x.is_moderator]));
  adminPlayerList.replaceChildren();
  players.forEach((p,index)=>{const card=document.createElement('article');card.className='admin-player-card';
   const head=document.createElement('div');head.className='admin-player-head';const av=document.createElement('div');av.className='admin-edit-avatar';av.textContent=String(p.account_name||p.username||'?').charAt(0).toUpperCase();if(p.avatar_path){const {data:u}=supabaseClient.storage.from('profile-photos').getPublicUrl(p.avatar_path);if(u?.publicUrl){const im=document.createElement('img');im.src=u.publicUrl;av.replaceChildren(im)}}const title=document.createElement('div');title.innerHTML='<strong></strong><span></span>';title.children[0].textContent=p.account_name||p.username||'Jugador';title.children[1].textContent='Ranking #'+(index+1)+' · '+p.player_id;head.append(av,title);card.append(head);
   const fields=document.createElement('div');fields.className='admin-edit-grid';const defs=[['Nombre','account_name',p.account_name||p.username||''],['ID juego','game_id',p.game_id||''],['País','country',p.country||''],['ELO','elo_points',p.elo_points??200,'number'],['Victorias','wins',p.wins??0,'number'],['Derrotas','losses',p.losses??0,'number'],['Rango','rank_name',p.rank_name||getRankByElo(p.elo_points).name]];
   const inputs={};defs.forEach(([label,key,val,type])=>{const l=document.createElement('label');l.textContent=label;const i=document.createElement('input');i.type=type||'text';i.value=val;l.append(i);fields.append(l);inputs[key]=i});
   const passwordLabel=document.createElement('label');passwordLabel.textContent='Nueva clave';const passwordInput=document.createElement('input');passwordInput.type='password';passwordInput.autocomplete='new-password';passwordInput.placeholder='Dejar vacío = no cambiar';passwordInput.minLength=6;passwordLabel.append(passwordInput);fields.append(passwordLabel);inputs.password=passwordInput;
   if(p.player_id!==currentUser?.id){
    const modLabel=document.createElement('label');modLabel.textContent='MOD';
    const modSelect=document.createElement('select');modSelect.innerHTML='<option value="false">NO</option><option value="true">SÍ</option>';modSelect.value=moderatorMap.get(p.player_id)?'true':'false';modLabel.append(modSelect);fields.append(modLabel);inputs.is_moderator=modSelect;
   }
   card.append(fields);
   const save=document.createElement('button');save.className='admin-save-player';save.textContent='GUARDAR CAMBIOS';save.onclick=async()=>{
    save.disabled=true;
    try{
      const args={
        user_id:p.player_id,
        username:String(p.username||'').trim(),
        password:inputs.password.value.trim(),
        account_name:inputs.account_name.value,
        game_id:inputs.game_id.value,
        country:inputs.country.value,
        elo_points:Number(inputs.elo_points.value)||0,
        wins:Number(inputs.wins.value)||0,
        losses:Number(inputs.losses.value)||0,
        rank_name:inputs.rank_name.value
      };
      const {data,error:e}=await supabaseClient.functions.invoke('admin-update-user',{body:args});
      if(e||!data?.ok)throw new Error(data?.error||e?.message||'No se pudieron guardar los cambios.');
      if(inputs.is_moderator){const {error:modError}=await supabaseClient.rpc('ikar_set_moderator',{p_player_id:p.player_id,p_enabled:inputs.is_moderator.value==='true'});if(modError)throw modError;}
      inputs.password.value='';
      showToast(args.password?'Perfil y nueva clave guardados.':'Perfil actualizado.');
      await loadAdminPlayers();
    }catch(e){console.error(e);showToast(e?.message||'No se pudieron guardar los cambios.')}
    finally{save.disabled=false}
   };card.append(save);adminPlayerList.append(card)})
 }catch(e){console.error(e);adminPlayerList.innerHTML='<div class="admin-empty">No se pudieron cargar los jugadores.</div>'}
}
function showAdminVs(){if(adminMatchList)adminMatchList.hidden=false;if(adminPlayerList)adminPlayerList.hidden=true;if(adminResultsList)adminResultsList.hidden=true;loadAdminMatches()}
function showAdminPlayers(){if(adminMatchList)adminMatchList.hidden=true;if(adminPlayerList)adminPlayerList.hidden=false;if(adminResultsList)adminResultsList.hidden=true;loadAdminPlayers()}

async function loadAdminResults(){
 if(!adminResultsList||!supabaseClient)return;
 adminResultsList.innerHTML='<div class="admin-empty">Cargando últimos resultados...</div>';
 try{
  const {data,error}=await supabaseClient.rpc('admin_get_last_finished_matches');if(error)throw error;
  const rows=Array.isArray(data)?data:[];adminResultsList.replaceChildren();
  if(!rows.length){adminResultsList.innerHTML='<div class="admin-empty">No hay resultados terminados.</div>';return}
  for(const m of rows){
   const row=document.createElement('article');row.className='admin-match finished';
   const title=document.createElement('div');title.className='admin-match-vs';
   const currentWinner=m.winner_id===m.player1_id?m.player1_name:m.player2_name;
   title.textContent=m.player1_name+' VS '+m.player2_name;
   const meta=document.createElement('small');meta.textContent='#'+m.match_id+' · GANADOR ACTUAL: '+currentWinner+' · '+formatCommentDate(m.finished_at);
   const actions=document.createElement('div');actions.className='admin-match-actions';
   const label=document.createElement('strong');label.className='admin-result-title';label.textContent='CORREGIR GANADOR';actions.append(label);
   for(const [id,name] of [[m.player1_id,m.player1_name],[m.player2_id,m.player2_name]]){
    const b=document.createElement('button');b.className='admin-winner-btn';b.textContent='GANA '+name;b.disabled=m.winner_id===id;
    b.onclick=async()=>{if(!confirm('¿Corregir este resultado y poner a '+name+' como ganador? Se revertirá el ELO y estadísticas del resultado anterior y se aplicará el correcto.'))return;b.disabled=true;const {error:e}=await supabaseClient.rpc('admin_correct_ranked_match',{p_match_id:m.match_id,p_winner_id:id});if(e){console.error(e);showToast('No se pudo corregir el resultado.');b.disabled=false;return}showToast('Resultado corregido.');await loadAdminResults();await loadRanking();};
    actions.append(b);
   }
   row.append(title,meta,actions);adminResultsList.append(row);
  }
 }catch(e){console.error(e);adminResultsList.innerHTML='<div class="admin-empty">No se pudieron cargar los últimos resultados.</div>'}
}
function showAdminResults(){if(adminMatchList)adminMatchList.hidden=true;if(adminPlayerList)adminPlayerList.hidden=true;if(adminResultsList)adminResultsList.hidden=false;loadAdminResults()}
async function setupModeratorMode(){
 if(!currentUser||!moderatorAdminBtn)return;
 const username=String(currentProfile?.username||'').trim().toLowerCase();
 const isIkar=username==='ikar8bp';
 moderatorAdminBtn.hidden=!isIkar;
 moderatorAdminBtn.classList.toggle('ikar-moderar-visible',isIkar);
 if(isIkar)moderatorAdminBtn.style.setProperty('display','flex','important');
 else moderatorAdminBtn.style.setProperty('display','none','important');
}

async function loadModeratorMatches(){
 if(!moderatorMatchList||!supabaseClient)return;
 moderatorMatchList.innerHTML='<div class="admin-empty">Cargando...</div>';
 try{
  const {data,error}=await supabaseClient.rpc('moderator_get_ranked_matches');if(error)throw error;
  const rows=(Array.isArray(data)?data:[]).filter(m=>m.status==='matched');moderatorMatchList.replaceChildren();
  if(!rows.length){moderatorMatchList.innerHTML='<div class="admin-empty">No hay VS pendientes.</div>';return}
  for(const m of rows){
   const row=document.createElement('article');row.className='admin-match matched';
   const head=document.createElement('div');head.className='moderator-vs-title';const p1=document.createElement('strong');p1.textContent=m.player1_name;const vs=document.createElement('b');vs.textContent=' VS ';const p2=document.createElement('strong');p2.textContent=m.player2_name;const num=document.createElement('small');num.textContent='#'+m.match_id;head.append(p1,vs,p2,num);row.append(head);
   const evidence=document.createElement('div');evidence.className='moderator-evidence';
   for(const [label,path] of [['VIDEO '+m.player1_name,m.player1_video_path],['VIDEO '+m.player2_name,m.player2_video_path]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=!path;b.onclick=async()=>{if(!path)return;const {data:u,error:e}=await supabaseClient.storage.from('ranked-match-videos').createSignedUrl(path,600);if(e||!u?.signedUrl){showToast('No se pudo abrir el video.');return}window.open(u.signedUrl,'_blank')};evidence.append(b)}
   const chatBtn=document.createElement('button');chatBtn.type='button';chatBtn.textContent='VER CHAT';const chat=document.createElement('div');chat.className='moderator-chat';chat.hidden=true;chatBtn.onclick=async()=>{chat.hidden=!chat.hidden;if(chat.hidden)return;chat.textContent='Cargando chat...';const {data,error}=await supabaseClient.rpc('moderator_get_ranked_chat',{p_match_id:m.match_id});if(error){chat.textContent='No se pudo cargar el chat.';return}chat.replaceChildren();for(const x of data||[]){const line=document.createElement('p');const who=document.createElement('b');who.textContent=(x.sender_name||'Jugador')+': ';line.append(who,document.createTextNode(x.message||''));chat.append(line)}if(!data?.length)chat.textContent='Sin mensajes.'};evidence.append(chatBtn);row.append(evidence,chat);
   const actions=document.createElement('div');actions.className='admin-match-actions';const title=document.createElement('strong');title.className='admin-result-title';title.textContent='DEFINIR GANADOR';actions.append(title);
   for(const [id,name] of [[m.player1_id,m.player1_name],[m.player2_id,m.player2_name]]){const b=document.createElement('button');b.className='admin-winner-btn';b.textContent='GANA '+name;b.onclick=async()=>{if(!confirm('¿Confirmar a '+name+' como ganador?'))return;const {error}=await supabaseClient.rpc('moderator_resolve_ranked_match',{p_match_id:m.match_id,p_winner_id:id});if(error){showToast('No se pudo guardar el resultado.');return}showToast('Resultado aplicado.');await loadModeratorMatches()};actions.append(b)}
   row.append(actions);moderatorMatchList.append(row);
  }
 }catch(e){console.error(e);moderatorMatchList.innerHTML='<div class="admin-empty">No se pudo cargar la moderación.</div>'}
}

async function setupAdminMode(){
 if(!currentUser||!supabaseClient||!adminModeBtn)return;
 try{const {data,error}=await supabaseClient.from('profiles').select('is_admin').eq('id',currentUser.id).single();if(error)throw error;adminModeBtn.hidden=!data?.is_admin}catch(e){adminModeBtn.hidden=true}
}
async function loadAdminMatches(){
 if(!adminMatchList||!supabaseClient)return;
 adminMatchList.innerHTML='<div class="admin-empty">Cargando...</div>';
 try{
  const {data,error}=await supabaseClient.rpc('admin_get_ranked_matches');if(error)throw error;
  const rows=(Array.isArray(data)?data:[]).filter(m=>m.status==='matched');adminMatchList.replaceChildren();
  if(!rows.length){adminMatchList.innerHTML='<div class="admin-empty">No hay partidos en espera.</div>';return}
  for(const m of rows){
   const row=document.createElement('article');row.className='admin-match '+m.status;
   const title=document.createElement('div');title.className='admin-match-vs admin-match-vs-rich';
   const makePlayer=(side)=>{const name=m[side+'_name'],elo=Number(m[side+'_elo']||200),gameId=m[side+'_game_id']||'--',pos=m[side+'_position']||'--',rank=getRankByElo(elo),avatar=m[side+'_avatar_path'];const card=document.createElement('div');card.className='admin-vs-player';const av=document.createElement('div');av.className='admin-vs-avatar';if(avatar){const {data:u}=supabaseClient.storage.from('profile-photos').getPublicUrl(avatar);if(u?.publicUrl)av.style.backgroundImage='url("'+u.publicUrl+'")'}if(!avatar)av.textContent=String(name||'?').charAt(0).toUpperCase();const info=document.createElement('div');info.className='admin-vs-info';const nm=document.createElement('strong');nm.textContent=name;const id=document.createElement('span');id.textContent='ID '+gameId;const rp=document.createElement('span');rp.textContent='RANKING #'+pos;const el=document.createElement('span');el.textContent=elo+' ELO';const badge=document.createElement('div');badge.className='admin-vs-rank-badge';renderRankBadge(badge,elo);const rn=document.createElement('b');rn.textContent=rank.name;info.append(nm,id,rp,el,rn);card.append(av,badge,info);return card};title.append(makePlayer('player1'));const vs=document.createElement('b');vs.className='admin-vs-word';vs.textContent='VS';title.append(vs,makePlayer('player2'));
   const meta=document.createElement('small');meta.textContent='#'+m.match_id+' · '+String(m.status).toUpperCase()+' · '+formatCommentDate(m.created_at);
   row.append(title,meta);
   if(m.status==='matched'){
    const actions=document.createElement('div');actions.className='admin-match-actions';
    if(!m.admin_confirmed){
     const confirmBtn=document.createElement('button');confirmBtn.className='confirm-vs';confirmBtn.textContent='CONFIRMAR VS';
     confirmBtn.onclick=async()=>{if(!confirm('¿Confirmar este VS? Después de confirmarlo los jugadores ya no podrán abandonar.'))return;const {error}=await supabaseClient.rpc('admin_confirm_ranked_match',{p_match_id:m.match_id});if(error){showToast('No se pudo confirmar el VS.');return}await loadAdminMatches();showToast('VS confirmado. Ahora selecciona quién ganó.')};
     actions.appendChild(confirmBtn);
    }else{
     const winnerTitle=document.createElement('strong');winnerTitle.className='admin-result-title';winnerTitle.textContent='DEFINIR GANADOR';
     actions.appendChild(winnerTitle);
     for(const [id,name] of [[m.player1_id,m.player1_name],[m.player2_id,m.player2_name]]){
      const winBtn=document.createElement('button');winBtn.className='admin-winner-btn';winBtn.textContent='GANA '+name;
      winBtn.onclick=async()=>{if(!confirm('¿Confirmar a '+name+' como ganador? Se aplicará +15 ELO al ganador y -15 ELO al perdedor.'))return;const {error}=await supabaseClient.rpc('admin_resolve_ranked_match',{p_match_id:m.match_id,p_winner_id:id});if(error){showToast('No se pudo guardar el resultado.');return}await loadAdminMatches();showToast('Resultado aplicado.')};
      actions.appendChild(winBtn);
     }
    }
    const cancel=document.createElement('button');cancel.className='cancel';cancel.textContent='ANULAR VS';
    cancel.onclick=async()=>{if(!confirm('¿Anular este VS sin cambiar ELO?'))return;const {error}=await supabaseClient.rpc('admin_cancel_ranked_match',{p_match_id:m.match_id});if(error){showToast('No se pudo anular.');return}await loadAdminMatches();showToast('VS anulado.')};
    actions.appendChild(cancel);row.appendChild(actions);
   }
   adminMatchList.appendChild(row);
  }
 }catch(e){console.error(e);adminMatchList.innerHTML='<div class="admin-empty">No se pudo cargar el modo administrador.</div>'}
}

function normalizeUsername(value){return value.trim().toLowerCase()}
function usernameToInternalEmail(value){return normalizeUsername(value)+'@login.rankingikar8bp.com'}
function validUsername(value){return /^[a-zA-Z0-9._-]{3,30}$/.test(value)}

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



async function renderGuestRankShowcase(){
 if(!guestRankShowcase||guestRankShowcase.dataset.ready)return;
 guestRankShowcase.dataset.ready='1';
 RANKS.forEach(rank=>{const badge=document.createElement('span');badge.className='guest-showcase-badge';applyRankBadge(badge,rank);guestRankShowcase.appendChild(badge)});
}

async function loadGuestRanking(){
 if(!guestRankingList||!supabaseClient)return;
 guestRankingList.innerHTML='<div class="ranking-loading">Cargando clasificación...</div>';
 try{
  const {data,error}=await supabaseClient.rpc('get_public_ranking');if(error)throw error;
  const players=(Array.isArray(data)?data:[]).slice(0,100);guestRankingList.replaceChildren();
  if(guestRankingCount){const {count}=await supabaseClient.from('profiles').select('id',{count:'exact',head:true}).eq('is_admin',false);guestRankingCount.textContent='JUGADORES REGISTRADOS: '+(Number.isFinite(count)?count:players.length);}
  players.forEach((player,index)=>{
   const row=document.createElement('div');row.className='guest-ranking-row';
   const pos=document.createElement('strong');pos.className='guest-ranking-pos';pos.textContent=String(index+1);
   const name=document.createElement('div');name.className='guest-ranking-player';
   const avatar=document.createElement('span');avatar.className='guest-ranking-avatar';avatar.textContent=String(player.username||player.account_name||'J').charAt(0).toUpperCase();
   if(player.avatar_path){
    const {data:avatarData}=supabaseClient.storage.from('profile-photos').getPublicUrl(player.avatar_path);
    if(avatarData?.publicUrl){const img=document.createElement('img');img.src=avatarData.publicUrl;img.alt='Foto de '+String(player.username||player.account_name||'Jugador');img.loading='lazy';img.onerror=()=>img.remove();avatar.appendChild(img)}
   }
   const info=document.createElement('div');info.className='guest-ranking-player-info';
   const n=document.createElement('b');n.textContent=String(player.username||player.account_name||'Jugador').toUpperCase();
   const rank=getRankByElo(player.elo_points);const rankLine=document.createElement('span');rankLine.className='guest-ranking-rank';rankLine.textContent=rank.name.toUpperCase();
   const miniBadge=document.createElement('span');miniBadge.className='guest-ranking-rank-badge';applyRankBadge(miniBadge,rank);
   info.append(n,rankLine);name.append(avatar,miniBadge,info);
   const country=document.createElement('div');country.className='guest-ranking-country';country.textContent=getFlag(player.country)+' '+String(player.country||'País');
   const elo=document.createElement('strong');elo.className='guest-ranking-elo';elo.textContent=String(Number.isFinite(Number(player.elo_points))?Number(player.elo_points):0);
   row.append(pos,name,country,elo);guestRankingList.appendChild(row);
  });
 }catch(e){console.error('Ranking público:',e);guestRankingList.innerHTML='<div class="ranking-loading ranking-error">No se pudo cargar la clasificación.</div>'}
}

function setGuestUI(){
  currentUser=null;currentProfile=null;guestTopbar.hidden=false;guestEmpty.hidden=false;playerDashboard.hidden=true;settingsMenu.hidden=true;clearAvatar();
  renderGuestRankShowcase().catch(()=>{});
  loadGuestRanking().catch(()=>{});
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
  const elo=Number.isFinite(Number(profile?.elo_points))?Number(profile.elo_points):200;
  const rank=getRankByElo(elo);
  const rankName=rank.name;
  const wins=Number.isFinite(Number(profile?.wins))?Number(profile.wins):0;
  const losses=Number.isFinite(Number(profile?.losses))?Number(profile.losses):0;
  const games=wins+losses;
  const rate=games>0?Math.round((wins/games)*100):0;

  dashboardPlayerName.textContent=String(playerName).toUpperCase();
  countryName.textContent=profile?.country||'País';
  countryFlag.textContent=getFlag(profile?.country);
  const isAdminDashboard=profile?.is_admin===true||String(profile?.username||'').toLowerCase()==='ikar8bp';
  const rankHero=document.querySelector('#playerDashboard .rank-hero-card');
  const winLossGrid=document.querySelector('#playerDashboard .win-loss-grid');
  if(isAdminDashboard){
    if(rankHero){rankHero.hidden=true;rankHero.classList.remove('admin-only-card');rankHero.classList.add('ikar-hide-rank-card');rankHero.style.setProperty('display','none','important');rankHero.replaceChildren();}
    if(winLossGrid)winLossGrid.hidden=true;
  }else{
    if(rankHero){rankHero.hidden=false;rankHero.classList.remove('admin-only-card','ikar-hide-rank-card');rankHero.style.removeProperty('display');}
    if(winLossGrid)winLossGrid.hidden=false;
    dashboardElo.textContent=elo;
    dashboardWins.textContent=wins;
    dashboardLosses.textContent=losses;
  }
  gamesPlayed.textContent=isAdminDashboard?'—':games;
  winRate.textContent=isAdminDashboard?'—':rate+'%';
  currentStreak.textContent=isAdminDashboard?'—':'0';
  bestElo.textContent=isAdminDashboard?'—':elo;
  dashboardMessage.textContent='';

  const rankingTask=loadRanking();
  const rankTask=isAdminDashboard?Promise.resolve():renderRankBadge(rank);
  const avatarTask=profile?.avatar_path?loadAvatar(profile.avatar_path):Promise.resolve(clearAvatar());
  const followTask=loadDashboardFollowStats(profile?.id||user?.id);
  await Promise.allSettled([rankingTask,rankTask,avatarTask,followTask]);
  await setupModeratorMode();
}


async function loadDashboardFollowStats(profileId){
 if(!profileId||!supabaseClient)return;
 try{
  const {data,error}=await supabaseClient.rpc('get_follow_stats',{p_profile_id:profileId});if(error)throw error;
  const s=Array.isArray(data)?data[0]:data;
  if(dashboardFollowersCount)dashboardFollowersCount.textContent=String(s?.followers||0);
  if(dashboardFollowingCount)dashboardFollowingCount.textContent=String(s?.following||0);
 }catch(e){console.error('Error cargando seguidores del perfil:',e)}
}

function createRankingAvatar(player){
  const wrap=document.createElement('div');
  wrap.className='ranking-avatar';
  const fallback=document.createElement('span');
  const displayName=player?.username||player?.account_name||'J';
  fallback.textContent=String(displayName).trim().charAt(0).toUpperCase()||'J';
  wrap.appendChild(fallback);

  if(player?.avatar_path&&supabaseClient){
    supabaseClient.storage.from('profile-photos').createSignedUrl(player.avatar_path,3600)
      .then(({data,error})=>{
        if(error||!data?.signedUrl)return;
        const img=document.createElement('img');
        img.src=data.signedUrl;
        img.alt='';
        img.onload=()=>{wrap.replaceChildren(img)};
      })
      .catch(()=>{});
  }
  return wrap;
}



function updateHeartUI(count,hearted,isOwn=false){
  const total=Math.max(0,Number(count)||0);
  if(playerHeartCount)playerHeartCount.textContent=String(total);
  if(playerHeartCountLabel)playerHeartCountLabel.textContent=total===1?'jugador le dio un corazón':'jugadores le dieron un corazón';
  if(!playerHeartBtn)return;
  playerHeartBtn.classList.toggle('hearted',Boolean(hearted));
  playerHeartBtn.setAttribute('aria-pressed',hearted?'true':'false');
  playerHeartBtn.disabled=Boolean(isOwn)||currentDetailHeartBusy;
  const label=playerHeartBtn.querySelector('.player-heart-label');
  if(label)label.textContent=isOwn?'Tu perfil':hearted?'Quitar corazón':'Dar corazón';
}

async function loadPlayerHeartState(player){
  if(!playerHeartBtn||!player?.player_id||!currentUser||!supabaseClient)return;
  const isOwn=player.player_id===currentUser.id;
  let hearted=false;

  if(!isOwn){
    const {data,error}=await supabaseClient
      .from('profile_hearts')
      .select('target_id')
      .eq('liker_id',currentUser.id)
      .eq('target_id',player.player_id)
      .maybeSingle();
    if(error)console.error('Error consultando corazón:',error);
    else hearted=Boolean(data);
  }

  currentDetailHearted=hearted;
  updateHeartUI(player.heart_count||0,hearted,isOwn);
}

async function togglePlayerHeart(){
  const player=currentDetailPlayer;
  if(!player?.player_id||!currentUser||!supabaseClient||currentDetailHeartBusy)return;
  if(player.player_id===currentUser.id)return;

  currentDetailHeartBusy=true;
  updateHeartUI(player.heart_count||0,currentDetailHearted,false);

  try{
    if(currentDetailHearted){
      const {error}=await supabaseClient
        .from('profile_hearts')
        .delete()
        .eq('liker_id',currentUser.id)
        .eq('target_id',player.player_id);
      if(error)throw error;
      currentDetailHearted=false;
      player.heart_count=Math.max(0,(Number(player.heart_count)||0)-1);
    }else{
      const {error}=await supabaseClient
        .from('profile_hearts')
        .insert({liker_id:currentUser.id,target_id:player.player_id});
      if(error)throw error;
      currentDetailHearted=true;
      player.heart_count=(Number(player.heart_count)||0)+1;
    }
  }catch(error){
    console.error('Error actualizando corazón:',error);
    showToast('No se pudo actualizar el corazón.');
  }finally{
    currentDetailHeartBusy=false;
    updateHeartUI(player.heart_count||0,currentDetailHearted,false);
  }
}



function renderGlobalActivity(items){
 if(!activityList)return; activityList.replaceChildren();
 if(!items.length){activityList.innerHTML='<div class="notification-empty">Todavía no hay actividad.</div>';return}
 items.forEach(n=>{
  const item=document.createElement('article'); item.className='notification-item global-activity-item';
  const icon=document.createElement('span'); icon.className='notification-type-icon';
  const box=document.createElement('div'); box.className='notification-copy'; const p=document.createElement('p');
  if(n.type==='registration'){icon.textContent='🌎';p.textContent=String(n.actor_name||'Un jugador')+' se ha registrado en Ranking8BP.'}
  else if(n.type==='comment'){icon.textContent='💬';p.textContent=String(n.actor_name||'Alguien')+' comentó en el perfil de '+String(n.recipient_name||'un jugador')+'.'}
  else if(n.type==='comment_heart'){icon.textContent='♥';p.textContent=String(n.actor_name||'Alguien')+' dio corazón al comentario de '+String(n.recipient_name||'un jugador')+'.'}
  else{icon.textContent='♥';p.textContent=String(n.actor_name||'Alguien')+' dio corazón al perfil de '+String(n.recipient_name||'un jugador')+'.'}
  const t=document.createElement('time');t.textContent=formatCommentDate(n.created_at);box.append(p,t);item.append(icon,box);activityList.appendChild(item);
 });
}
async function loadGlobalActivity(){if(!currentUser||!supabaseClient||!activityList)return;try{const {data,error}=await supabaseClient.rpc('get_global_activity');if(error)throw error;renderGlobalActivity(Array.isArray(data)?data:[])}catch(e){console.error(e);activityList.innerHTML='<div class="notification-empty">No se pudo cargar la actividad.</div>'}}
async function toggleGlobalActivity(){if(!activityPanel)return;const opening=activityPanel.hidden;activityPanel.hidden=!opening;if(notificationPanel)notificationPanel.hidden=true;if(settingsMenu)settingsMenu.hidden=true;if(opening)await loadGlobalActivity()}
function updateNotificationBadge(count){
  if(!notificationBadge)return;
  const n=Number(count)||0;
  notificationBadge.textContent=n>99?'99+':String(n);
  notificationBadge.hidden=n<1;
}
function renderNotifications(items){
  if(!notificationList)return;
  notificationList.replaceChildren();
  if(!items.length){
    const e=document.createElement('div');e.className='notification-empty';e.textContent='No tienes notificaciones.';notificationList.appendChild(e);return;
  }
  items.forEach(n=>{
    const item=document.createElement('article');item.className='notification-item'+(n.is_read?'':' unread');
    const icon=document.createElement('span');icon.className='notification-type-icon';icon.textContent=(n.type==='comment'||n.type==='thread_comment')?'💬':'♥';
    const box=document.createElement('div');box.className='notification-copy';
    const p=document.createElement('p');
    if(n.type==='comment'||n.type==='thread_comment'){
      p.append(document.createTextNode(String(n.actor_name||'Alguien')+(n.type==='thread_comment'?' también comentó en un perfil donde participaste: ':' comentó en tu perfil: ')));
      const q=document.createElement('b');q.textContent='“'+String(n.comment_body||'')+'”';p.appendChild(q);
    }else{
      p.textContent=String(n.actor_name||'Alguien')+(n.type==='comment_heart'?' dio corazón a tu comentario.':' dio corazón a tu perfil.');
    }
    const t=document.createElement('time');t.textContent=formatCommentDate(n.created_at);
    box.append(p,t);item.append(icon,box);
    item.tabIndex=0;item.setAttribute('role','button');item.setAttribute('aria-label','Abrir lugar de esta notificación');
    const go=()=>openNotificationTarget(n);
    item.addEventListener('click',go);
    item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
    notificationList.appendChild(item);
  });
}
async function openNotificationTarget(n){
  if(!n?.target_profile_id||!supabaseClient)return;
  try{
    const {data,error}=await supabaseClient.rpc('get_ranking');
    if(error)throw error;
    const player=(Array.isArray(data)?data:[]).find(x=>x.player_id===n.target_profile_id);
    if(!player){showToast('No se encontró ese perfil.');return}
    if(notificationPanel)notificationPanel.hidden=true;
    if(!n.is_read){
      await supabaseClient.from('notifications').update({is_read:true}).eq('id',n.notification_id).eq('recipient_id',currentUser.id);
      n.is_read=true;loadNotifications().catch(()=>{});
    }
    await openRankingPlayer(player);
    setTimeout(()=>{
      const target=n.comment_id&&profileCommentsList?.querySelector('[data-comment-id="'+n.comment_id+'"]');
      const el=target||document.getElementById('profileComments')||playerDetailModal;
      el?.scrollIntoView({behavior:'smooth',block:'center'});
      if(target){
        target.classList.remove('notification-target-focus');
        void target.offsetWidth;
        target.classList.add('notification-target-focus');
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        setTimeout(()=>target.classList.remove('notification-target-focus'),5000);
      }
    },500);
  }catch(error){console.error(error);showToast('No se pudo abrir la notificación.')}
}

async function loadNotifications(){
  if(!currentUser||!supabaseClient)return;
  try{
    const {data,error}=await supabaseClient.rpc('get_my_notifications');
    if(error)throw error;
    const items=Array.isArray(data)?data:[];
    renderNotifications(items);
    updateNotificationBadge(items.filter(x=>!x.is_read).length);
  }catch(error){console.error('Error cargando notificaciones:',error)}
}
async function markAllNotificationsRead(){
  if(!currentUser||!supabaseClient)return;
  const {error}=await supabaseClient.from('notifications').update({is_read:true}).eq('recipient_id',currentUser.id).eq('is_read',false);
  if(error){console.error(error);showToast('No se pudieron marcar como leídas.');return}
  await loadNotifications();
}
async function toggleNotifications(){
  if(!notificationPanel)return;
  const opening=notificationPanel.hidden;
  notificationPanel.hidden=!opening;
  if(settingsMenu)settingsMenu.hidden=true;
  if(opening)await loadNotifications();
}
function formatCommentDate(value){
  try{return new Intl.DateTimeFormat('es',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value))}
  catch{return ''}
}

function renderProfileComments(comments){
  if(!profileCommentsList)return;
  profileCommentsList.replaceChildren();
  profileCommentCount.textContent=String(comments.length);
  if(!comments.length){
    const empty=document.createElement('div');
    empty.className='profile-comments-empty';
    empty.textContent='Todavía no hay comentarios. Sé el primero en comentar.';
    profileCommentsList.appendChild(empty);
    return;
  }
  comments.forEach(comment=>{
    const item=document.createElement('article');
    item.className='profile-comment-item';item.dataset.commentId=String(comment.comment_id||'');
    const head=document.createElement('div');head.className='profile-comment-head';
    const author=document.createElement('strong');author.textContent=String(comment.author_name||'Jugador').toUpperCase();author.className='profile-comment-author';author.tabIndex=0;author.setAttribute('role','button');author.setAttribute('aria-label','Abrir perfil de '+String(comment.author_name||'Jugador'));
    const openAuthorProfile=async()=>{if(!comment.author_id||!supabaseClient)return;try{let {data,error}=await supabaseClient.rpc('get_profile_by_id',{p_player_id:comment.author_id});if(error)throw error;const player=Array.isArray(data)?data[0]:data;if(!player){showToast('No se encontró ese perfil.');return}await openRankingPlayer(player)}catch(e){console.error(e);showToast('No se pudo abrir el perfil.')}};
    author.addEventListener('click',openAuthorProfile);author.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openAuthorProfile()}});
    const date=document.createElement('time');date.textContent=formatCommentDate(comment.created_at);
    head.append(author,date);
    const body=document.createElement('p');body.textContent=comment.body;
    const actions=document.createElement('div');actions.className='profile-comment-actions';
    const heart=document.createElement('button');heart.type='button';heart.className='comment-heart-btn'+(comment.viewer_liked?' liked':'');
    heart.innerHTML='<span>♥</span> <b>'+Number(comment.heart_count||0)+'</b>';
    heart.setAttribute('aria-label',comment.viewer_liked?'Quitar corazón':'Dar corazón');
    heart.addEventListener('click',()=>toggleCommentHeart(comment,heart));
    actions.appendChild(heart);
    item.append(head,body,actions);
    profileCommentsList.appendChild(item);
  });
}

async function loadProfileComments(){
  if(!currentDetailPlayer?.player_id||!supabaseClient||!profileCommentsList)return;
  const targetId=currentDetailPlayer.player_id;
  profileCommentsList.innerHTML='<div class="profile-comments-empty">Cargando comentarios...</div>';
  try{
    const {data,error}=await supabaseClient.rpc('get_profile_comments',{p_profile_id:targetId});
    if(error)throw error;
    if(currentDetailPlayer?.player_id!==targetId)return;
    renderProfileComments(Array.isArray(data)?data:[]);
  }catch(error){
    console.error('Error cargando comentarios:',error);
    profileCommentsList.innerHTML='<div class="profile-comments-empty">No se pudieron cargar los comentarios.</div>';
  }
}

async function toggleCommentHeart(comment,button){
  if(!currentUser||!supabaseClient||!comment?.comment_id||button.disabled)return;
  button.disabled=true;
  try{
    if(comment.viewer_liked){
      const {error}=await supabaseClient.from('profile_comment_hearts').delete().eq('comment_id',comment.comment_id).eq('user_id',currentUser.id);
      if(error)throw error;
      comment.viewer_liked=false;comment.heart_count=Math.max(0,Number(comment.heart_count||0)-1);
    }else{
      const {error}=await supabaseClient.from('profile_comment_hearts').insert({comment_id:comment.comment_id,user_id:currentUser.id});
      if(error)throw error;
      comment.viewer_liked=true;comment.heart_count=Number(comment.heart_count||0)+1;
    }
    button.classList.toggle('liked',comment.viewer_liked);
    button.querySelector('b').textContent=String(comment.heart_count);
    button.setAttribute('aria-label',comment.viewer_liked?'Quitar corazón':'Dar corazón');
  }catch(error){console.error(error);showToast('No se pudo actualizar el corazón.')}
  finally{button.disabled=false}
}

async function submitProfileComment(event){
  event.preventDefault();
  if(!currentUser||!currentDetailPlayer?.player_id||!supabaseClient)return;
  const body=profileCommentInput.value.trim();
  if(!body)return;
  profileCommentSubmit.disabled=true;
  try{
    const {error}=await supabaseClient.from('profile_comments').insert({
      profile_id:currentDetailPlayer.player_id,
      author_id:currentUser.id,
      body
    });
    if(error)throw error;
    profileCommentInput.value='';
    showToast('Comentario publicado.');
    await loadProfileComments();
  }catch(error){console.error(error);showToast('No se pudo publicar el comentario.')}
  finally{profileCommentSubmit.disabled=false}
}

function closeRankingPlayer(){
  if(!playerDetailModal)return;
  currentDetailPlayer=null;
  playerDetailModal.classList.remove('open');
  playerDetailModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('player-detail-open');
}

async function loadFollowStats(player){
 if(!supabaseClient||!player?.player_id)return;
 try{
  const {data,error}=await supabaseClient.rpc('get_follow_stats',{p_profile_id:player.player_id});if(error)throw error;
  const s=Array.isArray(data)?data[0]:data;
  if(playerFollowersCount)playerFollowersCount.textContent=String(s?.followers||0);
  if(playerFollowingCount)playerFollowingCount.textContent=String(s?.following||0);
  if(playerFollowBtn){const own=player.player_id===currentUser?.id;playerFollowBtn.hidden=own;playerFollowBtn.dataset.following=s?.viewer_follows?'1':'0';playerFollowBtn.dataset.friend=s?.is_friend?'1':'0';playerFollowBtn.textContent=s?.is_friend?'AMIGOS':(s?.viewer_follows?'SIGUIENDO':'SEGUIR');playerFollowBtn.classList.toggle('following',!!s?.viewer_follows);playerFollowBtn.classList.toggle('friends',!!s?.is_friend)}
 }catch(e){console.error('Error seguidores:',e)}
}
function openPrivateMessage(event){
 if(event){event.preventDefault();event.stopPropagation()}
 const player=currentDetailPlayer;
 if(!player||player.player_id===currentUser?.id)return;
 if(!privateMessageModal||!privateMessageInput||!privateMessageSend){showToast('No se pudo abrir el mensaje.');return}
 privateMessageTo.textContent='Para: '+String(player.username||player.account_name||'Jugador');
 privateMessageInput.value='';
 privateMessageModal.hidden=false;
 privateMessageModal.style.display='grid';
 privateMessageInput.disabled=false;
 privateMessageInput.readOnly=false;
 privateMessageInput.style.pointerEvents='auto';
 privateMessageInput.style.userSelect='text';
 setTimeout(()=>{privateMessageInput.focus();privateMessageInput.click()},100);
}
function closePrivateMessage(){if(privateMessageModal){privateMessageModal.hidden=true;privateMessageModal.style.display=''}}
async function sendPrivateMessage(){
 const target=currentDetailPlayer?.player_id,body=privateMessageInput?.value.trim();
 if(!target||!body||!currentUser||!supabaseClient)return;
 privateMessageSend.disabled=true;
 try{
  const {data:sent,error}=await supabaseClient.from('private_messages').insert({sender_id:currentUser.id,recipient_id:target,body}).select('id').single();if(error)throw error;if(sent?.id)supabaseClient.functions.invoke('send-private-push',{body:{message_id:sent.id}}).catch(console.error);
  closePrivateMessage();showToast('Mensaje privado enviado.');
 }catch(e){console.error(e);showToast('No se pudo enviar el mensaje.')}
 finally{privateMessageSend.disabled=false}
}
async function toggleFollow(){
 const player=currentDetailPlayer;if(!currentUser||!supabaseClient||!player?.player_id||player.player_id===currentUser.id)return;
 const following=playerFollowBtn?.dataset.following==='1';
 try{
  if(following){const {error}=await supabaseClient.from('profile_follows').delete().eq('follower_id',currentUser.id).eq('following_id',player.player_id);if(error)throw error}
  else{const {error}=await supabaseClient.from('profile_follows').insert({follower_id:currentUser.id,following_id:player.player_id});if(error)throw error}
  await loadFollowStats(player);
 }catch(e){console.error(e);showToast('No se pudo actualizar el seguimiento.')}
}
async function openRankingPlayer(player){
  if(!playerDetailModal)return;
  currentDetailPlayer=player;

  const displayName=String(player?.username||player?.account_name||'Jugador').toUpperCase();
  const country=player?.country||'País';
  const elo=Number.isFinite(Number(player?.elo_points))?Number(player.elo_points):200;
  const wins=Number.isFinite(Number(player?.wins))?Number(player.wins):0;
  const losses=Number.isFinite(Number(player?.losses))?Number(player.losses):0;
  const gameId=String(player?.game_id||'—');
  const rank=getRankByElo(elo);

  playerDetailName.textContent=displayName;
  playerDetailFlag.textContent=getFlag(country);
  playerDetailCountry.textContent=country;
  playerDetailGameId.textContent=gameId;
  const isAdminProfile=String(player?.username||'').toLowerCase()==='ikar8bp'||player?.is_admin===true;
  const eloStat=playerDetailElo?.closest('.player-detail-stat');
  const winStat=playerDetailWins?.closest('.player-detail-stat');
  const lossStat=playerDetailLosses?.closest('.player-detail-stat');
  const idStat=playerDetailGameId?.closest('.player-detail-stat');
  if(isAdminProfile){
    if(playerDetailRank)playerDetailRank.hidden=true;
    if(idStat)idStat.hidden=true;
    if(eloStat){eloStat.hidden=true;eloStat.classList.remove('admin-profile-label');const label=eloStat.querySelector('small');if(label)label.textContent='';playerDetailElo.textContent='';}
    if(winStat)winStat.hidden=true;
    if(lossStat)lossStat.hidden=true;
  }else{
    if(idStat)idStat.hidden=false;
    if(eloStat)eloStat.classList.remove('admin-profile-label');
    if(playerDetailRank)playerDetailRank.hidden=false;
    if(eloStat){eloStat.hidden=false;const label=eloStat.querySelector('small');if(label)label.textContent='ELO';playerDetailElo.textContent=String(elo);}
    if(winStat){winStat.hidden=false;const label=winStat.querySelector('small');if(label)label.textContent='VICTORIAS';playerDetailWins.textContent=String(wins);}
    if(lossStat){lossStat.hidden=false;const label=lossStat.querySelector('small');if(label)label.textContent='DERROTAS';playerDetailLosses.textContent=String(losses);}
    if(playerDetailRank){const rankName=playerDetailRank.querySelector('strong');if(rankName)rankName.textContent=rank.name.toUpperCase();}
    renderPlayerDetailRankBadge(rank);
  }

  updateHeartUI(player?.heart_count||0,false,player?.player_id===currentUser?.id);
  if(playerModeratorBtn){
    const ikarCanModerate=String(currentProfile?.username||'').toLowerCase()==='ikar8bp'&&currentProfile?.is_admin===true&&player?.player_id!==currentUser?.id&&!isAdminProfile;
    playerModeratorBtn.hidden=!ikarCanModerate;
    if(ikarCanModerate){
      try{const {data:roleEnabled,error:roleError}=await supabaseClient.rpc('ikar_get_moderator_status',{p_player_id:player.player_id});if(roleError)throw roleError;playerModeratorBtn.dataset.enabled=roleEnabled?'1':'0';playerModeratorBtn.textContent=roleEnabled?'QUITAR MODERADOR':'CONVERTIR EN MODERADOR'}catch(e){console.error('No se pudo consultar rol moderador:',e);playerModeratorBtn.hidden=true}
    }
  }

  playerDetailAvatar.replaceChildren();
  const fallback=document.createElement('span');
  fallback.textContent=displayName.charAt(0)||'J';
  playerDetailAvatar.appendChild(fallback);

  playerDetailModal.classList.add('open');
  playerDetailModal.setAttribute('aria-hidden','false');
  document.body.classList.add('player-detail-open');

  loadPlayerHeartState(player).catch(error=>console.error('Error cargando corazones:',error));
  loadFollowStats(player).catch(error=>console.error('Error cargando seguidores:',error));
  loadProfileComments().catch(error=>console.error('Error cargando comentarios:',error));

  if(player?.avatar_path&&supabaseClient){
    try{
      const {data,error}=await supabaseClient.storage.from('profile-photos').createSignedUrl(player.avatar_path,3600);
      if(!error&&data?.signedUrl&&playerDetailModal.classList.contains('open')){
        const img=document.createElement('img');
        img.src=data.signedUrl;
        img.alt='Foto de '+displayName;
        img.onload=()=>playerDetailAvatar.replaceChildren(img);
      }
    }catch(error){
      console.error('No se pudo cargar la foto del jugador:',error);
    }
  }
}

function buildRankingRow(player,index){
  const row=document.createElement('button');
  row.type='button';
  row.className='ranking-row'+(index===0?' ranking-first':index===1?' ranking-second':index===2?' ranking-third':'');
  row.setAttribute('aria-label','Ver perfil de '+String(player?.username||player?.account_name||'Jugador'));
  row.addEventListener('click',()=>openRankingPlayer(player));
  
  const position=document.createElement('div');
  position.className='ranking-position';
  if(index<3){
    const medal=document.createElement('span');
    medal.className='ranking-medal ranking-medal-'+(index+1);
    medal.textContent=String(index+1);
    position.appendChild(medal);
  }else{
    position.textContent=String(index+1);
  }

  const playerCell=document.createElement('div');
  playerCell.className='ranking-player';
  playerCell.appendChild(createRankingAvatar(player));
  const name=document.createElement('span');
  name.className='ranking-player-name';
  name.textContent=String(player?.username||player?.account_name||'Jugador').toUpperCase();
  playerCell.appendChild(name);

  const countryCell=document.createElement('div');
  countryCell.className='ranking-country';
  const flag=document.createElement('span');
  flag.className='ranking-flag';
  flag.textContent=getFlag(player?.country);
  const countryText=document.createElement('span');
  countryText.className='ranking-country-name';
  countryText.textContent=player?.country||'País';
  countryCell.append(flag,countryText);

  const elo=document.createElement('div');
  elo.className='ranking-elo';
  elo.textContent=String(Number.isFinite(Number(player?.elo_points))?Number(player.elo_points):200);

  row.append(position,playerCell,countryCell,elo);
  return row;
}

async function loadRanking(attempt=0){
  if(!rankingList||!rankingCount||!supabaseClient)return;
  if(attempt===0){
    rankingList.innerHTML='<div class="ranking-loading">Cargando clasificación...</div>';
    rankingCount.textContent='';
  }

  try{
    // La clasificación nunca debe depender de Auth. Si hay sesión usamos la
    // versión completa; si Auth falla o no hay sesión, usamos el ranking público.
    let session=null;
    try{
      const {data}=await supabaseClient.auth.getSession();
      session=data?.session||null;
    }catch(e){
      console.warn('Auth no disponible al cargar ranking; usando ranking público.',e);
    }

    let data,error;
    if(session){
      ({data,error}=await supabaseClient.rpc('get_ranking'));
      if(error){
        console.warn('get_ranking falló; usando get_public_ranking.',error);
        ({data,error}=await supabaseClient.rpc('get_public_ranking'));
      }
    }else{
      ({data,error}=await supabaseClient.rpc('get_public_ranking'));
    }
    if(error)throw error;

    const players=(Array.isArray(data)?data:[]).slice(0,100);
    rankingList.replaceChildren();
    rankingCount.textContent=players.length+' '+(players.length===1?'JUGADOR':'JUGADORES');

    if(!players.length){
      const empty=document.createElement('div');
      empty.className='ranking-loading';
      empty.textContent='Todavía no hay jugadores registrados.';
      rankingList.appendChild(empty);
      return;
    }

    players.forEach((player,index)=>rankingList.appendChild(buildRankingRow(player,index)));
  }catch(error){
    console.error('Error cargando clasificación:',error);
    rankingList.innerHTML='<div class="ranking-loading ranking-error">No se pudo cargar la clasificación. Toca aquí para reintentar.</div>';
    rankingList.onclick=()=>{rankingList.onclick=null;loadRanking()};
  }
}

async function getProfile(userId){
  if(!supabaseClient||!userId)return null;
  const {data,error}=await supabaseClient.from('profiles')
    .select('id, username, game_id, account_name, country, screenshot_path, avatar_path, rank_name, elo_points, wins, losses, created_at')
    .eq('id',userId).maybeSingle();
  if(error){console.error('Error cargando perfil:',error);return null}
  return data
}

async function restoreSession(attempt=0){
  if(!cloudReady){setGuestUI();return}
  try{
    const {data,error}=await supabaseClient.auth.getSession();
    if(error){
      console.warn('Error temporal restaurando sesión:',error);
      if(attempt<5){
        await new Promise(resolve=>setTimeout(resolve,800*(attempt+1)));
        return restoreSession(attempt+1);
      }
      // Un error de red/Auth NO debe borrar una sesión local válida ni expulsar al jugador.
      return;
    }
    if(!data?.session){setGuestUI();return}
    const profile=await getProfile(data.session.user.id);
    await setPlayerUI(profile,data.session.user)
  }catch(error){
    console.warn('Fallo temporal restaurando sesión:',error);
    if(attempt<5){
      await new Promise(resolve=>setTimeout(resolve,800*(attempt+1)));
      return restoreSession(attempt+1);
    }
  }
}

/* Los controles de autenticación se enlazan al inicio mediante bindAuthModalsEarly(). */
window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal(registerModal);closeModal(loginModal);closeRankingPlayer();settingsMenu.hidden=true}});
backBtn.addEventListener('click',()=>showToast('Perfil del jugador'));
settingsBtn.addEventListener('click',()=>{settingsMenu.hidden=!settingsMenu.hidden});
if(closePlayerDetail)closePlayerDetail.addEventListener('click',closeRankingPlayer);
if(playerHeartBtn)playerHeartBtn.addEventListener('click',togglePlayerHeart);
if(playerFollowBtn)playerFollowBtn.addEventListener('click',toggleFollow);
if(moderatorAdminBtn)moderatorAdminBtn.addEventListener('click',async()=>{moderatorPanel.hidden=false;await loadModeratorMatches()});
if(moderatorCloseBtn)moderatorCloseBtn.addEventListener('click',()=>moderatorPanel.hidden=true);
if(moderatorRefreshBtn)moderatorRefreshBtn.addEventListener('click',loadModeratorMatches);
if(adminModeBtn)adminModeBtn.addEventListener('click',async()=>{adminPanel.hidden=false;settingsMenu.hidden=true;await loadAdminMatches()});
if(adminCloseBtn)adminCloseBtn.addEventListener('click',()=>adminPanel.hidden=true);
if(adminRefreshBtn)adminRefreshBtn.addEventListener('click',()=>adminResultsList&&!adminResultsList.hidden?loadAdminResults():(adminPlayerList&&!adminPlayerList.hidden?loadAdminPlayers():loadAdminMatches()));
if(adminVsTab)adminVsTab.addEventListener('click',showAdminVs);
if(adminPlayersTab)adminPlayersTab.addEventListener('click',showAdminPlayers);
if(adminResultsTab)adminResultsTab.addEventListener('click',showAdminResults);
if(dashboardPlayBtn)dashboardPlayBtn.addEventListener('click',async()=>{
  try{
    const {data,error}=await supabaseClient.from('profiles').select('is_admin').eq('id',currentUser.id).single();
    if(error)throw error;
    if(data?.is_admin){
      if(adminPanel)adminPanel.hidden=false;
      if(settingsMenu)settingsMenu.hidden=true;
      await loadAdminMatches();
      return;
    }
  }catch(e){console.error('Comprobación admin:',e)}
  await startRankedMatchmaking();
});
if(matchmakingClose)matchmakingClose.addEventListener('click',closeRankedMatchmaking);
if(abandonRankedBtn)abandonRankedBtn.addEventListener('click',abandonRankedMatch);
if(playerCancelVsBtn)playerCancelVsBtn.addEventListener('click',cancelVsByPlayers);
if(playerPlayingBtn)playerPlayingBtn.addEventListener('click',markVsPlaying);
if(playerMessageBtn)playerMessageBtn.addEventListener('click',openPrivateMessage);
if(playerModeratorBtn)playerModeratorBtn.addEventListener('click',async()=>{
 if(!currentDetailPlayer||playerModeratorBtn.hidden)return;
 const enabled=playerModeratorBtn.dataset.enabled!=='1';
 if(!confirm(enabled?'¿Convertir este jugador en MODERADOR? Podrá seguir jugando normalmente.':'¿Quitar el rol de MODERADOR a este jugador?'))return;
 playerModeratorBtn.disabled=true;
 try{const {error}=await supabaseClient.rpc('ikar_set_moderator',{p_player_id:currentDetailPlayer.player_id,p_enabled:enabled});if(error)throw error;playerModeratorBtn.dataset.enabled=enabled?'1':'0';playerModeratorBtn.textContent=enabled?'QUITAR MODERADOR':'CONVERTIR EN MODERADOR';showToast(enabled?'Jugador convertido en MODERADOR.':'Rol de MODERADOR retirado.')}catch(e){console.error(e);showToast('No se pudo cambiar el rol de moderador.')}finally{playerModeratorBtn.disabled=false}
});
if(playerPlayBtn)playerPlayBtn.addEventListener('click',()=>showToast('Próximamente podrás desafiar a este jugador.'));
if(privateMessageClose)privateMessageClose.addEventListener('click',closePrivateMessage);
if(privateMessageSend)privateMessageSend.addEventListener('click',sendPrivateMessage);
if(privateMessageModal)privateMessageModal.addEventListener('click',e=>{if(e.target===privateMessageModal)closePrivateMessage()});
if(profileCommentForm)profileCommentForm.addEventListener('submit',submitProfileComment);
function renderInbox(items){
 if(!inboxList)return;inboxList.replaceChildren();inboxMessagesCache=items||[];
 if(!items.length){inboxList.innerHTML='<div class="notification-empty">No tienes mensajes.</div>';return}
 const conversations=new Map();
 items.forEach(m=>{const incoming=m.recipient_id===currentUser?.id;const otherId=incoming?m.sender_id:m.recipient_id;const otherName=incoming?m.sender_name:m.recipient_name;if(!conversations.has(otherId))conversations.set(otherId,{id:otherId,name:otherName,last:m,unread:0});if(incoming&&!m.is_read)conversations.get(otherId).unread++});
 conversations.forEach(c=>{
  const item=document.createElement('button');item.type='button';item.className='notification-item inbox-message'+(c.unread?' unread':'');
  const icon=document.createElement('span');icon.className='notification-type-icon';icon.textContent='💬';
  const box=document.createElement('div');box.className='notification-copy';const p=document.createElement('p');const b=document.createElement('b');b.textContent=String(c.name||'Jugador');p.append(b,document.createElement('br'),document.createTextNode(String(c.last.body||'')));
  const t=document.createElement('time');t.textContent=formatCommentDate(c.last.created_at);box.append(p,t);item.append(icon,box);item.addEventListener('click',()=>openConversation(c.id,c.name));inboxList.appendChild(item);
 });
}
function openConversation(userId,userName){
 activeConversationUser={id:userId,name:userName};if(inboxPanel)inboxPanel.hidden=true;if(conversationPanel)conversationPanel.hidden=false;if(conversationTitle)conversationTitle.textContent=String(userName||'Jugador').toUpperCase();renderConversation();
}
function renderConversation(){
 if(!conversationMessages||!activeConversationUser)return;conversationMessages.replaceChildren();
 const msgs=inboxMessagesCache.filter(m=>(m.sender_id===activeConversationUser.id&&m.recipient_id===currentUser.id)||(m.sender_id===currentUser.id&&m.recipient_id===activeConversationUser.id)).slice().reverse();
 msgs.forEach(m=>{const bubble=document.createElement('div');bubble.className='conversation-bubble '+(m.sender_id===currentUser.id?'mine':'theirs');const body=document.createElement('p');body.textContent=m.body;const time=document.createElement('time');time.textContent=formatCommentDate(m.created_at);bubble.append(body,time);conversationMessages.appendChild(bubble)});
 conversationMessages.scrollTop=conversationMessages.scrollHeight;
}
async function sendConversationMessage(){
 const body=conversationInput?.value.trim();if(!body||!activeConversationUser||!currentUser||!supabaseClient)return;conversationSendBtn.disabled=true;
 try{const {data:sent,error}=await supabaseClient.from('private_messages').insert({sender_id:currentUser.id,recipient_id:activeConversationUser.id,body}).select('id').single();if(error)throw error;if(sent?.id)supabaseClient.functions.invoke('send-private-push',{body:{message_id:sent.id}}).catch(console.error);conversationInput.value='';await loadInbox();renderConversation()}catch(e){console.error(e);showToast('No se pudo enviar el mensaje.')}finally{conversationSendBtn.disabled=false}
}
async function loadInbox(){
 if(!currentUser||!supabaseClient||!inboxList)return;
 try{
  const {data,error}=await supabaseClient.rpc('get_my_private_messages');if(error)throw error;
  const items=Array.isArray(data)?data:[];inboxMessagesCache=items;renderInbox(items);
  const unread=items.filter(m=>m.recipient_id===currentUser.id&&!m.is_read);
  if(unread.length)await supabaseClient.from('private_messages').update({is_read:true}).eq('recipient_id',currentUser.id).eq('is_read',false);
 }catch(e){console.error(e);inboxList.innerHTML='<div class="notification-empty">No se pudo cargar la bandeja.</div>'}
}
async function toggleInbox(){
 if(!inboxPanel)return;const opening=inboxPanel.hidden;closeHeaderMenus(inboxPanel);inboxPanel.hidden=!opening;if(opening)await loadInbox();
}
function closeHeaderMenus(except=null){
  const menus=[inboxPanel,conversationPanel,notificationPanel,activityPanel,settingsMenu];
  menus.forEach(menu=>{if(menu&&menu!==except)menu.hidden=true});
}
document.addEventListener('click',event=>{
  const insideNotification=notificationPanel?.contains(event.target)||notificationBtn?.contains(event.target);
  const insideActivity=activityPanel?.contains(event.target)||activityBtn?.contains(event.target);
  const insideSettings=settingsMenu?.contains(event.target)||settingsBtn?.contains(event.target);
  const insideInbox=inboxPanel?.contains(event.target)||inboxBtn?.contains(event.target);
  const insideConversation=conversationPanel?.contains(event.target);
  if(!insideNotification&&!insideActivity&&!insideSettings&&!insideInbox&&!insideConversation)closeHeaderMenus();
});
if(inboxBtn)inboxBtn.addEventListener('click',toggleInbox);
if(refreshInboxBtn)refreshInboxBtn.addEventListener('click',loadInbox);
if(conversationSendBtn)conversationSendBtn.addEventListener('click',sendConversationMessage);
if(conversationBackBtn)conversationBackBtn.addEventListener('click',()=>{conversationPanel.hidden=true;inboxPanel.hidden=false});
if(conversationCloseBtn)conversationCloseBtn.addEventListener('click',()=>{conversationPanel.hidden=true});
if(notificationBtn)notificationBtn.addEventListener('click',toggleNotifications);
if(activityBtn)activityBtn.addEventListener('click',toggleGlobalActivity);
if(refreshActivityBtn)refreshActivityBtn.addEventListener('click',loadGlobalActivity);
if(markNotificationsRead)markNotificationsRead.addEventListener('click',markAllNotificationsRead);
let notificationRefreshTimer=null;
function startNotificationRefresh(){
  if(notificationRefreshTimer)clearInterval(notificationRefreshTimer);
  if(currentUser){
    loadNotifications().catch(()=>{});
    notificationRefreshTimer=setInterval(()=>{if(currentUser&&!document.hidden)loadNotifications().catch(()=>{})},30000);
  }
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&currentUser)loadNotifications().catch(()=>{})});
setTimeout(startNotificationRefresh,1000);
if(playerDetailModal)playerDetailModal.addEventListener('click',event=>{if(event.target===playerDetailModal)closeRankingPlayer()});

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

logoutBtn.addEventListener('click',async()=>{settingsMenu.hidden=true;if(supabaseClient)await supabaseClient.auth.signOut();setGuestUI();showToast('Sesión cerrada.')});

if(deleteAccountBtn)deleteAccountBtn.addEventListener('click',async()=>{
  settingsMenu.hidden=true;
  if(!supabaseClient||!currentUser){showToast('No hay una sesión activa.');return}

  const confirmed=window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es permanente y no se puede deshacer.');
  if(!confirmed)return;

  const confirmedAgain=window.confirm('ÚLTIMA CONFIRMACIÓN: se eliminarán tu cuenta, perfil, ELO, estadísticas, corazones y fotos asociadas. ¿Eliminar definitivamente?');
  if(!confirmedAgain)return;

  deleteAccountBtn.disabled=true;
  dashboardMessage.textContent='Eliminando cuenta...';

  try{
    const pathsByBucket={};
    if(currentProfile?.avatar_path)(pathsByBucket['profile-photos']??=[]).push(currentProfile.avatar_path);
    if(currentProfile?.screenshot_path)(pathsByBucket['account-captures']??=[]).push(currentProfile.screenshot_path);

    for(const [bucket,paths] of Object.entries(pathsByBucket)){
      if(paths.length){
        const {error:storageError}=await supabaseClient.storage.from(bucket).remove(paths);
        if(storageError)console.warn('No se pudo borrar un archivo de '+bucket+':',storageError);
      }
    }

    const {error}=await supabaseClient.rpc('delete_my_account');
    if(error)throw error;

    await supabaseClient.auth.signOut().catch(()=>{});
    setGuestUI();
    showToast('Tu cuenta fue eliminada permanentemente.');
  }catch(error){
    console.error('Error eliminando cuenta:',error);
    dashboardMessage.textContent='No se pudo eliminar la cuenta. Inténtalo de nuevo.';
    showToast('No se pudo eliminar la cuenta.');
  }finally{
    deleteAccountBtn.disabled=false;
  }
});

if(cloudReady){
  supabaseClient.auth.onAuthStateChange(async(event,session)=>{
    // Solo un SIGNED_OUT real debe sacar al jugador. Un refresh fallido o evento
    // transitorio sin sesión no debe convertir automáticamente la interfaz a invitado.
    if(event==='SIGNED_OUT'){setGuestUI();return}
    if(!session){
      console.warn('Auth temporalmente sin sesión; se conserva la interfaz actual.',event);
      return;
    }
    if(event==='SIGNED_IN'||event==='INITIAL_SESSION'||event==='TOKEN_REFRESHED'){
      const profile=await getProfile(session.user.id);
      await setPlayerUI(profile,session.user)
    }
  })
}
restoreSession();
setTimeout(()=>{if(guestEmpty&&!guestEmpty.hidden)renderGuestRankShowcase().catch(()=>{})},300);

const dashboardChatBtn=document.getElementById('dashboardChatBtn'),generalChatModal=document.getElementById('generalChatModal'),generalChatClose=document.getElementById('generalChatClose'),generalChatMessages=document.getElementById('generalChatMessages'),generalChatForm=document.getElementById('generalChatForm'),generalChatInput=document.getElementById('generalChatInput');
let generalChatTimer=null;
async function loadGeneralChat(){
 if(!generalChatMessages||!supabaseClient)return;
 const {data,error}=await supabaseClient.rpc('get_general_chat_messages');if(error){console.error(error);return}
 const rows=(Array.isArray(data)?data:[]).reverse();generalChatMessages.replaceChildren();
 for(const m of rows){const item=document.createElement('div');item.className='general-chat-message'+(m.user_id===currentUser?.id?' mine':'');const av=document.createElement('div');av.className='general-chat-avatar';if(m.avatar_path){const {data:u}=supabaseClient.storage.from('profile-photos').getPublicUrl(m.avatar_path);if(u?.publicUrl)av.style.backgroundImage='url("'+u.publicUrl+'")'}if(!m.avatar_path)av.textContent=String(m.author_name||'?').charAt(0).toUpperCase();const openChatProfile=async()=>{try{const {data,error}=await supabaseClient.rpc('get_profile_by_id',{p_player_id:m.user_id});if(error)throw error;const player=Array.isArray(data)?data[0]:null;if(player){closeGeneralChat();openRankingPlayer(player)}else showToast('No se encontró ese perfil.')}catch(err){console.error(err);showToast('No se pudo abrir el perfil.')}};av.classList.add('general-chat-profile-link');av.setAttribute('role','button');av.tabIndex=0;av.addEventListener('click',openChatProfile);av.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openChatProfile()}});const box=document.createElement('div');const head=document.createElement('strong');head.textContent=m.author_name;head.classList.add('general-chat-profile-link');head.setAttribute('role','button');head.tabIndex=0;head.addEventListener('click',openChatProfile);head.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openChatProfile()}});const body=document.createElement('p');body.textContent=m.body;const time=document.createElement('small');time.textContent=formatCommentDate(m.created_at);box.append(head,body,time);item.append(av,box);generalChatMessages.append(item)}
 generalChatMessages.scrollTop=generalChatMessages.scrollHeight;
}
function openGeneralChat(){if(!currentUser){showToast('Inicia sesión para usar el chat.');return}generalChatModal.hidden=false;loadGeneralChat();clearInterval(generalChatTimer);generalChatTimer=setInterval(()=>{if(!document.hidden)loadGeneralChat()},5000);setTimeout(()=>generalChatInput?.focus(),50)}
function closeGeneralChat(){generalChatModal.hidden=true;clearInterval(generalChatTimer);generalChatTimer=null}
dashboardChatBtn?.addEventListener('click',openGeneralChat);generalChatClose?.addEventListener('click',closeGeneralChat);
generalChatForm?.addEventListener('submit',async e=>{e.preventDefault();const body=generalChatInput.value.trim();if(!body||!currentUser)return;const {error}=await supabaseClient.from('general_chat_messages').insert({user_id:currentUser.id,body});if(error){showToast('No se pudo enviar el mensaje.');return}generalChatInput.value='';await loadGeneralChat()});

const PUSH_VAPID_PUBLIC='BJ5JeRALHigbb-mAs1abfCn1vpMo8Z4QI2puRD2PXcM8MLRXEqeRMfbfW0NNugIkrN3xilbKXhuFNmUrX-8ptIs';
const pushEnableBtn=document.getElementById('pushEnableBtn');
function vapidBytes(s){const p='='.repeat((4-s.length%4)%4),b=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...b].map(x=>x.charCodeAt(0)))}
async function enablePushNotifications(){
 if(!currentUser){showToast('Inicia sesión primero.');return}
 if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window)){showToast('Este navegador no permite notificaciones push.');return}
 try{const permission=await Notification.requestPermission();if(permission!=='granted'){showToast('Debes permitir las notificaciones.');return}const reg=await navigator.serviceWorker.register('./sw.js?v=1');await navigator.serviceWorker.ready;let sub=await reg.pushManager.getSubscription();if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:vapidBytes(PUSH_VAPID_PUBLIC)});const j=sub.toJSON();const {error}=await supabaseClient.from('push_subscriptions').upsert({user_id:currentUser.id,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth},{onConflict:'endpoint'});if(error)throw error;pushEnableBtn.textContent='🔔 NOTIFICACIONES ACTIVADAS';pushEnableBtn.classList.add('enabled');showToast('Notificaciones activadas en este dispositivo.')}catch(e){console.error(e);showToast('No se pudieron activar las notificaciones.')}
}
pushEnableBtn?.addEventListener('click',enablePushNotifications);if(whatsappContactBtn)whatsappContactBtn.addEventListener('click',()=>{
  if(OFFICIAL_WHATSAPP_GROUP_URL){
    window.open(OFFICIAL_WHATSAPP_GROUP_URL,'_blank','noopener,noreferrer');
  }else{
    showToast('El botón de WhatsApp ya está listo. Falta configurar el enlace del grupo oficial.');
  }
});


