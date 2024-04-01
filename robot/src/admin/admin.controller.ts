import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

// auth
export class AdminController {
  private robot: Telegraf<Context<Update>>;

  constructor(bot: Telegraf<Context<Update>>) {
    this.robot = bot;
  }
}
