async function searchLyrics() {
  const query = document.getElementById('query').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Loading...';

  if (!query) {
    resultsDiv.innerHTML = 'Please enter a search query.';
    return;
  }

  try {
    const response = await fetch(`/api/lyrics?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      resultsDiv.innerHTML = 'No results found.';
      return;
    }

    // Show results
    resultsDiv.innerHTML = data
      .map(item => `
        <div class="lyrics-item">
          <strong>${item.title}</strong> by ${item.artist}<br />
          <pre>${item.lyrics || '[Lyrics not available]'}</pre>
        </div>
      `)
      .join('');
  } catch (err) {
    resultsDiv.innerHTML = 'Error fetching lyrics.';
    console.error(err);
  }
}
