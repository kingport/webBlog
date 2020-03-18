
/**
 * 
 * 简单版本的双向绑定
 */
var _xxobj = {}

Object.defineProperty(
  _xxobj,
  'xx_val',
  {
    get: function() {
      console.log(111)
      return 'kkkk'
    },
    set: function(_n) {
      console.log(_n)
      // 将传入值传入其中
      document.getElementById('box').innerHTML = _n;
    },
  }
)

// 事件监听
document.addEventListener('keyup', function(e){
  console.log(e.target.value)
  _xxobj.xx_val = e.target.value;
})
// 写入时触发set
_xxobj.xx_val = 123
// 读取时触发
console.log(_xxobj.xx_val)