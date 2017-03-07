var app = new Vue({
  el:"#app",
  data:{
    newNote:{
      title:"",
      name:"",
      email:"",
      content:""
    },
    notes:[],
    isActive:false
  },
  mounted:function(){
    this.$nextTick(function () {
      this.queryData();
    });
  },
  methods:{
    queryData:function () {
      localStorage.messages?this.notes=JSON.parse(localStorage.messages):this.notes=[];
    },
    noteAdd:function() {
      this.notes.push(this.newNote);
      this.newNote = {title: '', name: '', email: '',content:''};
      localStorage.messages=JSON.stringify(this.notes);
      this.isActive=false;

    }
  }

});