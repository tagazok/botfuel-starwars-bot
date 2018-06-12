const { View, BotTextMessage } = require('botfuel-dialog');
const { QuickrepliesMessage } = require('botfuel-dialog');

class GreetingsView extends View {
  render() {
    return [
      new BotTextMessage('Hello human!'),
      // new QuickrepliesMessage(['1', '2', '3', '4', '5'], { text: 'Please give me a note.' })
    ];
  }
}

module.exports = GreetingsView;
