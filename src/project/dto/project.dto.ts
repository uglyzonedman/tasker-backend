export class CreateProjectDto {
  name: string;
  color: string;
  isFavorited: boolean;
}

export class CreateTaskDto {
  name: string;
  description: string;
}

export class CreateProjectItemDto {
  name: string;
}
