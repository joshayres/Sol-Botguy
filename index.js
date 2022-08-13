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
  if (str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
}

function findMoveAll(move) {
  let moveArr = move.split(" ");
  let strArr = [];
  moveArr.forEach((word) => {
    if (word === "the") {
      strArr.push(word);
    } else {
      strArr.push(wordFmt(word));
    }
  });
  move = strArr.join(" ");
  console.log(move);
  for (e of Object.entries(framedata)) {
    for (val in e[1]) {
      if (e[1][val].Name === move) {
        let char = e[0];
        return moveToStr(char, move);
      }
    }
  }
  return new Discord.MessageEmbed()
    .setColor("#ff0022")
    .setTitle("Error")
    .setDescription("Invalid Syntax for command, no move found for " + move);
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
    else {
      if (move[0] === "j") {
        move = move[0] + move.slice(1).toUpperCase();
      } else {
        move = move.toUpperCase();
      }
    }
  }
  let moveData = framedata[char][move];
  if (!moveData) {
    if (char) {
      let moveArr = move.split(" ");
      let strArr = [];
      moveArr.forEach((word) => {
        if (word === "the") {
          strArr.push(word);
        } else {
          strArr.push(wordFmt(word));
        }
      });
      move = strArr.join(" ");
      for (let e of Object.entries(framedata[char])) {
        if (move === e[1].Name) {
          moveData = framedata[char][e[0]];
          break;
        }
      }
    }
    if (!moveData) {
      return new Discord.MessageEmbed()
        .setColor("#ff0022")
        .setTitle("Error")
        .setDescription(
          "Invalid Syntax for command, no move found for " +
            char +
            " named or inputed as " +
            move
        );
    }
  }
  if (moveData.Name === "") moveData.Name = move;
  if (moveData.Damage === "") moveData.Damage = "-";
  if (moveData.Guard === "") moveData.Guard = "-";
  if (moveData.Startup === "") moveData.Startup = "-";
  if (moveData.Active === "") moveData.Active = "-";
  if (moveData.Recovery === "") moveData.Recovery = "-";
  if (moveData["On-Block"] === "") moveData["On-Block"] = "-";
  if (moveData["On-Hit"] === "") moveData["On-Hit"] = "-";
  if (moveData["R.I.S.C. Gain"] === "") moveData["R.I.S.C. Gain"] = "-";
  return new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(char + ": " + moveData.Name)
    .setDescription("Frame Data for " + char + ": " + moveData.Name)
    .addFields(
      { name: "Input", value: moveData.Input, inline: true },
      { name: "Damage", value: moveData.Damage, inline: true },
      { name: "Gaurd", value: moveData.Guard, inline: true },
      { name: "Startup", value: moveData.Startup, inline: true },
      { name: "Active", value: moveData.Active, inline: true },
      { name: "Recovery", value: moveData.Recovery, inline: true },
      { name: "On Block", value: moveData["On-Block"], inline: true },
      { name: "On Hit", value: moveData["On-Hit"], inline: true },
      {
        name: "R.I.S.C. Gain",
        value: moveData["R.I.S.C. Gain"],
        inline: true,
      }
    )
    .setImage(moveData.Images)
    .setTimestamp();
}

function moveList(char) {
  let movelist = [];
  for (e of Object.entries(framedata[char])) {
    movelist.push({ name: e[1].Name, input: e[1].Input });
  }
  let moves = movelist.filter((e) => e.name !== "");
  let movesObject = [];
  moves.forEach((move) => {
    movesObject.push({ name: move.name, value: move.input, inline: true });
  });
  return new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(char + " Move List")
    .addFields(movesObject)
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
  if (str[0] === "sol") {
    let arrayVal = 1;
    if (str[1] === "badguy") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Sol Badguy"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Sol Badguy", tempArr.join(" ")));
    }
  } else if (str[0] === "anji") {
    let arrayVal = 1;
    if (str[1] === "mitu") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Anji Mito"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Anji Mito", tempArr.join(" ")));
    }
  } else if (str[0] === "axl") {
    let arrayVal = 1;
    if (str[1] === "low") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Axl Low"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Axl Low", tempArr.join(" ")));
    }
  } else if (str[0] === "ram" || str[0] === "ramlethal") {
    let arrayVal = 1;
    if (str[1] === "valentine") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Ramlethal Valentine"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Ramlethal Valentine", tempArr.join(" ")));
    }
  } else if (str[0] === "chipp") {
    let arrayVal = 1;
    if (str[1] === "zanuff") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Chipp Zanuff"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Chipp Zanuff", tempArr.join(" ")));
    }
  } else if (str[0] === "faust") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Faust"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Faust", tempArr.join(" ")));
    }
  } else if (str[0] === "gio" || str[0] === "giovanna") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Giovanna"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Giovanna", tempArr.join(" ")));
    }
  } else if (
    str[0] === "goldlewis" ||
    str[0] === "gold" ||
    str[0] === "lewis" ||
    str[0] === "dick"
  ) {
    let arrayVal = 1;
    if (str[1] === "dickinson") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Goldlewis Dickinson"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Goldlewis Dickinson", tempArr.join(" ")));
    }
  } else if (str[0] === "ino" || str[0] === "i-no") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("I-No"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("I-No", tempArr.join(" ")));
    }
  } else if (str[0] === "ky") {
    let arrayVal = 1;
    if (str[1] === "kiske") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Ky Kiske"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Ky Kiske", tempArr.join(" ")));
    }
  } else if (str[0] === "leo") {
    let arrayVal = 1;
    if (str[1] === "whitefang") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Leo Whitefang"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Leo Whitefang", tempArr.join(" ")));
    }
  } else if (str[0] === "may") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("May"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("May", tempArr.join(" ")));
    }
  } else if (str[0] === "millia") {
    let arrayVal = 1;
    if (str[1] === "rage") {
      arrayVal = 2;
    }
    if (str[arrayVal] === "combos") {
    } else if (str[arrayVal] === "moves" || str[arrayVal] === "movelist") {
      message.channel.send(moveList("Millia Rage"));
    } else {
      let tempArr = [];
      for (let i = arrayVal; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Millia Rage", tempArr.join(" ")));
    }
  } else if (str[0] === "nago" || str[0] === "nagoriyuki") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Nagoriyuki"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Nagoriyuki", tempArr.join(" ")));
    }
  } else if (str[0] === "pot" || str[0] === "potemkin") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Potemkin"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Potemkin", tempArr.join(" ")));
    }
  } else if (str[0] === "zato" || str[0] === "zato-1" || str[0] === "zato=1") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Zato-1"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Zato-1", tempArr.join(" ")));
    }
  } else if (str[0] == "happy" || str[0] == "hc") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Happy Chaos"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Happy Chaos", tempArr.join(" ")));
    }
  } else if (str[0] == "testament") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Testament"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Testament", tempArr.join(" ")));
    }
  } else if (str[0] == "bridget") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Bridget"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Bridget", tempArr.join(" ")));
    }
  } else if (str[0] == "baiken") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Baiken"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Baiken", tempArr.join(" ")));
    }
  } else if (str[0] == "jacko" || str[0] == "jack-o") {
    if (str[1] === "combos") {
    } else if (str[1] === "moves" || str[1] === "movelist") {
      message.channel.send(moveList("Jack-O"));
    } else {
      let tempArr = [];
      for (let i = 1; i < str.length; i++) {
        tempArr.push(str[i]);
      }
      message.channel.send(moveToStr("Jack-O", tempArr.join(" ")));
    }
  }
  else if (str[0]) {
    let tempArr = [];
    for (let i = 0; i < str.length; i++) {
      tempArr.push(str[i]);
    }
    message.channel.send(findMoveAll(tempArr.join(" ")));
  }
});
