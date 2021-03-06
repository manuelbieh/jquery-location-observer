/*
* jQuery based observer for location.href
*
* @author: Manuel Bieh
* @url: http://www.manuel-bieh.de/
* @version 1.0
* @license MIT
*/

jQuery(function($) {

	$.extend({

		locationObserver: {

			lastLocation: location.href,
			interval: 100,
			timer: null,

			start: function(interval) {

				var that = this;
				that.lastLocation = location.href;

				if(typeof interval !== 'undefined') {
					this.setInterval = parseInt(interval, 10);
				}

				if(this.timer !== null) {
					console && console.log('Location observer is already running. Use $(location).on("change") to handle events.');
					return;
				}

				this.timer = window.setInterval(function() {

					if(that.lastLocation != location.href) {

						$(window.location).trigger('change', {
							lastLocation: that.lastLocation
						});

						that.lastLocation = location.href;

					}

				}, that.interval);

			},

			stop: function() {

				if(this.timer !== null) {
					window.clearInterval(this.timer);
					this.timer = null;
					return;
				}

				console && console.log('Nothing to stop.');

			},

			restart: function() {
				this.stop();
				this.start();
			},

			setInterval: function(interval) {

				if(isNaN(parseInt(interval, 10))) {
					return;
				}

				this.interval = parseInt(interval, 10);

				if(this.timer !== null) {

					this.restart();

				}

			}

		}

	});

}(jQuery));
