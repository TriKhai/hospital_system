import { useState } from "react";
import UpdateForm from "../../../components/layout/form/UpdateForm";
import type { DrugTypeResponse } from "../../../types/drugType";

const DrugPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState<DrugTypeResponse>({
    id: 1,
    name: "Kháng sinh",
    unit: "Viên",
    createdAt: new Date(),
  });

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Update DrugType
      </button>

      <UpdateForm
        title="Cập nhật loại thuốc"
        data={row}
        isOpen={isOpen}
        onSubmit={async (values) => {
          console.log("Updated:", values);
          setRow(values); // update lại state
        }}
        onClose={() => setIsOpen(false)}
        fieldConfig={{
          id: { readOnly: true },
          createdAt: { readOnly: true, type: "date" },
          unit: { type: "select", options: [
            { label: "Viên", value: "Viên" },
            { label: "Chai", value: "Chai" },
            { label: "Ống", value: "Ống" },
          ] },
        }}
      />
    </div>
  );
};

export default DrugPage;