
export default async function ({ store, redirect }) {
    if (store.state.auth.loginStatus) {
        await store.dispatch('dashboard/getCategories')
        await store.dispatch('dashboard/getExpenses')
    }
}