const messageOtpSms = "کد یکبار مصرف ارسال شد.";
const messageSignUp = "شما ثبت نام شدید.";
const messageForgotToken = "توکن ارسال شد.";
const messageForgotPass = "رمز عبور تغییر کرد.";

export enum EAuthMessage {
  otp_sms = messageOtpSms,
  sign_up = messageSignUp,
  forgot_token = messageForgotToken,
  forgot_password = messageForgotPass,
}

export enum EAuthCommand {
  otp_sms = "otp_sms",
  sign_up = "sign_up",
  forgot_token = "forgot_token",
  forgot_password = "forgot_password",
}
