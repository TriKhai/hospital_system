import React from "react";

const Welcome: React.FC = () => {
  return (
    <section className="w-ful py-16 mt-20">
      <div className="flex-column justify-center text-center pt-3 mb-10">
        <p className="font-black text-6xl mb-4">BỆNH VIỆN THÀNH PHỐ CẦN THƠ</p>
        <div>
          <p className="text-3xl">
            Chào mừng đến với hệ thống bệnh viện – nơi công nghệ và y tế gặp
            nhau
          </p>
          <p className="text-3xl">Sức khỏe của bạn – Sứ mệnh của chúng tôi</p>
        </div>

        <div className="flex gap-4 mt-8 justify-center text-lg">
            <button className="bg-[#26a7b6] text-white px-6 py-3 rounded-xl shadow hover:bg-[#0e8a9b]">
              Tạo lịch hẹn
            </button>
            <button className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-xl shadow hover:bg-green-50">
              Read More
            </button>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
