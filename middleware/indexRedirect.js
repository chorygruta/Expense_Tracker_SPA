export default function ({ route, store, redirect }) {
    // riderect if path is '/'
    if (route.path === '/') {
      return redirect('/dashboard')
    }
  }