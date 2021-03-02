const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor('RANDOM')
    .setAuthor('Lista de Comandos por Categorias:')
    .setTitle('SE PRECISAR DE AJUDA ``CLICK AQUI``!')
    .addField('``n!comandos administração``', '*exibe a lista de comandos para administração;*')
    .addField('``n!configuração``', '*exibe a lista de comandos para configurar o Nogill;*')
    .addField('``n!diversos``', '*exibe a lista de comandos de diversos;*')
    .addField('``n!uteis``', '*exibe a lista de comandos uteis*')
    .addField('``n!dirvesão``', '*exibe a lista de comandos para sua diversão*')
    .addField('``n!comandos donaters``', '*exibe a lista de comandos exclusiva para donaters*')
    .addField('``n!convite``', '*convide o bot para seu servidor*')
    .setURL('https://discord.gg/jjRZ5pDEhB')
    .setFooter('2021 ©Equipe de programação Nogill')
    .setTimestamp()
  message.channel.send(embed);
}
   
exports.config = {
  name: "help",
  aliases: []
}