<template>
  <v-container text-xs-center fluid fill-height class="grey lighten-5 pa-0">
    <v-navigation-drawer fixed v-model="drawer" width="250" app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logoutUser">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="toolbar" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-xl fill-height>
      <v-layout row wrap align-content-start>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-container class="pa-0">
            <v-layout row wrap>
              <v-flex xs12 sm6 md6 lg4 xl4>
                <v-card height="100%" ripple hover class="elevation-3 text-lg-left pt-4 pa-3" light color="transparent">
                  <h2 class="light-blue--text">Total Expenses</h2>
                  <h1 class="hidden-xs-only display-3 green--text">{{ totalExpenses | dollars }}</h1>
                  <h1 class="hidden-sm-and-up display-1 green--text">{{ totalExpenses | dollars }}</h1>
                </v-card>
              </v-flex>
              <v-flex xs6 sm3 md3 lg4 xl4 @click="addExpenseModal = true">
                <v-card height="100%" raised ripple hover class="pa-3 tile" dark>
                  <h2>Add Expense</h2>
                  <v-icon style="font-size:8em!important;">attach_money</v-icon>
                </v-card>
                <expense-modal v-on:closeExpenseDialog="addExpenseModal = false" :dialog="addExpenseModal" ></expense-modal>
              </v-flex>
              <v-flex xs6 sm3 md3 lg4 xl4 @click="addCategoryModal = true">
                <v-card height="100%" raised ripple hover class="pa-3 tile" dark>
                  <h2>Add Category</h2>
                  <v-icon style="font-size:8em!important;">create_new_folder</v-icon>
                </v-card>
                <category-modal v-on:closeCategoryDialog="addCategoryModal = false" :dialog="addCategoryModal" ></category-modal>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex lg12 class="pb-5">
          <v-card v-if="expenses" raised class="text-lg-left pa-3">
            <v-card-title>
              <h2>My Expenses</h2>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex sm6 md6 lg6 xl6>
                  <v-select 
                    label="Filter report by category" 
                    :items="categoryArray"
                    v-model="itemCategory"
                    prepend-icon="category"
                  ></v-select>
                </v-flex>
                <v-flex sm6 md6 lg6 xl6>
                  <v-text-field
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-spacer></v-spacer>
            </v-card-text>
            <v-data-table
              :headers="headers"
              :items="filteredItems"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.date | formatDate }}</td>
                <td class="text-xs-left">{{ props.item.amount | dollars }}</td>
                <td class="text-xs-left">{{ props.item._category.name }}</td>
                <td class="text-xs-left">{{ props.item.description }}</td>
              </template>
              <v-alert slot="no-results" value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

import categoryModal from '../components/CategoryModal'
import expenseModal from '../components/ExpenseModal'
import moment from 'moment'

export default {
  middleware: ['authenticated'],
  components: {
    'category-modal': categoryModal,
    'expense-modal': expenseModal
  },
  filters: {
    dollars: num => `$${parseFloat(num).toFixed(2)}`,
    formatDate: date => {
      if (date) {
        return moment(String(date)).format('MM/DD/YYYY')
      }
    }
  },
  data () {
    return {
      isLoading: null,
      drawer: false,
      addExpenseModal: false,
      addCategoryModal: false,
      toolbarIcon: 'menu',
      itemCategory: 'All categories',
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: true,
          value: 'date'
        },
        { text: 'Amount', value: 'amount' },
        { text: 'Category', value: '_category.name' },
        { text: 'Description', value: 'description', sortable: false }
      ]
    }
  },
  methods: {
    ...mapActions({
      logoutUser:'auth/logoutUser',
      getCategories: 'dashboard/getCategories',
      getExpenses: 'dashboard/getExpenses'
    })
  },
  computed: {
    ...mapGetters({
      loginStatus: 'auth/loginStatus',
      user: 'auth/user',
      expenses: 'dashboard/expenses',
      categories: 'dashboard/categories'
    }),
    totalExpenses () {
      let total = 0
      for (let i = 0; i < this.expenses.length; i++) {
        total += this.expenses[i].amount
      }
      return total
    },
    filteredItems () {
      return this.expenses.filter((i) => {
        if (this.itemCategory === 'All categories') {
          return this.expenses
        } else {
          return !this.itemCategory || (i._category.name === this.itemCategory)
        }
      })
    },
    categoryArray () {
      let array = []
      if (this.categories) {
        for (let i = 0; i < this.categories.length; i++) {
          array.push(this.categories[i].name)
        }
        array.unshift('All categories')
      }
      return array
    }
  },
  watch: {
    drawer () {
      if (this.drawer) {
        this.toolbarIcon = 'close'
      } else {
        this.toolbarIcon = 'menu'
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scope>
  .tile {
    background: linear-gradient(to top right, rgba(51, 204, 255, .9) -15%, rgba(252, 190, 255, .9) 100%);
  }
  .toolbar {
    background: linear-gradient(to top right, rgba(51, 204, 255, .9) -15%, rgba(252, 190, 255, .9) 130%)
  }
</style>
