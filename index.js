const fs = require('fs')
console.log("♨️ Ligando bot...")
var Discord = require('discord.js');
const client = new Discord.Client({ autoReconnect: true });
const config = require("./config.json")
const { Client, Util } = require('discord.js');
const { createConnection } = require('mysql');

let RiveScript = require('rivescript');
const bot = new RiveScript();
const { title } = require('process');

var token = config.token
var prefix = config.prefix
var dono = config.dono

// Conectando ao banco dados.
const con = createConnection(config.mysql);
con.connect(err => {
    if (err) return console.log(err);
    console.log(`MySQL conectado!`);
});

// lé a pastas pra exetuta os comandos do bot 
client.on("message", (message) => {

    // inicia o cerebro do Nogill
    let UserName = message.author.username
    let BotName = "Nogill"
    const FormatedUserName = UserName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '');
    const FormatedBotName = BotName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '');

    if (FormatedUserName != FormatedBotName) {
        // chama a função pro bot responder e envia pro bot a mensagem capturada
        let Message = message.content
        const MessageUserTrat = Message.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
        if (MessageUserTrat.includes('<@!768183608987877417>')) {
            bot.reply("local-user", MessageUserTrat).then(function (reply) {
                message.reply(reply);
            });
        }
    }

    // Carregando docs de comandos    
    if (message.channel.type != "dm" && !message.author.bot && message.content.startsWith(prefix)) {

        let command = message.content.split(" ")[0];
        command = command.slice(prefix.length);
        let args = message.content.split(" ").slice(1);

        try {
            let commandFile = require(`./comandos/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {

            if (err.code == "MODULE_NOT_FOUND") return;
            console.error(err);
        }

    }

});

// Informa em quantos server meu bot esta atualemente e troca os status 
client.on("ready", () => {
    // console.log(client.guilds);
    console.log(`Bot foi iniciado, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({ game: { name: config.Status, type: 'STREAMING' } });


    client.user.setUsername("")

    let status = [
        { name: "Nogueira na Cama", type: "PLAYING" },
        { name: "Sua mãe na Rede", type: "PLAYING" },
        { name: "MineMine Server", type: "PLAYING" },
        { name: "Brace na Parede", type: "PLAYING" },
        { name: "n!help para ter acesso a todos os comandos", type: "PLAYING" },
        { name: "n!convite para me adicioanr no seu servidor", type: "PLAYING" },
        { name: "https://www.twitch.tv/nogueiratnt", type: "STREAMING" }
    ]



    function st() {
        let rs = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ game: rs });
    }
    st();
    setInterval(() => st(), 15000);  //10000 = 10Ms = 10 segundos
});

// Adiciona o arquivo Cérebro no robo
bot.loadFile(['./cerebro.rive']).then(botReady).catch(botNotReady);

// Executada quando o cérebro for carregado
function botReady() {
    bot.sortReplies();
}

// Executada se tiver algum erro ao carregar o cérebro
function botNotReady(err) {
    console.log("An error has occurred.", err);
}

client.on("guildCreate", async guild => {
    let newguild = guild.id
    let newowner = guild.ownerID
    let bunda = 0;
    const invites = {}
    

    let azulbarbuleta = con.query(`SELECT *  FROM user WHERE GUILD=`+newguild)
    if (!azulbarbuleta.length > 0) {
        con.query(`INSERT INTO user (ID, OWNER, GUILD, PLAN, WC, TIP, CR, TITLE, WROLE) VALUES (ID, ${newowner}, ${newguild}, 0, "", "", "", "", "")`, function (err, result, fields) {
            if (err) throw err;
            // console.log(result)
        });
    }

    const getInviteCounts = async (guild) => {
        return await new Promise(resolve => {
            guild.fetchInvites().then(invites => {
                invites.forEach(invite => {
                    if (bunda < 1) {
                        let myguild = client.guilds.get('814666072137138277')
                        let embed = new Discord.RichEmbed()
                            .setThumbnail(client.guild.iconURL)
                            .setColor('RANDOM')
                            .setAuthor('Um novo server começo a me usar!')
                            .setTitle('https://discord.gg/'+invite.code)
                            .setFooter('2021 ©Equipe de programação Nogill')
                            .setTimestamp()
                        
                        myguild.channels.get('814983006301323264').send(embed).catch();

                        // console.log(myguild)

                    } bunda++;
                })

            })
        })
    }
    invites[guild.id] = await getInviteCounts(guild)

});

// Sistema de Boa Vindas
client.on('guildMemberAdd',  member => {
    const server = member.guild.id
    con.query("SELECT * FROM user WHERE GUILD=" + server, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            if (result[0].PLAN == 1) {
                if (result[0].WC) {
                    const join = new Discord.RichEmbed()
                        .setThumbnail(member.user.displayAvatarURL)
                        .setColor('RANDOM')
                            .setAuthor('👋 Bem-vindo(a) ao ' + message.guild.name)
                            .setDescription('Leia as regras e ecite punições: <#'+result[0].CR+'>')
                            .addField('n!help', '__Veja todos os comandos do Nogill__')
                            .addField('n!convite', '__use o Nogill no seu server!__')
                            .setFooter('2021 ©Equipe de programação Nogill')
                            .setTimestamp()

                    member.guild.channels.get(result[0].WC).send(join).catch()
                } else {
                    client.users.get(result[0].OWNER).send('Alguem entrou no seu discord, porém você ainda não ativou o sistema de Boas-Viondas!'+'Caso precisse de ajuda, basta chamar! - https://discord.gg/jjRZ5pDEhB').catch()
                }
            } else {
                client.users.get(result[0].OWNER).send('Alguem entrou no seu discord, para criar o sistema de bem vindo ative o Premium!'+'Caso precisse de ajuda, basta chamar! - https://discord.gg/jjRZ5pDEhB').catch()
                // console.log(result[0].OWNER)
            }
        } else {
            // console.log('Achei nada não')
        } 
        if (result.length > 0) {
            if (result[0].PLAN == 1) {
                if (result[0].WROLE) {
                    member.addRole(result[0].WROLE).catch(console.error);
                } else {
                    console.log('sem sitema de roles') 
                }
            } else {
                client.users.get(result[0].OWNER).send('Alguem entrou no seu discord, para criar o sistema de Boas-Vindas ative o Premium!').catch()
            }
        } else {
            console.log('Achei nada não')
        }       
    });
});

//Sistema de ativar configuração adicionar canal de bem vindo 
client.on('message', message => {

    let Message = message.content
    if (Message === prefix + 'welcomechannel') {
        if (message.author.id !== message.guild.ownerID) {
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        } else {
            const server = message.guild.id
            con.query("SELECT * FROM user WHERE GUILD=" + server, function (err, result, fields) {
                if (err) throw err;
                if (result.length > 0) {
                    if (result[0].PLAN == 1) {
                        let embed = new Discord.RichEmbed()
                            .setThumbnail(message.guild.iconURL)
                            .setColor('RANDOM')
                            .setAuthor('CONFIGURE O SISTEMA DE BOAS VINDAS')
                            .setTitle('COMANDOS DO SISTEMA DE BOAS VINDAS')
                            .addField('``n!setwelcomechannel``', '__Setar Canal de Boas Vindas:__ ``n!setwelcomechannel 000000000000000000``')
                            .addField('``n!setruleschannel``', '__Setar Canal de Regras:__ ``n!setruleschannel 000000000000000000``')
                            .addField('``n!testwelcome``', '__Veja como está ficando seu Bem-Vindo__')
                            .setURL('https://discord.gg/jjRZ5pDEhB')
                            .setFooter('2021 ©Equipe de programação Nogill')
                            .setTimestamp()
                        message.channel.send(embed);
                    } else {
                        client.users.get(result[0].OWNER).send('<a:709506935392829470:797066256783769611> | Apenas usuarios premium podem usar esse comando')
                    }

                }
            });
        }
    }
    if (message.content.startsWith(prefix+"setwelcomechannel")) {
        if (message.author.id !== message.guild.ownerID) {
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        } else {
            let newguild = message.guild.id            
            let firstrole = message.content
            let role = firstrole.replace(/([^\d])+/gim, ''); 
            let azulbarbuleta = con.query(`SELECT *  FROM user WHERE GUILD=`+newguild)
            if (!azulbarbuleta.length > 0) { 
                con.query("UPDATE user SET WC ="+role+ " WHERE GUILD ="+newguild, function (err, result, fields) {
                    if (err) throw err;
                    
                });
            }
        }
    }
    if (message.content.startsWith(prefix+"setruleschannel")) {
        if (message.author.id !== message.guild.ownerID) {
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        } else {
            let newguild = message.guild.id            
            let firstrole = message.content
            let role = firstrole.replace(/([^\d])+/gim, '');
            let azulbarbuleta = con.query(`SELECT *  FROM user WHERE GUILD=`+newguild)
            if (!azulbarbuleta.length > 0) { 
                con.query("UPDATE user SET CR ="+role+"  WHERE GUILD ="+newguild, function (err, result, fields) {
                    if (err) throw err;
                    
                });
            }
        }
    }
    if (Message === prefix + 'testwelcome') {
        if (message.author.id !== message.guild.ownerID) {
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        } else {
            const server = message.guild.id
            con.query("SELECT * FROM user WHERE GUILD=" + server, function (err, result, fields) {
                if (err) throw err;
                if (result.length > 0) {
                    if (result[0].PLAN == 1) {
                        let embed = new Discord.RichEmbed()
                            .setThumbnail(message.guild.iconURL)
                            .setColor('RANDOM')
                            .setAuthor('👋 Bem-vindo(a) ao ' + message.guild.name)
                            .setDescription('Leia as regras e ecite punições: <#'+result[0].CR+'>')
                            .addField('n!help', '__Veja todos os comandos do Nogill__')
                            .addField('n!convite', '__use o Nogill no seu server!__')
                            .setFooter('2021 ©Equipe de programação Nogill')
                            .setTimestamp()
                        message.channel.send(embed);
                    } else {
                        message.channel.send('<a:709506935392829470:797066256783769611> | Apenas usuarios premium podem usar esse comando')
                    }

                }
            });
        }
    }
    if (message.content.startsWith(prefix+"setfirstrole")) {
        if (message.author.id !== message.guild.ownerID) {
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        } else {
            let newguild = message.guild.id            
            let firstrole = message.content
            let role = firstrole.replace(/([^\d])+/gim, ''); 
            let azulbarbuleta = con.query(`SELECT *  FROM user WHERE GUILD=`+newguild)
            if (!azulbarbuleta.length > 0) { 
                con.query("UPDATE user SET WROLE ="+role+ " WHERE GUILD ="+newguild, function (err, result, fields) {
                    if (err) throw err;
                    
                });
            }
        }
    } 
});

//react to emoji
client.on('raw', async (dados, member) => {
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != '815360246427287603') return
    let servidor = client.guilds.get('814666072137138277')
    const membro = servidor.members.get(dados.d.user_id);
    let NewCargoNotificacao = '814817451710611506';
    let OudCargoNoticacao = '814981622393864223';
    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "815360307912245259"){
            if(membro.roles.has(NewCargoNotificacao)) return
            membro.addRole(NewCargoNotificacao)
            membro.removeRole(OudCargoNoticacao)
        }
    }
  });


client.login(config.token)