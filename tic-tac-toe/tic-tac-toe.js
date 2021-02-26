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
        td.addEventListener('click', (e) => {
            onTdClick(td); // cf e.target
        });
    }
    table.appendChild(tr);
}
body.appendChild(table);

function onTdClick(td){
    // 1) 이미 채워진 칸인지 확인
    if(td.innerText === 'O' || td.innerText === 'X'){
        alert('이미 채워진 칸입니다!');
        return;
    }

    // 2) 칸에 X (또는 O) 입력
    td.innerText = turn;

    // 3) TODO : 승리판정 (가로/세로/대각선 중 한줄이 만들어진 것이 있는지 확인)

    // 3-1) TODO : 이번턴에 승리했으면 '승리 메시지' 를 화면에 보여줌. && 게임 종료 (재시작 버튼 노출 등 처리)

    // 4) TODO : 모든 칸에 X 또는 O 가 채워져 있으면, 무승부! && 게임 종료 (재시작 버튼 노출 등 처리)

    changeTurn();
}



