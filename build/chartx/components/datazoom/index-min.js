define("chartx/components/datazoom/index",["canvax/index","canvax/shape/Rect"],function(a,b){var c=function(a){this.range={start:0,end:1},this.count=1,this.pos={x:0,y:0},this.w=0,this.h=c.height,this.dragIng=function(){},this.dragEnd=function(){},a&&_.deepExtend(this,a),this.barH=this.h-6,this.barY=3,this.btnW=8,this.btnFillStyle="blue",this.btnLeft=null,this.btnRgiht=null,this.init()};return c.prototype={init:function(){var b=this;this.sprite=new a.Display.Sprite({id:"dataZoom",context:{x:this.pos.x,y:this.pos.y}}),this.dataZoomBg=new a.Display.Sprite({id:"dataZoomBg"}),this.dataZoomBtns=new a.Display.Sprite({id:"dataZoomBtns"}),this.sprite.addChild(this.dataZoomBg),this.sprite.addChild(this.dataZoomBtns),b.widget()},widget:function(){var a=new b({context:{x:0,y:this.barY,width:this.w,height:this.barH,lineWidth:1,strokeStyle:"#e6e6e6"}}),c=this;this.sprite.addChild(a),this.btnLeft=new b({dragEnabled:!0,context:{x:this.range.start/this.count*this.w,y:this.barY+1,width:this.btnW,height:this.barH-1,fillStyle:this.btnFillStyle,cursor:"move"}}),this.btnLeft.on("draging",function(){this.context.y=c.barY+1,this.context.x<0&&(this.context.x=0),this.context.x>c.btnRight.context.x-c.btnW-2&&(this.context.x=c.btnRight.context.x-c.btnW-2),c.rangeRect.context.width=c.btnRight.context.x-this.context.x,c.rangeRect.context.x=this.context.x+c.btnW,c.setRange()}),this.btnLeft.on("dragend",function(){c.dragEnd(c.range)}),this.btnRight=new b({dragEnabled:!0,context:{x:this.range.end/this.count*this.w-this.btnW,y:this.barY+1,width:this.btnW,height:this.barH-1,fillStyle:this.btnFillStyle,cursor:"move"}}),this.btnRight.on("draging",function(){this.context.y=c.barY+1,this.context.x<c.btnLeft.context.x+c.btnW+2&&(this.context.x=c.btnLeft.context.x+c.btnW+2),this.context.x>c.w-c.btnW&&(this.context.x=c.w-c.btnW),c.rangeRect.context.width=this.context.x-c.btnLeft.context.x,c.setRange()}),this.btnRight.on("dragend",function(){c.dragEnd(c.range)}),this.dataZoomBtns.addChild(this.btnLeft),this.dataZoomBtns.addChild(this.btnRight),this.rangeRect=new b({dragEnabled:!0,context:{x:this.btnLeft.context.x+c.btnW,y:this.barY+1,width:this.btnRight.context.x-this.btnLeft.context.x-c.btnW,height:this.barH-1,fillStyle:this.btnFillStyle,globalAlpha:.1,cursor:"move"}}),this.rangeRect.on("draging",function(a){this.context.y=c.barY+1,this.context.x<c.btnW&&(this.context.x=c.btnW),this.context.x>c.w-this.context.width-c.btnW&&(this.context.x=c.w-this.context.width-c.btnW),c.btnLeft.context.x=this.context.x-c.btnW,c.btnRight.context.x=this.context.x+this.context.width,c.setRange()}),this.rangeRect.on("dragend",function(){c.dragEnd(c.range)}),this.dataZoomBtns.addChild(this.rangeRect)},setRange:function(){var a=this.btnLeft.context.x/this.w*this.count,b=(this.btnRight.context.x+this.btnW)/this.w*this.count;(this.range.start!=a||this.range.end!=b)&&(this.range.start=a,this.range.end=b,this.dragIng(this.range))}},c.height=46,c});