<template>
  <div id="project">
    <ProjectList v-bind:projectData="projectData" />
  </div>
</template>

<script>
import ProjectList from "../ProjectList";
export default {
  name: "project",
  components: {
    ProjectList
  },
  data: function() {
    return {
      projectData:[]
    };
  },
  created: function() {
    var _this = this;
    var detailFilters = [];
    detailFilters.push(_this.NewFilter("AddUserId", "=", _this.UserID));
    detailFilters = JSON.stringify(detailFilters);
    var orderFilters = [{name:"ProjectId",order:0}];
    orderFilters = JSON.stringify(orderFilters);
    this.HttpPost("/api/tool/daily/project/getlist",{pageindex:1,pagesize:100,filters:detailFilters,orders:orderFilters},function(redata){
      if(redata.body.flag==_this.Success){
        _this.projectData = redata.body.data;
      }
    })
  }
};
</script>

<style>
</style>
