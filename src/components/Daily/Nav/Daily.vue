<template>
  <div id="daily">
    <input type="hidden" v-model="writeDate" @keydown.enter="getDetailsList" />
    <DailyList
      v-bind:dailyData="dailyData"
      v-bind:dailyType="dailyType"
      v-bind:projectData="projectData"
      v-bind:writeDate="writeDate"
    />
  </div>
</template>

<script>
import DailyList from "../DailyList";
export default {
  name: "daily",
  components: {
    DailyList
  },
  data: function() {
    return {
      dailyData: [],
      projectData: [],
      dailyType: [
        { name: "日报", value: 1 }
        // {name:'月报',value:2},
        // {name:'年报',value:3}
      ],
      writeDate: new Date().toLocaleDateString()
    };
  },
  created: function() {
    this.getDetailsList();
  },
  methods: {
    getDetailsList: function() {
      var _this = this;
      var nowDate = new Date(_this.writeDate);
      var afterDate = new Date(
        new Date(_this.writeDate).setDate(nowDate.getDate() + 1)
      );
      var detailFilters = [];
      detailFilters.push(
        _this.NewFilter("starttime", ">=", nowDate.toLocaleDateString())
      );
      detailFilters.push(
        _this.NewFilter("starttime", "<", afterDate.toLocaleDateString())
      );
      detailFilters.push(_this.NewFilter("DailyType", "=", "1"));
      detailFilters.push(_this.NewFilter("AddUserId", "=", _this.UserID));
      detailFilters = JSON.stringify(detailFilters);

      var orderFilters = [{ name: "starttime", order: 0 }];
      orderFilters = JSON.stringify(orderFilters);
      this.HttpPost(
        "/api/tool/daily/detail/getlist",
        {
          pageindex: 1,
          pagesize: 100,
          filters: detailFilters,
          orders: orderFilters
        },
        function(redata) {
          if (redata.body.flag == _this.Success) {
            _this.dailyData = redata.body.data;
          }
        }
      );
      var projectFilters = [];
      projectFilters.push(new _this.NewFilter("IsUsed", "=", 1));
      projectFilters.push(_this.NewFilter("AddUserId", "=", _this.UserID));
      projectFilters = JSON.stringify(projectFilters);
      this.HttpPost(
        "/api/tool/daily/project/getlist",
        { pageindex: 1, pagesize: 100, filters: projectFilters },
        function(redata) {
          if (redata.body.flag == _this.Success) {
            _this.projectData = redata.body.data;
            _this.projectData.push({ ProjectId: 0, ProjectName: "无" });
          }
        }
      );
    }
  }
};
</script>

<style scoped>
input {
  line-height: 25px;
  padding: 5px;
  margin-left: 60px;
  margin-top: 10px;
}
</style>
