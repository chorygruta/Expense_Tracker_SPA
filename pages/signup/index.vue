<template>
  <v-container fluid class="pa-0" fill-height>
    <v-layout>
      <v-flex xs12 sm12>
        <v-container fluid text-xs-center fill-height class="pa-0">
          <v-layout row wrap justify-center>
            <v-flex d-flex xs12>
              <v-toolbar color="transparent" class="elevation-0">
                <v-btn to="/auth" icon>
                  <v-icon color="white">arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title class="white--text">Sign Up</v-toolbar-title>      
              </v-toolbar>  
            </v-flex>
            <v-flex d-flex xs12 sm12 style="">
              <h1 class="white--text">
                Create Account
              </h1>
            </v-flex>
            <v-flex d-flex xs12 sm8 lg4>
              <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container class="pt-0">
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
                          :ref="password1"
                          v-model="password1"
                          :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordVisibility = !passwordVisibility)"
                          :type="passwordVisibility ? 'password' : 'text'"
                          :rules="[rules.required]"
                          dark
                          color="white"
                          id="password1"
                          name="password1"
                          label="Create Password"
                          prepend-icon="lock"
                          hint="minimum of 8 characters"
                        ></v-text-field>
                        <v-text-field
                          :ref="password2"
                          v-model="password2"
                          :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordVisibility = !passwordVisibility)"
                          :rules="[rules.required, rules.password]"
                          :type="passwordVisibility ? 'password' : 'text'"
                          dark
                          color="white"
                          id="password2"
                          name="password2"
                          label="Confirm Password"
                          prepend-icon="lock"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm10>
                        <v-btn class="" @click="signup_buttonAction()" large block round light color="white" style="color:#673ab7;">Sign Up</v-btn>
                          <h4 class="white--text">
                            <br>
                            <span style="opacity:0.8;">Already have an account? </span>
                            <span @click="login_buttonAction()">Log In</span>
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
      passwordVisibility: true,
      email: '',
      password1: '',
      password2: '',
      formHasErrors: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: (value) => value === this.password1 || 'dont match'
      }
    }
  },
  methods: {
    ...mapActions({
      signupUser: 'auth/signupUser',
      checkAuth: 'auth/checkAuth'
    }),
    login_buttonAction () {
      this.$router.push('/login')
    },
    signup_buttonAction () {
      if (this.$refs.form.validate()) {
        var postBody = {
          email: this.email,
          password: this.password1
        }
        this.signupUser(postBody)
      }
    }
  }
}
</script>

<style>
  .signup-content {
    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  .signup-background {
    background: linear-gradient(to top right, #33ccff 0%, #cc99ff 100%);
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
</style>