/**
* Template Name: MyPortfolio - v2.1.0
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function($) {
  "use strict";

  var burgerMenu = function() {
    $('.burger').click(function(e) {
      $(window).scrollTop(0);
      if (!$('.burger').hasClass('active'))
        $('.burger').addClass('active');
      else
        $('.burger').removeClass('active');
    });
  }
  burgerMenu();

  

  var siteOwlCarousel = function() {
    $('.testimonial-carousel').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 1000,
    });
  };
  siteOwlCarousel();

  $(window).on('load', function() {
    AOS.init({
      easing: 'ease',
      duration: 1000,
      once: true
    });
  });

  // $.ajax({
  //       url: 'https://api.github.com/users/prasetyanurangga/repos',
  //       type: 'GET',
  //       dataType: 'json'
  //     })
  //     .done(function(result) {
  //       var html = ``; 
  //       result.forEach(function(repos) {
  //         html += `
  //           <div class="item web col-sm-6 col-md-4 col-lg-4 mb-4">
  //             <a href="work-single.html" class="item-wrap fancybox">
  //               <div class="work-info">
  //                 <h3>`+repos.name+`</h3>
  //                 <span>`+repos.language+`</span>
  //               </div>
  //               <img class="img-fluid" src="assets/img/img_1.jpg">
  //             </a>
  //           </div>
  //         `;
  //       });
  //       $('#portfolio-grid').html(html)
  //     })
  //     .fail(function() {
  //     })
  //     .always(function() {

  //     });

})(jQuery);