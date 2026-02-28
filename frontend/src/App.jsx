import { useEffect, useState } from "react";
import { getFavorites, createFavorite } from "./api";
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import Pagination from "./components/Pagination";
import AddModal from "./components/AddModal";

export default function App() {
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("az");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    load();
  }, [limit, page, search, sort]);

  const load = async () => {
    const data = await getFavorites(
      (page - 1) * limit,
      limit,
      search,
      sort
    );
    setItems(data);
  };

  const handleCreate = async (title, description) => {
    try {
      const newItem = await createFavorite(title, description);
  
      setItems((prev) => [newItem, ...prev]);
  
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-purple-200">

      <div className="p-8 flex-1">
        <Header
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          onAdd={() => setOpen(true)}
        />

        <div className="grid gap-6 mt-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} reload={load} />
          ))}
        </div>
      </div>

      <footer className="p-6 bg-white shadow-inner">
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      </footer>

      {open && <AddModal onClose={() => setOpen(false)} onSave={handleCreate} />}
    </div>
  );
}