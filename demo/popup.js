/**
 *
 *
 * @param {*} fileTest
 * @param {*} imgTest
 * @param {*} img_pop_up
 * @param {*} confirm_choose
 * @param {*} cancel_choose
 * @param {*} rotate_left
 * @param {*} rotate_right
 * @param ratio
 * @param store
 * @param task
 * @param {*} callback
 *
 * //使用方法
 * （这句话写在html）
 * var result;
 var $fileTest = $("#fileTest"), //ipt输入框
 $imgTest = $("#imgTest"), //img
 $img_pop_up = $(".img_pop_up"), //弹出层
 $picture_div = $(".picture_div"), //ipt输入框
 $confirm_choose = $(".confirm_choose"), //确定
 $cancel_choose = $(".cancel_choose"), //取消
 $rotate_left = $(".rotate_left"), //向左旋转
 $rotate_right = $(".rotate_right") //向右旋转
 ratio   //原始默认16 / 9,
 store   ///(0.9)剪裁面积大小（百分比）和图片进行对比
 stsk    // 是否拖动
 ToString($fileTest, $imgTest, $img_pop_up, $confirm_choose, $cancel_choose, $rotate_left,ratio,store,
 $rotate_right,
 function (data) {
            // result = data;
            console.log(data);
            //渲染
        })
 */



function ToString(fileTest, imgTest, img_pop_up, confirm_choose, cancel_choose, rotate_left, rotate_right, ratio, store, task, callback) {
	// 监听上传变化
	var base64 = '';
	fileTest.change('change', function (ev) {
		var $file = $(this);
		var fileObj = $file[0];
		var windowURL = window.URL || window.webkitURL;
		var dataURL = null;
		//TODO--做判断
		//if (!fileObj || !fileObj.files || !fileObj.files[0]) return;
		dataURL = windowURL.createObjectURL(fileObj.files[0]);
		imgTest.attr('src', dataURL);
		imgTest.cropper({
			aspectRatio: ratio, // 原始默认16 / 9,
			viewMode: 3,
			guides: true, //裁剪框虚线 默认true有
			dragCrop: false, //是否新建裁剪框
			dragMode: "none",
			responsive: true, //调整窗口后重新渲染croper
			restore: true, //调整窗口后是否委会剪裁的区域
			checkCrossOrign: true, //检查当前图像是否为跨域
			checkImageOrigin: false,
			modal: true, //黑色遮罩层
			center: false, //剪裁框在图片的中心
			background: false, // 容器是否显示网格背景（马赛克）
			autoCrop: true, //初始化，自动生成图像（自定显示剪裁框）
			autoCropArea: store, //剪裁面积大小（百分比）和图片进行对比
			movable: task, //是否能移动剪裁框
			rotatable: true, //是够允许旋转图片
			scalable: false, //是否允许缩放图片
			zoomable: true, //是否允许放大图片
			zoomOnTouch: true, //手指拖动放大图片
			zoomOnWheel: true, //鼠标放大图片
			wheelZoomRatio: false, //鼠标拖动图片裁剪框
			cropBoxMovable: task, //是否允许拖动裁剪框
			// cropBoxResizable: task, //是否允许拖动 改变裁剪框大小（不能用）
			resizable: task, //是否允许改变裁剪框大小

			// minContainerWidth: 320,
			// minContainerHeight: 180,
			// minCanvasWidth: 320,
			// minCanvasHeight: 180,
			// minCropBoxWidth: 100,
			// minCropBoxHeight: 100,

		});
		img_pop_up.css({
			'display': 'block'
		});
		if(img_pop_up.css({'display': 'block'})){
			$('body').css({"position":"fixed"},{"top":"0"},{"left":"0"})
		}
		// fileTest.css({
		//     'display': 'none'
		// })
		// 向左旋转
		rotate_left.off().on('click', function () {
			imgTest.cropper('rotate', 45);
		});
		// 向右旋转
		rotate_right.off().on('click', function () {
			imgTest.cropper('rotate', -45);
		});
		// 取消上传图片事件
		cancel_choose.off().on('click', function () {
			//TODO-清空val值
			fileTest.val('');
			img_pop_up.css('display', 'none');
			imgTest.cropper('clear'); //clear()：清空剪裁区域。
			imgTest.cropper('destroy');
			if(img_pop_up.css({'display': 'none'})){
				$('body').css({"position":""})
			}
		});
		// 点击确定
		confirm_choose.off().on('click', function () {
			img_pop_up.css({
				'display': 'none'
			});
			if(img_pop_up.css({'display': 'none'})){
				$('body').css({"position":""})
			}
			if (imgTest.cropper('getCroppedCanvas') == null) return;
			base64 = imgTest.cropper('getCroppedCanvas').toDataURL('image/jpeg', 0.3);
			// 直接渲染最后统一上传
			callback(base64)
			//TODO-清空val值
			fileTest.val('');
			// imgTest.cropper('destroy'); //不能用(执行一次，下次会显示马赛克)
			imgTest.cropper('clear'); //clear()：清空剪裁区域。
			imgTest.cropper('destroy');
		});
	});
}
