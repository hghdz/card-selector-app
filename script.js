console.log('✅ script.js 로드됨');

document.getElementById('saveBtn').addEventListener('click', () => {
  console.log('🖱️ 저장 버튼 클릭됨, 선택된 카드:', Array.from(selected));
  // ...fetch 호출 부분...
});


// 사용할 이미지 파일명 배열
const images = ['card1.png', 'card2.png', 'card3.png'];
const container = document.getElementById('cards-container');
const selected = new Set();

// 카드 렌더링 & 클릭 토글
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

// (위에는 그대로 두세요: images, container, selected 설정 등)


console.log('✅ script.js 로드됨');

document.getElementById('saveBtn').addEventListener('click', () => {
  console.log('🖱️ 저장 버튼 클릭됨, 선택된 카드:', Array.from(selected));
  // ...fetch 호출 부분...
});


// 저장 버튼 클릭 시 GAS Web App 호출
document.getElementById('saveBtn').addEventListener('click', () => {
  const cardsArray = Array.from(selected);
  if (cardsArray.length === 0) {
    return alert('하나 이상의 카드를 선택해 주세요!');
  }

  fetch('https://script.google.com/macros/s/AKfycbyr7DObqKS8id4QCMcZ6D4O_3iVbnOCXwVjCVjyz_Zbh6G-uvKQh4FYJzkjIt1y9b_e/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'student123',   // 나중에 동적 값으로 바꿔도 OK
      cards: cardsArray
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      alert('저장 성공: ' + cardsArray.join(', '));
    } else {
      alert('저장 실패: 서버 응답 이상');
      console.error(data);
    }
  })
  .catch(err => {
    alert('오류 발생: ' + err.message);
    console.error(err);
  });
});
