const Discord  = require('discord.js');
const config   = require('../database/settings.js');
const database = require('../database/database.js');

module.exports.run = (bot, message, args) => {
    try{
        let suges = args.slice(0).join(' ');
        let servidor = message.guild.id === 'id do servidor';
        let canal = 'id do canal';
        bot.guilds.get(`id do servidor`).channels.get(`id do canal`)
        .createWebhook(message.author.username, message.author.avatarURL)
        .then((w) => {
            w.send(`${suges}`)
        })
        if(!servidor){
            message.channel.send(`${message.author}, sua sugestão foi enviada com sucesso para meu servidor!`);
        } else if(servidor){
            message.channel.send(`${message.author}, sua sugestão foi enviada para o canal <#${canal}>`);
        }
    } catch (error) {
        message.channel.send(`${message.author}, infelizmente ocorreu um erro!`);
        console.log(error)
    }
}

module.exports.config = {
    name:        'sugestao',
    aliases:     ['sugestao'],
    noaliases:   'sem aliases',
    description: 'envie uma sugestão para meu servidor',
    acessible:   'membros',
    usage:       `${config.prefix}sugestao <mensagem>`,
    grup:        'utilidades'
}
