window.Chartx||(Chartx={_start:function(){function a(a){if(h.length>0)for(var b=0,c=h.length;c>b;b++)if(0==a.indexOf(h[b].name))return!0}for(var b,c=document.getElementsByTagName("script"),d=c.length-1;d>=0;d--){var e=c[d].getAttribute("src");if(e.indexOf("chartx/index")>=0){b=e.substr(0,e.indexOf("chartx/"));break}}var f=b.replace(/(^\s*)|(\s*$)/g,"").replace(/[^"]*(thx\/charts.+)/,"$1"),g=define,h=[{name:"canvax"},{name:"chartx"}];window.define=function(b,c,d){return"string"==typeof b&&a(b)?g(f+b,c,function(a,b,e){for(var g=[],h=0,i=c.length;i>h;h++)g.push(a(f+c[h]));e.exports=d.apply(window,g)}):g.apply(window,arguments)},Chartx._start=null,delete Chartx._start}}),Chartx._start&&Chartx._start(),define("chartx/chart/index",["canvax/index","canvax/core/Base"],function(a,b){var c=function(c,d,e){_&&!_.deepExtend&&b.setDeepExtend(),this.el=b.getEl(c),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax=new a({el:this.el}),this.stage=new a.Display.Stage({id:"main-chart-stage"+(new Date).getTime()}),this.canvax.addChild(this.stage),arguments.callee.superclass.constructor.apply(this,arguments),this.init.apply(this,arguments)};return c.Canvax=a,c.extend=function(a,c,d){var e=this,f=function(){e.apply(this,arguments),d&&d.apply(this,arguments)};return f.extend=e.extend,b.creatClass(f,e,a,c)},Chartx.extend=b.creatClass,b.creatClass(c,a.Event.EventDispatcher,{init:function(){},dataFrame:null,draw:function(){},destroy:function(){this.clean(),this.el.innerHTML="",this._destroy&&this._destroy()},clean:function(){_.each(this.canvax.children,function(a,b){a.removeAllChildren()})},resize:function(){this.clean(),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax.resize(),this.draw()},reset:function(a){a&&a.options&&(_.deepExtend(this,a.options),this.dataFrame&&(this.dataFrame=this._initData(this.dataFrame.org))),a&&a.data&&(this.dataFrame=this._initData(a.data)),this.clean(),this.draw()},_rotate:function(a){var b=this.width,c=this.height;this.width=c,this.height=b;var d=this;_.each(d.stage.children,function(e){e.context.rotation=a||-90,e.context.x=(b-c)/2,e.context.y=(c-b)/2,e.context.rotateOrigin.x=d.width*e.context.$model.scaleX/2,e.context.rotateOrigin.y=d.height*e.context.$model.scaleY/2})},_initData:function(a){return a}}),c}),define("chartx/components/anchor/Anchor",["canvax/index","canvax/shape/Line","canvax/shape/Circle"],function(a,b,c){var d=function(a){this.w=0,this.h=0,this.enabled=0,this.xAxis={lineWidth:1,fillStyle:"#0088cf",lineType:"dashed"},this.yAxis={lineWidth:1,fillStyle:"#0088cf",lineType:"dashed"},this.node={enabled:1,r:2,fillStyle:"#0088cf",strokeStyle:"#0088cf",lineWidth:2},this.text={enabled:0,fillStyle:"#0088cf"},this.pos={x:0,y:0},this.cross={x:0,y:0},this.sprite=null,this._txt=null,this._circle=null,this._xAxis=null,this._yAxis=null,this.init(a)};return d.prototype={init:function(b){b&&_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"AnchorSprite"})},draw:function(a,b,c){this._xAxis=b,this._yAxis=c,this._initConfig(a),this.sprite.context.x=this.pos.x,this.sprite.context.y=this.pos.y,this.enabled&&this._widget()},show:function(){this.sprite.context.visible=!0,this._circle.context.visible=!0,this._txt&&(this._txt.context.visible=!0)},hide:function(){this.sprite.context.visible=!1,this._circle.context.visible=!1,this._txt&&(this._txt.context.visible=!1)},_initConfig:function(a){a&&_.deepExtend(this,a)},resetCross:function(a){this._xLine.context.yStart=a.y,this._xLine.context.yEnd=a.y,this._yLine.context.xStart=a.x,this._yLine.context.xEnd=a.x;var b=this.sprite.localToGlobal(a);if(this._circle.context.x=b.x,this._circle.context.y=b.y,this.text.enabled){var b=this.sprite.localToGlobal(a);this._txt.context.x=parseInt(b.x),this._txt.context.y=parseInt(b.y);var c=this._xAxis.dataSection,d=c.length,e=parseInt(a.x/this.w*(c[d-1]-c[0])+c[0]),f=this._yAxis.dataSection,g=f.length,h=parseInt((this.h-a.y)/this.h*(f[g-1]-f[0])+f[0]);this._txt.resetText("（X："+e+"，Y："+h+"）"),a.y<=20?this._txt.context.textBaseline="top":this._txt.context.textBaseline="bottom",a.x<=this._txt.getTextWidth()?this._txt.context.textAlign="left":this._txt.context.textAlign="right"}},_widget:function(){var d=this;d._xLine=new b({id:"x",context:{xStart:0,yStart:d.cross.y,xEnd:d.w,yEnd:d.cross.y,lineWidth:d.xAxis.lineWidth,strokeStyle:d.xAxis.fillStyle,lineType:d.xAxis.lineType}}),d.sprite.addChild(d._xLine),d._yLine=new b({id:"y",context:{xStart:d.cross.x,yStart:0,xEnd:d.cross.x,yEnd:d.h,lineWidth:d.yAxis.lineWidth,strokeStyle:d.yAxis.fillStyle,lineType:d.yAxis.lineType}}),this.sprite.addChild(d._yLine);var e=d.sprite.localToGlobal(d.cross);d._circle=new c({context:{x:parseInt(e.x),y:parseInt(e.y),r:d._getProp(d.node.r),fillStyle:d._getProp(d.node.fillStyle)||"#ff0000",strokeStyle:d._getProp(d.node.strokeStyle)||"#cc3300",lineWidth:d._getProp(d.node.lineWidth)||4}}),d.sprite.getStage().addChild(d._circle),d.text.enabled&&(d._txt=new a.Display.Text("",{context:{x:parseInt(e.x),y:parseInt(e.y),textAlign:"right",textBaseline:"bottom",fillStyle:d.text.fillStyle}}),d.sprite.getStage().addChild(d._txt))},_getProp:function(a){return _.isFunction(a)?a():a}},d}),define("chartx/components/back/Back",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a){this.w=0,this.h=0,this.pos={x:0,y:0},this.enabled=1,this.xOrigin={enabled:1,lineWidth:2,strokeStyle:"#0088cf"},this.yOrigin={enabled:1,lineWidth:2,strokeStyle:"#0088cf",biaxial:!1},this.xAxis={enabled:1,data:[],org:null,lineType:"solid",lineWidth:1,strokeStyle:"#f5f5f5",filter:null},this.yAxis={enabled:0,data:[],org:null,lineType:"solid",lineWidth:1,strokeStyle:"#f5f5f5",filter:null},this.sprite=null,this.xAxisSp=null,this.yAxisSp=null,this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){_.deepExtend(this,a),this._widget(),this.setX(this.pos.x),this.setY(this.pos.y)},update:function(a){this.sprite.removeAllChildren(),this.draw(a)},_widget:function(){var c=this;if(this.enabled){c.xAxisSp=new a.Display.Sprite,c.sprite.addChild(c.xAxisSp),c.yAxisSp=new a.Display.Sprite,c.sprite.addChild(c.yAxisSp);for(var d=c.xAxis.data,e=0,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:0,yStart:g.y,xEnd:c.w,yEnd:g.y,lineType:c.xAxis.lineType,lineWidth:c.xAxis.lineWidth,strokeStyle:c.xAxis.strokeStyle}});c.xAxis.enabled&&(_.isFunction(c.xAxis.filter)&&c.xAxis.filter({layoutData:c.yAxis.data,index:e,line:h}),c.xAxisSp.addChild(h))}for(var d=c.yAxis.data,e=0,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:g.x,yStart:0,xEnd:g.x,yEnd:-c.h,lineType:c.yAxis.lineType,lineWidth:c.yAxis.lineWidth,strokeStyle:c.yAxis.strokeStyle,visible:g.x?!0:!1}});c.yAxis.enabled&&(_.isFunction(c.yAxis.filter)&&c.yAxis.filter({layoutData:c.xAxis.data,index:e,line:h}),c.yAxisSp.addChild(h))}var i=null==c.yAxis.org?0:_.find(c.yAxis.data,function(a){return a.content==c.yAxis.org}).x,h=new b({context:{xStart:i,xEnd:i,yEnd:-c.h,lineWidth:c.yOrigin.lineWidth,strokeStyle:c.yOrigin.strokeStyle}});if(c.yOrigin.enabled&&c.sprite.addChild(h),c.yOrigin.biaxial){var j=new b({context:{xStart:c.w,xEnd:c.w,yEnd:-c.h,lineWidth:c.yOrigin.lineWidth,strokeStyle:c.yOrigin.strokeStyle}});c.yOrigin.enabled&&c.sprite.addChild(j)}var k=null==c.xAxis.org?0:_.find(c.xAxis.data,function(a){return a.content==c.xAxis.org}).y,h=new b({context:{yStart:k,xEnd:c.w,yEnd:k,lineWidth:c.xOrigin.lineWidth,strokeStyle:c.xOrigin.strokeStyle}});c.xOrigin.enabled&&c.sprite.addChild(h)}}},d}),define("chartx/components/legend/index",["canvax/index","canvax/shape/Rect"],function(a,b){var c=function(a,b){this.data=a||[],this.w=0,this.h=0,this.tag={height:20},this.enabled=1,this.icon={width:6,height:6,lineWidth:1,fillStyle:"#999"},this.layoutType="vertical",this.sprite=null,this.init(b)};return c.prototype={init:function(b){b&&_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"LegendSprite"}),this.draw()},pos:function(a){this.sprite.context.x=a.x,this.sprite.context.y=a.y},draw:function(a,b,c){this.enabled&&this._widget()},label:function(a){return a.field+"："+a.value},_widget:function(){var c=this,d=0;_.each(this.data,function(e,f){var g=new a.Display.Sprite({context:{height:c.tag.height,y:c.tag.height*f}}),h=new b({context:{width:c.icon.width,height:c.icon.height,x:0,y:c.tag.height/2-c.icon.height/2,fillStyle:e.fillStyle}});g.addChild(h);var i=c.label(e),j=new a.Display.Text(i,{context:{x:c.icon.width+6,y:c.tag.height/2,textAlign:"left",textBaseline:"middle",fillStyle:"#333"}});g.addChild(j),g.context.width=c.icon.width+6+j.getTextWidth(),d=Math.max(d,g.context.width),c.sprite.addChild(g)}),c.sprite.context.width=d,c.sprite.context.height=c.sprite.children.length*c.tag.height,c.w=d+10,c.h=c.sprite.children.length*c.tag.height}},c}),define("chartx/components/markline/index",["canvax/index","canvax/shape/BrokenLine"],function(a,b){var c=function(a){this.field=null,this.origin={x:0,y:0},this.line={y:0,list:[],strokeStyle:"#000000",lineWidth:1,smooth:!1,lineType:"dashed"},this.filter=function(){},this._doneHandle=null,this.done=function(a){this._doneHandle=a},a&&_.deepExtend(this,a),this.init()};return c.prototype={init:function(){var b=this;this.sprite=new a.Display.Sprite({context:{x:this.origin.x,y:this.origin.y}}),setTimeout(function(){b.widget()},10)},widget:function(){var a=this,c=new b({id:"line",context:{y:a.line.y,pointList:a.line.list,strokeStyle:a.line.strokeStyle,lineWidth:a.line.lineWidth,lineType:a.line.lineType}});a.sprite.addChild(c),a._done(),a.filter(a)},_done:function(){_.isFunction(this._doneHandle)&&this._doneHandle.apply(this,[])}},c}),define("chartx/components/markpoint/index",["canvax/index","canvax/animation/Tween"],function(a,b){var c=function(a,c,d){this.markTarget=null,this.data=d,this.point={x:0,y:0},this.normalColor="#6B95CF",this.shapeType="circle",this.fillStyle=null,this.strokeStyle=null,this.lineWidth=1,this.globalAlpha=.7,this.duration=800,this.easing=b.Easing.Linear.None,this.hr=5,this.vr=8,this.r=5,this.sprite=null,this.shape=null,this._doneHandle=null,this.done=function(a){this._doneHandle=a},this.realTime=!1,this.tween=null,this.filter=function(){},"markPoint"in a&&(this.enabled=!0,_.deepExtend(this,a.markPoint)),c&&_.deepExtend(this,c),this.init()};return c.prototype={init:function(){var b=this;this.sprite=new a.Display.Sprite({context:{x:this.point.x,y:this.point.y}}),setTimeout(function(){b.widget()},10)},widget:function(){switch(this._fillStyle=this._getColor(this.fillStyle,this.data),this._strokeStyle=this._getColor(this.strokeStyle,this.data),this.shapeType.toLocaleLowerCase()){case"circle":this._initCircleMark();break;case"droplet":this._initDropletMark()}},_getColor:function(a,b,c){var d=a;return _.isFunction(a)&&(d=a(b)),d&&""!=d||(d=arguments.length>=3?c:this.normalColor),d},_done:function(){this.shape.context.visible=!0,this.shapeBg&&(this.shapeBg.context.visible=!0),_.isFunction(this._doneHandle)&&this._doneHandle.apply(this,[]),_.isFunction(this.filter)&&this.filter(this)},_initCircleMark:function(){var a=this;require(["canvax/shape/Circle"],function(b){var c={r:a.r,fillStyle:a._fillStyle,lineWidth:a.lineWidth,strokeStyle:a._strokeStyle,globalAlpha:a.globalAlpha,cursor:"point",visible:!1};a.shape=new b({context:c}),a.sprite.addChild(a.shape),a._realTimeAnimate(),a._done()})},destroy:function(){this.tween&&this.tween.stop(),this.sprite.destroy()},_realTimeAnimate:function(){function a(){d=requestAnimationFrame(a),b.update()}var c=this;if(c.realTime){c.shapeBg||(c.shapeBg=c.shape.clone(),c.sprite.addChildAt(c.shapeBg,0));var d=null,e=function(){c.tween=new b.Tween({r:c.r,alpha:c.globalAlpha}).to({r:3*c.r,alpha:0},c.duration).onUpdate(function(){c.shapeBg.context.r=this.r,c.shapeBg.context.globalAlpha=this.alpha}).repeat(1/0).delay(800).easing(c.easing).start(),a()};e()}},_initDropletMark:function(){var a=this;require(["canvax/shape/Droplet"],function(b){var c={y:-a.vr,scaleY:-1,hr:a.hr,vr:a.vr,fillStyle:a._fillStyle,lineWidth:a.lineWidth,strokeStyle:a._strokeStyle,globalAhpla:a.globalAhpla,cursor:"point",visible:!1};a.shape=new b({context:c}),a.sprite.addChild(a.shape),a._done()})}},c}),define("chartx/components/planet/Graphs",["canvax/index","canvax/shape/Rect","chartx/utils/tools","canvax/animation/Tween","chartx/components/planet/InfoCircle"],function(a,b,c,d,e){var f=function(a,b){this.root=b,this.data=[],this.sprite=null,this.event={enabled:1},this.init(a)};return f.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},getX:function(){return this.sprite.context.x},getY:function(){return this.sprite.context.y},draw:function(a){var b=this;_.deepExtend(this,a),b._widget()},_widget:function(){for(var b=this,c=0,d=b.data.length;d>c;c++){var f=new a.Display.Sprite;if(b.data[0].length>0)for(var g=0,h=b.data[c].length;h>g;g++){var i=b.data[c][g];i.event=i.event&&0==i.event.enabled||b.event;var j=i.x,k=i.y;i.x=0,i.y=0;var l=new e(i,b.root,{ringID:c,ID:g+1,x:j,y:k});l.setX(j),l.setY(k),0!=i.enabled&&f.addChild(l.sprite)}else{var i=b.data[c];i.event=b.event;var j=i.x,k=i.y;if(i.x=0,i.y=0,0!=i.enabled){var l=new e(i,b.root,{ringID:c,x:j,y:k});l.setX(j),l.setY(k),f.addChild(l.sprite)}}b.sprite.addChild(f)}}},f}),define("chartx/components/planet/InfoCircle",["canvax/index","canvax/shape/Circle","canvax/shape/Rect"],function(a,b,c){var d=function(a,b,c){this.root=b,this.fire=c,this.x=0,this.y=0,this.r={normal:30,over:3},this.fillStyle={normal:"#ff0000",over:"#ff0000"},this.strokeStyle={normal:"#000000",over:"#000000"},this.lineWidth={normal:0,over:0},this.globalAlpha={normal:1,over:1},this.text={content:"",place:"right",fillStyle:{normal:"#000000",over:"#000000"},fontSize:{normal:12,over:12}},this.event={enabled:0},this.sprite=null,this.circle=null,this.init(a)};return d.prototype={init:function(d){_.deepExtend(this,d);var e=this;e.sprite=new a.Display.Sprite;var f=new b({id:"circle",context:{x:e.x||0,y:e.y||0,r:e.r.normal||30,fillStyle:e.fillStyle.normal,strokeStyle:e.strokeStyle.normal||"000000",lineWidth:e.lineWidth.normal||0,globalAlpha:e.globalAlpha.normal,cursor:e.event.enabled?"pointer":""}});e.circle=f,e.sprite.addChild(f);var g=new a.Display.Text(e.text.content,{context:{fillStyle:e.text.fillStyle.normal,fontSize:e.text.fontSize.normal}});e.sprite.addChild(g);var h=e.r.normal+2,i=e.y-parseInt(g.getTextHeight()/2);if("center"==e.text.place&&(h=e.x-parseInt(g.getTextWidth()/2)),g.context.x=h,g.context.y=i,e.text.content){var j=new c({context:{x:h-2,y:i,width:g.getTextWidth()+2,height:g.getTextHeight(),fillStyle:"#000000",globalAlpha:0,cursor:e.event.enabled?"pointer":""}});e.sprite.addChild(j)}1==e.event.enabled&&(e._event(f),j&&e._event(j))},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},_event:function(a){var b=this;a.on("mouseover",function(a){b._mouseoverHandler(a)}),a.on("mouseout",function(a){b._mouseoutHandler(a)}),a.on("click",function(a){b._clickHandler(a)})},_mouseoverHandler:function(a){var b=this;b.sprite.parent.toFront(),b.fire.eventType="mouseover",b.root.event.onClick(b.fire),b._induce(!0)},_mouseoutHandler:function(a){var b=this;b.fire.eventType="mouseout",b.root.event.onClick(b.fire),b._induce(!1)},_clickHandler:function(a){var b=this;b.fire.eventType="click",b.root.event.onClick(b.fire)},_induce:function(a){var b=this,c=1.1;b.r.normal<=5&&(c=1.3);var d=a?c:1;b.circle.context.scaleX=b.circle.context.scaleY=d}},d}),define("chartx/components/tips/tip",["canvax/index","canvax/shape/Rect","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.enabled=!0,this.tipDomContainer=b,this.cW=0,this.cH=0,this.dW=0,this.dH=0,this.backR=5,this.sprite=null,this.content=null,this.fillStyle="#000000",this.text={fillStyle:"#ffffff"},this.strokeStyle=null,this.lineWidth=1,this.alpha=.5,this._tipDom=null,this._back=null,this.offset=10,this.tipsInfo={},this.prefix=[],this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"TipSprite"})},show:function(a){if(this.enabled){this.hide();var b=a.target.getStage();this.cW=b.context.width,this.cH=b.context.height,this._initContent(a),this._initBack(a),this.setPosition(a),this.sprite.toFront()}},move:function(a){this.enabled&&(this._setContent(a),this._resetBackSize(a),this.setPosition(a))},hide:function(){this.enabled&&(this.sprite.removeAllChildren(),this._removeContent())},setPosition:function(a){if(this._tipDom){var b=a.pos||a.target.localToGlobal(a.point),c=this._checkX(b.x+this.offset),d=this._checkY(b.y+this.offset),e=this.sprite.parent.globalToLocal({x:c,y:d});this.sprite.context.x=e.x,this.sprite.context.y=e.y,this._tipDom.style.cssText+=";visibility:visible;left:"+c+"px;top:"+d+"px;"}},_initContent:function(a){this._tipDom=document.createElement("div"),this._tipDom.className="chart-tips",this._tipDom.style.cssText+=";visibility:hidden;position:absolute;display:inline-block;*display:inline;*zoom:1;padding:6px;color:white;line-height:1.5",this.tipDomContainer.appendChild(this._tipDom),this._setContent(a)},_removeContent:function(){this._tipDom&&(this.tipDomContainer.removeChild(this._tipDom),this._tipDom=null)},_setContent:function(a){this._tipDom&&(this._tipDom.innerHTML=this._getContent(a),this.dW=this._tipDom.offsetWidth,this.dH=this._tipDom.offsetHeight)},_getContent:function(a){_.extend(this.tipsInfo,a.tipsInfo||a.eventInfo||{});var b=_.isFunction(this.content)?this.content(this.tipsInfo):this.content;return b||0==b||(b=this._getDefaultContent(this.tipsInfo)),b},_getDefaultContent:function(a){var b="<table>",d=this;return _.each(a.nodesInfoList,function(a,e){b+="<tr style='color:"+d.text.fillStyle+"'>";var f=d.prefix[e];f?b+="<td>"+f+"：</td>":a.field&&(b+="<td>"+a.field+"：</td>"),b+="<td>"+c.numAddSymbol(a.value)+"</td></tr>"}),b+="</table>"},_initBack:function(a){var c={x:0,y:0,width:this.dW,height:this.dH,lineWidth:this.lineWidth,fillStyle:this.fillStyle,radius:[this.backR],globalAlpha:this.alpha};this.strokeStyle&&(c.strokeStyle=this.strokeStyle),this._back=new b({id:"tipsBack",context:c}),this.sprite.addChild(this._back)},_resetBackSize:function(a){this._back.context.width=this.dW,this._back.context.height=this.dH},_checkX:function(a){var b=this.dW+2;return 0>a&&(a=0),a+b>this.cW&&(a=this.cW-b),a},_checkY:function(a){var b=this.dH+2;return 0>a&&(a=0),a+b>this.cH&&(a=this.cH-b),a}},d}),define("chartx/components/xaxis/xAxis",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.graphw=0,this.graphh=0,this.yAxisW=0,this.w=0,this.h=0,this.disY=1,this.dis=6,this.label="",this._label=null,this.line={enabled:1,width:1,height:4,strokeStyle:"#cccccc"},this.text={fillStyle:"#999999",fontSize:12,rotation:0,format:null,textAlign:null},this.maxTxtH=0,this.pos={x:null,y:null},this.enabled=1,this.disXAxisLine=6,this.disOriginX=0,this.xGraphsWidth=0,this.dataOrg=[],this.dataSection=[],this._layoutDataSection=[],this.data=[],this.layoutData=[],this.sprite=null,this._textMaxWidth=0,this.leftDisX=0,this.filter=null,this.isH=!1,this.init(a,b)};return d.prototype={init:function(b,c){this.dataOrg=c.org,b&&_.deepExtend(this,b),0!=this.text.rotation&&this.text.rotation%90==0&&(this.isH=!0),this.line.enabled||(this.line.height=1),this.sprite=new a.Display.Sprite({id:"xAxisSprite"}),0==this.dataSection.length&&(this.dataSection=this._initDataSection(this.dataOrg)),this._layoutDataSection=this._formatDataSectionText(this.dataSection),this._setTextMaxWidth(),this._setXAxisHeight()},_initDataSection:function(a){return _.flatten(a)},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){this._getLabel(),this._initConfig(a),this.data=this._trimXAxis(this.dataSection,this.xGraphsWidth);var b=this;_.each(this.data,function(a,c){a.layoutText=b._layoutDataSection[c]}),this._trimLayoutData(),this.setX(this.pos.x),this.setY(this.pos.y),this.enabled&&(this._widget(),this.text.rotation||this._layout())},_getLabel:function(){this.label&&""!=this.label&&(this._label=new a.Display.Text(this.label,{context:{fontSize:this.text.fontSize,textAlign:this.isH?"center":"left",textBaseline:this.isH?"top":"middle",fillStyle:this.text.fillStyle,rotation:this.isH?-90:0}}))},_initConfig:function(a){a&&_.deepExtend(this,a),this.yAxisW=Math.max(this.yAxisW,this.leftDisX),this.w=this.graphw-this.yAxisW,null==this.pos.x&&(this.pos.x=this.yAxisW+this.disOriginX),null==this.pos.y&&(this.pos.y=this.graphh-this.h),this.xGraphsWidth=this.w-this._getXAxisDisLine(),this._label&&(this.isH?this.xGraphsWidth-=this._label.getTextHeight()+5:this.xGraphsWidth-=this._label.getTextWidth()+5),this.disOriginX=parseInt((this.w-this.xGraphsWidth)/2)},_trimXAxis:function(a,b){for(var c=[],d=b/(a.length+1),e=0,f=a.length;f>e;e++){var g={content:a[e],x:parseInt(d*(e+1))};c.push(g)}return c},_formatDataSectionText:function(a){a||(a=this.dataSection);var b=this,c=[];return _.each(a,function(a){c.push(b._getFormatText(a))}),c},_getXAxisDisLine:function(){var a=this.disXAxisLine,b=2*a,c=a;return c=a+this.w%this.dataOrg.length,c=c>b?b:c,c=isNaN(c)?0:c},_setXAxisHeight:function(){if(this.enabled){var b=new a.Display.Text(this._layoutDataSection[0]||"test",{context:{fontSize:this.text.fontSize}});if(this.maxTxtH=b.getTextHeight(),this.text.rotation)if(this.text.rotation%90==0)this.h=this._textMaxWidth+this.line.height+this.disY+this.dis+3;else{var c=Math.sin(Math.abs(this.text.rotation)*Math.PI/180),d=Math.cos(Math.abs(this.text.rotation)*Math.PI/180);this.h=c*this._textMaxWidth+b.getTextHeight()+5,this.leftDisX=d*b.getTextWidth()+8}else this.h=this.disY+this.line.height+this.dis+this.maxTxtH,this.leftDisX=b.getTextWidth()/2}else this.dis=0,this.h=3},_getFormatText:function(a){var b;return b=_.isFunction(this.text.format)?this.text.format(a):a,_.isArray(b)&&(b=c.numAddSymbol(b)),b},_widget:function(){var c=this.layoutData;this._label&&(this._label.context.x=this.xGraphsWidth+5,this.sprite.addChild(this._label));for(var d=0,e=c.length;e>d;d++){var f=new a.Display.Sprite({id:"xNode"+d}),g=c[d],h=g.x,i=this.disY+this.line.height+this.dis,j=new a.Display.Text(g.layoutText||g.content,{context:{x:h,y:i,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,rotation:-Math.abs(this.text.rotation),textAlign:this.text.textAlign||(this.text.rotation?"right":"center"),textBaseline:this.text.rotation?"middle":"top"}});if(f.addChild(j),this.text.rotation&&90!=this.text.rotation&&(j.context.x+=5,j.context.y+=3),this.line.enabled){var k=new b({context:{x:h,y:this.disY,xEnd:0,yEnd:this.line.height+this.disY,lineWidth:this.line.width,strokeStyle:this.line.strokeStyle}});f.addChild(k)}_.isFunction(this.filter)&&this.filter({layoutData:c,index:d,txt:j,line:k||null}),this.sprite.addChild(f)}},_layout:function(){if(0!=this.sprite.getNumChildren()){var a=this.sprite.getChildAt(this.sprite.getNumChildren()-1).getChildAt(0);if(a){var b=a.context;if("center"==b.textAlign&&b.x+a.context.width/2>this.w&&(b.x=this.w-a.context.width/2),"left"==b.textAlign&&b.x+a.context.width>this.w&&(b.x=this.w-a.context.width),this.sprite.getNumChildren()>=2){var c=this.sprite.getChildAt(this.sprite.getNumChildren()-2).getChildAt(0),d=c.context;d.visible&&b.x<d.x+d.width&&(b.visible=!1)}}}},_setTextMaxWidth:function(){for(var b=this._layoutDataSection,c=b[0],d=0,e=b.length;e>d;d++)b[d].length>c.length&&(c=b[d]);var f=new a.Display.Text(c||"test",{context:{fillStyle:this.text.fillStyle,fontSize:this.text.fontSize}});return this._textMaxWidth=f.getTextWidth(),this._textMaxHeight=f.getTextHeight(),this._textMaxWidth},_trimLayoutData:function(){var a=[],b=this.data,c=this._textMaxWidth+10;this.text.rotation&&(c=1.5*this._textMaxHeight);var d=Math.min(Math.floor(this.w/c),b.length-1);if(d>=b.length-1)this.layoutData=b;else{for(var e=Math.max(Math.ceil(b.length/d-1),0),f=0;d>f;f++){var g=b[f+e*f];g&&a.push(g)}this.layoutData=a}}},d}),define("chartx/components/yaxis/yAxis",["canvax/index","canvax/shape/Line","chartx/utils/tools","chartx/utils/datasection"],function(a,b,c,d){var e=function(a,b){this.w=0,this.enabled=1,this.dis=6,this.label="",this._label=null,this.line={enabled:1,width:4,lineWidth:1,strokeStyle:"#BEBEBE"},this.text={fillStyle:"#999999",fontSize:12,format:null,rotation:0},this.pos={x:0,y:0},this.place="left",this.biaxial=!1,this.layoutData=[],this.dataSection=[],this.dataOrg=[],this.sprite=null,this.x=0,this.y=0,this.disYAxisTopLine=6,this.yMaxHeight=0,this.yGraphsHeight=0,this.baseNumber=null,this.basePoint=null,this.filter=null,this.isH=!1,this.init(a,b)};return e.prototype={init:function(b,c){_.deepExtend(this,b),0!=this.text.rotation&&this.text.rotation%90==0&&(this.isH=!0),this._initData(c),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},setAllStyle:function(a){_.each(this.sprite.children,function(b){_.each(b.children,function(b){"text"==b.type?b.context.fillStyle=a:"line"==b.type&&(b.context.strokeStyle=a)})})},update:function(a,b){this.sprite.removeAllChildren(),this.dataSection=[],_.deepExtend(this,a),this._initData(b),this.draw()},_getLabel:function(){this.label&&""!=this.label&&(this._label=new a.Display.Text(this.label,{context:{fontSize:this.text.fontSize,textAlign:"left",textBaseline:this.isH?"top":"bottom",fillStyle:this.text.fillStyle,rotation:this.isH?-90:0}}))},draw:function(a){a&&_.deepExtend(this,a),this._getLabel(),this.yGraphsHeight=this.yMaxHeight-this._getYAxisDisLine(),this._label&&(this.isH?this.yGraphsHeight-=this._label.getTextWidth():this.yGraphsHeight-=this._label.getTextHeight(),this._label.context.y=-this.yGraphsHeight-5),this.setX(this.pos.x),this.setY(this.pos.y),this._trimYAxis(),this._widget()},_trimYAxis:function(){for(var a=this.dataSection[this.dataSection.length-1],b=[],c=0,d=this.dataSection.length;d>c;c++){var e=-(this.dataSection[c]-this._bottomNumber)/(a-this._bottomNumber)*this.yGraphsHeight;e=isNaN(e)?0:parseInt(e),b[c]={content:this.dataSection[c],y:e}}this.layoutData=b;var f=-(this.baseNumber-this._bottomNumber)/(a-this._bottomNumber)*this.yGraphsHeight;f=isNaN(f)?0:parseInt(f),this.basePoint={content:this.baseNumber,y:f}},_getYAxisDisLine:function(){var a=this.disYAxisTopLine,b=2*a,c=a;return c=a+this.yMaxHeight%this.dataSection.length,c=c>b?b:c},_setDataSection:function(a){var b=[];return this.biaxial?"left"==this.place?(b=a.org[0],this.field=this.field[0]):(b=a.org[1],this.field=this.field[1]):b=_.flatten(a.org),b},_initData:function(a){var b=this._setDataSection(a);this.dataOrg=a.org,0==this.dataSection.length&&(this.dataSection=d.section(b,3)),0==this.dataSection.length&&(this.dataSection=[0]),this._bottomNumber=this.dataSection[0],1==b.length&&(this.dataSection[0]=2*b[0],this._bottomNumber=0),null==this.baseNumber&&(this.baseNumber=this._bottomNumber>0?this._bottomNumber:0)},resetWidth:function(a){var b=this;b.w=a,b.line.enabled?b.sprite.context.x=a-b.dis-b.line.width:b.sprite.context.x=a-b.dis},_widget:function(){var d=this;if(!d.enabled)return void(d.w=0);var e=this.layoutData,f=0;d._label&&d.sprite.addChild(d._label);for(var g=0,h=e.length;h>g;g++){var i=e[g],j=0,k=i.y,l=i.content;l=_.isFunction(d.text.format)?d.text.format(l,d):c.numAddSymbol(l);var m=new a.Display.Sprite({id:"yNode"+g}),n="left"==d.place?"right":"left";(90==d.text.rotation||-90==d.text.rotation)&&(n="center",g==e.length-1&&(n="right"));var o=k+(0==g?-3:0)+(g==e.length-1?3:0);(90==d.text.rotation||-90==d.text.rotation)&&(g==e.length-1&&(o=k-2),0==g&&(o=k));var p=new a.Display.Text(l,{context:{x:j+("left"==d.place?-5:5),y:o,fillStyle:d.text.fillStyle,fontSize:d.text.fontSize,rotation:-Math.abs(this.text.rotation),textAlign:n,textBaseline:"middle"}});if(m.addChild(p),f=Math.max(f,p.getTextWidth()),(90==d.text.rotation||-90==d.text.rotation)&&(f=Math.max(f,p.getTextHeight())),d.line.enabled){var q=new b({context:{x:0+("left"==d.place?1:-1)*d.dis-2,y:k,xEnd:d.line.width,yEnd:0,lineWidth:d.line.lineWidth,strokeStyle:d.line.strokeStyle}});m.addChild(q)}_.isFunction(d.filter)&&d.filter({layoutData:d.layoutData,index:g,txt:p,line:q}),d.sprite.addChild(m)}f+=d.dis,d.sprite.context.x=f,d.line.enabled?d.w=f+d.dis+d.line.width:d.w=f+d.dis}},e});