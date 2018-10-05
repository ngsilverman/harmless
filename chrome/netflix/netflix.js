// Makes the "Back to Browse" button more visible.
$.initialize("a.nf-icon-button", function() {
  if ($(this).text().includes("Back to Browse")) {
    $(this).css({
      "background-color": "#2ECC40",
      "color": "white",
      "font-size": "2.6em"
    });
  }
});
