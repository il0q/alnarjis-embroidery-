import React from 'react';
import { Phone, Instagram, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1215] text-[#B5A4AB] pt-14 pb-8 border-t-4 border-[#3DB7B5] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10 text-right">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/aistudio/lo_a3c70bbc.png"
                alt="النرجس"
                className="w-10 h-10 rounded-full border border-[#3DB7B5]"
              />
              <span className="text-xl font-bold text-white">النرجس للتطريز</span>
            </div>
            <p className="text-xs leading-relaxed text-[#B5A4AB]/80">
              نقدم لكم أجود خدمات التطريز المتقن على ملابسكم الخاصة ومختلف الأقمشة مع خدمات الاستلام والتوصيل المريحة في سلطنة عُمان.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 border-r-2 border-[#3DB7B5] pr-2">
              خدمات وتسهيلات النرجس
            </h4>
            <ul className="space-y-2 text-xs">
              <li>• خدمة إرسال ملابسك الخاصة عبر البريد وتطريزها وإعادتها</li>
              <li>• تطريز الدشاديش العمانية، العباءات، والقمصان</li>
              <li>• تطريز الأسماء والشعارات المخصصة</li>
              <li>• التوصيل لكافة ولايات سلطنة عُمان</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 border-r-2 border-[#3DB7B5] pr-2">
              تواصل مباشر
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://api.whatsapp.com/send?phone=96892908668"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#25D366] hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>واتساب المباشر: +968 9290 8668</span>
              </a>
              <a
                href="https://instagram.com/alnargis_te"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-pink-400 hover:underline"
              >
                <Instagram className="w-4 h-4" />
                <span>إنستغرام: @alnargis_te</span>
              </a>
              <div className="flex items-center gap-2.5 text-gray-300">
                <MapPin className="w-4 h-4 text-[#3DB7B5]" />
                <span>سلطنة عُمان، محافظة مسقط</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <span>© 2026 النرجس للتطريز. جميع الحقوق محفوظة.</span>
          <span>صُنع بعناية وإتقان في سلطنة عُمان 🇴🇲</span>
        </div>
      </div>
    </footer>
  );
};
