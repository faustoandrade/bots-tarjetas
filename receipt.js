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

//ReceiptCard
bot.dialog('/', [
    function (session) {
        var ReceiptCard = new builder.ReceiptCard(session)
        .title('John Doe')
        .facts([
            builder.Fact.create(session, '7890', 'numero de orden'),
            builder.Fact.create(session, 'VISA 8888-****', 'metodo de pago')
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 120.75', 'valor de la transferencia')
                .quantity(123)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
            builder.ReceiptItem.create(session, '$ 45.00', 'App Service')
                .quantity(720)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
        ])
        .tax('$ 7.50')
        .total('$ 90.95')
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'Mas información')
                .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
        ]);
        var msj = new builder.Message(session).addAttachment(ReceiptCard);
        session.send(msj);
    }
]);