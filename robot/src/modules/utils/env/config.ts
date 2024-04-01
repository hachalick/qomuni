type keyEnv = "TOKEN_ROBOT_TELEGRAM";

const env: { [key in keyEnv]: string } = {
  TOKEN_ROBOT_TELEGRAM: "YOUR_TOKEN",
};

class ConfigEnv {
  private valEnv: string;

  constructor(keyEnv: keyEnv) {
    this.valEnv = env[keyEnv];
  }

  get key() {
    return this.valEnv;
  }
}
export { ConfigEnv };
