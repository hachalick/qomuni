const messageAddPelak = "پلاک وارد شده در صف تایید قرار گرفت.";
const messageDeletePelak = "پلاک وارد شده حذف شد.";

export enum EUsersMessage {
  add_pelak = messageAddPelak,
  delete_pelak = messageDeletePelak,
}

export enum EUsersCommand {
  get_pelaks = "get_pelaks",
  add_pelak = "add_pelak",
  delete_pelak = "delete_pelak",
  non_confirmed_pelak = "n_conf_pelak",
}
