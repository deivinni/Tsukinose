const Discord  = require('discord.js');
const config   = require('./database/settings.js');
const database = require('./database/database.js');
const fs       = require('fs');
const bot      = new Discord.Client({
    autoReconnect: true,
    messageCacheMaxSize: 4048,
    fetchAllMembers: false,
    disabledEvents: [
        'typingStart',
        'typingStop',
        'guildMemberSpeaking'
    ],
    messageCacheLifetime: 1680,
    disableEveryone: false
});
bot.commands   = new Discord.Collection();
bot.aliases    = new Discord.Collection();

fs.readdir('./comandos', (err, file) => {
    if(err) console.log(err)
    let jsfile = file.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0){
        console.log('Não encontrei nenhum comando!')
        return;
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./comandos/${f}`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        })
    })
})

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

bot.on('message', async(message) => {
    if(message.channel.id === '469492117232812043'){
        message.react('👍').then(() => {
            message.react('👎').then(() => {
                message.react('❤')
            })
        })
    }

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.content.includes('<@'+bot.user.id+'>')){
        message.channel.send(`${message.author}, meu prefixo é \`${config.prefix}\``);
    }
    if(!message.content.startsWith(config.prefix)) return;

    let args    = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let comando = args.shift().toLowerCase();
    let ma      = message.content.split(' ');
    let cmd     = ma[0];
    
    let commandFile = bot.commands.get(cmd.slice(config.prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(config.prefix.length)))
    if (commandFile) commandFile.run(bot, message, args)
});

bot.on('ready', () => {
    bot.user.setActivity(`${config.prefix}help | ${bot.users.size} users!`, {type: 'STREAMING', url: 'https://www.twitch.tv/HPBGalactico'});
    bot.user.setStatus('idle');
    console.log(`Online!\nServidores: ${bot.guilds.size}\nUsuários: ${bot.users.size}\nCanais: ${bot.channels.size}\nEmojis: ${bot.emojis.size}\n${bot.user.username} online com sucesso!`);
});

bot.on('guildCreate', (guild) => {
    bot.user.setActivity(`${config.prefix}help | ${bot.users.size} users!`, {type: 'STREAMING', url: 'https://www.twitch.tv/HPBGalactico'});
});

bot.on('guildDelete', (guild) => {
    bot.user.setActivity(`${config.prefix}help | ${bot.users.size} users!`, {type: 'STREAMING', url: 'https://www.twitch.tv/HPBGalactico'});
});

bot.on('guildMemberAdd', (member) => {
    database.Guilds.findOne({
        '_id': member.guild.id
    }, (erro, docs) => {
        if(docs){
            if(docs.welcome){
                if(member.guild.channels.get(docs.chatWelcome)){
                    if(member.user.createdTimestamp < 5){
                        let embed5 = new Discord.RichEmbed()
                        .setAuthor(`Bem Vindo ${member.user.username}`, member.guild.iconURL)
                        .setColor(0xff0000)
                        .setDescription(`**Criada** a menos de \`5\` dias... **Possivelmente** \`SelfBot\``)
                        .setThumbnail(member.user.avatarURL)
                        .setFooter(`ID - ${member.user.id}`, member.user.avatarURL)
                        .addField('Informações', `TAG: ${member.user.tag}\nCriada em ${moment(member.user.createdAt).format('LLL')}\nServidor: ${member.guild.name}\nRegras: ${'<#'+docs.chatRegras+'>' || 'não setado'}\nTotal de usuários: ${member.guild.memberCount}`)
                        .setTimestamp(new Date());
                        bot.guilds.get(member.guild.id).channels.get(docs.chatWelcome).send(embed5)
                    } else if(member.user.createdTimestamp > 5 && member.user.createdTimestamp <= 15){
                        let embed515 = new Discord.RichEmbed()
                        .setAuthor(`Bem Vindo ${member.user.username}`, member.guild.iconURL)
                        .setDescription(`**Criada** entre \`5\` e \`15\` dias... **Suspeita** de \`SelfBot\``)
                        .setColor(0xffff00)
                        .setThumbnail(member.user.avatarURL)
                        .setFooter(`ID - ${member.user.id}`, member.user.avatarURL)
                        .addField('Informações', `TAG: ${member.user.tag}\nCriada em: ${moment(member.user.createdAt).format('LLL')}\nServidor: ${member.guild.name}\nRegras: ${'<#'+docs.chatRegras+'>' || 'não setado'}\nTotal de usuários: ${member.guild.memberCount}`)
                        .setTimestamp(new Date());
                        bot.guilds.get(member.guild.id).channels.get(docs.chatWelcome).send(embed515)
                    } else if(member.user.createdTimestamp > 15){
                        let embed15 = new Discord.RichEmbed()
                        .setAuthor(`Bem Vindo ${member.user.username}`, member.guild.iconURL)
                        .setColor(0x00ff00)
                        .setDescription(`**Criada** a mais de \`15\` dias... **Sem suspeitas** de \`SelfBot\`, mas ainda não é totalmente seguro!`)
                        .setThumbnail(member.user.avatarURL)
                        .setFooter(`ID - ${member.user.id}`, member.user.avatarURL)
                        .addField('Informações', `TAG: ${member.user.tag}\nCriada em: ${moment(member.user.createdAt).format('LLL')}\nServidor: ${member.guild.name}\nRegras: ${'<#'+docs.chatRegras+'>' || 'não setado'}\nTotal de usuários: ${member.guild.memberCount}`)
                        .setTimestamp(new Date())
                        bot.guilds.get(member.guild.id).channels.get(docs.chatWelcome).send(embed15)
                    }
                }
            } if(docs.contador){
                bot.guilds.get(member.guild.id).channels.get(docs.chatContador).setTopic(`<a:happy:418762723527229443> | Membros ${traduzir(member.guild.memberCount)}`)
            }
        }
    })
})

bot.on('guildMemberRemove', (member) => {
    database.Guilds.findOne({
        '_id': member.guild.id
    }, (erro, docs) => {
        if(docs){
            if(docs.contador){
                bot.guilds.get(member.guild.id).channels.get(docs.chatContador).setTopic(`<a:happy:418762723527229443> | Membros ${traduzir(member.guild.memberCount)}`)
            }
        }
    })
})

bot.login(config.token);
