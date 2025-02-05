import { SetMetadata } from '@nestjs/common';

export const Protected = () => SetMetadata('Protected', true);
