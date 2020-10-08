window.onload = function () {
    var main = new Vue({
        el: '#vue-app',
        data: {
            bottransfer: false,
        }
    });
}

//For Back to top
Vue.component('backtotop', {
    template: '#backtotop',
    data: function () {
        return {
            isVisible: false
        };
    },
    methods: {
        initToTopButton: function () {
            $(document).bind('scroll', function () {
                var backToTopButton = $('.goTop');
                if ($(document).scrollTop() > 250) {
                    backToTopButton.addClass('isVisible');
                    this.isVisible = true;
                } else {
                    backToTopButton.removeClass('isVisible');
                    this.isVisible = false;
                }
            }.bind(this));
        },
        backToTop: function () {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 'slow', 'swing');
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.initToTopButton();
        });
    }
});
//For Back to top

//For Textfield auto focus
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})
//For Textfield auto focus
