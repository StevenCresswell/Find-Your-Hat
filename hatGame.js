const prompt = require('prompt-sync')({sigint: true});
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldLayout) {
    this._field = fieldLayout
    this._horizontalPosition = 0
    this._verticalPosition = 0
    this._gameContinue = true
  }
  print() {
    const joinedField = this._field.map(row => row.join('')).join('\n');
    console.log(joinedField)
  }
  input() {
    this.print()
    const direction = prompt('Where would you like to move?');
    if (direction === "r") {
      this._horizontalPosition++
    } else if (direction === "l") {
      this._horizontalPosition--
    } else if (direction === "d") {
      this._verticalPosition++
    } else if (direction === "u") {
      this._verticalPosition--
    }
  }
  checkWin() {
    if (this._field[this._verticalPosition][this._horizontalPosition] === hat) {
      this._gameContinue = false
      console.log("You found your hat, you win!")
    } else if (this._field[this._verticalPosition][this._horizontalPosition] === hole) {
      this._gameContinue = false
      console.log("You fell down a hole, you lose!")
    } else if (this._field[this._verticalPosition][this._horizontalPosition] === fieldCharacter) {
      this._field[this._verticalPosition][this._horizontalPosition] = pathCharacter
    } else {this._gameContinue = false
      console.log("You went out of bounds, you lose!")
    }
  }
  playGame() {
    do {
      this.input();
      this.checkWin();
    } while (this._gameContinue === true)
  }
  static generateField(width, height, difficulty) {
    const newField = []
    const newFieldRow = []
    let numHoles = 0
    if (difficulty === "easy") {
      numHoles = Math.floor((width * height) * 0.2)
    } else if (difficulty === "medium") {
      numHoles = Math.floor((width * height) * 0.3)
    } else if (difficulty === "hard") {
      numHoles = Math.floor((width * height) * 0.4)
    }
    for (let i = 0; i < width; i++) {
      newFieldRow.push(fieldCharacter)
    }
    for (let i = 0; i < height; i++) {
      newField.push([...newFieldRow])
    }
    for (let i = 0; i < numHoles; i++) {
      let xRef = Math.floor(Math.random() * width);
      let yRef = Math.floor(Math.random() * height);
      if (newField[yRef][xRef] === fieldCharacter) { 
        newField[yRef][xRef] = hole;  
      } else newField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)]
      }
    newField[Math.ceil(Math.random() * height)][Math.ceil(Math.random() * width)] = hat
    newField[0][0] = pathCharacter
    return newField
  }
}

const myField = new Field(Field.generateField(10, 5, "hard"))
myField.playGame()