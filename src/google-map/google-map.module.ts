import { Module } from '@nestjs/common';
import { GoogleMapController } from './google-map.controller';
import { GoogleMapService } from './google-map.service';

@Module({
  controllers: [GoogleMapController],
  providers: [GoogleMapService],
})
export class GoogleMapModule {}
