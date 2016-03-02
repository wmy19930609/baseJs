;(function($, document){
    var defs = {
        "width": 380,
        "height": 280,
        "showClose": true,
        "closeByEsc": true,
        "template": "<p>咪路，咪路，咪路DEPON~</p>",
        "confirm": false,
        "aside": false,
        "layer": true,
        "opacity": 0.5,
        "layerBg": "rgba(0,0,0,.5)",
        "fixed": true
    };

    function Popup(box, conf){
        this.$popBox = box;
        this.conf = $.extend({}, defs, conf);
        this.initEvent();
    }

    $.extend(Popup.prototype, {
        initEvent: function(){
            var self = this;
            this.status = true;//是否显示

            this.$popBox.on('click', function(){
                if(self.conf.layer){
                    self.showLayer();
                }
                self.showBox();
                self.show = true;

                return false;
            });
            this.close();
        },

        showLayer: function(e){
            $('body').append("<div class='layer'></div>");
            $('.layer').css({
                'opacity': this.conf.opacity,
                'background': this.conf.layerBg
            });
        },

        showBox: function(){
            var conf = this.conf;
            var dom = '<div class="popwin">' + conf.template + '</div>';

            $('body').append(dom);

            $('.popwin').fadeIn("slow").css({
                width: conf.width,
                height: conf.height
            });

            if(conf.fixed){
                $('.popwin').css({
                    'position': 'fixed',
                    'top': '50%',
                    'left': '50%',
                    'margin-left': -conf.width / 2,
                    'margin-top': -conf.height / 2
                });
            }else{
                $('.popwin').css('position','relative');
            }

            if(conf.showClose){
                $('.popwin').prepend('<p style="text-align: right;">CLOSE</p>');
            }

        },

        close: function(){
            var self = this;

            $(document).on('keydown', function(e){
                if(self.show && e.keyCode == 27){
                    $('.layer').remove();
                    $('.popwin').remove();
                    self.show = false;
                }
            });

            $('body').on('click',function(e){
                var $target = $(e.target);
                if(self.show && !$target.closest('.popwin').length){
                    $('.layer').remove();
                    $('.popwin').remove();
                    self.show = false;
                }
            });
        }
    });

    $.fn.popup = function(conf){
        return new Popup(this, conf);
    };
})(window.jQuery, document);