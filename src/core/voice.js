/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var grammar = (type, arr) => `#JSGF V1.0; grammar ${type}; public <${type}> = ${arr.join(' | ')} ;`;

const commandsObject = {
  directions: ['esquerda', 'direita', 'acima', 'abaixo'],
  proportion: ['largura', 'altura'],
  sizes: ['porcentagem', 'pixels', 'largura', 'altura'],
};
var voiceCommands = [];

Object.values(commandsObject).forEach(words => {
  voiceCommands = voiceCommands.concat(words);
});

speechRecognitionList.addFromString(grammar('commands', voiceCommands), 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

// recognition.start();

recognition.onresult = function (event) {
  const lastResult = event.results.length - 1;
  const results = event.results[lastResult];
  const possiblesOutput = [];
  console.log(`Result received: ${results[0].transcript}`);
  console.log(`Confidence: ${results[0].confidence}`);
  Object.values(results).forEach(({transcript}) => {
    possiblesOutput.push(transcript);
  });
  console.log(possiblesOutput.join(', '));
};

export default recognition;
