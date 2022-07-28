<template>
  <div class="view" @keydown.107="addRow" v-on:click.right="addRow" v-on:dblclick.left="addRow">
    <div class="dailylist">
      <div>
        <div class="dailytype">
          <ul>
            <li>
              <select ref="dailyType">
                <option
                  v-bind:value="type.value"
                  v-for="type in dailyType"
                  v-bind:key="type.value"
                >{{type.name}}</option>
              </select>
            </li>
          </ul>
        </div>
        <div class="dailywrite">
          <ul
            v-for="(daily,index) in dailyData"
            v-bind:key="daily.DetailId"
            @keydown.enter="saveDaily(index)"
          >
            <li>
              <select v-model="daily.ProjectId">
                <option
                  v-bind:value="project.ProjectId"
                  v-for="project in projectData"
                  v-bind:key="project.ProjectId"
                >{{project.ProjectName}}</option>
              </select>
            </li>
            <li>
              <input type="hidden" v-model="daily.DetailId" />
            </li>
            <!-- <li>
              <input type="text" class="min-input" v-model="daily.StartTime" />
            </li>
            <li>
              <input type="text" class="min-input" v-model="daily.EndTime" />
            </li> -->
            <li>
              <input type="text" class="details-input" v-model="daily.Details" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="dailyshow">
      <h2>{{writeDate}}</h2>
      <span
        v-for="(daily,index) in dailyData"
        v-bind:key="daily.DetailId"
      >{{index+1}}、{{daily.Details}}<br /></span>
      <!-- {{getProjectName(daily.ProjectId)}} -->
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyList",
  props: {
    dailyData: Array,
    dailyType: Array,
    projectData: Array,
    writeDate:String,
  },
  methods: {
    addRow: function() {
      this.dailyData.push(this.defaultMOdel());
    },
    saveDaily: function(index) {
      var _this = this;
      var DailyType = _this.$refs.dailyType.value;
      var postData = JSON.stringify(_this.dailyData[index]);
      var updata = JSON.parse(postData);
      if (
        !_this.valiIsNull(updata.Details)
      ) {
        updata.StartTime = _this.writeDate;
        // updata.StartTime =
        //   new Date(_this.writeDate).toLocaleDateString() +
        //   " " +
        //   _this.dealNumberToTime(updata.StartTime);
        // updata.EndTime =
        //   new Date(_this.writeDate).toLocaleDateString() +
        //   " " +
        //   _this.dealNumberToTime(updata.EndTime);

        if (_this.valiIsNull(updata.DailyType)) {
          updata.DailyType = DailyType;
        }
        if(isNaN(updata.AddUserId)){
          updata.AddUserId = _this.UserID;
        }

        _this.HttpPost("/api/tool/daily/detail/insert", updata, function(
          redata
        ) {
          if (redata.body.flag != _this.Success) {
            alert(redata.body.msg);
          }else{
            _this.dailyData[index] = redata.body.data;
          }
        });
      }
    },
    // dealNumberToTime: function(value) {
    //   if (isNaN(value)) {
    //     return 8 + ":" + "30";
    //   }
    //   var hour = Math.floor(value);
    //   var min = Math.floor((value % 1) * 60);
    //   return this.addZero(hour) + ":" + this.addZero(min);
    // },
    addZero: function(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    getNowDate: function() {
      var nDate = new Date();
      return (
        this.addZero(nDate.getMonth() + 1) + "-" + this.addZero(nDate.getDate())
      );
    },
    getProjectId: function(ProjectId) {
      if (isNaN(ProjectId)) {
        ProjectId = 0;
      }
      return ProjectId;
    },
    getProjectName: function(ProjectId) {
      var projectName = "";
      if (!isNaN(ProjectId) && ProjectId > 0) {
        this.projectData.forEach(x => {
          if (x.ProjectId == ProjectId) {
            projectName = x.ProjectName + "项目";
          }
        });
      }
      return projectName;
    },
    defaultMOdel: function() {
      return { ProjectId: 0 };
    }
  }
};
</script>

<style scoped>
.view {
  margin-left: 50px;
  margin-top: 10px;
}
input {
  line-height: 25px;
  padding: 5px;
}
.min-input {
  width: 30px;
}
.details-input {
  width: 500px;
}
select {
  padding: 10px;
}
.dailyshow {
  width: 1000px;
  border: 1px solid #ddd;
  padding: 10px 20px;
  font-size:14px;
}
ul {
  margin: 0 auto;
  padding: 10px;
}
li {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  margin: 0 3px;
}
</style>