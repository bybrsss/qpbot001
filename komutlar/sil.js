const Discord = require("discord.js");
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`Ne yazıkki bu komutu kullanmaya yetkiniz yok!`)
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`Lütfen silinecek mesaj sayısını belirtiniz.`)
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  if (args[0] > 200) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`Ne yazık ki 200'den fazla mesaj silemem.`)
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  message.channel.bulkDelete(args[0]).then(() => {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .addField(`Temizleyen Yetkili`, `<@${message.author.id}>`)
      .addField(`Silinen Mesaj Sayısı`, args[0])
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed).then(msg => msg.delete(5000));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = {
  name: "sil",
  description: "Mesaj Siler",
  usage: "sil <mesajSayısı>"
};