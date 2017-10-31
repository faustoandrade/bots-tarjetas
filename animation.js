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

// AnimationCard
bot.dialog('/', [
    function (session) {
        var AnimationCard = new builder.AnimationCard(session)
        .title('API ')
        .subtitle('Animation Card')
        .image(builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'))
        .media([
            { url: 'https://developers.giphy.com/static/img/api.c99e353f761d.gif' }
        ]);
        var msj = new builder.Message(session).addAttachment(AnimationCard);
        session.send(msj);
    }
]);