'use strict';

const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Device = require('./models/device');

const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);  
const ports = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
app.get('/device', (res, req) => {
    res.send(200)
})

app.get('/device/:deviceId', (res, req) => {
    let deviceId = req.params.productId

    device.findById(deviceId, (err, device) => {
        if(err) return res.status(500).send({message: `Error al reañizar la petición ${err}`})
        if(!device) return res.status(404).send({message: `El dispositivo no existe`})

        res.status(200).send({device})

    })
})

app.post('/', (req, res) =>{
    console.log('POST /');
    console.log(req.body);

    let device = new Device()
    device.state = req.body.state
    
    device.save((err, deviceStored) => {
        if (err) res.status(500).send({message: `Error al guardar en la base de datos ${err}`})

        res.status(200).send({device: deviceStored})
    })
});

mongoose.connect('mongodb://localhost:27017/pir', (err, res) =>{
    if(err) {
        return console.log(`Error al intentar conectar con la base de datos: ${err}`)
    }
    console.log('Conexion con base de datos establecida')

    server.listen(ports, () => {
        console.log('Server listen on port', `${ports}`);
    });
});
