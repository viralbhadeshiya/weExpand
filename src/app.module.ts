import { Module } from '@nestjs/common';
import { GoogleMapModule } from './google-map/google-map.module';

@Module({
  imports: [GoogleMapModule],
})
export class AppModule {}
