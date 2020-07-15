import $ from 'axios'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getList(params) {
      return new Promise((resolve, reject) => {
        $({
            method: 'get',
            url: '/query/getHome1List',
            dataType: '',
            data: params
          }).then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      })
    }
  }
}
