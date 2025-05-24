export default function FoodItem({ name, image, price, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-between h-full transition-transform hover:scale-105 duration-200">
      <img src={image} alt={name} className="w-full h-32 object-cover rounded-lg mb-2" />
      <h3 className="mt-2 font-bold text-lg text-center">{name}</h3>
      <p className="text-xs text-gray-500 text-center mb-2 line-clamp-2">{description}</p>
      <span className="text-[#4A503D] font-bold text-lg mt-auto">{price} KM</span>
    </div>
  );
}

