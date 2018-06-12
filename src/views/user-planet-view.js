const { PromptView, BotTextMessage } = require('botfuel-dialog');

class NameView extends PromptView {
  generateTemplate(planet) {
    return `
    <div class="card black">
      <div>
        <img class="planet-image" src="${planet.photo.url}"
            />
      </div>
      <div style="padding: 1em;">
        <div class="planet-name">
          ${planet.name}
        </div>
        <ul class="planet-characteristics">
            <li class="planet-characteristic">
                <div class="planet-characteristic__label">Population : </div><div class="planet-characteristic__value"">${planet.population || '-'} hab.</div>
            </li>
            <li class="planet-characteristic">
                <div class="planet-characteristic__label">Climate : </div><div class="planet-characteristic__value"">${planet.climate || '-'}</div>
            </li>
            <li class="planet-characteristic">
                <div class="planet-characteristic__label">Terrain : </div><div class="planet-characteristic__value"">${planet.terrain || '-'}</div>
            </li>
            <li class="planet-characteristic">
                <div class="planet-characteristic__label">Gravity : </div><div class="planet-characteristic__value"">${planet.gravity || '-'} kg</div>
            </li>
        </ul>
        <div class="source">Source : https://swapi.co/</div>
        <div class="source"><a target="_blank" href="${planet.photo.parentPage}">Image source</a></div>
      </div>
    </div>
    `;
  }

  render(userMessage, { matchedEntities, missingEntities, requestResult }) {
    const messages = [];
    
    if (!requestResult) {
      messages.push(new BotTextMessage("Sorry, I cant't find the planet in my Galactic Database"));
    } else {
      messages.push(
        new BotTextMessage(this.generateTemplate(requestResult))
      );
    }

    return messages;
  }
}

module.exports = NameView;
