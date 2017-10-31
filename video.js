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

//VideoCard
bot.dialog('/', [
    function (session) {
        var VideoCard = new builder.VideoCard(session)
        .title('ES POR TU GRACIA')
        .subtitle('Musica Religiosa')
        .text('Cancion cantada por el artista jesus adrian romero, donde deja un mensaje a la humanidad sobre la gracia del señor, sobre todo en los momentos de intimidad con nuestro señor.')
        .image(builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/220px-Big_buck_bunny_poster_big.jpg'))
        .media([
            { url: 'https://www.youtube.com/watch?v=fIIaYshihJo' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://peach.blender.org/', 'BOTON')
        ]);
        var msj = new builder.Message(session).addAttachment(VideoCard);
        session.send(msj);
    }
]);