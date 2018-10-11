const app = new Vue({
  el: '#app',
  data:() => ({
    handler: null,
  }),
  created() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_poofr0LLRyvDHae1Ox36OBLe',
      image: 'https://orchextra-images-pt-tmp.s3-eu-west-1.amazonaws.com/ce3de53dcd0c92631fbbeeecc1fd7ba5',
      locale: 'es',
      zipCode: false,
      token: this.done
    })
  },
  methods: {
    pay() {
      this.handler.open({
        name: 'Participación',
        amount: 300,
        currency: 'eur',
      })
    },
    done(token) {
      //CALL API

      //WHEN DONE, CALL ORX PARTICIPATION
    },
    // close() {
    //   this.handler.close()
    // },
  }
})