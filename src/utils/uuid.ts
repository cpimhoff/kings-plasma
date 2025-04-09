export type UUID = string;
export function uuid(): UUID {
  return crypto.randomUUID();
}
