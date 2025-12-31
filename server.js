// ============================================
// 🤖 بوت MESALAK_LIAM - الإصدار النهائي للسرفر
// ============================================

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// 🔐 التوكن الخاص بك - يعمل على Glitch
const BOT_TOKEN = process.env.BOT_TOKEN || '8519289824:AAHBJpkLHM2gQ3SlkuE__fMBIl9GL4kve4I';

// 🔗 معرف المسؤول
const ADMIN_USER = 'MESALAK_LIAM';

// 🌐 إعدادات السرفر
const app = express();
const PORT = process.env.PORT || 3000;

// 📊 صفحة رئيسية للتحقق
app.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
            <title>بوت MESALAK_LIAM</title>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: #f0f2f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    max-width: 500px;
                    margin: 0 auto;
                }
                h1 {
                    color: #0088cc;
                }
                .status {
                    color: green;
                    font-weight: bold;
                }
                .telegram-btn {
                    display: inline-block;
                    background: #0088cc;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🤖 بوت MESALAK_LIAM</h1>
                <p class="status">✅ البوت يعمل بنجاح</p>
                <p>👑 المسؤول: <b>@MESALAK_LIAM</b></p>
                <p>⚡ يعمل 24/7 بدون توقف</p>
                <p>⏰ وقت التشغيل: ${Math.floor(process.uptime())} ثانية</p>
                <br>
                <a href="https://t.me/8519289824_bot" class="telegram-btn" target="_blank">
                    💬 فتح البوت في Telegram
                </a>
                <br><br>
                <small>تم التطوير خصيصاً لـ MESALAK_LIAM</small>
            </div>
        </body>
    </html>
    `);
});

// 🏁 تشغيل السرفر
app.listen(PORT, () => {
    console.log(`🚀 السرفر يعمل على: https://${process.env.PROJECT_DOMAIN}.glitch.me`);
});

// ============================================
// 🤖 جزء البوت الرئيسي
// ============================================

console.log('🔧 بدء تشغيل بوت MESALAK_LIAM على Glitch...');

// إنشاء البوت
const bot = new TelegramBot(BOT_TOKEN, { 
    polling: true 
});

// 📁 إعدادات البوت
let botSettings = {
    group: 'https://t.me/+XXXXXXXXX',  // ضع رابط مجموعتك هنا
    channel: 'https://t.me/+YYYYYYYYY', // ضع رابط قناتك هنا
    owner: ADMIN_USER
};

// ✅ تحقق من الاتصال
bot.getMe().then(me => {
    console.log(`✅ البوت متصل: @${me.username}`);
    console.log(`👑 المسؤول: @${ADMIN_USER}`);
    console.log(`🌐 رابط البوت: https://t.me/${me.username}`);
    console.log(`🔗 رابط السرفر: https://${process.env.PROJECT_DOMAIN}.glitch.me`);
}).catch(err => {
    console.error('❌ خطأ في الاتصال:', err.message);
});

// ✨ أمر /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from;
    const userName = user.first_name || 'عزيزي';
    
    console.log(`👤 ${user.username || 'مستخدم'} يبدأ البوت`);
    
    // تحقق إذا كان MESALAK_LIAM
    if (user.username === ADMIN_USER) {
        // لوحة تحكم المسؤول
        const adminMsg = `🎖️ *مرحباً ${userName}!*\n\n🔧 *لوحة تحكم البوت*\n\n📍 *السرفر:* Glitch.com\n⚡ *الحالة:* نشط دائمًا\n🌐 *الرابط:* https://${process.env.PROJECT_DOMAIN}.glitch.me`;
        
        const adminKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{text: '📢 عرض المجموعة', url: botSettings.group}],
                    [{text: '📨 عرض القناة', url: botSettings.channel}],
                    [{text: '🔄 تغيير المجموعة', callback_data: 'change_group'}],
                    [{text: '🔄 تغيير القناة', callback_data: 'change_channel'}],
                    [{text: '📊 حالة السرفر', callback_data: 'server_status'}]
                ]
            },
            parse_mode: 'Markdown'
        };
        
        bot.sendMessage(chatId, adminMsg, adminKeyboard);
    } else {
        // مستخدم عادي
        const userMsg = `🎯 *مرحباً ${userName}!*\n\n🤖 *بوت MESALAK_LIAM*\n\n🔒 *تواصل آمن يحمي معلوماتك*\n⚡ *يعمل 24/7 على سرفر خاص*`;
        
        const userKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{text: '📢 انضم للمجموعة', url: botSettings.group}],
                    [{text: '📨 انضم للقناة', url: botSettings.channel}],
                    [{text: '👤 تواصل مع المالك', url: `https://t.me/${ADMIN_USER}`}],
                    [{text: 'ℹ️ معلومات عن البوت', callback_data: 'about_bot'}]
                ]
            },
            parse_mode: 'Markdown'
        };
        
        bot.sendMessage(chatId, userMsg, userKeyboard);
    }
});

// 🎮 معالجة أزرار لوحة التحكم
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const user = query.from;
    const data = query.data;
    
    await bot.answerCallbackQuery(query.id);
    
    // تحقق من الصلاحية
    if (user.username !== ADMIN_USER && data.startsWith('change_')) {
        return bot.sendMessage(chatId, '❌ هذا الخيار للمسؤول فقط.');
    }
    
    switch(data) {
        case 'change_group':
            bot.sendMessage(chatId, '✏️ *أرسل رابط المجموعة الجديد:*', {
                parse_mode: 'Markdown'
            });
            
            // استمع للرد
            const groupListener = (reply) => {
                if (reply.chat.id === chatId && reply.from.username === ADMIN_USER) {
                    botSettings.group = reply.text;
                    bot.sendMessage(chatId, `✅ *تم التحديث:*\n${botSettings.group}`, {
                        parse_mode: 'Markdown'
                    });
                    bot.removeListener('message', groupListener);
                }
            };
            bot.on('message', groupListener);
            break;
            
        case 'change_channel':
            bot.sendMessage(chatId, '✏️ *أرسل رابط القناة الجديد:*', {
                parse_mode: 'Markdown'
            });
            
            const channelListener = (reply) => {
                if (reply.chat.id === chatId && reply.from.username === ADMIN_USER) {
                    botSettings.channel = reply.text;
                    bot.sendMessage(chatId, `✅ *تم التحديث:*\n${botSettings.channel}`, {
                        parse_mode: 'Markdown'
                    });
                    bot.removeListener('message', channelListener);
                }
            };
            bot.on('message', channelListener);
            break;
            
        case 'server_status':
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            
            const statusMsg = `📊 *حالة السرفر:*\n\n✅ البوت: نشط\n👑 المسؤول: @${ADMIN_USER}\n⏰ وقت التشغيل: ${hours} ساعة ${minutes} دقيقة\n🌐 الرابط: https://${process.env.PROJECT_DOMAIN}.glitch.me`;
            bot.sendMessage(chatId, statusMsg, {parse_mode: 'Markdown'});
            break;
            
        case 'about_bot':
            const aboutMsg = `ℹ️ *معلومات عن البوت:*\n\n🤖 *المطور:* @${ADMIN_USER}\n🔒 *الهدف:* حماية خصوصية المستخدمين\n⚡ *المميزات:*\n• يعمل 24/7\n• واجهة تحكم للمسؤول\n• تحديث فوري للإعدادات\n• سرفر خاص على Glitch`;
            bot.sendMessage(chatId, aboutMsg, {parse_mode: 'Markdown'});
            break;
    }
});

// 💬 رد على رسائل المستخدمين
bot.on('message', (msg) => {
    if (msg.text && !msg.text.startsWith('/')) {
        const response = `📨 *شكراً على رسالتك!*\n\nلحماية خصوصيتك، يرجى استخدام:\n📢 *المجموعة* للأسئلة العامة\n📨 *القناة* للتواصل الخاص\n\n🔒 *لماذا؟*\nهذا يحمي معلوماتك الشخصية من الظهور للعامة`;
        
        bot.sendMessage(msg.chat.id, response, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{text: '📢 المجموعة', url: botSettings.group}],
                    [{text: '📨 القناة', url: botSettings.channel}]
                ]
            }
        });
    }
});

// 📞 أمر /contact
bot.onText(/\/contact/, (msg) => {
    const contactMsg = `📞 *معلومات التواصل:*\n\n📢 المجموعة: ${botSettings.group}\n📨 القناة: ${botSettings.channel}\n👤 المالك: @${ADMIN_USER}\n🌐 السرفر: https://${process.env.PROJECT_DOMAIN}.glitch.me`;
    
    bot.sendMessage(msg.chat.id, contactMsg, {parse_mode: 'Markdown'});
});

// ℹ️ أمر /help
bot.onText(/\/help/, (msg) => {
    const helpMsg = `🆘 *مركز المساعدة:*\n\n🔸 *للمستخدمين:*\n- /start ← بدء البوت\n- /contact ← طرق التواصل\n- /help ← هذه الرسالة\n\n🔸 *للمسؤول @${ADMIN_USER}:*\n- لوحة تحكم كاملة\n- تغيير الإعدادات فورياً\n- عرض حالة السرفر`;
    
    bot.sendMessage(msg.chat.id, helpMsg, {parse_mode: 'Markdown'});
});

// ❌ معالجة الأخطاء
bot.on('polling_error', (error) => {
    console.log('⚠️ خطأ في البوت:', error.message);
});

console.log('\n✅ =================================');
console.log('🤖 بوت MESALAK_LIAM يعمل بنجاح!');
console.log('👑 المسؤول: @MESALAK_LIAM');
console.log('🌐 رابط البوت: https://t.me/8519289824_bot');
console.log('🔗 رابط السرفر: https://' + process.env.PROJECT_DOMAIN + '.glitch.me');
console.log('⚡ يعمل 24/7 على Glitch.com');
console.log('✅ =================================\n');
