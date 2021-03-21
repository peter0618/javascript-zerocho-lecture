
let body = document.body;
let container = body.getElementsByClassName('flex-container').item(0);

main();


/**
 * lotto.html 문서가 열렸을 때 실행될 main 로직입니다.
 */
function main(){
    let lotteryBalls = makeLotteryBalls();
    executeLottery(lotteryBalls)
        .then((result) => {
            console.log('추첨 종료!!');
            console.log(result); // TODO : 이 부분에서 내가 입력한 lotto 에 대한 당첨여부를 확인하는 로직이 추가되어야 합니다.
        })
        .catch((e) => console.log(e));
}

/**
 * lotteryBalls 에서 로또 추첨볼을 랜덤하게 7개 뽑습니다.
 * @return {Promise<[]>}
 */
async function executeLottery(lotteryBalls){
    const result = [];
    for(let i = 0 ; i < 7 ; i++) {
        await sleep(1000)
        let selectedNumber = lotteryBalls.splice(chooseRandomIntegerBetweenTwoIntegers(0, lotteryBalls.length-1), 1)[0];
        drawBall(selectedNumber);
        result.push(selectedNumber);
    }
    return result;
}

/**
 * 비동기 지연 함수
 *
 * @param ms
 * @return {Promise<unknown>}
 */
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms))
}

/**
 * a, b 사이의 정수 중에서 임의의 수를 하나 선택하여 반환합니다.
 * @param a
 * @param b
 * @return {number}
 */
function chooseRandomIntegerBetweenTwoIntegers(a, b){
    return Math.min(a,b) + Math.floor(Math.random() * (Math.abs(a-b) + 1));
}

/**
 * 로또 추첨할 공들의 배열을 생성합니다.
 * @return {[]}
 */
function makeLotteryBalls(){
    let result = [];
    for(let i = 1 ; i <= 45 ; i++){
        result.push(i);
    }
    return result;
}

/**
 * 해당 숫자로 ball 을 화면에 그립니다.
 * TODO : 각 숫자 범위 별 ball/text 색상 변경 적용
 * @param number
 */
function drawBall(number){
    // console.log(`${number}번 공을 뽑았다!`);
    let ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = String(number);
    container.appendChild(ball);
}
