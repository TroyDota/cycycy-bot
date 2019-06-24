module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have a permission for this command.");
    bot.cooldown.add(message.author.id);
    setTimeout(() => {
        bot.cooldown.delete(message.author.id);
    }, 15000);
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let upTime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    return message.reply(`I have been running for ${upTime}`);
}

module.exports.help = {
    name : 'uptime'
}