<template>
  <div id="Contact">
    <DllList v-bind:DllData=DllData v-bind:projectData=projectData />
  </div>
</template>
<script>
import DllList from "../DllList.vue";
export default {
  name: "Contact",
  components: {
    DllList
  },
  data: function() {
    return {
      DllData: [],
      projectData: []
    };
  },
  created: function() {
    this.getDllList();
  },
  methods: {
    getDllList: function() {
      var _this = this;
      var detailFilters = [];
      detailFilters.push(_this.NewFilter("AddUserId", "=", _this.UserID));
      detailFilters = JSON.stringify(detailFilters);

      var orderFilters = [{ name: "ProjectId", order: 0 }];
      orderFilters = JSON.stringify(orderFilters);
      this.HttpPost(
        "/api/tool/dll/project/getlist",
        {
          pageindex: 1,
          pagesize: 100,
          filters: detailFilters,
          orders: orderFilters
        },
        function(redata) {
          if (redata.body.flag == _this.Success) {
             if (redata.body.flag == _this.Success) {
            _this.projectData = redata.body.data;
          }
          }
        }
      );
      var dllFilters = [];
      dllFilters.push(_this.NewFilter("AddUserId", "=", _this.UserID));
      dllFilters = JSON.stringify(dllFilters);
      var dllOrderFilters = [{ name: "DataDllId", order: 0 }];
      dllOrderFilters = JSON.stringify(dllOrderFilters);
      this.HttpPost(
        "/api/tool/dll/datadll/getlist",
        { pageindex: 1, pagesize: 500, filters: dllFilters,orders:dllOrderFilters },
        function(redata) {
          if (redata.body.flag == _this.Success) {
            _this.DllData = redata.body.data;
          }
        }
      );
    }
  }
};
</script>