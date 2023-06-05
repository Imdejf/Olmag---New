export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useCookie('Authorization')
    if(to.meta.layout == 'profile' && !cookie.value) {
      return navigateTo("/login")
    }
  
    if(to.fullPath == '/login' && cookie.value) {
      return navigateTo("/")
    }
  
    if(to.fullPath.includes('/external') && cookie.value) {
      return navigateTo("/")
    }
  })