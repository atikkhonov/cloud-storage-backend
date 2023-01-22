import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kandula.db.elephantsql.com',
      port: 5432,
      username: 'pskbcubu',
      password: '3KE3vKvz1k_toKOc6NTVBizB5kyK07Yj',
      database: 'pskbcubu',
      entities: [UserEntity],
      synchronize: true,
    }),
    FilesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
