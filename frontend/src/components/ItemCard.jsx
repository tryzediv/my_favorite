import { like, dislike } from "../api";

export default function ItemCard({ item, reload }) {
  const rating = item.likes - item.dislikes;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 transition duration-300 hover:scale-200 hover:shadow-xl">
      <h2 className="text-xl font-bold text-indigo-700">
        {item.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {item.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Рейтинг: {rating}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => { like(item.id).then(reload); }}
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            👍 {item.likes}
          </button>

          <button
            onClick={() => { dislike(item.id).then(reload); }}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            👎 {item.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
}