interface Props {
    title: string
}

export default function ChartCard({ title }:Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border">
      <p className="font-semibold mb-3">{title}</p>
      <div className="h-40 flex items-center justify-center text-gray-400">
        (Biểu đồ sẽ đặt ở đây)
      </div>
    </div>
  );
}
