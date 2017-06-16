// domPath v 1.2
// created by Jacint Chapo  http://chapo.info  http://github.com/jacintch
// created with jQuery 1.10.2
// json output format works only when jQuery JSON is included too https://code.google.com/p/jquery-json/
//
// first public version, looking forward to add fixes and new features in the future

$.fn.dompath = function(options) {
  // default settings
  var settings = $.extend({
    log_results:           false,    // console.log output results and target element's content 

    find_elements:         '*',      // could be any HTML tag name or * to enable for all tags

    special_attribute:     'target', // could be any custom attribute

    target_element:        true,     // include target element in output
    target_element_class:  true,     // include target element's class in output
    target_element_id:     true,     // include target element's id in output - if the target element has an id, class will be ignored

    parent_elements:       true,     // include parent elements in output
    parent_elements_count: 100,      // max number of parent elements
    parent_elements_class: true,     // include parent element's class in output
    parent_elements_id:    true,     // include parent element's id in output - if the parent element has an id, class will be ignored

    output_format:         'text',   // output format: json, text, array - json output format works only when jQuery JSON is included too https://code.google.com/p/jquery-json/

    hover_state:           true,     // enable hover state
    hover_style:           'background-color: green; color: white !important; cursor: default;', // hover state style

    click_state:           true,     // enable clicks
    click_style:           'background-color: blue; color: white !important; cursor: default;', // style when element is clicked

    after_click:           function() { }  // callback function after target element is clicked
  }, options );

  // hover state
  this.find(settings.find_elements).hover(function(){
    if (settings.hover_state) {
      var _this = $(this);

      _this.attr('style', settings.hover_style);

      $.each(_this.parents(), function(index, value) {
        $(value).attr('style', '');
      });
    }
  }, function(){
    if (settings.hover_state) {
      var _this = $(this);

      _this.attr('style', '');
    }
  });

  // click
  this.on('click','*',function(e){
    e.preventDefault();

    var _this = $(this);

    // mark clicks
    if (settings.click_state) {
      _this.attr('style', settings.click_style);
      setTimeout(function(){
        _this.attr('style', '');
      },750);
    }

    // collect the path elements here
    var path = [];

    // include target element? - should be merged with the parent element section in the future
    if (settings.target_element) {
      var id      = _this.attr("id"),
      eclass  = _this.attr("class"),
      element = _this.get(0).tagName.toLowerCase();

      // don't include html and body tags
      if (element != 'html' && element != 'body') {
        // include target element's id?
        if (settings.target_element_id && typeof id !== 'undefined' && id.length > 0) {
          element = element + '#' + id;
        }
        // include target element's class?
        else if (settings.target_element_class && typeof eclass != 'undefined' && eclass.length > 0) {
          var eclassparts = eclass.split(' '),
          eclass      = '';

          $.each(eclassparts, function(index, value) {
            if (value.length > 0) {
              if (eclass.length > 0) {
                eclass += ' ';
              }
              eclass += value;
            }
          });

          eclass = eclass.replace(/ /g,'.');
          element = element + '.' + eclass;
        }

        // include special attribute?
        if (settings.special_attribute.length > 0) {
          var special = _this.attr(settings.special_attribute);

          if (typeof special !== 'undefined' && special.length > 0) {
            element = element + '[' + settings.special_attribute + '=' + special + ']'
          }
        }

        path.push(element);
      }
    }

    // include parent elements?
    if (settings.parent_elements) {
      $.each(_this.parents(), function(index, value) {
        var _value  = $(value),
        id      = _value.attr("id"),
        eclass  = _value.attr("class"),
        element = _value.get(0).tagName.toLowerCase();

        // don't include html and body tags
        if (element != 'html' && element != 'body' && index < settings.parent_elements_count) {
          // include parent element's id?
          if (settings.parent_elements_id && typeof id != 'undefined' && id.length > 0) {
            element = element + '#' + id;
          }
          // include parent element's class?
          else if (settings.parent_elements_class && typeof eclass != 'undefined' && eclass.length > 0) {
            var eclassparts = eclass.split(' '),
            eclass      = '';

            $.each(eclassparts, function(index, value) {
              if (value.length > 0) {
                if (eclass.length > 0) {
                  eclass += ' ';
                }
                eclass += value;
              }
            });
            eclass = eclass.replace(/ /g,'.');
            element = element + '.' + eclass;
          }

          // include special attribute?
          if (settings.special_attribute.length > 0) {
            var special = _value.attr(settings.special_attribute);

            if (typeof special !== 'undefined' && special.length > 0) {
              element = element + '[' + settings.special_attribute + '=' + special + ']'
            }
          }

          path.push(element);
        }
      });
    }

    // select an output format
    switch(settings.output_format) {
      case 'json':
      var domPath = $.toJSON(path.reverse());
      break;
      case 'array':
      var domPath = path.reverse();
      break;
      case 'text':
      default:
      var domPath = path.reverse().join(" ");
    }

    // log output
    if (settings.log_results) {
      console.log('Path:' + domPath);
      console.log('Content:' + _this.html());
    }

    // return output in callback
    if (typeof settings.after_click == 'function') {
      settings.after_click.apply(this, [{'path': domPath, 'content': _this.html()}]);
    }

    return false;
  });
};
