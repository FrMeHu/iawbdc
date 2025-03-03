import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { LocalStrategy } from './local-strategy/local-strategy';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { UsuarioModule } from "../users/users.module";

@Module({
    imports: [
      UsuarioModule,
      PassportModule,
      JwtModule.register({
        secret: 'tu_secreto_jwt', // Mejor con variable de entorno
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService] //Hay que añadir el export en todos
  })
  export class AuthModule {}
