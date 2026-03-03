require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  MessageFlags
} = require('discord.js');

const {
  buildMainEmbed,
  buildServerDescEmbed,
  buildDiscordRulesEmbed,
  buildMinecraftRulesEmbed,
  buildFightRulesEmbed,
  buildComplaintRulesEmbed,
  buildHowToJoinEmbed
} = require('./embeds');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.once('clientReady', () => {
  console.log(`✅ البوت جاهز! تسجيل الدخول كـ: ${client.user.tag}`);
});

function buildButtonRow() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('btn_server_desc')
      .setLabel('شرح السيرفر')
      .setEmoji('📋')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('btn_rules')
      .setLabel('قوانين السيرفر')
      .setEmoji('📜')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('btn_how_to_join')
      .setLabel('كيفية دخول السيرفر')
      .setEmoji('🎮')
      .setStyle(ButtonStyle.Secondary)
  );
}

function buildNotifRow() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select_notifications')
      .setPlaceholder('اختر رولات الاشعارات')
      .setMinValues(0)
      .setMaxValues(3)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('منشن اذكار')
          .setValue('role_1478310876586180631')
          .setDescription('استقبال منشن اذكار')
          .setEmoji('📿'),
        new StringSelectMenuOptionBuilder()
          .setLabel('منشن الاعلانات')
          .setValue('role_1478310940972683445')
          .setDescription('استقبال منشن الاعلانات')
          .setEmoji('📢'),
        new StringSelectMenuOptionBuilder()
          .setLabel('منشن البارتنر')
          .setValue('role_1478311003455361035')
          .setDescription('استقبال منشن البارتنر')
          .setEmoji('🤝')
      )
  );
}

function buildRulesMenuRow() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select_rules')
      .setPlaceholder('اختر نوع القوانين')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('قوانين ديسكورد')
          .setValue('discord_rules')
          .setEmoji('💬'),
        new StringSelectMenuOptionBuilder()
          .setLabel('قوانين ماين كرافت')
          .setValue('mc_rules')
          .setEmoji('⛏️'),
        new StringSelectMenuOptionBuilder()
          .setLabel('قوانين الفايتات')
          .setValue('fight_rules')
          .setEmoji('⚔️'),
        new StringSelectMenuOptionBuilder()
          .setLabel('قوانين الشكاوي')
          .setValue('complaint_rules')
          .setEmoji('📋')
      )
  );
}

client.on('interactionCreate', async (interaction) => {

  // /mapsend
  if (interaction.isChatInputCommand() && interaction.commandName === 'mapsend') {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      await interaction.channel.send({
        embeds: [buildMainEmbed()],
        components: [buildButtonRow(), buildNotifRow()]
      });
      await interaction.channel.send({
        files: ['https://media.discordapp.net/attachments/1407735667181621290/1477918864732848188/70E09E1C-A630-484B-9F04-7A8B5A0DC2E9.jpg?ex=69a7d433&is=69a682b3&hm=59007b3ba8070fde7aa6652fcf96d172e90ba8d34ef82d0d94e5df70f22daed0&=&format=webp&width=1417&height=89']
      });
      await interaction.editReply({ content: '✅ تم إرسال الإمبد بنجاح!' });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: '❌ حدث خطأ أثناء الإرسال.' });
    }
    return;
  }

  // زر: شرح السيرفر - رد مخفي
  if (interaction.isButton() && interaction.customId === 'btn_server_desc') {
    await interaction.reply({
      embeds: [buildServerDescEmbed()],
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  // زر: قوانين السيرفر - يفتح dropdown مخفي
  if (interaction.isButton() && interaction.customId === 'btn_rules') {
    await interaction.reply({
      content: '**اختر نوع القوانين:**',
      components: [buildRulesMenuRow()],
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  // زر: كيفية دخول السيرفر - رد مخفي
  if (interaction.isButton() && interaction.customId === 'btn_how_to_join') {
    await interaction.reply({
      embeds: [buildHowToJoinEmbed()],
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  // قائمة القوانين - تحديث نفس الرسالة المخفية
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_rules') {
    const selected = interaction.values[0];
    let embed;
    switch (selected) {
      case 'discord_rules':   embed = buildDiscordRulesEmbed();   break;
      case 'mc_rules':        embed = buildMinecraftRulesEmbed(); break;
      case 'fight_rules':     embed = buildFightRulesEmbed();     break;
      case 'complaint_rules': embed = buildComplaintRulesEmbed(); break;
    }
    await interaction.update({
      content: '**اختر نوع القوانين:**',
      embeds: [embed],
      components: [buildRulesMenuRow()]
    });
    return;
  }

  // قائمة رولات الاشعارات - رد مخفي
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_notifications') {
    const allRoleIds = [
      '1478310876586180631',
      '1478310940972683445',
      '1478311003455361035'
    ];
    const member = interaction.member;
    const selectedRoles = interaction.values.map(v => v.replace('role_', ''));

    try {
      for (const roleId of allRoleIds) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role && member.roles.cache.has(roleId)) {
          await member.roles.remove(role).catch(() => {});
        }
      }
      const addedRoles = [];
      for (const roleId of selectedRoles) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
          await member.roles.add(role).catch(() => {});
          addedRoles.push(role.name);
        }
      }
      const msg = addedRoles.length > 0
        ? `✅ تم تفعيل: **${addedRoles.join(', ')}**`
        : '✅ تم إلغاء جميع رولات الاشعارات.';

      await interaction.reply({ content: msg, flags: MessageFlags.Ephemeral });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: '❌ تأكد أن رتبة البوت أعلى من الرولات وأن لديه صلاحية Manage Roles.',
        flags: MessageFlags.Ephemeral
      });
    }
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
