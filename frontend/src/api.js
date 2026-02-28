const API = "http://localhost:8000";

export const getFavorites = async (skip, limit, search, sort) => {
  const params = new URLSearchParams({
    skip,
    limit,
    search: search || "",
    sort,
  });

  const res = await fetch(`${API}/favorites?${params}`);
  return await res.json();
};

export const createFavorite = async (title, description) => {
  const res = await fetch(`${API}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    throw new Error("Ошибка создания");
  }

  return await res.json();
};