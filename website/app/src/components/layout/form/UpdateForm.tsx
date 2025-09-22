import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type Props<T extends object> = {
  title: string;
  data: T;
  isOpen: boolean;
  onSubmit: (formData: T) => Promise<void>;
  onClose: () => void;
  fieldConfig?: Partial<
    Record<
      keyof T,
      {
        label?: string;
        type?: "text" | "textarea" | "select" | "date" | "email";
        required?: boolean;
        hidden?: boolean;
        readOnly?: boolean;
        options?: { label: string; value: string | number }[];
      }
    >
  >;
};

const UpdateForm = <T extends object>({
  title,
  data,
  isOpen,
  onSubmit,
  onClose,
  fieldConfig = {},
}: Props<T>) => {
  if (!isOpen) return null;

  // 🔹 Yup schema động theo data
  const validationSchema = Yup.object(
    Object.keys(data).reduce((acc, key) => {
      const config = fieldConfig[key as keyof T];
      if (config?.required) {
        if (config.type === "email") {
          acc[key] = Yup.string()
            .email("Email không hợp lệ")
            .required(`${config.label ?? key} là bắt buộc`);
        } else {
          acc[key] = Yup.string().required(
            `${config.label ?? key} là bắt buộc`
          );
        }
      }
      return acc;
    }, {} as Record<string, Yup.AnySchema>)
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* // <div
    //   className={`
    //                 fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-lg
    //                 transform transition-transform duration-300
    //                 ${isOpen ? "translate-x-0" : "translate-x-full"}
    //             `}
    // > */}
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
          initialValues={{ ...data }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await onSubmit(values as T);
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-4">
              {Object.entries(data).map(([key, value]) => {
                const config = fieldConfig[key as keyof T] || {};
                if (config.hidden) return null;

                let inputType = config.type || "text";
                if (!config.type) {
                  if (value instanceof Date) inputType = "date";
                  else if (typeof value === "number") inputType = "text"; // vẫn dùng text để dễ handle
                }

                return (
                  <div key={key}>
                    <label className="block mb-1 font-medium">
                      {config.label ?? key}
                    </label>

                    {config.type === "textarea" ? (
                      <Field
                        as="textarea"
                        name={key}
                        disabled={config.readOnly}
                        className="border px-3 py-2 rounded w-full"
                      />
                    ) : config.type === "select" && config.options ? (
                      <Field
                        as="select"
                        name={key}
                        disabled={config.readOnly}
                        className="border px-3 py-2 rounded w-full"
                      >
                        <option value="">-- Chọn --</option>
                        {config.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Field>
                    ) : config.type === "email" ? (
                      <Field
                        type="email"
                        name={key}
                        disabled={config.readOnly}
                        className="border px-3 py-2 rounded w-full"
                      />
                    ) : (
                      <Field
                        type={inputType}
                        name={key}
                        disabled={config.readOnly}
                        className="border px-3 py-2 rounded w-full"
                      />
                    )}

                    <ErrorMessage
                      name={key}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                );
              })}

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

export default UpdateForm;
