(function($, window, document, undefined) {

  // Create the defaults once
  var pluginName = "txtRWDScale",
    defaults = {
      basePX: 18,
      minValbasePX: 10,
      breakpoints:{mobile: 320,
                mobileLandscape: 480,
                tablet: 768,
                desktop: 1024},
      basePXcssDefined: 0,
      cssrules: {}
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.settings.cssrules = $("<style type='text/css' id='baseFontPxRWDScale'> </style>");
    $(this.element).before(this.settings.cssrules);
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function() {
      this.resize_base_font();
    },

    resize_base_font: function() {
      var cssRulesArr = [], elementsRulesStr = '';
      for (var i=0, t = this.settings.elementsRules.length; i < t; i++) {
        elementsRulesStr += (i!=0?',':'')+this.settings.elementsRules[i];
      }
      var p = 0, fontSizeStyle = this.settings.basePX;
      if($(window).width() <= this.settings.breakpoints.mobile) {
        p = this.settings.breakpoints.mobile;
      } else if($(window).width() <= this.settings.breakpoints.mobileLandscape) {
        p = this.settings.breakpoints.mobileLandscape;
      } else if($(window).width() <= this.settings.breakpoints.tablet) {
        p = this.settings.breakpoints.tablet;
      } else if($(window).width() <= this.settings.breakpoints.desktop) {
        p = this.settings.breakpoints.desktop;
      } else {
        p = $(window).width();
      }
      fontSizeStyle = fontSizeStyle*$(window).width()/p;
      if(fontSizeStyle<this.settings.minValbasePX) fontSizeStyle = this.settings.minValbasePX;
      cssRulesArr.push(elementsRulesStr+"{ font-size:"+fontSizeStyle+ "px;}");
      for (var i=0, t = cssRulesArr.length; i < t; i++) {
        var cssRulesStr = cssRulesArr[i];
        this.settings.cssrules.html('');
        this.settings.cssrules.append(cssRulesStr);
      }
    }
  });

  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if(!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
      else $.data(this, "plugin_" + pluginName).resize_base_font();
    });
  };
})(jQuery, window, document);