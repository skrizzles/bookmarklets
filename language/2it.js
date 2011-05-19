javascript:
/**
 * Translate the specified or selected text to Italian using Google.
 *
 * @title Translate to Italian
 * @keyword 2it
 */
(function () {
	var s = (<><![CDATA[%s]]></> + '') || getSelection() + '' || location + '';
	if (s) {
		location = s.match(/^(\w+:(\/\/)?)?[^\s]+(\.[^\s])+/)
			? 'http://translate.google.com/translate?sl=auto&tl=it&u=' + encodeURIComponent(s)
			: 'http://translate.google.com/translate_t#auto|it|' + encodeURIComponent(s);
	}
})();
