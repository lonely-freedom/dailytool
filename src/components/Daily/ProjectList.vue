<template>
  <div class="projectlist" v-on:click.middle="addRow" @keydown.107="addRow">
    <!-- <ul
      v-for="(project,index) in projectData"
      v-bind:key="project.ProjectId"
      @keydown.enter="saveDaily(index)"
    >
      <li>
        <input type="hidden" v-model="project.ProjectId" />
      </li>
      <li>
        <input type="text" v-model="project.ProjectName" />
      </li>
      <li>
        <select v-model="project.IsUsed">
          <option
            v-for="isused in IsUserData"
            v-bind:key="isused.IsUsed"
            v-bind:value="isused.IsUsed"
          >{{isused.Name}}</option>
        </select>
      </li>
    </ul> -->
    <ul>
      <li 
      v-for="(project,index) in projectData"
      v-bind:key="project.ProjectId"
      @keydown.enter="saveDaily(index)"
      >
      <input type="hidden" v-model="project.ProjectId" />
      <input type="text" v-model="project.ProjectName" />
      <select v-model="project.IsUsed">
          <option
            v-for="isused in IsUserData"
            v-bind:key="isused.IsUsed"
            v-bind:value="isused.IsUsed"
          >{{isused.Name}}</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "projectlist",
  props: {
    projectData: Array
  },
  data: function() {
    return {
      IsUserData: [{ IsUsed: 0, Name: "不使用" }, { IsUsed: 1, Name: "使用" }]
    };
  },
  methods: {
    addRow: function() {
      this.projectData.push({IsUsed:1});
    },
    saveDaily: function(index) {
      var _this = this;
      var updata = _this.projectData[index];
      if(isNaN(updata.AddUserId)){
          updata.AddUserId = _this.UserID;
        }
      if (!_this.valiIsNull(updata.ProjectName) && !isNaN(updata.IsUsed)) {
        _this.HttpPost("/api/tool/daily/project/insert", updata, function(
          redata
        ) {
          if (redata.body.flag != _this.Success) {
            alert(redata.body.msg);
          }else{
            _this.projectData[index]=redata.body.data
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.projectlist{
  display:inline-block;
  margin-top:10px;
  margin-left:50px;
}
input {
  line-height: 25px;
  padding: 5px;
}
select {
  padding: 10px;
}
/* ul {
  margin:0 auto;
  padding:20px 0;
  border-bottom:1px solid #ddd;
} */
li {
  display:inline-block;
  height:35px;
  line-height:35px;
  margin: 5px;
  margin:10px;
}
li input{
  margin:5px;
}
</style>
