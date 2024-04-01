import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { EUsersMessage, EUsersCommand } from "./user.enum";

// user_help
export class UserController {
  private robot: Telegraf<Context<Update>>;

  constructor(bot: Telegraf<Context<Update>>) {
    this.robot = bot;
    this.listPelak();
    this.addPelak();
    this.deletePelak();
    this.listNonConfPelak();
  }

  private listNonConfPelak() {
    this.robot.command(EUsersCommand.non_confirmed_pelak, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("رمز عبور وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("توکن وارد نشده!");
      } else {
        // const list = find()
        const list = [
          { pelak: "12-د-123-44", type: "car" },
          { pelak: "12-د-123-55", type: "truck" },
          { pelak: "12-د-123-66", type: "motor" },
        ]; // fake list
        const len = list.length;
        list.forEach((pelak, i) => {
          i++;
          ctx.reply(
            `شماره: (${i}/${len})\nپلاک : ${pelak.pelak}ایران\nنوع وسیله: ${
              pelak.type || "نامشخص"
            }`
          );
        });
      }
    });
  }

  private listPelak() {
    this.robot.command(EUsersCommand.get_pelaks, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("رمز عبور وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("توکن وارد نشده!");
      } else {
        // const list = find()
        const list = [
          { pelak: "12-د-123-44", type: "car" },
          { pelak: "12-د-123-55", type: "truck" },
          { pelak: "12-د-123-66", type: "motor" },
        ]; // fake list
        const len = list.length;
        list.forEach((pelak, i) => {
          i++;
          ctx.reply(
            `شماره: (${i}/${len})\nپلاک : ${pelak.pelak}ایران\nنوع وسیله: ${
              pelak.type || "نامشخص"
            }`
          );
        });
      }
    });
  }

  private addPelak() {
    this.robot.command(EUsersCommand.add_pelak, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("رمز عبور وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("توکن وارد نشده!");
      } else if (!message[3]) {
        ctx.reply("نوع وسیله وارد نشده!");
      } else if (!message[4]) {
        ctx.reply("پلاک وارد نشده!");
      } else {
        ctx.reply(EUsersMessage.add_pelak);
      }
    });
  }

  private deletePelak() {
    this.robot.command(EUsersCommand.delete_pelak, (ctx) => {
      const message = ctx.message.text.split(" ");
      if (!message[1]) {
        ctx.reply("رمز عبور وارد نشده!");
      } else if (!message[2]) {
        ctx.reply("توکن وارد نشده!");
      } else if (!message[3]) {
        ctx.reply("پلاک وارد نشده!");
      } else {
        ctx.reply(EUsersMessage.delete_pelak);
      }
    });
  }
}
