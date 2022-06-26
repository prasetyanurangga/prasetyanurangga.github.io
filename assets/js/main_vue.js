
var main = new Vue({
  el: '#wrap',
  data () {
    return {
      user: [],
      info: [],
      portfolio: [],
      visible : false
    }
  },
  created () {
    axios.all([
        this.request_1(), //or direct the axios request
        this.request_2(),
        this.request_3(),
      ])
    .then(axios.spread((first_response, second_response, third_response) => {
          this.info= first_response.data;
          this.user =  second_response.data;
          this.portfolio =  third_response.data;
          this.callIsotope();
    }))
  },
  methods:{
    request_1() {
     return axios.get('https://prasetyanurangga.github.io/data/repository.json')
    },
    request_2() {
     return axios.get('https://prasetyanurangga.github.io/data/profile.json')
    },
    request_3() {
     return axios.get('https://prasetyanurangga.github.io/data/portflio.json')
    },
    callIsotope() {
      var $container = $('#portfolio-grid').isotope({
        itemSelector: '.item',
        isFitWidth: true
      });

      $(window).resize(function() {
        $container.isotope({
          columnWidth: '.col-sm-3'
        });
      });

      $container.isotope({
        filter: '*'
      });

      $('#filters').on('click', 'a', function(e) {
        e.preventDefault();
        var filterValue = $(this).attr('data-filter');
        $container.isotope({
          filter: filterValue
        });
        $('#filters a').removeClass('active');
        $(this).addClass('active');
      });
    },
    scroll_to_down(){
      document.getElementById("portfolio").scrollIntoView({
        behavior : 'smooth'
      })
    },
    detail(id){
      this.$router.push({ path: '/work-single.html', params: { id } })
    },
    type_item(language) {
      return "Other";
      
      

      
    },
  },
})