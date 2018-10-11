const app = new Vue({
  el: '#app',
  data:() => ({
    handler: null,
  }),
  created() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_poofr0LLRyvDHae1Ox36OBLe',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: this.getToken
    })
  },
  beforeDestroy() {
    this.handler.close()
  },
  methods: {
    pay() {
      console.log('pay')

      this.handler.open({
        name: 'Gigiporra payment',
        description: 'description gigiporra payment',
        amount: 50
      })
    },
    getToken(token) {
      console.log(token)
    }
  }
})