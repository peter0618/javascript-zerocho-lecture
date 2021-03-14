var body = document.body;
var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = '입력';
form.append(button);
var dashboard = document.createElement('div');
body.append(dashboard);
var list = document.createElement('ul');
dashboard.append(list);

var restartButton = document.createElement('button');
restartButton.textContent = '재시작';
restartButton.disabled = true;
restartButton.style.display = 'none';
dashboard.append(restartButton);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 숫자 4자리 validation
    // 숫자 4자리 문자열이 들어왔다고 가정합니다.
    if (input.value.length !== 4){
        alert('숫자는 4자리를 입력해야 합니다.');
        input.value = '';
        input.focus();
        return;
    }
    if (!isAllDistinct(input.value)) {
        alert('각 자리 숫자가 모두 달라야 합니다.');
        input.value = '';
        input.focus();
        return;
    }

    tryCount++;
    var trial = [];
    for(let number of input.value){
        trial.push(Number(number));
    }
    console.log(trial);

    const judgeResult = judge(trial, answer)
    console.log(`judgeResult : ${judgeResult}`);

    if(judgeResult !== 'Home Run'){
        let item = document.createElement('li');
        item.innerText = `${tryCount}회차 ${input.value} : ${judgeResult}`;
        list.append(item);
    } else {
        alert('정답입니다!!');
        let item = document.createElement('li');
        item.innerText = `${tryCount}회차 ${input.value} : ${judgeResult}`;
        list.append(item);

        input.disabled = true;
        button.disabled = true;
        let h1 = document.createElement('h1')
        h1.innerText = 'You Win!!';
        dashboard.append(h1);
        restartButton.disabled = false;
        restartButton.style.display = 'block';

        return;
    }

    // 시도횟수 도달 시, GameOver.
    if (tryCount === 10){
        alert('최대 시도횟수에 도달했습니다. GameOver!');

        input.disabled = true;
        button.disabled = true;
        let h1 = document.createElement('h1')
        h1.innerText = 'GameOver!!';
        dashboard.append(h1);
        restartButton.disabled = false;
        restartButton.style.display = 'block';
    }

    input.value = '';
    input.focus();
});

restartButton.addEventListener('click', () => {
    location.reload();
});


var answer = makeQuestionNumber2();
var tryCount = 0;

console.log(answer);

// 랜덤한 4자리 숫자배열을 생성하여 리턴합니다.
function makeQuestionNumber(){
    let set = new Set();
    while(set.size < 4){
        let newNumber = Math.floor(Math.random() * 10);
        set.add(newNumber);
    }
    return Array.from(set);
}

// 랜덤한 4자리 숫자배열을 생성하여 리턴합니다. (다른 방법)
// 배열에서 item 을 추출 또는 배열에 item 을 추가하는 방법: pop, push, shift, unshift
function makeQuestionNumber2(){
    let numberCandidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let numbers = [];
    for (let i = 0 ; i < 4 ; i++ ) {
        numbers.push(numberCandidate.splice(Math.floor(Math.random() * (numberCandidate.length)), 1)[0]);
    }
    return numbers;
}

/**
 * 입력받은 수의 각 자리수가 다른지 확인합니다.
 *
 * @param numbers
 * @return {boolean}
 */
function isAllDistinct(numbers){
    let set = new Set();
    for(let number of numbers){
        set.add(number);
    }
    return set.size === numbers.length;
}

/**
 * 스트라이크,볼 개수 또는 아웃 또는 홈런 여부를 판정합니다.
 * 예1) 1S2B
 * 예2) 3B
 * 예3) Out
 * 예4) Home Run!
 *
 * @param trial
 * @param answer
 */
function judge(trial, answer) {
    let countS = 0;
    let countB = 0;
    for(let i = 0 ; i < 4 ; i++){
        for(let j = 0 ; j < 4 ; j++){
            if(trial[i] === answer[j]){
                if(i === j){
                    countS++;
                } else{
                    countB++;
                }
            }
        }
    }
    if(countS === 0 && countB === 0){
        return 'Out';
    }
    if(countS === 4){
        return 'Home Run';
    }
    let result = '';
    if(countS > 0){
        result = `${countS}S`;
    }
    if(countB > 0){
        if(countS > 0){
            result += ' ';
        }
        result += `${countB}B`;
    }
    return result;
}
