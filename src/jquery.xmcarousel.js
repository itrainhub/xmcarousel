/*!
 * jQuery xmCarousel Plugin v1.1.0
 * https://github.com/itrainhub/xmcarousel
 *
 * Copyright 2017 isaac
 * Released under the MIT license
 */
;
(function(factory){
	if (typeof define === "function" && define.amd) {
		// 支持AMD规范
		define(["jquery"], factory);
	} else if (typeof exports === "object"){
		// 支持CommonJS规范
		factory(require("jquery"));
	} else {
		// 不支持模块化开发
		factory(jQuery);
	}
}(function($){
	var xmCarousel = {
		init : function(options, elem){
			var self = this;
			/* 配置 */			
			// 让自定义配置覆盖默认配置
			self.options = options = $.extend({}, $.fn.xmCarousel.defaultOptions, options);
			// 添加常用属性
			self.$elem = $(elem); // 轮播图容器
			self.currentIndex = options.type == "fade" ? options.index : options.index + 1; // 当前显示图片索引
			self.nextIndex = self.currentIndex + 1; // 即将显示图片索引
			self.isRunning = false; // 标识是否正在执行运动动画

			/**********************************************************************************/
			/**********************************************************************************/

			/* DOM 元素初始化 */
			var $ul = $("<ul/>"), // 图片外层大盒子
				$prev = $("<div>&lt;</div>").addClass("prev"), // 向上翻页按钮
				$next = $("<div>&gt;</div>").addClass("next"), // 向下翻页按钮
				$pageCover = $("<div/>").addClass("page_bg"),
				$page = $("<div/>").addClass("page"); // 翻页小圆点

			// 将创建的节点对象保存起来
			self.$ul = $ul;
			self.$prev = $prev;
			self.$next = $next;
			self.$page = $page;

			// 容器添加样式
			$(elem).addClass("xmCarousel").css({
				width : options.width,
				height : options.height
			});

			// ul 初始化，追加元素图片盒子元素
			$ul.html($.map(options.imgs, function(item, index){
				return "<li><a href='"+ (item.href || "#") +"' target='_blank'><img src='"+ item.imgSrc +"'></a></li>";
			}).join(""));
			// 将 ul 追加到轮播图容器中
			$(elem).append($ul);
			// 设置 ul 样式
			$ul.css({
				width : options.width,
				height : options.height
			});
			// 判断轮播方式，设置 ul 宽度或 li 布局定位方式
			if(!/^fade$|^slide$/.test(options.type)) // 默认淡入淡出
				options.type = "fade";

			if (options.type === "fade") { // 淡入淡出
				$ul.children().css({
					position : "absolute",
					top : 0,
					left : 0,
					width : options.width,
					height : options.height
				}).eq(options.index).show().siblings().hide();
			} else if (options.type === "slide") { // 滑动无缝轮播
				// 克隆第一张与最后一张图片
				var $first = $ul.children(":first").clone(true),
					$last = $ul.children(":last").clone(true);
				$ul.append($first).prepend($last);
				// 样式设置
				$ul.css({
							width:(options.imgs.length + 2) * options.width,
							left : -options.width * self.currentIndex
						})
				   .children().css({
						width : options.width,
						height : options.height
					});
			}
			// 添加翻页条背景
			$(elem).append($pageCover);
			// 初始化翻页小圆点
			$page.html($.map(options.imgs, function(item, index){
				return "<div class='" + (index == self.options.index ? "current" : "") + "'></div>";
			}).join(""));
			// 将翻页小圆点添加到轮播图容器中
			$(elem).append($page);
			// 有向上/下翻页按钮
			if (options.btnPrevNext){
				$(elem).append($prev).append($next);
			}

			/**********************************************************************************/
			/**********************************************************************************/
			/* 注册事件监听 */
			var timer = null; // 轮播计时器id
			// 鼠标移入/移出容器
			$(elem).hover(function(){
				clearInterval(timer);
				$prev.show();
				$next.show();
			}, function(){
				$prev.hide();
				$next.hide();
				if (options.autoPlay)
					timer = setInterval(self.move(self), options.duration);
			}).trigger("mouseleave");
			// 鼠标移入小圆点
			$page.on("mouseenter", "div", function(){
				self.nextIndex = self.options.type === "fade" ? $(this).index() : $(this).index() + 1;
				self.move(self)();
			});
			// 有向上/下翻页按钮
			if (options.btnPrevNext) {
				$(".prev").click(function(){
					if (self.isRunning)
						return;
					self.nextIndex = self.currentIndex - 1;
					if (self.options.type === "fade" && self.nextIndex < 0) 
						self.nextIndex = self.options.imgs.length - 1;
					self.move(self)();
				});
				$(".next").click(function(){
					if (self.isRunning)
						return;
					self.move(self)();
				});
			}
			// 阻止默认连续多次点击选中向上/下翻页按钮上的文本
			$(elem).on("selectstart", function(){return false;});
		},
		fade : function(){ // 淡入淡出轮播切换实现
			// 当前正显示图片淡出
			this.$ul.children().eq(this.currentIndex).stop().fadeOut();
			// 即将显示图片淡入
			this.$ul.children().eq(this.nextIndex).stop().fadeIn();

			// 小圆点样式切换
			this.$page.children().eq(this.nextIndex).addClass("current")
								 .siblings().removeClass("current");
			// 更新显示图片索引
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.options.imgs.length)
				this.nextIndex = 0;

			this.isRunning = false;
		},
		slide : function() { // 滑动轮播切换实现
			var self = this;
			// 计算定位值
			var _left = -this.options.width * this.nextIndex;
			// 待切换小圆点索引
			var circleIndex = this.nextIndex - 1;
			if (this.nextIndex >= this.options.imgs.length + 1)
				circleIndex = 0;
			else if (this.currentIndex <= 0)
				circleIndex = this.options.imgs.length - 1;
			// 切换小圆点样式
			this.$page.children().eq(circleIndex).addClass("current")
								 .siblings().removeClass("current");
			// 更新显示图片索引
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			// 调用运动动画方法，实现轮播切换
			this.$ul.stop().animate({left : _left}, function(){
				if (self.nextIndex >= self.$ul.children().length) {
					self.$ul.css("left", -self.options.width);
					self.currentIndex = 1;
					self.nextIndex = 2;
				} else if (self.currentIndex <= 0) {
					self.$ul.css("left", -self.options.width * self.options.imgs.length);
					self.currentIndex = self.options.imgs.length;
					self.nextIndex = self.options.imgs.length + 1;
				}

				// 运动动画执行结束，标记
				self.isRunning = false;
			});
		},
		move : function(carousel){
			// 根据不同轮播方式调用函数执行轮播切换
			return function(){
				// 标识正在执行动画
				carousel.isRunning = true;
				if (carousel.options.type === "fade")
					carousel.fade();
				else
					carousel.slide();
			}			
		}
	};

	// 添加 jQuery 原型方法
	$.fn.xmCarousel = function (options){
		this.each(function(){
			var carousel = Object.create(xmCarousel);
			carousel.init(options, this);
		});

		return this;
	}

	$.fn.xmCarousel.defaultOptions = { // 默认配置
		width : 790, // 容器宽度
		height : 340, // 容器高度
		index : 0, // 初始显示图片索引
		autoPlay : true, // 是否自动轮播
		type : "slide", // 轮播方式，可取 "fade"(淡入淡出) 与 "slide"(水平无缝轮播)
		duration : 5000, // 轮播时间间隔
		btnPrevNext: true, // 是否出现向前/后翻页按钮
		imgs : [] // 轮播图片数组
	};
}));