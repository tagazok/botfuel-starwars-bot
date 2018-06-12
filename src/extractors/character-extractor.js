const { CorpusExtractor, FileCorpus } = require('botfuel-dialog');

class CharacterExtractor extends CorpusExtractor {
  constructor() {
    super({
      dimension: 'character',
      corpus: new FileCorpus(`${__dirname}/../assets/corpus/characters.txt`),
      options: {
        caseSensitive: false,
        keepQuotes: false,
        keepDashes: false,
        keepAccents: false,
      },
    });
  }
}

module.exports = CharacterExtractor;