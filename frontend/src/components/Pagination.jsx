export default function Pagination({ page, setPage, limit, setLimit }) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
  
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-full disabled:opacity-50"
          >
            Назад
          </button>
  
          <span className="px-4 py-2 bg-white rounded-full shadow">
            Страница {page}
          </span>
  
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-full"
          >
            Вперёд
          </button>
        </div>
  
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="px-4 py-2 rounded-full border"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    );
  }