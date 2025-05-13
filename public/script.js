async function searchLyrics() {
  const query = document.getElementById('query').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';

  try {
    const response = await fetch(`/api/lyrics?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      resultsDiv.innerHTML = 'No lyrics found.';
      return;
    }

    resultsDiv.innerHTML = data
      .map(item => `
        <div class="lyrics-item">
          <strong>${item.title}</strong> by ${item.artist}<br>
          <pre>${item.lyrics || '[Lyrics not included in preview]'}</pre>
        </div>
      `)
      .join('');
  } catch (err) {
    resultsDiv.innerHTML = 'Error fetching lyrics.';
  }
}
