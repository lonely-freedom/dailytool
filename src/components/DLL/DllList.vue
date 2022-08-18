<template>
  <div id="DllList">
    <div>
      项目：
      <select ref="ProjectId">
        <option
          v-for="project in projectData"
          v-bind:key="project.ProjectId"
          v-bind:value="project.ProjectId"
        >{{project.ProjectName}}</option>
      </select>
      DataDll：
      <select ref="DataDllId">
        <option
          v-for="dll in DllData"
          v-bind:key="dll.DataDllId"
          v-bind:value="dll.DataDllId"
        >{{"["+dll.DataDllId+"]"+dll.DataDllName}}</option>
      </select>
      <input @click="saveContact" type="button" value="Modify">
    </div>
    <div>
      <input type="text" placeholder="DLL名称" ref="addDllName">
      <input type="text" placeholder="DLL路径" ref="addDllPath">
      <input @click="addDataDll" type="button" value="AddDataDll">
    </div>
  </div>
</template>


<script>
export default {
  name: "DllList",
  props: {
    DllData: Array,
    projectData: Array
  },
  methods:{
    saveContact:function(){
      var _this = this;
      var projectid =  _this.$refs.ProjectId.value;
      var dllid =  _this.$refs.DataDllId.value;
      var updata= {ProjectId:projectid,DataDllId:dllid};
      if(isNaN(updata.AddUserId)){
          updata.AddUserId = _this.UserID;
      }
      _this.HttpPost("/api/tool/dll/contact/insert", updata, function(
          redata
        ) {
          if (redata.body.flag != _this.Success) {
            alert(redata.body.msg);
          }
        });
    },
    addDataDll:function(){
      var _this = this;
      var name =  _this.$refs.addDllName.value;
      var path =  _this.$refs.addDllPath.value;
      var updata = {DataDllDir:path,DataDllName:name,AddUserId:_this.UserID}
      _this.HttpPost("/api/tool/dll/datadll/add", updata, function(
          redata
        ) {
          if (redata.body.flag != _this.Success) {
            alert(redata.body.msg);
          }
        });
    }
  }
};
</script>