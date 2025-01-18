import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';

@Module({
  controllers: [MetadataController],
  // providers:[
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  // ]
})
export class MetadataModule {}
