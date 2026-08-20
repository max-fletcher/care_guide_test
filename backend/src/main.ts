import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VersioningType } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // cors: true,
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
  })

  // enable global prefix with versioning e.g /api/v1/users, /api/v2/users
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI
  })

  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0')
  console.log(`Backend running on http://localhost:${port}/api`)
}
bootstrap()
