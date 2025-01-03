import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { NestAppModule } from './nest-modules/NestAppModule';
import { EnvConfigAdapter } from '@shared/infrastructure/adapters/config/EnvConfigAdapter';
import { ConfigPort } from '@shared/core/ports/ConfigPort';
import { ConfigKeys } from '@shared/core/constants/ConfigKeys';

export class Application {
  private readonly config: ConfigPort = new EnvConfigAdapter();

  private readonly host: string = this.config.getString(ConfigKeys.APP_HOST);
  private readonly port: number = this.config.getInt(ConfigKeys.APP_PORT);
  private readonly env: string = this.config.getString(ConfigKeys.NODE_ENV);

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(NestAppModule);

    app.enableCors();

    app.use(helmet());

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // console.log(this.host)
    await app.listen(this.port, () => {
      console.log(
        `Backend server is running on ${this.env} at http://${this.host}:${this.port}`,
      );
    });
  }

  public static create(): Application {
    return new Application();
  }
}
