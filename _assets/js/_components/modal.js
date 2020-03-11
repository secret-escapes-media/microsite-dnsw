var modal          = $('.js-modal');
var modalLaunchBtn = $('.js-open-modal');
var modalCloseBtn  = $('.js-close-modal');
var vimeoPlayer;

// opens modal
function modalOpen(event, modalId){

  // is there a click event?
  if (event) {
    event.preventDefault();
    // find the modal id from clicked element
    var activeModalId = $(event.currentTarget).data('open-modal');
  } else {
    // find the modal id from passed string
    var activeModalId = modalId;
  }

  // find the active modal dom element
  var activeModal = $('*[data-modal-id="' + activeModalId + '"]');

  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');

  // create video if its a vimeo video modal
  if ($('#' + activeModalId).length > 0) {
    vimeoPlayer = new Vimeo.Player(activeModalId);
  }

  // reveal the specific modal content
  activeModal.removeClass('is-closed').addClass('is-open');
  modal.removeClass('is-closed').addClass('is-open');

}

// closes modal
function modalClose(event){
  event.preventDefault();

  // get active modal ID and check if video modal
  var activeModal = $('.modal__wrap.is-open');
  var activeModalId = activeModal.data('modal-id');
  var isVideoModal = $('#' + activeModalId).length > 0;

  // enable scrolling
  $('body').removeClass('disable-scroll');

  // pause video before transition
  if (isVideoModal) vimeoPlayer.pause();

  // set event listener after transition
  activeModal.on('transitionend', function(){
    modal.scrollTop(0); // reset scroll position
    if (isVideoModal) {
      vimeoPlayer.destroy(); // remove video player
      vimeoPlayer = null; // reset variable for new players
    }
    $(this).off(); // remove this event listener
  });

  // hide modal
  modal.addClass('is-closed').removeClass('is-open');
  activeModal.addClass('is-closed').removeClass('is-open');
}


// launches modal when offer is clicked
modalLaunchBtn.on('click', function(event) {
  modalOpen(event);
});

// launches modal from url queryString
var modalQueryString = 'open-modal';
if (getQueryStringByName(modalQueryString)) {
  // find modal id & dom element
  var modalId = getQueryStringByName(modalQueryString);
  var modalElement = $('*[data-modal-id="' + modalId + '"]');
  // is there is a modal to open?
  if ( $(modalElement).length > 0 ) {
    // open without passing event
    modalOpen(null, modalId);
  }
}

// closes modal on close icon click
modalCloseBtn.on('click', function(event) {
  modalClose(event);
});

// closes modal on background click
modal.on('click', function(event) {
  if ($(event.target).hasClass('modal__wrap')){
    modalClose(event);
  }
});

// closes modal on escape key press
$(document).keyup(function(event) {
   if (event.keyCode == 27) {
     modalClose(event);
    }
});