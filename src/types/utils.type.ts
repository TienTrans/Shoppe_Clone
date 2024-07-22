export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

//  cu phap -? se loai bo key optionnal
export type NoUndefineField<T> = {
  [key in keyof T]-?: NoUndefineField<NonNullable<T[key]>>
}
