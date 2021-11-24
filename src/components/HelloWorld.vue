<template>
  <v-container>
    <v-row>
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
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
          class="ma-10"
          :loading="loading2"
          :disabled="loading2"
          color="error"
          @click="loader = 'loading2'"
      >
        <span>抽   签</span>
        <template v-slot:loader>
          <span>作弊中...</span>
        </template>
      </v-btn>
      <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="secondary"
          @click="loader = 'loading'"
      >
        查看结果
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
