;(function($){
    var Carousel = function(poster){
        var self = this;
        this.posterWrapper = poster;
        this.poster = this.posterWrapper.find('.poster-list');
        this.prevBtn = this.posterWrapper.find('.poster-prev-btn');
        this.nextBtn = this.posterWrapper.find('.poster-next-btn');
        this.posterItems = this.poster.find('.poster-item');

        if(this.posterItems.length % 2 == 0){
            this.poster.append(this.posterItems.eq(0).clone());
            this.posterItems = this.poster.children();
        }

        this.posterFirstItem = this.posterItems.first();
        this.posterLastItem = this.posterItems.last();
        this.rotateFlag = true;

        this.setting = {
            width: 1000,
            height: 270,
            posterWidth: 640,
            posterHeight: 270,
            scale: 0.9,
            autoplay: false,
            speed: 500,
            verticalAlign: "middle"
        };

        $.extend(this.setting, this.getSetting());

        this.setSetting();
        this.setItemPos();

        this.prevBtn.on('click', function(){
            self.rotate('left');
        });

        this.nextBtn.on('click', function(){
            self.rotate('right');
        });
    };

    Carousel.prototype = {
        getSetting: function(){
            var setting = this.posterWrapper.attr('data-setting');
            if(setting && setting != ''){
                return $.parseJSON(setting);
            }else{
                return {};
            }
        },
        setSetting: function(){
            var w = this.setting.width;
            var h = this.setting.height;
            var btnW = (w - this.setting.posterWidth) / 2;

            this.posterWrapper.css({
                width: w,
                height: h
            });

            this.poster.css({
                width: w,
                height: h
            });

            this.nextBtn.css({
                width: btnW,
                height: h,
                zIndex: Math.ceil(this.posterItems.length / 2)
            });

            this.prevBtn.css({
                width: btnW,
                height: h,
                zIndex: Math.ceil(this.posterItems.length / 2)
            });

            this.posterFirstItem.css({
                width: this.setting.posterWidth,
                height: this.setting.posterHeight,
                left: btnW,
                top: 0,
                zIndex: Math.floor(this.posterItems.length / 2)
            });

        },
        setItemPos: function(){
            var self = this;
            var restItem = self.posterItems.slice(1);
            var sliceSize = restItem.length / 2;
            var leftSide = restItem.slice(0, sliceSize);
            var rightSide = restItem.slice(sliceSize);
            var level = loop = Math.floor(restItem.length / 2);

            var firstLeft = (this.setting.width - this.setting.posterWidth) / 2;
            var gap = (firstLeft) / sliceSize;
            var fixOffsetLeft = firstLeft + this.setting.posterWidth;

            

            var rw = this.setting.posterWidth;
            var rh = this.setting.posterHeight;

            rightSide.each(function(index, el) {
                level --;
                rw = rw * self.setting.scale;
                rh = rh * self.setting.scale;
                var j = index;

                $(el).css({
                    zIndex: level,
                    width: rw,
                    height: rh,
                    opacity: 1/(++j),
                    left: fixOffsetLeft + (++index)*gap - rw,
                    top: self.setVerticalAlign(rh)
                });
            });

            var lw = rightSide.last().width();
            var lh = rightSide.last().height();

            leftSide.each(function(index, el){
                $(el).css({
                    zIndex: index,
                    width: lw,
                    height: lh,
                    opacity: 1/loop,
                    left: index * gap,
                    top: self.setVerticalAlign(lh)
                });

                lw = lw/self.setting.scale;
                lh = lh/self.setting.scale;
                loop --;
            });
        },
        setVerticalAlign: function(height){
            var verticalType = this.setting.verticalAlign;
            var top;
            if(verticalType === 'top'){
                top = 0;
            }else if(verticalType === 'middle'){
                top = parseInt(this.setting.height - height) / 2;
            }else if(verticalType === 'bottom'){
                top = parseInt(this.setting.height - height);
            }
            return top;
        },
        rotate: function(dir){
            var self = this;
            if(dir === 'left'){
                this.posterItems.each(function(index, el){
                    var prev = $(el).prev().get(0) ? $(el).prev() : self.posterLastItem;
                    var width = prev.css('width');
                    var height  = prev.css('height');
                    var zIndex = prev.css('z-index');
                    var opacity = prev.css('opacity');
                    var left = prev.css('left');
                    var top = prev.css('top');

                    $(el).animate({
                        width: width,
                        height: height,
                        opacity: opacity,
                        left: left,
                        top: top,
                        zIndex: zIndex 
                    }, self.setting.speed)
                });
            }else if(dir === 'right'){
                this.posterItems.each(function(index, el){
                    var next = $(el).next().get(0) ? $(el).next() : self.posterFirstItem;
                    var width = next.css('width');
                    var height  = next.css('height');
                    var zIndex = next.css('z-index');
                    var opacity = next.css('opacity');
                    var left = next.css('left');
                    var top = next.css('top');

                    $(el).animate({
                        width: width,
                        height: height,
                        opacity: opacity,
                        left: left,
                        top: top,
                        zIndex: zIndex 
                    }, self.setting.speed)

                });
            }
            
        }
    };

    Carousel.init = function(posters){
        var _this = this;
        posters.each(function(){
            new _this($(this));
        });
    };

    window.Carousel = Carousel;
})($);