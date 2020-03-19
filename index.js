/* jshint esversion: 8 */
const cleverbot = require("cleverbot-free");
const Discord = require("discord.js");
const client = new Discord.Client();
const urban = require("urban-dictionary");

var convos = {
    users: {}
}

client.login("rlly");

client.on("ready", async () => {
    console.log("Epic convos");
    client.user.setActivity("Epic garrulous bot amirite.");
});

client.on("message", async (message) => {
    if (message.content.startsWith("<@!605379513915801654> ")) { 
        var msg = message.content.split("<@!605379513915801654> ")[1]
        if (convos.users[message.author.id]) {
            convos.users[message.author.id].push(msg)
            cleverbot(convos.users[message.author.id]).then((reply) => {
                message.reply(reply);
                convos.users[message.author.id].push(reply)
            });
        } else {
            convos.users[message.author.id] = new Array(msg)
            cleverbot(msg).then((reply) => {
                message.reply(reply);
                convos.users[message.author.id].push(reply)
            });
        }
    }
});