$(() => {
    $('#submit').on('click', login)
    error();

})

function login(e) {
    if (phone.value == '' && pwd.value != '') {
        e.preventDefault();
        error_tips.innerHTML = '请输入账号';
        $('#error').css('visibility','visible')
    }else if(phone.value != '' && pwd.value == ''){
        e.preventDefault();
        error_tips.innerHTML = '请输入密码';
        $('#error').css('visibility','visible')
    }else if(phone.value == '' && pwd.value == ''){
        e.preventDefault();
        error_tips.innerHTML = '请输入账号和密码';
        $('#error').css('visibility','visible')
    }

}
function error(){
   if(location.search!=''){
    error_tips.innerHTML = '账号或密码错误，请重新输入';
    $('#error').css('visibility','visible');
   }
}