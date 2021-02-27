const { Client } = require("discord.js");

module.exports = client => {
    const invites = {} // { guildID { memberID: count } }


    const getInviteCounts = async (guild) => {
        return await new Promise(resolve => {
            guild.fetchInvites().then(invites => {
                const inviteCouiunter = {} // { memberID: count }

                invites.forEach(invite => {
                    console.log(invite)
                })
            })
        })
    }

    client.guilds.cache.forEach(async (guild) => {
        invites[guild.id] = await getInviteCounts(guild)
    })
}