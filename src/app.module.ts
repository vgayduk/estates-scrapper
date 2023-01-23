import { Module } from '@nestjs/common';
import { ParserController } from './controllers/parser.controller';
import { RealtorService } from './services/realtor.service';

@Module({
  imports: [],
  controllers: [ParserController],
  providers: [RealtorService],
})
export class AppModule {}
