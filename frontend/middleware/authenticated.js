export default function ({ store, redirect }) {
  // 사용자가 인증을 하지 않은 경우.
  if (!store.state.authenticated) {
    console.log('Middleware UnAuthenticated')
    return redirect('/login')
  }
}
