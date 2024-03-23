import { BaseError } from "~/utils/error/base.error"

export class FormError extends BaseError {
  private field: string

  constructor(message: string, field: string) {
    super(message)
    this.field = field
  }

  public getField() {
    return this.field
  }
}
