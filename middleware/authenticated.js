export default async function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth.loginStatus) {
      return redirect('/auth')
    } else {
      await store.dispatch('dashboard/getCategories')
      await store.dispatch('dashboard/getExpenses')
    }
  }