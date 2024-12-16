import { Module } from '@nestjs/common';
import { NestSharedModule } from './nest-shared.module';


@Module({ imports: [NestSharedModule] })
export class NestAppModule {}
