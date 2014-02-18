// Init sidebar
$(function() {

  var parents = $('#sideNav li.parent');
  var children = parents.children('ul');

  // Hide submenus
  children.addClass('hidden');

  $('#sideNav a').click(function(e){
    e.stopPropagation();
  });

  parents.each(function(index) {
    $(this).click(function(){
      $(this).find('ul').toggleClass('hidden');
      $(this).toggleClass('active');
    })
  });

  // Open submenus and set active state on page load where needed
  openMenus(null);

  $('#sideNav a').click(function(e){
    var newLink = $(this).attr('href');
    

    openMenus(newLink);
  });

});

function openMenus(_newLink) {
  var newLink = _newLink;
  var currentPage = String(window.location.pathname + window.location.hash);

  if (newLink !== null) {
    currentPage = newLink;
  }
  console.log('Opening for' + currentPage);

  $('#sideNav li').removeClass('active');

  $('#sideNav a').each(function(){
    var linkRef = $(this).attr('href');
    if (currentPage == linkRef) {
      $(this).parents('li').addClass('active');
      
      if ($(this).parents('li').hasClass('parent')) {
        $(this).parents('ul').removeClass('hidden');
        $(this).parents('li.parent').addClass('active');
      }

      if ($(this).hasClass('parent')) {
        $(this).parents('li').children('ul').removeClass('hidden');
      }
    }
  });
}
