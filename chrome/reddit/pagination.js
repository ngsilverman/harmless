// This undoes the infinite scrolling on the Reddit homepage and subreddits.
const ITEMS_PER_PAGE = 10;

// The number of items currently visible.
var visibleItemCount = ITEMS_PER_PAGE;

$(function() {

  $.initialize('.Post', function() {

    var index = $('.Post').index($(this));

    // This happens the first time the Reddit site is loaded, or when a completely new set of
    // posts is loaded, for example if the user navigates to a new subreddit. In both cases we
    // (re)initialize everything.
    if (index < visibleItemCount) {
      visibleItemCount = ITEMS_PER_PAGE;

      // When a new page is loaded dynamically our show next element disappears so we may
      // need to create it multiple times.
      initializeShowNextElementIfNeeded();
    }

    // Insert the "show next" element at the correct position on initial load.
    if (index == visibleItemCount) {
      $(this).before($('#harmless-show-next'));
    }

    // Hide posts until the user explicitly clicks on "show next" element.
    if (index >= visibleItemCount) {
      $(this).css({
        'display': 'none'
      });
    }
  });
});

function initializeShowNextElementIfNeeded() {
  if ($('#harmless-show-next').length == 0) {
    // Add the "show next" element to the DOM. We'll insert it at the correct place later.
    $('body').append('<div id="harmless-show-next"><a href="#">Show next posts.</a></div>');

    $('#harmless-show-next a').click(function(event) {
      // Prevents the browser from going back to the top of the page.
      event.preventDefault();

      var nextPosts = $('.Post').slice(visibleItemCount, visibleItemCount + ITEMS_PER_PAGE)

      // Show the next set of posts.
      nextPosts.css('display', 'block');

      // Move the "show next" element to the end of the visible posts.
      nextPosts.last().after($('#harmless-show-next'));

      visibleItemCount += ITEMS_PER_PAGE;
    });
  }
}
