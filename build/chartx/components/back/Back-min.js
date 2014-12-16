define("chartx/components/back/Back",["canvax/index","canvax/shape/Line","chartx/utils/tools","chartx/utils/deep-extend"],function(a,b){var c=function(a){this.w=0,this.h=0,this.pos={x:0,y:0},this.xOrigin={enabled:1,thinkness:1,strokeStyle:"#cccccc"},this.yOrigin={enabled:1,thinkness:1,strokeStyle:"#BEBEBE"},this.xAxis={enabled:1,w:0,data:[],lineType:"dashed",thinkness:1,strokeStyle:"#cccccc"},this.yAxis={enabled:1,h:0,data:[],lineType:"dashed",thinkness:1,strokeStyle:"#BEBEBE"},this.sprite=null,this.xOriginSp=null,this.yOriginSp=null,this.xAxisSp=null,this.yAxisSp=null,this.init(a)};return c.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){_.deepExtend(this,a),this._configData(a),this._widget(),this.setX(this.pos.x),this.setY(this.pos.y)},_configData:function(a){var b=this;b.w=a.w||0,b.h=a.h||0,a.xAxis&&(b.xAxis.w=a.xAxis.w||b.w,b.xAxis.data=a.xAxis.data),a.yAxis&&(b.yAxis.h=a.yAxis.h||b.h,b.yAxis.data=a.yAxis.data)},_widget:function(){var c=this;c.xAxisSp=new a.Display.Sprite,c.sprite.addChild(c.xAxisSp),c.yAxisSp=new a.Display.Sprite,c.sprite.addChild(c.yAxisSp),c.xOriginSp=new a.Display.Sprite,c.sprite.addChild(c.xOriginSp),c.yOriginSp=new a.Display.Sprite,c.sprite.addChild(c.yOriginSp);for(var d=c.xAxis.data,e=1,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:0,yStart:g.y,xEnd:c.xAxis.w,yEnd:g.y,lineType:c.xAxis.lineType,lineWidth:c.xAxis.thinkness,strokeStyle:c.xAxis.strokeStyle}});c.xAxis.enabled&&c.xAxisSp.addChild(h)}for(var d=c.yAxis.data,e=1,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:g.x,yStart:0,xEnd:g.x,yEnd:-c.yAxis.h,lineType:c.yAxis.lineType,lineWidth:c.yAxis.thinkness,strokeStyle:c.yAxis.strokeStyle}});c.yAxis.enabled&&c.yAxisSp.addChild(h)}var h=new b({context:{xEnd:0,yEnd:-c.h,lineWidth:c.yOrigin.thinkness,strokeStyle:c.yOrigin.strokeStyle}});c.yOrigin.enabled&&c.yOriginSp.addChild(h);var h=new b({context:{xEnd:c.w,yEnd:0,lineWidth:c.xOrigin.thinkness,strokeStyle:c.xOrigin.strokeStyle}});c.xOrigin.enabled&&c.xOriginSp.addChild(h)}},c});