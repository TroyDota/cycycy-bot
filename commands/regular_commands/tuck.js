module.exports.run = async (bot, message, args, NaM) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=tuck <user>```");
        return;
    }
    let tucked = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tucked) return message.channel.send(`User not found ${NaM}`);

    message.channel.send(`<@${message.author.id}> tucked ${tucked} to bed ${NaM} 👉 🛏️`);
}

module.exports.help = {
    name : 'tuck'
}