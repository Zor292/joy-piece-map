# 🏴‍☠️ JoyPiece Discord Bot

بوت ديسكورد خاص بسيرفر JoyPiece - سيرفر ماين كرافت ون بيس

---

## 📋 متطلبات الإعداد

### 1. إنشاء البوت في Discord Developer Portal

1. اذهب إلى https://discord.com/developers/applications
2. اضغط **New Application** وسمّه `JoyPiece Bot`
3. اذهب إلى تبويب **Bot**
4. اضغط **Add Bot**
5. انسخ الـ **Token** واحفظه
6. فعّل هذه الصلاحيات تحت **Privileged Gateway Intents**:
   - ✅ `SERVER MEMBERS INTENT`
   - ✅ `MESSAGE CONTENT INTENT`
7. اذهب إلى **OAuth2 > URL Generator**:
   - Scopes: `bot` + `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Manage Roles`, `Use External Emojis`
8. انسخ الرابط وادعُ البوت للسيرفر

---

## 🚀 رفع البوت على Railway

### المتطلبات:
- حساب على [railway.app](https://railway.app)
- Git مثبت على جهازك

### خطوات الرفع:

1. **ارفع الملفات على GitHub:**
```bash
git init
git add .
git commit -m "JoyPiece Bot"
git remote add origin https://github.com/username/joypiece-bot.git
git push -u origin main
```

2. **أنشئ مشروع جديد على Railway:**
   - اذهب إلى [railway.app](https://railway.app)
   - اضغط **New Project > Deploy from GitHub repo**
   - اختر المستودع

3. **أضف المتغيرات البيئية (Variables):**

في لوحة Railway، اذهب إلى **Variables** وأضف:

| Variable | القيمة |
|----------|--------|
| `DISCORD_TOKEN` | توكن البوت من Developer Portal |
| `CLIENT_ID` | Application ID من Developer Portal |
| `GUILD_ID` | ID السيرفر الخاص بك |

### كيف تحصل على IDs:

- **DISCORD_TOKEN**: Discord Developer Portal > Bot > Token
- **CLIENT_ID**: Discord Developer Portal > General Information > Application ID  
- **GUILD_ID**: في ديسكورد، كليك يمين على اسم السيرفر > Copy Server ID (يجب تفعيل Developer Mode من الإعدادات)

---

## 📖 أوامر البوت

| الأمر | الوظيفة |
|-------|---------|
| `/mapsend` | إرسال الإمبد الرئيسي مع الأزرار في القناة الحالية |

---

## 🎮 وظائف الأزرار والقوائم

| العنصر | الوظيفة |
|--------|---------|
| زر **شرح السيرفر** | يرسل إمبد شرح السيرفر مع الصور |
| زر **قوانين السيرفر** | يرسل قائمة منسدلة لاختيار نوع القوانين |
| زر **كيفية دخول السيرفر** | يرسل إمبد طريقة الدخول |
| قائمة **اختر رولات الاشعارات** | يضيف أو يزيل رولات الاشعارات للعضو |

---

## ⚠️ ملاحظات مهمة

- تأكد من أن رتبة البوت أعلى من رولات الاشعارات في السيرفر
- البوت يحتاج صلاحية `Manage Roles` لتعيين الرولات
- أضف جميع المتغيرات في Railway قبل تشغيل البوت

---

## 🛠️ تطوير: firas
