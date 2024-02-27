export class CreateProjectDto {
  name: string;
  color: string;
  isFavorited: boolean;
}

export class CreateTaskDto {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

export class CreateProjectItemDto {
  name: string;
}
