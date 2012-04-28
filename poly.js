/**
 * polyfill / shim plugin for AMD loaders
 *
 * (c) copyright 2011-2012 Brian Cavalier and John Hann
 *
 * poly is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */

define(['exports'], function (exports) {

	exports.version = '0.2.3';

	exports.load = function (def, require, onload, config) {

		function success (module) {
			// check for curl.js's promise
			onload.resolve ? onload.resolve(module) : onload(module);
		}

		function fail (ex) {
			// check for curl.js's promise
			if (onload.reject) {
				onload.reject(ex)
			}
			else {
				throw ex;
			}
		}

		// load module
		require([def], function (module) {

			try {
				// augment native
				if (module['polyfill']) {
					module['polyfill']();
				}
			}
			catch (ex) {
				fail(ex);
			}
			success(module);

		});

	};

    return exports;

});
