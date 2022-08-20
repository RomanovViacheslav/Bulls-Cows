const readline = require("readline");
const clc = require("cli-color");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generationNum = () => {
  const arrNumber = [];
  let number = [];
  const numLength = Math.floor(Math.random() * (7 - 3) + 3);

  const getRandomNum = () => {
    const randomNum = Math.floor(Math.random() * 10);
    return randomNum;
  };

  for (let i = 0; i <= Infinity; i++) {
    number = getRandomNum();
    if (!arrNumber.includes(number)) {
      arrNumber.push(number);
    }
    if (arrNumber.length === numLength) {
      break;
    }
  }
  return arrNumber;
};

const playBullsAndCows = () => {
  let round = 0;
  const compNum = generationNum();

  const playGame = (userNumber) => {
    const userNum = userNumber;
    const matchPlace = [];
    const matchNotPlace = [];

    compNum.forEach((elem, index) => {
      userNum.forEach((item, ind) => {
        if (elem == item && index === ind) {
          matchPlace.push(item);
        }
        if (elem == item && index !== ind) {
          matchNotPlace.push(item);
        }
      });
    });
    console.log(clc.blue(`Вы ввели: ${userNum}`));

    console.log(
      clc.yellowBright(
        `Cовпавших цифр не на своих местах - ${matchNotPlace.length} (${matchNotPlace}), цифр на своих местах - ${matchPlace.length} (${matchPlace})`
      )
    );
    round++;

    if (matchPlace.length === compNum.length) {
      console.log(clc.green("Вы победили!"));
      rl.close();
      process.exit(1);
    }

    if (round === compNum.length) {
      console.log(clc.xterm(206)("Игра закончена!"));
      rl.close();
      process.exit(1);
    }

    rl.question(`Введите ${compNum.length} цифр(ы): `, setUserNum);
  };

  const setUserNum = (answer) => {
    if (!answer.trim()) {
      console.log(clc.red(`Вы не ввели цифры!`));
      rl.question(`Введите ${compNum.length} цифр(ы): `, setUserNum);
    } else if (isNaN(answer)) {
      console.log(clc.red(`Ввести можно только цифры!`));
      rl.question(`Введите ${compNum.length} цифр(ы): `, setUserNum);
    } else if (answer.length !== compNum.length) {
      console.log(clc.red(`Вводимых цифр должно быть ровно ${compNum.length}`));
      rl.question(`Введите ${compNum.length} цифр(ы): `, setUserNum);
    } else {
      playGame(answer.split(""));
    }
  };
  console.log(
    clc.cyan(
      `У вас есть ${compNum.length} хода(ов) угадать число из ${compNum.length} цифр(ы). Удачи!`
    )
  );
  rl.question(`Введите ${compNum.length} цифр(ы): `, setUserNum);
};

playBullsAndCows();
