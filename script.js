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

// 저장 버튼 클릭 시 알림 표시
document.getElementById('saveBtn').addEventListener('click', () => {
  alert('저장할 카드: ' + Array.from(selected).join(', '));
});
