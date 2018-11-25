const Discord  = require('discord.js');
const config   = require('../database/settings.js');
const database = require('../database/database.js');

module.exports.run = (bot, message, args) => {
    database.Guilds.findOne({
        '_id': message.guild.id
    }, (erro, docs) => {
        var channel = message.mentions.channels.first();
        if(docs){
            if(message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send(`${message.author}, você não tem permissão necessaria!`);
            if(args[0] === 'regras'){
                if(!channel){
                    docs.chatRegras = message.channel.id;
                    docs.save();
                    message.channel.send(`${message.author}, chat de regras setado com sucesso em <#${message.channel.id}>`);
                } else if(channel){
                    docs.chatRegras = channel.id;
                    docs.save();
                    message.channel.send(`${message.author}, chat de regras setado com sucesso em <#${channel.id}>`)
                }
            } else if(args[0] === 'logs'){
                if(!channel){
                    docs.chatLogs = message.channel.id;
                    docs.logs = true;
                    docs.save();
                    message.channel.send(`${message.author}, chat de logs setado com sucesso em <#${message.channel.id}>`);
                } else if(channel){
                    docs.chatLogs = channel.id;
                    docs.logs = true;
                    docs.save();
                    message.channel.send(`${message.authot}, chat de logs setado com sucesso em <#${channel.id}>`);
                }
            } else if(args[0] === 'level'){
                if(!channel){
                    docs.chatLevel = message.channel.id;
                    docs.level = true;
                    docs.save();
                    message.channel.send(`${message.author}, chat de level setado com sucesso em <#${message.channel.id}>`);
                } else if(channel){
                    docs.chatLevel = channel.id;
                    docs.level = true;
                    docs.save();
                    message.channel.send(`${message.author}, chat de level setado com sucesso em <#${message.channel.id}>`);
                }
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
    name:        'chat',
    aliases:     ['canal', 'channel'],
    noaliases:   'sem aliases',
    description: 'setar canais especificos de seu servidor',
    acessible:   'administradores',
    usage:       `${config.prefix}chat <regras || logs || level> (#chat)`,
    grup:        'moderação'
}
