export default function ({ $axios, redirect }) {    
  $axios.onError(err => {
    err.data = err.response.data
    return err;
  })
}