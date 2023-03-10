
import Mock from 'mockjs';
import { login } from './api/login'
import { region } from './api/region'
import { system } from './api/system'
const data= [...login, ...region, ...system]
// console.log(data)
data.forEach(item => {
  const {route, type, res}  = item
  Mock.mock(new RegExp(route), type, () => {
    console.log(route);
    return res
  })
})



