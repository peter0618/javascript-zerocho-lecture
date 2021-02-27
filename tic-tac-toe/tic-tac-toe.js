let turn = 'X'; // 턴이 넘어갈 때마다 X | O 로 스위칭됨.
function changeTurn(){
    if(turn === 'X'){
        turn = 'O';
    } else if(turn === 'O') {
        turn = 'X';
    }
}

let body = document.body;
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

function onTdClick(e){
    let td = e.target;
    // 1) 이미 채워진 칸인지 확인
    if(td.innerText === 'O' || td.innerText === 'X'){
        alert('이미 채워진 칸입니다!');
        return;
    }

    // 2) 칸에 X (또는 O) 입력
    td.innerText = turn;

    // timeout 을 주지 않으면 innerText 에 turn 을 입력한 부분이 랜더링되기 전에 다음 로직이 실행됨.
    setTimeout(() => {
        // 3) 승리 판정 후, 이번턴에 승리했으면 '승리 메시지' 를 화면에 보여줌
        if(isThisTurnWin()){
            alert(`GameOver! ${turn} Win!!`);
            // 클릭 이벤트 리스너 해제
            for(let i = 0 ; i < 3 ; i++){
                blanks[i].forEach(item => item.removeEventListener('click', onTdClick));
            }
            // TODO : 게임 종료 및 재시작 버튼 노출 등 처리 (재시작 버튼 클릭 시 초기화)
            return;
        }



        if(isAllBlankLoaded()){
            alert('Draw!!');
            // 클릭 이벤트 리스너 해제
            for(let i = 0 ; i < 3 ; i++){
                blanks[i].forEach(item => item.removeEventListener('click', onTdClick));
            }
            // TODO : 게임 종료 및 재시작 버튼 노출 등 처리 (재시작 버튼 클릭 시 초기화)
            return;
        }

        changeTurn();
    },100);
}

function isAllBlankLoaded() {
    // TODO : 모든 칸에 X 또는 O 가 채워져 있으면, 무승부! && 게임 종료 (재시작 버튼 노출 등 처리)
    return false;
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

    // 대각선 비교 1
    if(blanks[0][0].innerText === turn && blanks[1][1].innerText === turn && blanks[2][2].innerText === turn){
        return true;
    }

    // 대각선 비교 2
    if(blanks[0][2].innerText === turn && blanks[1][1].innerText === turn && blanks[2][0].innerText === turn){
        return true;
    }

    return false;
}


