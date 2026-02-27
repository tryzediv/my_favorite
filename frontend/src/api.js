const API = "http://localhost:8000";

export const getFavorites = async (skip, limit, search, sort) => {
  const params = new URLSearchParams({
    skip,
    limit,
    search: search || "",
    sort,
  });

  const res = await fetch(`${API}/favorites?${params}`);
  return res.json();
};

export const like = (id) =>
  fetch(`${API}/favorites/${id}/like`, { method: "POST" });

export const dislike = (id) =>
  fetch(`${API}/favorites/${id}/dislike`, { method: "POST" });