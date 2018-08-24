$(() => {
    init();
})
let i = 0;
function init() {
    $.get('/info', (data) => {

        let arr = [];
        let arr_id = [];
        for (let o of data) {
            arr.push(o.banner)
            arr_id.push(o._id)
        }

        $('#banner_href').attr('href', `../html/info.html?${arr_id[0]}`)
        $('#banner_img').attr('src', `http://127.0.0.1:3000${arr[0]}`)


        //   圆点  图片改变
        function discSolider() {
            $('#disc span').css('color', 'white')
            $('#disc span').eq(i).css('color', '#ec443f')
            $('#banner_href').attr('href', `../html/info.html?${arr_id[i]}`)
            $('#banner_img').attr('src', `http://127.0.0.1:3000${arr[i]}`)
        }
        // 背景 圆点颜色 递增变换
        function changeImg() {
            i++;
            if (i >= arr.length) {
                i = 0;
            }
            discSolider();
        }
        // 左边按钮点击事件
        $('#1').click(() => {
            i--;
            if (i <= -1) {
                i = arr.length - 1;
            }
            discSolider();
        })
        // 右边按钮点击事件
        $('#2').click(() => {
            changeImg();
        })
        // 计时器
        let lunbo = setInterval(function () {
            changeImg();
        }, 4000)
        // 鼠标移入计时器暂停
        $('.box1').mouseover(() => {
            clearInterval(lunbo);
            $('#1').css('visibility', 'visible')
            $('#2').css('visibility', 'visible')
        })
        // 鼠标移出计时器继续
        $('.box1').mouseout(() => {
            lunbo = setInterval(function () {
                changeImg();
            }, 4000)
            $('#1').css('visibility', 'hidden')
            $('#2').css('visibility', 'hidden')
        })
        // 圆点点击事件
        $('#disc span').click(function () {

            i = this.dataset.id;
            console.log(i)
            discSolider();
        })


    })

    $.get('/hot', { submitType: "findJoin", ref: ['movie'] }, (data) => {
        console.log(data)
        let str = '';
        let top_str = '';
        for (let i = 0; i < 8; i++) {
            str += `
            <figure>
            <a href='../html/details.html?${data[i].movie[0]._id}'>  <img src="http://127.0.0.1:3000${data[i].movie[0].video}" alt=""/> 
            <p id='hot_name'>${data[i].movie[0].name}</p> <p id='hot_score'><i>${data[i].movie[0].userscore.split('.')[0]}.<span>${data[i].movie[0].userscore.split('.')[1]}</span></i></p>
            </a>
            <a href="../html/denglu.html"><figcaption>购 票</figcaption></a>
           </figure>
            `
        }
        $('.boxleft2').html(str)
        data.sort((a, b) => {
            a.movie[0].ticket.search('万') == -1 ? a = parseInt(a.movie[0].ticket) * 100000000 : a = parseInt(a.movie[0].ticket) * 10000
            b.movie[0].ticket.search('万') == -1 ? b = parseInt(b.movie[0].ticket) * 100000000 : b = parseInt(b.movie[0].ticket) * 10000
            return b - a
        })
        for (let i = 0; i < 10; i++) {
            if (i == 0) {
                top_one.innerHTML = `
          <a href="../html/details.html?${data[i].movie[0]._id}"><div class="boxright1">
          <img src="http://127.0.0.1:3000${data[i].movie[0].img.split(',')[0]}" alt=""/>
          <div>
             <p>${data[i].movie[0].name}</p>
              <p>${data[i].movie[0].ticket}</p>
              
          </div>
      </div></a>
          `
                $('#top_one img').css({ 'width': '120', 'height': '78' })
            } else {
                top_str +=
                    `<div>
                <a href="../html/details.html?${data[i].movie[0]._id}"> <p id='top_${i}'><i>${i + 1}</i>${data[i].movie[0].name}</p>
    
                <p>${data[i].movie[0].ticket}</p></a>
            </div>`
            }
        }
        $('.boxright2').html(top_str);                                         // 渲染右边的排行榜
        $('.boxright2  #top_9>i').attr('class', 'font2')                         // 第十名加样式
        $('.boxright2  #top_1>i,.boxright2  #top_2>i').attr('class', 'font1')   //给第二三名加样式


        $('.boxleft2 figure').css('position', 'relative')
        $('.boxleft2 figure').css('position', 'relative')
        $('.boxleft2 figure #hot_name').css({
            'position': 'absolute',
            'width': 100,
            'height': 20,
            'overflow': 'hidden',
            'left': 5,
            'bottom': 70,
            'color': 'white',

        })
        $('.boxleft2 figure #hot_score').css({
            'position': 'absolute',
            'font-size': '18px',
            'right': 10,
            'bottom': 70,
            'color': '#ffb400',

        })
        $('.boxleft2 figure #hot_score span').css({
            'font-size': '14px',
        })


    })




    $.get('/sow', { submitType: "findJoin", ref: ['movie'] }, (data) => {
        console.log(data)
        let str = '';
        let top_str = '';
        for (let i = 0; i < 8; i++) {
            str += `
            <div>
            <figure>
                <a href="../html/details.html?${data[i].movie[0]._id}"><img src="http://127.0.0.1:3000${data[i].movie[0].video}" alt="" />
                    <p id='sow_name'>${data[i].movie[0].name}</p> <p id='sow_score'><i>${data[i].movie[0].userscore.split('.')[0]}.<span>${data[i].movie[0].userscore.split('.')[1]}</span></i></p>
                </a>
                <figcaption>
                    <p>${data[i].movie[0].want}人想看</p>
                    <div>
                        <p>预告片</p>
                        <p>预  售</p>
                    </div>
                </figcaption>
            </figure>
            <p>${data[i].movie[0].show.slice(0, 10).split('-')[1] - 0}月${data[i].movie[0].show.slice(0, 10).split('-')[2] - 0}日上映</p>
            </div>
            
            `
        }
        $('.boxleft4').html(str)


        $('.boxleft4 figure').css('position', 'relative')
        $('.boxleft4 figure').css('position', 'relative')
        $('.boxleft4 figure #sow_name').css({
            'position': 'absolute',
            'width': 100,
            'height': 20,
            'overflow': 'hidden',
            'left': 5,
            'bottom': 100,
            'color': 'white',

        })
        $('.boxleft4 figure #sow_score').css({
            'position': 'absolute',
            'font-size': '18px',
            'right': 10,
            'bottom': 100,
            'color': '#ffb400',

        })
        $('.boxleft4 figure #sow_score span').css({
            'font-size': '14px',
        })


    })

    $.get('/process', { submitType: "findJoin", ref: ['movie'] }, (data) => {

        let str = '';
        for (let i = 0; i < 7; i++) {
            if (i == 0) {
                str += `
            <div style='margin-right:12px;'>
    <a href="../html/details.html?${data[i].movie[0]._id}"><img src="http://127.0.0.1:3000${data[0].movie[0].img.split(',')[0]}" alt="" />
    </a>
       </div>
    `
            } else {
                str += `
     <div>
    <a href="../html/details.html?${data[i].movie[0]._id}"><img src="http://127.0.0.1:3000${data[i].movie[0].video}" alt="" />
    
     </div>   
    `
            }
        }

        $('.boxleft6').html(str)
        $('.boxleft6 img:not(:first)').css('width', '160')
        $('.boxleft6 img:first').css({ 'width': '350', 'height': 220 })
        $('.boxleft6 div').css('position', 'relative')
        $('.boxleft6 div').css('position', 'relative')
        $('.boxleft6 div #process_name').css({
            'position': 'absolute',
            'width': 100,
            'height': 20,
            'overflow': 'hidden',
            'left': 5,
            'bottom': 20,
            'color': 'white',

        })
        $('.boxleft6 div #process_score').css({
            'position': 'absolute',
            'font-size': '18px',
            'right': 10,
            'bottom': 20,
            'color': '#ffb400',

        })
        $('.boxleft6 div #process_score span').css({
            'font-size': '14px',
        })
    })










    $.get('/movie', (data) => {
        let top_str = '';
        data.sort((a, b) => {
            return b.userscore - a.userscore
        })
        for (let i = 0; i < 10; i++) {
            if (i == 0) {
                boxright9.innerHTML = `
          <a href="../html/details.html?${data[i]._id}"><div class="boxright1">
          <img src="http://127.0.0.1:3000${data[i].img.split(',')[0]}" alt=""/>
          <div>
             <p>${data[i].name}</p>
              <p>${data[i].userscore}</p>
              
          </div>
      </div></a>
          `
                $('#boxright9 img').css({ 'width': '120', 'height': '78' })
            } else {
                top_str +=
                    `<div>
                <a href="../html/details.html?${data[i]._id}"> <p id='top_${i}'><i>${i + 1}</i>${data[i].name}</p>
    
                <p>${data[i].userscore}</p></a>
            </div>`
            }
        }
        $('.boxright10').html(top_str);                                         // 渲染右边的排行榜
        $('.boxright10  #top_9>i').attr('class', 'font2')                         // 第十名加样式
        $('.boxright10  #top_1>i,.boxright10  #top_2>i').attr('class', 'font1')   //给第二三名加样式



        data.sort((a, b) => {
            return b.want - a.want
        })
        let str = '';
        for (let i = 0; i < 10; i++) {
           
            if (i == 0) {
                want_top1.innerHTML = `
                <img src="http://127.0.0.1:3000${data[i].video}" alt=""/>
                <div>
                    <a href="../html/details.html?${data[i]._id}"> <p>${data[i].name}</p>
                        <p>上映时间：${data[i].show.split('-')[0]}</p>
                        <p>${data[i].want}人想看</p>
                    </a>
                </div>`
                $('#want_top1 img').css({ 'width': '140', 'height': '194' })
            }
            else if (i == 1 || i == 2) {
                want_top2.innerHTML +=
                    `<a href="../html/details.html?${data[i]._id}"> <figure>
                <img src="http://127.0.0.1:3000${data[i].img.split(',')[0]}" alt=""/>
               <figcaption>
                 <p>${data[i].name}</p>
                 <p>${data[i].want}人想看</p>
               </figcaption>
            </figure>
            </a>`
                $('#want_top2 img').css({ 'width': '170', 'height': '118' })
            } else {
                str += `
                <div>
            <a href="../html/details.html?${data[i]._id}">  <p><i>${i+1}</i>${data[i].name}</p>

                <p>${data[i].want}人想看</p></a>
           </div>`
            }

        }
         $('.boxright7').html(str);
         $('.boxright7 div:last i').attr('class','font2')

    })

    $.get('/session',(data)=>{
        console.log(data)
        if(data=='true'){
            $('.dingwei2').html(` <li><a href="">我的信息</a></li> 
                                  <li><a href="">我的订单</a></li>  
                                  <li ><a id='out_log'>退出登录</a></li> `)
        }else{
            $('.dingwei2').html(`  <li><a href="../html/denglu.html">登录</a></li>  `)

        }
        $('#out_log').click(()=>{
            $('.dingwei2').html(`  <li><a href="../html/denglu.html">登录</a></li>  `)
        
    })
})
 

    $('#search').on('input',((e)=>{
        if(e.target.value==""){
            $('#search_block').css('display','none')
        }else{
         $.post('/movie/search',{name:e.target.value},(data)=>{
            let str ='';
           for(let o of data){
            str+=`
             <div><img src="http://127.0.0.1:3000${o.video}" alt=""/>
             <a href="../html/details.html?${o._id}">${o.name}</a>
             </div>
          `
          $('#search_block').html(str).css('display','block')
          $('#search_block img').css({'width':'36','height':'50','padding':'2px 10px'})
           }
         })
        }
    }))




}

























