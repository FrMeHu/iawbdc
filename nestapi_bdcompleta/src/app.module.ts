import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticaModule } from './_evaluacion/practica/practica.module';
import { AlumnoModule } from './_evaluacion/alumno/alumno.module';
import { AlumnoRealizaPracticaModule } from './_evaluacion/alumnorealizapractica/alumnorealizapractica.module';
import { ProfesorModule } from './_evaluacion/profesor/profesor.module';
import { ProfesorDisenaPracticaModule } from './_evaluacion/profesordisenapractica/profesordisenapractica.module';
import { ExamenteoricoModule } from './_evaluacion/examenteorico/examenteorico.module';
import { AlumnoHaceExamenModule } from './_evaluacion/alumnohaceexamen/alumnohaceexamen.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}), 
    TypeOrmModule.forRoot({
      name:'base1',
      type:'mysql',
      host:process.env.URL,
      port:3306,
      username:process.env.USUARIO,
      password:process.env.PASSWORD,
      database: process.env.DBNAME,
      autoLoadEntities:true,//Esta es la mejor opción para que coja sólo las que haya en módulo
      synchronize:true
    }),
    TypeOrmModule.forRoot({
      name:'base2',
      type:'mysql',
      host:process.env.URL,
      port:3306,
      username:process.env.USUARIO,
      password:process.env.PASSWORD,
      database: process.env.DBNAME2,
      autoLoadEntities:true,//Esta es la mejor opción para que coja sólo las que haya en módulo
      synchronize:true
    }),
    PracticaModule,
    AlumnoModule,
    AlumnoRealizaPracticaModule,
    ProfesorModule,
    ProfesorDisenaPracticaModule,
    ExamenteoricoModule,
    AlumnoHaceExamenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
