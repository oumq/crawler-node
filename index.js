import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from 'dayjs'
import { execute, close } from './mysql'

const insert_sql = 'insert into hot (hot_content, hot_count, create_time, update_time) values (?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?))'
const update_sql = 'update hot set hot_count = ?, update_time = FROM_UNIXTIME(?) where hot_id = ?'
const query_sql = 'select hot_id, hot_count, DATE_FORMAT(create_time, \'%Y-%m-%d %H:%i:%S\') as create_time, DATE_FORMAT(update_time, \'%Y-%m-%d %H:%i:%S\') as update_time from hot where hot_content = ?'

let [iNum, uNum] = [0, 0]

const handle = async ($, element, timestamp) => {
  const content = $(element).find('a').text()
  const count = $(element).find('span').text()
  if (content && count) {
    const res1 = await execute(query_sql, content)
    if (res1.length > 0) {
      console.log(res1[0])
      const { hot_id, hot_count } = res1[0]
      if (Number(count) && Number(hot_count) && Number(count) > Number(hot_count)) {
        await execute(update_sql, [count, timestamp, hot_id])
        console.log('update -- id: ' + hot_id + ' count: ' + count)
        uNum++
      }
    } else {
      await execute(insert_sql, [content, count, timestamp, timestamp])
      console.log('insert')
      iNum++
    }
  }
}


axios.get('https://s.weibo.com/top/summary?cate=realtimehot', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
  }
}).then(res => {
  const rel_data = res.data.substring(15)
  const $ = cheerio.load(rel_data)
  const timestamp = dayjs().unix()
  let taskList = []
  $("td").each(function(i, e) {
    taskList.push(handle($, e, timestamp))
  })
  Promise.all(taskList).then(res => {
    console.log('新增 -- ' + iNum + ' 条', '更新 -- ' + uNum + ' 条')
    close()
  })
})
