import { useState } from "react";
import { X } from "lucide-react";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const [activeTab, setActiveTab] = useState<"language" | "currency">("language");
  const [isTranslationOn, setIsTranslationOn] = useState(true);

  if (!isOpen) return null;

  const suggestedLanguages = [
    { name: "English", region: "United States" },
    { name: "English", region: "United Kingdom" },
    { name: "Русский", region: "Россия" },
    { name: "Français", region: "Belgique" },
    { name: "Français", region: "Canada" },
  ];

  const allLanguages = [
    { name: "English", region: "India", active: true },
    { name: "Azərbaycan dili", region: "Azərbaycan" },
    { name: "Bahasa Indonesia", region: "Indonesia" },
    { name: "Bosanski", region: "Bosna i Hercegovina" },
    { name: "Català", region: "Espanya" },
    { name: "Čeština", region: "Česká republika" },
    { name: "Crnogorski", region: "Crna Gora" },
    { name: "Dansk", region: "Danmark" },
    { name: "Deutsch", region: "Deutschland" },
    { name: "Deutsch", region: "Österreich" },
    { name: "Deutsch", region: "Schweiz" },
    { name: "Deutsch", region: "Luxemburg" },
    { name: "Eesti", region: "Eesti" },
    { name: "English", region: "Australia" },
    { name: "English", region: "Canada" },
    { name: "English", region: "Guyana" },
    { name: "English", region: "Ireland" },
    { name: "English", region: "New Zealand" },
    { name: "English", region: "Singapore" },
    { name: "English", region: "United Arab Emirates" },
    { name: "Español", region: "Argentina" },
    { name: "Español", region: "Belice" },
    { name: "Español", region: "Bolivia" },
    { name: "Español", region: "Chile" },
    { name: "Español", region: "Colombia" },
    { name: "Español", region: "Costa Rica" },
    { name: "Español", region: "Ecuador" },
    { name: "Español", region: "El Salvador" },
    { name: "Español", region: "España" },
    { name: "Español", region: "Estados Unidos" },
  ];

  const allCurrencies = [
    { name: "Indian rupee", symbol: "INR - ₹", active: true },
    { name: "Australian dollar", symbol: "AUD - $" },
    { name: "Brazilian real", symbol: "BRL - R$" },
    { name: "Bulgarian lev", symbol: "BGN - лв." },
    { name: "Canadian dollar", symbol: "CAD - $" },
    { name: "Chilean peso", symbol: "CLP - $" },
    { name: "Chinese yuan", symbol: "CNY - ￥" },
    { name: "Colombian peso", symbol: "COP - $" },
    { name: "Costa Rican colon", symbol: "CRC - ₡" },
    { name: "Czech koruna", symbol: "CZK - Kč" },
    { name: "Danish krone", symbol: "DKK - kr" },
    { name: "Egyptian pound", symbol: "EGP - ج.م" },
    { name: "Emirati dirham", symbol: "AED - د.إ" },
    { name: "Euro", symbol: "EUR - €" },
    { name: "Ghanaian cedi", symbol: "GHS - GH₵" },
    { name: "Hong Kong dollar", symbol: "HKD - $" },
    { name: "Hungarian forint", symbol: "HUF - Ft" },
    { name: "Indonesian rupiah", symbol: "IDR - Rp" },
    { name: "Israeli new shekel", symbol: "ILS - ₪" },
    { name: "Japanese yen", symbol: "JPY - ¥" },
    { name: "Kazakhstani tenge", symbol: "KZT - ₸" },
    { name: "Kenyan shilling", symbol: "KES - KSh" },
    { name: "Malaysian ringgit", symbol: "MYR - RM" },
    { name: "Mexican peso", symbol: "MXN - $" },
    { name: "Moroccan dirham", symbol: "MAD" },
    { name: "New Taiwan dollar", symbol: "TWD - $" },
    { name: "New Zealand dollar", symbol: "NZD - $" },
    { name: "Norwegian krone", symbol: "NOK - kr" },
    { name: "Peruvian sol", symbol: "PEN - S/" },
    { name: "Philippine peso", symbol: "PHP - ₱" },
    { name: "Polish zloty", symbol: "PLN - zł" },
    { name: "Pound sterling", symbol: "GBP - £" },
    { name: "Qatari riyal", symbol: "QAR - ر.ق" },
    { name: "Romanian leu", symbol: "RON - lei" },
    { name: "Saudi Arabian riyal", symbol: "SAR - SR" },
    { name: "Singapore dollar", symbol: "SGD - $" },
    { name: "South African rand", symbol: "ZAR - R" },
    { name: "South Korean won", symbol: "KRW - ₩" },
    { name: "Swedish krona", symbol: "SEK - kr" },
    { name: "Swiss franc", symbol: "CHF" },
    { name: "Thai baht", symbol: "THB - ฿" },
    { name: "Turkish lira", symbol: "TRY - ₺" },
    { name: "Ugandan shilling", symbol: "UGX - USh" },
    { name: "Ukrainian hryvnia", symbol: "UAH - ₴" },
    { name: "United States dollar", symbol: "USD - $" },
    { name: "Uruguayan peso", symbol: "UYU - $U" },
    { name: "Vietnamese dong", symbol: "VND - ₫" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative flex h-[85vh] w-full max-w-[1032px] flex-col rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex flex-col px-6 pt-5">
          <button 
            onClick={onClose}
            className="mb-6 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-800" />
          </button>
          
          <div className="flex gap-6 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab("language")}
              className={`pb-4 text-sm font-semibold transition-colors ${activeTab === "language" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`}
            >
              Language and region
            </button>
            <button 
              onClick={() => setActiveTab("currency")}
              className={`pb-4 text-sm font-semibold transition-colors ${activeTab === "currency" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`}
            >
              Currency
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          
          {activeTab === "language" ? (
            <>
              {/* Translation Toggle Box */}
              <div className="mb-10 flex items-center justify-between rounded-xl bg-[#F7F7F7] p-6 max-w-[500px]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[15px] font-semibold text-gray-900">Translation</span>
                    {/* Translate Icon svg */}
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '16px', width: '16px', fill: 'currentcolor'}}><path d="M12.94 13.92a2.38 2.38 0 0 1-1.38-.45A4.77 4.77 0 0 1 10 11.83l-.68 1.49a6.04 6.04 0 0 0 1.83 2.05 3.89 3.89 0 0 0 2.21.63h1.56v-1.5h-1.56a.88.88 0 0 1-.42-.08zM9.54 9.17 7.72 5.3a.5.5 0 0 0-.82-.12l-.08.12-1.78 3.87h1.65l.3-.65h1.76l.3.65h1.5zm-2.22-2.02.55 1.17H6.77l.55-1.17zm8.18 5.76-1.5-3.23a.5.5 0 0 0-.41-.28h-.05l-1.5 3.23h1.58l.18-.39h1.36l.18.39h1.66zm-2.19-1.63.38-.81.38.81h-.76zM4.78 4.67H7.5V3.17H4.78V1.5H3.28v1.67H.5v1.5h2.78v2.53a4.01 4.01 0 0 1-1.28 2.6A5.5 5.5 0 0 1 .5 10.66v1.55c.67-.18 1.34-.51 1.95-.98A5.53 5.53 0 0 0 4.78 9v2.53H6.3V4.67H4.78z"></path></svg>
                  </div>
                  <p className="text-[15px] text-gray-500">Automatically translate descriptions and reviews to English.</p>
                </div>
                
                {/* Toggle Switch */}
                <button 
                  onClick={() => setIsTranslationOn(!isTranslationOn)}
                  className={`relative flex h-8 w-12 items-center rounded-full p-1 transition-colors ${isTranslationOn ? 'bg-black' : 'bg-gray-300'}`}
                >
                  <div className={`h-6 w-6 rounded-full bg-white transition-transform ${isTranslationOn ? 'translate-x-4' : 'translate-x-0'}`}>
                    {isTranslationOn && (
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '12px', width: '12px', fill: 'black', margin: '6px'}}><path d="m11.13 28.14-9.67-9.69 2.12-2.12 7.55 7.56 18.59-18.6 2.12 2.12z"></path></svg>
                    )}
                  </div>
                </button>
              </div>

              <div className="mb-12">
                <h2 className="mb-6 text-[22px] font-semibold text-gray-900">Suggested languages and regions</h2>
                <div className="grid grid-cols-5 gap-y-4 gap-x-4">
                  {suggestedLanguages.map((lang, i) => (
                    <button 
                      key={i} 
                      className="flex flex-col items-start rounded-lg p-3 transition-colors hover:bg-gray-50"
                    >
                      <span className="text-[14px] text-gray-900">{lang.name}</span>
                      <span className="text-[14px] text-gray-500">{lang.region}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-[22px] font-semibold text-gray-900">Choose a language and region</h2>
                <div className="grid grid-cols-5 gap-y-4 gap-x-4">
                  {allLanguages.map((lang, i) => (
                    <button 
                      key={i} 
                      className={`flex flex-col items-start rounded-lg p-3 transition-colors ${lang.active ? 'border border-black' : 'hover:bg-gray-50'}`}
                    >
                      <span className="text-[14px] text-gray-900">{lang.name}</span>
                      <span className="text-[14px] text-gray-500">{lang.region}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <h2 className="mb-6 text-[22px] font-semibold text-gray-900">Choose a currency</h2>
              <div className="grid grid-cols-5 gap-y-4 gap-x-4">
                {allCurrencies.map((curr, i) => (
                  <button 
                    key={i} 
                    className={`flex flex-col items-start rounded-lg p-3 transition-colors ${curr.active ? 'border border-black' : 'hover:bg-gray-50'}`}
                  >
                    <span className="text-[14px] text-gray-900">{curr.name}</span>
                    <span className="text-[14px] text-gray-500">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

