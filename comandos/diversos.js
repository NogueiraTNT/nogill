const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor('RANDOM')
    .setAuthor('Lista de Comandos DIVERSOS:')
    .setTitle('SE PRECISAR DE AJUDA ``CLICK AQUI``!')
    .addField('``n!aviso``', '*Manda uma mensagem para todos os membros do seu server;*')
    .addField('``n!say``', '*Faz o Nogill mandar uma mensagem;*')
    .addField('``n!convite``', '*convide o bot para seu servidor*')
    .setURL('https://discord.gg/jjRZ5pDEhB')
    .setFooter('2021 ©Equipe de programação Nogill')
    .setTimestamp()
  message.channel.send(embed);
}
   
exports.config = {
  name: "diversos",
  aliases: []
}