const todoInput = document.querySelector('.todo-input');
const pending = document.querySelector('.pending');
const finished = document.querySelector('.finished');

let PENDING_LS = [];
let FINISHED_LS = [];

function createValue(task) {
  const obj = {
    id: String(new Date().getTime()),
    text: `${task}`,
  };
  writePending(obj);
  PENDING_LS.push(obj);
  setPendingLS();
  setFinishedLS();
}

function setPendingLS() {
  localStorage.setItem('PENDING', JSON.stringify(PENDING_LS));
}

function setFinishedLS() {
  localStorage.setItem('FINISHED', JSON.stringify(FINISHED_LS));
}

function getPendingLS() {
  const output = localStorage.getItem('PENDING');
  const arr = JSON.parse(output);
  return arr;
}

function getFinishedLS() {
  const output = localStorage.getItem('FINISHED');
  const arr = JSON.parse(output);
  return arr;
}

function refreshLS(arr) {
  if (arr === null) {
    return;
  } else {
    arr.forEach(e => {
      PENDING_LS.push(e);
    });
  }
}

function refreshFLS(arr) {
  if (arr === null) {
    return;
  } else {
    arr.forEach(e => {
      FINISHED_LS.push(e);
    });
  }
}

function loadPending() {
  const arr = getPendingLS();
  refreshLS(arr);
  refreshPending(arr);
}

function loadFinished() {
  const arr = getFinishedLS();
  refreshFLS(arr);
  refreshFinished(arr);
}

function refreshPending(arr) {
  if (arr === null) {
    return;
  } else {
    arr.forEach(element => {
      writePending(element);
    });
  }
}

function refreshFinished(arr) {
  if (arr === null) {
    return;
  } else {
    arr.forEach(element => {
      writeFinished(element);
    });
  }
}

function writePending(obj) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  const finBtn = document.createElement('button');
  li.setAttribute('id', obj.id);
  span.innerHTML = `${obj.text}`;
  delBtn.innerHTML = '❌';
  finBtn.innerHTML = '✅';
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  pending.appendChild(li);
  delBtn.addEventListener('click', () => {
    erasePending(li);
  });
  finBtn.addEventListener('click', () => {
    finishedLS(li);
  });
}

function writeFinished(obj) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  const backBtn = document.createElement('button');
  li.setAttribute('id', obj.id);
  span.innerHTML = `${obj.text}`;
  delBtn.innerHTML = '❌';
  backBtn.innerHTML = '⏪';
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  finished.appendChild(li);
  delBtn.addEventListener('click', () => {
    eraseFinished(li);
  });
  backBtn.addEventListener('click', () => {
    backLS(li);
  });
}

function erasePending(li) {
  li.parentNode.removeChild(li);
  const arr = getPendingLS();
  const getarr = arr.filter(e => {
    return e.id !== li.id;
  });
  PENDING_LS.length = 0;
  refreshLS(getarr);
  setPendingLS();
}

function eraseFinished(li) {
  li.parentNode.removeChild(li);
  const arr = getFinishedLS();
  const getarr = arr.filter(e => {
    return e.id !== li.id;
  });
  FINISHED_LS.length = 0;
  refreshFLS(getarr);
  setFinishedLS();
}

function finishedLS(li) {
  const arr = getPendingLS();
  const getarr = arr.find(e => {
    return e.id === li.id;
  });
  writeFinished(getarr);
  FINISHED_LS.push(getarr);
  setPendingLS(getarr);
  setFinishedLS(getarr);
  erasePending(li);
}

function backLS(li) {
  const arr = getFinishedLS();
  const getarr = arr.find(e => {
    return e.id === li.id;
  });
  writePending(getarr);
  PENDING_LS.push(getarr);
  setFinishedLS(getarr);
  setPendingLS(getarr);
  eraseFinished(li);
}

function addTask(event) {
  if (event.key === 'Enter') {
    const task = todoInput.value;
    todoInput.value = '';
    todoInput.focus();
    createValue(task);
  }
}

loadPending();
loadFinished();
todoInput.addEventListener('keypress', addTask);
