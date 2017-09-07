/* global $ */
/* global jQuery */
/* global GOVUK */

$(document).ready(function () {
  // Turn off jQuery animation
  jQuery.fx.off = true

  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()

  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Details/summary polyfill
  // See /javascripts/vendor/details.polyfill.js
})

$(window).load(function () {
  // Only set focus for the error example pages
  if ($('.js-error-example').length) {
    // If there is an error summary, set focus to the summary
    if ($('.error-summary').length) {
      $('.error-summary').focus()
      $('.error-summary a').click(function (e) {
        e.preventDefault()
        var href = $(this).attr('href')
        $(href).focus()
      })
    } else {
      // Otherwise, set focus to the field with the error
      $('.error input:first').focus()
    }
  }
})


// service manual stuff//


$(document).ready(function () {

  // External link icons
  // Add "rel=external" for external links within main content
  $('#content a').filter(function() {
    return this.hostname && this.hostname !== location.hostname;
  }).attr("rel", "external");

  // Count tagged guides
  // Count each of the headings on a tag list page
  var total_tagged_guides = $(".js-tag-list h2").length;
  $("#total-tagged-guides").html(total_tagged_guides);

  // Page contents
  // Generate a set of anchor links for "Contents"
  var content_headings = $(".markdown h2");
  var contents_wrapper = $(".sidebar");

  if (content_headings) {

    $(contents_wrapper).prepend("<ul class='page-contents'/>");

    var page_contents = $("ul.page-contents");

    $("<h3 class='heading-small page-contents-title'>Page contents:</h3>").insertBefore('.page-contents');

    $.each(content_headings, function (i) {
      var heading = $( this ).text();
      var list_anchor = $( this ).attr("id");

      var list_item = $('<li/>')
        .appendTo(page_contents);
      var link = $('<a/>')
        .attr("href", "#"+list_anchor)
        .text(heading)
        .appendTo(list_item);

    });
  }

  // Generate page contents for html publications
  var html_publication_headings = $(".publication-content h2");
  var html_publication_contents_wrapper = $(".in-page-navigation");

  if (html_publication_headings) {

    $(html_publication_contents_wrapper).prepend("<ol/>");

    var html_publication_page_contents = $(".in-page-navigation ol");

    $("<h2>Contents</h2>").insertBefore(html_publication_page_contents);

    $.each(html_publication_headings, function (i) {
      var heading_with_number = $( this ).text();
      var heading = heading_with_number.split(".")[1];

      var list_anchor = $( this ).attr("id");

      var list_item = $('<li/>')
        .appendTo(html_publication_page_contents);
      var link = $('<a/>')
        .attr("href", "#"+list_anchor)
        .text(heading)
        .appendTo(list_item);
    });

    // Remove numbers
    $(".in-page-navigation ol").remove('.number');
  }

  // Back state for topic navigation

  // Save state to sessionStorage
  $('.js-openable, .js-open-all, .js-close-all').click(function(){

    // If it is open, grab the id of the h2 and bung it in local storage
    $('.js-openable:not(.closed)').each(function() {
      var openHeadingId;
      openHeadingId = $(this).children('h2').attr('id');
      // console.log(openHeadingId);
      sessionStorage.setItem( openHeadingId , openHeadingId);
    });

    // If it is closed - check for the key in local storage and remove it
    $('.closed').each(function() {
      var closedHeadingId;
      closedHeadingId = $(this).children('h2').attr('id');
      sessionStorage.removeItem( closedHeadingId , closedHeadingId);
    });
  });

  // When the page loads, check local storage
  var sessionStorageItems = [];

  for ( var i = 0, len = sessionStorage.length; i < len; ++i ) {
    sessionStorageItems.push(sessionStorage.key( i ));
  }

  // console.log(sessionStorageItems);

  // For each item in sessionStorage, this is the ID of the H2 of a section.
  // Remove 'closed' from its parent and the section will open
  $.each( sessionStorageItems, function( key, value ) {
    // console.log( key + ": " + value );
    $('#'+value).parent().removeClass('closed');
  });

  // Show 'more updates' in page footer
  var morechanges = $("#morechanges");
  morechanges.hide();

  $(".morebutton").on("click", function() {
    $("#morechanges").show();
    $(".morebutton").hide();
    return false;
  });

  var showchange = $("#showchangeblock");
  showchange.hide();

  $(".showchangebutton").on("click", function() {
    $("#showchangeblock").show();
    $(".showchangebutton").hide();
    return false;
  });



  // Toggle 'show updates' in page footer

    $(".otherupdates").hide();

    $("#otherupdatesbutton").on("click", function(){
      if ($(".otherupdates").is(":visible")) {
        $(".otherupdates").hide();
        $("#otherupdatesbutton").html("+ Show all page updates (3)");
      } else {
        $(".otherupdates").show();
        $("#otherupdatesbutton").html("– Hide all page updates (3)");
      }
    return false;

    });

  // Show plain text vs markdown
  var showmarkdown = $("#change-markdown");
  var showplaintext = $("#change-plaintext");

  showmarkdown.hide();
  showplaintext.show();

  $("#button-markdown").on("click", function() {
    $("#change-markdown").show();
    $("#change-plaintext").hide();
    $("#button-markdown").toggleClass("button-disabled");
    return false;
  });

  $("#button-plaintext").on("click", function() {
    $("#change-plaintext").show();
    $("#change-markdown").hide();
    $("#button-markdown").addClass("button-disabled");
    $("#button-plain").removeClass("button-disabled");
    return false;
  });


  $('#hide-strikethrough').on("click", function() {
    console.log("hello");
    $("del").css('text-decoration', 'none');
    $('#hide-strikethrough').text('show strikethrough')
    return false;
  });

  if ($('.js-stick-at-top-while-scrolling').length) {
    // cache the element
    var $stickyNav = $('.js-stick-at-top-while-scrolling');
    var $pageContent = $('.column-two-thirds');
    var $sections = $('.markdown h2');

    // find original navigation bar position
    var navPos = $stickyNav.offset().top;

    // on scroll
    $(window).scroll(function() {

      // Highlight the active section
      function highlightSectionOnScroll() {
        $sections.each(function() {
          var top = $(this).offset().top;
          var top = top - 60;
          if (scrollPos >= navPos && scrollPos >=top) {
            $stickyNav.find('a').removeClass('active');
            $sections.removeClass('active');
            $(this).addClass('active');
            $stickyNav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
          }
        });
      }

      // get scroll position from top of the page
      var scrollPos = $(this).scrollTop();

      // check if scroll position is >= the nav position
      if (scrollPos >= navPos) {
        $stickyNav.addClass('sticky');
        $pageContent.addClass('align-column-right');
        // highlight the active section
        highlightSectionOnScroll();
      } else {
        $stickyNav.removeClass('sticky');
        $pageContent.removeClass('align-column-right');
      }
    });

  }
});


