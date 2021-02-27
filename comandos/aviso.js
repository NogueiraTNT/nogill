const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '372556758683746304') return message.reply("<a:709506935392829470:797066256783769611> | você não possui permissão para usar esse comando.")
  message.delete()
let mensagem = args.join(" ")
const membros = message.guild.memberCount
    /*try{
    
    messsage.channel.send(Embed);

}catch(err){

    return message.reply("**Ocorreu um erro. Por favor, tente novamente.**")

    }
    
*/
let on = message.guild.members.filter(m => m.presence.status === 'online')
let npertube = message.guild.members.filter(m => m.presence.status === 'dnd')
let ausente = message.guild.members.filter(m => m.presence.status === 'idle')

on.forEach(f1 => {
  f1.send(mensagem)
});

npertube.forEach(f2 => {
  f2.send(mensagem)
});

ausente.forEach(f3 => {
  f3.send(mensagem)
});   

message.channel.send("*\`Mensagem enviada para\`\* ***`" + membros + "`*** *\`membros\`\*").then(msg => msg.delete(8000))
message.channel.send("**`Mensagem a ser enviada:`\n**" + mensagem).then(msg => msg.delete(8000))
}    
exports.config = {
  name: "aviso",
  aliases: []
}