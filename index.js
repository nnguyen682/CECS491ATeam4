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
            ADVICES: [
                'Sometimes the most productive thing you can do is relax. ',
                'The time to relax is when you do not have time for it. ',
                'The mind should be allowed some relaxation, that it may return to its work all the better for the rest. ',
                "Relaxation means releasing all concern and tension and letting the natural order of life flow through one's being. ",
                'Your mind will answer most questions if you learn to relax and wait for the answer. ',
            ],
            EXTREME: [
                "Don't do it! I don't want you to die. ",
                "There are people that loves you. ",
                'There are people that needs you. ',
                "It will be better tomorrow. ",
                "I don't know what to say. I just don't want you to die. ",
            ],
            GOODS:[
                "It's good to hear that, ",
                "I am glad that you are having a nice day, ",
                "Good to know that, ",
                "That's nice to hear, ",
                "Glad things are working out for you, ",
                "I hope to keep hearing good news, ",
                "I am very proud of you, ",
                "Keep up the good work, ",
                "That's great news, ",
                "Hearing that makes me happy, ",
                "Hearing that just made my day, ",
                "Great moves, keep it up, proud of you, ",
                "Hey, that's pretty good, ",
                "I might be a robot, but you just gave me feelings, ",
                "I couldn't more proud of you"
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
            WELLCOME_MESSAGE: "Wellcome to Anti Depression Application, our purpose is making you feel better. ",
            OPTION_MESSAGE: "We have three options. You can say Advice to listen to one of our advices, say Take a test to take "
            +"our assessment test, or discuss my feelings to start  discussing your feelings ",
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
    'Options': function(){
         this.emit(':ask', this.t('OPTION_MESSAGE'));    
    },
    'Advice': function(){
        const adArr = this.t('ADVICES');
        const adIndex = Math.floor(Math.random() * adArr.length);
        const randomAD = adArr[adIndex];
        this.emit(':ask', randomAD);
    },
    'suicideIntention': function () {
        this.emit('Dangerous');
    },
    
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const adArr = this.t('ADVICES');
        const adIndex = Math.floor(Math.random() * adArr.length);
        const randomAD = adArr[adIndex];

        // Create speech output
        const speechOutput =  this.t('WELLCOME_MESSAGE') + this.t('GET_FACT_MESSAGE') +randomAD + this.t('NEXT_MESSEGE') ;
        this.emit(':ask', speechOutput, this.t('SKILL_NAME'), randomAD);
    },
 
    'Feeling' : function(){
        this.emit(':ask', this.t('FEELING_MESSEGE'));
    },
    'Dangerous': function(){
        const extreArr = this.t('EXTREME');
        const extreIndex = Math.floor(Math.random() * extreArr.length);
        const randomExtre = extreArr[extreIndex];

        // Create speech output
        this.emit(':ask', randomExtre);
    },
    'PositiveDoNext' : function(){
        const goodArr = this.t('GOODS');
        const goodIndex = Math.floor(Math.random() * goodArr.length);
        const randomGood = goodArr[goodIndex];
        // Create speech output
        const speechOutput =  randomGood + this.t('NEXT_MESSEGE');
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
