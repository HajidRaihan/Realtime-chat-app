import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
    controllers: [AuthController],
    providers: [GoogleStrategy, PrismaService, SessionSerializer, {
        provide: 'AUTH_SERVICE', 
        useClass: AuthService
    }],
})
export class AuthModule {}
