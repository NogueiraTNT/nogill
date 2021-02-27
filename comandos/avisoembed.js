const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '372556758683746304') return message.reply ("<a:709506935392829470:797066256783769611> | você não possui permissão para usar esse comando.")
    var separador = message.content.split("|")
    const Embed = new Discord.RichEmbed()
    .setTitle(separador[1])
    .setColor("BLACK")
    .setDescription(separador[2])
    .setImage(separador[3])
    message.channel.send(Embed)
    /* try{

    messsage.channel.send(Embed);

}catch(err){

    return message.reply("**Ocorreu um erro. Por favor, tente novamente.**")

    }
    */
 
let on = message.guild.members.filter(m => m.presence.status === 'online')
let npertube = message.guild.members.filter(m => m.presence.status === 'dnd')
let ausente = message.guild.members.filter(m => m.presence.status === 'idle')
const membros = message.guild.memberCount;

on.forEach(f1 => {
f1.send(Embed)
        })

npertube.forEach(f2 => {
       f2.send(Embed)
        });

  ausente.forEach(f3 => {
  f3.send(Embed)
        });

   message.channel.send("*\`Mensagem enviada para\`\* ***`" + membros + "`*** *\`membros\`\*")
    message.channel.send("**`Mensagem a ser enviada:`**")
}
module.exports.help = {
name: "avisoembed"
}