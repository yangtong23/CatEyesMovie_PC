let row;
let page = 1;
$(() => {
    init();
})



function init() {
    let type_arr = ['全部'];
    let area_arr = ['全部'];
    let show_arr = ['全部'];
    let sort_arr = ['hot', 'time', 'score'];
    let page_arr = ['0', '1','2'];
    
    $.get('/movie', {}, (data) => {

        let type = "";
        for (let item of data) {
            type_arr.push(...item.type.split(','))
        }
        type_arr = [...new Set(type_arr)]
        type_arr.push('其他')
        for (let i = 0; i < type_arr.length; i++) {
            if (i == 0) {
                type += `
                <input type="radio" id="${type_arr[i]}1" name="type" value=${i}>
                <label for="${type_arr[i]}1">
                    <p>${type_arr[i]}</p>
                </label>
                 `

            }
            else {
                type += `
            <input type="radio" id="${type_arr[i]}" name="type" value=${i}>
            <label for="${type_arr[i]}">
                <p>${type_arr[i]}</p>
            </label>
             `
            }
        }
        $('#type').html($('#type').html() + type)



        let area = "";
        for (let item of data) {
            area_arr.push(...item.area.split(','))
        }
        console.log(area_arr)
        area_arr = [...new Set(area_arr)]
        console.log(area_arr)
        area_arr.push('其他')
        for (let i = 0; i < area_arr.length; i++) {
            if (i == 0) {
                area += `
            <input type="radio" id="${area_arr[i]}2" name="area" value=${i}>
            <label for="${area_arr[i]}2">
                <p>${area_arr[i]}</p>
            </label>
             `
            } else {

                area += `
            <input type="radio" id="${area_arr[i]}" name="area" value=${i}>
            <label for="${area_arr[i]}">
                <p>${area_arr[i]}</p>
            </label>
             `
            }
        }
        $('#area').html($('#area').html() + area)




        let show = "";
        for (let item of data) {
            show_arr.push(item.show.split('-')[0])
        }

        show_arr = [...new Set(show_arr)]
        show_arr.sort((a, b) => b - a)
        show_arr.push('其他 ')
        for (let i = 0; i < show_arr.length; i++) {
            if (i == 0) {
                show += `
            <input type="radio" id="${show_arr[i]}3" name="show" value=${i}>
            <label for="${show_arr[i]}3">
                <p>${show_arr[i]}</p>
            </label>
             `
            } else {


                show += `
            <input type="radio" id="${show_arr[i]}" name="show" value=${i}>
            <label for="${show_arr[i]}">
                <p>${show_arr[i]}</p>
            </label>
             `
            }
        }
        $('#show').html($('#show').html() + show)




        $('#sort :radio').change(function () {
            location = changeURLArg(location.href, 'sort', this.value)
        })
        $('#type :radio').change(function () {
            location = changeURLArg(location.href, 'type', this.value)
        })
        $('#area :radio').change(function () {
            location = changeURLArg(location.href, 'area', this.value)
        })
        $('#show :radio').change(function () {
            location = changeURLArg(location.href, 'show', this.value)
        })




        let url = location.search;
        let qrama = new Object();
        qrama.page=1;
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                let key = strs[i].split("=")[0]
                let value = strs[i].split("=")[1]
                let qq = `${key}_arr[${value}]`
                if (value == 0) {
                    delete qrama[key]
                } else {
                    value = eval(qq)
                    qrama[key] = value;
                }

            }
            ;
        }
        // z= page;
        qrama.rows = 30;
        $.get('/movie', qrama, (data) => {
            row = data.rows.length;
            console.log(qrama.page)
            if (row == 30||qrama.page!=1) {
                let page_str = ` <a href="${changeURLArg(location.href, 'page',1)}" id="pro">上一页</a>`
                for (let i = 0; i < Math.ceil(row / 30) + 1; i++) {
                    page_str += `
                    <a href="${changeURLArg(location.href, 'page',i+1)}" id="${i+1}">${i + 1}</a>
                    `
                }
                page_str += `<a href="${changeURLArg(location.href, 'page',2)}" id="next">下一页</a>`
                $('#page').html(page_str)
                console.log(qrama.page)
                $('#page #'+qrama.page).attr('href','javascript:void(0)').css({'background-color':'#ef4238','color':'white'})
                if(qrama.page==1){
                    $('#pro').attr('href','javascript:void(0)')
                }
                
                if(qrama.page==2){
                    $('#next').attr('href','javascript:void(0)')
                }
              
            
            } else if(row<30&&page==1){
                $('#page').html('')
              }
            

            let strrr = '';
            let movie = data.rows;
            if (qrama.sort == 'score') {
                movie.sort((a, b) => b.userscore - a.userscore)
            }
            if (qrama.sort == 'time') {
                movie.sort((a, b) => Date.parse(b.show.slice(0, 10)) - Date.parse(a.show.slice(0, 10)))
            }

            for (let item of movie) {
                strrr += `
                <a href="../html/details.html?${item._id}">
                <figure><img src="http://127.0.0.1:3000${item.video}" alt=""/>
                    <figcaption>
                        <p class='title'>${item.name}</p>
    
                        <p><i>${item.userscore.split('.')[0]}.<span>${item.userscore.split('.')[1]}</span></i></p>
                    </figcaption>
                </figure>
            </a>
                `
            }
            $('.box3').html(strrr);
            $('.box3 img').css({
                'width': '160px',
                'height': '220px'
            })
            $('.box3 .title').css({
                'width': '160px',
                'height': '20px',
                'overflow': 'hidden'
            })
            if (!qrama.type) {
                $('#type input:first').attr('checked', true)
            }
            if (!qrama.area) {
                $('#area input:first').attr('checked', true)
            }
            if (!qrama.show) {
                $('#show input:first').attr('checked', true)
            }
            $('#type #' + qrama.type).attr('checked', true)
            $('#area #' + qrama.area).attr('checked', true)
            $('#show #' + qrama.show).attr('checked', true)
            $('#sort #' + qrama.sort).attr('checked', true)



        })
    })
}












function changeURLArg(url, arg, arg_val) {
    if (arg_val == 0) {
        var str = "";

        if (url.indexOf('?') != -1)
            str = url.substr(url.indexOf('?') + 1);
        else
            return url;
        var arr = "";
        var returnurl = "";
        var setparam = "";
        if (str.indexOf('&') != -1) {
            arr = str.split('&');
            for (i in arr) {
                if (arr[i].split('=')[0] != arg) {
                    returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                }
            }
            return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
        }
        else {
            arr = str.split('=');
            if (arr[0] == arg)
                return url.substr(0, url.indexOf('?'));
            else
                return url;
        }
    }
    else {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
        return url + '\n' + arg + '\n' + arg_val;
    }
}