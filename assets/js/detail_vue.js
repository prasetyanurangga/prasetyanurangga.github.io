  var router = new VueRouter({

    mode: 'history',

    routes: []

  });
var detail = new Vue({
  el: '#wrap',
  router,
  data () {
    return {
      repos: [],
      local_repos: [],
      user: []
    }
  },
  mounted () {
    axios.all([
        this.request_1(), //or direct the axios request
        this.request_2(),
        this.request_3(),
        this.request_4(),
      ])
    .then(axios.spread((first_response, second_response, third_response, fourth_response) => {
      var local_repos = [];

      parameters = this.$route.query.name
      type = this.$route.query.type
      if(type == "portofolio"){
        fourth_response.data.forEach(function(repos) {
          if(repos.name == parameters){
            local_repos = repos;
          }
        });

        var date = moment();
        var dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');
        first_response.data['updated_at'] = dateComponent;
        this.local_repos = local_repos;
        this.repos= first_response.data;
        this.user =  second_response.data;
      } else {
        third_response.data.forEach(function(repos) {
          if(repos.name_git == parameters){
            local_repos = repos;
          }
        });

        var str = first_response.data.updated_at;
        var date = moment(str);
        var dateComponent = date.utc().format('YYYY-MM-DD HH:mm:ss');
        first_response.data['updated_at'] = dateComponent;
        this.local_repos = local_repos;
        this.repos= first_response.data;
        this.user =  second_response.data;
      }
      
    }))
  },
  updated(){
  },
  methods:{
    request_1() {
     parameters = this.$route.query.name
     return axios.get('https://api.github.com/repos/prasetyanurangga/'+parameters)
    },
    request_2() {
     return axios.get('https://prasetyanurangga.github.io/data/profile.json')
    },
    request_3() {
     return axios.get('https://prasetyanurangga.github.io/data/repository.json')
    },
    request_4() {
     return axios.get('https://prasetyanurangga.github.io/data/portfolio.json')
    },
  }
})

