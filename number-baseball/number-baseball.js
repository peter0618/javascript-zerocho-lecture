// 1) 랜덤한 4자리 숫자 만들기
var answer = makeQuestionNumber();
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
