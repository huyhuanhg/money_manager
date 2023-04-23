export default interface Category {
  id?: string;
  icon?: string;
  title: string;
  parent_id?: string | null;
  child?: Category[] | null
}
