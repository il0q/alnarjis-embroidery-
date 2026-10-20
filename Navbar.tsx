import React from 'react';

interface NavbarProps {
  currentTab: 'home' | 'services' | 'order' | 'contact';
  onSelectTab: (tab: 'home' | 'services' | 'order' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#3DB7B5]/15 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <img
            src="/assets/aistudio/lo_a3c70bbc.png"
            alt="شعار النرجس"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#3DB7B5] shadow-sm group-hover:rotate-180 transition-transform duration-700"
          />
          <div className="text-2xl font-bold text-[#5C3D48]">
            <span>النرجس</span>
          </div>
        </div>

        {/* Clean Original Navigation Bar without 3D */}
        <nav className="flex items-center gap-3 sm:gap-7 text-sm font-semibold">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-all py-1.5 px-2.5 rounded-lg cursor-pointer ${
              currentTab === 'home'
                ? 'text-[#5C3D48] font-bold border-b-2 border-[#3DB7B5]'
                : 'text-[#2D2D2D] hover:text-[#5C3D48]'
            }`}
          >
            الرئيسية
          </button>

          <button
            onClick={() => onSelectTab('services')}
            className={`transition-all py-1.5 px-2.5 rounded-lg cursor-pointer ${
              currentTab === 'services'
                ? 'text-[#5C3D48] font-bold border-b-2 border-[#3DB7B5]'
                : 'text-[#2D2D2D] hover:text-[#5C3D48]'
            }`}
          >
            خدماتنا
          </button>

          <button
            onClick={() => onSelectTab('order')}
            className={`transition-all py-1.5 px-2.5 rounded-lg cursor-pointer ${
              currentTab === 'order'
                ? 'text-[#5C3D48] font-bold border-b-2 border-[#3DB7B5]'
                : 'text-[#2D2D2D] hover:text-[#5C3D48]'
            }`}
          >
            اطلب الآن
          </button>

          <button
            onClick={() => onSelectTab('contact')}
            className={`transition-all py-1.5 px-2.5 rounded-lg cursor-pointer ${
              currentTab === 'contact'
                ? 'text-[#5C3D48] font-bold border-b-2 border-[#3DB7B5]'
                : 'text-[#2D2D2D] hover:text-[#5C3D48]'
            }`}
          >
            اتصل بنا
          </button>
        </nav>
      </div>
    </header>
  );
};
