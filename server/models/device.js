'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let deviceSchema = new Schema({
    state:{ type: Boolean }
}, { versionKey: false });

let Device = mongoose.model('Device', deviceSchema);

module.exports = Device; 