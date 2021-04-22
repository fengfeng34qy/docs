export default {
  created () {
    if (this.$options.events) {
      console.log(this.$options)
      Object.keys(this.$options.events).forEach(key => {
        let handler = this.$options.events[key]
        if (typeof handler === 'string') {
          handler = this[handler]
        }
        this[key + '::handler'] = handler.bind(this)
        this.$root.$on('global::' + key, this[key + '::handler'])
      })
    }
  },
  beforeDestroy () {
    if (this.$options.events) {
      Object.keys(this.$options.events).forEach(key => {
        this.$root.$off('global::' + key, this[key + '::handler'])
      })
    }
  }
}
