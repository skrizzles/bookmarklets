/**
 * Translate the specified or selected text or URL to German using Google.
 *
 * @title Translate to German
 * @keyword 2de
 */
(function () {
	/* Try to get the parameter string from the bookmarklet/search query. */
	var s = (function () { /*%s*/; }).toString()
		.replace(/^function\s*\(\s*\)\s*\{\s*\/\*/, '')
		.replace(/\*\/\s*\;?\s*\}\s*$/, '')
		.replace(/\u0025s/, '');

	if (s === '') {
		/* If there is no parameter, see if there is text selected. */
		s = getSelection() + '';

		if (!s) {
			/* If there is no selection, look for translation links. */
			var interLanguageSelectors = [
				/* Wikipedia/Mediawiki */
				'.interlanguage-link a[href][hreflang="de"]',

				/* CatenaCycling.com */
				'#language a[href][hreflang="de"]',

				/* Generic */
				'a[href][title$="this page in German"]',
				'a[href][title$="diese Seite auf Deutsch"]'
			];

			for (var link, i = 0; i < interLanguageSelectors.length; i++) {
				link = document.querySelector(interLanguageSelectors[i]);

				if (link) {
					location = link.href;

					return;
				}
			}

			/* If we did not find a translation link, use the HTTP(S) location. */
			s = (location.protocol + '').match(/^http/)
				? location + ''
				: '';

			/* If all else fails, prompt the user for the text to translate. */
			if (!s) {
				s = prompt('Please enter your text:');
			}
		}
	}

	if (s) {
		if (s.match(/^(\w+:(\/\/)?)?[^\s.]+(\.[^\s])+/)) {
			var protocol = (s.match(/^https:/))
				? 'https'
				: 'http';
			location = protocol + '://translate.google.com/translate?sl=auto&tl=de&u=' + encodeURIComponent(s);
		} else {
			location = 'https://translate.google.com/translate_t#auto|de|' + encodeURIComponent(s);
		}
	}
})();