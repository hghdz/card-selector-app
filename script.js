// script.js

// 디버깅: 파일이 잘 로드됐는지 확인
console.log('✅ script.js 로드됨');

document.addEventListener('DOMContentLoaded', () => {
  // 1) 카드 이미지 목록
  const images = ['card1.png', 'card2.png', 'card3.png'];
  const container = document.getElementById('cards-container');
  const selected = new Set();

  console.log('📦 images 배열:', images);

  // 2) 카드 렌더링 & 클릭 핸들러
  images.forEach(name => {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = 'images/' + name;
    card.appendChild(img);
    container.appendChild(card);

    card.addEventListener('click', () => {
      if (selected.has(name)) {
        selected.delete(name);
        card.classList.remove('selected');
      } else {
        selected.add(name);
        card.classList.add('selected');
      }
      console.log('🖱️ 클릭됨:', name, '선택목록:', Array.from(selected));
    });
  });

 // … your rendering code above …

// 4) 저장 버튼 핸들러 (JSONP)
saveBtn.addEventListener('click', () => {
  const cardsArray = Array.from(selected);
  if (!cardsArray.length) {
    alert('카드를 먼저 선택해 주세요');
    return;
  }

  const callbackName = 'jsonpCB_' + Date.now();
  window[callbackName] = response => {
    console.log('🔔 JSONP 응답:', response);
    alert(response.status === 'success'
      ? '저장 성공: ' + cardsArray.join(', ')
      : '저장 실패');
    delete window[callbackName];
  };

  // ← 여기를 Web App URL로 바꿔 주세요 (스프레드시트 URL 아님)
  const base = 'https://script.google.com/macros/s/AKfycbwMj9ROJZU_9skVqHvg7zr--AdABGF5tOUdPEqa533eF94V_Ht-DAOvznoYEPx9TiYp/exec';

  const params = [
    'callback=' + callbackName,
    'userId='   + encodeURIComponent('student123'),
    'cards='    + encodeURIComponent(JSON.stringify(cardsArray))
  ].join('&');

  const jsonpScript = document.createElement('script');
  jsonpScript.src = `${base}?${params}`;
  document.body.appendChild(jsonpScript);
});

