const Discord = require('discord.js');
const config  = require('../database/settings.js');
module.exports.run = (bot, message, args) => {
    let msgping1 = new Date();
    let botping = new Date() - message.createdAt;
    let msgping2 = new Date() - msgping1;
    message.channel.send({
        embed:{
            author:{
                icon_url: 'https://cdn.discordapp.com/emojis/488757308248293396.gif?v=1',
                name: 'Calculando...'
            },
            color: 0x511ba3
        }
    }).then(
        (msg) => {
            setTimeout(() => {
                msg.edit({
                    embed:{
                        description: `API: \`${Math.floor(bot.ping)}\` ms!\nBOT: \`${Math.floor(botping)}\` ms!`,
                        color: 0x511ba3
                    }
                })
            }, 3 * 1000)
            setTimeout(() => {
                msg.delete();
            }, 8 * 1000)
        }
    )
}

module.exports.config = {
    name:        'ping',
    aliases:     ['latencia', 'latêcia'],
    noaliases:   'sem aliases',
    description: 'veja o ping do bot',
    acessible:   'membros',
    usage:       `${config.prefix}ping`,
    grup:        'informação'
}
