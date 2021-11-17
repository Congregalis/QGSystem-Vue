<template>
  <div class="app-container">
    <div class="dashboard-text">👋 你好， {{ name }}</div>
    <p> 头像来自 <a :href="avatar" target="_blank">{{ avatar }} </a></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'introduction',
      'avatar'
    ])
  },
  data() {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
p {
    margin-top: 5%;
}
</style>

