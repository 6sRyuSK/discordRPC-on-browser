<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import discordRPC from 'discord-rpc'

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  created() {
    console.log('hello')
    this.createRpcClient()
  }

  createRpcClient() {
    const client = new discordRPC.Client({ transport: 'websocket' })
    const clientId = '730968152514756759'
    const scopes = ['rpc', 'rpc.api', 'messages.read']
    client.on('ready', () => {
      console.log('Logged in as ', client.application.name)
    })
    client.login({ clientId, scopes })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
