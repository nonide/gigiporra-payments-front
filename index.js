const API_URL =  'https://gigiporra-payments.now.sh'
const LOGO_URL = "https://orchextra-images-pt-tmp-dev.s3-eu-west-1.amazonaws.com/a524ca9bac5d24a1bbc3cbb6d3903d85"

const PK_TOKEN = "pk_test_poofr0LLRyvDHae1Ox36OBLe"
const AMOUNT = 300

const app = new Vue({
  el: '#app',
  data() {
    return {
      handler: null,
    }
  },
  created() {
    this.handler = StripeCheckout.configure({
      key: PK_TOKEN,
      image: LOGO_URL,
      locale: 'es',
      zipCode: false,
      token: this.done,
      closed: this.stopFullscreen
    })
  },
  methods: {
    startFullscreen() {
      window.top.postMessage({ type: 'startFullscreen' }, '*')
    },
    stopFullscreen() {
      window.top.postMessage({ type: 'stopFullscreen' }, '*')
    },
    pay() {
      this.startFullscreen()
      this.handler.open({
        name: 'Participación',
        amount: AMOUNT,
        currency: 'eur',
      })
    },
    async makePayment(stripeToken) {
      try {
        const response = await axios.post(`${API_URL}/pay`, {
          stripeToken: stripeToken.id
        })
      } catch (error) {
        console.error(error);
      }
    },
    async done(stripeToken) {
      await this.makePayment(stripeToken) 
      this.handler.close()
      this.stopFullscreen()
      window.top.postMessage({ type: 'orchextraPromotoolEnd' }, '*')
    },
  }
})