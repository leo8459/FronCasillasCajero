export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different

  let url ='http://172.65.10.33:8000/cajero/'
  api.url =url
  api.setBaseURL(url) 
  // Inject to context as $api
  inject('api', api)
}
