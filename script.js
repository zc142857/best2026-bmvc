const searchIndex = [
  {
    title: 'Home',
    url: 'index.html',
    summary: 'Workshop overview, venue, topics, and the motivation behind BEST for biomechanics-guided multimodal understanding of human movement.',
    keywords: ['home', 'overview', 'workshop', 'biomechanics', 'movement', 'sports', 'health', 'multimodal']
  },
  {
    title: 'Submission',
    url: 'submission.html',
    summary: 'Paper submission process, formatting guidance, templates, deadlines, registration, and camera-ready instructions.',
    keywords: ['submission', 'paper', 'format', 'template', 'deadline', 'camera-ready', 'registration']
  },
  {
    title: 'Program',
    url: 'program.html',
    summary: 'Detailed workshop schedule, venue directions, and the running order of talks, discussions, and breaks.',
    keywords: ['program', 'schedule', 'venue', 'directions', 'talks', 'agenda', 'events']
  },
  {
    title: 'Invited Speakers',
    url: 'speakers.html',
    summary: 'Profiles of invited keynote speakers and summaries of their talks on human movement, sports analytics, and health.',
    keywords: ['speakers', 'invited', 'keynote', 'talk', 'bio', 'profile', 'abstract']
  },
  {
    title: 'Organizers',
    url: 'organizers.html',
    summary: 'Main organizers, technical program committee members, and supporting sponsors for the workshop.',
    keywords: ['organizers', 'committee', 'sponsors', 'supporters', 'team']
  }
];

const overlay = document.getElementById('searchOverlay');
const resultsBox = document.getElementById('searchResults');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const toggleButton = document.querySelector('.search-toggle');

function openSearch() {
  if (!overlay) return;
  overlay.classList.remove('hidden');
  searchInput?.focus();
  runSearch(searchInput?.value || '');
}

function closeSearch() {
  overlay?.classList.add('hidden');
}

function runSearch(query) {
  const term = (query || '').trim().toLowerCase();
  const matches = !term
    ? searchIndex
    : searchIndex.filter(item => {
        const haystack = `${item.title} ${item.summary} ${item.keywords.join(' ')}`.toLowerCase();
        return haystack.includes(term);
      });

  if (!resultsBox) return;

  if (!matches.length) {
    resultsBox.innerHTML = '<div class="result-item"><strong>No results match your search.</strong><small>Try another keyword such as movement, schedule, submission, or organizers.</small></div>';
    return;
  }

  resultsBox.innerHTML = matches.map(item => `
    <a class="result-item" href="${item.url}">
      <strong>${item.title}</strong>
      <small>${item.summary}</small>
    </a>
  `).join('');
}

toggleButton?.addEventListener('click', openSearch);
searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  runSearch(searchInput?.value || '');
});

overlay?.addEventListener('click', (event) => {
  if (event.target === overlay) closeSearch();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeSearch();
});

searchInput?.addEventListener('input', (event) => runSearch(event.target.value));
