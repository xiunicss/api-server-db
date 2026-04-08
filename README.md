## 웹 서버 만들기
- Language: javascript
- 개발환경: Node.js
- 서버 설치 명령어: npm init -y ->package.json

### Express 프레임워크 설치
- 설치: npm install express
- import 사용 - ES6 문법
- package.json 에서 변경(import)
  "type": "module",
- 서버 자동 실행 : nodemon 설치 <br/>
    npm i nodemon <br/>
    package.json에 설정 <br/>
    "start": "nodemon index.js" <br/>
    실행 명령어 - npx nodemon index

## DB 연결
### mysql2 라이브러리 설치
 - npm install mysql2

 ### mysql DBMS 연결 설정
  host: 'localhost',
  user: 'root',
  password: 'pw1234',
  database: 'mydb'

### rest api
- 상품 조회: app.get()
- 상품 등록: app.post()
- 상품 수정: app.put()
- 상품 삭제: app.delete()



- errcode <br/>
  500 - 코드오류 <br/>
  404 - 페이지 없음 경로잘못 <br/>
  200 - 정상