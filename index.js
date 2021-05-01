const url = 'https://safe-waters-75143.herokuapp.com/hospitals'
const fetchData = require('./lib/getjson');
const io = require('indian-ocean')
const base = './data/historical/'
function compare(a, b) {
  if ( Date.parse(a.updated_at) < Date.parse(b.updated_at) ){
    return -1;
  }
  if ( Date.parse(a.updated_at) > Date.parse(b.updated_at) ){
    return 1;
  }
  return 0;
}

const run = async() => {
	let covidData = await (fetchData(url))
	covidData = covidData.sort(compare)
	io.writeDataSync(base+covidData[covidData.length-1].updated_at+'.csv', covidData)
}

run()