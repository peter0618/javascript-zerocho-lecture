let turn = 'X'; // 턴이 넘어갈 때마다 X | O 로 스위칭됨.
function changeTurn(){
    if(turn === 'X'){
        turn = 'O';
    } else if(turn === 'O') {
        turn = 'X';
    }
}

let body = document.body;

// 테이블 셋팅
let table = document.createElement('table');
let blanks = []; // 3 X 3 metrics (9개이 td 와 각각 매핑됨)
for(let i = 0 ; i < 3 ; i++){
    let tr = document.createElement('tr');
    blanks.push([]);
    for(let j = 0 ; j < 3 ; j++){
        let td = document.createElement('td');
        blanks[i].push(td);
        tr.appendChild(td);
        // td.addEventListener('click', () =>{
        //     td.innerText = turn;
        //     changeTurn();
        // });
        td.addEventListener('click', onTdClick);
    }
    table.appendChild(tr);
}
body.appendChild(table);

// 재시작 버튼 셋팅
let restartButton = document.createElement('button');
restartButton.innerText = '재시작';
restartButton.style.visibility = 'hidden';
restartButton.addEventListener('click', onRestart);
body.appendChild(restartButton);

function onRestart(){
    // 1) 테이블 데이터 초기화 및 클릭 이벤트 리스너 추가
    blanks.forEach( row => {
        row.forEach( col => {
            col.innerText = '';
            col.addEventListener('click', onTdClick);
        });
    });
    // 2) 테이블 스타일 초기화
    table.classList.remove('end-game-table');

    // 3) 재시작 버튼 숨기기
    restartButton.style.visibility = 'hidden';
}

function onTdClick(e){
    let td = e.target;
    // 1) 이미 채워진 칸인지 확인
    if(td.innerText === 'O' || td.innerText === 'X'){
        alert('이미 채워진 칸입니다!');
        return;
    }

    // 2) 칸에 X (또는 O) 입력
    td.innerText = turn;
    // afterSetInnerTextAtTd();
    // fixme: timeout 을 주지 않으면 innerText 에 turn 을 입력한 부분이 랜더링되기 전에 다음 로직이 실행되어 우선 timeout 으로 처리함.
    setTimeout(() => {
        afterSetInnerTextAtTd();
    },100);
}

function afterEndingGame(){
    table.classList.add('end-game-table');
    restartButton.style.visibility = 'visible';
}

function afterSetInnerTextAtTd() {
    // 3) 승리 판정 후, 이번턴에 승리했으면 '승리 메시지' 를 화면에 보여줌
    if(isThisTurnWin()){
        alert(`GameOver! ${turn} Win!!`);
        // 클릭 이벤트 리스너 해제
        for(let i = 0 ; i < 3 ; i++){
            blanks[i].forEach(item => item.removeEventListener('click', onTdClick));
        }
        afterEndingGame();
        return;
    }

    // 4) 승리판정 실패 후, 확인했을 때 모든 칸이 채워져 있으면 '무승부 메시지' 를 화면에 보여줌.
    if(!isBlankLeft()){
        alert('Draw!!');
        // 클릭 이벤트 리스너 해제
        for(let i = 0 ; i < 3 ; i++){
            blanks[i].forEach(item => item.removeEventListener('click', onTdClick));
        }
        afterEndingGame();
        return;
    }

    changeTurn();
}

/**
 * 빈칸 존재 여부 판정
 * @return {boolean}
 */
function isBlankLeft() {
    let blankCount = 0;
    blanks.forEach( row => {
        row.forEach( col => {
            if(col.innerText === ''){
                blankCount++;
            }
        });
    });
    return blankCount !== 0;
}

/**
 * 승리판정 (가로/세로/대각선 중 한줄이 만들어진 것이 있는지 확인)
 * @return {boolean}
 */
function isThisTurnWin(){
    // 가로 비교
    for(let i = 0 ; i < 3 ; i++){
        if(blanks[i][0].innerText === turn && blanks[i][1].innerText === turn && blanks[i][2].innerText === turn){
            return true;
        }
    }

    // 세로 비교
    for(let i = 0 ; i < 3 ; i++){
        if(blanks[0][i].innerText === turn && blanks[1][i].innerText === turn && blanks[2][i].innerText === turn){
            return true;
        }
    }

    // 대각선 비교 1 (\)
    if(blanks[0][0].innerText === turn && blanks[1][1].innerText === turn && blanks[2][2].innerText === turn){
        return true;
    }

    // 대각선 비교 2 (/)
    if(blanks[0][2].innerText === turn && blanks[1][1].innerText === turn && blanks[2][0].innerText === turn){
        return true;
    }

    return false;
}
