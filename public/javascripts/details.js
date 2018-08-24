$(()=>{

    init();
})

console.log(location.search.slice(1))
function init(){
  $.get('/details',{_id:location.search.slice(1)},(data)=>{
           $('#movie_picture').attr('src',`http://127.0.0.1:3000${data.video}`).css({
               'width':'232px',
               'height':'322px'
           })
           $('#title').html(data.name);
           $('#ename').html(data.ename);
           $('#type').html(data.type);
           $('#area').html(data.area+" "+data.show);
           $('#time').html(data.time);
           $('#userscore').html(data.userscore);
           $('#majorscore').html(data.majorscore);
           $('#ticket').html(data.ticket);
           $('#intro').html(data.intro);
           $('#director').html(data.director);
           $('#obj_director').attr('src',`http://127.0.0.1:3000${data.obj_director}`);
           let actor = data.actor.split(',');
           let actor_p=data.obj_actor.split(',')
           let img = data.img.split(',');
        //    console.log(actor,actor_p,img)
           let str = "";
           for(let i = 0 ;i<actor.length;i++){
             str+=`
             <a href="">
             <figure><img src="http://127.0.0.1:3000${actor_p[i]}" alt=""/>
                 <figcaption>
                     <p>${actor[i].split('_')[0]}</p>

                     <p>饰：${actor[i].split('_')[1]}</p>
                 </figcaption>
             </figure>
         </a>
             `

           }
           $('.boxleft6').html($('.boxleft6').html()+str)
            
           let strr ='';
           $('#img_one').attr('src',`http://127.0.0.1:3000${img[0]}`);
           for(let j =1;j<img.length;j++){
               
            strr+= `<img src="http://127.0.0.1:3000${img[j]}"/>`
           
           } 
           $('#img').html(strr);
           $('.box44p').each(function(i){
                 $(this).html(data.comment[i])
           })
          
            
           let strrr='';

           for(let m =0 ;m<data.movie_info.length;m++){
               strrr+=`
               <div class="boxlright2">
               <a href="">
                   <img src="http://127.0.0.1:3000${data.movie_info[m].img}" alt=""/>
                   <div>
                       <p>${data.movie_info[m].title}</p>
                       <p>猫眼电影 <i class="tubiao11"></i>${data.movie_info[m].people} <i class="tubiao12"></i>${data.movie_info[m].comment}</p>
                   </div>
               </a>
           </div>
               `
           }
        
         $('#movie_info').html(strrr)
       
    

  })

  $.get('/movie',(data)=>{
        let str ='';
        shuffle(data);
        for(let i=0 ;i<6;i++){
           str+=`
           <a href="../html/details.html?${data[i]._id}">  <figure><img src="http://127.0.0.1:3000${data[i].video}" alt="">
           <figcaption>
               <p class="match_name">${data[i].name}</p>
               <p><i>${data[i].userscore.split('.')[0]}<span>.${data[i].userscore.split('.')[1]}</span></i></p>
            </figcaption>
         </figure>
           </a>
           `
        }
      $('#movie_match').html(str)
      $('#movie_match img').css({'width':106,'height':145})
      $('#movie_match .match_name').css({'width':100,'height':20,"overflow":"hidden"})

  })

}



function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}















