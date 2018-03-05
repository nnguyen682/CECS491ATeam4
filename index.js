/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.01d535e8-9065-4dbb-b124-4424eb354c3e';  

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'Sometimes the most productive thing you can do is relax   ',
                'The time to relax is when you do not have time for it    ',
                'The mind should be allowed some relaxation, that it may return to its work all the better for the rest   ',
                "Relaxation means releasing all concern and tension and letting the natural order of life flow through one's being    ",
                'Your mind will answer most questions if you learn to relax and wait for the answer    ',
            ],
            EXTREME: [
                "Don't do it! I don't want you to die",
                "There are people that loves you",
                'There are people that needs you',
                "It will be better tomorrow",
                "I don't know what to say. I just don't want you to die",
            ],
            SKILL_NAME: 'Advice',
            GET_FACT_MESSAGE: "Here's our Advice: ",
            HELP_MESSAGE: 'You can say tell me a Advice, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            GOOD_MESSAGE: "It's good to hear that!",
            NEXT_MESSEGE: 'What would you like to do next?',
            FEELING_MESSEGE: 'How are you feeling today?',
            HOTLINE_MESSEGE: 'Here is the number for the Suicide Hotline: 1-800-273-8255',
            TEST_MESSEGE: 'Opening state of mind assessment test, Taking an assessment test will overwrite any previous tests, do you want to continue?',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'Sometimes the most productive thing you can do is relax     ',
                'The time to relax is when you do not have time for it    ',
                'The mind should be allowed some relaxation, that it may return to its work all the better for the rest     ',
                'Relaxation means releasing all concern and tension and letting the natural order of life flow through one s being     ',
                'Your mind will answer most questions if you learn to relax and wait for the answer     ',
            ],
            SKILL_NAME: 'Advice',
        },
    },
    'en-GB': {
        translation: {
            FACTS: [
                'A year on Mercury is just 88 days long.',
                'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
                'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'British Relaxing Quotes',
        },
    },
    'de': {
        translation: {
            FACTS: [
                'Ein Jahr dauert auf dem Merkur nur 88 Tage.',
                'Die Venus ist zwar weiter von der Sonne entfernt, hat aber höhere Temperaturen als Merkur.',
                'Venus dreht sich entgegen dem Uhrzeigersinn, möglicherweise aufgrund eines früheren Zusammenstoßes mit einem Asteroiden.',
                'Auf dem Mars erscheint die Sonne nur halb so groß wie auf der Erde.',
                'Die Erde ist der einzige Planet, der nicht nach einem Gott benannt ist.',
                'Jupiter hat den kürzesten Tag aller Planeten.',
                'Die Milchstraßengalaxis wird in etwa 5 Milliarden Jahren mit der Andromeda-Galaxis zusammenstoßen.',
                'Die Sonne macht rund 99,86 % der Masse im Sonnensystem aus.',
                'Die Sonne ist eine fast perfekte Kugel.',
                'Eine Sonnenfinsternis kann alle ein bis zwei Jahre eintreten. Sie ist daher ein seltenes Ereignis.',
                'Der Saturn strahlt zweieinhalb mal mehr Energie in den Weltraum aus als er von der Sonne erhält.',
                'Die Temperatur in der Sonne kann 15 Millionen Grad Celsius erreichen.',
                'Der Mond entfernt sich von unserem Planeten etwa 3,8 cm pro Jahr.',
            ],
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
            
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'DiscussingFeelings': function () {
        this.emit('Feeling');
    },
    'suicideIntention': function () {
        this.emit('Dangerous');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput =  this.t('GET_FACT_MESSAGE') +randomFact + this.t('NEXT_MESSEGE') ;
        this.emit(':ask', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    
    'Feeling' : function(){
        this.emit(':ask', this.t('FEELING_MESSEGE'));
    },
    'Dangerous': function(){
        const extreArr = this.t('EXTREME');
        const extreIndex = Math.floor(Math.random() * extreArr.length);
        const randomExtre = extreArr[extreIndex];

        // Create speech output
        const speechOutput =  randomExtre  ;
        this.emit(':ask', speechOutput);
    },
    'PositiveDoNext' : function(){
        // Create speech output
        const speechOutput =  this.t('GOOD_MESSAGE') + this.t('NEXT_MESSEGE');
        this.emit(':ask', speechOutput);
    },
    'Test': function(){
        this.emit(':ask', this.t('TEST_MESSEGE'));
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};
    
    

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
