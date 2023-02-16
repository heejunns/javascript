const $screen = document.querySelector('#screen');
const $restart = document.querySelector('#restart');

let startTime; // 화면이 연두색으로 바뀔때 시간을 기록하는 변수
let endTime; // 연두색인 화면을 클릭했을때의 시간을 기록하는 변수
let records = [];
const clickScreen = () => {
  // 화면 클릭을 하면 호출되는 함수
  if ($screen.className === 'wait') {
    // 화면이 빨간색일때 클릭한다
    $screen.classList.replace('wait', 'prepare'); // prepare 로 클래스 이름 변경
    $screen.textContent = '곧 반응속도 테스트가 시작 됩니다!';
    setTimeout(() => {
      if ($screen.className === 'prepare') {
        // 화면이 파란색이라면
        $screen.classList.replace('prepare', 'start'); // start 로 클래스 이름 변경
        startTime = new Date(); // 화면이 연두색으로 바뀔때 시간 기록
      }
    }, Math.floor(Math.random() * 1000) + 2000); // 2~3 초 사이에 랜덤으로 변경
  } else if ($screen.className == 'prepare') {
    // 화면이 파란색일때 클릭한다면
    alert(
      '테스트 준비 중에 화면을 클릭하셨습니다. 테스트 대기 상태로 돌아 갑니다.'
    );
    $screen.classList.replace('prepare', 'wait'); // 클래스 이름 wait 로 변경
    $screen.textContent = '다시 시작하기';
  } else if ($screen.className == 'start') {
    // 화면이 연두색일때 클릭한다면
    endTime = new Date(); // 클릭 시간 기록
    const record = endTime - startTime; // 반응속도
    records.push(record); // 배열에 저장하기
    const average =
      records.reduce(function (a, b) {
        // 배열의 모든 값을 더하고 배열의 길이로 나누어 평균 구하기
        return a + b;
      }) / records.length;
    $screen.textContent = `반응 시간 :  ${record} ms , 평균 반응시간 : ${average} ms`; // 화면에 보여주기}
    startTime = null;
    endTime = null;
  }
};

$screen.addEventListener('click', clickScreen);
$restart.addEventListener('click', () => {
  $screen.textContent = '화면을 클릭 해주세요!';
  $screen.classList.remove('start');
  $screen.classList.add('wait');
});
