import { HttpModule } from '@nestjs/axios';
import { Global, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri =
  'mongodb+srv://jackw:dPHR5JNGrZHwwdnN@cluster0.8uypm.mongodb.net/';

const persistenceProviders: Provider[] = [
  // {
  //   provide: CoreDITokens.DB_TRANSACTION,
  //   useFactory: (mongoClient: MongoClient, logger: LoggerPort) =>
  //     new MongoDbTransactionAdapter(mongoClient, logger),
  //   inject: [MongoClient, CoreDITokens.LOGGER],
  // },
];

@Global()
@Module({
  imports: [HttpModule, MongooseModule.forRoot(mongoUri)],
  providers: [...persistenceProviders],
  exports: [],
  controllers: [],
})
export class NestSharedModule {}
