const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor('RANDOM')
    .setAuthor('Lista de Comandos DIRVESÃO:')
    .setTitle('SE PRECISAR DE AJUDA ``CLICK AQUI``!')
    .addField('``n!jokempo``', '*Pedra papel e tesoura;*')
    .addField('``n!dados``', '*Joga um ou mais dados para cima e exibe o resultado;*')
    .addField('``n!8ball``', '*Te da resposta para suas perguntas;*')
    .addField('``n!convite``', '*convide o bot para seu servidor*')
    .setURL('https://discord.gg/jjRZ5pDEhB')
    .setFooter('2021 ©Equipe de programação Nogill')
    .setTimestamp()
  message.channel.send(embed);
}
   
exports.config = {
  name: "dirvesão",
  aliases: []
}