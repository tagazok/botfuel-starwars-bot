const { PromptView, BotTextMessage } = require('botfuel-dialog');
const { SearchView } = require('botfuel-module-facetedsearch');

class CharacterView extends SearchView {

  generateTemplate(character) {
    return `
    <div class="card black">
        <div>
            <img class="character-image" src="${character.photo.url}"
            />
        </div>
        <div style="padding: 1em;">
            <div class="character-name">
              ${character.name}
            </div>
            <ul class="character-characteristics">
                <li class="character-characteristic">
                    <div class="character-characteristic__label">Birth date : </div><div class="character-characteristic__value">${character.birth_year}</div>
                </li>
                <li class="character-characteristic">
                    <div class="character-characteristic__label">Gender : </div><div class="character-characteristic__value">${character.gender}</div>
                </li>
                <li class="character-characteristic">
                    <div class="character-characteristic__label">Height : </div><div class="character-characteristic__value">${character.height} cm</div>
                </li>
                <li class="character-characteristic">
                    <div class="character-characteristic__label">Mass : </div><div class="character-characteristic__value">${character.mass} kg</div>
                </li>
            </ul>
            <div class="source">Source : https://swapi.co/</div>
            <div class="source"><a target="_blank" href="${character.photo.parentPage}">Image source</a></div>
        </div>
    </div>
    `;
  }

  render(userMessage, { matchedEntities, missingEntities, requestResult }) {
    const messages = [];
    // console.log(requestResult.species);
    if (requestResult && requestResult.count === 0) {
      messages.push(new BotTextMessage("Sorry, I cant't find this character in my Galactic Database"));
    } else {
      const characterName = matchedEntities.characterName && matchedEntities.characterName.values[0].value;
      if (characterName) {
        
        messages.push(
          new BotTextMessage(this.generateTemplate(requestResult.results[0]))
        );
      }
    }
    return messages;
  }
}

module.exports = CharacterView;
