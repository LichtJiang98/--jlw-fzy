const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { clear, log } = require('console');

const app = express();
app.use(cors());

const filePath = path.join(__dirname, 'data.json');
const filePath2 = path.join(__dirname, 'shop.json');
var localdata = []; 
var mapdata = [];
var selectData = []; 

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  const jsonData = JSON.parse(data);
  localdata = jsonData.more
  selectData = jsonData.selections
});

fs.readFile(filePath2, 'utf8', (err, data) => {
  if (err) throw err;
  const jsonData = JSON.parse(data);
  mapdata = jsonData.lists
});




const someData = {

  getPageData: async (pageNum, pageSize) => {
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = localdata.slice(startIndex, endIndex);
    return pageData;
  },
  findShop: async (id) => {
    const shop = mapdata.find(shop => shop.id === parseInt(id));
    return shop ? shop : null;
  },
  queryData: async (choice, size) => {
    const filteredData = selectData.filter(item => {
      console.log("Item key: ", item.key);
      return item.key.includes(choice)} );
    return filteredData.slice(0, size);
  },
};

app.get('/api/data', async (req, res) => {
  const pageNum = parseInt(req.query.page);
  const pageSize = parseInt(req.query.size);
  const pageData = await someData.getPageData(pageNum, pageSize)
  res.json(pageData);
});

app.get('/api/selectdata/:choice', async (req, res) => {
  const choice = req.params.choice;
  const size = req.query.size;
  const data = await someData.queryData(choice, size);
  res.json(data);
});

app.use(bodyParser.json());
app.post('/api/shop', async (req, res) => {
  const shopId = req.body.shopId;
  console.log("接收到的id",shopId);
  const shopData = await someData.findShop(shopId)
  if (shopData) {
    res.json(shopData);
  } 
});


app.listen(5000, () => {
    console.log('在5000监听');
});

clear