import { useEffect, useState } from "react";

export function useCount(fetcher: () => Promise<number>) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetcher() // gọi API
      .then(setCount) 
      .catch((err) => console.error("Lỗi lấy count:", err));
  }, [fetcher]);

  return count;
}
