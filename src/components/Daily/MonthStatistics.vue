<template>
  <div class="MonthStatistics">
    <div class="list" v-for="(project,index) in useData" v-bind:key="project.ProjectId">
      <h2>{{index+1}}.{{project.ProjectName}}</h2>
      <ul v-for="(daily,index) in project.dailyData" v-bind:key="index">
        <li>
          <span>{{daily.StartTime}}</span>
          &nbsp;&nbsp;{{daily.Details}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthStatistics",
  props: {
    useData: Array
  },
  methods: {}
};
</script>

<style scoped>
.MonthStatistics{
  margin: 10px;
}
.list {
  display: inline-block;
  border: 1px solid #ddd;
  font-size: 14px;
  vertical-align: top;
  padding: 20px 0;
  width: 600px;
  color: #333333;
  height: 500px;
  overflow-y: scroll;
  margin:1px;
}
select {
  padding: 10px;
}
ul,
h2 {
  margin: 0 auto;
  padding: 0 10px;
}
li {
  display: inline-block;
  line-height: 30px;
  margin: 0 3px;
}
h2 {
  color: #2980b9;
  margin: 10px 0;
}
li span {
  color: #963131;
}
/*滚动条样式*/
.list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 2px;
}
.list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}
.list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
}
</style>