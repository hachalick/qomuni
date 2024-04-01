import { Context, Telegraf } from "telegraf";
import { UserModule } from "./src/users/users.module";
import { Update } from "telegraf/typings/core/types/typegram";
import { AppController } from "./app.controller";
import { AuthModule } from "./src/auth/auth.module";

export class AppModule {
  constructor(bot: Telegraf<Context<Update>>) {
    new AppController(bot);
    new UserModule(bot);
    new AuthModule(bot);
    bot.launch();
  }
}
