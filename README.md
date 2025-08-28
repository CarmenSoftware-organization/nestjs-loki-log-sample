# NestJS Loki Logger Sample

โปรเจคตัวอย่างสำหรับการใช้งาน NestJS พร้อมกับ Loki logging system และ Swagger API documentation

## 🚀 Features

- **NestJS Framework** - Modern Node.js framework
- **Loki Logging** - Centralized logging system
- **Swagger/OpenAPI** - Interactive API documentation
- **TypeScript** - Full type safety
- **Validation** - Request validation with class-validator
- **Structured Logging** - Advanced logging capabilities

## 📋 Prerequisites

- Node.js 18+ 
- npm หรือ yarn
- Docker (สำหรับ Loki)

## 🛠️ Installation

```bash
# Clone repository
git clone <repository-url>
cd nest-loki-log-sample

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

## ⚙️ Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:

```env
# Application Configuration
NODE_ENV=development
PORT=4000
APP_NAME=nest-loki-logger

# Logging Configuration
LOG_LEVEL=info

# Loki Configuration
LOKI_HOST=localhost
LOKI_PORT=3100
LOKI_PROTOCOL=http
LOKI_USERNAME=
LOKI_PASSWORD=

# Swagger Configuration
SWAGGER_TITLE=NestJS Loki Logger API
SWAGGER_DESCRIPTION=API สำหรับการทดสอบ NestJS พร้อมกับ Loki logging system
SWAGGER_VERSION=1.0
```

## 🐳 Running Loki

```bash
# Start Loki with Docker Compose
npm run loki:up

# Check logs
npm run loki:logs

# Stop Loki
npm run loki:down
```

## 🚀 Running the Application

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 📚 API Documentation

หลังจากรันแอปพลิเคชันแล้ว สามารถเข้าถึง Swagger UI ได้ที่:

**URL**: http://localhost:4000/api

### Available Endpoints

#### App Controller
- `GET /` - Root endpoint

#### Example Controller
- `GET /example` - Hello endpoint
- `GET /example/performance` - Performance test
- `POST /example/users` - Create user
- `GET /example/users/:id` - Get user by ID
- `GET /example/error` - Trigger error test
- `GET /example/structured` - Structured logging test

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# Test coverage
npm run test:cov

# Test logging functionality
npm run test:logging
```

## 📝 Logging Examples

โปรเจคนี้มีตัวอย่างการใช้งาน logging หลายรูปแบบ:

### Basic Logging
```typescript
this.logger.log('Message', 'Context');
this.logger.error('Error message', 'stack trace', 'Context');
this.logger.warn('Warning message', 'Context');
```

### Performance Logging
```typescript
this.logger.logPerformance('operation_name', duration, 'Context');
```

### Business Event Logging
```typescript
this.logger.logBusinessEvent('user_created', userData, 'Context');
```

### Structured Logging with Custom Labels
```typescript
this.logger.logWithLabels('Message', customLabels, 'Context');
```

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # API controllers
├── dto/             # Data Transfer Objects
├── modules/         # Feature modules
├── services/        # Business logic services
└── main.ts          # Application entry point
```

## 🔧 Development

### Adding New Endpoints

1. สร้าง DTO ใน `src/dto/`
2. เพิ่ม Swagger decorators
3. สร้าง controller method
4. อัปเดต Swagger documentation

### Adding New DTOs

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class NewDto {
  @ApiProperty({
    description: 'Description',
    example: 'Example value'
  })
  @IsString()
  @IsNotEmpty()
  field: string;
}
```

## 📊 Monitoring

- **Loki**: http://localhost:3100
- **Application**: http://localhost:4000
- **API Docs**: http://localhost:4000/api

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.
