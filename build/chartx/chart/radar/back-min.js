define("chartx/chart/radar/back",["canvax/index","canvax/shape/Isogon","canvax/shape/Circle","canvax/shape/Line"],function(a,b,c,d){var e=function(a){this.pos={x:0,y:0},this.r=0,this.yDataSection=[],this.xDataSection=[],this.strokeStyle="#e5e5e5",this.lineWidth=1,this.sprite=null,this.init(a)};return e.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"back"})},draw:function(a){_.deepExtend(this,a),this._widget()},setPosition:function(a,b){var c=this.sprite.context;c.x=a,c.y=b},_widget:function(){var a=this.r,c=this.sprite,e=this.yDataSection;1==e.length&&0==e[0]&&e.push(1);for(var f=_.min(e),g=_.max(e),h=0,i=e.length;i>h;h++){var j=(e[h]-f)/(g-f);if(0!=j){var k=new b({id:"isogon_"+h,context:{x:a,y:a,r:this.r*j,n:this.xDataSection.length,strokeStyle:this.strokeStyle,lineWidth:this.lineWidth}});if(h==i-1){k.hover(function(){},function(){}),k.on("mousemove",function(){});var l=k.getRect(),m=c.context;m.width=l.width,m.height=l.height}c.addChild(k)}}for(var n=c.children[c.children.length-1].context.pointList,o=0,p=n.length;p>o;o++){var q=new d({id:"line_"+o,context:{xStart:a,yStart:a,xEnd:n[o][0]+a,yEnd:n[o][1]+a,lineWidth:this.lineWidth,strokeStyle:this.strokeStyle}});c.addChild(q)}}},e});