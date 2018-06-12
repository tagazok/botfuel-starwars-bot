const { View, BotImageMessage, WebAdapter } = require('botfuel-dialog');

const BOT_URL = process.env.BOT_URL || `http://localhost:${PORT}`;

class VersusView extends View {
  render(userMessage, { matchedEntities, missingEntities, requestResult }) {
    const messages = [];

    const infos = {
      character1_name: requestResult[0].results[0].name,
      character2_name: requestResult[1].results[0].name,
      character1_photo: requestResult[0].results[0].photo.url,
      character2_photo: requestResult[1].results[0].photo.url,
      character1_movies: requestResult[0].results[0].films.length,
      character2_movies: requestResult[1].results[0].films.length,
    };
    
    console.log(JSON.stringify(infos));

    const versusImageUrl = WebAdapter.getImageUrl(
      "vs.handlebars",
      infos,
      800, 600, 80);
      console.log(`image url : ${versusImageUrl}`);
    messages.push(new BotImageMessage(versusImageUrl));

    return messages;
  }
}

module.exports = VersusView;
