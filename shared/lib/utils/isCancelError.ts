export function isCancelError(error: any): boolean {
  return error.message === "canceled" ? true : false;
}
