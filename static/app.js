'use strict';

/* ============================================================
 *  설정은 index.html 맨 위 한 곳에서 관리합니다.
 *  (이 파일은 더 이상 직접 수정할 필요가 없습니다.)
 *
 *  바꾸실 곳:  index.html 의 <head> 안
 *      window.카톡링크 = '...';
 *      window.전화번호 = '...';
 *
 *  이 파일은 위 값을 읽어와, 페이지가 열릴 때
 *  모든 버튼의 실제 링크(href)를 직접 채워 넣습니다.
 * ============================================================ */

/* index.html에서 설정한 값을 읽어옴 (없으면 빈 값으로 처리) */
const 카톡링크 = window.카톡링크 || '';
const 전화번호 = window.전화번호 || '';

/**
 * 설정값을 실제 링크 형식으로 변환
 * - 카톡: 입력한 주소 그대로 (새 탭으로 열림)
 * - 전화: tel: 형식으로 변환 (숫자/하이픈/공백 제거)
 */
const LINKS = {
  kakao: 카톡링크,
  phone: 전화번호 ? `tel:${전화번호.replace(/[^0-9+]/g, '')}` : '',
};

/**
 * data-action 속성을 가진 모든 버튼(상담·하단·플로팅)의
 * 실제 href를 설정값으로 직접 채워 넣는다.
 * → 클릭뿐 아니라 주소 표시·우클릭 복사까지 전부 바뀐다.
 */
function applyLinksToButtons() {
  const buttons = document.querySelectorAll('[data-action]');

  buttons.forEach((button) => {
    const action = button.getAttribute('data-action');
    const target = LINKS[action];

    if (!target) {
      // 설정값이 비어 있으면 클릭 시 안내만 표시
      button.setAttribute('href', '#');
      return;
    }

    // 실제 링크를 href에 직접 박아 넣음
    button.setAttribute('href', target);

    if (action === 'kakao') {
      // 카톡은 새 탭으로 열기
      button.setAttribute('target', '_blank');
      button.setAttribute('rel', 'noopener noreferrer');
    } else {
      // 전화는 현재 창에서 바로 연결 (새 탭 속성 제거)
      button.removeAttribute('target');
    }
  });

  console.log(`Applied links to ${buttons.length} button(s).`, LINKS);
}

/**
 * 안전망: 설정값이 비어 있어 href="#"인 버튼을 클릭하면
 * "준비 중" 안내를 띄운다. (정상 링크는 브라우저가 그대로 처리)
 */
function initFallbackHandler() {
  document.body.addEventListener('click', (event) => {
    const link = event.target.closest('[data-action]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') {
      event.preventDefault();
      alert('준비 중입니다. 잠시만 기다려 주세요.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyLinksToButtons();
  initFallbackHandler();
  console.log('기부티켓 homepage initialized.');
});
