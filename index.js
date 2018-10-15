const app = new Vue({
  el: '#app',
  data() {
    return {
      handler: null,
    }
  },
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
    async makePayment(stripeToken) {
      console.log(stripeToken)
      try {
        const response = await axios.post('http://localhost:3000/pay', {
          stripeToken: stripeToken.id
        })
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async orxFinish() {
      //MAKE ORX PARTICIPATE
    },
    async done(stripeToken) {
      await this.makePayment(stripeToken) 
      this.close()
      await this.orxFinish()
    },
    close() {
      this.handler.close()
    },
  }
})