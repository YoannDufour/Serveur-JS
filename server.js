const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('./src/ApiModels');

const apiRouter = require('./src/ApiRoutes');

mongoose.connect('mongodb://localhost/yoanndufour');
mongoose.connection.on('error', console.error.bind(console, 'connection error :'));

mongoose.connection.on('open', function () {
    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false, limit: "15mb"})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json({limit: "15mb"})); // parse application/json


    app.use(function (req, res, next) {
        req.data = {};
        next();
    });

    app.use('/api', apiRouter);//jointure du routeur

    app.use(express.static(__dirname + '/public'));

    app.use(function (req, res, next) {
        next({
            message: `Erreur 404 : ${req.method} ${req.url} introuvable.`,
            status: 404
        });
    });

    app.use(function (err, req, res, next) {
        const status = err.status || 500;
        res.status(status);

        if (app.get('env') === 'development') {
            console.error(`${req.method} ${req.baseUrl}`); // en développement uniquement
        }

        res.format({
            'text/plain': function () {
                res.send(err.message);
            },

            'text/html': function () {
                res.send(
                    `<!DOCTYPE html>
                <html lang="fr">
                    <head>
                        <meta charset="utf-8">
                    <title>Erreur ${status}</title>
                    </head>
                    <body>
                        <pre>${err.message}</pre>
                    </body>
                </html>`
                );
            },

            'application/json': function () {
                res.send({"message": err.message});
            },

            'default': function () {
                res.status(406).send("\"Accept\" Header Not Acceptable.");
            }
        });
    });

    const server = app.listen(3000, function() {
        console.log('server running on port 3000');
    });

    const io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log(socket.id)
        socket.on('SEND_MESSAGE', function (data) {
            io.emit('MESSAGE', data)
        });
    });
});