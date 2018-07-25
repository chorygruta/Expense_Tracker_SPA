<template>
  <v-container fluid text-xs-center grid-list-xl fill-height class="pa-0">
    <v-layout row wrap justify-center>
      <v-flex d-flex xs12 md6 lg4 offset-md-4>
        <v-container fluid fill-height class="pa-0">
          <v-layout row wrap justify-center>
            <v-flex xs12 style="padding-top:15%; height:65%;">
              <h1 style="font-size:4em;color:white;">
                <span>XPENSE</span><br><span style="color:#cddc39;">LOGGER</span>
              </h1>
            </v-flex>
            <v-flex xs10 sm10 lg10>
              <v-btn nuxt to="/signup" class="mb-3" large block round outline dark style="border:2px solid white;">Sign Up</v-btn>
              <v-btn nuxt to="/login" class="light-blue--text" large block round light color="white">Log In</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  middleware: ['checkAuth', 'notAuthenticated'],
  data () {
    return {}
  },
  methods: {
  },
  computed: {
  },
  watch: {},
  created () {
  },
  mounted () {
    console.log('im here @ authome.vue')
  }
}
</script>