import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EFilePaths } from '../common/enum/path.enum';
import { fork } from 'child_process';

@Injectable()
export class CameraCore2Service {
  private canFetch: boolean = true;
  private processLive: NodeJS.Timeout;
  private listProcess: { id: number; url: string }[] = [];

  constructor() {
    this.startProcessLive();
  }

  statusProcessLive() {
    return this.processLive
      ? { message: 'process is on', isOn: true }
      : { message: 'process is off', isOn: false };
  }

  killProcessLive() {
    if (this.processLive) {
      clearInterval(this.processLive);
      this.processLive = undefined;
      return { message: 'kill process' };
    } else {
      throw new HttpException(
        'process live is off',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  startProcessLive() {
    if (!this.processLive) {
      this.processLive = setInterval(() => {
        if (this.listProcess.length > 0 && this.canFetch) {
          this.canFetch = false;
          const id = this.listProcess[0].id;
          const url = this.listProcess[0].url;
          const childProcess = fork(EFilePaths.RUN_PYTHON_PATH_MAIN);
          childProcess.send({ url, id, pathFile: EFilePaths.PYTHON_PATH_MAIN });
          childProcess.on('message', (res) => {
            // const result: {
            //   status: 'ok' | 'err';
            //   data: { pelak: string; type: string }[];
            // } = JSON.parse(res.toString());
            // if (result.status === 'ok') {
            //   console.log(result.status, result.data);
            // } else {
            //   console.error(result.status, result.data);
            // }
            this.canFetch = true;
          });
          this.shiftArray();
        }
      }, 100);
      return { message: 'start process' };
    } else {
      throw new HttpException(
        'process live is on',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  startLiveCamera({ id, url }: { id: number; url: string }) {
    this.listProcess.push({ id, url });
  }

  stopLiveCamera({ id }: { id: number }) {
    this.canFetch = false;
    this.listProcess.forEach((camera, index) => {
      if (camera.id === id) {
        this.listProcess.splice(index, 1);
      }
    });
    this.canFetch = true;
  }

  private shiftArray() {
    const firstElement = this.listProcess.shift();
    if (firstElement !== undefined) {
      this.listProcess.push(firstElement);
    }
  }
}
