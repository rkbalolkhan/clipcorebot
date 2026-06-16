const User = require('../models/User');

const DEFAULT_LANGUAGE = 'en';

const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  zh: '中文',
  ur: 'اردو',
  ar: 'العربية',
  fa: 'فارسی',
  ta: 'தமிழ்',
  te: 'తెలుగు',
};

const translations = {
  en: {
    startWelcome: `🎬 *Welcome to ClipCoreBot*

Your all-in-one media assistant.

━━━━━━━━━━━━━━

✨ *Supported Platforms*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 Conversion

━━━━━━━━━━━━━━

🚀 *How to Use*

• Send a video link
• I\'ll process it automatically
• Download your media instantly

━━━━━━━━━━━━━━

📌 *Commands*

/start — Start bot
/help — Help menu
/mp3 — Convert videos to MP3
/ping — Check status
/version — Bot version
/language — Change language

━━━━━━━━━━━━━━

❤️ Thanks for using *ClipCoreBot*`,
    helpCaption: `📚 *ClipCoreBot Help*

Supported Platforms:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

Commands:

/start - Start bot
/help - Show help
/mp3 - Convert to audio
/ping - Check bot status
/version - Bot version
/language - Change language

Just paste a link to begin 🚀`,
    mp3ModeCaption: `🎵 *MP3 Conversion Mode Enabled*

Send:

• A video file
OR
• A supported media link

I\'ll convert it into MP3 automatically.`,
    pingResponse: `🏓 Pong!

🟢 Status: Online
⚡ Response: OK`,
    versionResponse: `🤖 ClipCoreBot

Version: v1.0.0
Environment: Production`,
    invalidLink: `❌ Unsupported link.

Currently supported:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

Use /help for more information.`,
    processingStart: `⏳ Processing your request...

🔍 Detecting platform...
📥 Downloading media...`,
    processingUpdate: `⏳ Processing your request...

✅ Platform detected
✅ Download completed
📤 Uploading file...`,
    downloadSuccessCaption: `✅ Download completed successfully!

Enjoy your media ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ Could not download the video. Please try again.`,
    fileTooLarge: `❌ File is too large to upload to Telegram. Try a smaller video or request MP3 conversion.`,
    languagePrompt: `🌐 Choose your language:`,
    languageSet: `✅ Language set to *{{language}}*.

Use /help to see translated help text.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  es: {
    startWelcome: `🎬 *Bienvenido a ClipCoreBot*

Tu asistente multimedia todo en uno.

━━━━━━━━━━━━━━

✨ *Plataformas compatibles*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ Conversión a MP3

━━━━━━━━━━━━━━

🚀 *Cómo usar*

• Envía un enlace de video
• Lo procesaré automáticamente
• Descarga tu contenido al instante

━━━━━━━━━━━━━━

📌 *Comandos*

/start — Iniciar bot
/help — Menú de ayuda
/mp3 — Convertir videos a MP3
/ping — Comprobar estado
/version — Versión del bot
/language — Cambiar idioma

━━━━━━━━━━━━━━

❤️ Gracias por usar *ClipCoreBot*`,
    helpCaption: `📚 *Ayuda de ClipCoreBot*

Plataformas compatibles:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

Comandos:

/start - Iniciar bot
/help - Mostrar ayuda
/mp3 - Convertir a audio
/ping - Comprobar estado
/version - Versión del bot
/language - Cambiar idioma

Pega un enlace para comenzar 🚀`,
    mp3ModeCaption: `🎵 *Modo de conversión a MP3 activado*

Envía:

• Un archivo de video
O
• Un enlace de medios compatible

Lo convertiré automáticamente a MP3.`,
    pingResponse: `🏓 ¡Pong!

🟢 Estado: En línea
⚡ Respuesta: OK`,
    versionResponse: `🤖 ClipCoreBot

Versión: v1.0.0
Entorno: Producción`,
    invalidLink: `❌ Enlace no compatible.

Actualmente compatibles:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

Usa /help para más información.`,
    processingStart: `⏳ Procesando tu solicitud...

🔍 Detectando plataforma...
📥 Descargando medios...`,
    processingUpdate: `⏳ Procesando tu solicitud...

✅ Plataforma detectada
✅ Descarga completada
📤 Subiendo archivo...`,
    downloadSuccessCaption: `✅ ¡Descarga completada con éxito!

Disfruta tu contenido ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ No se pudo descargar el video. Por favor intenta de nuevo.`,
    languagePrompt: `🌐 Elige tu idioma:`,
    languageSet: `✅ Idioma establecido a *{{language}}*.

Usa /help para ver el texto traducido.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  hi: {
    startWelcome: `🎬 *ClipCoreBot में आपका स्वागत है*

आपका ऑल-इन-वन मीडिया असिस्टेंट।

━━━━━━━━━━━━━━

✨ *समर्थित प्लेटफ़ॉर्म*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 कन्वर्शन

━━━━━━━━━━━━━━

🚀 *कैसे उपयोग करें*

• कोई वीडियो लिंक भेजें
• मैं इसे स्वचालित रूप से प्रोसेस करूंगा
• अपना मीडिया सीधे डाउनलोड करें

━━━━━━━━━━━━━━

📌 *कमान्ड्स*

/start — बॉट शुरू करें
/help — मदद दिखाएँ
/mp3 — MP3 में कन्वर्ट करें
/ping — स्थिति जांचें
/version — बॉट संस्करण
/language — भाषा बदलें

━━━━━━━━━━━━━━

❤️ ClipCoreBot का उपयोग करने के लिए धन्यवाद`,
    helpCaption: `📚 *ClipCoreBot सहायता*

समर्थित प्लेटफ़ॉर्म:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

कमान्ड्स:

/start - बॉट शुरू करें
/help - मदद दिखाएँ
/mp3 - ऑडियो में कन्वर्ट करें
/ping - स्थिति जांचें
/version - बॉट संस्करण
/language - भाषा बदलें

प्रारंभ करने के लिए बस एक लिंक पेस्ट करें 🚀`,
    mp3ModeCaption: `🎵 *MP3 कन्वर्शन मोड सक्रिय*

भेजें:

• एक वीडियो फ़ाइल
या
• एक समर्थित मीडिया लिंक

मैं इसे स्वचालित रूप से MP3 में बदल दूंगा।`,
    pingResponse: `🏓 पोंग!

🟢 स्थिति: ऑनलाइन
⚡ प्रतिक्रिया: OK`,
    versionResponse: `🤖 ClipCoreBot

संस्करण: v1.0.0
पर्यावरण: उत्पादन`,
    invalidLink: `❌ असमर्थ लिंक।

वर्तमान में समर्थित:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

अधिक जानकारी के लिए /help का उपयोग करें।`,
    processingStart: `⏳ आपकी अनुरोध संसाधित की जा रही है...

🔍 प्लेटफ़ॉर्म की पहचान हो रही है...
📥 मीडिया डाउनलोड किया जा रहा है...`,
    processingUpdate: `⏳ आपकी अनुरोध संसाधित की जा रही है...

✅ प्लेटफ़ॉर्म मिल गया
✅ डाउनलोड पूरा हुआ
📤 फ़ाइल अपलोड की जा रही है...`,
    downloadSuccessCaption: `✅ डाउनलोड सफलतापूर्वक पूरा हुआ!

अपने मीडिया का आनंद लें ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ वीडियो डाउनलोड नहीं किया जा सका। कृपया पुन: प्रयास करें।`,
    languagePrompt: `🌐 अपनी भाषा चुनें:`,
    languageSet: `✅ भाषा *{{language}}* पर सेट की गई है।

अनुवादित सहायता देखने के लिए /help का उपयोग करें।`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  id: {
    startWelcome: `🎬 *Selamat datang di ClipCoreBot*

Asisten media serba bisa Anda.

━━━━━━━━━━━━━━

✨ *Platform yang Didukung*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ Konversi MP3

━━━━━━━━━━━━━━

🚀 *Cara Menggunakan*

• Kirim tautan video
• Saya akan memprosesnya otomatis
• Unduh media Anda langsung

━━━━━━━━━━━━━━

📌 *Perintah*

/start — Mulai bot
/help — Tampilkan bantuan
/mp3 — Konversi ke MP3
/ping — Periksa status
/version — Versi bot
/language — Ganti bahasa

━━━━━━━━━━━━━━

❤️ Terima kasih telah menggunakan *ClipCoreBot*`,
    helpCaption: `📚 *Bantuan ClipCoreBot*

Platform yang Didukung:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

Perintah:

/start - Mulai bot
/help - Tampilkan bantuan
/mp3 - Konversi ke audio
/ping - Periksa status
/version - Versi bot
/language - Ganti bahasa

Tempel tautan untuk memulai 🚀`,
    mp3ModeCaption: `🎵 *Mode Konversi MP3 Diaktifkan*

Kirim:

• File video
ATAU
• Tautan media yang didukung

Saya akan mengubahnya menjadi MP3 secara otomatis.`,
    pingResponse: `🏓 Pong!

🟢 Status: Online
⚡ Respon: OK`,
    versionResponse: `🤖 ClipCoreBot

Versi: v1.0.0
Lingkungan: Produksi`,
    invalidLink: `❌ Tautan tidak didukung.

Saat ini didukung:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

Gunakan /help untuk informasi lebih lanjut.`,
    processingStart: `⏳ Memproses permintaan Anda...

🔍 Mendeteksi platform...
📥 Mengunduh media...`,
    processingUpdate: `⏳ Memproses permintaan Anda...

✅ Platform terdeteksi
✅ Unduhan selesai
📤 Mengunggah file...`,
    downloadSuccessCaption: `✅ Unduhan berhasil diselesaikan!

Nikmati media Anda ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ Gagal mengunduh video. Silakan coba lagi.`,
    languagePrompt: `🌐 Pilih bahasa Anda:`,
    languageSet: `✅ Bahasa telah diatur ke *{{language}}*.

Gunakan /help untuk melihat bantuan terjemahan.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  ms: {
    startWelcome: `🎬 *Selamat datang di ClipCoreBot*

Pembantu media sehenti anda.

━━━━━━━━━━━━━━

✨ *Platform yang Disokong*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ Penukaran MP3

━━━━━━━━━━━━━━

🚀 *Cara Menggunakan*

• Hantar pautan video
• Saya akan memprosesnya secara automatik
• Muat turun media anda segera

━━━━━━━━━━━━━━

📌 *Arahan*

/start — Mula bot
/help — Tunjukkan bantuan
/mp3 — Tukar ke MP3
/ping — Semak status
/version — Versi bot
/language — Tukar bahasa

━━━━━━━━━━━━━━

❤️ Terima kasih kerana menggunakan *ClipCoreBot*`,
    helpCaption: `📚 *Bantuan ClipCoreBot*

Platform yang Disokong:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

Arahan:

/start - Mula bot
/help - Tunjukkan bantuan
/mp3 - Tukar ke audio
/ping - Semak status
/version - Versi bot
/language - Tukar bahasa

Tampal pautan untuk bermula 🚀`,
    mp3ModeCaption: `🎵 *Mod Penukaran MP3 Diaktifkan*

Hantar:

• Fail video
ATAU
• Pautan media yang disokong

Saya akan menukarnya menjadi MP3 secara automatik.`,
    pingResponse: `🏓 Pong!

🟢 Status: Dalam talian
⚡ Respons: OK`,
    versionResponse: `🤖 ClipCoreBot

Versi: v1.0.0
Persekitaran: Pengeluaran`,
    invalidLink: `❌ Pautan tidak disokong.

Kini disokong:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

Gunakan /help untuk maklumat lanjut.`,
    processingStart: `⏳ Memproses permintaan anda...

🔍 Mengesan platform...
📥 Memuat turun media...`,
    processingUpdate: `⏳ Memproses permintaan anda...

✅ Platform dikesan
✅ Muat turun selesai
📤 Memuat naik fail...`,
    downloadSuccessCaption: `✅ Muat turun berjaya diselesaikan!

Nikmati media anda ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ Gagal memuat turun video. Sila cuba lagi.`,
    languagePrompt: `🌐 Pilih bahasa anda:`,
    languageSet: `✅ Bahasa ditetapkan kepada *{{language}}*.

Gunakan /help untuk melihat bantuan terjemahan.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  zh: {
    startWelcome: `🎬 *欢迎使用 ClipCoreBot*

您的全能媒体助手。

━━━━━━━━━━━━━━

✨ *支持的平台*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 转换

━━━━━━━━━━━━━━

🚀 *使用方法*

• 发送视频链接
• 我会自动处理
• 立即下载您的媒体

━━━━━━━━━━━━━━

📌 *命令*

/start — 启动机器人
/help — 显示帮助
/mp3 — 转换为 MP3
/ping — 检查状态
/version — 机器人版本
/language — 更改语言

━━━━━━━━━━━━━━

❤️ 感谢使用 *ClipCoreBot*`,
    helpCaption: `📚 *ClipCoreBot 帮助*

支持的平台：

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

命令：

/start - 启动机器人
/help - 显示帮助
/mp3 - 转换为音频
/ping - 检查状态
/version - 机器人版本
/language - 更改语言

粘贴链接开始 🚀`,
    mp3ModeCaption: `🎵 *MP3 转换模式已启用*

发送：

• 一个视频文件
或者
• 一个支持的媒体链接

我会自动将其转换为 MP3。`,
    pingResponse: `🏓 Pong!

🟢 状态：在线
⚡ 响应：OK`,
    versionResponse: `🤖 ClipCoreBot

版本：v1.0.0
环境：生产`,
    invalidLink: `❌ 不支持的链接。

当前支持：

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

使用 /help 获取更多信息。`,
    processingStart: `⏳ 正在处理您的请求...

🔍 检测平台...
📥 正在下载媒体...`,
    processingUpdate: `⏳ 正在处理您的请求...

✅ 平台已检测
✅ 下载完成
📤 正在上传文件...`,
    downloadSuccessCaption: `✅ 下载成功完成！

享受您的媒体 ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ 无法下载视频。请再试一次。`,
    languagePrompt: `🌐 选择您的语言：`,
    languageSet: `✅ 语言已设置为 *{{language}}*。

使用 /help 查看翻译后的帮助文本。`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  ur: {
    startWelcome: `🎬 *ClipCoreBot میں خوش آمدید*

آپ کا آل ان ون میڈیا اسسٹنٹ۔

━━━━━━━━━━━━━━

✨ *مستقل پلیٹ فارمز*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 کنورژن

━━━━━━━━━━━━━━

🚀 *استعمال کا طریقہ*

• ایک ویڈیو لنک بھیجیں
• میں اسے خود بخود پروسیس کروں گا
• اپنا میڈیا فوری ڈاؤن لوڈ کریں

━━━━━━━━━━━━━━

📌 *کمانڈز*

/start — بوٹ شروع کریں
/help — مدد دکھائیں
/mp3 — MP3 میں تبدیل کریں
/ping — حالت چیک کریں
/version — بوٹ ورژن
/language — زبان تبدیل کریں

━━━━━━━━━━━━━━

❤️ ClipCoreBot استعمال کرنے کے لئے شکریہ`,
    helpCaption: `📚 *ClipCoreBot مدد*

مستقل پلیٹ فارمز:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

کمانڈز:

/start - بوٹ شروع کریں
/help - مدد دکھائیں
/mp3 - آڈیو میں تبدیل کریں
/ping - حالت چیک کریں
/version - بوٹ ورژن
/language - زبان تبدیل کریں

شروع کرنے کے لئے لنک پیسٹ کریں 🚀`,
    mp3ModeCaption: `🎵 *MP3 کنورژن موڈ فعال ہے*

بھیجیں:

• ایک ویڈیو فائل
یا
• ایک مستحکم میڈیا لنک

میں اسے خود بخود MP3 میں تبدیل کروں گا۔`,
    pingResponse: `🏓 پونگ!

🟢 حالت: آن لائن
⚡ جواب: OK`,
    versionResponse: `🤖 ClipCoreBot

ورژن: v1.0.0
ماحول: پیداواری`,
    invalidLink: `❌ غیر مددگار لنک۔

فی الحال مددگار:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

مزید معلومات کے لئے /help استعمال کریں۔`,
    processingStart: `⏳ آپ کی درخواست پر کارروائی ہو رہی ہے...

🔍 پلیٹ فارم کا پتہ لگایا جا رہا ہے...
📥 میڈیا ڈاؤن لوڈ کیا جا رہا ہے...`,
    processingUpdate: `⏳ آپ کی درخواست پر کارروائی ہو رہی ہے...

✅ پلیٹ فارم ملا
✅ ڈاؤن لوڈ مکمل ہوا
📤 فائل اپ لوڈ کی جا رہی ہے...`,
    downloadSuccessCaption: `✅ ڈاؤن لوڈ کامیابی کے ساتھ مکمل ہوا!

اپنے میڈیا کا لطف اٹھائیں ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ ویڈیو ڈاؤن لوڈ نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔`,
    languagePrompt: `🌐 اپنی زبان منتخب کریں:`,
    languageSet: `✅ زبان *{{language}}* پر سیٹ کر دی گئی ہے۔

ترجمہ شدہ /help دیکھنے کے لئے استعمال کریں۔`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  ar: {
    startWelcome: `🎬 *مرحبًا بك في ClipCoreBot*

مساعد الوسائط الشامل الخاص بك.

━━━━━━━━━━━━━━

✨ *المنصات المدعومة*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ تحويل MP3

━━━━━━━━━━━━━━

🚀 *كيفية الاستخدام*

• أرسل رابط فيديو
• سأعالجه تلقائيًا
• قم بتنزيل الوسائط الخاصة بك على الفور

━━━━━━━━━━━━━━

📌 *الأوامر*

/start — بدء البوت
/help — عرض المساعدة
/mp3 — تحويل إلى MP3
/ping — التحقق من الحالة
/version — إصدار البوت
/language — تغيير اللغة

━━━━━━━━━━━━━━

❤️ شكرًا لاستخدامك *ClipCoreBot*`,
    helpCaption: `📚 *مساعدة ClipCoreBot*

المنصات المدعومة:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

الأوامر:

/start - بدء البوت
/help - عرض المساعدة
/mp3 - تحويل إلى صوت
/ping - التحقق من الحالة
/version - إصدار البوت
/language - تغيير اللغة

قم بلصق الرابط للبدء 🚀`,
    mp3ModeCaption: `🎵 *تم تفعيل وضع تحويل MP3*

أرسل:

• ملف فيديو
أو
• رابط وسائط مدعوم

سأقوم بتحويله إلى MP3 تلقائيًا.`,
    pingResponse: `🏓 بونج!

🟢 الحالة: متصل
⚡ الاستجابة: OK`,
    versionResponse: `🤖 ClipCoreBot

الإصدار: v1.0.0
البيئة: الإنتاج`,
    invalidLink: `❌ رابط غير مدعوم.

المدعومة حاليًا:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

استخدم /help لمزيد من المعلومات.`,
    processingStart: `⏳ جاري معالجة طلبك...

🔍 اكتشاف المنصة...
📥 جاري تنزيل الوسائط...`,
    processingUpdate: `⏳ جاري معالجة طلبك...

✅ تم اكتشاف المنصة
✅ تم اكتمال التنزيل
📤 جاري رفع الملف...`,
    downloadSuccessCaption: `✅ تم اكتمال التنزيل بنجاح!

استمتع بمحتواك ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ لم يتمكن من تنزيل الفيديو. يرجى المحاولة مرة أخرى.`,
    languagePrompt: `🌐 اختر لغتك:`,
    languageSet: `✅ تم تعيين اللغة إلى *{{language}}*.

استخدم /help لعرض النص المترجم.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  fa: {
    startWelcome: `🎬 *به ClipCoreBot خوش آمدید*

دستیار رسانه‌ای همه‌کاره شما.

━━━━━━━━━━━━━━

✨ *پلتفرم‌های پشتیبانی‌شده*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ تبدیل MP3

━━━━━━━━━━━━━━

🚀 *نحوه استفاده*

• یک لینک ویدیو ارسال کنید
• من آن را به‌صورت خودکار پردازش می‌کنم
• رسانه خود را بلافاصله دانلود کنید

━━━━━━━━━━━━━━

📌 *دستورات*

/start — شروع بوت
/help — نمایش راهنما
/mp3 — تبدیل به MP3
/ping — بررسی وضعیت
/version — نسخه بوت
/language — تغییر زبان

━━━━━━━━━━━━━━

❤️ از استفاده از *ClipCoreBot* متشکریم`,
    helpCaption: `📚 *راهنمای ClipCoreBot*

پلتفرم‌های پشتیبانی‌شده:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

دستورات:

/start - شروع بوت
/help - نمایش راهنما
/mp3 - تبدیل به صدا
/ping - بررسی وضعیت
/version - نسخه بوت
/language - تغییر زبان

برای شروع یک لینک بچسبانید 🚀`,
    mp3ModeCaption: `🎵 *حالت تبدیل MP3 فعال شد*

ارسال کنید:

• یک فایل ویدیو
یا
• یک لینک رسانه‌ای پشتیبانی‌شده

من آن را به‌صورت خودکار به MP3 تبدیل می‌کنم.`,
    pingResponse: `🏓 پونگ!

🟢 وضعیت: آنلاین
⚡ پاسخ: OK`,
    versionResponse: `🤖 ClipCoreBot

نسخه: v1.0.0
محیط: تولید`,
    invalidLink: `❌ لینک پشتیبانی نشده.

در حال حاضر پشتیبانی می‌شود:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

برای اطلاعات بیشتر از /help استفاده کنید.`,
    processingStart: `⏳ در حال پردازش درخواست شما...

🔍 شناسایی پلتفرم...
📥 در حال بارگیری رسانه...`,
    processingUpdate: `⏳ در حال پردازش درخواست شما...

✅ پلتفرم شناسایی شد
✅ بارگیری کامل شد
📤 در حال بارگذاری فایل...`,
    downloadSuccessCaption: `✅ دانلود با موفقیت تکمیل شد!

از رسانه خود لذت ببرید ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ دانلود ویدیو ممکن نبود. لطفاً دوباره تلاش کنید.`,
    languagePrompt: `🌐 زبان خود را انتخاب کنید:`,
    languageSet: `✅ زبان به *{{language}}* تنظیم شد.

برای دیدن راهنمای ترجمه شده از /help استفاده کنید.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  ta: {
    startWelcome: `🎬 *ClipCoreBot இல் உங்கள் வரவேற்கப்படுகிறார்கள்*

உங்கள் ஒற்றை சேவையைக் கொண்ட ஊடக உதவியாளர்.

━━━━━━━━━━━━━━

✨ *ஆதரிக்கப்பட்ட தளங்கள்*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 மாற்றம்

━━━━━━━━━━━━━━

🚀 *பயன்படுத்துவது எப்படி*

• வீடியோ இணைப்பை அனுப்பு
• நான் அதை தானாக செயலாக்குவேன்
• உங்கள் ஊடகத்தை உடனுக்குடன் பதிவிறக்கவும்

━━━━━━━━━━━━━━

📌 *கமாண்டுகள்*

/start — பாட்டைத் துவங்கவும்
/help — உதவியை காண்பிக்க
/mp3 — MP3 க்காக மாற்றவும்
/ping — நிலையை சரிபார்க்க
/version — பாட்டின் பதிப்பு
/language — மொழியை மாற்றவும்

━━━━━━━━━━━━━━

❤️ ClipCoreBot ஐ பயன்படுத்தியதற்கு நன்றி`,
    helpCaption: `📚 *ClipCoreBot உதவி*

ஆதரிக்கப்பட்ட தளங்கள்:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

கமாண்டுகள்:

/start - பாட்டைத் துவங்கவும்
/help - உதவியை காண்பிக்க
/mp3 - ஒலிக்கும் மாற்றம்
/ping - நிலையை சரிபார்க்க
/version - பாட்டின் பதிப்பு
/language - மொழியை மாற்றவும்

தொடங்க இணைப்பை ஒட்டவும் 🚀`,
    mp3ModeCaption: `🎵 *MP3 மாற்றி பயன்முறை செயலில் உள்ளது*

அனுப்பவும்:

• ஒரு வீடியோ கோப்பு
அல்லது
• ஆதரிக்கப்படும் ஊடக இணைப்பு

நான் இதனை தானாக MP3 ஆக மாற்றுவேன்.`,
    pingResponse: `🏓 பாங்!

🟢 நிலை: ஆன்லைன்
⚡ பதில்: OK`,
    versionResponse: `🤖 ClipCoreBot

பதிப்பு: v1.0.0
சுற்றுச்சூழல்: உற்பத்தி`,
    invalidLink: `❌ ஆதரிக்கப்படாத இணைப்பு.

தற்போது ஆதரிக்கப்படுகிறது:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

மேலும் தகவலுக்கு /help ஐப் பயன்படுத்தவும்.`,
    processingStart: `⏳ உங்கள் கோரிக்கையை செயலாக்குகிறேன்...

🔍 தளத்தை கண்டறிகிறது...
📥 ஊடகத்தை பதிவிறக்குகிறது...`,
    processingUpdate: `⏳ உங்கள் கோரிக்கையை செயலாக்குகிறேன்...

✅ தளம் கண்டறிக்கப்பட்டது
✅ பதிவிறக்கம் முடிந்தது
📤 கோப்பை பதிவேற்றுகிறது...`,
    downloadSuccessCaption: `✅ பதிவிறக்கம் வெற்றிகரமாக முடிந்தது!

உங்கள் ஊடகத்தை அனுபவிக்கவும் ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ வீடியோ பதிவிறக்கம் முடியவில்லை. மீண்டும் முயற்சிக்கவும்.`,
    languagePrompt: `🌐 உங்கள் மொழியை தேர்ந்தெடுக்கவும்:`,
    languageSet: `✅ மொழி *{{language}}* ஆக அமைக்கப்பட்டது.

மொழிபெயர்க்கப்பட்ட உதவியை காண /help ஐ பயன்படுத்தவும்.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
  te: {
    startWelcome: `🎬 *ClipCoreBot కు స్వాగతం*

మీ సమగ్ర మీడియా సహాయకుడు.

━━━━━━━━━━━━━━

✨ *మద్దతు పొందే ప్లాట్‌ఫారమ్‌లు*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 మార్పిడి

━━━━━━━━━━━━━━

🚀 *ఉపయోగించే విధానం*

• ఒక వీడియో లింక్‌ను పంపండి
• నేను దానిని స్వయంచాలకంగా ప్రాసెస్ చేస్తాను
• మీ మీడియాను తక్షణమే డౌన్లోడ్ చేయండి

━━━━━━━━━━━━━━

📌 *ఆదేశాలు*

/start — బాట్ ప్రారంభించండి
/help — సహాయం చూపిస్తుంది
/mp3 — MP3 గా మార్చి
/ping — స్థితిని తనిఖీ చేయండి
/version — బాట్ వెర్షన్
/language — భాష మార్చండి

━━━━━━━━━━━━━━

❤️ ClipCoreBot ను ఉపయోగించినందుకు ధన్యవాదాలు`,
    helpCaption: `📚 *ClipCoreBot సహాయం*

మద్దతు పొందే ప్లాట్‌ఫారమ్‌లు:

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube

ఆదేశాలు:

/start - బాట్ ప్రారంభించండి
/help - సహాయం చూపిస్తుంది
/mp3 - ఆడియోకు మార్చు
/ping - స్థితిని తనిఖీ చేయండి
/version - బాట్ వెర్షన్
/language - భాష మార్చండి

ప్రారంభించడానికి లింక్‌ను పేస్ట్ చేయండి 🚀`,
    mp3ModeCaption: `🎵 *MP3 మార్చడం మోడ్ ప్రారంభించబడింది*

పంపండి:

• ఒక వీడియో ఫైల్
లేదా
• మద్దతు ఉన్న మీడియా లింక్

నేను దాన్ని స్వయంచాలకంగా MP3 గా మార్చేస్తాను.`,
    pingResponse: `🏓 పోంగ్!

🟢 స్థితి: ఆన్‌లైన్
⚡ ప్రతిస్పందన: OK`,
    versionResponse: `🤖 ClipCoreBot

వెర్షన్: v1.0.0
పరిసరానికి: ఉత్పత్తి`,
    invalidLink: `❌ మద్దతు లేని లింక్.

ప్రస్తుతం మద్దతు పొందింది:

• Instagram
• TikTok
• Facebook
• X / Twitter
• YouTube

మరింత సమాచారం కోసం /help ఉపయోగించండి.`,
    processingStart: `⏳ మీ అభ్యర్థనను ప్రాసెస్ చేయబడుతోంది...

🔍 ప్లాట్‌ఫారమ్‌ను గుర్తిస్తున్నారు...
📥 మీడియాను డౌన్లోడ్ చేస్తోంది...`,
    processingUpdate: `⏳ మీ అభ్యర్థనను ప్రాసెస్ చేయబడుతోంది...

✅ ప్లాట్‌ఫామ్ గుర్తించబడింది
✅ డౌన్లోడ్ పూర్తయింది
📤 ఫైల్‌ను అప్లోడ్ చేస్తున్నారు...`,
    downloadSuccessCaption: `✅ డౌన్లోడ్ విజయవంతంగా పూర్తయింది!

మీ మీడియాను ఆస్వాదించండి ❤️
Powered by ClipCoreBot`,
    downloadFailed: `❌ వీడియోని డౌన్‌లోడ్ చేయలేకపోయింది. దయచేసి మళ్లీ ప్రయత్నించండి.`,
    languagePrompt: `🌐 మీ భాషను ఎంచుకోండి:`,
    languageSet: `✅ భాష *{{language}}* గా సెట్ చేయబడింది.

అనువాద సహాయాన్ని చూడడానికి /help ఉపయోగించండి.`,
    languageButtonEnglish: 'English',
    languageButtonSpanish: 'Español',
  },
};

const getLanguageData = (language) => translations[language] || translations[DEFAULT_LANGUAGE];

const t = (language, key, data = {}) => {
  const message = getLanguageData(language)[key] || getLanguageData(DEFAULT_LANGUAGE)[key] || '';
  return Object.keys(data).reduce((text, placeholder) => text.replace(new RegExp(`{{${placeholder}}}`, 'g'), data[placeholder]), message);
};

const getPreferredLanguage = async (telegramId) => {
  if (!telegramId) {
    return DEFAULT_LANGUAGE;
  }

  const user = await User.findOne({ telegramId });
  return user?.language || DEFAULT_LANGUAGE;
};

const setPreferredLanguage = async (telegramId, language) => {
  if (!SUPPORTED_LANGUAGES[language]) {
    return DEFAULT_LANGUAGE;
  }

  await User.updateOne({ telegramId }, { $set: { language } }, { upsert: true });
  return language;
};

module.exports = {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  t,
  getPreferredLanguage,
  setPreferredLanguage,
};
