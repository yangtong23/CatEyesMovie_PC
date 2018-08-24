$(()=>{
      
   init();
})

function init(){
    $.get('/info',{_id:location.search.slice(1)},(data)=>{
       
      $('#title').html(data.title)
      $('#edit_time').html(data.times)
      let str ='';
      for(let i = 0 ;i<data.picture.length;i++){
          
          str += `<p class='text_img'> <img src="http://127.0.0.1:3000${data.picture[i]}" alt=""> </p>
            <p> ${data.textContent[i]}</p>
          `
      }
      $('#container').html(str)
      $('#container p').css('margin-top','50px');
      $('.text_img').css('text-align','center')

      $('.box44p').each(function(i){
          $(this).html(data.comment[i])
      })
      $('.box45 span').css('cursor','pointer')
      $('.box45 span').click(function(){
         
       let strr='';

       for(let i = 0; i<5 ;i++){
       strr+=  `<div class="box44">
         <div><img src="../image/aa7.png" alt=""/></div>
         <div>
             <div>
                 <div>
                     <p>猜火车</p>
                     <p class="font9">2016-10-24 德阳</p>
                 </div>
                 <p><a class="font10" href=""><span>举报  </span></a>
                     <a class="font9" href="">   <i class="tubiao5"></i>  赞</a></p>
             </div>
             <p class="box44p">${data.comment[i]} </p>


         </div>
     </div>`
       }

       $('#new_conment').html($('#new_conment').html()+strr)

     
        })
   
})

$.get('/info',{_id:location.search.slice(1),submitType: "findJoin", ref: ['movie'] },(data)=>{

      console.log(data.movie[0])
     $('#match_movie').html(`<p>相关电影</p>
   <a href='../html/details.html?${data.movie[0]._id}'>  <img src="http://127.0.0.1:3000${data.movie[0].video}" alt=""/></a>
     <p>${data.movie[0].name}</p>
     <p><i>${data.movie[0].userscore.split('.')[0]}.<span>${data.movie[0].userscore.split('.')[1]}</span></i></p>`) 

     $('#match_movie img').css({'width':106,'height':145})
})



}






// let obj = {
//     name:'yang'
// }
function fn(){
   this.name='yang'
}

let obj =new fn()
console.log(obj.__proto__)