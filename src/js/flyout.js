;(function($) {

    "use strict";

    $.flyout = function() {

        var flyout = {
            nav: null,
            currentSide: null,
            expanded: false,

            open: function(side) {
                $('body, html').addClass('active-flyout active-flyout--'+side);
                flyout.nav.filter('.flyout--'+side).addClass('is-active');
                flyout.currentSide = side;
            },

            close: function() {
                if (flyout.expanded) flyout.collapse();
                $('body, html').removeClass('active-flyout active-flyout--left active-flyout--right');
                flyout.nav.removeClass('is-active');
            },

            expand: function() {
                $('body, html').addClass('active-flyout--expand');
                flyout.expanded = true;
            },

            collapse: function() {
                $('body, html').removeClass('active-flyout--expand');
                flyout.expanded = false;
            },

            init: function() {

                flyout.nav = $('.flyout');

                $(document).on('click', '.js-flyout-link', function(e){
                    var $this = $(this),
                    side = $this.data('flyout-side'),
                    expand = $this.data('flyout-expand');

                    if (expand) {
                        flyout.expanded === true ? flyout.collapse() : flyout.expand();
                    } else {
                        flyout.close();
                        side != flyout.currentSide ? flyout.open(side) : flyout.currentSide = undefined;
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
            collapse: flyout.collapse,
            init: flyout.init
        };
    };


})(jQuery);
