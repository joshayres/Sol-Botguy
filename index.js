const devenv = require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.login(process.env.TOKEN);

const prefix = "!gg";
const framedata = require("./framedata.json");

function wordFmt(str) {
  str = str.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
}

function moveToStr(char, move) {
  if (move) {
    if (move === "cs" || move === "c.s") move = "c.S";
    else if (move === "fs" || move === "f.s") move = "f.S";
    else if (move === "jp" || move === "j.p") move = "j.P";
    else if (move === "jk" || move === "j.k") move = "j.K";
    else if (move === "js" || move === "j.s") move = "j.S";
    else if (move === "jh" || move === "j.h") move = "j.H";
    else if (move === "jd" || move === "j.d") move = "j.D";
    // Character specials
    else {
      move = move.toUpperCase();
      if (move.length > 2) {
        for (let val of Object.entries(framedata[char])) {
          if (move === val[1].Input) {
            move = val[0];
          }
        }
        let str = move.split(" ");
        let ar = [];
        str.forEach((s) => {
          ar.push(wordFmt(s));
        });
        move = ar.join(" ");
      }
    }
  }
  let moveData = framedata[char][move];
  if (!moveData) {
    return new Discord.MessageEmbed()
      .setColor("#ff0022")
      .setTitle("Error")
      .setDescription("Invalid Syntax for command");
  }
  if (moveData.Damage === "") moveData.Damage = "-";
  if (moveData.Guard === "") moveData.Guard = "-";
  if (moveData.Startup === "") moveData.Startup = "-";
  if (moveData.Active === "") moveData.Active = "-";
  if (moveData.Recovery === "") moveData.Recovery = "-";
  if (moveData["On-Block"] === "") moveData["On-Block"] = "-";
  if (moveData["On-Hit"] === "") moveData["On-Hit"] = "-";
  if (moveData["R.I.S.C. Gain"] === "") moveData["R.I.S.C. Gain"] = "-";
  return (
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(char + " " + move)
      // .setURL(moveData.url)
      .setDescription("Frame Data for " + char + " " + move)
      .addFields(
        { name: "Damage", value: moveData.Damage, inline: true },
        { name: "Gaurd", value: moveData.Guard, inline: true },
        { name: "Startup", value: moveData.Startup, inline: true },
        { name: "Active", value: moveData.Active, inline: true },
        { name: "Recovery", value: moveData.Recovery, inline: true },
        { name: "On Block", value: moveData["On-Block"], inline: true },
        { name: "On Hit", value: moveData["On-Hit"], inline: true },
        { name: "R.I.S.C Gain", value: moveData["R.I.S.C. Gain"], inline: true }
      )
      // .addField("Gatling Options", moveData.gatlingOptions, true)
      .setImage(moveData.Image)
      .setTimestamp()
  );
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
  if (str[0] === "sol") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Sol Badguy", tempArr.join(" ")));
    }
  } else if (str[0] === "anji") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Anji Mito", tempArr.join(" ")));
    }
  } else if (str[0] === "axl") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Axl Low", tempArr.join(" ")));
    }
  } else if (str[0] === "ram") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Ramlethal Valentine", tempArr.join(" ")));
    }
  } else if (str[0] === "chipp") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Chipp Zanuff", tempArr.join(" ")));
    }
  } else if (str[0] === "faust") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Faust", tempArr.join(" ")));
    }
  } else if (str[0] === "gio" || str[0] === "giovanna") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Giovanna", tempArr.join(" ")));
    }
  } else if (str[0] === "goldlewis") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Goldlewis Dickinson", tempArr.join(" ")));
    }
  } else if (str[0] === "ino" || str[0] === "i-no") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("I-No", tempArr.join(" ")));
    }
  } else if (str[0] === "ky") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Ky Kiske", tempArr.join(" ")));
    }
  } else if (str[0] === "leo") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Leo Whitefang", tempArr.join(" ")));
    }
  } else if (str[0] === "may") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("May", tempArr.join(" ")));
    }
  } else if (str[0] === "millia") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Millia Rage", tempArr.join(" ")));
    }
  } else if (str[0] === "nago" || str[0] === "nagoriyuki") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Nagoriyuki", tempArr.join(" ")));
    }
  } else if (str[0] === "nago" || str[0] === "nagoriyuki") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Nagoriyuki", tempArr.join(" ")));
    }
  } else if (str[0] === "pot" || str[0] === "potemkin") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Potemkin", tempArr.join(" ")));
    }
  } else if (str[0] === "zato" || str[0] === "zato-1" || str[0] === "zato=1") {
    if (str[1] === "combos") {
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Zato-1", tempArr.join(" ")));
    }
  }
});
