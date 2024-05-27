import { AuthService, authConfiguration } from '#auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfiguration],
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
