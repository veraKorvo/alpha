function registerFadeInElement(eid) {
  var element = document.getElementById(eid);
  $(element).addClass('js-fade-element-hide');

  $(window).scroll(function() {
    if( $(element).length > 0 ) {
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('js-fade-element-show');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('js-fade-element-show');
        $(element).addClass('js-fade-element-hide');
      }
    }
  });
}

$(document).ready(function() {
  $.each(document.getElementsByClassName('fade-in-element-box'), function(i, e) {
    registerFadeInElement(e.getAttribute('id'));
  });
  $.each(document.getElementsByClassName('fade-in-element'), function(i, e) {
    registerFadeInElement(e.getAttribute('id'));
  });
});
