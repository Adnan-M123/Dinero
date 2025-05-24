import Link from 'next/link';

export default function RestaurantCard({ name, image, description }) {
  return (
    <Link href={`/specific-restaurant/${encodeURIComponent(name)}`}>
      <div className="bg-white p-4 mb-2 rounded-xl w-48 text-center shadow-lg hover:scale-105 duration-200 cursor-pointer">
        <img src={image} alt={name} className="w-full h-32 object-cover rounded-lg" />
        <h3 className="mt-2 font-bold">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <button className="mt-3 bg-[#4A503D] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#4A503D] border-1 border-transparent hover:border-[#4A503D] duration-200">
          Book now
        </button>
      </div>
    </Link>
  );
}
