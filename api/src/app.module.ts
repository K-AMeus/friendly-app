import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendsModule } from './friends/friends.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from './groups/groups.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';
import { Group } from './groups/entities/group.entity';

@Module({
  controllers: [AppController],
  providers: [AppService, SeedService],
  imports: [
    FriendsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 1177,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Group]),
    GroupsModule,
    SeedModule,
  ],
})
export class AppModule {}
