$(() => {
    init();
})
let time =new Date();
console.log(time.getFullYear())
console.log(time.getDate())
console.log(time.getMonth()+1)
function init() {
    $.get('/top', (data) => {
        console.log(data)


        
        console.log(data[0].actor.split(',').map((o)=>{ return o.split('_')[0] }).join(','))
        data.sort((a, b) => b.userscore - a.userscore)
        let str ='';
        for (let i = 0; i < 10; i++) {
          if(i==0){
       str+= `
       <div class="box1">
<p class="boxleft1"><i class="tubiao9"></i></p>
<a href="../html/details.html?${data[i]._id}"><img src="http://127.0.0.1:3000${data[i].video}" alt=""/></a>
<div>
    <div>
        <p>${data[i].name}</p>
        <p>主演：${data[i].actor.split(',').map((o)=>{ return o.split('_')[0] }).join(',')}</p>
        <p>上映时间：${data[i].show}</p>
    </div>
    <p><i> ${data[i].userscore.split('.')[0]}.<span>${data[i].userscore.split('.')[1]}</span></i></p>

</div>
</div>
       `
          }else if(i==1||i==2){
              str+=` <div class="box1">
              <p class="boxleft2"><i>${i+1}</i></p>
              <a href="../html/details.html?${data[i]._id}"><img src="http://127.0.0.1:3000${data[i].video}" alt=""/></a>
              <div>
                  <div>
                      <p>${data[i].name}</p>
                      <p>主演：${data[i].actor.split(',').map((o)=>{ return o.split('_')[0] }).join(',')}</p>
                      <p>上映时间：${data[i].show}</p>
                  </div>
                  <p><i>${data[i].userscore.split('.')[0]}.<span>${data[i].userscore.split('.')[1]}</span></i></p>
              
              </div>
              </div>`

          }else {
              str+=`<div class="box1">
              <p class="boxleft"><i>${i+1}</i></p>
              <a href="../html/details.html?${data[i]._id}"><img src="http://127.0.0.1:3000${data[i].video}" alt=""/></a>
              <div>
                  <div>
                      <p>${data[i].name}</p>
                      <p>主演：${data[i].actor.split(',').map((o)=>{ return o.split('_')[0] }).join(',')}</p>
                      <p>上映时间：${data[i].show}</p>
                  </div>
                  <p><i>${data[i].userscore.split('.')[0]}.<span>${data[i].userscore.split('.')[1]}</span></i></p>
              
              </div>
              </div>`

          }
        }
        $('#top').html(str)
        $('#top img').css({
            'width':'160px',
            'height':'220pxx'
        })
    })
   $('#time').html(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate())
}







