const Discord  = require('discord.js');
const config   = require('../database/settings.js');
const database = require('../database/database.js');

module.exports.run = (bot, message, args) => {
    let member = message.mentions.users.first() || bot.users.get(args[0]) || message.author;

    let avatar = member.displayAvatarURL;
    if(avatar.endsWith('.gif')){
        avatar = `${member.displayAvatarURL}?size=2048`
    }
    message.channel.send({
        embed:{
            author:{
                icon_url: '',
                name: `Avatar de ${member.tag}`
            },
            color: config.color,
            description: `Clique __[aqui](${avatar})__ para fazer download!`,
            image: {
                url: avatar
            }
        }
    })
}

module.exports.config = {
    name:        'avatar',
    aliases:     ['pic', 'picture', 'usericon'],
    noaliases:   'sem aliases',
    description: 'veja a fota de algum usuário',
    acessible:   'membros',
    usage:       `${config.prefix}avatar (@usuário)`,
    grup:        'informações'
}
