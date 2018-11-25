const { RichEmbed } = require('discord.js');
const database = require('../database/database.js');
const config = require('../database/settings.js');
module.exports.run = (bot, message, args) => {
    const filter = m => m.author.id === message.author.id;
    let embedd = new RichEmbed()
    .setAuthor(`Comandos da ${bot.user.username}`, 'https://cdn.discordapp.com/emojis/499391393559609357.gif?v=1')
    .setColor(config.color)
    .setFooter('Digite um comando em 20  segundos para mais informações!', 'https://cdn.discordapp.com/emojis/488756791124033537.gif?v=1')
    .addField('Comando de Informações', '`ping`,`avatar`')
    .addField('Comandos de Moderação', '`welcome`,`contador`,`chat`,`muterole`')
    .addField('Comando de utilidades', '`ajuda`,`sugestão`')
    .setTimestamp(new Date())
    .setDescription(`Use \`${config.prefix}\` para todos os comandos!`)
    .setThumbnail(bot.user.avatarURL);
    message.reply(embedd)

    message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000
    }).then((collector) => {

        if(collector.first().content === 'cancelar' && 'cancel'){
            message.channel.send(`${message.author}, ajuda cancelada!`);
        }

        var command = collector.first().content
        if(bot.commands.has(command)){
            command = bot.commands.get(command)
            let embeddd = new RichEmbed()
                .setAuthor(`Comandos da ${bot.user.username}`, 'https://cdn.discordapp.com/emojis/499391393559609357.gif?v=1')
                .addField('Nome', `${command.config.name}`)
                .addField('Descrição', `${command.config.description || 'nenhuma'}`)
                .addField('Aliases', `${command.config.aliases.map(a => a).join(', ') || command.config.noaliases}`)
                .addField('Acessivel por', `${command.config.acessible || 'membros'}`)
                .addField('Grupo', `${command.config.grup || 'sem grupo'}`)
                .addField('Use', `${command.config.usage || 'nenhuma'}`)
                .setColor(config.color)
                .setFooter(`Ajuda em ${command.config.name}`, message.author.avatarURL)
                .setThumbnail(bot.user.avatarURL);
            message.channel.send(embeddd).catch((error) => {
                message.channel.send(`${message.author}, comando não encontrado!`)
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}

module.exports.config = {
    name:        'ajuda',
    aliases:     ['help'],
    noaliases:   'sem aliases',
    description: 'comando para ajuda!',
    acessible:   'membros',
    usage:       `${config.prefix}help`,
    grup:        'utilidades'
}
