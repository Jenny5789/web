// ========== 상품 데이터 (총 10개) ==========
const products = [
  { id: 1, name: "노트북", price: 1200000 },
  { id: 2, name: "마우스", price: 30000 },
  { id: 3, name: "키보드", price: 80000 },
  { id: 4, name: "모니터", price: 350000 },
  { id: 5, name: "웹캠", price: 95000 },
  { id: 6, name: "헤드셋", price: 120000 },
  { id: 7, name: "USB 허브", price: 25000 },
  { id: 8, name: "외장 SSD", price: 89000 },
  { id: 9, name: "무선 충전기", price: 45000 },
  { id: 10, name: "태블릿", price: 680000 }
];

// ========== 학생 데이터 ==========
const students = [
  { id: 1, name: "김민준", score: 95 },
  { id: 2, name: "이서연", score: 72 },
  { id: 3, name: "박지호", score: 88 },
  { id: 4, name: "최수아", score: 61 },
  { id: 5, name: "정우진", score: 79 },
  { id: 6, name: "한예은", score: 93 },
  { id: 7, name: "오민서", score: 55 },
  { id: 8, name: "윤도현", score: 84 },
  { id: 9, name: "임지우", score: 67 },
  { id: 10, name: "강하은", score: 91 }
];

// ========== 탭 전환 ==========
function showTab(tabName, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabName).classList.add('active');
  btn.classList.add('active');
}

// ========== 상품 ==========

// id 입력 → find
function searchById() {
  const id = parseInt(document.getElementById('productIdInput').value);
  const found = products.find(p => p.id === id);
  document.getElementById('product-find').innerHTML = found
    ? `<div class="item">${found.name} - ${found.price.toLocaleString()}원</div>`
    : `<div class="item">해당 id의 상품이 없습니다.</div>`;
}

// 금액 입력 → filter
function searchByPrice() {
  const price = parseInt(document.getElementById('productPriceInput').value);
  const filtered = products.filter(p => p.price >= price);
  document.getElementById('product-filter').innerHTML = filtered.length > 0
    ? filtered.map(p => `<div class="item">${p.name} - ${p.price.toLocaleString()}원</div>`).join('')
    : `<div class="item">해당 금액 이상의 상품이 없습니다.</div>`;
}

function renderProducts() {
  // map
  const names = products.map(p => p.name);
  document.getElementById('product-map').innerHTML =
    `<div class="item">${names.join(', ')}</div>`;

  // localStorage 저장 후 불러오기
  localStorage.setItem('products', JSON.stringify(products));
  const saved = JSON.parse(localStorage.getItem('products'));
  document.getElementById('product-saved').innerHTML =
    saved.map(p => `<div class="item">${p.id}. ${p.name} - ${p.price.toLocaleString()}원</div>`).join('');
}

// ========== 학생 ==========

// id 입력 → find
function searchStudentById() {
  const id = parseInt(document.getElementById('studentIdInput').value);
  const found = students.find(s => s.id === id);
  document.getElementById('student-find').innerHTML = found
    ? `<div class="item">${found.name} - ${found.score}점</div>`
    : `<div class="item">해당 id의 학생이 없습니다.</div>`;
}

// 점수 입력 → filter
function searchByScore() {
  const score = parseInt(document.getElementById('studentScoreInput').value);
  const filtered = students.filter(s => s.score >= score);
  document.getElementById('student-filter').innerHTML = filtered.length > 0
    ? filtered.map(s => `<div class="item">${s.name} - ${s.score}점</div>`).join('')
    : `<div class="item">해당 점수 이상의 학생이 없습니다.</div>`;
}

function renderStudents() {
  // map
  const names = students.map(s => s.name);
  document.getElementById('student-map').innerHTML =
    `<div class="item">${names.join(', ')}</div>`;

  // localStorage 저장 후 불러오기
  localStorage.setItem('students', JSON.stringify(students));
  const saved = JSON.parse(localStorage.getItem('students'));
  document.getElementById('student-saved').innerHTML =
    saved.map(s => `<div class="item">${s.id}. ${s.name} - ${s.score}점</div>`).join('');
}

// ========== To-Do List ==========
let todos = [];
let currentFilter = 'all';

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (text === '') { alert('할 일을 입력해주세요.'); return; }

  todos.push({ id: Date.now(), text: text, status: 'todo' });
  saveToLocalStorage();
  render();
  input.value = '';
}

// find 사용 - 완료 토글
function toggleTodo(id) {
  const target = todos.find(t => t.id === id);
  if (target) {
    target.status = target.status === 'todo' ? 'done' : 'todo';
  }
  saveToLocalStorage();
  render();
}

// filter 사용 - 삭제
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveToLocalStorage();
  render();
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// filter, map 사용 - 화면 렌더링
function render() {
  const listEl = document.getElementById('todoList');
  const countEl = document.getElementById('count');

  let filtered = todos;
  if (currentFilter === 'todo') filtered = todos.filter(t => t.status === 'todo');
  else if (currentFilter === 'done') filtered = todos.filter(t => t.status === 'done');

  const doneCount = todos.filter(t => t.status === 'done').length;
  countEl.textContent = `전체 ${todos.length}개 · 완료 ${doneCount}개`;

  if (filtered.length === 0) {
    listEl.innerHTML = '<div class="empty">할 일이 없습니다.</div>';
    return;
  }

  listEl.innerHTML = filtered.map(t => `
    <div class="todo-item ${t.status === 'done' ? 'done' : ''}">
      <input type="checkbox" ${t.status === 'done' ? 'checked' : ''} onchange="toggleTodo(${t.id})">
      <span class="todo-text">${t.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${t.id})">✕</button>
    </div>
  `).join('');
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('todos');
  if (saved) todos = JSON.parse(saved);
}

// ========== 초기화 ==========
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderStudents();
  loadFromLocalStorage();
  render();

  document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTodo();
  });
});