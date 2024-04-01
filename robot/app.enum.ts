const messageStart =
  "سلام 😉🖐🏻 !!\nبه ربات دستیار پلاک خوان دانشگاه قم 💀 خوش آمدید.";

const messageHelp =
  "🤖 راهنمای دستورات کامند 🤖\n\n" +
  `☑️ شروع کار با ربات:\n/start\n\n` +
  `☑️ گرفتن راهنمای دستورات:\n/help\n\n` +
  `☑️ احراز هویت:\n/auth\n\n` +
  `☑️ گرفتن راهنمای دستورات کاربر:\n/user_help`;

const messageUserHelp =
  "🤖 راهنمای دستورات کامند کاربر 🤖\n\n" +
  `☑️ درخواست ثبت پلاک:\n/add_pelak PASS TOKEN TYPE NN-W-NNN-NN\n\n` +
  `🛞 نوع وسیله(TYPE):\n🏍 motor - 🚗 car\n\n` +
  `☑️ حذف پلاک:\n/delete_pelak PASS TOKEN NN-W-NNN-NN\n\n` +
  `☑️ پلاک های در صف تایید:\n/n_conf_pelak PASS TOKEN\n\n` +
  `☑️ پلاک های ثبت شده:\n/get_pelaks PASS TOKEN\n\n`;

const messageAuth =
  "🤖 راهنمای دستورات احراز هویت 🤖\n\n" +
  `⚠️ ابتدا کد یکبار مصرف را دریافت کنید و در قسمت OTP قرار بدهید. ⚠️\n` +
  `⚠️ توجه داشته باشید کد هر ۵ دقیقه یکبار قابل ارسال می باشد. ⚠️\n` +
  `⚠️ کد پس از ۲ دقیقه منقضی می شود. ⚠️\n\n` +
  `☑️ دریافت کد یکبار مصرف:\n/otp_sms 09XXXXXXXXX\n\n` +
  `☑️ ثبت نام:\n/sign_up 09XXXXXXXXX OTP PASSWORD\n\n` +
  `☑️ فراموشی توکن:\n/forgot_token 09XXXXXXXXX OTP\n\n` +
  `☑️ فراموشی رمز:\n/forgot_password 09XXXXXXXXX OTP NEW_PASSWORD`;

const messageAdmin =
  "🤖 راهنمای دستورات کامند ادمین 🤖\n\n" +
  `☑️ شروع کار با ربات:\n/request_pelak_list\n\n` +
  `☑️ شروع کار با ربات:\n/add_camera\n\n` +
  `☑️ شروع کار با ربات:\n/delete_camera\n\n` +
  `☑️ لیست دوربین:\n/cameras_list`;

export enum EAppMessage {
  start = messageStart,
  help = messageHelp,
  auth = messageAuth,
  user_help = messageUserHelp,
  admin_help = messageAdmin,
}

export enum EAppCommand {
  start = "start",
  help = "help",
  auth = "auth",
  user_help = "user_help",
  admin_help = "admin_help",
}
