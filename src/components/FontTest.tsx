import React from 'react';

const FontTest = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="mb-6">Inter Font Testi - H1 Başlık</h1>
      <h2 className="mb-6">Inter Font Testi - H2 Başlık</h2>
      <h3 className="mb-6">Inter Font Testi - H3 Başlık</h3>
      <h4 className="mb-6">Inter Font Testi - H4 Başlık</h4>
      <h5 className="mb-6">Inter Font Testi - H5 Başlık</h5>
      <h6 className="mb-6">Inter Font Testi - H6 Başlık</h6>
      
      <div className="mt-12">
        <p className="mb-4 font-light">Bu bir light (300) ağırlıklı paragraf metnidir.</p>
        <p className="mb-4 font-normal">Bu bir normal (400) ağırlıklı paragraf metnidir.</p>
        <p className="mb-4 font-medium">Bu bir medium (500) ağırlıklı paragraf metnidir.</p>
        <p className="mb-4 font-semibold">Bu bir semibold (600) ağırlıklı paragraf metnidir.</p>
        <p className="mb-4 font-bold">Bu bir bold (700) ağırlıklı paragraf metnidir.</p>
      </div>
      
      <div className="mt-12">
        <p className="text-xs mb-2">Extra Small (12px) metin</p>
        <p className="text-sm mb-2">Small (14px) metin</p>
        <p className="text-base mb-2">Base (16px) metin</p>
        <p className="text-lg mb-2">Large (18px) metin</p>
        <p className="text-xl mb-2">Extra Large (20px) metin</p>
        <p className="text-2xl mb-2">2XL (24px) metin</p>
        <p className="text-3xl mb-2">3XL (30px) metin</p>
        <p className="text-4xl mb-2">4XL (36px) metin</p>
      </div>
    </div>
  );
};

export default FontTest; 