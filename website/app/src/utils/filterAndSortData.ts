export interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

/**
 * Tìm kiếm và sắp xếp dữ liệu.
 * @param data - Mảng dữ liệu gốc
 * @param searchTerm - Từ khóa tìm kiếm (có thể rỗng)
 * @param searchKey - Trường cần tìm kiếm
 * @param sortConfig - Cấu hình sắp xếp (optional)
 * @returns Mảng đã lọc và sắp xếp
 */
export function filterAndSortData<T>(
  data: T[],
  searchTerm: string,
  searchKey: keyof T,
  sortConfig?: SortConfig<T>
): T[] {
  const filtered = searchTerm
    ? data.filter((item) => {
        const field = item[searchKey];
        if (typeof field === "string") {
          return field.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      })
    : [...data];

  if (sortConfig) {
    const { key, direction } = sortConfig;
    filtered.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "string" && typeof valB === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });
  }

  return filtered;
}

// Nested Key
export const getValueByPath = <T>(obj: T, path: string): unknown => {
  return path.split(".").reduce((acc, part) => {
    if (typeof acc === "object" && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj as unknown);
};

type FieldProcessor<T> = (item: T, key: string) => string;

export const filterAndSortByNestedKey = <T>(
  data: T[],
  searchTerm: string,
  searchKey: string,
  sortConfig?: { key: string; direction: "asc" | "desc" },
  customFieldProcessor?: FieldProcessor<T>
): T[] => {
  const lowerSearch = searchTerm.toLowerCase().trim();

  const filtered = searchTerm
    ? data.filter((item) => {
        const field = getValueByPath(item, searchKey);

        // Cho phép xử lý riêng nếu được truyền
        if (customFieldProcessor) {
          const processed = customFieldProcessor(item, searchKey);
          return processed.toLowerCase().includes(lowerSearch);
        }

        if (field === null || field === undefined) return false;

        if (field instanceof Date) {
          const formatted = field.toISOString().split("T")[0];
          return formatted.includes(searchTerm);
        }

        const stringValue =
          typeof field === "number"
            ? field.toString()
            : typeof field === "string"
            ? field.toLowerCase()
            : "";

        return stringValue.includes(lowerSearch);
      })
    : [...data];

  // Sắp xếp (nếu có)
  if (sortConfig) {
    const { key, direction } = sortConfig;
    filtered.sort((a, b) => {
      const valA = getValueByPath(a, key);
      const valB = getValueByPath(b, key);

      if (typeof valA === "string" && typeof valB === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });
  }

  return filtered;
};