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

//ThumbnailCard

bot.dialog('/', [
    function (session) {
        var ThumbnailCard = new builder.ThumbnailCard(session)
        .title('BotFramework Thumbnail Card')
        .subtitle('Herramienta para interacción con los usuarios')
        .text('Esta es una tarjeta tipo ThumbnailCard')
        .images([
            builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework', 'BOTON')
        ]);

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(ThumbnailCard);
        session.send(msj);
    }
]);