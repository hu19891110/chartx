define("chartx/chart/index",["canvax/index","canvax/core/Base"],function(a,b){var c=function(b){this.el=Chartx.getEl(b),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax=new a({el:this.el}),this.stage=new a.Display.Stage({id:"main-chart-stage"+(new Date).getTime()}),this.canvax.addChild(this.stage),arguments.callee.superclass.constructor.apply(this,arguments),this.init.apply(this,arguments)};return c.Canvax=a,c.extend=function(a,c,d){var e=this,f=function(){e.apply(this,arguments),d&&d.apply(this,arguments)};return f.extend=e.extend,b.creatClass(f,e,a,c)},Chartx.extend=b.creatClass,b.creatClass(c,a.Event.EventDispatcher,{init:function(){},draw:function(){},destroy:function(){this.clear(),this.el.innerHTML=""},clear:function(){_.each(this.canvax.children,function(a){a.removeAllChildren()})},resize:function(){this.clear(),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax.resize(),this.draw()},reset:function(a){a&&!_.isEmpty(a)&&(a.options&&(_.deepExtend(this,a.options),this.dataFrame=this._initData(this.dataFrame.org)),a.data&&(this.dataFrame=this._initData(a.data)),this.clear(),this.draw())},_rotate:function(a){var b=this.width,c=this.height;this.width=c,this.height=b;var d=this;_.each(d.stage.children,function(e){e.context.rotation=a||-90,e.context.x=(b-c)/2,e.context.y=(c-b)/2,e.context.rotateOrigin.x=d.width*e.context.$model.scaleX/2,e.context.rotateOrigin.y=d.height*e.context.$model.scaleY/2})},_initData:function(a){return a}}),c});