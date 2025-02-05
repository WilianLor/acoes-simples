export class Page<T> {
  data: T[];
  count: number;

  constructor(data?: Partial<Page<T>>) {
    Object.assign(this, data);
  }
}
