const num = '0123456789';
export function createOtp(length: number) {
  const otp = [];
  for (let i = 0; i < length; i++) {
    otp.push(num[Math.floor(Math.random() * 10)]);
  }
  return otp.join('');
}
