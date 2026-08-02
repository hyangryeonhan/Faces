async function loadPosts() {
  const gallery = document.getElementById('gallery');

  try {
    const res = await fetch('posts.json');
    const posts = await res.json();

    if (!posts.length) {
      gallery.innerHTML = '<p class="empty-state">아직 남긴 기록이 없습니다.</p>';
      return;
    }

    const sorted = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    gallery.innerHTML = sorted.map(post => `
      <a class="frame-link" href="post.html?id=${post.id}">
        <div class="frame">
          <img src="${post.photo}" alt="${post.title}" loading="lazy" />
        </div>
        <p class="frame-title">${post.title}</p>
      </a>
    `).join('');
  } catch (err) {
    gallery.innerHTML = '<p class="empty-state">기록을 불러오지 못했습니다.</p>';
    console.error(err);
  }
}

loadPosts();
