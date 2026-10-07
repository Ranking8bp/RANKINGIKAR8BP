import re
from pathlib import Path
p=Path('app-v5.js')
s=p.read_text(encoding='utf-8')
ranks=[
(0,'Latón I','LatonI.png'),(25,'Latón II','LatonII.png'),(50,'Latón III','LatonIII.png'),(100,'Latón IV','LatonIV.png'),(150,'Latón V','LatonV.png'),
(200,'Bronce I','bronceI.png'),(275,'Bronce II','BronceII.png'),(350,'Bronce III','BronceIII.png'),(450,'Bronce IV','BronceIV.png'),(550,'Bronce V','BronceV.png'),
(675,'Plata I','PlataI.png'),(800,'Plata II','PlataII.png'),(950,'Plata III','PlataIII.png'),(1125,'Plata IV','PlataIV.png'),(1300,'Plata V','PlataV.png'),
(1500,'Oro I','OroI.png'),(1700,'Oro II','OroII.png'),(1925,'Oro III','OroIII.png'),(2175,'Oro IV','OroIV.png'),(2425,'Oro V','OroV.png'),
(2700,'Platino I','PlatinoI.png'),(3000,'Platino II','PlatinoII.png'),(3300,'Platino III','PlatinoIII.png'),(3625,'Platino IV','PlatinoIV.png'),(3975,'Platino V','PlatinoV.png'),
(4350,'Titanio I','TitanioI.png'),(4725,'Titanio II','TitanioII.png'),(5125,'Titanio III','TitanioIII.png'),(5550,'Titanio IV','TitanioIV.png'),(6000,'Titanio V','TitanioV.png'),
(6475,'Diamante I','DiamanteI.png'),(6950,'Diamante II','DiamanteII.png'),(7450,'Diamante III','DiamanteIII.png'),(7975,'Diamante IV','DiamanteIV.png'),(8525,'Diamante V','DiamanteV.png'),
(9100,'Diamante Negro I','DiamantenegroI.png'),(9700,'Diamante Negro II','DiamantenegroII.png'),(10325,'Diamante Negro III','DiamantenegroIII.png'),(10975,'Diamante Negro IV','DiamantenegroIV.png'),(11625,'Diamante Negro V','DiamantenegroV.png'),
(12300,'Élite I','EliteI.png'),(13000,'Élite II','EliteII.png'),(13725,'Élite III','EliteIII.png'),(14475,'Élite IV','EliteIV.png'),(15250,'Élite V','EliteV.png'),
(16050,'Maestro I','MaestroI.png'),(16875,'Maestro II','MaestroII.png'),(17725,'Maestro III','MaestroIII.png'),(18600,'Maestro IV','MaestroIV.png'),(19500,'Maestro V','MaestroV.png'),
(20425,'Gran Maestro I','GranmaestroI.png'),(21375,'Gran Maestro II','GranmaestroII.png'),(22350,'Gran Maestro III','GranmaestroIII.png'),(23350,'Gran Maestro IV','GranmaestroIV.png'),(24375,'Gran Maestro V','GranmaestroV.png'),
(25425,'MÍTICO I','MiticoI.png'),(26525,'MÍTICO II','MiticoII.png'),(27650,'MÍTICO III','MiticoIII.png'),(28800,'MÍTICO IV','MiticoIV.png'),(30000,'MÍTICO V','MiticoV.png')]
arr='const RANKS=[\n'+',\n'.join("  {min:%d,name:%r,image:'rangos/%s'}"%(a,b,c) for a,b,c in ranks)+'\n];'
s,n=re.subn(r"const RANKS=\[.*?\];",arr,s,count=1,flags=re.S); assert n==1
s=s.replace("const elo=Number.isFinite(Number(value))?Number(value):200;","const elo=Number.isFinite(Number(value))?Math.max(0,Number(value)):0;")
start=s.index('function makeRankSpriteTransparent'); end=s.index('async function abandonRankedMatch',start)
direct="""function applyRankBadge(el,rank){
  if(!el||!rank)return;
  el.textContent=''; el.setAttribute('aria-label','Insignia '+rank.name); el.title='Rango '+rank.name;
  el.style.backgroundImage='url(\\"'+rank.image+'\\")'; el.style.backgroundPosition='center';
  el.style.backgroundRepeat='no-repeat'; el.style.backgroundSize='contain';
}
async function renderRankBadge(arg1,arg2){
  if(arg1 instanceof HTMLElement){applyRankBadge(arg1,getRankByElo(arg2));return}
  applyRankBadge(rankBadgeImage,arg1);
}
async function renderPlayerDetailRankBadge(rank){applyRankBadge(playerDetailRankBadge,rank)}

"""
s=s[:start]+direct+s[end:]
s=re.sub(r"const renderVsRankBadge=async\(el,elo\)=>\{.*?\};","const renderVsRankBadge=async(el,elo)=>{if(!el)return;applyRankBadge(el,getRankByElo(elo));};",s,count=1,flags=re.S)
s=s.replace("if(versusMyRank)versusMyRank.textContent=String(match.my_rank_name||getRankByElo(match.my_elo).name).toUpperCase();","if(versusMyRank)versusMyRank.textContent=getRankByElo(match.my_elo).name.toUpperCase();")
s=s.replace("if(versusOpponentRank)versusOpponentRank.textContent=String(match.opponent_rank_name||getRankByElo(match.opponent_elo).name).toUpperCase();","if(versusOpponentRank)versusOpponentRank.textContent=getRankByElo(match.opponent_elo).name.toUpperCase();")
a=s.index('async function renderGuestRankShowcase'); b=s.index('async function loadGuestRanking',a)
showcase="""async function renderGuestRankShowcase(){
 if(!guestRankShowcase||guestRankShowcase.dataset.ready)return;
 guestRankShowcase.dataset.ready='1';
 RANKS.forEach(rank=>{const badge=document.createElement('span');badge.className='guest-showcase-badge';applyRankBadge(badge,rank);guestRankShowcase.appendChild(badge)});
}

"""
s=s[:a]+showcase+s[b:]
s=re.sub(r"const miniBadge=document\.createElement\('span'\);miniBadge\.className='guest-ranking-rank-badge';.*?info\.append\(n,rankLine\);","const miniBadge=document.createElement('span');miniBadge.className='guest-ranking-rank-badge';applyRankBadge(miniBadge,rank);\n   info.append(n,rankLine);",s,count=1,flags=re.S)
s=s.replace("elo.textContent=String(Number(player.elo_points)||200);","elo.textContent=String(Number.isFinite(Number(player.elo_points))?Number(player.elo_points):0);")
p.write_text(s,encoding='utf-8')
