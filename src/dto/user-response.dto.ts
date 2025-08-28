import { ApiProperty } from "@nestjs/swagger";

export class UserDataDto {
  @ApiProperty({
    description: "ชื่อของผู้ใช้",
    example: "สมชาย ใจดี",
  })
  name: string;

  @ApiProperty({
    description: "อีเมลของผู้ใช้",
    example: "somchai@example.com",
  })
  email: string;

  @ApiProperty({
    description: "อายุของผู้ใช้",
    example: 25,
  })
  age: number;
}

export class UserResponseDto {
  @ApiProperty({
    description: "ข้อความตอบกลับ",
    example: "User created successfully",
  })
  message: string;

  @ApiProperty({
    description: "ข้อมูลผู้ใช้ที่สร้าง",
    type: UserDataDto,
  })
  user: UserDataDto;
}

export class PerformanceResponseDto {
  @ApiProperty({
    description: "ข้อความตอบกลับ",
    example: "Performance test completed",
  })
  message: string;

  @ApiProperty({
    description: "เวลาที่ใช้ในการทำงาน (มิลลิวินาที)",
    example: 150,
  })
  duration: number;
}

export class GetUserResponseDto {
  @ApiProperty({
    description: "ข้อความตอบกลับ",
    example: "User 123 retrieved successfully",
  })
  message: string;

  @ApiProperty({
    description: "ID ของผู้ใช้",
    example: "123",
  })
  userId: string;
}
