var body = document.body;
var word = document.createElement('div');
word.textContent = '오렌지';
body.append(word);

var form = document.createElement('form');
body.append(form);

var input = document.createElement('input');
form.appendChild(input);
var button = document.createElement('button');
button.textContent = '입력';
form.appendChild(button);

var result = document.createElement('div');
body.append(result);

form.addEventListener('submit', function(e) { // 콜백함수
    e.preventDefault(); // form 의 원래 동작은 화면 refresh 를 하는 것인데, 이를 막는다.
    if (word.textContent[word.textContent.length - 1] === input.value[0]) {
        result.textContent = '딩동댕!';
        word.textContent = input.value;
    } else {
        result.textContent = '땡!';
    }
    input.value = '';
    input.focus();
});
