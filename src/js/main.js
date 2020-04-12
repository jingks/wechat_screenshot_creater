var name = "拓磊, 周冉祥, 赵军, 王文军, 王海霞, 李韶予, 杨丁荣, 陈苗, 杨璐华, 吴靖, 李永良, 邱伟杰, 胡永利, 李慧, 王华, 王建兵, 张一楠, 李杨, 王建新, 梁慧, 杨智普, 于子河, 王丹宏, 张继兵, 李强, 刘志强, 邓晖, 刘红旗, 落娟娟, 刘永伟, 王亮, 侯双清, 张军宽, 革命, 王磊, 马慧, 王敏, 李霞, 巩波, 曹茹霞, 刘晓, 吴海珍, 肖文涛, 王恒远, 张海波, 周新跃, 郭强, 王尧, 乔建华, 赵维平, 刘波, 刘阳, 兰胜利, 魏军, 王凤琴, 苏娜, 郑永琛, 郭慧, 赵海军, 孙高娃, 苏爱国, 高根莲, 贾培鑫, 赵磊, 张瑞生, 赵慧娟, 张培生, 刘占江, 胡占明, 胡顺祥";


//返回按钮
document.querySelector('.button-group .back').onclick = function() {
    switch_left('pre');
}

//确认按钮
var name_array = name.split(",");
var len = name_array.length;
var n = 0;

document.querySelector('.button-group .go').onclick = function() {
    //换图片
    change_pic()
}

function change_pic() {
        if( n >= 70) {
            return;
        }
        var x = n;
        var y = x + 1;
        var z = x + 2;
        if(y >= len) {
            y = 0;
        }
        if(z >= len) {
            z = 1;
        }
        //换图片
        document.getElementById('logo').setAttribute('src', 'img/head/' + (x + 1) + '.jpg');
        document.getElementById('logo1').setAttribute('src', 'img/head/' + (x + 1) + '.jpg');
        document.getElementById('logo2').setAttribute('src', 'img/head/' + (y + 1) + '.jpg');
        document.getElementById('logo3').setAttribute('src', 'img/head/' + (z + 1) + '.jpg');
        //改名字
        document.getElementById('name').innerHTML = name_array[x];
        document.getElementById('name1').innerHTML = name_array[x];
        document.getElementById('name2').innerHTML = name_array[y];
        document.getElementById('name3').innerHTML = name_array[z];
        //换背景
        document.getElementById('background').style.background = 'url("img/background/' + (x + 1) + '.jpg")';
        //改变事件
        change_time();
        
        print_screen();
}

function print_screen() {
    
    //截屏函数
    html2canvas(document.getElementById("screen")).then(function (canvas){
        var bnode = document.getElementById('screen-box');
        //da.href = canvas.toDataURL('image/png');
        var html = "<a href=" + canvas.toDataURL('image/png') + " id='pic" + n + "' download='微信图片J2LKJFSs23JLJFfSLKse32ASfF" + n + "'></a>";
        var pnode = parseElement(html);
        bnode.appendChild(pnode);
        document.getElementById('pic' + n).click();
        n++;
        change_pic(n);
    });
}

function change_time() {
    var hour_arr = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
    var hour_index = Math.floor(Math.random() * (hour_arr.length - 1));
    var hour = hour_arr[hour_index];

    var min1_index = Math.floor(Math.random() * 6);
    var min2_index = Math.floor(Math.random() * 10);
    var min = min1_index + '' + min2_index;

    var t = hour + ":" + min;
    
    document.querySelector('.box-right .bar .time').innerHTML = t;
}
 


//计算value
var num = 0;
var now_val = 3;
window.onload = function() {
    var box = document.querySelector('.editor-box');
    box.onclick = function(ev) {
        var ev = ev || window.event;
        var obj = ev.srcElement || ev.target;
        
        //不选中的按钮
        if(obj.classList.contains('select-item') == true && obj.classList.contains('selected') == false) {
            obj.classList.add('selected');
            num += obj.getAttribute('value') * 1;
            //console.log(num);
        } 
        //选中的按钮
        else if(obj.classList.contains('select-item') == true && obj.classList.contains('selected') == true) {
            obj.classList.remove('selected');
            num -= obj.getAttribute('value') * 1;
            //console.log(num);
        } 

    }

    //同步左右数据
    document.querySelector('.after-box').onchange = function(ev) {
        var ev = ev || window.event;
        var obj = ev.srcElement || ev.target;

        //if(obj.class == '')
        var type = obj.classList.value;
        
        //同步单文本 多文本
        if( type == 'text-content') {
            change_text(obj.value);
        }
        //同步单图片
        else if(type == 'single-pic-content') {
            pic2b64(obj, 'one');
        }
        //同步多图片
        else if(type == 'many-pic-content') {
            var clk_val = obj.parentNode.getAttribute('val');
            pic2b64(obj, 'two', clk_val);
        }
        //同步图文
        else if(type == 'pic') {
            pic2b64(obj, 'three');
        }
        else if(type == 'content') {
            change_pic_content_text(obj.value);
        }
    }

    //+ - 按钮操作
    document.querySelector('.many-pic').onclick = function(ev) {
        var ev = ev || window.event;
        var obj = ev.secElement || ev.target;

        if(obj.classList == 'del') {
            //console.log(1);
            del_left_right_pic(obj);
        }
        else if(obj.classList == 'add') {
            //console.log(2);
            //判断右边图片数量
            var l = document.querySelectorAll('.article1 .article-right .many-pic .pics').length;
            console.log(l);
            if(l >= 9) {
                fadeInBox('最多选择9张图片', 2);
                return;
            }
            add_left_right_pic(obj);
        }
    }

}

function pic2b64(obj, type, val = 0) {
    var file = obj.files[0];
    //console.log(file);
    var reader = new FileReader();
    //base64
    reader.readAsDataURL(file);

    reader.onload = function() {
        //console.log(reader.result);
        //return reader.result;
        if( type == 'one') {
            chagne_one_pic(reader.result);
        }
        else if(type == 'two') {
            change_more_one_pic(val, reader.result);
        }
        else {
            change_pic_content_pic(reader.result);
        }
    }
}

function change_text(txt) {
    for(i = 1; i <= 3; i++) {
        document.querySelector('.article' + i + ' .article-right .short-text').innerHTML = txt;
        document.querySelector('.article' + i + ' .article-right .long-text').innerHTML = txt;
    }
}

function chagne_one_pic(b64) {
    for(i = 1; i <= 3; i++) {
        document.querySelector('.article' + i + ' .article-right .one-pic img').setAttribute("src", b64);
    }
}

function change_more_one_pic(n, b64) {
    for (i = 1; i <= 3; i++) {
        document.querySelector('.article' + i + ' .article-right .many-pic .mp' + n).style.backgroundImage = "url(" + b64 + ")";
    }
}

function change_pic_content_pic(b64) {
    for(i = 1; i <= 3; i++) {
        document.querySelector('.article' + i + ' .article-right .pic-content img').setAttribute("src", b64);
    }
}

function change_pic_content_text(txt) {
    for(i = 1; i <= 3; i++) {
        document.querySelector('.article' + i + ' .article-right .content').innerHTML = txt;
    }
}

function del_left_right_pic(obj) {
    //del left
   var v = obj.parentNode.getAttribute('val');
   obj.parentNode.parentNode.removeChild(obj.parentNode);

   //del right
   for(i = 1; i <= 3; i++) {
        var rnode = document.querySelector('.article' + i + ' .article-right .many-pic .mp' + v);
        rnode.parentNode.removeChild(rnode);
   }
}

function add_left_right_pic(obj) {
    //左边添加
   var v = obj.parentNode.getAttribute('val');
   var html = "<div class='many-pic-box' val=" + now_val + "><input class='many-pic-content' type='file' /><button class='del'>-</button></div>";
   var nd = parseElement(html);
   obj.parentNode.insertBefore(nd, obj);

   //右边添加
   for(i = 1; i <= 3; i++) {
        var rp_node = document.querySelector('.article' + i + ' .article-right .many-pic');
        var rhtml = "<div class='pics mp" + now_val + "' style='background-image: url(\"../img/source/1.jpg\");'></div>";
        var rnd = parseElement(rhtml);
        rp_node.appendChild(rnd);
   }

   now_val++;
}

//html转成node
function parseElement(htmlString){
	return new DOMParser().parseFromString(htmlString,'text/html').body.childNodes[0]
}
//1 单文本
//2 多文本
//    3 单文本 多文本
//4 单图片
//5 单文本 单图片
//6 多文本 单图片
//    7 单文本 多文本 单图片
//8 多图片
//9 单文本 多图片
//10 多文本 多图片
//    11 单文本 多文本 多图片
//          12 单图片 多图片
//          13 单文本 单图片 多图片
//          14 多文本 单图片 多图片
//    15 单文本 多文本 单图片 多图片
//16 图文
//17 单文本 图文
//18 多文本 图文
//    19 单文本 多文本 图文
//          20 单图片 图文
//          21 单文本 单图片 图文
//          22 多文本 单图片 图文
//    23 单文本 多文本 单图片 图文
//          24 多图片 图文
//          25 单文本 多图片 图文
//          26 多文本 多图片 图文
//    27 单文本 多文本 多图片 图文
//          28 单图片 多图片 图文
//          29 单文本 单图片 多图片 图文
//          30 多文本 单图片 多图片 图文
//    31 单文本 多文本 单图片 多图片 图文
document.querySelector('.button').onclick = function() {
    //必须选中
    if (num == 0) {
        fadeInBox('必须选中一个内容', 2);
        return;
    }
    //两个文本同时选中
    if (num % 4 == 3) {
        fadeInBox('单行文本不能和多行文本一起选择', 2);
        return;
    }
    //图片同时选中
    if ([12, 13, 14, 20, 21, 22, 24, 25, 26, 28, 29, 30].indexOf(num) != -1) {
        fadeInBox('图片类型不能一起选择', 2);
        return;
    }

    //切换
    switch_left('after');

    //选中
    display_right(num);
}

function switch_left(tag) {
    if(tag == 'pre') {
        document.querySelector('.pre-box').classList.remove('hidden');
        document.querySelector('.after-box').classList.add('hidden');
    } else {
        document.querySelector('.pre-box').classList.add('hidden');
        document.querySelector('.after-box').classList.remove('hidden');
    }
}

function display_right(num) {
    hide_left();
    
    for(i = 1; i <= 3; i++) {
        hide_right(i);
    }

    //单文本
    if([1, 5, 9, 17].indexOf(num) != -1) {
        show_left('text');
        show_right('short-text');
    }

    //多文本
    if([2, 6, 10, 18].indexOf(num) != -1) {
        show_left('text');
        show_right('long-text');
    }

    //图文
    if([16, 17, 18].indexOf(num) != -1) {
        show_left('pic-content');
        show_right('pic-content');
    }

    //单图片
    if([4, 5, 6].indexOf(num) != -1) {
        show_left('single-pic');
        show_right('one-pic');
    }

    //多图片
    if([8, 9, 10].indexOf(num) != -1) {
        show_left('many-pic');
        show_right('many-pic');
    }
}

//隐藏右边
function hide_right(n) {
    document.querySelector('.article' + n + ' .article-right .short-text').classList.add('hidden');
    document.querySelector('.article' + n + ' .article-right .long-text').classList.add('hidden');
    document.querySelector('.article' + n + ' .article-right .pic-content').classList.add('hidden');
    document.querySelector('.article' + n + ' .article-right .one-pic').classList.add('hidden');
    document.querySelector('.article' + n + ' .article-right .many-pic').classList.add('hidden');
}

//显示右边
function show_right(item) {
    for (i = 1; i <= 3; i++) {
        document.querySelector('.article' + i + ' .article-right .' + item).classList.remove('hidden');
    }

}

//隐藏左边
function hide_left() {
    document.querySelector('.text').classList.add('hidden');
    document.querySelector('.single-pic').classList.add('hidden');
    document.querySelector('.many-pic').classList.add('hidden');
    document.querySelector('.pic-content').classList.add('hidden');
}

//显示左边
function show_left(item) {
    document.querySelector('.after-box .' + item).classList.remove('hidden');
}

//逐渐显示警示框
var key = 0;
function fadeInBox(str, time) {
    if(key == 0) {
        var msg_box = document.querySelector('.msg-box');
        msg_box.innerHTML = str;
        msg_box.style.opacity = 1;
        //回调恢复key
        setTimeout(function(){ 
            document.querySelector('.msg-box').style.opacity = 0;
            key = 0;
        }, time * 1000);
    }
    key = 1;
}

