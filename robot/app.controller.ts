import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { EAppCommand, EAppMessage } from "./app.enum";

export class AppController {
  private robot: Telegraf<Context<Update>>;

  constructor(bot: Telegraf<Context<Update>>) {
    this.robot = bot;
    this.start();
    this.help();
    this.auth();
    this.userHelp();
    this.adminHelp();
  }

  private start() {
    this.robot.command(EAppCommand.start, (ctx) => {
      ctx.reply(EAppMessage.start);
      ctx.reply(EAppMessage.help);
    });
  }

  private help() {
    this.robot.command(EAppCommand.help, (ctx) => {
      ctx.reply(EAppMessage.help);
    });
  }

  private userHelp() {
    this.robot.command(EAppCommand.user_help, (ctx) => {
      ctx.reply(EAppMessage.user_help);
    });
  }

  private auth() {
    this.robot.command(EAppCommand.auth, (ctx) => {
      ctx.reply(EAppMessage.auth);
    });
  }

  private adminHelp() {
    this.robot.command(EAppCommand.admin_help, (ctx) => {
      ctx.reply(EAppMessage.admin_help);
    });
  }
}
