require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  InteractionType,
  ComponentType
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

// ─── READY ────────────────────────────────────────────────────────────────────
client.once('ready', () => {
  console.log(`✅ البوت جاهز! تسجيل الدخول كـ: ${client.user.tag}`);
});

// ─── BUILD MAIN COMPONENTS (buttons + role dropdown) ─────────────────────────
function buildMainComponents() {
  const row1 = new ActionRowBuilder().addComponents(
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

  const row2 = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select_notifications')
      .setPlaceholder('اختر رولات الاشعارات')
      .setMinValues(0)
      .setMaxValues(4)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('منشن اذكار')
          .setValue('1478310876586180631')
          .setDescription('استقبال منشن اذكار')
          .setEmoji('📿'),
        new StringSelectMenuOptionBuilder()
          .setLabel('منشن الاعلانات')
          .setValue('1478310940972683445')
          .setDescription('استقبال منشن الاعلانات')
          .setEmoji('📢'),
        new StringSelectMenuOptionBuilder()
          .setLabel('منشن البارتنر')
          .setValue('1478311003455361035')
          .setDescription('استقبال منشن البارتنر')
          .setEmoji('🤝')
      )
  );

  return [row1, row2];
}

// ─── SLASH COMMAND: /mapsend ──────────────────────────────────────────────────
client.on('interactionCreate', async (interaction) => {
  // /mapsend command
  if (interaction.isChatInputCommand() && interaction.commandName === 'mapsend') {
    await interaction.deferReply({ ephemeral: true });

    try {
      const channel = interaction.channel;
      const components = buildMainComponents();

      await channel.send({
        embeds: [buildMainEmbed()],
        components: components
      });

      // Send the map image below the embed
      await channel.send({
        files: ['https://media.discordapp.net/attachments/1407735667181621290/1477918864732848188/70E09E1C-A630-484B-9F04-7A8B5A0DC2E9.jpg?ex=69a7d433&is=69a682b3&hm=59007b3ba8070fde7aa6652fcf96d172e90ba8d34ef82d0d94e5df70f22daed0&=&format=webp&width=1417&height=89']
      });

      await interaction.editReply({ content: '✅ تم إرسال الإمبد بنجاح!' });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: '❌ حدث خطأ أثناء الإرسال.' });
    }
    return;
  }

  // ─── BUTTON: شرح السيرفر ────────────────────────────────────────────────
  if (interaction.isButton() && interaction.customId === 'btn_server_desc') {
    await interaction.reply({
      embeds: [buildServerDescEmbed()],
      ephemeral: false
    });
    return;
  }

  // ─── BUTTON: قوانين السيرفر → dropdown ──────────────────────────────────
  if (interaction.isButton() && interaction.customId === 'btn_rules') {
    const rulesMenu = new ActionRowBuilder().addComponents(
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

    await interaction.reply({
      content: '**اختر القانون الذي تريد الاطلاع عليه:**',
      components: [rulesMenu],
      ephemeral: false
    });
    return;
  }

  // ─── BUTTON: كيفية دخول السيرفر ─────────────────────────────────────────
  if (interaction.isButton() && interaction.customId === 'btn_how_to_join') {
    await interaction.reply({
      embeds: [buildHowToJoinEmbed()],
      ephemeral: false
    });
    return;
  }

  // ─── SELECT MENU: rules dropdown ─────────────────────────────────────────
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_rules') {
    const selected = interaction.values[0];
    let embed;

    switch (selected) {
      case 'discord_rules':
        embed = buildDiscordRulesEmbed();
        break;
      case 'mc_rules':
        embed = buildMinecraftRulesEmbed();
        break;
      case 'fight_rules':
        embed = buildFightRulesEmbed();
        break;
      case 'complaint_rules':
        embed = buildComplaintRulesEmbed();
        break;
    }

    await interaction.reply({
      embeds: [embed],
      ephemeral: false
    });
    return;
  }

  // ─── SELECT MENU: notification roles ─────────────────────────────────────
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_notifications') {
    const allRoleIds = [
      '1478310876586180631',
      '1478310940972683445',
      '1478311003455361035'
    ];

    const member = interaction.member;
    const selectedRoles = interaction.values;

    try {
      // Remove all notification roles first
      for (const roleId of allRoleIds) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role && member.roles.cache.has(roleId)) {
          await member.roles.remove(role).catch(() => {});
        }
      }

      // Add selected roles
      const addedRoles = [];
      for (const roleId of selectedRoles) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
          await member.roles.add(role).catch(() => {});
          addedRoles.push(role.name);
        }
      }

      const msg = addedRoles.length > 0
        ? `✅ تم تفعيل الرولات: **${addedRoles.join(', ')}**`
        : '✅ تم إلغاء جميع رولات الاشعارات.';

      await interaction.reply({ content: msg, ephemeral: true });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: '❌ حدث خطأ في تعيين الرولات. تأكد من أن البوت يملك صلاحية Manage Roles وأن رتبته أعلى من الرولات.',
        ephemeral: true
      });
    }
    return;
  }
});

// ─── LOGIN ────────────────────────────────────────────────────────────────────
client.login(process.env.DISCORD_TOKEN);
