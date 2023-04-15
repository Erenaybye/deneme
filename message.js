const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
let basarisiz = ayarlar.basarisizemoji;
module.exports = async message => {

  let client = message.client

  
  let prefix = ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    //if(cmd.conf.enabled === false) return message.channel.send("⛔ Kullandığın komut **Bakıma Alınmış** veya **Kullanıma Kapatılmıştır!**")
    cmd.run(client, message, params);
  }
};