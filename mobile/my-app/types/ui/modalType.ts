// types/form.ts
export type FieldType = "text" | "number" | "textarea" | "date" | "file" | "select";

export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: any }[]; // cho select
}

export interface DynamicModalFormProps<T> {
  visible: boolean;
  title: string;
  fields: FieldConfig<T>[];
  data: T | null;
  onClose: () => void;
  onSubmit: (values: T) => void;
}

