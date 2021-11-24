<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="3">
        <v-img
            :src="require('../assets/school_logo.svg')"
            class="my-3"
            contain
            height="100"
        />
      </v-col>
      <v-col class="mb-4" cols="6">
        <h3 class="display-1 font-weight-bold mb-4">
          决赛抽签
        </h3>
      </v-col>
      <v-col cols="3">
        <v-img
            :src="require('../assets/colleage_logo.svg')"
            class="my-3"
            contain
            height="100"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="input"
             cols="12"
             sm="6"
             md="3"
      >
        <v-text-field
            label="队伍名称"
            outlined
            v-model="teamName"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="input"
             cols="12"
             sm="6"
             md="3"
      >
        <v-text-field
            label="队员01"
            outlined
            v-model="member_1"
        ></v-text-field>
      </v-col>
      <v-col class="input"
             cols="12"
             sm="6"
             md="3"
      >
        <v-text-field
            label="队员02"
            outlined
            v-model="member_2"
        ></v-text-field>
      </v-col>
      <v-col class="input"
             cols="12"
             sm="6"
             md="3"
      >
        <v-text-field
            label="队员03"
            outlined
            v-model="member_3"
        ></v-text-field>
      </v-col>
      <v-col class="input"
             cols="12"
             sm="6"
             md="3"
      >
        <v-text-field
            label="队员04"
            outlined
            v-model="member_4"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
          class="ma-10"
          color="error"
          @click="drawLot"
      >
        <span>抽   签</span>
        <template v-slot:loader>
          <span>抽签中...</span>
        </template>
      </v-btn>
      <v-btn
          class="ma-2"
          color="secondary"
          @click="queryResult()"
      >
        查看结果
      </v-btn>
      <v-btn
          class="ma-2"
          color="green"
          @click="exportResult()"
      >
        导出结果
      </v-btn>
    </div>
    <div ref="drawResult" hidden="true">
      <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
      ></v-data-table>
    </div>
    <div class="text-center">
      <v-dialog
          width="500"
          v-model="dialog"
      >
        <v-card>
          <v-card-title class="text-h5 error lighten-2">
            提示
          </v-card-title>

          <v-card-text>
            {{ errorMsg }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data() {
    return {
      headers: [
        {
          text: '队伍名称',
          align: 'start',
          sortable: false,
          value: 'teamName',
        },
        {text: '抽签顺序', value: 'teamNumber'},
        {text: '抽签时间', value: 'date'},
        {text: '理论测试', value: 'lilunMember', sortable: false,},
        {text: '实验考核', value: 'shiyanMember', sortable: false,},
        {text: '虚拟仿真', value: 'fangzhenMember', sortable: false,},
        {text: '答辩', value: 'dabianMember', sortable: false,},
      ],
      members: ['member_1', 'member_2', 'member_3', 'member_4'],
      desserts: [],
      teamName: null,
      member_1: null,
      member_2: null,
      member_3: null,
      member_4: null,
      dialog: false,
      errorMsg: null,
    }
  },
  mounted() {
    // this.drawLot();
    // this.queryResult();
  },
  methods: {
    drawLot() {
      let taskId = this.$route.params.id
      let body = {
        "team_name": this.teamName,
        "members": [this.member_1, this.member_2, this.member_3, this.member_4]
      }
      let header = {'Content-Type': 'application/json'}
      axios.post(this.api.LoginURL + "/task/draw/" + taskId, body, header).then(response => {
        console.log(response)
        if ("success" == response.data.msg || "成功" == response.data.msg) {
          let result = response.data.data
          this.desserts = [result]
          this.$refs.drawResult.hidden = false
        } else {
          this.dialog = true
          this.errorMsg = response.data.msg
          this.$refs.drawResult.hidden = true
        }
      })
    },
    queryResult() {
      let taskId = this.$route.params.id
      let header = {'Content-Type': 'application/json'}
      let url = this.api.LoginURL + "/task/" + taskId
      if (this.teamName != undefined) {
        url += "?teamName=" + this.teamName
      }
      axios.get(url, header).then(response => {
        console.log(response)
        if ("success" == response.data.msg || "成功" == response.data.msg) {
          let result = response.data.data
          this.desserts = result
          this.$refs.drawResult.hidden = false
        } else {
          this.dialog = true
          this.errorMsg = response.data.msg
          this.$refs.drawResult.hidden = true
        }
      })
    },
    exportResult() {
      let taskId = this.$route.params.id
      let header = {'Content-Type': 'application/octet-stream', 'responseType': 'blob'}
      let url = this.api.LoginURL + "/task/export/" + taskId
      axios.get(url, header).then(res => {
        let data = res.data // 这里后端对文件流做了一层封装，将data指向res.data即可
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        let now = new Date().getTime()
        a.setAttribute('download', 'result_' + now + '.csv')
        document.body.appendChild(a)
        a.click() //执行下载
        window.URL.revokeObjectURL(a.href) //释放url
        document.body.removeChild(a) //释放标签
      })
    }
  },
}
</script>
