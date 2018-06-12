const { View, BotTextMessage } = require('botfuel-dialog');

class Character-films-versusView extends View {
  render() {
    return [
      new BotTextMessage('Hello human!'),
    ];
  }
}

module.exports = Character-films-versusView;
