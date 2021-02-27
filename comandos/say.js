const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  run: (bot, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não pode usar esse comando!') }

    let argsresult
    const mChannel = message.mentions.channels.first()

    message.delete()
    if (mChannel) {
      argsresult = args.slice(1).join(' ')
      mChannel.send(argsresult)
    } else {
      argsresult = args.join(' ')
      message.channel.send(argsresult)
    }
  },

}
 exports.config = {
  name: "say",
  aliases: []
}