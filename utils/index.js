import decode from 'jwt-decode'
import localforage from 'localforage'
const ID_TOKEN_KEY = 'id_token'

export function ifNotAuthenticated (to, from, next) {
  getIdToken().then(value => {
    if (isValidJWT(value)) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  })
}

export const isValidJWT = function (jwt) {
  if (!jwt || jwt.split('.').length < 3) {
    return false
  }
  const data = JSON.parse(atob(jwt.split('.')[1]))
  const exp = new Date(data.exp * 1000) // JS deals with dates in milliseconds since epoch
  const now = new Date()
  if (now < exp) {
    // console.log('user is authenticated')
  } else {
    // console.log('user is not authenticated')
  }
  return now < exp
}

function clearIdToken () {
  localforage.removeItem(ID_TOKEN_KEY)
}

export function logout () {
  clearIdToken()
}

export function isLoggedIn () {
  return getIdToken().then(token => {
    return isValidJWT(token)
  })
}

export function getIdToken () {
  return localforage.getItem(ID_TOKEN_KEY).then(value => {
    return value
  }).catch(error => {
    console.log(error)
  })
}

export function setIdToken (idToken) {
  localforage.setItem(ID_TOKEN_KEY, idToken)
  decodeIdToken(idToken)
}

export function lfSaveUser (user) {
  localforage.setItem('user', user)
}

export function lfGetUser () {
  return localforage.getItem('user').then(value => {
    return value
  }).catch(error => {
    console.log(error)
  })
}

function decodeIdToken (token) {
  const jwt = decode(token)
  verifyNonce(jwt.nonce)
}

function verifyNonce (nonce) {
  if (nonce !== localforage.getItem('nonce')) {
    clearIdToken()
  }
}
