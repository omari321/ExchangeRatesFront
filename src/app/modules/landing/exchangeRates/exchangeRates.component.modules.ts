
export class ApplicationResult<T> {
    success: boolean;
    errors: ApplicationError[];
    data: T;
}
export class ApplicationError {
    code: number;
    message: string;
}
