import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Угадай число от 1 до 10',
    userNumber: '',
    randomNumber: this.generateRandomNumber(),
    count: 0,
    isGuessed: false,
  };

  // Метод для генерации случайного числа (исключая 0)
  generateRandomNumber() {
    const {min, max} = this.props;
    let number;
    do {
      number = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (number === 0);
    return number;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Если игра закончена - перезапускаем
    if (this.state.isGuessed) {
      this.handleReset();
      return;
    }

    // Увеличиваем счетчик попыток
    this.setState({
      count: this.state.count + 1,
    });

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
          userNumber: '',
        };
      }

      const userNum = Number(state.userNumber);

      // Проверка диапазона
      if (userNum < 1 || userNum > 10) {
        return {
          result: `Число должно быть от 1 до 10`,
          userNumber: '',
        };
      }

      if (userNum > state.randomNumber) {
        return {
          result: `${userNum} больше загаданного`,
          userNumber: '',
        };
      }

      if (userNum < state.randomNumber) {
        return {
          result: `${userNum} меньше загаданного`,
          userNumber: '',
        };
      }

      // Если угадали
      return {
        result: `Вы угадали! Загаданное число ${userNum}, 
        попыток: ${this.state.count}`,
        userNumber: '',
        isGuessed: true,
      };
    });
  };

  handleChange = (e) => {
    const value = e.target.value;

    // Разрешаем только пустую строку или числа от 1 до 10
    if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) {
      this.setState({
        userNumber: value,
      });
    }
  };

  // Метод для сброса игры
  handleReset = () => {
    this.setState({
      result: 'Угадай число от 1 до 10',

      userNumber: '',
      randomNumber: this.generateRandomNumber(),
      count: 0,
      isGuessed: false,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Введите число
          </label>
          <input
            className={style.input}
            type="number"
            id="user_number"
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.isGuessed}
            min="1"
            max="10"
          />
          <button className={style.btn}>
            {this.state.isGuessed ? 'Сыграть ещё' : 'Угадать'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
