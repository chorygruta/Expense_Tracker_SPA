<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card class="max-height" style="transition: height 2s linear;">
        <v-card flat v-if="!isSubmitted" class="pa-3">
          <v-card-title>
            <span class="headline">Add New Expense</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="postBody.description" counter="30" label="Description" prepend-icon="description" required :rules="[rules.required]"></v-text-field>
              <v-text-field v-model="postBody.amount" type="number" label="Amount"  prepend-icon="attach_money" required :rules="[rules.required]"></v-text-field>
              <v-autocomplete
                prepend-icon="category"
                v-model="postBody._category"
                :items="categoryArray"
                label="Category"
                :rules="[rules.required]"
              ></v-autocomplete>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="postBody.date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    required
                    :rules="[rules.required]"
                    slot="activator"
                    v-model="postBody.date"
                    label="Picker in menu"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="postBody.date" no-title>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(postBody.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog()">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addNewExpense">Add</v-btn>
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
  name: 'ExpenseModal',
  props: ['dialog'],
  data () {
    return {
      postBody: {
        description: null,
        amount: null,
        date: null,
        _category: null
      },
      menu: false,
      modal: false,
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
      getExpenses: 'dashboard/getExpenses'
    }),
    async addNewExpense () {
      if (this.$refs.form.validate()) {
        let self = this
        this.isSubmitted = true
        this.loading = true
        this.postBody._category = this.categories.find(category => category.name === this.postBody._category)._id
        this.$axios.$post

        const expense = await this.$axios.$post('/expenses', this.postBody)
        if (expense.success) {
            this.response.color = 'green'
            this.response.title = 'Success'
            this.response.icon = 'check_circle'
            this.response.message = 'You have successfully added a new expense'
            this.getExpenses()
        } else {
          this.response.color = 'red'
          this.response.title = 'Error'
          this.response.icon = 'error'
          this.response.message = expense.error
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
      this.$emit('closeExpenseDialog')
      this.valid = true
      this.isSubmitted = false
      this.name = ''
      this.postBody = {
        description: null,
        amount: null,
        date: null,
        _category: null
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'dashboard/categories'
    }),
    categoryArray () {
      let array = []
      if (this.categories) {
        for (let i = 0; i < this.categories.length; i++) {
          array.push(this.categories[i].name)
        }
      }
      return array
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  .max-height {
    min-height:50px;
  }
</style>