(function (document, $) {

    var $flyout     = $('.flyout'),
        currentSide;

    $('.js-flyout-link').on('click', function(e){
        var $this = $(this),
            side = $this.data('flyout-side'),
            expand = $this.data('flyout-expand');

            if (expand) {
                flyoutExpand();
            } else {
                flyoutClose();
                side != currentSide ? flyoutOpen(side) : currentSide = undefined;
            }

        e.preventDefault(e);
    });

    function flyoutOpen(side) {
        $('body, html').addClass('active-flyout active-flyout--'+side);
        $flyout.filter('.flyout--'+side).addClass('is-active');
        currentSide = side;
    }

    function flyoutClose() {
        $('body, html').removeClass('active-flyout active-flyout--left active-flyout--right');
        $flyout.removeClass('is-active');
    }

    function flyoutExpand() {
        $('body, html').toggleClass('active-flyout--expand');
    }

}(document, jQuery));