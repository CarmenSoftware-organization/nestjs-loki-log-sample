import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: "Root endpoint", 
    description: "Endpoint หลักของแอปพลิเคชัน" 
  })
  @ApiResponse({ 
    status: 200, 
    description: "สำเร็จ", 
    type: String 
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
