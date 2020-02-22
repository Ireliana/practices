import $ from "jquery";

window.jsonp = (url, data = {}) => {
	return new Promise((res, rej) => {
		$.ajax({
			url,
			type: "GET",
			dataType: "jsonp",
			data,
			jsonp: "callback",
			success: res,
			error: rej
		});
	});
};

var startTime = new Date().getTime();

function updateTime() {
	var runTime = new Date().getTime();
	if (runTime - startTime < 1000) {
		requestAnimationFrame(updateTime);
		return;
	}
	startTime = runTime;
	// 修正误差值
	var currentTime = window.serverTime + performance.now() - window.offsetTime;
	console.log(
		new Date(currentTime).getMonth() + 1,
		new Date(currentTime).getDate(),
		new Date(currentTime).getHours(),
		new Date(currentTime).getMinutes(),
		new Date(currentTime).getSeconds()
	);
	requestAnimationFrame(updateTime);
}

jsonp("xxx", {
	xx: "xxx",
	xx: "xxx"
}).then(res => {
	console.log(res);
	// 获取文档创建到现在的时间戳，精确到毫秒，不会受到系统时间的影响
	window.offsetTime = performance.now();
	window.serverTime = new Date(res.data.now_time).getTime();
	requestAnimationFrame(updateTime);
});
