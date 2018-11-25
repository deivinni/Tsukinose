const mongoose = require('mongoose');
mongoose.connect('mongodb url', {
    useNewUrlParser: true
});
    (err) => {
        if(err){
            return console.log('Erro ao conectar a database!');
        }
    console.log('Conectado a database!');
}

var User = new mongoose.Schema({
    _id: {
        type: String
    },
    background: {
        type: String,
        default: 'background padrão'
    },
    level: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    rep: {
        type: Number,
        default: 0
    }
});
var Guild = new mongoose.Schema({
    _id: {
        type: String
    },
    banimage: {
        type: String,
        default: 'imagem de ban'
    },
    logs: {
        type: Boolean,
        default: false
    },
    chatLogs: {
        type: String,
        default: 'Nenhum'
    },
    chatWelcome: {
        type: String,
        default: false
    },
    welcome: {
        type: Boolean,
        default: false
    },
    chatLeave: {
        type: String,
        default: 'Nenhum'
    },
    leave: {
        type: Boolean,
        default: false
    },
    chatLevel: {
        type: String,
        default: 'Nenhum'
    },
    level: {
        type: Boolean,
        default: false
    },
    coins: {
        type: Boolean,
        default: true
    },
    contador: {
        type: Boolean,
        default: false
    },
    chatContador: {
        type: String,
        default: 'Nenhum'
    },
    lang: {
        type: String,
        default: 'pt-br'
    },
    invites: {
        type: Boolean,
        default: true
    },
    chatRegras: {
        type: String,
        default: 'Nenhum'
    },
    muteRole: {
        type: String,
        deafult: 'Nenhum'
    }
});
let Users = mongoose.model('Users', User);
let Guilds = mongoose.model('Guilds', Guild)
exports.Users  = Users;
exports.Guilds = Guilds;
