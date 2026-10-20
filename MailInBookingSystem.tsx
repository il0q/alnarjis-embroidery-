import React, { useState } from 'react';
import { MailInOrder } from '../types/embroidery';
import {
  Package,
  Truck,
  Send,
  Printer,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Palette,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MailInBookingSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Garment Details
    garmentTypeChoice: 'دشداشة عمانية',
    garmentTypeCustom: '',
    garmentColorHex: '#FFFFFF',
    garmentColorName: 'أبيض ناصع',
    fabricType: 'قطن فاخر',
    garmentCondition: 'جديدة تماماً',
    specialCare: '',
    uploadedGarmentPhoto: '',

    // Step 2: Embroidery Details
    embroideryText: '',
    threadColorHex: '#D4AF37',
    threadColorName: 'ذهبي',
    positionChoice: 'جيب الصدر الأيسر',
    positionCustom: '',
    sizeChoice: 'صغير (5 × 3 سم)',
    sizeCustom: '',
    uploadedDesignLogo: '',

    // Step 3: Logistics & Address
    fullName: '',
    phone: '',
    governorate: 'محافظة مسقط',
    wilayat: 'ولاية السيب',
    streetAddress: '',
    shippingCarrier: 'dalilee' as 'dalilee' | 'oman_post' | 'home_pickup' | 'muscat_hub',
    speed: 'standard' as 'standard' | 'express_48h',
  });

  const [orderCreated, setOrderCreated] = useState<MailInOrder | null>(null);

  // Transparent Pricing Calculation
  const baseEmbroideryPrice = 6.0; // OMR
  const speedSurcharge = formData.speed === 'express_48h' ? 3.0 : 0.0;
  const shippingFee =
    formData.shippingCarrier === 'muscat_hub'
      ? 0.0
      : formData.shippingCarrier === 'home_pickup'
      ? 2.5
      : 2.0;

  const totalEstimate = baseEmbroideryPrice + speedSurcharge + shippingFee;

  // Handle Photo Upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'uploadedGarmentPhoto' | 'uploadedDesignLogo'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({
          ...prev,
          [field]: uploadEvent.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Order
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('يرجى كتابة الاسم ورقم الهاتف للتواصل معك');
      return;
    }

    const finalGarmentType =
      formData.garmentTypeChoice === 'شيء آخر (اكتب بنفسك)'
        ? formData.garmentTypeCustom || 'قطعة مخصصة'
        : formData.garmentTypeChoice;

    const finalPosition =
      formData.positionChoice === 'موضع آخر (اكتب بنفسك)'
        ? formData.positionCustom || 'موضع مخصص'
        : formData.positionChoice;

    const finalSize =
      formData.sizeChoice === 'مقاس آخر (اكتب بنفسك)'
        ? formData.sizeCustom || 'مقاس مخصص'
        : formData.sizeChoice;

    const orderId = `NARJIS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: MailInOrder = {
      orderId,
      customerName: formData.fullName,
      customerPhone: formData.phone,
      city: formData.governorate,
      state: formData.wilayat,
      addressDetails: formData.streetAddress,
      garmentCategory: finalGarmentType,
      garmentColor: `${formData.garmentColorName} (${formData.garmentColorHex})`,
      fabricType: formData.fabricType,
      garmentCondition: formData.garmentCondition,
      specialInstructions: formData.specialCare,
      embroideryText: formData.embroideryText || 'حسب التصميم المرفق',
      threadColor: formData.threadColorName,
      threadColorHex: formData.threadColorHex,
      embroideryPosition: finalPosition,
      embroideryDimensions: finalSize,
      shippingCarrier: formData.shippingCarrier,
      turnaroundSpeed: formData.speed,
      estimatedCost: totalEstimate,
      createdAt: new Date().toLocaleDateString('ar-OM'),
      uploadedGarmentPhoto: formData.uploadedGarmentPhoto,
      uploadedDesignLogo: formData.uploadedDesignLogo,
    };

    setOrderCreated(newOrder);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3DB7B5', '#2F8F8B', '#5C3D48'],
    });
  };

  // WhatsApp Link Builder
  const getWhatsAppLink = (order: MailInOrder) => {
    const carrierName =
      order.shippingCarrier === 'dalilee'
        ? 'شركة دليلي للتوصيل (Dalilee)'
        : order.shippingCarrier === 'oman_post'
        ? 'بريد عُمان (Oman Post Asyad)'
        : order.shippingCarrier === 'home_pickup'
        ? 'مندوب النرجس الخاص (مسقط وضواحيها)'
        : 'تسليم يدوي في مشغل النرجس';

    const message = `مرحباً النرجس للتطريز 🌸
أود تأكيد طلب تطريز على ملابسي الخاصة:
🏷️ رقم الطلب: ${order.orderId}
👤 الاسم: ${order.customerName}
📱 الهاتف: ${order.customerPhone}
📍 العنوان: ${order.city} - ${order.state}
👕 نوع القطعة: ${order.garmentCategory}
🎨 لون القطعة: ${order.garmentColor}
🧵 نص التطريز: ${order.embroideryText}
🎨 لون الخيط: ${order.threadColor} (${order.threadColorHex})
📍 موضع التطريز: ${order.embroideryPosition} (${order.embroideryDimensions})
🚚 وسيلة الإرسال: ${carrierName}
⚡ سرعة الإنجاز: ${
      order.turnaroundSpeed === 'express_48h'
        ? 'VIP فوري (خلال 48 ساعة)'
        : 'إنجاز عادي متقن (3 - 5 أيام عمل)'
    }
💰 التكلفة المقدرة: ${order.estimatedCost.toFixed(2)} ر.ع

يرجى تزويدي ببوليصة الشحن وتأكيد تفاصيل الإرسال. شكراً لكم!`;

    return `https://api.whatsapp.com/send?phone=96892908668&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5C3D48] mb-3">
          استمارة طلب التطريز
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#5C3D48] via-[#3DB7B5] to-[#2F8F8B] mx-auto my-3 rounded-full" />
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          يرجى ملء البيانات التالية بدقة، وسيتواصل معك فريق النرجس فوراً لتأكيد تفاصيل القطعة والشحن
        </p>
      </div>

      {/* Stepper Header */}
      {!orderCreated && (
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 right-0 h-1 bg-[#3DB7B5] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { step: 1, title: 'الملابس المرسلة', icon: Package },
            { step: 2, title: 'تفاصيل التطريز', icon: Palette },
            { step: 3, title: 'الشحن والتوصيل', icon: Truck },
            { step: 4, title: 'المراجعة والتأكيد', icon: CheckCircle2 },
          ].map((item) => {
            const Icon = item.icon;
            const isDone = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            return (
              <div
                key={item.step}
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={() => {
                  if (item.step < currentStep) setCurrentStep(item.step);
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                    isDone
                      ? 'bg-[#2F8F8B] text-white'
                      : isCurrent
                      ? 'bg-[#5C3D48] text-white ring-4 ring-[#3DB7B5]/30'
                      : 'bg-white text-gray-400 border border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-xs mt-2 font-bold ${
                    isCurrent ? 'text-[#5C3D48]' : 'text-gray-500'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Step Content */}
      {!orderCreated ? (
        <div className="bg-[#F3F9F8] rounded-[35px] p-6 sm:p-10 shadow-sm border border-[#3DB7B5]/15">
          {/* ================= STEP 1: Garment Information ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-[#5C3D48]">الخطوة 1: مواصفات قطعة الملابس</h3>
                <p className="text-xs text-gray-500 mt-1">حدد نوع القطعة وخامتها لتجهيز خيوط التطريز المناسبة لها</p>
              </div>

              {/* Garment Type with Options + Custom write-in */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">نوع القطعة:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-2">
                  {[
                    'دشداشة عمانية',
                    'عباءة نسائية',
                    'قميص رسمي',
                    'بشت / مشلح',
                    'ملابس أطفال / مفرش',
                    'شيء آخر (اكتب بنفسك)',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, garmentTypeChoice: type })}
                      className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        formData.garmentTypeChoice === type
                          ? 'bg-[#5C3D48] text-white border-[#5C3D48] shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Write-in field if "شيء آخر" is selected */}
                {formData.garmentTypeChoice === 'شيء آخر (اكتب بنفسك)' && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={formData.garmentTypeCustom}
                      onChange={(e) => setFormData({ ...formData, garmentTypeCustom: e.target.value })}
                      placeholder="اكتب هنا نوع القطعة (مثلاً: جاكيت صوف، شيلة حرير، مفرش طاولة...)"
                      className="w-full bg-white border border-[#3DB7B5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DB7B5]/30"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Garment Color Selection via Color Wheel (دائرة الألوان) */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  اختر لون قطعة الملابس من دائرة الألوان:
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.garmentColorHex}
                      onChange={(e) => setFormData({ ...formData, garmentColorHex: e.target.value })}
                      className="w-14 h-14 rounded-2xl cursor-pointer border-2 border-gray-200 p-1 shadow-sm"
                      title="اضغط لاختيار أي لون من دائرة الألوان"
                    />
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">كود اللون:</span>
                      <span className="font-mono text-sm font-bold text-gray-800">
                        {formData.garmentColorHex}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={formData.garmentColorName}
                      onChange={(e) => setFormData({ ...formData, garmentColorName: e.target.value })}
                      placeholder="وصف اللون (مثال: أبيض ناصع، كحلي داكن، بيج رملي...)"
                      className="w-full bg-[#FAF9F6] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3DB7B5]"
                    />
                  </div>
                </div>
              </div>

              {/* Fabric & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">نوع القماش (الخامة):</label>
                  <input
                    type="text"
                    value={formData.fabricType}
                    onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })}
                    placeholder="مثال: قطن، كريب، مخمل، كتان..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">حالة القطعة:</label>
                  <select
                    value={formData.garmentCondition}
                    onChange={(e) => setFormData({ ...formData, garmentCondition: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                  >
                    <option value="جديدة تماماً (غير مستعملة)">جديدة تماماً (غير مستعملة وببطاقتها)</option>
                    <option value="مستعملة بحالة ممتازة ونظيفة">مستعملة بحالة ممتازة ونظيفة</option>
                    <option value="قطعة مفصلة حديثاً">قطعة مفصلة حديثاً من الخياط</option>
                  </select>
                </div>
              </div>

              {/* Upload photo of customer garment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ارفع صورة لقطعتك (إن وجدت):
                </label>
                <div className="border-2 border-dashed border-gray-200 hover:border-[#3DB7B5] rounded-2xl p-4 text-center bg-white cursor-pointer transition-colors">
                  <input
                    type="file"
                    id="garment-upload"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'uploadedGarmentPhoto')}
                    className="hidden"
                  />
                  <label htmlFor="garment-upload" className="cursor-pointer block">
                    {formData.uploadedGarmentPhoto ? (
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={formData.uploadedGarmentPhoto}
                          alt="Garment Preview"
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                        <span className="text-xs font-bold text-emerald-600">
                          تم إرفاق صورة القطعة (اضغط للتغيير)
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs font-bold text-gray-600 block">
                          اضغط لاختيار صورة لملابسك
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ملاحظات أو محاذير خاصة بالقطعة:
                </label>
                <textarea
                  rows={2}
                  value={formData.specialCare}
                  onChange={(e) => setFormData({ ...formData, specialCare: e.target.value })}
                  placeholder="اكتب هنا أي تعليمات ترغب في مراعاتها أثناء الغسيل أو الكي..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3DB7B5]"
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 bg-[#2F8F8B] hover:bg-[#3DB7B5] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>التالي: تفاصيل التطريز</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Embroidery Details ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-[#5C3D48]">الخطوة 2: مواصفات التطريز</h3>
                <p className="text-xs text-gray-500 mt-1">اكتب الاسم أو العبارة واختر لون الخيط من دائرة الألوان وموضع التطريز</p>
              </div>

              {/* Embroidery Text */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  الاسم أو العبارة أو الشعار المراد تطريزه:
                </label>
                <input
                  type="text"
                  value={formData.embroideryText}
                  onChange={(e) => setFormData({ ...formData, embroideryText: e.target.value })}
                  placeholder="اكتب الاسم أو العبارة هنا (مثال: حمدان، أصالة، مبروك التخرج...)"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                />
              </div>

              {/* Thread Color from Color Wheel (دائرة الألوان) */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  اختر لون الخيط المفضل من دائرة الألوان:
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.threadColorHex}
                      onChange={(e) => setFormData({ ...formData, threadColorHex: e.target.value })}
                      className="w-14 h-14 rounded-2xl cursor-pointer border-2 border-gray-200 p-1 shadow-sm"
                      title="اضغط لاختيار أي لون خيط من دائرة الألوان"
                    />
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">كود اللون:</span>
                      <span className="font-mono text-sm font-bold text-gray-800">
                        {formData.threadColorHex}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={formData.threadColorName}
                      onChange={(e) => setFormData({ ...formData, threadColorName: e.target.value })}
                      placeholder="اسم لون الخيط المفضل (مثال: ذهبي، أبيض، فضي، كحلي، عنابي...)"
                      className="w-full bg-[#FAF9F6] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3DB7B5]"
                    />
                  </div>
                </div>
              </div>

              {/* Position with Options + Write-in */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  موضع التطريز على القطعة:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-2">
                  {[
                    'جيب الصدر الأيسر',
                    'الياقة الدائرية / الرقبة',
                    'منتصف الصدر',
                    'أطراف الأكمام',
                    'أعلى الظهر',
                    'موضع آخر (اكتب بنفسك)',
                  ].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setFormData({ ...formData, positionChoice: pos })}
                      className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        formData.positionChoice === pos
                          ? 'bg-[#5C3D48] text-white border-[#5C3D48] shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>

                {formData.positionChoice === 'موضع آخر (اكتب بنفسك)' && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={formData.positionCustom}
                      onChange={(e) => setFormData({ ...formData, positionCustom: e.target.value })}
                      placeholder="اكتب موضع التطريز بالتحديد (مثلاً: أسفل الفستان، طرف الطرحة، المعصم الأيمن...)"
                      className="w-full bg-white border border-[#3DB7B5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DB7B5]/30"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Dimensions / Size with Options + Write-in */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  الحجم التقريبي للتطريز:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2">
                  {[
                    'صغير (5 × 3 سم)',
                    'متوسط (10 × 6 سم)',
                    'كبير (18 × 12 سم)',
                    'مقاس آخر (اكتب بنفسك)',
                  ].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData({ ...formData, sizeChoice: size })}
                      className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        formData.sizeChoice === size
                          ? 'bg-[#5C3D48] text-white border-[#5C3D48] shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {formData.sizeChoice === 'مقاس آخر (اكتب بنفسك)' && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={formData.sizeCustom}
                      onChange={(e) => setFormData({ ...formData, sizeCustom: e.target.value })}
                      placeholder="اكتب المقاس المطلوب بالسنتيمتر (مثلاً: 12 × 4 سم)"
                      className="w-full bg-white border border-[#3DB7B5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DB7B5]/30"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Upload custom design / logo photo */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  صورة تصميم التطريز أو الشعار (إن وجدت):
                </label>
                <div className="border-2 border-dashed border-gray-200 hover:border-[#3DB7B5] rounded-2xl p-4 text-center bg-white cursor-pointer transition-colors">
                  <input
                    type="file"
                    id="design-upload"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'uploadedDesignLogo')}
                    className="hidden"
                  />
                  <label htmlFor="design-upload" className="cursor-pointer block">
                    {formData.uploadedDesignLogo ? (
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={formData.uploadedDesignLogo}
                          alt="Design Preview"
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                        <span className="text-xs font-bold text-emerald-600">
                          تم إرفاق صورة التصميم (اضغط للتغيير)
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs font-bold text-gray-600 block">
                          ارفع صورة التصميم هنا (إن وجدت)
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-5 py-3 rounded-full font-bold text-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 bg-[#2F8F8B] hover:bg-[#3DB7B5] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>التالي: الشحن والتوصيل</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Logistics & Address ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-[#5C3D48]">الخطوة 3: طريقة إرسال واسترجاع الملابس</h3>
                <p className="text-xs text-gray-500 mt-1">اختر شركة الشحن المناسبة لك وعنوان الاستلام</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">الاسم الكريم:</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="اكتب اسمك الكامل هنا"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    رقم الهاتف (واتساب):
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="مثال: 968XXXXXXXX"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">المحافظة:</label>
                  <select
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                  >
                    <option value="محافظة مسقط">محافظة مسقط</option>
                    <option value="محافظة شمال الباطنة">محافظة شمال الباطنة</option>
                    <option value="محافظة جنوب الباطنة">محافظة جنوب الباطنة</option>
                    <option value="محافظة الداخلية">محافظة الداخلية</option>
                    <option value="محافظة ظفار">محافظة ظفار</option>
                    <option value="محافظة الظاهرة">محافظة الظاهرة</option>
                    <option value="محافظة الشرقية">محافظة الشرقية</option>
                    <option value="شحن خليجي (دولي)">شحن خليجي (الإمارات / السعودية / قطر / الكويت / البحرين)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">الولاية والحي:</label>
                  <input
                    type="text"
                    value={formData.wilayat}
                    onChange={(e) => setFormData({ ...formData, wilayat: e.target.value })}
                    placeholder="مثال: ولاية السيب - الحيل الجنوبية"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3DB7B5]"
                  />
                </div>
              </div>

              {/* Carriers: EXACT text & fees matching user specification */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2.5">
                  طريقة إرسال واسترجاع الملابس:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'dalilee',
                      name: 'شركة دليلي للتوصيل (Dalilee)',
                      fee: '2.00 ر.ع',
                      desc: 'مندوب يتواصل معك ويستلم الطرد من منزلك ويوصله إلى المشغل ويعيده إليك',
                    },
                    {
                      id: 'oman_post',
                      name: 'بريد عُمان (Oman Post Asyad)',
                      fee: '2.00 ر.ع',
                      desc: 'إيداع الطرد في أقرب مكتب بريد باستخدام كود الحجز',
                    },
                    {
                      id: 'home_pickup',
                      name: 'مندوب النرجس الخاص (مسقط وضواحيها)',
                      fee: '2.50 ر.ع',
                      desc: 'خدمة سريعة من الباب إلى الباب مع فحص القطعة عند الاستلام',
                    },
                    {
                      id: 'muscat_hub',
                      name: 'تسليم يدوي في مشغل النرجس',
                      fee: 'مجاناً 0.00 ر.ع',
                      desc: 'تسليم واستلام القطعة بنفسك من فرعنا بمسقط مجاناً',
                    },
                  ].map((carrier) => (
                    <div
                      key={carrier.id}
                      onClick={() =>
                        setFormData({ ...formData, shippingCarrier: carrier.id as any })
                      }
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.shippingCarrier === carrier.id
                          ? 'border-[#3DB7B5] bg-white ring-2 ring-[#3DB7B5]/40 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-[#5C3D48]">{carrier.name}</span>
                        <span className="text-xs font-black text-[#2F8F8B]">{carrier.fee}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{carrier.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnaround: EXACT text matching user fix */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">سرعة الإنجاز والتنفيذ:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, speed: 'standard' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.speed === 'standard'
                        ? 'border-[#3DB7B5] bg-white ring-2 ring-[#3DB7B5]/30'
                        : 'border-gray-200 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">إنجاز عادي متقن (3 - 5 أيام عمل)</span>
                      <span className="font-bold text-emerald-700">مشمول مجاناً</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, speed: 'express_48h' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.speed === 'express_48h'
                        ? 'border-amber-400 bg-white ring-2 ring-amber-300'
                        : 'border-gray-200 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-900">VIP فوري مستعجل (خلال 48 ساعة)</span>
                      <span className="font-bold text-amber-700">+3.00 ر.ع</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-5 py-3 rounded-full font-bold text-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 bg-[#2F8F8B] hover:bg-[#3DB7B5] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>التالي: مراجعة الطلب</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: Order Review & Confirmation ================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-[#5C3D48]">الخطوة 4: مراجعة الطلب وتأكيده</h3>
                <p className="text-xs text-gray-500 mt-1">تأكد من صحة بياناتك قبل إرسال الطلب للنرجس</p>
              </div>

              {/* Review summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 text-xs space-y-2">
                  <div className="font-bold text-[#5C3D48] text-sm border-b pb-1">
                    بيانات القطعة والتطريز:
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">نوع القطعة:</span>
                    <span className="font-bold text-gray-800">
                      {formData.garmentTypeChoice === 'شيء آخر (اكتب بنفسك)'
                        ? formData.garmentTypeCustom || 'مخصصة'
                        : formData.garmentTypeChoice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">لون القطعة:</span>
                    <span className="flex items-center gap-1.5 font-bold text-gray-800">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: formData.garmentColorHex }}
                      />
                      {formData.garmentColorName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">نص التطريز:</span>
                    <span className="font-bold text-[#2F8F8B]">
                      {formData.embroideryText || 'حسب التصميم المرفق'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">لون الخيط:</span>
                    <span className="flex items-center gap-1.5 font-bold text-gray-800">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: formData.threadColorHex }}
                      />
                      {formData.threadColorName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الموضع والمقاس:</span>
                    <span className="font-semibold text-gray-800">
                      {formData.positionChoice === 'موضع آخر (اكتب بنفسك)'
                        ? formData.positionCustom
                        : formData.positionChoice}{' '}
                      (
                      {formData.sizeChoice === 'مقاس آخر (اكتب بنفسك)'
                        ? formData.sizeCustom
                        : formData.sizeChoice}
                      )
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 text-xs space-y-2">
                  <div className="font-bold text-[#5C3D48] text-sm border-b pb-1">
                    بيانات الشحن والاستلام:
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الاسم:</span>
                    <span className="font-bold text-gray-800">{formData.fullName || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الهاتف:</span>
                    <span className="font-bold text-gray-800">{formData.phone || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المحافظة والولاية:</span>
                    <span className="font-semibold text-gray-800">
                      {formData.governorate} - {formData.wilayat}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">شركة الشحن:</span>
                    <span className="font-semibold text-gray-800">
                      {formData.shippingCarrier === 'dalilee'
                        ? 'شركة دليلي للتوصيل'
                        : formData.shippingCarrier === 'oman_post'
                        ? 'بريد عمان'
                        : formData.shippingCarrier === 'home_pickup'
                        ? 'مندوب النرجس الخاص'
                        : 'تسليم في مشغل النرجس'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">سرعة الإنجاز:</span>
                    <span className="font-bold text-emerald-700">
                      {formData.speed === 'express_48h'
                        ? 'VIP مستعجل (48 ساعة)'
                        : 'إنجاز عادي متقن (3 - 5 أيام عمل)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-[#3DB7B5]/30">
                <h4 className="font-bold text-sm text-[#5C3D48] mb-3">حساب التكلفة التقديرية:</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>التطريز الآلي المتقن:</span>
                    <span className="font-bold text-gray-800">{baseEmbroideryPrice.toFixed(2)} ر.ع</span>
                  </div>
                  {speedSurcharge > 0 && (
                    <div className="flex justify-between text-amber-800">
                      <span>رسوم خدمة VIP مستعجلة (48 ساعة):</span>
                      <span className="font-bold">+{speedSurcharge.toFixed(2)} ر.ع</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>رسوم التوصيل والاسترجاع:</span>
                    <span className="font-bold text-gray-800">
                      {shippingFee === 0 ? 'مجاناً' : `+${shippingFee.toFixed(2)} ر.ع`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2.5 mt-2 flex justify-between items-center text-sm font-extrabold text-[#5C3D48]">
                    <span>الإجمالي التقديري:</span>
                    <span className="text-xl text-[#2F8F8B]">{totalEstimate.toFixed(2)} ر.ع</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-5 py-3 rounded-full font-bold text-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>تعديل العنوان</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#2F8F8B] to-[#3DB7B5] hover:opacity-95 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-xl transition-transform hover:scale-105 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>إرسال الطلب إلى النرجس</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Order Confirmed Screen */
        <div className="bg-[#F3F9F8] rounded-[35px] p-8 sm:p-12 shadow-sm border border-[#3DB7B5]/30 text-center space-y-6">
          <div className="w-16 h-16 bg-[#3DB7B5]/20 text-[#2F8F8B] rounded-full flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5C3D48]">
              تم تسجيل طلبك بنجاح!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2">
              شكراً لثقتك بالنرجس للتطريز. رقم طلبك هو: <b>{orderCreated.orderId}</b>
            </p>
          </div>

          {/* Printable Packing Slip */}
          <div className="max-w-md mx-auto p-5 bg-white border-2 border-dashed border-[#3DB7B5]/40 rounded-2xl text-right text-xs space-y-2 shadow-sm">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-extrabold text-[#5C3D48] text-sm">بوليصة إرسال طرد النرجس</span>
              <span className="font-mono text-gray-500">{orderCreated.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">العميل:</span>
              <span className="font-bold text-gray-800">{orderCreated.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">الهاتف:</span>
              <span className="font-mono text-gray-800">{orderCreated.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">القطعة ولونها:</span>
              <span className="font-bold text-[#5C3D48]">
                {orderCreated.garmentCategory} ({orderCreated.garmentColor})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">التطريز ولون الخيط:</span>
              <span className="font-bold text-[#2F8F8B]">
                {orderCreated.embroideryText} - خيط {orderCreated.threadColor}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center text-sm font-extrabold">
              <span className="text-gray-700">التكلفة التقديرية:</span>
              <span className="text-[#2F8F8B]">{orderCreated.estimatedCost.toFixed(2)} ر.ع</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a
              href={getWhatsAppLink(orderCreated)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md transition-transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الطلب عبر الواتساب فوراً</span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-6 py-3.5 rounded-full font-bold text-sm border border-gray-200 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة البوليصة</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOrderCreated(null);
                setCurrentStep(1);
              }}
              className="text-xs text-gray-500 hover:text-gray-800 underline py-2 cursor-pointer"
            >
              تسجيل طلب آخر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
