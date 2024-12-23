import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { NestAppModule } from './nest-module/NestAppModule';
import { ConfigPort } from '@shared/core/ports/ConfigPort';
import { EnvConfigAdapter } from '@shared/infrastructure/adapters/config/EnvConfigAdapter';
import { ConfigKeys } from '@shared/core/constants/ConfigKeys';

export class Application {
  private readonly config: ConfigPort = new EnvConfigAdapter();
  private readonly host: string = this.config.getString(ConfigKeys.APP_HOST);
  private readonly port: number = this.config.getInt(ConfigKeys.APP_PORT);

  public static create(): Application {
    return new Application();
  }

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(NestAppModule);

    app.enableCors();

    app.use(helmet());
    // mongodb+srv://jackw:dPHR5JNGrZHwwdnN@cluster0.8uypm.mongodb.net/
    await app.listen(this.port, this.host);
  }
}
