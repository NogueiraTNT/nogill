const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  if (message.author.id !== message.guild.ownerID) {
    message.reply('<a:709506935392829470:797066256783769611> | Apenas posse do servidor pode usar o comando:' + message.guild.owner)
} else {
  let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor('RANDOM')
    .setAuthor('Lista de Comandos CONFIGURAÇÃO:')
    .setTitle('SE PRECISAR DE AJUDA ``CLICK AQUI``!')
    .addField('``n!welcomechannel`` (**Donation**)', '*exibe a lista de comandos para configurar as Boas-Vindas;*')
    .addField('``n!setfirstrole``', '*Setar Role de entrada;* `` \n\ n!setfirstrole 0000000000000000``')
    .addField('``n!sistembugs`` (**Donation**)', '*Exibe a lista de comandos para configurar o sistema de BUGS*')
    .addField('``n!convite``', '*convide o bot para seu servidor*')
    .setURL('https://discord.gg/jjRZ5pDEhB')
    .setFooter('2021 ©Equipe de programação Nogill')
    .setTimestamp()
  message.channel.send(embed);
}
}    
exports.config = {
  name: "comandos configuração",
  aliases: []
}