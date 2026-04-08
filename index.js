
import express from 'express'
import mysql from 'mysql2'

//express 객체 생성
const app = express()

//mysql  연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'jsuser',
    password: 'js1234',
    database: 'jsdb'
})

//mysql 연결 확인
db.connect((err) => {
    if(err){
        console.log("데이터베이스 연결에 실패했습니다.", err);
        return; //실행종료        
    }
    console.log("데이터베이스가 연결되었습니다.");    
})

// json 요청 본문(body) 파싱을 위한 미들웨어
app.use(express.json());


//루트 라우트 설정
app.get('/', (req, res) => {
    res.send("<h1>Hello~ Express!!</h1>")
})

// 상품 목록 조회
app.get('/products', (req, res) => {
    const sql = "select * from product";
    db.query(sql, (err, results) => { 
        if(err){
            res.status(500).send("상품 조회 중 오류가 발생했습니다.")
            return; //즉시 종료
        }
        res.json(results); // 결과 데이터가 json 형식으로 반환
    });
})


// 상품 등록 처리
app.post('/products', (req, res) => {
    const {productName, price} = req.body;
    // ? - 동적 바인딩 기호
    const sql = "insert into product(product_name, price) values(?, ?)"
    db.query(sql, [productName, price], (err, results) => {
        if(err){
            res.status(500).send("상품 등록 중 오류가 발생했습니다.")
            return; //즉시 종료
        }
        res.send("상품이 성공적으로 등록되었습니다.")
    })
})

// 상품 정보 상세보기
// http://localhost:8000/products/2
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = "select * from product where id = ?"
    db.query(sql, [productId], (err, results) => {
        if(err){
            res.status(500).send("상품 조회 중 오류가 발생했습니다.")
            return; //즉시 종료
        }        
        res.json(results[0]); // 첫번째 결과 반환
    })
})

// 상품 수정 처리
app.put('/products/:id', (req, res) => {
    const productId = req.params.id; // 수정할 id 가져옴
    const {productName, price} = req.body;
    const sql = "update product set product_name = ?, price = ? where id = ?"
    db.query(sql, [productName, price, productId], (err, results) => {
        if(err){
            res.status(500).send("상품 수정 중 오류가 발생했습니다.")
            return; //즉시 종료
        }
        res.send("상품이 성공적으로 수정되었습니다.")
    })
})

//상품 삭제 처리
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = "delete from product where id = ?";
    db.query(sql, [productId], (err, results) => {
        if(err){
            res.status(500).send("상품 삭제 중 오류가 발생했습니다.")
            return; //즉시 종료
        }
        res.status(201).send("상품이 성공적으로 삭제되었습니다.")
    })
})



//서버 시작
const PORT = 8000
app.listen(PORT, () => {
    console.log(`서버 실행중... 포트 ${PORT}`);
})