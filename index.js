const fs = require('fs')
console.log("♨️ Ligando bot...")
var Discord = require('discord.js');
const client = new Discord.Client({autoReconnect: true});
const config = require("./config.json")
const { Client, Util } = require('discord.js');
const { createConnection } = require('mysql');
const bot = new RiveScript();
const guildMemberAdd = require('./events/guildMemberAdd');
const { title } = require('process');
let RiveScript = require('rivescript');

var token = config.token
var prefix = config.prefix
var dono = config.dono

const con = createConnection(config.mysql);
con.connect(err => {
    if (err) return console.log(err);
    console.log(`MySQL conectado!`);
});

// lé a pastas pra exetuta os comandos do bot 
client.on("message", (message) => {
        let UserName = message.author.username
        let BotName = "Nogill" 
        const FormatedUserName = UserName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '');
        const FormatedBotName = BotName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '');
          
        if (FormatedUserName != FormatedBotName) {
            // chama a função pro bot responder e envia pro bot a mensagem capturada
            let Message = message.content  
            const MessageUserTrat = Message.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
            if(MessageUserTrat.includes('<@!768183608987877417>')){
                bot.reply("local-user", MessageUserTrat).then(function (reply) {
                   message.reply(reply);   
                });
                // console.log(message.content)
            }    
        }    
            



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
    console.log(`Bot foi iniciado, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({ game: { name: config.Status, type: 'STREAMING' } });


    client.user.setUsername("")

    let status = [
        { name: "Nogueira na Cama", type: "PLAYING" },
        { name: "Sua mãe na Rede", type: "PLAYING" },
        { name: "MineMine Server", type: "PLAYING" }
    ]



    function st() {
        let rs = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ game: rs });
    }
    st();
    setInterval(() => st(), 15000);  //10000 = 10Ms = 10 segundos
});

// Adiciona o arquivo Cérebro no robo
bot.loadFile(['./cerebro.rive'])
    .then(botReady)
    .catch(botNotReady);
     
// Executada quando o cérebro for carregado
function botReady() {
    bot.sortReplies();
}

// Executada se tiver algum erro ao carregar o cérebro
function botNotReady(err) {
    console.log("An error has occurred.", err);
}

// Inicialize o cache de convite
const invites = {};

// Um método muito útil para criar um atraso sem bloquear todo o script.
const wait = require('util').promisify(setTimeout);

// client.on('ready', async () => {
//   // "ready" não está realmente pronto. Precisamos esperar um feitiço.
//   await wait(1000);

//   // Carregue todos os convites de todas as guildas e salve-os no cache.
//   client.guilds.forEach(g => {
//     g.fetchInvites().then(guildInvites => {
//       invites[g.id] = guildInvites;
//     });
//   });
// });


client.on("guildCreate", async guild => {
    let newguild = guild.id 
    let newowner = guild.ownerID
    	
    con.query(`INSERT INTO user (ID, OWNER, GUILD, PLAN, WC, TIP, CR, TITLE) VALUES (ID, ${newowner}, ${newguild}, 0, "", "", "", "")`, function (err, result, fields){
        if (err) throw err; 
        console.log(result)
    });
    await wait(1000);
    // Carregue todos os convites de todas as guildas e salve-os no cache.
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
        });
    });
    console.log(invites)
        // let embed = new Discord.RichEmbed()
        //     .setThumbnail()
        //     .setColor('RANDOM')
        //     .setAuthor('Um novo server começo a me usar!')
        //     .setTitle()
        //     .setFooter('2021 ©Equipe de programação Nogill')
        //     .setTimestamp()
        // message.channel.send(embed);
});

client.on('guildMemberAdd', member =>{
    const server = member.guild.id
    con.query("SELECT * FROM user WHERE GUILD="+server, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0){
            if (result[0].PLAN == 1) {
                if (result[0].WC) {
                    const join = new Discord.RichEmbed()
                        .setThumbnail(member.user.displayAvatarURL)
                        .setColor('RANDOM')
                        .setAuthor('👋 Bem-vindo(a) ao '+member.guild.name)
                        .setTitle(result[0].TITLE)
                        .setDescription(result[0].TIP+' '+result[0].CR)
                        .setFooter('2021 ©Equipe de programação Nogill')
                        .setTimestamp()

                    member.guild.channels.get(result[0].WC).send(join).catch()
                } else {
                    console.log('sem canal bem vindo')
                }
            }else{
                client.users.get(result[0].OWNER).send('Alguem entrou no seu discord, para criar o sistema de bem vindo ative o Premium!').catch()
                // console.log(result[0].OWNER)
            }
        }else{
            console.log('Achei nada não')
        }
    });
}); 

//Sistema de ativar configuração adicionar canal de bem vindo 
client.on('message', message => {
    let Message = message.content
    if (Message === prefix+'welcomechannel') {
        if (message.author.id !== message.guild.ownerID){
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        }else{
            const server = message.guild.id
            con.query("SELECT * FROM user WHERE GUILD="+server,function (err, result, fields){
                if (err) throw err;
                if (result.length > 0){
                    if (result[0].PLAN == 1){ 
                        let embed = new Discord.RichEmbed()
                            .setThumbnail()
                            .setColor('RANDOM')
                            .setAuthor('CONFIGURE O SISTEMA DE BOAS VINDAS')
                            .setTitle('COMANDOS DO SISTEMA DE BOAS VINDAS')
                            .addField('Setar Canal de Boas Vindas', 'n!setwelcomechannel (ID DO CANAL)')
                            .addField('Setar Titulo de Boas Vindas', 'n!setwelcomechanneltitle (TEXTO)')
                            .addField('Setar Descriçao de Regras', 'n!setdescription (TEXTO)')
                            .addField('Setar Canal de Regras', 'n!setruleschannel (ID DO CANAL)')
                            .addField('Veja como está ficando seu Bem-Vindo', 'n!testwelcome')
                            .setFooter('2021 ©Equipe de programação Nogill')
                            .setTimestamp()
                        message.channel.send(embed);
                    }else{  
                        message.channel.send('<a:709506935392829470:797066256783769611> | Apenas usuarios premium podem usar esse comando')
                    }
                     
                }    
            });
        }
    }
    if (Message === prefix+'testwelcome') {
        if (message.author.id !== message.guild.ownerID){
            message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
        }else{
            const server = message.guild.id
            con.query("SELECT * FROM user WHERE GUILD="+server,function (err, result, fields){
                if (err) throw err;
                if (result.length > 0){
                    if (result[0].PLAN == 1){ 
                        let embed = new Discord.RichEmbed()
                        
                        .setColor('RANDOM')
                        .setAuthor('👋 Bem-vindo(a) ao '+message.guild.name)
                        .setTitle(result[0].TITLE)
                        .setDescription(result[0].TIP+' '+result[0].CR)
                        .setFooter('2021 ©Equipe de programação Nogill')
                        .setTimestamp()
                        message.channel.send(embed);
                    }else{  
                        message.channel.send('<a:709506935392829470:797066256783769611> | Apenas usuarios premium podem usar esse comando')
                    }
                     
                }    
            });
        }
    }
});

client.login(config.token)