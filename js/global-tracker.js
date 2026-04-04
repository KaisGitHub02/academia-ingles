// ============================================
// GLOBAL TRACKER - Sin base de datos
// Usa CountAPI (countapi.xyz) - API gratuita sin registro
// ============================================

const NAMESPACE = 'beoneenglish-com';

const GlobalTracker = {
  // Track a page visit
  trackVisit(page) {
    const p = page || window.location.pathname.split('/').pop() || 'index';
    this._hit('visits');
    this._hit(`visits_${p}`);
  },

  // Track a click by type
  trackClick(type) {
    this._hit(`click_${type}`);
  },

  // Increment a counter via CountAPI
  _hit(key) {
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${key}`)
      .catch(() => {});
  },

  // Get a counter value
  _get(key) {
    return fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${key}`)
      .then(r => r.json())
      .then(d => d.value || 0)
      .catch(() => 0);
  },

  // Get all stats
  async getAllStats() {
    const keys = [
      'visits',
      'click_whatsapp',
      'click_phone',
      'click_email',
      'click_facebook',
      'click_map'
    ];

    const results = await Promise.all(
      keys.map(key => this._get(key))
    );

    const stats = {};
    keys.forEach((key, i) => {
      if (key === 'visits') {
        stats.totalVisits = results[i];
      } else {
        const type = key.replace('click_', '');
        if (!stats.clicks) stats.clicks = {};
        stats.clicks[type] = results[i];
      }
    });

    stats.totalClicks = Object.values(stats.clicks || {}).reduce((a, b) => a + b, 0);

    return stats;
  }
};

// Auto-track on page load
document.addEventListener('DOMContentLoaded', () => {
  GlobalTracker.trackVisit();
});
