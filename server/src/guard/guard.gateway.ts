import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GuardService } from './guard.service';
import { SeenLicensePlate } from './dto/seen-license-plate-guard.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class GuardGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly guardService: GuardService) {}

  @SubscribeMessage('seenLicensePlate')
  create(
    @MessageBody() seenLicensePlate: SeenLicensePlate,
  ) {
    const { licensePlate } = seenLicensePlate;
    this.server.emit(`camera-${seenLicensePlate.id}`, { licensePlate });
    return "sended"
  }
}