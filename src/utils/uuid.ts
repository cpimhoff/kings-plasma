export type UUID = string & { __uuid: true };
export function uuid(): UUID {
  return crypto.randomUUID() as UUID;
}
