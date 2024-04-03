export function callBackListener(port) {
  console.log('\x1b[36m');
  console.log('powered by nestjs 😏🍾');
  console.log('programmers 👨 H.j 👩 Sh.j');
  console.log(
    '\x1b[35m',
    '\rswagger rout =>',
    '\x1b[34m',
    `http://localhost:${port}/api/swagger`,
  );
  console.log(
    '\x1b[35m',
    '\rapi rout =>',
    '\x1b[34m',
    `http://localhost:${port}`,
  );
  console.log('\x1b[0m');
}
