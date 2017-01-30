import Vue from 'vue'

export default {
  API_endPoint: process.env.API_endPoint,
  get (num) {
    this.$user = Vue.resource(this.API_endPoint)
    return this.$user.query({
      results: num
    })
  }
}
