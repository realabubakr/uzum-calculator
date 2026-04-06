import { useState } from 'react';
import { Calculator, Package, Box } from 'lucide-react';

type Lang = 'EN' | 'RU' | 'UZ';

const D = {
  EN: {
    title: 'Uzum Calculator',
    subtitle: 'A modern tool to compute volumetric weight and logistics fees.',
    itemSpecs: 'Item Specifications',
    dims: 'Dimensions (mm)',
    length: 'Length',
    width: 'Width',
    height: 'Height',
    learnMeasure: "Don't know how to measure your product? ",
    learnHere: 'Learn here',
    summary: 'Summary',
    exactVolume: 'Exact Volume',
    billedVolume: 'Billed Volume',
    liters: 'Liters',
    logisticsFee: 'Logistics Fee',
    uzs: 'UZS',
    roundingNote: 'Note: Uzum Market rules require rounding any fractional volume up to the next whole number.'
  },
  RU: {
    title: 'Калькулятор Uzum',
    subtitle: 'Современный инструмент для расчета объемного веса и логистических сборов.',
    itemSpecs: 'Характеристики товара',
    dims: 'Размеры (мм)',
    length: 'Длина',
    width: 'Ширина',
    height: 'Высота',
    learnMeasure: 'Не знаете, как измерить свой товар? ',
    learnHere: 'Узнать здесь',
    summary: 'Итог',
    exactVolume: 'Точный объем',
    billedVolume: 'Расчетный объем',
    liters: 'Литры',
    logisticsFee: 'Логистический сбор',
    uzs: 'UZS',
    roundingNote: 'Примечание: по правилам Uzum Market любой дробный объем округляется в большую сторону до целого числа.'
  },
  UZ: {
    title: 'Uzum Kalkulyatori',
    subtitle: "Hajmli vazn va logistika to'lovlarini hisoblash uchun zamonaviy vosita.",
    itemSpecs: 'Mahsulot xususiyatlari',
    dims: "O'lchamlari (mm)",
    length: 'Uzunligi',
    width: 'Kengligi',
    height: 'Balandligi',
    learnMeasure: "Mahsulotingizni qanday o'lchashni bilmaysizmi? ",
    learnHere: 'Shu yerda bilib oling',
    summary: 'Natija',
    exactVolume: 'Aniq hajm',
    billedVolume: 'Hisoblangan hajm',
    liters: 'Litr',
    logisticsFee: "Logistika to'lovi",
    uzs: 'UZS',
    roundingNote: "Eslatma: Uzum Market qoidalariga ko'ra har qanday kasr hajm keyingi butun songacha yaxlitlanadi."
  }
};

export default function App() {
  const [lang, setLang] = useState<Lang>('EN');
  const t = D[lang];

  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  // Calculate Volume in Liters
  const rawVolume = (l * w * h) / 1000000;
  // Rule: any fraction of a liter rounds UP to the next whole number
  const V = Math.ceil(rawVolume);

  // Calculate Logistics Fee
  let logisticsFee = 0;
  if (l > 0 && w > 0 && h > 0) {
    if (V <= 1) {
      logisticsFee = 5250;
    } else {
      logisticsFee = 5250 + ((V - 1) * 250);
    }
    // Cap at 50000
    logisticsFee = Math.min(logisticsFee, 50000);
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 text-slate-900 font-sans relative">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200 z-50">
        {(['UZ', 'RU', 'EN'] as Lang[]).map((lOpt) => (
          <button
            key={lOpt}
            onClick={() => setLang(lOpt)}
            className={`px-3 py-1 text-sm font-bold rounded-md transition-all ${
              lang === lOpt ? 'bg-brand text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lOpt}
          </button>
        ))}
      </div>

      <div className="max-w-6xl w-full mx-auto pb-20 mt-12 md:mt-0">
        {/* Header */}
        <div className="mb-10 text-center md:text-left text-brand pt-4">
          <div className="inline-flex items-center gap-3 mb-3">
             <Calculator size={36} className="text-brandLight" />
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand">{t.title}</h1>
          </div>
          <p className="text-slate-700 font-medium text-lg max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-8 pb-3 border-b border-slate-200">
                 <Package size={24} className="text-brandLight" />
                 <h2 className="text-2xl font-bold text-slate-900">{t.itemSpecs}</h2>
              </div>
              
              {/* Dimensions Section */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-900 block mb-1">
                  {t.dims}
                </label>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder={t.length}
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-all text-slate-900 font-medium placeholder-slate-500 shadow-inner"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium font-mono">mm</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder={t.width}
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-all text-slate-900 font-medium placeholder-slate-500 shadow-inner"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium font-mono">mm</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder={t.height}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-all text-slate-900 font-medium placeholder-slate-500 shadow-inner"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium font-mono">mm</span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-slate-600">
                  {t.learnMeasure}
                  <a href="https://t.me/MarketplaceUzum/1979" target="_blank" rel="noreferrer" className="text-brandLight font-semibold hover:underline">
                    [{t.learnHere}]
                  </a>
                </div>
                 
              </div>
            </div>
          </div>

          {/* Right Column: Results sticky */}
          <div className="lg:col-span-1 sticky top-8 z-20">
            <div className="rounded-3xl p-6 md:p-8 bg-brand border border-brandLight shadow-2xl overflow-hidden relative">
              {/* Background gradient flourish */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brandLight/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-brandLight/30">
                  <h2 className="text-xl font-bold text-white tracking-wide">{t.summary}</h2>
                  <Box className="text-brandLight opacity-80" size={20} />
                </div>
                
                {/* Highlights */}
                <div className="space-y-6">
                  
                  {/* Exact Volume */}
                  <div>
                    <div className="text-sm font-medium text-brandLight mb-1 uppercase tracking-wider">{t.exactVolume}</div>
                    <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                      {rawVolume.toFixed(3).replace(/\.?0+$/, '') || '0'} <span className="text-sm font-medium text-brandLight/90 ml-1">{t.liters}</span>
                    </div>
                  </div>

                  {/* Billed Volume */}
                  <div>
                    <div className="text-sm font-medium text-brandLight mb-1 uppercase tracking-wider">{t.billedVolume}</div>
                    <div className="text-4xl font-extrabold text-white flex items-baseline gap-1">
                      {V} <span className="text-lg font-medium text-brandLight/90 capitalize ml-1">{t.liters}</span>
                    </div>
                    <p className="text-xs text-brandLight/80 italic mt-2 leading-relaxed bg-black/10 p-2 rounded-lg border border-brandLight/20">
                      {t.roundingNote}
                    </p>
                  </div>
                  
                  {/* Logistics Fee */}
                  <div className="pt-6 border-t border-brandLight/30">
                    <div className="text-sm font-medium text-brandLight mb-1 uppercase tracking-wider">{t.logisticsFee}</div>
                    <div className="text-3xl font-extrabold text-white flex items-baseline gap-1">
                      {logisticsFee.toLocaleString()} <span className="text-base font-bold text-brandLight/90 ml-1">{t.uzs}</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
