<template>
  <v-app light style="overflow:hidden;">
    <v-content>
      <v-fade-transition mode="out-in">
        <nuxt/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    middleware: ['checkAuth'],
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        loginStatus: 'auth/loginStatus',
      })
    },
    mounted () {
    },
    watch: {
      loginStatus () {
        if (!this.loginStatus) {
          this.$router.push('/auth')
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  $backgroundImage: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX10666652.jpg';
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}
  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
  .application.theme--light {
    background: linear-gradient(to top right, rgba(51, 204, 255, 0.9) -15%, rgba(252, 190, 255, 0.9) 100%), url($backgroundImage);
    background-size: cover;
  }
</style>