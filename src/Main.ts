import 'module-alias/register';
import * as dotenv from 'dotenv'
dotenv.config({ path: './env/local.app.env' })
import { Application } from '@shared/presentation/Application';

async function bootstrap(): Promise<void> {
    const app: Application = Application.create();
    await app.run();
}

bootstrap();
