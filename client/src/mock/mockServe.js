//引入mockjs模块
import Mock from 'mockjs'
//把json格式数据引入进来
import position from './position.json'
import select from './select.json'
import shop from './shop.json'
import sort from './sort.json'
import more from './more.json'
import city from './city.json'
import hotcity from './hotCity.json'
import test from './test.json'
import testList from './testList.json'

//mock格式（参数一：请求地址；参数二：请求数据）
Mock.mock("/mock/position",{code:200,data:position})
Mock.mock("/mock/select",{code:200,data:select})
Mock.mock("/mock/shop",{code:200,data:shop})
Mock.mock("/mock/sort",{code:200,data:sort})
Mock.mock("/mock/more",{code:200,data:more})
Mock.mock("/mock/city",{code:200,data:city})
Mock.mock('/mock/hotcity',{code:200,data:hotcity})
Mock.mock('/mock/test',{code:200,data:test})
Mock.mock('/mock/testList',{code:200,data:testList})
