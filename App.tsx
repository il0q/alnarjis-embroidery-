import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MailInBookingSystem } from './components/MailInBookingSystem';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'order' | 'contact'>('home');

  const navigateTo = (tab: 'home' | 'services' | 'order' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] relative overflow-x-clip font-['Cairo',sans-serif]">
      {/* 🧵 Floating 3D Animated Background Thread Curves */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35" aria-hidden="true">
        <svg className="absolute top-[5%] left-0 w-full h-[400px] stroke-[#3DB7B5]/24 fill-none stroke-[2.5]" viewBox="0 0 1440 400">
          <path d="M0,200 C300,350 600,50 900,200 C1200,350 1300,100 1440,200" />
        </svg>
        <svg className="absolute bottom-[5%] right-0 w-full h-[400px] stroke-[#5C3D48]/22 fill-none stroke-[2]" viewBox="0 0 1440 400">
          <path d="M1440,150 C1100,-50 800,350 500,150 C200,-50 100,250 0,150" />
        </svg>
      </div>

      {/* Navigation Header */}
      <Navbar currentTab={activeTab} onSelectTab={navigateTo} />

      {/* Main Views Container */}
      <main className="relative z-10">
        {/* ===================== HOME VIEW ===================== */}
        {activeTab === 'home' && (
          <div>
            {/* 🎬 Hero Section matching original index.html */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black px-4 sm:px-6 py-24 sm:py-32">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
                src="/assets/aistudio/er_de476ad0.mp4"
              />

              <div className="relative z-10 max-w-3xl mx-auto text-center bg-[#F7F4ED]/30 backdrop-blur-xl border border-white/30 p-8 sm:p-14 rounded-[40px] shadow-2xl">
                <h1 className="text-3xl sm:text-5xl font-black text-[#5C3D48] tracking-tight leading-tight mb-4">
                  نُحوّل ثيابكم إلى لوحات فنية
                </h1>

                <p className="text-base sm:text-xl text-[#332D2F] font-semibold max-w-2xl mx-auto mb-8 leading-relaxed">
                  مرحباً بكم في النرجس.. حيث ندمج دقة الخيوط بفخامة التصميم لتطريز يعبر عن ذوقكم الرفيع.
                </p>

                <button
                  onClick={() => navigateTo('order')}
                  className="bg-gradient-to-r from-[#3DB7B5] to-[#2F8F8B] hover:opacity-95 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all cursor-pointer inline-block"
                >
                  اطلب تطريزك الآن
                </button>
              </div>
            </section>

            {/* 📜 About Brief matching original index.html */}
            <section className="relative max-w-3xl mx-auto my-20 sm:my-28 text-center px-6 py-14 bg-[#F3F9F8] rounded-[35px] shadow-sm border border-[#5C3D48]/5">
              <h2 className="text-[#5C3D48] text-3xl sm:text-4xl font-extrabold mb-2">
                لماذا تختار النرجس؟
              </h2>
              <div className="w-44 h-1.5 mx-auto my-6 rounded-full bg-gradient-to-r from-[#5C3D48] via-[#3DB7B5] to-[#5C3D48]" />
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                في النرجس، لا نكتفي بالتطريز فقط، بل نختار أجود أنواع الخيوط التي لا تتأثر بالغسيل، ونستخدم تقنيات حديثة تضمن لكم دقة متناهية في التفاصيل، لتبقى ملابسكم مميزة وتدوم طويلاً.
              </p>
            </section>

            {/* 🛠️ Services Preview */}
            <section className="max-w-4xl mx-auto my-20 px-4 sm:px-6">
              <h2 className="text-center text-[#5C3D48] text-3xl sm:text-4xl font-extrabold mb-14">
                أبرز خدماتنا
              </h2>

              <div className="bg-[#F3F9F8] rounded-[35px] p-10 sm:p-14 text-center shadow-sm border border-[#3DB7B5]/10 hover:-translate-y-2 transition-all">
                <div className="w-20 h-20 leading-[80px] text-4xl rounded-full bg-[#5C3D48]/5 mx-auto mb-6">
                  👕
                </div>
                <h3 className="text-2xl font-bold text-[#5C3D48] mb-4">
                  التطريز على ملابسك الخاصة
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                  هل لديك لباس جاهز (قميص، فستان، عباءة، دشداشة) وتريد إضافة لمسة مميزة عليه؟ ارفع تصميمك وسنتولى الباقي.
                </p>
                <button
                  onClick={() => navigateTo('order')}
                  className="inline-block bg-gradient-to-r from-[#3DB7B5] to-[#2F8F8B] text-white font-bold text-sm px-9 py-3 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  اطلب الآن ←
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ===================== SERVICES VIEW ===================== */}
        {activeTab === 'services' && (
          <ServicesSection onOpenOrder={() => navigateTo('order')} />
        )}

        {/* ===================== ORDER VIEW ===================== */}
        {activeTab === 'order' && <MailInBookingSystem />}

        {/* ===================== CONTACT VIEW ===================== */}
        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
