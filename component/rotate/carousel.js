;(function($){
    var Carousel = function(conf){
        var self = this;

        this.posterWrapper = $(conf.wrapper);
        this.poster = this.posterWrapper.find('.poster-list');
        this.prevBtn = this.posterWrapper.find('.poster-prev-btn');
        this.nextBtn = this.posterWrapper.find('.poster-next-btn');
        this.posterItem = this.poster.find('.poster-item');
        this.posterFirstItem = this.posterItem.first();

        this.setting = {
            width: 1000,
            autoplay: false,
            speed: 500
        };

        $.extend(this.setting, conf.setting);

        this.setSetting();
        // this.setItemPos();

        this.prevBtn.on('click', function(){
            self.rotate('left');
        });

        this.nextBtn.on('click', function(){
            self.rotate('right');
        });
    };

    Carousel.prototype = {
        setSetting: function(){
            this.posterWrapper.css({
                width: this.setting.width,
                height: this.setting.height
            });

            this.poster.css({
                width: this.setting.width,
                height: this.setting.height
            });

            this.posterFirstItem.css({
                left: (this.setting.width - (this.setting.posterWidth)) / 2,
                zIndex: Math.floor(this.posterItem.length / 2)
            });

        },
        rotate: function(dir){
            var self = this;

            if(dir == 'left'){
                self.posterItem.each(function(index, item){
                    var selItem = $(item);

                    var prev = selItem.index() == 0 ? self.posterItem.length : selItem.prev();

                    selItem.animate({
                        width: prev.css('width'),
                        // left: prev.css('left'),
                        // right: prev.css('right'),
                        zIndex: prev.css('z-index')
                    }, self.setting.speed);

                });
            }
            if(dir == 'right'){
                self.posterItem.each(function(index, item){
                    var selItem = $(item);
                    var nextItem = selItem.index() == self.posterItem.length - 1 ? 0 : selItem.next();

                    nextItem = $(nextItem);
                    
                    selItem.animate({
                        width: nextItem.css('width'),
                        // left: next.css('left'),
                        // right: next.css('right'),
                        zIndex: nextItem.css('z-index')
                    }, self.setting.speed);

                });
            }
        },
        setItemPos: function(){
            //设置除第一帧外其他的left和z-index
            var self = this;
            var restItem = self.posterItem.slice(1);
            var restItemSize = restItem.length;
            var leftSide = restItem.slice(0, restItemSize/2);
            var rightSide = restItem.slice(restItemSize/2);

            var firstLeft = self.posterFirstItem.css('left');

            self.posterItem.css('width', self.setSetting.width);

            leftSide.each(function(index, el) {
                $(el).css({
                    left: (parseInt(firstLeft) / (restItemSize / 2)) * index,
                    zIndex: index
                });
            });

            rightSide.each(function(rIndex, el) {
                $(el).css({
                    right: (parseInt(firstLeft) / (restItemSize / 2)) * rIndex,
                    zIndex: rIndex
                });
            });
        },
    };

    Carousel.init = function(conf){
        return new Carousel(conf);
    };

    window.Carousel = Carousel;
})($);