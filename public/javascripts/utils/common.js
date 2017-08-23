


function ajaxGet(url,param,callback){
    $.ajax({
        url:url,
        data:param,
        type:'get',
        dataType:'json',
        error:function(){
            callback('ServiceError!');
        },
        success:function(result){
            callback(null,result);
        }
    });
}


function ajaxPost(url,param,callback){
    $.ajax({
        url:url,
        data:param,
        type:'post',
        dataType:'json',
        error:function(){
            callback('ServiceError!');
        },
        success:function(result){
            callback(null,result);
        }
    });
}


function showMsg(msg){
    alert(msg);
}