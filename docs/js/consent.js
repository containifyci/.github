// ContainifyCI — Google Consent Mode v2
(function () {
  'use strict';

  var CONSENT_KEY = 'cookie_consent';
  var GRANTED = 'granted';
  var DENIED = 'denied';

  var CONSENT_GRANTED = {
    'ad_storage': GRANTED,
    'ad_user_data': GRANTED,
    'ad_personalization': GRANTED,
    'analytics_storage': GRANTED
  };

  var CONSENT_DENIED = {
    'ad_storage': DENIED,
    'ad_user_data': DENIED,
    'ad_personalization': DENIED,
    'analytics_storage': DENIED
  };

  // Must run before gtag.js loads
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', CONSENT_DENIED);

  var stored = null;
  try {
    stored = localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    // Private browsing or storage disabled
  }

  if (stored === GRANTED) {
    gtag('consent', 'update', CONSENT_GRANTED);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('consent-banner');
    if (!banner) return;

    if (stored !== GRANTED && stored !== DENIED) {
      banner.removeAttribute('hidden');
    }

    var acceptBtn = document.getElementById('consent-accept');
    var rejectBtn = document.getElementById('consent-reject');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        gtag('consent', 'update', CONSENT_GRANTED);
        try { localStorage.setItem(CONSENT_KEY, GRANTED); } catch (e) {}
        banner.setAttribute('hidden', '');
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        gtag('consent', 'update', CONSENT_DENIED);
        try { localStorage.setItem(CONSENT_KEY, DENIED); } catch (e) {}
        banner.setAttribute('hidden', '');
      });
    }
  });
})();
