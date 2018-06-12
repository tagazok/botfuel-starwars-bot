const { PromptDialog } = require('botfuel-dialog');
const fetch = require('node-fetch');
const GoogleImages = require('google-images');

const GoogleClient = new GoogleImages(process.env.GOOGLE_IMAGE_ENGINE_ID, process.env.GOOGLE_IMAGE_APP_KEY);

class VersusDialog extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {

    if (missingEntities.size === 0 ) {
      const character1 = matchedEntities.name1.values[0].value;
      const character2 = matchedEntities.name2.values[0].value;
      console.log(`character1 : ${character1}`);
      console.log(`character2 : ${character2}`);
      const response = await Promise.all([
        fetch(`https://www.swapi.co/api/people/?search=${character1}`),
        fetch(`https://www.swapi.co/api/people/?search=${character2}`)
      ]);
      const requestResult = await Promise.all(
        response.map(e => e.json())
      );
      // console.log(requestResult);
      if ((requestResult[0].count > 0) && (requestResult[1].count > 0)) {
        const images = await Promise.all([
          GoogleClient.search(character1, {size: 'large'}),
          GoogleClient.search(character2, {size: 'large'})
        ]);
        requestResult[0].results[0].photo = images[0][Math.floor(Math.random() * images[0].length)];
        requestResult[1].results[0].photo = images[1][Math.floor(Math.random() * images[1].length)];
      }
      return { requestResult };
    }
    return null;
  }
}

VersusDialog.params = {
  namespace: 'versus',
  entities: 
    {
  "name1": {
    "dim": "character"
  },
  "name2": {
    "dim": "character"
  }
}
  ,
};

module.exports = VersusDialog;

