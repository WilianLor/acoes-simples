import { HttpException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';

export const promisifyHttpService = <T>(
  observable: Observable<AxiosResponse<T>>,
): Promise<T> => {
  return firstValueFrom(
    observable.pipe(
      map((response) => response.data),
      catchError((err: AxiosError) => {
        throw new HttpException(err.response.data, err.response.status);
      }),
    ),
  );
};
