// 1) 카드 이미지 파일명 배열 (필요에 따라 파일명 추가)
const images = ['card1.png', 'card2.png', 'card3.png'];
const container = document.getElementById('cards-container');
const selected = new Set();

// 2) 카드 렌더링 & 클릭 토글
images.forEach(name => {
  const card = document.createElement('div');
  card.className = 'card';
  const img = document.createElement('img');
  img.src = 'images/' + name;
  card.appendChild(img);

  card.addEventListener('click', () => {
    if (selected.has(name)) {
      selected.delete(name);
      card.classList.remove('selected');
    } else {
      selected.add(name);
      card.classList.add('selected');
    }
    console.log('현재 선택:', Array.from(selected));
  });

  container.appendChild(card);
});

// 3) 저장 버튼 클릭 시 JSONP 호출
document.getElementById('saveBtn').addEventListener('click', () => {
  const cardsArray = Array.from(selected);
  if (!cardsArray.length) {
    alert('카드를 먼저 선택해 주세요');
    return;
  }

  // 고유 콜백 함수명 생성
  const callbackName = 'jsonpCB_' + Date.now();
  window[callbackName] = (response) => {
    if (response.status === 'success') {
      alert('저장 성공: ' + cardsArray.join(', '));
    } else {
      alert('저장 실패');
      console.error(response);
    }
    delete window[callbackName];
  };

  // JSONP 요청용 <script> 태그 생성
  const base = 'https://script.google.com/macros/s/AKfycbz4-fsDlRnmD8PGsCc7raVf6YnhTZsaMVi7lf-Mrmm2SylgPfJ84Iy-r55yV9g5dq7m/exec'; // 예: https://script.google.com/macros/s/.../exec
  const params = [
    'callback=' + callbackName,
    'userId='   + encodeURIComponent('student123'),
    'cards='    + encodeURIComponent(JSON.stringify(cardsArray))
  ].join('&');

  const jsonpScript = document.createElement('script');
  jsonpScript.src = `${base}?${params}`;
  document.body.appendChild(jsonpScript);
});
