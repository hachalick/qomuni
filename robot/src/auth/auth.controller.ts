import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { EAuthCommand, EAuthMessage } from "./auth.enum";

// auth
export class AuthController {
  private robot: Telegraf<Context<Update>>;

  constructor(bot: Telegraf<Context<Update>>) {
    this.robot = bot;
    this.sign_up();
    this.otp_sms();
    this.forgot_token();
    this.forgot_password();
  }

  otp_sms() {
    this.robot.command(EAuthCommand.otp_sms, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("شماره تلفن وارد نشده!");
      } else {
        ctx.reply(EAuthMessage.otp_sms);
      }
    });
  }

  sign_up() {
    this.robot.command(EAuthCommand.sign_up, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("شماره تلفن وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("کد یکبار مصرف وارد نشده!");
      } else if (!message[3]) {
        ctx.reply("رمز عبور وارد نشد!");
      } else {
        ctx.reply(EAuthMessage.sign_up);
      }
    });
  }

  forgot_token() {
    this.robot.command(EAuthCommand.forgot_token, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("شماره تلفن وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("کد یکبار مصرف وارد نشده!");
      } else {
        ctx.reply(EAuthMessage.forgot_token);
      }
    });
  }

  forgot_password() {
    this.robot.command(EAuthCommand.forgot_password, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("شماره تلفن وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("کد یکبار مصرف وارد نشده!");
      } else if (!message[3]) {
        ctx.reply("پسورد جدید وجود ندارد!");
      } else {
        ctx.reply(EAuthMessage.forgot_password);
      }
    });
  }
}
