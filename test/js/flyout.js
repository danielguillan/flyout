;(function($,window) {

    "use strict";

    function Flyout() {

        var flyout = {
            nav: null,
            currentSide: null,
            isOpen: false,
            isExpanded: false,

            open: function(side) {
                $('body, html').addClass('active-flyout active-flyout--'+side);
                flyout.nav.filter('.flyout--'+side).addClass('is-active');
                flyout.isOpen = true;
                flyout.currentSide = side;
            },

            close: function() {
                if (flyout.isExpanded) flyout.collapse();
                $('body, html').removeClass('active-flyout active-flyout--left active-flyout--right');
                flyout.nav.removeClass('is-active');
                flyout.isOpen = false;
                flyout.currentSide = undefined;
            },

            expand: function() {
                $('body, html').addClass('active-flyout--expand');
                flyout.isExpanded = true;
            },

            collapse: function() {
                $('body, html').removeClass('active-flyout--expand');
                flyout.isExpanded = false;
            },

            init: function() {

                flyout.nav = $('.flyout');

                $(document).on('click', '.js-flyout-link', function(e){

                    var $this = $(this),
                    side = $this.data('flyout-side'),
                    expand = $this.data('flyout-expand');

                    if (expand) {
                        flyout.isExpanded === true ? flyout.collapse() : flyout.expand();
                    } else {
                        flyout.isOpen ? flyout.close() : flyout.open(side);
                    }
                    e.preventDefault(e);
                });

                return this;
            }

        };

        flyout.init();

        return {
            open: flyout.open,
            close: flyout.close,
            expand: flyout.expand,
            collapse: flyout.collapse
        };
    };

    window.Flyout = Flyout();

}(jQuery, this));