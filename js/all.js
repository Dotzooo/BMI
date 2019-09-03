
// Dom
var btn = document.getElementById('resultBtn')
var list = document.querySelector('.list')
var data = JSON.parse(localStorage.getItem('BMIData')) || []




// 監聽
btn.addEventListener('click', bmiCalc ,false)
// 點擊刪除事件
list.addEventListener('click', Del ,false)
// 更新頁面內容
updateList(data)


// BMI計算 
function bmiCalc(e){
  var height = document.getElementById('height').value
  var weight = document.getElementById('weight').value
  var meter =  height / 100
  var BMI =  Math.round(weight / ( meter * meter ))
  // console.log(BMI)
  var status = '' //體重狀態
  var color = ''  //體重狀態顏色顯示
  
  

//   == 相同值 !!!
  if( height == ''){
    alert('請輸入身高')
    return
  } else if( weight == ''){
    alert('請輸入體重')
    return
  }
  
//   判斷BMI
  if( BMI < 18.5){
    status = '體重過輕'
    color = 'weight_A'
  } else if( 18.5 <= BMI && BMI < 25){
    status = '體重正常'
    color = 'weight_B'
  } else if( 25 <= BMI && BMI < 30){
    status = '體重過重'
    color = 'weight_C'
  } else if( 30 <= BMI && BMI < 35){
    status = '中等肥胖'
    color = 'weight_D'
  } else if( 35 <= BMI && BMI < 40){
    status = '嚴重肥胖'
    color = 'weight_E'
  } else if( 40 <= BMI){
    status = '非常嚴重肥胖'
    color = 'weight_F'
  }
// 時間日期  
  var Today = new Date()
  // document.write( (Today.getMonth() + 1 ) + Today.getDate() + Today.getFullYear() )
  var date = Today.getDate()
  var month = Today.getMonth() + 1
  var year = Today.getFullYear()
  var time = year +'-' + month + '-' + date
  
  var dataContent = {
    status: status,
    color: color,
    height: height,
    weight: weight,
    BMI: BMI,
    time: time,   
  }
//  當資料帶進去成為新資料時
  data.push(dataContent)
//  將 MBIData屬性的值(data)轉為字串
  localStorage.setItem('BMIData', JSON.stringify(data))
// 輸出BMI、身高、體重之後,清空原輸入欄
  document.getElementById('height').value = ''
  document.getElementById('weight').value = ''
  updateList(data)
}

// 更新內容
function updateList(item){
  var str = ''
  for( var i=0 ;i < item.length; i++){
    str += '<li class="d-flex justify-content-center weight '+ item[i].color +'"><h5 class="mr-3">'+ item[i].status +'</h5><p class="px-2">BMI<span class="pl-2">'+ item[i].BMI+'</span></p><p class="px-3">身高<span class="pl-3">'+ item[i].height+' cm</span></p><p class="px-2">體重<span class="pl-3">'+ item[i].weight+' kg</span></p><p class="px-2">'+ item[i].time+'</p><i class="btn fas fa-times" data-index="' + i + '"></i></li>'
  }
  list.innerHTML = str
}

// 刪除
function Del(e) {
    e.preventDefault()
    if (e.target.nodeName !== 'I') { return }
    var index = e.target.dataset.index
    data.splice(index, 1)    
    localStorage.setItem('BMIData', JSON.stringify(data))
    updateList(data)
}