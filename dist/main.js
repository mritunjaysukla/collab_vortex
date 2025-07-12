"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression = require("compression");
const express_rate_limit_1 = require("express-rate-limit");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.use((0, express_rate_limit_1.default)({
        windowMs: configService.get('RATE_LIMIT_TTL', 60) * 1000,
        max: configService.get('RATE_LIMIT_LIMIT', 100),
    }));
    app.enableCors({
        origin: configService.get('CORS_ORIGIN', 'http://localhost:3000'),
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CollabVortex API')
        .setDescription('A collaboration platform API for brands and content creators')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`🚀 CollabVortex API is running on: http://localhost:${port}`);
    console.log(`📚 Swagger Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map