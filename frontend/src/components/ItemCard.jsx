import { like, dislike } from "../api";

export default function ItemCard({ item, reload }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 transition hover:scale-105 hover:shadow-xl duration-300">
      <h2 className="text-xl font-bold text-indigo-700">{item.title}</h2>
      <p className="text-gray-600 mt-2">{item.description}</p>

      <div className="flex gap-4 mt-4">
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
  );
}