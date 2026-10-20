import React from 'react';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5C3D48]">
          من نحن واتصل بنا
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#5C3D48] via-[#3DB7B5] to-[#2F8F8B] mx-auto my-3 rounded-full" />
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          تعرف على حكايتنا وتواصل معنا مباشرة عبر قنواتنا الرسمية
        </p>
      </div>

      {/* Clean Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp */}
        <a
          href="https://api.whatsapp.com/send?phone=96892908668"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#F3F9F8] p-8 rounded-[35px] border border-[#3DB7B5]/15 shadow-sm hover:-translate-y-2 transition-all text-center group cursor-pointer block"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#25D366] flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner">
            💬
          </div>
          <h3 className="font-bold text-[#5C3D48] text-xl mb-2">تواصل عبر الواتساب</h3>
          <p className="text-xs text-gray-600 mb-6">للإجابة السريعة على استفساراتكم وتأكيد تفاصيل الطلب</p>
          <span className="inline-block w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-full shadow-md transition-colors">
            اضغط للمحادثة الفورية
          </span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/alnargis_te"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#F3F9F8] p-8 rounded-[35px] border border-[#3DB7B5]/15 shadow-sm hover:-translate-y-2 transition-all text-center group cursor-pointer block"
        >
          <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner">
            📸
          </div>
          <h3 className="font-bold text-[#5C3D48] text-xl mb-2">تابعنا على الإنستغرام</h3>
          <p className="text-xs text-gray-600 mb-6">شاهد أحدث تصاميمنا اليومية وتفاعل مع مجتمعنا الخاص</p>
          <span className="inline-block w-full py-3 px-4 bg-gradient-to-r from-[#e6683c] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold rounded-full shadow-md">
            @alnargis_te
          </span>
        </a>

        {/* Location */}
        <div className="bg-[#F3F9F8] p-8 rounded-[35px] border border-[#3DB7B5]/15 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#3DB7B5]/15 text-[#2F8F8B] flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
            📍
          </div>
          <h3 className="font-bold text-[#5C3D48] text-xl mb-2">موقعنا الحالي</h3>
          <p className="text-xs text-gray-600 mb-6">
            سلطنة عُمان، محافظة مسقط<br />
            نستقبل طلباتكم من كافة الولايات ونوفر خيارات تسليم مريحة
          </p>
          <span className="inline-block w-full py-3 px-4 bg-[#3DB7B5]/20 text-[#5C3D48] text-xs font-bold rounded-full">
            مسقط 🇴🇲
          </span>
        </div>
      </div>
    </section>
  );
};
