import { MongoClient, ClientSession } from 'mongodb';
// import { LoggerPort } from './ports/LoggerPort';

export class MongoDbTransactionAdapter {
  constructor(
    private readonly mongoClient: MongoClient,
    // private readonly logger: LoggerPort,
  ) {}

  public async run<T>(
    operation: (transactionRef: ClientSession) => Promise<T>,
  ): Promise<T> {
    const session = this.mongoClient.startSession();
    try {
      session.startTransaction();
      const result = await operation(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      //   this.logger.error('Transaction failed', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
