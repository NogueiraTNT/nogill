const Discord = module.require("discord.js")
const talkedRecently = new Set();

module.exports.run = async (client, message, args) => {
    if (message.author.id !== message.guild.ownerID)return message.reply('Comando bloqueado para uso, atualizando alguns comandos: Liberada apartir das 13:00 horas') 
    if (message.author.id !== message.guild.ownerID) return message.reply('<a:errado:676599070042882061> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)

    let mensagem = args.join(" ")
    if (talkedRecently.has(message.author.id)) {
        let embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setAuthor("<a:discord:676599082101506076> | Utilize o comando, daqui 20 minutos. Eu também mereço descanso...")
            .setThumbnail('https://cdn.discordapp.com/attachments/611372548378329109/619361601203601409/l5ft4b5sh1pr.gif')
            .setImage('https://cdn.discordapp.com/attachments/636703795648135168/640763221694742604/6d78711d7c8438405ee8a5a50114f9ac.gif')
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL)
        message.channel.send({ embed }).then(msg => msg.delete(8000)).catch(console.error);
        //let saturno = message.guild.channels.find(`name`, "saturno");
        //if(!saturno) return message.channel.send("caso queira que eu envie o log/enviar em um canal, crie um chamado `saturno`");
        //saturno.send(embed);
        message.delete();
    } else {

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 600000)

        if (!mensagem) return message.reply({ embed: { title: "MEMBRO/DONO", description: "informe uma mensagem!" } })
        let servidores = client.guilds.size
        let usuarios = client.users.size


        await client.users.forEach((f) => { f.send(`${mensagem}`) })

        message.channel.send(`**${message.author} sua mensagem está sendo enviada. Confira status:**`)
        let embed = new Discord.RichEmbed()
            .setTitle("<a:star:670376780611452944> **Divulgando Para Todos**")
            .addField("<a:star:670376780611452944> **Servidores:** ", `${servidores}`)
            .addField("<a:star:670376780611452944> **Membros totais:** ", `${usuarios}`)
            .addField("<a:star:670376780611452944> **Sua mensagem:** ", `${mensagem}`)
            .setThumbnail("https://cdn.discordapp.com/attachments/667902357925003267/677101262197620766/KaelVerificacaoAnimado.gif")
        // message.channel.send(embed).catch(() => { });
        message.channel.send(embed).catch(console.error)
        message.delete();
        //.catch(msg => msg.delete(5000))
        //.catch(msg => msg.delete(500))
    }
}