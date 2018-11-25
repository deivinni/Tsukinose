const Discord  = require('discord.js');
const config   = require('../database/settings.js');
const database = require('../database/database.js');

module.exports.run = (bot, message, args) => {
    database.Guilds.findOne({
        '_id': message.guild.id
    }, (erro, docs) => {
        if(docs){
            let role = message.mentions.roles.first()
            if(!role){
                message.channel.send(`${message.author}, você está utilizando o comando de forma incorreta! Use: ${config.prefix}muterole @role`);
            } else if(role){
                docs.muteRole = role.id;
                docs.save();
                message.channel.send(`${message.author}, role de mute satado com sucesso como \`<@${role.id}>\``);
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
            });
            servidor.save();
            message.channel.send(`${message.author}, use o comando novamete!`);
        }
        if(erro){
            message.channel.send(`${message.author}, infelizmente ocorreu um erro!`);
        }
    })
}

module.exports.config = {
    name:        'muterole',
    aliases:     ['mutecargo'],
    noaliases:   'sem aliases',
    description: 'setar cargo de muted do servidor',
    acessible:   'administradores',
    usage:       `${config.prefix}muterole @role`,
    grup:        'moderação'
}
