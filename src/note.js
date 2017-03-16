var app = new Vue({
  el:"#app",
  data:{
    newNote:{
      title:"",
      itime:"",
      name:"",
      email:"",
      content:""
    },
    notes:[],
    isActive:false,
    addName:"",
    delIndex:"",
    delMoudle:false
  },
  mounted:function(){
    this.$nextTick(function () {
      this.queryData();
    });
  },
  methods:{
    checkdata:function(){
      var res=[];
      res.code=0;
      if(this.newNote.title=="" || this.newNote.name=="" || this.newNote.email=="" || this.newNote.content==""){
          res.code=1,
          res.message="请认真填写每一项！"
        }
      return res;
    },
    queryData:function () {
      localStorage.messages?this.notes=JSON.parse(localStorage.messages):this.notes=[];
      this.notes.length!==0?this.addName="新增":this.addName="没有留言，<br>赶紧来添加吧！";
    },
    noteAdd:function() {
      var res=this.checkdata()
      if(res.code){
        alert(res.message);
        return;
      };
      this.newNote.itime=this.getNowFormatDate();
      this.notes.push(this.newNote);
      this.newNote = {title: '', itime:"", name: '', email: '',content:''};
      
      this.isActive=false;
      this.addName="新增";
    },
    getNowFormatDate:function() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds();
      return currentdate;
    },
    changeFlag:function(item,flag) {
      if(typeof item.del == "undefined"){
        this.$set(item,"del",true);
      }else{
        item.del = flag;
      }
    },
    delButton:function(index) {
      this.delMoudle=true;
      this.delIndex=index;
    },
    delNote:function() {
      this.notes.splice(this.delIndex,1);
      this.delMoudle=false;
    }
  },
  watch:{
    notes:function() {
      if(this.notes.length==0){
        this.addName="没有留言，<br>赶紧来添加吧！";
      };
      localStorage.messages=JSON.stringify(this.notes);
    }
  }
});