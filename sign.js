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

//SigninCard
bot.dialog('/', [
    function (session) {
        var SigninCard = new builder.SigninCard(session)
        .text('Esa es una tarjeta tipo signCard.')
        .button('BOTON', 'https://login.microsoftonline.com')

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(SigninCard);
        session.send(msj);
    }
]);