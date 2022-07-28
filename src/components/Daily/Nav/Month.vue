<template>
  <div id="month">
    <div>
      <input ref="isyear" type="checkbox" v-model="isyear" v-on:change="searchDetail">
      年份：
      <select ref="year" v-model="year" v-on:change="searchDetail">
        <option
          v-for="year in yearData"
          v-bind:key="year.year"
          v-bind:value="year.year"
        >{{year.year}}</option>
      </select>
      月份：
      <select ref="month" v-model="month" v-on:change="searchDetail">
        <option
          v-for="month in monthData"
          v-bind:key="month.month"
          v-bind:value="month.month"
        >{{month.month}}</option>
      </select>
    </div>
    <MonthStatistics v-bind:useData="useData" />
  </div>
</template>

<script>
import MonthStatistics from "../MonthStatistics";
export default {
  name: "month",
  components: {
    MonthStatistics
  },
  data: function() {
    return {
      useData:[],
      yearData: [{ year: 2019 }, { year: 2020 }, { year: 2021 }],
      monthData: [
        { month: 1 },
        { month: 2 },
        { month: 3 },
        { month: 4 },
        { month: 5 },
        { month: 6 },
        { month: 7 },
        { month: 8 },
        { month: 9 },
        { month: 10 },
        { month: 11 },
        { month: 12 }
      ],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      isyear:false
    };
  },
  created: function() {
    this.searchDetail();
  },
  methods: {
    getStatistics: function(year, month,isyear) {
      var _this = this;
      var startDate = new Date(year + "=" + month);
      var endDate = new Date(year + "=" + month);
      if(isyear){
        startDate.setMonth(0);
        endDate.setMonth(0);
        endDate.setFullYear(startDate.getFullYear() + 1);
      }else{
        endDate.setMonth(startDate.getMonth() + 1);
      }

      var detailFilters = [];
      detailFilters.push(
        _this.NewFilter("StartTime", ">=", startDate.toLocaleDateString())
      );
      detailFilters.push(
        _this.NewFilter("EndTime", "<", endDate.toLocaleDateString())
      );
      detailFilters.push(_this.NewFilter("DailyType", "=", "1"));
      detailFilters.push(_this.NewFilter("AddUserId", "=", _this.UserID));
      detailFilters = JSON.stringify(detailFilters);
      var orderFilters = [];
      orderFilters.push({ name: "StartTime", order: 0 });
      orderFilters = JSON.stringify(orderFilters);

      _this.HttpPost(
        "/api/tool/daily/detail/getstatistics",
        {
          filters: detailFilters,
          orders: orderFilters
        },
        function(redata) {
          if (redata.body.flag == _this.Success) {
            _this.useData = redata.body.data;
          }
        }
      );
    },
    searchDetail: function() {
      this.getStatistics(this.year, this.month,this.isyear);
    },
  }
};
</script>

<style scoped>
#month {
  margin: 20px;
}
select {
  padding: 10px;
}
</style>