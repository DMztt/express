const express = require('express')
const bodyParser = require("body-parser")
const multer = require('multer')
const path = require('path')

var upload = multer({ dest: 'uploads/' })

//创建服务器
const app = express()

const db = require(path.join(__dirname, 'utils', 'db.js'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))



//接口
//login api
app.post('/login',(req, res) => {
  console.log(req.body)
  let {username, password} = req.body
  if(username === 'admin' && password === '123123') {
    res.send({
      code: 200,
      message: '登录成功'
    })
  }else {
    res.send({
      code: 400,
      message: '账号或密码错误'
    })
  }
})

//获取hero
app.get('/getAllHero',(req, res) => {
  let list = db.Herolist()
  res.send({
    code: 200,
    data: list
  })
})

//add hero
app.post('/add',upload.single('icon'),(req, res) => {

  let {name, skill} = req.body
  let icon = req.file.filename
  let result = db.addHero({name, skill,icon})
  if(result === true) {
    res.send({
      code: 200,
      message: '添加成功'
    })
  }else {
    res.send({
      code: 400,
      message: '添加失败'
    })
  }
  
})

//delete hero
app.get('/delete',(req, res) => {
  console.log(req.query)
  let {id} = req.query
  let result = db.deleHeroById(id)
  if(result === true) {
    res.send({
      code: 200,
      message: '删除成功'
    })
  }else {
    res.send({
      code: 400,
      message: '删除失败'
    })
  }
})

//根据id获取英雄
app.get('/getHeroByID',(req, res) => {
  
  res.send('request received')
})

//编辑英雄（根据id）
app.post('/edit',(req, res) => {
  res.send('request received')
})
//监听
app.listen(8888, () => {
  console.log('server is running')
})