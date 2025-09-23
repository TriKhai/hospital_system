import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import type {
  DrugFormValues,
  DrugTypeResponse,
  ManufacturerResponse,
  SupplierResponse,
} from "../../../types/drugType";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormData) => Promise<void>;
  manufacturers: ManufacturerResponse[];
  suppliers: SupplierResponse[];
  drugTypes: DrugTypeResponse[];
};

const DrugAddForm: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  manufacturers,
  suppliers,
  drugTypes,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên thuốc bắt buộc"),
    price: Yup.number().required("Giá bắt buộc"),
    stock: Yup.number().required("Số lượng bắt buộc"),
    expiredAt: Yup.date().required("Hạn sử dụng bắt buộc"),
    manufacturerId: Yup.string().required("Chọn NSX"),
    supplierId: Yup.string().required("Chọn NCC"),
    drugTypeId: Yup.string().required("Chọn loại thuốc"),
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Thêm thuốc</h2>

        <Formik<DrugFormValues>
          initialValues={{
            name: "",
            price: 0,
            stock: 0,
            expiredAt: "",
            usageInstructions: "",
            effects: "",
            image: null,
            manufacturerId: "",
            supplierId: "",
            drugTypeId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", String(values.price));
            formData.append("stock", String(values.stock));
            formData.append(
              "usageInstructions",
              String(values.usageInstructions)
            );
            formData.append("effects", String(values.effects));
            formData.append("expiredAt", values.expiredAt); // "yyyy-MM-dd"
            formData.append("manufacturerId", String(values.manufacturerId));
            formData.append("supplierId", String(values.supplierId));
            formData.append("drugTypeId", String(values.drugTypeId));
            if (values.image instanceof File)
              formData.append("image", values.image);

            await onSubmit(formData); // gọi handleAdd
            onClose();
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-3">
              <Field
                name="name"
                placeholder="Tên thuốc"
                className="border p-2 rounded w-full"
                readOnly
              />

              <Field
                name="name"
                placeholder="Tên thuốc"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="price"
                type="number"
                placeholder="Giá"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="stock"
                type="number"
                placeholder="Số lượng"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                name="expiredAt"
                type="date"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="expiredAt"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="textarea"
                name="usageInstructions"
                placeholder="HDSD"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="usageInstructions"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="textarea"
                name="effects"
                placeholder="Công dụng"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="effects"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="select"
                name="manufacturerId"
                className="border p-2 rounded w-full"
              >
                <option value="">--Chọn NSX--</option>
                {manufacturers.map((m) => (
                  <option key={m.id} value={String(m.id)}>
                    {m.name}
                  </option>
                ))}
              </Field>

              <Field
                as="select"
                name="supplierId"
                className="border p-2 rounded w-full"
              >
                <option value="">--Chọn NCC--</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    {s.name}
                  </option>
                ))}
              </Field>

              <Field
                as="select"
                name="drugTypeId"
                className="border p-2 rounded w-full"
              >
                <option value="">--Chọn loại thuốc--</option>
                {drugTypes.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
              </Field>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue("image", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="border p-2 rounded w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-2 max-h-40 rounded"
                />
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#12B0C2] text-white px-4 py-2 rounded"
                >
                  Thêm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DrugAddForm;
