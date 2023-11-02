export class ErrorWithContext extends Error {
  public context: string;

  constructor(msg: string, context: string) {
    super(`${context}: ${msg}`);
    this.context = context;
    Object.setPrototypeOf(this, ErrorWithContext.prototype);
  }
}
