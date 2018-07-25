export const state = () => ({
    categories: [],
    expenses: []
})

export const actions = {
    async getCategories({commit}) {
        const categories = await this.$axios.$get('/categories')
        if (categories.success) {
            commit('SET_CATEGORIES', categories.data.categories)
        } else {
            // console.log(categories.error)
        }
    },
    async getExpenses({commit}) {
        const expenses = await this.$axios.$get('/expenses')
        if (expenses.success) {
            commit('SET_EXPENSES', expenses.data.expenses)
        } else {
            // console.log(expenses.error)
        }
    }
}

export const mutations = {
    SET_CATEGORIES (state, payload) {
        state.categories = payload
        // console.log('state.categories mutated')
    },
    SET_EXPENSES (state, payload) {
        state.expenses = payload
        // console.log('state.expenses mutated')
    }
}

export const getters = {
    categories: state => state.categories,
    expenses: state => state.expenses
}