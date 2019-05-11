function jsonp(url, options = {}) {
	const jsoncallback = options.callback || createName();
	return new Promise((res, rej) => {
		let script = document.createElement("script");
		script.src = `${url}?${handleOptions({
			...options,
			_: new Date().getTime(),
			jsoncallback
		})}`;
		window[jsoncallback] = data => {
			document.head.removeChild(script);
			script = null;
			window[jsoncallback] = undefined;
			res(data);
		};
		script.onerror = err => {
			document.head.removeChild(script);
			script = null;
			window[jsoncallback] = undefined;
			rej(err);
		};
		document.head.appendChild(script);
	});
}

const char = "1234567890abc";
function createName() {
	return `jsoncallback_${new Date().getTime()}_${new Array(5)
		.fill(1)
		.map(item => char[Math.floor(Math.random() * char.length)])
		.join("")}`;
}

function handleOptions(opts) {
	return Object.keys(opts)
		.map(key => `${key}=${opts[key]}`)
		.join("&");
}

jsonp("xxx", {
	type: 1,
	id: 1,
}).then(data => {
	console.log(data);
});
