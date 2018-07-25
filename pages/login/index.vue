<template>
  <v-container fluid class="pa-0" fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm12>
        <v-container fluid text-xs-center fill-height class="pa-0">
          <v-layout row wrap justify-center>
            <v-flex d-flex xs12 sm12>
              <v-toolbar color="transparent" class="elevation-0">
                <v-btn nuxt to="/auth" icon>
                  <v-icon color="white">arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title class="white--text">Log In</v-toolbar-title>      
              </v-toolbar>  
            </v-flex>
            <v-flex d-flex xs12 sm12 style="height:20%;">
              <h1 style="font-size:3.4em;color:white;">
                <span>XPENSE</span><br><span style="color:#cddc39;">LOGGER</span>
              </h1>
            </v-flex>
            <v-flex d-flex xs12 sm8 lg4>
              <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container class="pa-4">
                    <v-layout row wrap justify-center>
                      <v-flex xs12 class="pr-2">
                        <v-text-field
                          dark
                          color="white"
                          id="email"
                          name="email"
                          label="Email"
                          v-model="email"
                          prepend-icon="person"
                          :rules="[rules.required, rules.email]"
                        ></v-text-field>
                        <v-text-field
                          v-model="password"
                          :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordVisibility = !passwordVisibility)"
                          :type="passwordVisibility ? 'password' : 'text'"
                          dark
                          color="white"
                          id="password"
                          name="password"
                          label="Password"
                          prepend-icon="lock"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 class="pr-2">
                        <h4 align="right" class="white--text" style="position:relative; top:-20px;">Forgot password?</h4>
                      </v-flex>
                      <v-flex xs12 sm10>
                        <v-btn class="" @click="login_ButtonAction" large block round light color="white" style="color:#673ab7;">Log In</v-btn>
                      </v-flex>
                      <v-flex>
                        <h4 class="white--text">
                          <span style="opacity:0.8;">Don't have an account? </span>
                          <span @click="signup_buttonAction()">Sign Up</span>
                        </h4>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      valid: true,
      email: '',
      passwordVisibility: true,
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/loginUser',
      checkAuth: 'auth/checkAuth'
    }),
    login_ButtonAction () {
      if (this.$refs.form.validate()) {
        var postBody = {
          email: this.email,
          password: this.password
        }
        this.loginUser(postBody)
      }
    },
    signup_buttonAction () {
      this.$router.push('/signup')
    }
  },
  mounted () {
    console.log('im here @ login.vue')
  }
}
</script>