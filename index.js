
import express from 'express'

const app = express()

//루트 라우트 설정
app.get('/', (req,res) => {
    res.send("<h1>Hello~ Express!!</h1>")
})

//서버 시작
const PORT = 8000
app.listen(8000, () => {
    console.log(`서버 실행중... 포트 ${PORT}`);
})