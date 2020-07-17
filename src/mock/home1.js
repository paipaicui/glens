let list = {
  status: 200,
  total: 35,
  message: 'success',
  'data|20': [{
    "id": "@id",
    "title": " @ctitle(8, 30)",
    "projectName": " @ctitle(5, 15)",
    "state": "@ctitle",
    "dateTime": '@date("yyyy-MM-dd")',
    "content": "@csentence(50,100)",
    "name": "@cname",
    "text": "@ctitle",
    "size|1-19": 1,
    "percent|1-19": 1,
    "goodjob|1-100": 1,
  }]
}
export default {
  'get|/query/getHome1List': list
}
