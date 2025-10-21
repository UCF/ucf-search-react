import type MenuItem from "./MenuItem";

export default interface Menu {
  ID: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  items: Array<MenuItem>;
}
