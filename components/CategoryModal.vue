<template>
  <div>
     <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card class="max-height" style="transition: height 2s linear;">
        <v-card flat v-if="!isSubmitted" class="pa-3">
          <v-card-title>
            <span class="headline">Add New Category</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field counter="25" v-model="name" label="Category Name" required :rules="[rules.required]"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog()">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addNewCategory">Add</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else flat class="pa-3 text-xs-center">
          <v-progress-circular v-if="loading"
            indeterminate
            :size="70"
            :width="7"
            color="light-blue"
          ></v-progress-circular>
          <v-card flat v-else class="text-lg-center">
            <v-card-title class="display-1">{{response.title}}</v-card-title>
            <v-icon large :color="response.color">{{response.icon}}</v-icon>
            <v-card-text>{{response.message}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="closeDialog()">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CategoryModal',
  props: ['dialog'],
  data () {
    return {
      name: null,
      valid: true,
      isSubmitted: false,
      loading: false,
      response: {
        color: null,
        title: null,
        icon: null,
        message: null
      },
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  methods: {
    ...mapActions({
      getCategories: 'dashboard/getCategories'
    }),
    async addNewCategory () {
      if (this.$refs.form.validate()) {
        let self = this
        this.isSubmitted = true
        this.loading = true
        const postBody = {
          name: this.name
        }
        
        const category = await this.$axios.$post('/categories', postBody)
        if (category.success) {
            this.getCategories()
            this.response.color = 'green'
            this.response.title = 'Success'
            this.response.icon = 'check_circle'
            this.response.message = 'You have successfully added a new category'
          } else {
            this.response.color = 'red'
            this.response.title = 'Error'
            this.response.icon = 'error'
            this.response.message = category.error
          }
          setTimeout(function () {
            self.loading = false
          }, 1000)
      }
    },
    closeDialog () {
      if (!this.isSubmitted) {
        this.$refs.form.reset()
      }
      this.$emit('closeCategoryDialog')
      this.valid = true
      this.isSubmitted = false
      this.name = ''
      this.response = {
        color: null,
        title: null,
        icon: null,
        message: null
      }
    }
  },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>

<style scoped>
  .max-height {
    min-height:50px;
  }
</style>