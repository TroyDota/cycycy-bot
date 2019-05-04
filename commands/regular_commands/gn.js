const mongoose = require('mongoose');
const Afk = require('../../models/afkDB');

module.exports.run = async (bot, message, args, NaM) => {
    let reason = args.join(' ');
    if(args[0] === "help") {
        message.reply("Usage: !=gn <message>");
        return;
    }
    const afk = new Afk({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        reason: reason,
        date: new Date(),
        afkType: 'gn'
    });

    Afk.find({ userID: message.author.id }).then(res => {
        if(res.length >= 1) { //afk limiter
            return message.reply(`You are already AFK ${NaM}`);
        } else {
            afk.save().then(message.reply(`is now sleeping: ${reason}`)).then(message.channel.send(`Somebody tuck him ${NaM}`)).catch(err => console.log(err));
        }
    });
}

module.exports.help = {
    name : 'gn'
}