export default async function ({ store, redirect }) {
    if (store.state.auth.loginStatus) {
      return redirect('/')
    }
}