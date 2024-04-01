import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { AdminController } from "./admin.controller";

export class AdminModule {
  constructor(bot: Telegraf<Context<Update>>) {
    new AdminController(bot);
  }
}
