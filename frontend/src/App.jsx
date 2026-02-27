export default function App() {
    const [items, setItems] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("az");
  
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
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
        <Header
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />
  
        <div className="grid gap-6 mt-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} reload={load} />
          ))}
        </div>
      </div>
    );
  }