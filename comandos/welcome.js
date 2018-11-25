const Discord  = require('discord.js');
const config   = require('../database/settings.js');
const database = require('../database/database.js');
const moment   = require('moment');
moment.locale('pt-BR');
module.exports.run = (bot, message, args) => {
    database.Guilds.findOne({
        '_id': message.guild.id
    }, (erro, docs) => {
        if(docs){
            if(message.author.id !== 'seu id' && message.member.hasPermission('ADMINISTRATOR')){
                return message.channel.send(`${message.author}, você não tem permissão necessaria!`);
            }
            if(!args[0]){
                return message.channel.send(`${message.author}, está utilizando o comando de forma incorreta! Use: \`${config.prefix}welcome <setar || remover || info> (chat)\``);
            }
            if(args[0] === 'setar'){
                let channel = message.mentions.channels.first();
                if(channel){
                    docs.welcome     = true;
                    docs.chatWelcome = channel.id;
                    docs.save();
                    message.channel.send(`${message.author}, welcome setado com sucesso em ${channel}`);
                } else if(!channel){
                    docs.welcome     = true;
                    docs.chatWelcome = message.channel.id;
                    docs.save();
                    message.channel.send(`${message.author}, welcome setado com sucesso em <#${message.channel.id}>`);
                }
            } else if(args[0] === 'remover'){
                docs.welcome = false;
                docs.save();
                message.channel.send(`${message.author}, welcome removido com sucesso`);
            } else if(args[0] === 'info'){
                message.channel.send('Uma breve **prévia** do embed de **welcome**!\n**Embed**: `1`(quando a conta foi **criada** em menos de `5` dias)',{
                    embed:{
                        author:{
                            icon_url: message.guild.iconURL,
                            name: 'Bem Vindo ' + message.author.username
                        },
                        color: 0xff0000,
                        description: `**Criada** a menos de \`5\` dias... **Possivelmente** \`SelfBot\``,
                        thumbnail:{
                            url: message.author.avatarURL
                        },
                        footer:{
                            icon_url: message.author.avatarURL,
                            text: `ID - ${message.author.id}`
                        },
                        fields:[
                            {
                                name: 'Informações:',
                                value: `TAG: ${message.author.tag}\nCriada em ${moment(message.author.createdAt).format('LLL')}\nServidor: ${message.guild.name}\nRegras: ${'<#'+docs.chatRegras+'>' || 'não setado'}\nTotal de usuários: ${message.guild.memberCount}`,
                                inline: false
                            }
                        ],
                        timestamp: new Date()
                    }
                }) && message.channel.send('**Embed**: `2`(quando a conta foi **criada** entre `5` e `15` dias)',{
                    embed:{
                        author:{
                            icon_url: message.guild.iconURL,
                            name: 'Bem Vindo ' + message.author.username
                        },
                        color: 0xffff00,
                        description: `**Criada** entre \`5\` e \`15\` dias... **Suspeita** de \`SelfBot\``,
                        thumbnail:{
                            url: message.author.avatarURL
                        },
                        footer:{
                            icon_url: message.author.avatarURL,
                            text: `ID - ${message.author.id}`
                        },
                        fields:[
                            {
                                name: 'Informações:',
                                value: `TAG: ${message.author.tag}\nCriada em: ${moment(message.author.createdAt).format('LLL')}\nServidor: ${message.guild.name}\nRegras: ${'<#'+docs.chatRegras+'>' || 'não setado'}\nTotal de usuários: ${message.guild.memberCount}`,
                                inline: false
                            }
                        ],
                        timestamp: new Date()
                    }
                }) && message.channel.send('**Embed**: `3`(quando a contra foi **criada** a mais de `15` dias)',{
                    embed:{
                        author:{
                            icon_url: message.guild.iconURL,
                            name: 'Bem Vindo ' + message.author.username
                        },
                        color: 0x00ff00,
                        description: `**Criada** a mais de \`15\` dias... **Sem suspeitas** de \`SelfBot\`, mas ainda não é totalmente seguro!`,
                        thumbnail:{
                            url: message.author.avatarURL
                        },
                        footer:{
                            icon_url: message.author.avatarURL,
                            text: `ID - ${message.author.id}`
                        },
                        fields:[
                            {
                                name: 'Informações:',
                                value: `TAG: ${message.author.tag}\nCriada em: ${moment(message.author.createdAt).format('LLL')}\nServidor: ${message.guild.name}\nRegras: ${'<#'+docs.chatRegras+'>' || 'não setado'}\nTotal de usuários: ${message.guild.memberCount}`,
                                inline: false
                            }
                        ],
                        timestamp: new Date()
                    }
                })
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
    name:        'welcome',
    aliases:     ['bv', 'bemvindo'],
    noaliases:   'sem aliases',
    description: 'configure o sistema de welcome para seu servidor',
    acessible:   'administradores',
    usage:       `${config.prefix}welcome <setar || remover || info> (#chat)`,
    grup:        'moderação'
}
