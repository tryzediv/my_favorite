export default function Header({ search, setSearch, sort, setSort }) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-4 justify-between items-center transition">
        
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            My Favorite
          </h1>
          <p className="text-gray-500">
            Лучшие вещи и люди по мнению пользователей
          </p>
        </div>
  
        <input
          type="text"
          placeholder="🔍 Быстрый поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-indigo-400 transition"
        />
  
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>
    );
  }