const screens = [...document.querySelectorAll('.screen')];
const triggers = [...document.querySelectorAll('[data-screen]')];
const currentTitle = document.getElementById('currentTitle');
const currentPage = document.getElementById('currentPage');
const composerPlaceholder = document.getElementById('composerPlaceholder');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const order = screens.map((s) => s.id);

const placeholderMap = {
  home: '무엇을 먼저 확인하시겠습니까?',
  why: '왜 이 형식을 선택했고, 과제 전략을 어떻게 녹였는지 확인해보세요.',
  profile: '강민구 기본 정보를 확인해보세요.',
  direction: '강민구는 어떤 분야를 지향하는가?',
  strength: '강점과 그것이 어떤 프로젝트에서 증명되는지 확인해보세요.',
  tools: '어떤 툴을 다룰 수 있는가?',
  process: '강민구는 어떻게 기획하는가?',
  awards: '수상과 신뢰성을 확인해보세요.',
  map: '다음으로 확인할 수 있는 작업들입니다.',
  'hr-intro': '대표 프로젝트 Heavy Rain을 살펴보세요.',
  'hr-world': '세계관과 시놉시스를 확인해보세요.',
  'hr-space': '공간 구조와 동선을 확인해보세요.',
  'hr-flow': '플레이어 경험 구조를 확인해보세요.',
  'hr-why': '왜 Heavy Rain이 대표작인가?',
  'video-intro': '영상 작업에서는 무엇을 가장 중요하게 보는가?',
  'video-projects': '대표 영상 작업을 살펴보세요.',
  'writing-intro': '희곡과 시나리오에서는 무엇을 설계하는가?',
  'writing-projects': '대표 서사 작업을 확인해보세요.',
  cross: '서로 다른 매체가 하나의 기획 언어로 어떻게 연결되는지 확인해보세요.',
  archive: '전체 작업 아카이브를 탐색해보세요.',
  closing: '왜 강민구여야 하는가?'
};

function getActiveScreen() {
  return screens.find((s) => s.classList.contains('active')) || screens[0];
}

function setScreen(id) {
  screens.forEach((s) => s.classList.toggle('active', s.id === id));
  triggers.forEach((btn) => {
    const isTarget = btn.dataset.screen === id;
    const isNav = btn.classList.contains('thread-btn') || btn.classList.contains('sidebar-btn');
    btn.classList.toggle('active', isTarget && isNav);
  });

  const active = screens.find((s) => s.id === id);
  currentTitle.textContent = active?.dataset.title || 'Home';
  currentPage.textContent = active?.dataset.page || '01';
  composerPlaceholder.textContent = placeholderMap[id] || placeholderMap.home;

  const idx = order.indexOf(id);
  prevBtn.disabled = idx <= 0;
  nextBtn.disabled = idx >= order.length - 1;
}

function moveSlide(direction) {
  const active = getActiveScreen();
  const currentIndex = order.indexOf(active.id);
  const nextIndex = currentIndex + direction;
  if (nextIndex >= 0 && nextIndex < order.length) {
    setScreen(order[nextIndex]);
  }
}

function isTypingContext(target) {
  if (!target) return false;
  const tag = target.tagName;
  return (
    target.isContentEditable ||
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT'
  );
}

triggers.forEach((btn) => btn.addEventListener('click', () => setScreen(btn.dataset.screen)));
prevBtn.addEventListener('click', () => moveSlide(-1));
nextBtn.addEventListener('click', () => moveSlide(1));

document.addEventListener('keydown', (event) => {
  if (isTypingContext(event.target)) return;

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      moveSlide(-1);
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      moveSlide(1);
      break;
    case 'Home':
      event.preventDefault();
      setScreen(order[0]);
      break;
    case 'End':
      event.preventDefault();
      setScreen(order[order.length - 1]);
      break;
    default:
      break;
  }
});

function updateFullscreenButton() {
  if (!fullscreenBtn) return;
  const isFullscreen = !!document.fullscreenElement;
  fullscreenBtn.textContent = isFullscreen ? '⤡' : '⤢';
  fullscreenBtn.setAttribute('aria-label', isFullscreen ? '전체화면 종료' : '전체화면');
}

if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  });

  document.addEventListener('fullscreenchange', updateFullscreenButton);
}

updateFullscreenButton();
setScreen('home');
