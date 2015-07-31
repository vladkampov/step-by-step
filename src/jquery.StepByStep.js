(function($){
  jQuery.fn.StepByStep = function(options){
  	options = $.extend({
      lineColor: "#e7e7e7",
      active: 1,
      inactiveColor: '#e7e7e7',
      numColor: '#222',
      numColorActive: '#fff',
      activeColors: ['#ec0101','#ffbf00', '#00a9fe', '#1bb012', '#888'],
      colorLast: '#004179',
      after: 'StepByStep-after'
    }, options);

    function shadeColor(color, percent) {  
      var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    }

    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    var make = function(){
      var list = $(this).find('ul');
      var newLi = document.createElement('li');
      list.append(newLi)
      var li = list.find('li');
      li.css({
      	'float': 'left',
        'text-align': 'left',
      	'width': (100 / (list.children().length) + 1)  + '%',
        'margin-top': '-1.35em',
        'position': 'relative',
        'height': '350px'
      });
      $(this).css({'overflow': 'auto','width':'960px'})
      li.last().css({'width': (100 / (list.children().length * 2))  + '%'})
      var details = $('.step-details');
      var max_height = 0;
      jQuery.each(details,function(i){
      	if (i <= options.active - 1){
          $(this).parent().addClass('active')
          $(this).css('visibility','active')
        } else {
          $(this).css('visibility','hidden')
        } 
        if (i % 2 == 0){
          $(this).css({'padding': '0.4em 1em 0'}) 
          $(this).parent().find('p').css({
            'margin': 0
          })
          $(this).parent().css({'height':25})
        }
        else {
          $(this).css({'padding': '0 1em 0.4em'});
          height = $(this).find('p').height()
          $(this).css({'margin-top': -height });
          console.log(height)
          $(this).parent().css({'height':25})
          if (height > max_height)
            max_height = height
          $(this).parent().find('h3').css({
            'margin-top': 0
          })
        }
      })

      list.css({
        'list-style-type':'none',
        'background':options.lineColor,
        'height': '2px',
        'margin-top': max_height ,
        'margin-bootom': 50,
        'width': '93%'
      });

      details.css({
        'margin-left': '1.2em',
        'border-left': '1px solid ' + options.inactiveColor,
        'opacity': 0,
        'position': 'absolute',
        'width': '160%'
      })

      var div = document.createElement('div');
    	li.prepend(div).find('div:nth-child(1)').addClass('number')
    	jQuery.each(li,function(i){
    		$(this).find('.number').text(parseInt(i) + 1)
    	})

    	var num = $('div.number')
      var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
      var matches = patt.exec(options.inactiveColor);
      var rgba = "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+",0.5);";
    	num.css({
    		'font-weight': 'bold',
    		'background': options.inactiveColor,
    		'color': options.numColor,
    		'padding': '0.65em 1em',
    		'border-radius': '50%',
    		'display': 'inline-block',
    		'font-size': '1em',
        'box-shadow': '0 0 0 0.5em ' + convertHex(options.inactiveColor,50),
        '-webkit-transition-duration': '.4s', 
        '-o-transition-duration': '.4s', 
        '-moz-transition-duration': '.4s', 
        'transition-duration': '.4s',
        'cursor': 'pointer'
    	})

      jQuery.each($('div.number'),function(i){  
        if ($(this).parent().hasClass('active'))
        {
          $(this).css({
            'background': options.activeColors[i],
            'box-shadow': '0 0 0 0.5em ' + convertHex(options.activeColors[i],50),
            'color': options.numColorActive
          })
          $(this).parent().find('.step-details').find('h3').css({'color': shadeColor(options.activeColors[i],-10)})
          $(this).parent().find('.step-details').css({'border-left': '1px solid ' + options.activeColors[i],'opacity': 1})
        }
      });

      // $(num.last()).clone().appendTo($('li:last-child'))

      num.click(function(){
        if (!$(this).parent().hasClass('active') && !$(this).hasClass('last')){
          $(this).parent().addClass('active')
          $(this).css({
            'background': options.activeColors[$(this).parent().index()],
            'box-shadow': '0 0 0 0.5em ' + convertHex(options.activeColors[$(this).parent().index()],50),
            'color': options.numColorActive
          })
          $(this).parent().find(details).css({'visibility':'visible','border-left': '1px solid ' + options.activeColors[$(this).parent().index()]}).animate({opacity: 1}, 500);

          var thisLiIndex = $(this).parent().index()
          if (thisLiIndex != list.children().length - 1){
            jQuery.each(li,function(i){
              if (i == list.children().length - 1)
                return false;
              else if (i < thisLiIndex){
                $(this).addClass('active')
                $(this).find(num).css({
                  'background': options.activeColors[$(this).index()],
                  'box-shadow': '0 0 0 0.5em ' + convertHex(options.activeColors[$(this).index()],50),
                  'color': options.numColorActive
                })
                $(this).find(details).css({'visibility':'visible','border-left': '1px solid ' + options.activeColors[$(this).index()]}).animate({opacity: 1}, 500);
              } else
                return true;
            })
          }
        } else {
          $(this).parent().removeClass('active')
          $(this).css({
            'background': options.inactiveColor,
            'box-shadow': '0 0 0 0.5em ' + convertHex(options.inactiveColor,50),
            'color': options.numColor
          })

          $(this).parent().find(details).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);

          var thisLiIndex = $(this).parent().index()
          if (thisLiIndex != list.children().length - 1){
            jQuery.each(li,function(i){
              if (i == list.children().length - 1)
                return false;
              else if (i > thisLiIndex){
                $(this).removeClass('active')
                $(this).find(num).css({
                  'background': options.inactiveColor,
                  'box-shadow': '0 0 0 0.5em ' + convertHex(options.inactiveColor,50),
                  'color': options.numColor
                })
                $(this).find(details).css({opacity: 1.0}).animate({opacity: 0}, 200);
              } else
                return true;
            })
          }
        }
      })

      num.hover(
        function(){
          if (!$(this).parent().hasClass('active'))
          {
            $(this).css({
              'background': options.activeColors[$(this).parent().index()],
              'box-shadow': '0 0 0 0.5em ' + convertHex(options.activeColors[$(this).parent().index()],50),
              'color': options.numColorActive
            })
            $(this).parent().find('.step-details').find('h3').css({'color': shadeColor(options.activeColors[$(this).parent().index()],-10)})
          }},
        function(){
          if (!$(this).parent().hasClass('active'))
            $(this).css({
              'background': options.inactiveColor,
              'box-shadow': '0 0 0 0.5em ' + convertHex(options.inactiveColor,50),
              'color': options.numColor
            })}
      )
      li.last().find(num).addClass('last').css({'color': options.colorLast}).text('...')
      var div2 = document.createElement('div');
      li.last().append(div2).find('div:nth-child(2)').addClass('arrowDown').css({
        'height': max_height / 6,
        'border-left': '1px solid ' + options.inactiveColor,
        'margin-left': '1.3em'
      })
      var div3 = document.createElement('div');
      li.last().append(div3).find('div:nth-child(3)').addClass('DaFckDown').text('<').css({
        'font-size': '2.3em',
        '-webkit-transform': 'rotate(-90deg)',
        '-moz-transform': 'rotate(-90deg)',
        'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)',
        '-o-transform': 'rotate(-90deg)',
        'position': 'absolute',
        'margin-left': '0.25em',
        'margin-top': '-0.3em'
      }).animate({'margin-top': '0em'}, 350).animate({'margin-top': '-0.3em'}, 350)

      function animateIt() {
        li.last().find('div:nth-child(2)').animate({'height': max_height / 6}, 400).animate({'height': max_height / 7}, 400)
        li.last().find('div:nth-child(3)').animate({'margin-top': '-0.2em'}, 400).animate({'margin-top': '-0.3em'}, 400)
      }
      setInterval(animateIt, 0);
      li.last().attr('data-after', options.after)
      li.last().find(num).click(function(){
        var el = $(this).parent().attr('data-after');
        $('html, body').animate({ scrollTop: $('#'+el).offset().top }, 1000 );
        return false; 
      });
   
    };

    return this.each(make); 
  };
})(jQuery);