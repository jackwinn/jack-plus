import { Module } from '@nestjs/common';
import { NestSharedModule } from './NestSharedModule';

@Module({
  imports: [NestSharedModule],
})
export class NestAppModule {}
