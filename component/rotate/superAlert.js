;(function($) {

    $.fn.superAlert = function(conf){

        conf = $.extend(true, {
            before : function(){},
            msg : 'def'
        },conf);

        //常用的变量就存下来
        var msg = conf.msg;

        if(conf.before(msg)){
            this.each(function(i,el){
                $(el).on('click',function(){
                    alert(msg)
                })
           })
        }
    }

    var superNow = function(conf){
        this.con = conf;
    }

    superNow.init = function(conf){
        return new superNow(conf)
    }

    window.superNow = superNow;


})($);




