## 概述

这是一个简单的 jQuery 轮播图插件，实现最基本的淡入淡出式轮播效果和水平方向滑动无缝轮播效果。

## 起步

首先在页面引入该插件需要使用到外部 CSS 文件：

```
<link rel="stylesheet" href="xmCarousel.min.css">
```

在引入 jQuery 的 JS 库后，引入该插件库：

```
<script type="text/javascript" src="jquery.1.12.4.min.js"></script>
<script type="text/javascript" src="jquery.xmcarousel.min.js"></script>
```

## 使用

### 方法说明：

```
var $carousel = jQueryObject.xmCarousel(options);
	作用：
		使用 jQuery 对象调用该方法，即可实现轮播效果
	参数：
		options 为可配置对象参数，如：
			options = {
				width : 790, // 轮播图外层容器宽度
				height : 340, // 轮播图外层容器高度
				index : 0, // 初始显示图片索引，默认为 0
				autoPlay : true, // 是否自动轮播，默认 true
				type : "slide", // 轮播切换方式，可取 "fade"(淡入淡出) 与 "slide"(滑动无缝轮播)，默认 "fade"
				duration : 5000, // 轮播时间间隔，默认 5000ms
				btnPrevNext: true, // 是否出现向前/后翻页按钮，默认 true
				imgs : [ // 轮播图片数组
					{
						imgSrc:"images/1.jpg", // 图片路径
						href:"http://www.demo.com/1.html" // 超级链接 URL
					}
				] 
			}
	返回值：
		jQuery 对象，方便继续链式调用
```

使用示例：

```
<link rel="stylesheet" href="xmCarousel.min.css">
<div id="container"></div>

<script src="jquery.1.12.4.min.js"></script>
<script src="jquery.xmcarousel.min.js"></script>
<script>
	$("#container").xmCarousel({
		width : 500,
		height : 300,
		imgs : [
			{imgSrc:"images/1.jpg", href:"http://www.test.com/1.html"},
			{imgSrc:"images/2.jpg", href:"http://www.test.com/2.html"},
			{imgSrc:"images/3.jpg", href:"http://www.test.com/3.html"},
			{imgSrc:"images/4.jpg", href:"http://www.test.com/4.html"},
			{imgSrc:"images/5.jpg", href:"http://www.test.com/5.html"}
		]
	});
</script>
```

## 版本

**v1.0.0**

基于 jQuery 1.12.4 版本构建，实现最基本的淡入淡出式轮播、左右滑动无缝轮播效果

## 作者

<a href="http://www.itrain.top" target="_blank">小明</a>