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


const RANKS=[
  {min:200,name:'Latón',spriteIndex:0},
  {min:300,name:'Bronce I',spriteIndex:1},
  {min:400,name:'Bronce II',spriteIndex:2},
  {min:500,name:'Bronce III',spriteIndex:3},
  {min:600,name:'Plata I',spriteIndex:4},
  {min:700,name:'Plata II',spriteIndex:5},
  {min:800,name:'Plata III',spriteIndex:6},
  {min:900,name:'Oro I',spriteIndex:7},
  {min:1000,name:'Oro II',spriteIndex:8},
  {min:1100,name:'Oro III',spriteIndex:9},
  {min:1200,name:'Amatista I',spriteIndex:13},
  {min:1300,name:'Amatista II',spriteIndex:12},
  {min:1400,name:'Amatista III',spriteIndex:19},
  {min:1500,name:'Esmeralda I',spriteIndex:14},
  {min:1600,name:'Esmeralda II',spriteIndex:11},
  {min:1700,name:'Esmeralda III',spriteIndex:15},
  {min:1800,name:'Diamante I',spriteIndex:16},
  {min:1900,name:'Diamante II',spriteIndex:17},
  {min:2000,name:'Diamante III',spriteIndex:10},
  {min:2100,name:'Diamante Negro',spriteIndex:18}
];

const RANK_SPRITE_PARTS=[
  'assets/ranks/rank-sprite.part01.b64?v=2',
  'assets/ranks/rank-sprite.part02.b64?v=2',
  'assets/ranks/rank-sprite.part03a.b64?v=2',
  'assets/ranks/rank-sprite.part03b.b64?v=2',
  'assets/ranks/rank-sprite.part03c.b64?v=2',
  'assets/ranks/rank-sprite.part04.b64?v=2',
  'assets/ranks/rank-sprite.part05.b64?v=2',
  'assets/ranks/rank-sprite.part06.b64?v=2'
];
let rankSpritePromise=null;

function getRankByElo(value){
  const elo=Number.isFinite(Number(value))?Number(value):200;
  let index=0;
  for(let i=0;i<RANKS.length;i++){
    if(elo>=RANKS[i].min)index=i;
    else break;
  }
  return {...RANKS[index],index};
}

function makeRankSpriteTransparent(dataUrl){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>{
      try{
        const width=img.naturalWidth||img.width;
        const height=img.naturalHeight||img.height;
        const canvas=document.createElement('canvas');
        canvas.width=width;
        canvas.height=height;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        ctx.clearRect(0,0,width,height);
        ctx.drawImage(img,0,0);

        const frame=ctx.getImageData(0,0,width,height);
        const pixels=frame.data;
        const visited=new Uint8Array(width*height);
        const columns=5;
        const rows=4;
        const cellWidth=Math.floor(width/columns);
        const cellHeight=Math.floor(height/rows);
        const darkLimit=26;

        const isBackgroundDark=index=>{
          const p=index*4;
          return pixels[p]<=darkLimit&&pixels[p+1]<=darkLimit&&pixels[p+2]<=darkLimit;
        };

        for(let row=0;row<rows;row++){
          for(let col=0;col<columns;col++){
            const x0=col*cellWidth;
            const y0=row*cellHeight;
            const x1=col===columns-1?width:(col+1)*cellWidth;
            const y1=row===rows-1?height:(row+1)*cellHeight;
            const queue=new Int32Array((x1-x0)*(y1-y0));
            let head=0;
            let tail=0;

            const add=(x,y)=>{
              if(x<x0||x>=x1||y<y0||y>=y1)return;
              const index=y*width+x;
              if(visited[index]||!isBackgroundDark(index))return;
              visited[index]=1;
              queue[tail++]=index;
            };

            for(let x=x0;x<x1;x++){
              add(x,y0);
              add(x,y1-1);
            }
            for(let y=y0;y<y1;y++){
              add(x0,y);
              add(x1-1,y);
            }

            while(head<tail){
              const index=queue[head++];
              const p=index*4;
              pixels[p+3]=0;
              const x=index%width;
              const y=Math.floor(index/width);
              add(x-1,y);
              add(x+1,y);
              add(x,y-1);
              add(x,y+1);
            }
          }
        }

        ctx.putImageData(frame,0,0);
        resolve(canvas.toDataURL('image/png'));
      }catch(error){
        reject(error);
      }
    };
    img.onerror=()=>reject(new Error('No se pudo procesar la hoja de insignias.'));
    img.src=dataUrl;
  });
}

function getRankSpriteUrl(){
  if(!rankSpritePromise){
    rankSpritePromise=Promise.all(RANK_SPRITE_PARTS.map(async path=>{
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok)throw new Error('No se pudo cargar '+path);
      return (await response.text()).trim();
    }))
      .then(parts=>'data:image/webp;base64,'+parts.join(''))
      .then(makeRankSpriteTransparent);
  }
  return rankSpritePromise;
}

async function renderRankBadge(rank){
  if(!rankBadgeImage)return;
  rankBadgeImage.textContent=rank.name;
  rankBadgeImage.setAttribute('aria-label','Rango '+rank.name);
  rankBadgeImage.title='Rango '+rank.name;
  const spriteIndex=Number.isInteger(rank.spriteIndex)?rank.spriteIndex:rank.index;
  const col=spriteIndex%5;
  const row=Math.floor(spriteIndex/5);
  try{
    const sprite=await getRankSpriteUrl();
    rankBadgeImage.style.backgroundImage='url("'+sprite+'")';
    rankBadgeImage.style.backgroundPosition=(col*25)+'% '+(row*(100/3))+'%';
    rankBadgeImage.textContent='';
  }catch(error){
    console.error('No se pudo cargar la insignia de rango:',error);
    rankBadgeImage.style.backgroundImage='none';
  }
}

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
  dashboardElo.textContent=elo;
  dashboardWins.textContent=wins;
  dashboardLosses.textContent=losses;
  gamesPlayed.textContent=games;
  winRate.textContent=rate+'%';
  currentStreak.textContent='0';
  bestElo.textContent=elo;
  dashboardMessage.textContent='';

  // El ranking debe aparecer de inmediato en todos los perfiles.
  // No esperamos a que termine de cargar/procesar la insignia.
  const rankingTask=loadRanking();
  const rankTask=renderRankBadge(rank);
  const avatarTask=profile?.avatar_path?loadAvatar(profile.avatar_path):Promise.resolve(clearAvatar());
  await Promise.allSettled([rankingTask,rankTask,avatarTask]);
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


function closeRankingPlayer(){
  if(!playerDetailModal)return;
  playerDetailModal.classList.remove('open');
  playerDetailModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('player-detail-open');
}

async function openRankingPlayer(player){
  if(!playerDetailModal)return;

  const displayName=String(player?.username||player?.account_name||'Jugador').toUpperCase();
  const country=player?.country||'País';
  const elo=Number.isFinite(Number(player?.elo_points))?Number(player.elo_points):200;
  const wins=Number.isFinite(Number(player?.wins))?Number(player.wins):0;
  const losses=Number.isFinite(Number(player?.losses))?Number(player.losses):0;
  const gameId=String(player?.game_id||'—');

  playerDetailName.textContent=displayName;
  playerDetailFlag.textContent=getFlag(country);
  playerDetailCountry.textContent=country;
  playerDetailGameId.textContent=gameId;
  playerDetailElo.textContent=String(elo);
  playerDetailWins.textContent=String(wins);
  playerDetailLosses.textContent=String(losses);

  playerDetailAvatar.replaceChildren();
  const fallback=document.createElement('span');
  fallback.textContent=displayName.charAt(0)||'J';
  playerDetailAvatar.appendChild(fallback);

  playerDetailModal.classList.add('open');
  playerDetailModal.setAttribute('aria-hidden','false');
  document.body.classList.add('player-detail-open');

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
    const {data:sessionData}=await supabaseClient.auth.getSession();
    if(!sessionData?.session){
      if(attempt<8){
        await new Promise(resolve=>setTimeout(resolve,250));
        return loadRanking(attempt+1);
      }
      throw new Error('La sesión todavía no está disponible.');
    }

    const {data,error}=await supabaseClient.rpc('get_ranking');
    if(error){
      if(attempt<8&&(error.code==='42501'||/jwt|session|permission|authorized/i.test(error.message||''))){
        await new Promise(resolve=>setTimeout(resolve,250));
        return loadRanking(attempt+1);
      }
      throw error;
    }

    const players=Array.isArray(data)?data:[];
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
window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal(registerModal);closeModal(loginModal);closeRankingPlayer();settingsMenu.hidden=true}});
backBtn.addEventListener('click',()=>showToast('Perfil del jugador'));
settingsBtn.addEventListener('click',()=>{settingsMenu.hidden=!settingsMenu.hidden});
if(closePlayerDetail)closePlayerDetail.addEventListener('click',closeRankingPlayer);
if(playerDetailModal)playerDetailModal.addEventListener('click',event=>{if(event.target===playerDetailModal)closeRankingPlayer()});

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