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
    this.carNames = names.split(","); //쉼표 기준으로 나누기
  }

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
}

export default App;
