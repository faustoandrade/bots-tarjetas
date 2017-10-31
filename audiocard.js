var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// AudiCard
bot.dialog('/', [
    function (session) {
        var AudioCard = new builder.AudioCard(session)
        .title('AUDIO DE HUMOR EN INGLES')
        .subtitle('beans')
        .text('An Announcer has a serious problem while talking about National Beans Month, July')
        .image(builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'))
        .media([
            { url: 'http://www.wavlist.com/humor/001/beans1.wav' }
            
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/The_Empire_Strikes_Back', 'LEA MAS SOBRE....')
            
        ]);
        var msj = new builder.Message(session).addAttachment(AudioCard);
        session.send(msj);
    }
]);