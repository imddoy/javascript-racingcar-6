class App {
  constructor() {
    this.carNames = [];
    this.tries = 0;
  }

  async play() {
    await this.getInputData();
    await this.startRacing();
  }

  async getInputData() {
    const names = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) "
    );
    this.validateNames(names); //이름의 유효성 검사하기
    this.cars = names.split(","); //쉼표 기준으로 나누기

    const tries = await MissionUtils.Console.readLineAsync(
      "시도할 횟수는 몇회인가요? "
    );
    this.validateTries(tries);
    this.tries = parseInt(tries, 10);
  }

  //이름 유효성 검사하기
  validateNames(names) {
    const nameList = names.split(","); //쉼표로 구분하여 배열에 넣기

    if (nameList.length < 1) {
      throw new Error("[ERROR] 적어도 한 대의 자동차 이름을 입력해야 합니다.");
    }

    if (nameList.some((name) => name.length > 5 || name.length < 1)) {
      throw new Error("[ERROR] 자동차 이름은 5자 이하로 입력해야 합니다.");
    }

    if (new Set(nameList).size !== nameList.length) {
      throw new Error("[ERROR] 중복된 자동차 이름이 있습니다.");
    }
  }

  //횟수 유효성 검사하기
  validateTries(tries) {
    if (isNaN(tries)) {
      throw new Error("[ERROR] 시도할 횟수는 숫자로 입력해야 합니다.");
    }

    if (parseInt(tries, 10) < 1) {
      throw new Error("[ERROR] 시도할 횟수는 1회 이상이어야 합니다.");
    }
  }

  //경주하기
  async startRacing() {
    MissionUtils.Console.print("\n실행 결과");
    //횟수만큼 반복
    for (let i = 0; i < this.tries; i++) {
      this.forwardCars();
      this.displayCars();
    }
  }

  //차 전진하기
  forwardCars() {
    const move = 0;
    this.cars = this.cars.map((name) => {
      const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
      if (randomNumber >= 4) {
        car.position++; // 4 이상이면 전진
      }
      return car;
    });
  }

  //결과 출력
  displayCars() {
    this.cars.forEach((car) => {
      const result = `${car.name} : ${"-".repeat(car.position)}`;
      MissionUtils.Console.print(result);
    });
    MissionUtils.Console.print("");
  }
}

export default App;
