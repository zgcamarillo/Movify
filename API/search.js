// api/search.js
export default async function handler(req, res) {
  const token = process.env.TMDB_TOKEN;
  if (!token) return res.status(500).json({ error: "TMDB token not set!" });

  try {
    const query = req.query.q || '';
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data.results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'TMDB request failed' });
  }
}
