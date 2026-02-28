const API =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "http://89.110.103.68:8000";

/* ---------- GET ---------- */
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

/* ---------- CREATE ---------- */
export const createFavorite = async (title, description) => {
  const res = await fetch(`${API}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) throw new Error("Ошибка создания");

  return await res.json();
};

/* ---------- LIKE ---------- */
export const like = async (id) => {
  const res = await fetch(`${API}/favorites/${id}/like`, {
    method: "POST",
  });

  return await res.json();
};

/* ---------- DISLIKE ---------- */
export const dislike = async (id) => {
  const res = await fetch(`${API}/favorites/${id}/dislike`, {
    method: "POST",
  });

  return await res.json();
};