////////////////////////////////////////////////////////////////////////////////
//      Sticky microsite nav
////////////////////////////////////////////////////////////////////////////////

// elements and classes
var stickyNavClass     = '.js-sticky-nav';
var stickyNavContainer = '.js-sticky-nav-wrap';
var stickyNavModifier  = 'is-stuck';
var stickyNav          = $(stickyNavClass);

function watchStickyNav(){
  if( $(document).scrollTop() > $(stickyNavContainer).position().top ){
    stickyNav.addClass(stickyNavModifier);
  }else{
    stickyNav.removeClass(stickyNavModifier);
  }
}

function resizeStickyNav(){
  $(stickyNavContainer).css('height', stickyNav.outerHeight());
}

// init sticky nav
resizeStickyNav();
watchStickyNav();
// change sticky nav state on page scroll
$(document).scroll(debounce(watchStickyNav, 10));
// change nav height on viewport resize
$(window).resize(debounce(resizeStickyNav, 100));


////////////////////////////////////////////////////////////////////////////////
//    Current section nav highlight
////////////////////////////////////////////////////////////////////////////////

$('.js-nav-section').waypoint(function(direction) {

  // classes
  var navClass       = 'site-nav__link';
  var activeNavClass = 'is-current';

  // swaps the active class between nav elements
  function swapClasses(sectionId) {
    $('.' + navClass + '.' + activeNavClass).removeClass(activeNavClass);
    $('.' + navClass + '--' + sectionId).addClass(activeNavClass);
  }

  if (direction === 'up') {
    // highlight previous region
    var previousSectionId = $('#' + this.element.id).prev().attr('id');
    swapClasses(previousSectionId);
  } else if (direction === 'down') {
    // highlight current section
    var currentSectionId = this.element.id;
    swapClasses(currentSectionId);
  }

})