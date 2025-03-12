import React from 'react';
import PropertyCardMini from './PropertyCardMini';
import property1 from '../../../public/images/property1.webp';
import property2 from '../../../public/images/property2.jpg';
import property3 from '../../../public/images/property3.webp';
import property4 from '../../../public/images/property4.webp';

const PropertyCardMiniExample: React.FC = () => {
  // Convert StaticImageData to string URLs
  const imageUrls = [
    property1.src,
    property2.src,
    property3.src,
    property4.src,
  ];

  // Example property data
  const propertyData = {
    images: imageUrls,
    title: 'Gürsel Mahallesi\'nde Metrobüse ve Herşeye yakın, benzersiz Satılık Çatı katı',
    location: 'İstanbul Avrupa / Kağıthane / Gürsel Mah.',
    price: 8900000,
    originalPrice: 9900000,
    isDiscounted: true,
    detail: {
      status: 'Satılık',
      roomCount: "3+1",
      totalM2: "120 m2",
      shareCount: 10,
      isFavorite: true,
    },
  };

  return (
    <div className="px-2 py-10">
      <PropertyCardMini 
        images={propertyData.images}
        title={propertyData.title}
        location={propertyData.location}
        price={propertyData.price}
        originalPrice={propertyData.originalPrice}
        isDiscounted={propertyData.isDiscounted}
        detail={propertyData.detail}
      />
    </div>
  );
};

export default PropertyCardMiniExample; 