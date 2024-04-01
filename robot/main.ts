import { Telegraf } from "telegraf";
import { ConfigEnv } from "./src/modules/utils/env/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const token = new ConfigEnv("TOKEN_ROBOT_TELEGRAM").key;
  const bot = new Telegraf(token);
  new AppModule(bot);
}

bootstrap();
