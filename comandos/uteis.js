const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor('RANDOM')
    .setAuthor('Lista de Comandos UTEIS:')
    .setTitle('SE PRECISAR DE AJUDA ``CLICK AQUI``!')
    .addField('``n!avatar``', '*Mostra o avatar de um usuário;*')
    .addField('``n!lembrete``', '*Para quando você não pode esquecer de algo!;*')
    .addField('``n!serverinfo``', '*Verifica as informações do servidor;*')
    .addField('``n!ping``', '*Ping;*')
    .addField('``n!convite``', '*convide o bot para seu servidor*')
    .setURL('https://discord.gg/jjRZ5pDEhB')
    .setFooter('2021 ©Equipe de programação Nogill')
    .setTimestamp()
  message.channel.send(embed);
}
   
exports.config = {
  name: "uteis",
  aliases: []
}