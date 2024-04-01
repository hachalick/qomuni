import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { AuthController } from "./auth.controller";

export class AuthModule {
  constructor(bot: Telegraf<Context<Update>>) {
    new AuthController(bot);
  }
}
