const Discord  = require('discord.js');
const database = require('../database/database.js');
const config   = require('../database/settings.js');
function traduzir(_números) {
    _números = _números.toString();
    var texto = ``,
    números = { 
        1: 'one', 
        2: 'two', 
        3: 'three', 
        4: 'four', 
        5: 'five', 
        6: 'six', 
        7: 'seven', 
        8: 'eight', 
        9: 'nine', 
        0: 'zero' 
    };
    for(let i =0; i < _números.length; i++) 
        texto += ':' + números[parseInt(_números[i])] + ':';
    return texto;
}
module.exports.run = (bot, message, args) => {
    database.Guilds.findOne({
        '_id': message.guild.id
    }, (erro, docs) => {
        if(docs){
            if(message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send(`${message.author}, você não tem permissão necessaria!`);
            let channel = message.mentions.channels.first();
            if(!channel){
                docs.contador     = true;
                docs.chatContador = message.channel.id;
                docs.save();
                message.channel.send(`${message.author}, contador setado com sucesso em <#${message.channel.id}>`);
                bot.guilds.get(message.guild.id).channels.get(docs.chatContador).setTopic(`<a:happy:418762723527229443> | Membros ${traduzir(message.guild.memberCount)}`);
            } else if(channel){
                docs.contador     = true;
                docs.chatContador = channel.id;
                docs.save();
                message.channel.send(`${message.author}, contador setado com sucesso em <#${channel.id}>`);
                bot.guilds.get(message.guild.id).channels.get(docs.chatContador).setTopic(`<a:happy:418762723527229443> | Membros ${traduzir(message.guild.memberCount)}`);
            }
        } else {
            let servidor = new database.Guilds({
                _id: message.guild.id,
                logs: false,
                chatLogs: 'Nenhum',
                welcome: false,
                chatWelcome: 'Nenhum',
                leave: false,
                chatLeave: 'Nenhum',
                level: false,
                chatLevel: 'Nenhum',
                contador: false,
                chatContador: 'Nenhum',
                invites: true,
                chatRegras: 'Nenhum'
            })
            servidor.save();
            message.channel.send(`${message.author}, use o comando novamente!`);
        }
        if(erro){
            message.channel.send(`${message.author}, infelizmente ocorreu um erro!`);
        }
    })
}

module.exports.config = {
    name:        'contador',
    aliases:     [],
    noaliases:   'sem aliases',
    description: 'configure sistema de contador para seu servidor',
    acessible:   'administradores',
    usage:       `${config.prefix}contador (#chat)`,
    grup:        'moderação'
}
