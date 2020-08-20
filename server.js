// Required Constants
const http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const io = require('socket.io')(server);

//creates the server
var server = require('http').createServer(app);

// Please change YOURPREFIX to your prefix. (Example: . ! - ; >)
let sprefix = "!v!";
let prefix = sprefix+" "; /*Dont change this unless you know what you are doing*/ 
let botver = "1.01";//Delete if you want

let hm = "Here you go :3";//Delete me

/*global Set, Map*/
app.use(express.static('public'));

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname + "/views/index.html"); // Here, you can send a response to the website. Example i choosed 200, that means the server was fine, working normally.
  // So, if change to 500, response will send a status with 500, that means i'm currently dead, you need to repair my coding/server.
});
app.listen(process.env.PORT);
setInterval((response) => {
  http.get("http://mittz-bot.glitch.me/");
}, 280000);
// If you didn't want to run in 24/7 you can remove it.




client.on('message', (message, req) => {
try {//Uploads the chat from actual discord users to ur chat
  fs.appendFile(__dirname + '/public/chat_log.html', '<br>'+message.member.displayName+": "+message.content, (err) => {
    console.log('Real User Text Updated!');
});
  console.log("entering try block");
  console.log("this message is never seen");
}
catch(err) {/*Uploads widget content*/
  fs.appendFile(__dirname + '/public/chat_log.html', '<br>'+"guest"+": "+message.content, (err) => {
    console.log('Guest Text Updated!');});
}
});

var ec = "gc";/*Stands for embed command, change the text to whatever you want the command to be*/
client.on('message', message => {if (message.content.startsWith(prefix + ec)) {/*Dont change this at all*/  
  var str = message.content;var contents1=str.search(": ");/*Leave these alone*/
  var contents01=str.search(ec+" ");
  var contents2 = str.substr(contents01+3, contents1-7);var contents3 = str.substr(contents1+1, Infinity);/*Also leave this alone*/
  
  const fancyembed = new Discord.MessageEmbed()/*Start of embed*/
	.setColor('#0099ff')/*The line color*/
	.setTitle('User: '+contents2)/*You probably should'nt change this*/
	.setURL('https://dwchat.glitch.me/')
	.setAuthor('Discord Widget Chat', 'https://i.imgur.com/wSTFkRM.png', 'https://mittens.glitch.me')/*(Name, Image, Link) Preferably keep the link if you need support*/
	.setDescription('This is a guest User')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')/*Change to any image that you want*/
	.addFields(
		{ name: 'Message', value: contents3 },/*Contents3: Gets input after !v! gc Name: Text*/

	)
	.setImage('https://i.imgur.com/wSTFkRM.png')/*Big Square image*/
	.setTimestamp()
	.setFooter('Mittenz Team', 'https://i.imgur.com/wSTFkRM.png');/*Mittenz Team can be set to anything, or keep to support the creator*/
  
  message.channel.send(fancyembed);// Make sure the name of the constant is the same as this Ex. | const exampleEmbed = new Discord.MessageEmbed() | must match | message.channel.send(exampleEmbed);
}
    });   
     

client.on("ready", async () => {
  client.user.setActivity(' !v! help', {
    type: "Listening"
  });
  });

client.login(process.env.TOKEN);/*Set token in the .env file*/

// makes all the files in 'public' available
app.use(express.static("public"));

// Simple express routing
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});


