import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

export default function RestaurantCard({ name, image, description }) {
  const nameRef = useRef(null);
  const [isNameMultiline, setIsNameMultiline] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      const lineHeight = parseFloat(getComputedStyle(nameRef.current).lineHeight);
      const height = nameRef.current.offsetHeight;
      setIsNameMultiline(height > lineHeight * 1.5); // 1.5 to allow for rounding
    }
  }, [name]);

  return (
    <Link href={`/specific-restaurant/${encodeURIComponent(name)}`}>
      <div className="bg-white p-4 mb-2 rounded-xl w-48 text-center shadow-lg hover:scale-105 duration-200 cursor-pointer">
        <img src={image} alt={name} className="w-full h-32 object-cover rounded-lg" />
        <h3 ref={nameRef} className="mt-2 font-bold">{name}</h3>
        <p className={`text-sm text-gray-600 ${isNameMultiline ? 'line-clamp-2' : 'line-clamp-3'}`}>{description}</p>
        <button className="mt-3 bg-[#4A503D] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#4A503D] border-1 border-transparent hover:border-[#4A503D] duration-200">
          Book now
        </button>
      </div>
    </Link>
  );
}
