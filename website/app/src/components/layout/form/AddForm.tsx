import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export type FieldConfig<T> = {
  label: string;
  name: keyof T;
  type?: "text" | "textarea" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
};

type Props<T> = {
  title: string;
  fields: FieldConfig<T>[];
  isOpen: boolean;
  onSubmit: (formData: T) => Promise<void>;
  onClose: () => void;
};

const AddForm = <T extends object>({
  title,
  fields,
  isOpen,
  onSubmit,
  onClose,
}: Props<T>) => {
  if (!isOpen) return null;

  // 🔹 Tạo Yup schema động theo fields
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        acc[field.name as string] = Yup.string().required(
          `${field.label} là bắt buộc`
        );
      }
      return acc;
    }, {} as Record<string, Yup.AnySchema>)
  );

  const initialValues = fields.reduce((acc, field) => {
    acc[field.name as string] = "";
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Formik form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values as T);
            resetForm();
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-4">
              {fields.map((field, index) => (
                <div key={index}>
                  <label className="block mb-1 font-medium">
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <Field
                      as="textarea"
                      name={String(field.name)}
                      className="border px-3 py-2 rounded w-full"
                    />
                  ) : field.type === "select" ? (
                    <Field
                      as="select"
                      name={String(field.name)}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option value="">-- Chọn --</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      type="text"
                      name={String(field.name)}
                      className="border px-3 py-2 rounded w-full"
                    />
                  )}

                  <ErrorMessage
                    name={String(field.name)}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1]"
                >
                  Lưu
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddForm;
