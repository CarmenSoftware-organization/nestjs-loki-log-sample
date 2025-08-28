import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from "@nestjs/common";
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBody,
  ApiBearerAuth 
} from "@nestjs/swagger";
import { LokiLoggerService } from "../services/loki-logger.service";
import { CreateUserDto, UserResponseDto, PerformanceResponseDto, GetUserResponseDto } from "../dto";

@ApiTags("example")
@ApiBearerAuth()
@Controller("example")
export class ExampleController {
  constructor(private readonly logger: LokiLoggerService) {}

  @Get()
  @ApiOperation({ 
    summary: "Hello endpoint", 
    description: "Endpoint สำหรับการทดสอบการทำงานพื้นฐานของ API" 
  })
  @ApiResponse({ 
    status: 200, 
    description: "สำเร็จ", 
    type: String 
  })
  getHello(): string {
    this.logger.log("Hello endpoint called", "ExampleController");
    return "Hello from NestJS with Loki logging!";
  }

  @Get("performance")
  @ApiOperation({ 
    summary: "Performance test", 
    description: "ทดสอบการวัดประสิทธิภาพของ API endpoint" 
  })
  @ApiResponse({ 
    status: 200, 
    description: "สำเร็จ", 
    type: PerformanceResponseDto 
  })
  async testPerformance(): Promise<PerformanceResponseDto> {
    const startTime = Date.now();
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const duration = Date.now() - startTime;
    
    this.logger.logPerformance("testPerformance", duration, "ExampleController");
    
    return {
      message: "Performance test completed",
      duration,
    };
  }

  @Post("users")
  @ApiOperation({ 
    summary: "Create user", 
    description: "สร้างผู้ใช้ใหม่ในระบบ" 
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: "ข้อมูลผู้ใช้ที่ต้องการสร้าง"
  })
  @ApiResponse({ 
    status: 201, 
    description: "ผู้ใช้ถูกสร้างสำเร็จ", 
    type: UserResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: "ข้อมูลไม่ถูกต้อง" 
  })
  createUser(@Body() createUserDto: CreateUserDto): UserResponseDto {
    try {
      // Validate input
      if (!createUserDto.name || !createUserDto.email) {
        throw new HttpException("Name and email are required", HttpStatus.BAD_REQUEST);
      }

      // Log business event
      this.logger.logBusinessEvent("user_created", createUserDto as unknown as Record<string, unknown>, "ExampleController");
      
      // Log success
      this.logger.log("User created successfully", "ExampleController", {
        userId: Date.now(),
        userData: createUserDto,
      });

      return {
        message: "User created successfully",
        user: createUserDto,
      };
    } catch (error) {
      this.logger.error("Failed to create user", error.stack, "ExampleController", {
        userData: createUserDto,
        error: error.message,
      });
      throw error;
    }
  }

  @Get("users/:id")
  @ApiOperation({ 
    summary: "Get user by ID", 
    description: "ดึงข้อมูลผู้ใช้ตาม ID ที่ระบุ" 
  })
  @ApiParam({ 
    name: "id", 
    description: "ID ของผู้ใช้", 
    example: "123" 
  })
  @ApiResponse({ 
    status: 200, 
    description: "สำเร็จ", 
    type: GetUserResponseDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: "ไม่พบผู้ใช้" 
  })
  getUser(@Param("id") id: string): GetUserResponseDto {
    this.logger.log(`Fetching user with ID: ${id}`, "ExampleController", {
      userId: id,
      action: "get_user",
    });

    return {
      message: `User ${id} retrieved successfully`,
      userId: id,
    };
  }

  @Get("error")
  @ApiOperation({ 
    summary: "Trigger error", 
    description: "ทดสอบการจัดการ error ในระบบ" 
  })
  @ApiResponse({ 
    status: 500, 
    description: "Internal Server Error" 
  })
  triggerError(): never {
    this.logger.warn("About to trigger an error for testing purposes", "ExampleController");
    
    throw new HttpException("This is a test error", HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get("structured")
  @ApiOperation({ 
    summary: "Structured logging test", 
    description: "ทดสอบการทำ structured logging พร้อม custom labels" 
  })
  @ApiResponse({ 
    status: 200, 
    description: "สำเร็จ", 
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Structured logging test completed"
        }
      }
    }
  })
  testStructuredLogging(): { message: string } {
    // Test custom labels
    this.logger.logWithLabels("Structured logging test", {
      feature: "structured_logging",
      test_type: "custom_labels",
      user_agent: "test-client",
    }, "ExampleController");

    return { message: "Structured logging test completed" };
  }
}
