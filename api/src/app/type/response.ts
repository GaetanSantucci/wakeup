export type ResponseType = {
  status: number,
  json(): Promise<any>,
  text(): Promise<string>
}

