const Discord  = require('discord.js');
const config   = require('../database/settings.js');
const database = require('../database/database.js');
module.exports.run = (bot, message, args) => {
    if(!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send(`${message.author}, você não tem permissão necessária!`)
    let usuario = message.mentions.users.first() || bot.users.get(args[0]);
    let reason;
    if(!args[1]) message.channel.send(`${message.author}, use o comando da seguinte forma: ${config.prefix}ban @usuário <motivo>`);
    if(args[1]) reason = args.slice(1).join(' ');
    message.channel.send(`${message.author}, tem certeza que deseja banir o membro: \`${usuario.tag}\` - \`${usuario.id}\` ?`)
    .then(async(msg) => {
        msg.react('✅').then(() => {
            msg.react('❌')
        })
        bot.on('messageReactionAdd', async(reaction, user) => {
            if (reaction.emoji.name === '✅' && user.id !== bot.user.id && user.id === usuario.id) {
                if (user.id === message.author.id) return;
                reaction.remove(user);
                msg.delete();
                message.guild.member(usuario).ban(reason);
                message.channel.send(`${message.author}, o usuário \`${usuario.tag}\` foi banido do servidor!`);
            }
            if (reaction.emoji.name === '❌' && user.id !== bot.user.id && user.id === usuario.id) {
                if (user.id === message.author.id) return;
                reaction.remove(user);
                msg.delete();
                message.channel.send(`${message.author}, o usuário \`${usuario.tag}\` não foi banido do servidor!`);
            }
        })
    })
}

module.exports.config = {
    name:        'ban',
    aliases:     ['banir'],
    noaliases:   'sem aliases',
    description: 'bane algum membro de seu servidor',
    acessible:   'administradores',
    usage:       `${config.prefix}ban @usuário`,
    grup:        'moderação'
}
