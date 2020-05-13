# alipaysMiniAnimation
支付宝小程序复杂动画示例

在支付宝小程序的api文档中，节点查询相关api可以用于推断某些节点是否可以被用户看见，
同时还可以获得特定节点对象的相关信息——包括其在当前手机端的上下左右位置以及宽高，通过这些api，
我们可以获取到原生JS中dom操作所需要的相关dom信息。

在可以获取到dom信息的基础上，我们可以开发出更精准更复杂的界面动画。

在开发过程中，难点在于已存在的dom元素的位置，需要精确地使用后期元素覆盖已存在的元素之上。
同时，也需要监听上一动画元素是否已经展示完成。
在此需求下，需要使用到的api为my.createIntersectionObserver及my.createSelectorQuery。
具体相关介绍可参考支付宝api文档：

https://opendocs.alipay.com/mini/api/intersectionobserver

https://opendocs.alipay.com/mini/api/selector-query
