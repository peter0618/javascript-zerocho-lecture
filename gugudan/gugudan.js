var body = document.body;
var question = document.createElement('div');
body.append(question);

var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
input.type = 'number'; // input 태그에서 입력을 숫자로 제한합니다. (입력받은 숫자가 number 타입은 아닙니다. string 타입으로 전달받습니다.)
form.appendChild(input);
var button = document.createElement('button');
button.textContent = '입력';
form.appendChild(button);

var number1;
var number2;

makeQuestion();

form.addEventListener('submit', function(e) { // 콜백함수
    e.preventDefault(); // form 의 원래 동작은 화면 refresh 를 하는 것인데, 이를 막는다.
    if (Number(input.value) === number1 * number2) {
        alert('정답입니다! 당신은 천재인가요??');
        // 문제를 다시 출제합니다.
        makeQuestion();
    } else {
        alert('오답입니다.ㅠㅠ 다시 도전하세요!!');
    }
    input.value = '';
    input.focus();
});

function makeQuestion(){
    number1 = Math.floor(Math.random() * 9) + 1;
    number2 = Math.floor(Math.random() * 9) + 1;
    question.innerText = `${number1} 곱하기 ${number2} 는 ?`;
}
