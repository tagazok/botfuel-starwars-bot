const { PromptDialog } = require('botfuel-dialog');
const fetch = require('node-fetch');
const logger = require('logtown');
const GoogleImages = require('google-images');

// const GoogleClient = new GoogleImages('016252577994980370624:dii3ua-fjfm', 'AIzaSyD7RSw89FoMyR_N8ReFQeG-sGO9zvmCMHQ');
const GoogleClient = new GoogleImages(process.env.GOOGLE_IMAGE_ENGINE_ID, process.env.GOOGLE_IMAGE_APP_KEY);

class CharacterDialog extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {

    if (missingEntities.size === 0 ) {
      const character = matchedEntities.characterName.values[0].value;
      const response = await fetch(`https://www.swapi.co/api/people/?search=${character}`);
      const requestResult = await response.json();
      const images = await GoogleClient.search(character, {size: 'large'});
      // console.log(images);
      console.log(requestResult.species);
      if (requestResult && requestResult.count > 0 && images.length > 0) {
        requestResult.results[0].photo = images[Math.floor(Math.random() * images.length)];
      }
      this.brain.botSet('character', requestResult.results[0]);
      
      return { requestResult };
    }
    return null;
  }
}

CharacterDialog.params = {
  namespace: 'name',
  entities: {
    characterName: {
      dim: 'character',
    },
  },
};

module.exports = CharacterDialog;
