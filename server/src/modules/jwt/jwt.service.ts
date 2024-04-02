import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

interface IRefreshToken extends JWTPayload {}

@Injectable()
export class JwtService {
  protected secretAccess: Uint8Array;
  protected secretRefresh: Uint8Array;

  constructor(private readonly configService: ConfigService) {
    this.secretAccess = new TextEncoder().encode(
      this.configService.get('App.token_access_token'),
    );
    this.secretRefresh = new TextEncoder().encode(
      this.configService.get('App.token_refresh_token'),
    );
  }

  async createRefreshToken({ ...arg }) {
    const token = await new SignJWT(arg)
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('refresh')
      .setIssuer('example.com')
      .setAudience('user')
      .setExpirationTime(this.configService.get('App.token_time_refresh_token'))
      .setIssuedAt()
      .sign(this.secretRefresh);
    return token;
  }

  async verifyRefreshToken(token: string) {
    const { payload, protectedHeader } = await jwtVerify(
      token,
      this.secretRefresh,
    );
    return payload;
  }

  async createAccessToken({ ...arg }) {
    const token = await new SignJWT(arg)
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('access')
      .setIssuer('example.com')
      .setAudience('user')
      .setExpirationTime(this.configService.get('App.token_time_access_token'))
      .setIssuedAt()
      .sign(this.secretAccess);
    return token;
  }

  async verifyAccessToken(token: string) {
    const { payload, protectedHeader } = await jwtVerify(
      token,
      this.secretAccess,
    );
    return payload;
  }
}
