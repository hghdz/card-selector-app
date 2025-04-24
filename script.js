document.getElementById('saveBtn').addEventListener('click', () => {
  const cardsArray = Array.from(selected);
  if (!cardsArray.length) return alert('카드를 먼저 선택해 주세요');

  // 유니크 콜백 함수명
  const callbackName = 'jsonpCallback_' + Date.now();
  window[callbackName] = data => {
    alert('저장 성공: ' + cardsArray.join(', '));
    delete window[callbackName];
  };

  // 스크립트 태그 동적 생성
  const script = document.createElement('script');
  const base = 'https://script.google.com/macros/s/AKfycbz4-fsDlRnmD8PGsCc7raVf6YnhTZsaMVi7lf-Mrmm2SylgPfJ84Iy-r55yV9g5dq7m/exec'; // 끝에 /exec 붙여서
  const query = 
    '?callback=' + callbackName +
    '&userId='   + encodeURIComponent('student123') +
    '&cards='    + encodeURIComponent(JSON.stringify(cardsArray));
  script.src = base + query;
  document.body.appendChild(script);
});
