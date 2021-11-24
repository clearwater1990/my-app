<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>
  </div>

</template>
<script>

import axios from "axios";

export default {
  data () {
    return {
      headers: [
        {
          text: '队伍名称',
          align: 'start',
          sortable: false,
          value: 'teamName',
        },
        { text: '抽签顺序', value: 'teamNumber' },
        { text: '抽签时间', value: 'date' },
        { text: '理论测试', value: 'lilunMember' },
        { text: '实验考核', value: 'shiyanMember' },
        { text: '虚拟仿真', value: 'fangzhenMember' },
        { text: '答辩', value: 'dabianMember' },
      ],
      desserts: [],
    };
  },
  methods: {
    exportResult() {
      let taskId = this.$route.params.id
      let header = {'Content-Type': 'application/json'}
      let url = this.api.LoginURL + "/task/export/" + taskId
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
    }
  },
}
</script>
