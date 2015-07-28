(function($){
  jQuery.fn.StepByStep = function(options){
  	options = $.extend({
      lineColor: "#e7e7e7",
      visible: 1,
      inactiveColor: '#e7e7e7',
      numColor: '#222'
    }, options);

    var make = function(){
      var list = $(this).find('ul');
      var li = list.find('li');
      list.css({
      	'list-style-type':'none',
      	'background':options.lineColor,
      	'height': '2px'
      });
      li.css({
      	'float':'left'
      	// 'width': (list.children().length) + '%'
      });

      var details = $('.step-details')
      jQuery.each(details,function(i){
      	(i <= options.visible -1) ? $(this).css('visibility','visible') : $(this).css('visibility','hidden');
      })

      var div = document.createElement('div');
      // div.addClass('lalka')
    	li.prepend(div).find('div:nth-child(1)').addClass('number')
    	jQuery.each(li,function(i){
    		$(this).find('.number').text(parseInt(i) + 1)
    	})

    	var num = $('div.number')
    	num.css({
    		'font-weight': 'bold',
    		'background': options.inactiveColor,
    		'color': options.numColor,
    		'padding': '0.6em' + ' ' + '1em',
    		'border-radius': '5em',
    		'display': 'inline-block',
    		'font-size': '1.2em'
    	})
    };

    return this.each(make); 
  };
})(jQuery);