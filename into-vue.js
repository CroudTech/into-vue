function isElementInViewport (el) {
	var rect = el.getBoundingClientRect()
	return rect.bottom > 0
		&& rect.right > 0
		&& rect.top < (window.innerHeight || document.documentElement.clientHeight)
		&& rect.left < (window.innerWidth || document.documentElement.clientWidth)
}

const elements = []

function check(element) {
	const inViewport = isElementInViewport(element.el)
	if (element.inViewport === null || element.inViewport !== inViewport) {
		element.inViewport = inViewport
		if (inViewport && !element.stop) {
			element.function(element)

			if (element.modifiers.once) {
				element.stop = true
			}
		}
	}
}

function checkAll() {
	elements.forEach(check)
}

['DOMContentLoaded', 'load', 'scroll', 'resize', 'popstate'].forEach(function (event) {
	window.addEventListener(event, checkAll, false)
})

module.exports = {
	install: function (Vue) {
		Vue.directive('into-vue', {
			acceptStatement: true,
			update: function(fn) {
				this.function = fn;
				elements.push(this)
			},
		})
	},
};
