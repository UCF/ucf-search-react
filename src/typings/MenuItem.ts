export default interface MenuItem {
  id: number;
  order: number;
  parent: number;
  title: string;
  url: string;
  attr: string;
  target: string;
  classes: Array<string>;
  xfn: string;
  description: string;
  object_id: number;
  object: string;
  type: string;
  type_label: string;
}
