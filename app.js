
const screens=[...document.querySelectorAll('.screen')];
const triggers=[...document.querySelectorAll('[data-screen]')];
const currentTitle=document.getElementById('currentTitle');
const currentPage=document.getElementById('currentPage');
const composerPlaceholder=document.getElementById('composerPlaceholder');
const prevBtn=document.getElementById('prevBtn');
const nextBtn=document.getElementById('nextBtn');
const order=screens.map(s=>s.id);
const placeholderMap={
  home:'무엇을 먼저 확인하시겠습니까?',
  why:'왜 포트폴리오를 이런 방식으로 만들었는가?',
  profile:'강민구 기본 정보를 확인해보세요.',
  direction:'강민구는 어떤 분야를 지향하는가?',
  strength:'강민구의 핵심 강점은 무엇인가?',
  tools:'어떤 툴을 다룰 수 있는가?',
  process:'강민구는 어떻게 기획하는가?',
  awards:'수상과 신뢰성을 확인해보세요.',
  map:'다음으로 확인할 수 있는 작업들입니다.',
  'hr-intro':'대표 프로젝트 Heavy Rain을 살펴보세요.',
  'hr-world':'세계관과 시놉시스를 확인해보세요.',
  'hr-space':'공간 구조와 동선을 확인해보세요.',
  'hr-flow':'플레이어 경험 구조를 확인해보세요.',
  'hr-why':'왜 Heavy Rain이 대표작인가?',
  'video-intro':'영상 작업에서는 무엇을 가장 중요하게 보는가?',
  'video-projects':'대표 영상 작업을 살펴보세요.',
  'writing-intro':'희곡과 시나리오에서는 무엇을 설계하는가?',
  'writing-projects':'대표 서사 작업을 확인해보세요.',
  cross:'왜 서로 다른 매체를 다루는가?',
  archive:'전체 작업 아카이브를 탐색해보세요.',
  closing:'왜 강민구여야 하는가?'
};
function setScreen(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  triggers.forEach(btn=>btn.classList.toggle('active',btn.dataset.screen===id && (btn.classList.contains('thread-btn')||btn.classList.contains('sidebar-btn'))));
  const active=screens.find(s=>s.id===id);
  currentTitle.textContent=active?.dataset.title||'Home';
  currentPage.textContent=active?.dataset.page||'01';
  composerPlaceholder.textContent=placeholderMap[id]||placeholderMap.home;
  const idx=order.indexOf(id);
  prevBtn.disabled=idx<=0; nextBtn.disabled=idx>=order.length-1;
}
triggers.forEach(btn=>btn.addEventListener('click',()=>setScreen(btn.dataset.screen)));
prevBtn.addEventListener('click',()=>{const i=order.indexOf(screens.find(s=>s.classList.contains('active')).id); if(i>0) setScreen(order[i-1]);});
nextBtn.addEventListener('click',()=>{const i=order.indexOf(screens.find(s=>s.classList.contains('active')).id); if(i<order.length-1) setScreen(order[i+1]);});
setScreen('home');
