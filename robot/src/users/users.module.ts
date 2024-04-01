import { Context, Telegraf } from "telegraf";
import { UserController } from "./user.controller";
import { Update } from "telegraf/typings/core/types/typegram";

export class UserModule {
  constructor(bot: Telegraf<Context<Update>>) {
    new UserController(bot);
  }
}
