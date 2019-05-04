const fs = require('fs');
const bot = require('./bot');

fs.readdir('./commands/regular_commands/', (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) {
        console.log('Couldn\'t find commands.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/regular_commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});
//READ DIRECTORY COMMANDS
fs.readdir('./commands/mod_commands/', (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) {
        console.log('Couldn\'t find commands.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/mod_commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});