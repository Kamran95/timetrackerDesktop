<template>
  <b-container fluid>
    <span id="time" v-html="time"></span>
      <!-- navbar -->
      <b-navbar variant="light" class="px-5">
        <b-navbar-brand href="#">
          <font-awesome-icon icon="clock" class="text-primary mr-2" />Time Tracker 
        </b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand href="#">
            <font-awesome-icon icon="bell" class="text-dark mr-2" />
            <b-img src="https://placekitten.com/g/40/40" rounded="circle" class="ml-3"></b-img>
          </b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
      <!-- navbar ends-->
      <b-row>
        <b-col md="4" class="column1-style text-light" >
          <div class="text-center ">
            <h2><font-awesome-icon icon="bell" class="mr-2 mt-3" />Today</h2>
            <hr />
          </div>

          <div class="d-flex  justify-content-center text-center" >
            <div>
              <p>Hours<br /><span class="font-sizing">{{hours}}</span></p>
            </div>
            <div>
              <p class="mx-2">Minutes<br /><span class="font-sizing">{{minutes}}</span></p>
            </div>
            <div>
              <p>Seconds<br/><span class="font-sizing">{{seconds}}</span></p>
            </div>
          </div>
          
        </b-col>
        <b-col md="4" class="column2-style text-light">
          <div class="text-center">
            <h2><font-awesome-icon icon="calendar-alt" class="mr-2 mt-3" />Weekly</h2>
            <hr />
          </div>
          <div class="d-flex justify-content-center text-center">
            <div>
              <p class="mr-2">Hours<br/> <span class="font-sizing">{{WeeklyHours}}</span></p>
            </div>
            <div>
              <p class="mr-2">Minutes<br/><span class="font-sizing">{{WeeklyMinutes}}</span></p>
            </div>
            <div>
              <p >Seconds<br/><span class="font-sizing">{{WeeklySeconds}}</span></p>
            </div>
          </div>
        </b-col>
        <b-col md="4" class="column3-style text-light ">
          <div class="text-center">
            <h2><font-awesome-icon icon="hospital-alt" class="mr-2 mt-3" />Monthly</h2>
            <hr />
          </div>
          <div class="d-flex justify-content-center text-center">
            <div>
              <p class="mr-2">Hours<br /><span class="font-sizing">{{MonthlyHours}}</span></p>
            </div>
            <div>
              <p class="mr-2">Minutes<br /><span class="font-sizing">{{MonthlyMinutes}}</span></p>
            </div>
           <div>
              <p >Seconds<br/><span class="font-sizing">{{MonthlySeconds}}</span></p>
            </div>
          </div>
        </b-col>
      </b-row>


      <!-- form section-->
      <div class="m-5">
        <b-row style="align:center">
          <b-col>
          <div class="mt-3" >
              <b-button-group>
                <b-button variant="success" v-if=" state=='paused'" @click.prevent="start">Start</b-button>
                <b-button variant="danger" v-else @click.prevent="stop">Stop</b-button>
                 
              </b-button-group>
            </div>  
          </b-col>
      
        </b-row> 
      <b-row>
        <b-col md="6">
          <b-card class="card-style">
            <b-card-body>
              <b-form>

                <h3>Tasks</h3>
                <b-list-group>
                      <b-list-group-item class="d-flex" v-for="(task ,i) in tasks" :key="i">{{task.name}} 
                        
                            <b-form-radio unchecked-value="" class="ml-auto" v-model="selectedTask" name="some-radios" :value="task.task_id"></b-form-radio>
                            </b-list-group-item>
                    </b-list-group>

                <b-form-group id="input-group-2" label="Comment" label-for="comment" class="text-secondary">
                  <b-form-textarea rows="4" max-rows="4" class="overflow-hidden"></b-form-textarea>
                </b-form-group>
                <router-link tag="b-button" to="/app/dashboards/Timer" variant="primary" class="px-3" >Post</router-link>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
        <!-- right-column -->
        <b-col md="6">
          <b-card>
            <template v-slot:header>
               <p class="text-secondary">
                <span class="text-primary snippet-no mr-2">10</span>Snippets
               </p>
           </template>
           <b-card-body class="snippets-card"> 
            <div class="buttonInside py-1">
              <b-form-group id="input-group-3" label="JS Code" label-for="js-code" class="text-secondary">
                <b-form-textarea rows="3" max-rows="3" class="jsTextArea" >
                </b-form-textarea>
              </b-form-group>
              <font-awesome-icon icon="eye" class="font-awesomeIcon" />
            </div>
            <div class="buttonInside">
              <b-form-group id="input-group-4" label="JS Code" label-for="jscode" class="text-secondary">
                <b-form-textarea rows="3" max-rows="3" class="jsTextArea"></b-form-textarea>
              </b-form-group>
              <font-awesome-icon icon="eye" class="font-awesomeIcon" />
            </div>
            <div class="buttonInside py-1">
              <b-form-group id="input-group-3" label="JS Code" label-for="js-code" class="text-secondary">
                <b-form-textarea rows="3" max-rows="3" class="jsTextArea" >
                </b-form-textarea>
              </b-form-group>
              <font-awesome-icon icon="eye" class="font-awesomeIcon" />
            </div>
            <div class="buttonInside py-1">
              <b-form-group id="input-group-3" label="JS Code" label-for="js-code" class="text-secondary">
                <b-form-textarea rows="3" max-rows="3" class="jsTextArea" >
                </b-form-textarea>
              </b-form-group>
              <font-awesome-icon icon="eye" class="font-awesomeIcon" />
            </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      </div>
      <video id="vid2" class="video2" autoplay></video>
     <video id="vid" class="video" autoplay></video>
     <button @click="screenSharing">share Screen</button>
     <button color="red" @click="stopSharing"> Screenshots</button>
     <img src="" id="screenshot" alt="">
  </b-container>
</template>

<script>
import screenshot from '@/assets/js/screenshot'
import renderer from '@/assets/js/renderer'
const {ipcRenderer} =require('electron')
export default {
  created(){
    this.userTasks();
    this.getDailyWorklog();
    this.getWeeklyWorklog();
    this.getMonthlyWorklog();
  },
  data: function() {
            return {
                selectedTask:"",
                tasks:null,
                state: "paused",
                startTime: Date.now(),
                currentTime: Date.now(),
                interval: null,
                pausedAt:null,
                DailyDateTime:null,
                WeeklyDateTime:null,
                MonthlyDateTime:null,
                WeeklyTotalHours:144000000,
                WeeklyHours:40,
                WeeklyMinutes:'00',
                WeeklySeconds:'00',
                MonthlyHours:'00',
                MonthlyMinutes:'00',
                MonthlySeconds:'00',
                MonthlyCalculatedDateTime:null,
                remaningWeeklyDateTime:null
            }
        },
        // mounted: function() {
        //     this.interval = setInterval(this.updateCurrentTime, 1000);
        // },
        destroyed: function() {
            clearInterval(this.interval)
        },
        computed: {
          
          dailyMilliseconds(){
            if(this.DailyDateTime!=null){
              let totalDailyMilliseconds=0;
              for(let i=0; i<this.DailyDateTime.length; i++){
                  if(this.DailyDateTime[i].inTime!="" && this.DailyDateTime[i].outTime!=""){
                    let date1=new Date(this.DailyDateTime[i].inTime)
                    let date2=new Date(this.DailyDateTime[i].outTime)
                    let diff=this.calculateTimeDifference(date1,date2)
                    totalDailyMilliseconds+=diff
                  }
              }
              this.calculateTime(totalDailyMilliseconds)
              return totalDailyMilliseconds
            }else{
              return 0
            }

            
          },
            time: function() {
                return this.hours + ':' + this.minutes + ':' + this.seconds;
            },
            MonthlyMilliseconds: function() {
                  let monthlyCalculatedTime=this.MonthlyCalculatedDateTime+(this.currentTime - this.startTime)
                  console.log("Monthly time",monthlyCalculatedTime);
                  let calculatedtime=this.calculateTime(monthlyCalculatedTime)
                  this.MonthlyHours=calculatedtime.hours
                  this.MonthlyMinutes=calculatedtime.minutes
                  this.MonthlySeconds=calculatedtime.seconds
                  return monthlyCalculatedTime
                
            },
             Weeklymilliseconds: function() {
             
                if(this.remaningWeeklyDateTime!=null){
                  console.log("start minus current",this.currentTime - this.startTime);
                  let remaningWeeklyCalculatedTime=this.remaningWeeklyDateTime-(this.currentTime - this.startTime)
                  let calculatedtime=this.calculateTime(remaningWeeklyCalculatedTime)
                  this.WeeklyHours=calculatedtime.hours
                  this.WeeklyMinutes=calculatedtime.minutes
                  this.WeeklySeconds=calculatedtime.seconds
                  return remaningWeeklyCalculatedTime
                }else{return (this.currentTime - this.startTime);}
                
            },
            milliseconds: function() {
              this.Weeklymilliseconds
              // return this.currentTime - this.startTime;
              if(this.pausedAt!=null && this.state=='started'){
                return (this.currentTime - this.startTime)+this.pausedAt;
              }
              else{
                if(this.dailyMilliseconds!=null){
                  return (this.currentTime - this.startTime)+this.dailyMilliseconds
                }else{return (this.currentTime - this.startTime);}
                
              }
              
                
            },
            hours: function() {
                var lapsed = this.milliseconds;
                var hrs = Math.floor((lapsed / 1000 / 60 / 60));
                return hrs >= 10 ? hrs : '0' + hrs;
            },
            minutes: function() {
              if(this.state!='paused'){
                localStorage.setItem("timeSpent",this.currentTime - this.startTime)
              }
              
                var lapsed = this.milliseconds;
                var min = Math.floor((lapsed / 1000 / 60) % 60);
                return min >= 10 ? min : '0' + min;
            },
            seconds: function() {
                var lapsed = this.milliseconds;
                var sec = Math.ceil((lapsed / 1000) % 60);
                return sec >= 10 ? sec : '0' + sec;
            }
        },
        methods: {
          stopSharing(){
            ipcRenderer.send('channel2','start')
            
          },
          screenSharing(){
              ipcRenderer.send('channel1','start')
          },
          monthlyMilliseconds(){
            if(this.MonthlyDateTime!=null || this.MonthlyDateTime!=undefined){
              let totalMonthlyDateTime=0;
              for(let i=0; i<this.MonthlyDateTime.length; i++){
                  if(this.MonthlyDateTime[i].inTime!="" && this.MonthlyDateTime[i].outTime!=""){
                    let date1=new Date(this.MonthlyDateTime[i].inTime)
                    let date2=new Date(this.MonthlyDateTime[i].outTime)
                    let diff=this.calculateTimeDifference(date1,date2)
                    console.log("Monthly diff is ",diff);
                    totalMonthlyDateTime+=diff
                  }
              }
               console.log("monthly",totalMonthlyDateTime);
              let MonthlyTime=this.calculateTime(totalMonthlyDateTime)
              console.log("Monthly time recieved",MonthlyTime);
              this.MonthlyHours=MonthlyTime.hours
              this.MonthlyMinutes=MonthlyTime.minutes
              this.MonthlySeconds=MonthlyTime.seconds
              console.log("totalMonthlyDateTime",totalMonthlyDateTime);
              this.MonthlyCalculatedDateTime=totalMonthlyDateTime
            }else{
              this.MonthlyCalculatedDateTime=0;
            }

            
          },
          weeklyMilliseconds(){
            if(this.WeeklyDateTime!=null || this.WeeklyDateTime!=undefined){
              let totalWeeklyDateTime=0;
              for(let i=0; i<this.WeeklyDateTime.length; i++){
                  if(this.WeeklyDateTime[i].inTime!="" && this.WeeklyDateTime[i].outTime!=""){
                    let date1=new Date(this.WeeklyDateTime[i].inTime)
                    let date2=new Date(this.WeeklyDateTime[i].outTime)
                    let diff=this.calculateTimeDifference(date1,date2)
                    console.log("weekly diff is ",diff);
                    totalWeeklyDateTime+=diff
                  }
              }
              console.log("weekly",totalWeeklyDateTime);
              totalWeeklyDateTime=this.WeeklyTotalHours-(totalWeeklyDateTime)
              let WeeklyTime=this.calculateTime(totalWeeklyDateTime)
              console.log("Weekly time recieved",WeeklyTime);
              this.WeeklyHours=WeeklyTime.hours
              this.WeeklyMinutes=WeeklyTime.minutes
              this.WeeklySeconds=WeeklyTime.seconds
              console.log("totalWeeklyDateTime",totalWeeklyDateTime);
              this.remaningWeeklyDateTime=totalWeeklyDateTime
            }else{
              this.remaningWeeklyDateTime=this.WeeklyTotalHours;
            }

            
          },
          calculateTime(milliseconds){
              let hours=this.calHours(milliseconds);
              let minutes=this.calMinutes(milliseconds);
              let seconds=this.calSeconds(milliseconds);
              let data=data={hours:hours,minutes: minutes,seconds: seconds}
              return data
              console.log("hours= "+hours+", Minutes= "+minutes+", seconds= "+seconds);
          },
          calHours(milliseconds) {
                var lapsed =milliseconds;
                var hrs = Math.floor((lapsed / 1000 / 60 / 60));
                return hrs >= 10 ? hrs : '0' + hrs;
            },
            calMinutes(milliseconds) {
                var lapsed = milliseconds;
                var min = Math.floor((lapsed / 1000 / 60) % 60);
                return min >= 10 ? min : '0' + min;
            },
            calSeconds(milliseconds){
                var lapsed =milliseconds;
                var sec = Math.ceil((lapsed / 1000) % 60);
                return sec >= 10 ? sec : '0' + sec;
            },
          getDailyWorklog(){
            return this.$store.dispatch('getDailyWorklog')
            .then(res=>{
              console.log(res);
              this.DailyDateTime=res.data.dailyReportWithoutProjId
              this.dailyMilliseconds
            })
            .catch(err=>{
              console.log(err)
            })
          },
           getWeeklyWorklog(){
            this.$store.dispatch('getWeeklyWorklog')
            .then(res=>{
              console.log("Weekly",res.data.weeklyReportWithoutProjId);
              this.WeeklyDateTime=res.data.weeklyReportWithoutProjId
              this.weeklyMilliseconds()
            })
            .catch(err=>{
              console.log(err)
            })
          },
          getMonthlyWorklog(){
            this.$store.dispatch('getMonthlyWorklog')
            .then(res=>{
              console.log("Monthly",res.data.monthlyReportWithoutProjId);
              this.MonthlyDateTime=res.data.monthlyReportWithoutProjId
              this.monthlyMilliseconds()
            })
            .catch(err=>{
              console.log(err)
            })
          },
            start: function() {
              let d = new Date();
              let currentDate=d.getUTCDate();
              let currentMonth = d.getMonth()+1;
              let currentyear = d.getFullYear();
              let today = new Date();
              let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              let form={
                  "proj_id": 9,
                  "login_time":currentyear+"-"+currentMonth+"-"+currentDate+" "+time,
                  "logout_time": null
              }
              console.log("form",form)
              this.$store.dispatch('addWorklog',form)
            .then(res=>{
              console.log("start response is",res)
              console.log(res.data.work_log_id);
              let data={
                worklogId:res.data.work_log_id,
                startTime:form.login_time
              }
              this.$store.dispatch('setWorklogId',data)
              .then(()=>{
                clearInterval(this.interval);
                
                this.interval = setInterval(this.updateCurrentTime, 1000);
                this.startTime=Date.now();
                this.$data.startTime = Date.now();
                this.$data.currentTime = Date.now();
                this.$data.state = "started"; 
              })
            })
            .catch(err=>{
              console.log(err)
            })
                
            },
            
            stop: function() {
              //2020-4-16 13:59:19
              //2020-4-16 13:59:23
              // let date1=new Date('2020-4-16 14:7:31')
              // let date2=new Date('2020-4-16 14:7:12')
              // let diff=this.calculateTimeDifference(date2,date1)
              // console.log(diff);
              let d = new Date();
              let currentDate=d.getUTCDate();
              let currentMonth = d.getMonth()+1;
              let currentyear = d.getFullYear();
              let today = new Date();
              let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
               let timeData=
                  {
                    "logout_time":currentyear+"-"+currentMonth+"-"+currentDate+" "+time
                   }
                   let worklogId=this.$store.getters['getWorklogId'];
                   console.log(worklogId);
              let data={
                logoutTime:timeData,
                id:worklogId
              }
              this.$store.dispatch('updateWorklog',data)
            .then(res=>{
              let data={
                worklogId:null,
                startTime:null
              }
              this.$store.dispatch('setWorklogId',data)
              .then(()=>{       
                  this.getMonthlyWorklog();
                  this.getDailyWorklog();
                  this.getWeeklyWorklog();
              })
                  
              
            })
            .catch(err=>{
              console.log(err)
            })
                this.$data.state = "paused";
                this.$data.startTime = Date.now();
                this.$data.currentTime = Date.now();
                this.pausedAt=null
                this.startTime=Date.now();
                clearInterval(this.interval);
            },
            
            updateCurrentTime: function() {
                if (this.$data.state == "started") {
                    this.currentTime = Date.now();
                    this.MonthlyMilliseconds
                }
            },
            userTasks(){
              this.$store.dispatch('userTasks')
              .then((res)=>{
                  console.log(res)
                  this.tasks=res.data.assignandunassignedtasks_report
              })
              .catch(err=>{
                console.log(err)
              })
            },
            calculateTimeDifference(Date1,Date2){
              return Date2-Date1;
            }        
        }
};
</script>

<style lang="scss" scoped>


.snippet-no {
  border: 1px solid #2f6ad9;
  border-radius: 100%;
  padding: 5px;
}
.buttonInside {
  position: relative;
  margin-bottom: 10px;
}
.font-awesomeIcon {
  position: absolute;
  right: 10px;
  top: 70px;
}
.column1-style{
  background-image: linear-gradient(to right, rgb(0,78,146) , rgb(78,161,175));
}
.column2-style{
  background-image: linear-gradient(to right, rgb(160,165,227) , rgb(104,102,233));
}
.column3-style{
  background-image: linear-gradient(to right, rgb(255,137,147) , rgb(254,182,131));
}
.column4-style{
  background-image: linear-gradient(to right, rgb(100,65,165) , rgb(221,139,163));
}
.font-sizing{
  font-size: 28px;
}
.jsTextArea{
  overflow: hidden;
}
.snippets-card{
  max-height:255px;
  overflow-y: auto;
}
hr{
      border-top: 1px solid #fff;
}
</style>