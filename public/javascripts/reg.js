$(() => {
    $('table').on('change', 'input', check)
    $('#submit').on('click', submit)
    $('#pwd').on('input', strength)

})

let state = {
    'phone': false,
    'code': false,
    'pwd': false,
    'Ispwd': false
}

function check(e) {
    let checkId = e.target.id;
    let error;
    let reg;
    let blank;
    switch (checkId) {
        case 'phone': {
            error = '请输入11位手机号码';
            reg = /^\d{11}$/;
            blank = '请输入手机号';
            break;
        }

        case 'code': {
            error = '请输入正确验证码';
            reg = /^\d{6}$/;
            blank = '请输入验证码';
            break;
        }
        case 'pwd': {
            error = '请输入6-14位密码';
            reg = /^\w{6,14}$/;
            blank = '请输入密码';
            break;
        }
        case 'Ispwd': {
            error = '密码不一致，请重新输入';
            reg = new RegExp(pwd.value);
            blank = '请输入确认密码';
            break;
        }
    }

    if (e.target.value) {
        if (reg.test(e.target.value)) {
            $(e.target).parent().next().html(`<img src="../images/sure.png" alt="">`);
            state[checkId] = true;
            if (checkId == 'phone') {
                iSrepeat();
            }

            if (checkId == 'pwd') {
                if (Ispwd.value != pwd.value) {
                    $('#Ispwd').parent().next().html('<img src="../images/errror.png" alt="">' + '&nbsp' + '密码不一致，请重新输入');
                }
            }
        } else {
            $(e.target).parent().next().html('<img src="../images/errror.png" alt="">' + '&nbsp' + error);
            state[checkId] = false;
        }

    } else {
        $(e.target).parent().next().html('<img src="../images/errror.png" alt="">' + '&nbsp' + blank);
        state[checkId] = false;
    }
}


function submit(e) {
    if (state.phone && state.code && state.pwd && state.Ispwd) {
             

    } else {
        e.preventDefault();
    }

}

// 判断密码强度
function strength() {

    if (pwd.value.length > 12) {
        $('.qiangdu span').css('background', '#eeeeee')
        $('.qiangdu span').css('background', 'green')
    } else if (pwd.value.length > 8) {
        $('.qiangdu span').css('background', '#eeeeee')
        $('#middle').css('background', '#ff8900')
        $('#min').css('background', '#ff8900')

    } else if (pwd.value.length > 3) {
        $('.qiangdu span').css('background', '#eeeeee')
        $('#min').css('background', 'red')
    } else {
        $('.qiangdu span').css('background', '#eeeeee')
    }

}

// 判断用户名是否重复

function iSrepeat() {
    $.get('/reg/check', { 'phone': phone.value }, (data) => {
        if (data == 'true') {
            $('#phone').parent().next().html(`<img src="../images/sure.png" alt="">`);
            state.phone = true;
        } else {
            $('#phone').parent().next().html('<img src="../images/errror.png" alt="">' + '&nbsp' + '账号已绑定，' + '<a  id="repeat" href="./denglu.html">请登录</a>');
          $('#repeat').css({
              'text-decoration':'none',
              'color':'#ff8900'
          })
            state.phone = false;
        }

    })
}


