# Restaurant List With Database

餐廳清單網站，連結資料庫並加入 CRUD 功能

## Requirement

[Node.js](https://nodejs.org/en/)  
[mongodb](https://www.mongodb.com/)

## Packages

[express](https://expressjs.com/)  
[express-handlebars](https://www.npmjs.com/package/express-handlebars)  
[body-parser](https://www.npmjs.com/package/body-parser)  
[mongoose](https://mongoosejs.com/)

## 功能表

- 可由餐廳名稱、餐廳類別搜尋特定餐廳
- 點擊餐廳可顯示更多詳細資訊
- 點擊左上"我的餐廳清單"可返回首頁
- CRUD 功能

## 安裝操作

1. **下載專案**

```
git clone https://github.com/William0832/restaurant_list_with_database.git
```

2. **由 Terminal 進入 restaurant_list 資料夾**

```
cd restaurant_list_with_database
```

3. **安裝專案需求套件**

```
npm install
```

4. **新增 Database**

```
node ./models/seeds/seeder.js
```

5. **執行專案**

```
npm run dev
```

6. **檢視 Terminal 訊息：**

**App is listening on [localhost:3000](http://localhost:3000)**

**db connected!**
