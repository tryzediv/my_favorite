export default function Header({ search, setSearch, sort, setSort, onAdd }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-4 justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold text-indigo-700">
          My Favorite
        </h1>
        <p className="text-gray-500">
          Общий список любимых вещей и людей
        </p>
      </div>

      <input
        type="text"
        placeholder="🔍 Быстрый поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-indigo-400 transition"
      />

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="appearance-none px-6 py-2 rounded-full border bg-white pr-10 focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="rating">По рейтингу</option>
        </select>

        <span className="absolute right-3 top-2.5 pointer-events-none text-gray-400">
          ▼
        </span>
      </div>

      <button
        onClick={onAdd}
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition hover:scale-105"
      >
        + Добавить свой вариант
      </button>
    </div>
  );
}