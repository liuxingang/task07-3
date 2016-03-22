/**
 * Created by sck on 2015/12/17.
 */
$(document).ready(function () {
    $(window).on("load", function () { //监听window事件load
        imgLocation();
        //模拟动态获取图片
        var dataImg = {
            "data": [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"},
                {"src": "6.jpg"}, {"src": "7.jpg"}, {"src": "8.jpg"}]
        };
        window.onscroll = function () {
            if (scrollside()) {
                $.each(dataImg.data, function (index, value) {
                    //动态创建div img
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "./images/" + $(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
            toTop();//调用返回顶部函数
        };
    });
});

//向下滚动时，定义图片何时加载
function scrollside() {
    var documentHeight = $(document).height();//获取当前文档视口高度
    var windowHeight = $(window).height();//获取窗口高度
    var scrollHeight = $(window).scrollTop();//获取鼠标滚动的高度
    return windowHeight + scrollHeight >= documentHeight;
}

//图像摆放位置
function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();//得到第一个盒子的宽度
    var num = Math.floor($(window).width() / boxWidth);//得到一排能摆放的个数
    var boxArr = [];
    box.each(function (index, value) {  //遍历得到每个盒子及位置
        var boxHeight = box.eq(index).height();//获取每个盒子的高度
        if (index < num) {
            boxArr[index] = boxHeight;
        } else {
            var minboxHeight = Math.min.apply(null, boxArr);//获取最小高度
            var minboxIndex = $.inArray(minboxHeight, boxArr);//获取数组中最小高度盒子的位置
            $(value).css({
                "position": "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex] += box.eq(index).height();//重新计算高度
        }
    });
}

//滚动条滑动高度大于100时，出现返回顶部按钮
function toTop() {
    var scrollHeight = $(window).scrollTop();
    if (scrollHeight > 100) {
        $(".goto-top").css("display", "block");
    } else {
        $(".goto-top").css("display", "none");
    }
}