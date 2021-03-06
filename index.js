// Good Vibes

const invocationName = "good vibes";

const languageStrings = {
    'en': {
        'translation': {
            ADVICES: [
                'Sometimes the most productive thing you can do is relax. ',
                'The time to relax is when you do not have time for it. ',
                'If you ar having trouble sleeping, try putting some lavender oil on yor feet',
                'Take a quick break from your busy life and try meditating for a few minutes',
                'The mind should be allowed some relaxation, that it may return to its work all the better for the rest. ',
                "Relaxation means releasing all concern and tension and letting the natural order of life flow through one's being. ",
                'Your mind will answer most questions if you learn to relax and wait for the answer. ',
                "If you are feeling down, try working on a hobby to keep your mind occupied.",
                "Isolation can be a key factor of depression. Contact a friend or family member and have a conversation with them.",
                "Overworking and continuous stress can lead to feelings of depression or hopelessness. Try out different strategies for coping with stress to see what works best for you.",
                "If you notice mood changes during fall or winter, you may have a case of seasonal affective disorder. Do not worry, it is only temporary, but if these mood swings escalate, you may want to seek medical help.",
                'Make sure you floss your teeth today! Its more important than you think.',
                'Give someone a hug today.',
                'Dont sweat the small things.',
            ],
            EXTREME: [
                "Don't do it! I don't want you to die. ",
                "There are people that love you. ",
                'There are still people here that need you. ',
                "Things will get better tomorrow. ",
                "You are a valuable person, don't think any less of yourself.",
                "You deserve good health and a positive outlook on life.",
                "Most, if not all, of the struggles that you are experiencing right now are temporary.",
                "Your life is too valuable to give up on.",
                "Don't let your problems get the best of you, there is still so much to live for.",
            ],
            QUESTIONS: [
                "How often did you feel little interest or pleasure in doing things?",
                "How often did you feel down, depressed or hopeless?",
                'How often did you have trouble falling or staying asleep, or sleeping too much?',
                "How often did you feel tired or had little energy?",
                "How often did you have a poor appetite or experience overeating?",
                "How often did you feel bad about yourself or feel that you are a failure or feel like you let yourself or others down?",
                "How often did you struggle to concentrate on things, such as reading a book or watching television?",
                "How often did you move or speak slower or quicker than usual such that other people noticed?",
                "How ofthen did you have thoughts that you would be better off dead, or of hurting yourself?",
            ],
            STORY: [
                "This is a personal story from Nhan. I lost my wallet. ",
                "This is a personal story from Nhan. I'm single. ",
                "This is a personal story from Anthony. Nhan said I am annoying. ",
                "This is a personal story from Anothony. My parents are homeless and I'm trying to finish college so i can support them. ",
                "This is a personal story from Juan. I don't have a sad story. ",
                "This is a personal story from Juan. This is Nhan saying on Juan behalf, He doesn't really have any sad story. "
            ],
            GOODDISCUSSION: [
                "That's great to hear! ",
                "I'm glad to hear that. ",
                "That's great news. ",
                "I am very happy to hear that! ",
            ],
            NEUTRALDISCUSSION: [
                "That's good to hear .",
                "That's nice. ",
                "That's good. ",
                "On the bright side, things could be worse. ",
            ],
            BADDISCUSSION: [
                "I'm really sorry to hear that. ",
                "I'm sorry to hear that. ",
                "That's unfortunate, I'm sure things will get better. ",
            ],
            OPENASK: [
                "What did you do today?",
                "What happened today?",
            ],
            OPENASKCONTINUED: [
                "What else did you do today?",
                "What else happened today?",
                "Did you do anything else today?",
            ],
            RESTRICTEDASK: [
                "Did you do anything today?",
                "Did you do anything interesting today?",
                "Did you do anything fun today?",
            ],
            IFTHISISBAD: [
                "Be kind to yourself",
                "Keep your head up, Things will get brighter",
                "That's fake news. If you change your mentality, you can change your reality",
                "It's ok to give yourself some space to breathe and regroup.",
            ],
            OPTION_MESSAGE: "We have four options. You can say Advice to listen to a piece of advice, say Take a test to take "
                + "our assessment test, or discuss my feelings to start  discussing your feelings, and story to listen to stories ",
            FEELING_MESSEGE: 'How are you feeling today?',
            'WELCOME1': 'Welcome to good vibes!',//<say-as interpret-as="interjection">dun dun dun!</say-as>
            'WELCOME2': 'Greetings!',
            'WELCOME3': 'Hello there!',
            'HELP': 'our purpose is making you feel better. ',
            'STOP': 'Goodbye!'
        }
    }
    // , 'de-DE': { 'translation' : { 'WELCOME'   : 'German Welcome etc.' } }
    // , 'jp-JP': { 'translation' : { 'WELCOME'   : 'Japanese Welcome etc.' } }
};
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const Alexa = require("alexa-sdk");
const https = require("https");

exports.handler = function (event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID; //
    alexa.dynamoDBTableName = 'goodVibesTable';
    alexa.resources = languageStrings;
    // alexa.dynamoDBTableName = "myTable"; // persistent session attributes
    alexa.registerHandlers(handlers);
    alexa.execute();
}

const handlers = {
    'AMAZON.CancelIntent': function () {

        let say = 'Goodbye.';
        this.response
            .speak(say);

        this.emit(':responseReady');
    },
    'helpIntent': function () {
        var speechOutput
        if (this.attributes.skillState == "Numbers") {
            speechOutput = 'You are in the middle of a test, Please say a number from zero to three, or say never, often, etc.';
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'quizMainMenu') {

            speechOutput = 'Please answer yes or no to start a quiz or not';
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'discuss') {
            this.attributes.skillState = null;
            speechOutput = 'I asked how are you feeling today. Maybe you should take a rest. What would you like to do next?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'middiscuss') {
            speechOutput = 'We are in the middle of a discussion. Would you like to end it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            
            if(this.event.request.intent.slots.version.value != null){
                let say = this.t('OPTION_MESSAGE');
                this.response
                    .speak(say)
                    .shouldEndSession(false);
                this.emit(':responseReady');
            }
            let say = this.t('You can say advice, discuss, test, story, or full help');
                this.response
                    .speak(say)
                    .shouldEndSession(false);
                this.emit(':responseReady');
        }
    },
    'AMAZON.StopIntent': function () {
        var speechOutput
        if (this.attributes.skillState == "Numbers") {
            speechOutput = 'We are getting out of the test. What would you like to do next?';
            this.attributes.skillState = null;
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'quizMainMenu') {

            speechOutput = 'We are getting out of the test. Come back when you are ready!';
            this.attributes.skillState = null;
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'middiscuss') {
            this.attributes.skillState = null;
            speechOutput = 'I enjoy these conversations. I am excited to hear from you again.';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            if (this.attributes.Result != null) {
                let say = 'Here is a reminder of what you got from the test.';
                say += this.attributes.Result;
                say += ' Take it easy and have a nice day.';
                this.response
                    .speak(say);
                this.emit(':responseReady');
            }
            let say = 'Goodbye.';
            this.response
                .speak(say);
            this.emit(':responseReady');
        }

    },
    'DiscussFeeling': function () {
        var speechOutput;
        if (this.attributes.skillState == 'quizMainMenu') {
            speechOutput = 'Please answer yes or no to start the quiz or not';
            this.response.speak(speechOutput); //Keeps session open without pinging user..
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            this.attributes.skillState = 'discuss'
            // delegate to Alexa to collect all the required slots
            let filledSlots = delegateSlotCollection.call(this);
            if (!filledSlots) {
                return;
            }
            let slotValues = getSlotValues(filledSlots);
            if (slotValues.feeling.resolved == "Good") {
                //this.attributes.skillState = null;
                //var randomIndex = randomIndexOfArray(theStory);
                const adArr1 = this.t('GOODDISCUSSION');
                const adArr2 = this.t('OPENASK');
                if(this.attributes.skillState == 'middiscuss'){
                    const adArr2 = this.t('OPENASKCONTINUED');
                }
                else{
                    const adArr2 = this.t('OPENASK');
                }
                var randomIndex = randomIndexOfArray(adArr1)
                var randomIndex2 = randomIndexOfArray(adArr2)
                const randomAD1 = adArr1[randomIndex];
                const randomAD2 = adArr2[randomIndex2];
                const output = randomAD1 + randomAD2;
                
                this.attributes.skillState = 'middiscuss';
                this.attributes['prevDay'] = 'Good';
                //this.emit(':ask', this.t('Glad to hear that, keep up the good work'));
                this.emit(':ask', this.t(output));

            }
            else if (slotValues.feeling.resolved == "Bad") {
                this.attributes.skillState = 'middiscuss';
                const adArr1 = this.t('BADDISCUSSION');
                const adArr2 = this.t('OPENASK');
                if(this.attributes.skillState == 'middiscuss'){
                    const adArr2 = this.t('OPENASKCONTINUED');
                }
                else{
                    const adArr2 = this.t('OPENASK');
                }
                var randomIndex = randomIndexOfArray(adArr1)
                var randomIndex2 = randomIndexOfArray(adArr2)
                const randomAD1 = adArr1[randomIndex];
                const randomAD2 = adArr2[randomIndex2];
                const output = randomAD1 + randomAD2;
                this.attributes['prevDay'] = 'Bad';
                this.emit(':ask', output);

            }
            else {
                this.attributes.skillState = null;
                this.emit(':ask', this.t('Do something that would improve your day.'));
            }
        }

    },
    'Advice': function () {
        var speechOutput;
        if (this.attributes.skillState == 'quizMainMenu') {
            speechOutput = 'Please answer yes or no to start a quiz or not';
            this.response.speak(speechOutput); //Keeps session open without pinging user..
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'middiscuss') {
            speechOutput = 'We are in the middle of a discussion. Would you like to end it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            let say = 'Here is your advice. ';
            const adArr = this.t('ADVICES');
            const adIndex = Math.floor(Math.random() * adArr.length);
            const randomAD = adArr[adIndex];
            this.emit(':ask', randomAD);
        }
    },
    'Test': function () {
        newSessionHandler.call(this);
        var speechOutput;
        var reprompt;

        //Initiation of game
        if (this.attributes.skillState == 'middiscuss') {
            speechOutput = 'We are in the middle of a discussion. Would you like to end it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        if (this.attributes['Score'] != null) {
            speechOutput = 'You took the quiz previously, and your score was ' + this.attributes['Score'] + '. Do you want to take this test again?';
            this.attributes.skillState = 'quizMainMenu';
            this.response.speak(speechOutput); //Keeps session open without pinging user..
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        if (this.attributes.skillState == null) {
            resetAttributes.call(this);
            speechOutput = 'I will ask you three questions based on your experiences within the past two weeks. To answer these questions, please say zero for not at all. One for several days. Two for more than half the days. And three for nearly every day. Are you ready to begin?';
            this.attributes.skillState = 'quizMainMenu';
            this.response.speak(speechOutput); //Keeps session open without pinging user..
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'quizMainMenu') {

            speechOutput = 'Please answer yes or no to start the quiz or not';
            this.response.speak(speechOutput); //Keeps session open without pinging user..
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'nameiss')
        {
            speechOutput = "Please tell me your name. " ;
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            speechOutput = 'You are already in the middle of a quiz. Please choose a number from 0 to 3: ';
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(':responseReady');
        }
    },
    'EXTREME': function () {
        const extreArr = this.t('EXTREME');
        const extreIndex = Math.floor(Math.random() * extreArr.length);
        const randomExtre = extreArr[extreIndex];

        // Create speech output
        this.emit(':ask', randomExtre);
    },
    'Activity': function () {
        if (this.attributes.skillState == 'middiscuss') {
           // let filledSlots = delegateSlotCollection.call(this);
            //let slotValues = getSlotValues(filledSlots);
            if(this.event.request.intent.slots.movie.value != null)
            {
                const speechOutput = this.event.request.intent.slots.movie.value+ " is a great movie. did you enjoy it?"; //+ slotValues.type.resolved;
                //speechOutput += ". Did you win?";
                this.response.speak(speechOutput).shouldEndSession(false);
                this.emit(':responseReady');
            }
            const speechOutput = "When I still have my human body, I play tons of " + this.event.request.intent.slots.sport.value +". Did your team win?"; //+ slotValues.type.resolved;
            //speechOutput += ". Did you win?";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        const speechOutput = "hmm, you are in the middle of something. please say stop to get out."; //+ slotValues.type.resolved;
            
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');

    },
    'LaunchRequest': function () {
        //this.attributes['userName']= null;
        let say = this.t('WELCOME1') + ' ' + this.t('HELP');
        if (!this.attributes['userName']) {
            this.attributes.skillState = 'nameiss';
            say += "I see it's your first time here. Please tell me your name";
            //this.response
              //  .speak(say)
                //.listen('try again, ' + say);
                this.response.speak(say).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            let sayWelcome = "Wellcome back " + this.attributes['userName'] + '! ' + this.t('HELP');
            if (this.attributes['prevDay'] == 'Good') {
                sayWelcome += " I hope things are still looking up for you.";
                this.attributes.skillState = null;
            }
            else if (this.attributes['prevDay'] == 'Bad') {
                sayWelcome += " Have things gotten any better since then?";
                this.attributes.skillState = 'anyBetter';
            }
            sayWelcome +=  " Say help if you like to hear the options again.";
            this.response
                .speak(sayWelcome)
                .listen('try again, ' + say);
              // this.response.speak(sayWelcome).shouldEndSession(false);
            this.emit(':responseReady');

        }

    },
    'clearName': function () {
        this.attributes['story'] = null
        this.attributes['userName'] = null;
        this.attributes['Score'] = null;
        let say = "Database of Username and Story Intentions set back to null";
        this.attributes.skillState = null;
        //this.response
          //  .speak(say)
            //.listen('try again, ' + say);
            this.response.speak(say).shouldEndSession(false);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        var speechOutput = '';
     if (this.attributes.skillState == 'middiscuss') {
            speechOutput = 'That is interesting. How was it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'discuss') {
            this.attributes.skillState = null;
            speechOutput = 'I asked how are you feeling today. Maybe you should take a rest. What would you like to do next?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
    else if (this.attributes.skillState == 'Numbers')
    {
        speechOutput = 'You are in the middle of the quiz, please answer 0 to 3, or never, often, etc.';
        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(':responseReady');
    }
    else if (this.attributes.skillState == 'quizMainMenu')
    {
        speechOutput = ' Please answer yes to enter the quiz or no to come back later.';
        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(':responseReady');
    }
        let say = 'The skill did not quite understand what you wanted to do.  Do you want to try something else? ';
        this.response
            .speak(say)
            .listen(say);
            this.emit(':responseReady');
     },
     
    'UserNames': function () {
        if (this.attributes.skillState == 'nameiss') {
            this.attributes['userName'] = this.event.request.intent.slots.Name.value;
            let say = "Hello " + this.event.request.intent.slots.Name.value + ". " + this.t('OPTION_MESSAGE');
            //this.response
              //  .speak(say)
                //.listen('try again, ' + say);
            // Create speech output
            this.response.speak(say).shouldEndSession(false);
            this.attributes.skillState = null;

            this.emit(':responseReady');
            
        }
        else if (this.attributes.skillState == 'discuss') {
            this.attributes.skillState = null;
            var speechOutput = '';
            speechOutput = 'I asked how are you feeling today. Maybe you should take a rest. What would you like to do next?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == null && this.event.request.intent.slots.nameIs.value != null) {
            let say = "are you sure you wanna change your name from " + this.attributes['userName'] + " to " + this.event.request.intent.slots.Name.value + "?";
            this.attributes.changeName = this.event.request.intent.slots.Name.value;
            this.attributes.skillState = "yesNoName";
            //this.response
              //  .speak(say)
                //.listen('try again, ' + say);
            // Create speech output

            this.response.speak(say).shouldEndSession(false);
            
            this.emit(':responseReady');

        }
        else {
            let say = "We are not sure what you mean by that?";
            //this.response
              //  .speak(say)
               // .listen('try again, ' + say);
            // Create speech output
            this.emitWithState("AMAZON.FallbackIntent");
            
            this.response.speak(say).shouldEndSession(false);
            this.emit(':responseReady');
        }

    },
    'AMAZON.YesIntent': function () {
        var speechOutput;
        if (this.attributes.skillState == 'quizMainMenu') {
            this.attributes.quizScore = 0;
            this.attributes.quizNo = 0;
            const extreArr = this.t('QUESTIONS');
            const randomExtre = extreArr[this.attributes.quizNo];
            speechOutput = randomExtre;
            this.attributes.skillState = 'Numbers';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == "yesNoName") {
            let say = "Your name is changed to " + this.attributes.changeName;
            this.attributes['userName'] = this.attributes.changeName;
           // this.response
             //   .speak(say)
               // .listen('try again, ' + say);
            // Create speech output
            this.response.speak(say).shouldEndSession(false);
            this.attributes.skillState = null;
            this.emit(':responseReady');
           
        }
        else if (this.attributes.skillState == 'Numbers') {
            speechOutput = 'You are in the middle of a test, Please choose a number from 0 to 3, or never, often, etc.';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'discuss') {
            this.attributes.skillState = null;
            speechOutput = 'I asked how are you feeling today. Maybe you should take a rest. What would you like to do next?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'anyBetter') {
            this.attributes.skillState = null;
            this.attributes['prevDay'] = 'Good';
            speechOutput = 'That is great news ' + this.attributes['userName'] + '! Keep it up, I am proud of you.';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'middiscuss') {
            this.attributes.skillState = 'enddiscuss';
            speechOutput = "That's great! did you do anything else today?";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'enddiscuss') {
            this.attributes.skillState = 'middiscuss';
            speechOutput = "What else did you do today?";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            speechOutput = "Yes what? <say-as interpret-as='interjection'>tsk tsk</say-as> I didn't ask you anything";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
    },
    'newstory': function () {
         if (this.attributes.skillState == 'middiscuss') {
             this.attributes.skillState = 'enddiscuss';
            speechOutput = 'We are in the middle of a discussion. Would you like to end it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        //this.attributes['story'] = null;
        if (!this.attributes['story']) {
            const extreArr = this.t('STORY');
            this.attributes['story'] = extreArr;
            var newStory = [];
            var i = 0;
            for (i = 0; i < extreArr.length; i++) {
                newStory[i] = true;
            }
            this.attributes['newType'] = newStory;
        }
        var theStory = this.attributes['story'];
        var indexStory = this.attributes['newType'];
        var speechOutput;
        speechOutput = '';
        if (this.event.request.intent.slots.type.value == null) {
            var randomIndex = randomIndexOfArray(theStory);
            speechOutput += theStory[randomIndex];
            indexStory[randomIndex] = false;
            this.attributes['newType'] = indexStory;
        }
        else if (this.event.request.intent.slots.type.value != null) {
            let filledSlots = delegateSlotCollection.call(this);
            let slotValues = getSlotValues(filledSlots)
            slotValues.type.resolved == "Good"
            speechOutput = 'The story have type: ' + slotValues.type.resolved + ". ";
            if (slotValues.type.resolved == "new") {
                var i = 0;
                while (indexStory[i] == false && i < theStory.length) {
                    i++;
                }
                if (i == theStory.length) {
                    speechOutput += "There is no new story left";
                }
                else if (i < theStory.length) {
                    speechOutput += theStory[i];
                    indexStory[i] = false;
                    this.attributes['newType'] = indexStory;
                }
            }

        }
        speechOutput += " what else can i help you with?"
        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(':responseReady');
    },
    
    'Numbers': function () {
        var speechOutput;
         if (this.attributes.skillState == 'middiscuss') {
            speechOutput = 'We are in the middle of a discussion. Would you like to end it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        if (this.attributes.skillState == 'Numbers') {
            if (this.attributes.quizNo < 8) {
                var numberValue = this.event.request.intent.slots.number.value;
                if (numberValue == 0)
                    this.attributes.quizScore += 0;
                else if (numberValue == 1)
                    this.attributes.quizScore += 1;
                else if (numberValue == 2)
                    this.attributes.quizScore += 2;
                else if (numberValue == 3)
                    this.attributes.quizScore += 3;
                this.attributes.quizNo += 1;
                const extreArr = this.t('QUESTIONS');
                const randomExtre = extreArr[this.attributes.quizNo];
                speechOutput = randomExtre;
                this.response.speak(speechOutput).shouldEndSession(false);
                this.emit(':responseReady');
            }
            else if (this.attributes.quizNo == 8) {

                var result;
                var numberValue = this.event.request.intent.slots.number.value;
                if (numberValue == 0)
                    this.attributes.quizScore += 0;
                else if (numberValue == 1)
                    this.attributes.quizScore += 1;
                else if (numberValue == 2)
                    this.attributes.quizScore += 2;
                else if (numberValue == 3)
                    this.attributes.quizScore += 3;
                const adArr = this.t('ADVICES');
                const adIndex = Math.floor(Math.random() * adArr.length);
                const randomAD = adArr[adIndex];
                this.attributes['Score'] = this.attributes.quizScore;
                if (this.attributes.quizScore <= 4) {
                    this.attributes.skillState = null;
                    result = 'Minimal depression.';
                    speechOutput = 'Based on the test results, you fall under the category of ' + result;
                    this.attributes.Result = speechOutput;
                    speechOutput += ' You are in pretty good shape.'

                    this.response.speak(speechOutput).shouldEndSession(false);
                    this.emit(':responseReady');
                }
                else if (this.attributes.quizScore <= 9) {
                    this.attributes.skillState = null;
                    result = 'Mild depression.';
                    speechOutput = 'Based on the test results, you fall under the category of ' + result;
                    this.attributes.Result = speechOutput;
                    speechOutput += ' Here is some advice that might help you. ' + randomAD;

                    this.response.speak(speechOutput).shouldEndSession(false);
                    this.emit(':responseReady');

                }
                else if (this.attributes.quizScore <= 14) {
                    this.attributes.skillState = null;
                    result = 'Moderate depression.';
                    speechOutput = 'Based on the test results, you fall under the category of ' + result;
                    this.attributes.Result = speechOutput;
                    speechOutput += ' Here is some advice that might help you. ' + randomAD;

                    this.response.speak(speechOutput).shouldEndSession(false);
                    this.emit(':responseReady');

                }
                else if (this.attributes.quizScore <= 19) {
                    this.attributes.skillState = null;
                    result = 'Moderately severe depression.';
                    speechOutput = 'Based on the test results, you fall under the category of ' + result;
                    this.attributes.Result = speechOutput;
                    speechOutput += ' Here is some advice that might help you. ' + randomAD;

                    this.response.speak(speechOutput).shouldEndSession(false);
                    this.emit(':responseReady');

                }
                else {
                    this.attributes.skillState = null;
                    result = 'Severe depression.';
                    speechOutput = '<say-as interpret-as="interjection">dun dun dun!</say-as> Based on the test results, you fall under the category of ' + result;
                    this.attributes.Result = speechOutput;
                    speechOutput += ' Here is some advice that might help you. ' + randomAD;
                    this.response.speak(speechOutput).shouldEndSession(false);
                    this.emit(':responseReady');

                }


            }
        }
        else if (this.attributes.skillState == 'quizMainMenu') {
            speechOutput = 'Please say yes or no';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }

        else {
            speechOutput = "the quiz didn't start yet. Please say discuss to open it. ";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }


    },
    'amazonNumber': function () {
        var speechOutput = null;
        if (this.attributes.skillState == 'Numbers'){
            speechOutput = 'Please answer between 0 to 3';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else
        {
            speechOutput = 'Yeah I like numbers too. my favorite one is 13';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        speechOutput = 'Yeah I like numbers too. my favorite one is 13';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
    },
    'goodRespond': function () {
        var speechOutput = null;
        if (this.attributes.skillState == 'Numbers'){
            speechOutput = 'Please answer between 0 to 3, or never, often, etc';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'middiscuss'){
            this.attributes.skillState = 'enddiscuss';
            speechOutput = "That's great. did you do anything else?";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else
        {
            this.attributes.skillState = null;
            speechOutput = 'oh nice';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        speechOutput = 'Very nice';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        var speechOutput;
        if (this.attributes.skillState == 'Numbers') {
            speechOutput = 'You are in the middle of a quiz, Please choose a number from 0 to 3 ';
            this.response.speak(speechOutput);
            this.attributes.lastOutputResponse = speechOutput;
        }
        else if (this.attributes.skillState == "yesNoName") {
            let say = "Your name stays the same, which is: " + this.attributes['userName'];
            this.attributes.skillState = null;
           // this.response
             //   .speak(say)
               // .listen('try again, ' + say);
            // Create speech output
            this.response.speak(say).shouldEndSession(false);
            this.emit(':responseReady');

        }
        else if (this.attributes.skillState == 'quizMainMenu') {
            speechOutput = 'Come back next time when you are ready';
            this.attributes.skillState = null;
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'discuss') {
            this.attributes.skillState = null;
            speechOutput = 'I asked how are you feeling today. Maybe you should take a rest. What would you like to do next?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'middiscuss') {
            this.attributes.skillState = 'enddiscuss';
            speechOutput = 'Alright, did you do anything else today?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'enddiscuss') {
            this.attributes.skillState = null;
            speechOutput = 'Alright, talk to you later, peace fam. what else can i help you?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else if (this.attributes.skillState == 'anyBetter') {
            this.attributes.skillState = null;
            this.attributes['prevDay'] = 'Bad';
            speechOutput = 'I am sorry to hear that ' + this.attributes['userName'] + '. I am here for you and I am not going anywhere.';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        else {
            speechOutput = "No what? <say-as interpret-as='interjection'>oh brother</say-as> I didn't ask you anything";
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }


    },

    'Unhandled': function () {
        var speechOutput = '';
     if (this.attributes.skillState == 'middiscuss') {
            speechOutput = 'That is interesting. How was it?';
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
        let say = 'The skill did not quite understand what you wanted to do.  Do you want to try something else? ';
        this.response
            .speak(say)
            .listen(say);
            this.emit(':responseReady');
    }
};
//  ------ Helper Functions -----------------------------------------------

function randomPhrase(myArray) {
    return (myArray[Math.floor(Math.random() * myArray.length)]);
}

function randomIndexOfArray(myArray) {
    return Math.floor(Math.random() * myArray.length);
}

// returns slot resolved to an expected value if possible
function resolveCanonical(slot) {
    try {
        var canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    } catch (err) {
        console.log(err.message);
        var canonical = slot.value;
    };
    return canonical;
};

// used to emit :delegate to elicit or confirm Intent Slots
function delegateSlotCollection() {
    console.log("current dialogState: " + this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
        var updatedIntent = this.event.request.intent;

        this.emit(":delegate");

    } else if (this.event.request.dialogState !== "COMPLETED") {

        this.emit(":delegate");

    } else {
        console.log("returning: " + JSON.stringify(this.event.request.intent));

        return this.event.request.intent;
    }
}
function newSessionHandler() //Called every intent to handle modal/one shot utterances
{
    if (this.event.session.new) {
        var topicNames = [];

    }
}

function getCustomIntents() {
    var customIntents = [];
    for (let i = 0; i < intentsReference.length; i++) {
        if (intentsReference[i].name.substring(0, 7) != "AMAZON." && intentsReference[i].name !== "LaunchRequest") {
            customIntents.push(intentsReference[i]);
        }
    }
    return (customIntents);
}
function cardIntents(iArray) {
    var body = ""; for (var i = 0; i < iArray.length; i++) {
        body += iArray[i].name + "\n";
        body += "  '" + iArray[i].samples[0] + "'\n";
    }
    return (body);
}

const welcomeCardImg = {
    smallImageUrl: "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/alexa-devs-skill/cards/skill-builder-720x480._TTH_.png",
    largeImageUrl: "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/alexa-devs-skill/cards/skill-builder-1200x800._TTH_.png"
};


// ***********************************
// ** Helper functions from
// ** These should not need to be edited
// ** www.github.com/alexa/alexa-cookbook
// ***********************************

// ***********************************
// ** Route to Intent
// ***********************************

// after doing the logic in new session,
// route to the proper intent

function routeToIntent() {

    switch (this.event.request.type) {
        case 'IntentRequest':
            this.emit(this.event.request.intent.name);
            break;
        case 'LaunchRequest':
            this.emit('LaunchRequest');
            break;
        default:
            this.emit('LaunchRequest');
    }
}

// ***********************************
// ** Dialog Management
// ***********************************
function getSlotValues(filledSlots) {
    //given event.request.intent.slots, a slots values object so you have
    //what synonym the person said - .synonym
    //what that resolved to - .resolved
    //and if it's a word that is in your slot values - .isValidated
    let slotValues = {};

    console.log('The filled slots: ' + JSON.stringify(filledSlots));
    Object.keys(filledSlots).forEach(function (item) {
        //console.log("item in filledSlots: "+JSON.stringify(filledSlots[item]));
        var name = filledSlots[item].name;
        //console.log("name: "+name);
        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {

            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case "ER_SUCCESS_MATCH":
                    slotValues[name] = {
                        "synonym": filledSlots[item].value,
                        "resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        "isValidated": true
                    };
                    break;
                case "ER_SUCCESS_NO_MATCH":
                    slotValues[name] = {
                        "synonym": filledSlots[item].value,
                        "resolved": filledSlots[item].value,
                        "isValidated": false
                    };
                    break;
            }
        } else {
            slotValues[name] = {
                "synonym": filledSlots[item].value,
                "resolved": filledSlots[item].value,
                "isValidated": false
            };
        }
    }, this);
    //console.log("slot values: "+JSON.stringify(slotValues));
    return slotValues;
}
// This function delegates multi-turn dialogs to Alexa.
// For more information about dialog directives see the link below.
// https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html
function delegateSlotCollection() {
    console.log("in delegateSlotCollection");
    console.log("current dialogState: " + this.event.request.dialogState);

    if (this.event.request.dialogState === "STARTED") {
        console.log("in STARTED");
        console.log(JSON.stringify(this.event));
        var updatedIntent = this.event.request.intent;
        // optionally pre-fill slots: update the intent object with slot values
        // for which you have defaults, then return Dialog.Delegate with this
        // updated intent in the updatedIntent property

        disambiguateSlot.call(this);
        console.log("disambiguated: " + JSON.stringify(this.event));
        this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
        console.log("in not completed");
        //console.log(JSON.stringify(this.event));

        disambiguateSlot.call(this);
        this.emit(":delegate", updatedIntent);
    } else {
        console.log("in completed");
        //console.log("returning: "+ JSON.stringify(this.event.request.intent));
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent.slots;
    }
    return null;
}
function resetAttributes() {
    this.attributes.quizScore = 0;
    this.attributes.quizNo = 0;
    this.attributes.Result = null;
    //this.attributes.quizArray = null;
    //this.attributes.QuizOptionArray = null;
    //this.attributes.correctAnswersNo = null;
    //this.attributes.storedQuestion = null;
}
function getRandom(min, max) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

// If the user said a synonym that maps to more than one value, we need to ask
// the user for clarification. Disambiguate slot will loop through all slots and
// elicit confirmation for the first slot it sees that resolves to more than
// one value.
function disambiguateSlot() {
    let currentIntent = this.event.request.intent;

    Object.keys(this.event.request.intent.slots).forEach(function (slotName) {
        let currentSlot = this.event.request.intent.slots[slotName];
        let slotValue = slotHasValue(this.event.request, currentSlot.name);
        if (currentSlot.confirmationStatus !== 'CONFIRMED' &&
            currentSlot.resolutions &&
            currentSlot.resolutions.resolutionsPerAuthority[0]) {

            if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
                // if there's more than one value that means we have a synonym that
                // mapped to more than one value. So we need to ask the user for
                // clarification. For example if the user said "mini dog", and
                // "mini" is a synonym for both "small" and "tiny" then ask "Did you
                // want a small or tiny dog?" to get the user to tell you
                // specifically what type mini dog (small mini or tiny mini).
                if (currentSlot.resolutions.resolutionsPerAuthority[0].values.length > 1) {
                    let prompt = 'Which would you like';
                    let size = currentSlot.resolutions.resolutionsPerAuthority[0].values.length;
                    currentSlot.resolutions.resolutionsPerAuthority[0].values.forEach(function (element, index, arr) {
                        prompt += ` ${(index == size - 1) ? ' or' : ' '} ${element.value.name}`;
                    });

                    prompt += '?';
                    let reprompt = prompt;
                    // In this case we need to disambiguate the value that they
                    // provided to us because it resolved to more than one thing so
                    // we build up our prompts and then emit elicitSlot.
                    this.emit(':elicitSlot', currentSlot.name, prompt, reprompt);
                }
            } else if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
                // Here is where you'll want to add instrumentation to your code
                // so you can capture synonyms that you haven't defined.
                console.log("NO MATCH FOR: ", currentSlot.name, " value: ", currentSlot.value);

                if (REQUIRED_SLOTS.indexOf(currentSlot.name) > -1) {
                    let prompt = "What " + currentSlot.name + " are you looking for";
                    this.emit(':elicitSlot', currentSlot.name, prompt, prompt);
                }
            }
        }
    }, this);
}

// Given the request an slot name, slotHasValue returns the slot value if one
// was given for `slotName`. Otherwise returns false.
function slotHasValue(request, slotName) {

    let slot = request.intent.slots[slotName];

    //uncomment if you want to see the request
    //console.log("request = "+JSON.stringify(request));
    let slotValue;

    //if we have a slot, get the text and store it into speechOutput
    if (slot && slot.value) {
        //we have a value in the slot
        slotValue = slot.value.toLowerCase();
        return slotValue;
    } else {
        //we didn't get a value in the slot.
        return false;
    }
}
// End Skill Code
// Language Model  for reference
var interactionModel = [
    {
        "name": "AMAZON.CancelIntent",
        "samples": []
    },
    {
        "name": "AMAZON.HelpIntent",
        "samples": []
    },
    {
        "name": "AMAZON.StopIntent",
        "samples": []
    },
    {
        "name": "DiscussFeeling",
        "slots": [
            {
                "name": "discuss",
                "type": "discuss"
            },
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "feeling",
                "type": "feelingType",
                "samples": [
                    "I am having a  {feeling} day",
                    "{feeling}",
                    "I have a {feeling} day"
                ]
            }
        ],
        "samples": [
            "{discuss} my feelings",
            "{want} to {discuss}",
            "I {want} to {discuss}",
            "I {want} to {discuss} my feelings"
        ]
    },
    {
        "name": "Advice",
        "slots": [
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "advices",
                "type": "advices"
            }
        ],
        "samples": [
            "{advices}",
            "I {want} some {advices}"
        ]
    },
    {
        "name": "Test",
        "slots": [
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "tests",
                "type": "tests"
            }
        ],
        "samples": [
            "take an assessment {tests}",
            "assessment {tests}",
            "I {want} to take an assessment {tests}",
            "{tests}",
            "take a {tests}",
            "I {want} to take a {tests}"
        ]
    },
    {
        "name": "EXTREME",
        "slots": [
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "TRIGGER",
                "type": "TRIGGER"
            }
        ],
        "samples": [
            "{TRIGGER}",
            "I {want} to {TRIGGER}"
        ]
    },
    {
        "name": "LaunchRequest"
    }
];
var intentsReference = [
    {
        "name": "AMAZON.CancelIntent",
        "samples": []
    },
    {
        "name": "AMAZON.HelpIntent",
        "samples": []
    },
    {
        "name": "AMAZON.StopIntent",
        "samples": []
    },
    {
        "name": "DiscussFeeling",
        "slots": [
            {
                "name": "discuss",
                "type": "discuss"
            },
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "feeling",
                "type": "feelingType",
                "samples": [
                    "I am having a  {feeling} day",
                    "{feeling}",
                    "I have a {feeling} day"
                ]
            }
        ],
        "samples": [
            "{discuss} my feelings",
            "{want} to {discuss}",
            "I {want} to {discuss}",
            "I {want} to {discuss} my feelings"
        ]
    },
    {
        "name": "Advice",
        "slots": [
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "advices",
                "type": "advices"
            }
        ],
        "samples": [
            "{advices}",
            "I {want} some {advices}"
        ]
    },
    {
        "name": "Test",
        "slots": [
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "tests",
                "type": "tests"
            }
        ],
        "samples": [
            "take an assessment {tests}",
            "assessment {tests}",
            "I {want} to take an assessment {tests}",
            "{tests}",
            "take a {tests}",
            "I {want} to take a {tests}"
        ]
    },
    {
        "name": "EXTREME",
        "slots": [
            {
                "name": "want",
                "type": "want"
            },
            {
                "name": "TRIGGER",
                "type": "TRIGGER"
            }
        ],
        "samples": [
            "{TRIGGER}",
            "I {want} to {TRIGGER}"
        ]
    },
    {
        "name": "LaunchRequest"
    }
];