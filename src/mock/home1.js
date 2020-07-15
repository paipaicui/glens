let list = {
  status: 200,
  total: 35,
  message: 'success',
  'data|10': [{
    "title": " @ctitle(8, 30)",
    "state": "@ctitle",
    "dateTime": '@date("yyyy-MM-dd")',
    "size|1-19": 1,
    "percentr|1-19": 1
  }]
}
export default {
  'get|/query/getHome1List': list
}
