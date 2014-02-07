domPath
=======

Simple jQuery plugin which returns the parent tags of the a clicked tag


Default settings:

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
