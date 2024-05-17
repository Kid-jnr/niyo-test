import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

enum TaskStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
