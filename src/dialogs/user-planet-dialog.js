const { PromptDialog } = require('botfuel-dialog');
const fetch = require('node-fetch');
const GoogleImages = require('google-images');

const GoogleClient = new GoogleImages('016252577994980370624:dii3ua-fjfm', 'AIzaSyD7RSw89FoMyR_N8ReFQeG-sGO9zvmCMHQ');

class UserPlanetDialog extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
    let character = null;
    if (!missingEntities.characterName) {
      const characterName = matchedEntities.characterName.values[0].value;
      const response = await fetch(`https://www.swapi.co/api/people/?search=${characterName}`);
      const data = await response.json();
      character = data.results[0];
    } else if (this.brain.botGet('character')) {
      character = await this.brain.botGet('character');
    }
    if (character) {
      console.log(character);
      const planetResponse = await fetch(character.homeworld);
      const requestResult = await planetResponse.json();

      const images = await GoogleClient.search(`${requestResult.name} planet`, {size: 'large'});

      if (requestResult && images.length > 0) {
        const image = images[Math.floor(Math.random() * images.length)];
        console.log(image);
        requestResult.photo = image;
      }

      return { requestResult };
    }
    return null;
  }
}

UserPlanetDialog.params = {
  namespace: 'name',
  entities: {
    characterName: {
      dim: 'character',
    },
  },
};

module.exports = UserPlanetDialog;
