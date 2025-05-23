// import React from 'react';
// import Image from 'next/image';

// export default function FoodItem({ item }) {
//   return (
//     <div className="bg-white p-4 rounded-xl w-48 text-center shadow-lg hover:scale-105 duration-200">
//       {/* Image Section */}
//       <div className="relative w-full h-32">
//         <Image
//           src={item.image || '/placeholder.svg'}
//           alt={item.name}
//           fill
//           className="object-cover rounded-lg"
//         />
//       </div>

//       {/* Text Section */}
//       <h3 className="mt-2 font-bold">{item.name}</h3>
//       <p className="text-sm text-gray-600">{item.price} KM</p>
//     </div>
//   );
// }


export default function FoodItem({ name, image, price }) {
  return (
    <div className="bg-white mb-2 rounded-xl w-48 shadow-lg hover:scale-105 duration-200">
      <img src={image} alt={name} className="w-full h-32 object-cover rounded-lg" />
      <h3 className="mt-2 font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{price}</p>
    </div>
  );
}

