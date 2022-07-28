import axios from "axios";
const ApiRoute = 'http://booksapirest.somee.com/api/';

const GetHeadersConfig =  {
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'DELETE, PUT, GET, POST',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
}


axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// For GET requests
axios.interceptors.request.use(
  (req) => {
     // Add configurations here
     return req;
  },
  (err) => {
    console.log(err);
     return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
     // Add configurations here
     if (res.status === 201) {
        // console.log('Posted Successfully');
     }
     return res;
  },
  (err) => {
    console.log(err);
     return Promise.reject(err);
  }
);


axios.create({
  baseURL: ApiRoute,
  headers: GetHeadersConfig
});


  
// SetCsrfToken();

const MethodPost = async (url , data) =>  await( axios.post(url , {...data } , {
  headers: GetHeadersConfig,
}));





export default { 
  get : axios.get,
  post : MethodPost,
  put : axios.put,
  delete : axios.delete
};