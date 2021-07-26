const devenv = require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.login(process.env.TOKEN);

const prefix = "!gg";
const framedata = require("./framedata.json");

function moveToStr(char, move) {
  if (move) {
    if (move === "cs" || move === "c.s") move = "cs";
    if (move === "fs" || move === "f.s") move = "fs";
  }
  let moveData = framedata[char][move];
  if (!moveData) {
    return new Discord.MessageEmbed()
      .setColor("#ff0022")
      .setTitle("Error")
      .setDescription("Invalid Syntax for command");
  }
  return new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(char + " " + move.toUpperCase())
    .setURL(moveData.url)
    .setDescription("Frame Data for " + char + " " + move.toUpperCase())
    .setThumbnail(moveData.img)
    .addFields(
      { name: "Damage", value: moveData.damage, inline: true },
      { name: "Gaurd", value: moveData.gaurd, inline: true },
      { name: "Startup", value: moveData.startup, inline: true },
      { name: "Active", value: moveData.active, inline: true },
      { name: "Recovery", value: moveData.recovery, inline: true },
      { name: "On Block", value: moveData.onBlock, inline: true },
      { name: "On Hit", value: moveData.onHit, inline: true }
    )
    .addField("Gatling Options", moveData.gatlingOptions, true)
    .setImage(moveData.img)
    .setTimestamp();
}

client.on("message", (message) => {
  if (message.content.substring(0, 3) !== prefix) {
    return;
  }
  let str = message.content.substring(4).toLowerCase().split(" ");
  if (str[0] === "help") {
    message.reply(
      "This is a bot to show frame data in Guilty Gear Strive\nGet frame data by doing !gg [character] [move] ie. !gg sol 5p"
    );
  }
  if (str[0] === "sol" || str[0] === "sol badguy")
    message.channel.send(moveToStr("Sol Badguy", str[1]));
});
