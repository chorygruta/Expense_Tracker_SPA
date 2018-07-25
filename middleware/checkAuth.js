export default async function ({ store, redirect }) {
    await store.dispatch('auth/checkAuth')
}