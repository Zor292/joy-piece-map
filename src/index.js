require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  MessageFlags,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
  SectionBuilder
} = require('discord.js');

const PURPLE = 0x7B2FBE;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('clientReady', () => {
  console.log(`✅ البوت جاهز: ${client.user.tag}`);
});

// ══════════════════════════════════════════════════════
//  بناء الرسالة الرئيسية بـ Components V2
//  الصورة + النص + الأزرار + الـ dropdown كلها داخل Container واحد
// ══════════════════════════════════════════════════════
function buildMainMessage() {
  const container = new ContainerBuilder()
    .setAccentColor(PURPLE)

    // صورة الهيدر
    .addMediaGalleryComponents((gallery) =>
      gallery.addItems((item) =>
        item.setURL('https://cdn.discordapp.com/attachments/1407735667181621290/1407949910367801459/E7474569-7FB5-4BA4-8B16-6DFE8A422D47.jpg?ex=69a7ba09&is=69a66889&hm=e9c7b6ee304831234e0ec2253e059372580155878ed7209bef409d55dbfe291f&')
      )
    )

    // النص الترحيبي
    .addTextDisplayComponents((text) =>
      text.setContent(
        '**مرحبا بكم في سيرفر JoyPiece**\n\n' +
        'يرجى قراءة القوانين ادناه لتجنب المشاكل والعقوبات'
      )
    )

    // خط فاصل
    .addSeparatorComponents((sep) =>
      sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small)
    )

    // زر شرح السيرفر - Section مع زر على اليمين
    .addSectionComponents((section) =>
      section
        .addTextDisplayComponents((text) => text.setContent('📋 **شرح السيرفر**'))
        .setButtonAccessory((btn) =>
          btn.setCustomId('btn_server_desc').setLabel('←').setStyle(ButtonStyle.Secondary)
        )
    )

    // زر قوانين السيرفر
    .addSectionComponents((section) =>
      section
        .addTextDisplayComponents((text) => text.setContent('📜 **قوانين السيرفر**'))
        .setButtonAccessory((btn) =>
          btn.setCustomId('btn_rules').setLabel('←').setStyle(ButtonStyle.Secondary)
        )
    )

    // زر كيفية دخول السيرفر
    .addSectionComponents((section) =>
      section
        .addTextDisplayComponents((text) => text.setContent('🎮 **كيفية دخول السيرفر**'))
        .setButtonAccessory((btn) =>
          btn.setCustomId('btn_how_to_join').setLabel('←').setStyle(ButtonStyle.Secondary)
        )
    )

    // خط فاصل
    .addSeparatorComponents((sep) =>
      sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small)
    )

    // قائمة رولات الاشعارات
    .addActionRowComponents((row) =>
      row.setComponents(
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
      )
    )

    // فوتر
    .addSeparatorComponents((sep) => sep.setDivider(false).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) =>
      text.setContent('-# developed by firas')
    );

  return container;
}

// ══════════════════════════════════════════════════════
//  إمبد شرح السيرفر (مخفي)
// ══════════════════════════════════════════════════════
function buildServerDescContainer() {
  return new ContainerBuilder()
    .setAccentColor(PURPLE)
    .addTextDisplayComponents((text) =>
      text.setContent('## 📋 شرح السيرفر')
    )
    .addSeparatorComponents((sep) => sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) =>
      text.setContent(
        '**نحن سيرفر ماين كرافت جافا مختص بمود ون بيس**\n\n' +
        'اكثر من ثلاث سنوات وسيرفرنا قيد العمل وتمكن مبرمجينا من تطوير المود من انفسهم وبرمجة حصريات لا توجد عند غيرنا'
      )
    )
    .addMediaGalleryComponents((gallery) =>
      gallery
        .addItems((item) => item.setURL('https://cdn.discordapp.com/attachments/1464292408450613511/1476890574836596848/image.png?ex=69a76248&is=69a610c8&hm=20b9485f7cdd7415fc04a4e7128a5bdcbbc1ee02aa1737ab9d567915bb12607b&'))
        .addItems((item) => item.setURL('https://cdn.discordapp.com/attachments/1464292408450613511/1476889601527382078/2026-02-19_172148.png?ex=69a76160&is=69a60fe0&hm=9d7fa4e044d0271e034479245faf240498f2ecbda7656dd4f390efc07ce68455&'))
        .addItems((item) => item.setURL('https://media.discordapp.net/attachments/1415668063507841054/1475552242886119725/image.png?ex=69a7c9dd&is=69a6785d&hm=4939ef203eb0487b4c952e7059f659ae921b5e6e51e29c021e327050d3ec6c38&=&format=webp&quality=lossless&width=1033&height=796'))
    )
    .addSeparatorComponents((sep) => sep.setDivider(false).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) => text.setContent('-# developed by firas'));
}

// ══════════════════════════════════════════════════════
//  قائمة القوانين + إمبدات القوانين
// ══════════════════════════════════════════════════════
function buildRulesMenuContainer() {
  return new ContainerBuilder()
    .setAccentColor(PURPLE)
    .addTextDisplayComponents((text) => text.setContent('## 📖 اختر نوع القوانين'))
    .addSeparatorComponents((sep) => sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    .addActionRowComponents((row) =>
      row.setComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_rules')
          .setPlaceholder('اختر نوع القوانين')
          .addOptions(
            new StringSelectMenuOptionBuilder().setLabel('قوانين ديسكورد').setValue('discord_rules').setEmoji('💬'),
            new StringSelectMenuOptionBuilder().setLabel('قوانين ماين كرافت').setValue('mc_rules').setEmoji('⛏️'),
            new StringSelectMenuOptionBuilder().setLabel('قوانين الفايتات').setValue('fight_rules').setEmoji('⚔️'),
            new StringSelectMenuOptionBuilder().setLabel('قوانين الشكاوي').setValue('complaint_rules').setEmoji('📋')
          )
      )
    )
    .addSeparatorComponents((sep) => sep.setDivider(false).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) => text.setContent('-# developed by firas'));
}

function buildRulesContainer(type) {
  const contents = {
    discord_rules: {
      title: '💬 قوانين الديسكورد',
      body:
        '**Joy Piece**\n\n' +
        '**1️⃣ احترام الجميع** — يُمنع التنمر أو الإساءة اللفظية. تجنب الألفاظ النابية.\n\n' +
        '**2️⃣ التحلي بالأدب** — سلوك جيد وعدم التصرف بشكل فوضوي. تأكد من المناقشات في القنوات المخصصة.\n\n' +
        '**3️⃣ عدم نشر المحتوى المخالف** — يُمنع المواد الإباحية، العنف، أو ما يخالف قوانين Discord.\n\n' +
        '**4️⃣ عدم الترويج** — لا ترويج لأي سيرفر آخر بدون إذن الإدارة.\n\n' +
        '**5️⃣ حماية الخصوصية** — يُمنع نشر المعلومات الشخصية للأعضاء.\n\n' +
        '**6️⃣ التبليغ عن المشاكل** — بلّغ المشرفين بدل تصعيد الموقف.\n\n' +
        '**7️⃣ التفاعل الإيجابي** — كن جزءاً من مجتمع مرح ومفيد!'
    },
    mc_rules: {
      title: '⛏️ قوانين ماين كرافت',
      body:
        '**Joy Piece**\n\n' +
        '🚫 ممنوع الطاقم يملك فاكهتين متكررتين!\n' +
        '🚫 ممنوع تاكل فيقابانك وانت مو ماكل فاكهة!!\n' +
        '🚫 ممنوع تسرق بوس واحد مدمجه قبلك في المناطق المحمية\n' +
        '🚫 ممنوع القلتشات التي تخرب اللعبة أو تكرش الشخص\n' +
        '🚫 ممنوع تدبل بالجيكي أو بفاكهة ثانية\n' +
        '🚫 ممنوع تستخدم أو تشيل معك بلوكات كايروسكي\n' +
        '🚫 ممنوع تسب في الشات أو تسيء لأحد\n' +
        '🚫 ممنوع القذف\n' +
        '🚫 ممنوع اكس ري\n' +
        '🚫 ممنوع اوتو كليكر\n' +
        '🚫 ممنوع التحالف مع طاقم ثاني دون موافقة الإدارة\n' +
        '🚫 ممنوع الهاك — عقوبة سجن ساعتين\n' +
        '🚫 ممنوع فارم اكسبي\n' +
        '🚫 ممنوع سحب أي شخص في البحر\n' +
        '🚫 ممنوع سحب الايرون أو الكالن بول في مناطق محمية أو شخص هيله تحت 400\n' +
        '🚫 ممنوع قلتش الفيوتشر عمدا\n' +
        '🚫 ممنوع تشيل أحد بفاكهة تحت بلوكة\n' +
        '🚫 ممنوع تسفير البوسات\n' +
        '🚫 ممنوع قلتش فواكهة الزون\n' +
        '🚫 ممنوع التقفيص على البوس والPVP OFF\n' +
        '🚫 ممنوع تزرف البوسات مع PVP OFF أو منطقة محمية\n' +
        '🚫 ممنوع رمي الكايروسكي في السبون\n' +
        '🚫 ممنوع ازعاج الإدارة في التعويض أو استلام البف\n' +
        '⚠️ في حال كشفك تدبل بتتصفر أنت وطاقمك\n' +
        '🚫 ممنوع السب أو الأغاني في المايك\n' +
        '🚫 ممنوع نشر سيرفرات في الشات أو المايك\n' +
        '🚫 ممنوع دور أي ثغرة\n\n' +
        '⚠️ **نحن غير مسؤولين عن عدم التزامك بالقوانين**'
    },
    fight_rules: {
      title: '⚔️ قوانين الفايتات',
      body:
        '**Joy Piece** — على كل مخالفة تأخذ @تحذير\n\n' +
        '**1-** ممنوع تتفايت بدون توثيق في روم unknown — يتعوض الطرف الثاني، تغيير الطاقم كل ٥ ساعات\n\n' +
        '**2-** الفايت يحسب من أول ضربة + هاكي ملكي + تثبيت — ممنوع تلفت قبل ٣٠ ثانية من آخر ضربة\n\n' +
        '**3-** ممنوع تلفت داخل قفص إيتو أو أوري — إذا لفت تنذبح\n\n' +
        '**4-** ممنوع تذبح واحد هيله أقل من 400 — عقوبة تصفير نص الدروكي والهاكي\n\n' +
        '**5-** ممنوع تسحب خويك في نص فايت\n\n' +
        '**6-** ممنوع تنتقل في نص فايت عند خويك\n\n' +
        '**7-** في حال كرشت عليك اللعبة لازم معك تصوير وإلا تحسب ملفت\n\n' +
        '**8-** ممنوع تهرب بوي ستون أو وارب ستون قبل ٣٠ ثانية\n\n' +
        '**9-** مسموح رمي الكايروسكي العادي\n\n' +
        '**10-** ممنوع بناء بلوكات كايروسكي — يتعوض الي مات منها\n\n' +
        '**11-** ممنوع التلفيت\n\n' +
        '**12-** ممنوع تتفايت وهيلك أقل من 400\n\n' +
        '**13-** بوسات شابتر الأول كلها محمية إلا مستر ون وكروكودايل'
    },
    complaint_rules: {
      title: '📋 قوانين الشكاوي',
      body:
        '**Joy Piece**\n\n' +
        '🚫 ممنوع تشتكي بدون تصوير ودليل كامل\n\n' +
        '🚫 ممنوع تشتكي على سالفة مر عليها ساعتين\n\n' +
        '🚫 ممنوع تعترض على قرار الإدارة'
    }
  };

  const { title, body } = contents[type];

  return new ContainerBuilder()
    .setAccentColor(PURPLE)
    .addTextDisplayComponents((text) => text.setContent(`## ${title}`))
    .addSeparatorComponents((sep) => sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) => text.setContent(body))
    .addSeparatorComponents((sep) => sep.setDivider(false).setSpacing(SeparatorSpacingSize.Small))
    // زر الرجوع للقائمة
    .addActionRowComponents((row) =>
      row.setComponents(
        new ButtonBuilder().setCustomId('back_to_rules').setLabel('← رجوع للقائمة').setStyle(ButtonStyle.Secondary)
      )
    )
    .addTextDisplayComponents((text) => text.setContent('-# developed by firas'));
}

function buildHowToJoinContainer() {
  return new ContainerBuilder()
    .setAccentColor(PURPLE)
    .addTextDisplayComponents((text) => text.setContent('## 🎮 كيفية دخول السيرفر'))
    .addSeparatorComponents((sep) => sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) => text.setContent('**قريبا مع افتتاح السيرفر** 🕐'))
    .addSeparatorComponents((sep) => sep.setDivider(false).setSpacing(SeparatorSpacingSize.Small))
    .addTextDisplayComponents((text) => text.setContent('-# developed by firas'));
}

// ══════════════════════════════════════════════════════
//  التعامل مع الإنتراكشنز
// ══════════════════════════════════════════════════════
client.on('interactionCreate', async (interaction) => {

  // /mapsend
  if (interaction.isChatInputCommand() && interaction.commandName === 'mapsend') {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      // الرسالة الرئيسية بـ Components V2
      await interaction.channel.send({
        components: [buildMainMessage()],
        flags: MessageFlags.IsComponentsV2
      });

      // صورة الخريطة الطويلة تحت الرسالة
      await interaction.channel.send({
        files: ['https://media.discordapp.net/attachments/1407735667181621290/1477918864732848188/70E09E1C-A630-484B-9F04-7A8B5A0DC2E9.jpg?ex=69a7d433&is=69a682b3&hm=59007b3ba8070fde7aa6652fcf96d172e90ba8d34ef82d0d94e5df70f22daed0&=&format=webp&width=1417&height=89']
      });

      await interaction.editReply({ content: '✅ تم إرسال الإمبد بنجاح!' });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: `❌ خطأ: ${err.message}` });
    }
    return;
  }

  // زر شرح السيرفر → مخفي
  if (interaction.isButton() && interaction.customId === 'btn_server_desc') {
    await interaction.reply({
      components: [buildServerDescContainer()],
      flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
    return;
  }

  // زر قوانين السيرفر → مخفي مع dropdown
  if (interaction.isButton() && interaction.customId === 'btn_rules') {
    await interaction.reply({
      components: [buildRulesMenuContainer()],
      flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
    return;
  }

  // زر كيفية دخول السيرفر → مخفي
  if (interaction.isButton() && interaction.customId === 'btn_how_to_join') {
    await interaction.reply({
      components: [buildHowToJoinContainer()],
      flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
    return;
  }

  // قائمة القوانين → يحدّث نفس الرسالة المخفية بالقانون المختار
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_rules') {
    await interaction.update({
      components: [buildRulesContainer(interaction.values[0])],
      flags: MessageFlags.IsComponentsV2
    });
    return;
  }

  // زر الرجوع للقائمة
  if (interaction.isButton() && interaction.customId === 'back_to_rules') {
    await interaction.update({
      components: [buildRulesMenuContainer()],
      flags: MessageFlags.IsComponentsV2
    });
    return;
  }

  // قائمة رولات الاشعارات → مخفي
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_notifications') {
    const allRoleIds = ['1478310876586180631', '1478310940972683445', '1478311003455361035'];
    const member = interaction.member;
    const selectedRoles = interaction.values.map(v => v.replace('role_', ''));

    try {
      for (const roleId of allRoleIds) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role && member.roles.cache.has(roleId)) await member.roles.remove(role).catch(() => {});
      }
      const addedNames = [];
      for (const roleId of selectedRoles) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) { await member.roles.add(role).catch(() => {}); addedNames.push(role.name); }
      }
      const msg = addedNames.length > 0 ? `✅ تم تفعيل: **${addedNames.join(', ')}**` : '✅ تم إلغاء جميع رولات الاشعارات.';
      await interaction.reply({ content: msg, flags: MessageFlags.Ephemeral });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ تأكد أن رتبة البوت أعلى من الرولات وأن لديه Manage Roles.', flags: MessageFlags.Ephemeral });
    }
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
