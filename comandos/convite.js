const Discord = require("discord.js")

exports.run = (bot,message,args) => {
    let embed = new Discord.RichEmbed()

    .setTitle("<a:764453092442898452:797063088864100382> | Convite do bot")
    .setColor("#0000FF")
    .setDescription(`**Clique [aqui](https://discord.com/api/oauth2/authorize?client_id=768183608987877417&permissions=8&scope=bot) para adicionar o bot em seu servidor.**`)
    .setFooter(`${bot.user.username}`, bot.user.avatarURL)
    .setTimestamp()

    message.channel.send(embed);
}

exports.help = {
    name: "convite"
}