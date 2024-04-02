import { execSync } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { EUrlOcr } from '../common/enum/url.enum';
const axios = require('axios').default;
const io = require('socket.io-client');

const socket = io('http://127.0.0.1:8080');

async function readImage(filePath: string): Promise<Buffer> {
  try {
    const imageBuffer = await readFile(filePath);
    return imageBuffer;
  } catch (error) {
    console.error('Error reading image file:', error);
    throw error;
  }
}
process.on(
  'message',
  async ({
    id,
    pathFile,
    url,
  }: {
    id: number;
    pathFile: string;
    url: string;
  }) => {
    const cmd = `python ${pathFile} --url=${url} --id=${id}`;
    console.log(cmd);
    try {
      execSync(cmd);
      const pathImage = join(process.cwd(), '/public/images/image.jpg');
      const image = await readImage(pathImage);
      const formData = new FormData();
      formData.append(
        'image',
        new Blob([image], { type: 'image/jpeg' }),
        'image.jpg',
      );
      try {
        const response = await axios.post(
          `${EUrlOcr.BASE_URL}${EUrlOcr.DEFINE_IMAGE}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        socket.emit('seenLicensePlate', { id, licensePlate: response.data });
        process.send(JSON.stringify({ status: 'ok', data: response.data }));
      } catch (error) {
        process.send(JSON.stringify({ status: 'err', data: error }));
      }
    } catch (error) {
      process.send(JSON.stringify({ status: 'err', data: error }));
    }
  },
);
