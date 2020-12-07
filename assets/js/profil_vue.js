var profil = new Vue({
  el: '#wrap',
  data () {
    return {
      user: ""
    }
  },
  mounted () {
    axios
      .get('https://prasetyanurangga.github.io/data/profile.json')
      .then(response => (this.user = response.data))
  },
  updated(){
  },
  methods:{
  }
})