import React from 'react';

interface ServicesSectionProps {
  onOpenOrder: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenOrder }) => {
  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5C3D48]">
          خدمات النرجس للتطريز
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#5C3D48] via-[#3DB7B5] to-[#2F8F8B] mx-auto my-3 rounded-full" />
      </div>

      <div className="bg-[#F3F9F8] rounded-[35px] p-8 sm:p-12 shadow-sm border border-[#3DB7B5]/15 text-center">
        <div className="w-20 h-20 leading-[80px] text-4xl rounded-full bg-[#5C3D48]/5 mx-auto mb-6">
          👕
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5C3D48] mb-4">
          التطريز على ملابسك الخاصة
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
          نمنح قطع الملابس التي تمتلكها بالفعل بعداً جديداً من التميّز والفخامة. سواء كانت دشاديش، قمصان، فساتين، عباءات، أو ملابس أطفال، يمكنك إرسالها إلينا وتحديد التصميم أو الاسم المفضل وسنقوم بتطريزها بأعلى درجات الدقة والاحترافية وإعادتها إليك.
        </p>
        <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 mb-8 max-w-lg mx-auto text-right list-none">
          <li className="flex items-center gap-2">
            <span className="text-[#3DB7B5]">✨</span>
            استخدام خيوط ممتازة مقاومة للبهتان وتتحمل الغسيل المتكرر.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#3DB7B5]">✨</span>
            إمكانية تنفيذ الشعارات الشخصية، الأسماء، والرسومات الدقيقة.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#3DB7B5]">✨</span>
            دقة متناهية بفضل دمج مهارات التطريز الآلي الحديث مع العناية اليدوية.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#3DB7B5]">✨</span>
            خيارات استلام وإرجاع سريعة ومريحة لكافة ولايات سلطنة عُمان.
          </li>
        </ul>
        <button
          onClick={onOpenOrder}
          className="inline-block bg-gradient-to-r from-[#3DB7B5] to-[#2F8F8B] text-white px-9 py-3.5 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
        >
          اطلب هذه الخدمة الآن
        </button>
      </div>
    </section>
  );
};
