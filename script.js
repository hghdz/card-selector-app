// script.js

// 0) 디버깅용 로그
console.log('✅ script.js 로드됨');

// 1) DOM 준비 시 실행되도록 래핑
document.addEventListener('DOMContentLoaded', () => {
  // 2) 카드 이미지 파일명 배열
  const images = ['card1.png', 'card2.png', 'card3.png'];
  const container = document.getElementById('cards-container');
  const selected = new Set();

  console.log('📦 images 배열:', images);

  // 3) 카드 렌더링
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

  // 4) 저장 버튼 핸들러 (JSONP)
  document.getElementById('saveBtn').addEventListener('click', () => {
    const cardsArray = Array.from(selected);
    console.log('💾 저장 시도, 선택:', cardsArray);
    if (!cardsArray.length) {
      alert('카드를 먼저 선택해 주세요');
      return;
    }

    const callbackName = 'jsonpCB_' + Date.now();
    window[callbackName] = (response) => {
      console.log('🔔 JSONP 응답:', response);
      alert(response.status === 'success'
        ? '저장 성공: ' + cardsArray.join(', ')
        : '저장 실패');
      delete window[callbackName];
    };

    const base = 'https://script.google.com/macros/s/AKfycbwMj9ROJZU_9skVqHvg7zr--AdABGF5tOUdPEqa533eF94V_Ht-DAOvznoYEPx9TiYp/exec';
    const params = [
      'callback=' + callbackName,
      'userId='   + encodeURIComponent('student123'),
      'cards='    + encodeURIComponent(JSON.stringify(cardsArray))
    ].join('&');

    const s = document.createElement('script');
    s.src = `${base}?${params}`;
    document.body.appendChild(s);
  });
});
