import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola DOMINGO!';
  }
  getCarrito(): string {
    return 'Productos en el CARRITO!';
  }
}
