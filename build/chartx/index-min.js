window.Chartx||(Chartx={_charts:["bar","force","line","map","pie","planet","progress","radar","scat","topo","chord","venn","hybrid"],canvax:null,create:{},_start:function(){for(var a,b="2015.07.15",c=document.getElementsByTagName("script"),d=c.length-1;d>=0;d--){var e=c[d].getAttribute("src");if(e.indexOf("chartx/index")>=0){a=e.substr(0,e.indexOf("chartx/"));break}}Chartx.path=a.replace(/(^\s*)|(\s*$)/g,""),/daily.taobao.net/g.test(a)&&(Chartx._site.daily=!0,Chartx._site.debug=!0);var f="http://g.tbcdn.cn/thx/canvax/"+b+"/";(Chartx._site.daily||Chartx._site.local)&&(f="http://g.assets.daily.taobao.net/thx/canvax/"+b+"/"),Chartx._setPackages([{name:"canvax",path:f},{name:"chartx",path:Chartx.path}]);for(var g=0,h=Chartx._charts.length;h>g;g++)Chartx[Chartx._charts[g]]=Chartx.create[Chartx._charts[g]]=function(a){return function(b,c,d){return Chartx._queryChart(a,b,c,d)}}(Chartx._charts[g]);Chartx._start=null,delete Chartx._start},_queryChart:function(a,b,c,d){var e={_thenFn:[],then:function(a){return this.chart?(_.isFunction(a)&&a(this.chart),this):(this._thenFn.push(a),this)},_destroy:!1,chart:null,destroy:function(){this._destroy=!0,this.chart&&(this.chart.destroy(),delete this.chart,e=null)},path:null},f="chartx/chart/"+a+"/"+(d.type?d.type:"index"),g=function(){require([f],function(a){e._destroy||(e.chart=new a(b,c,d),e.chart.draw(),_.each(e._thenFn,function(a){_.isFunction(a)&&a(e.chart)}),e._thenFn=[],e.path=f)})};return this.canvax?g():require(["canvax/index"],function(a){this.canvax=a,g()}),e},_site:{local:!!~location.search.indexOf("local"),daily:!!~location.search.indexOf("daily"),debug:!!~location.search.indexOf("debug"),build:!!~location.search.indexOf("build")},_setPackages:function(a){function b(b){if(a.length>0)for(var c=0,d=a.length;d>c;c++)if(0==b.indexOf(a[c].name))return!0}function c(a){return-1!=a.constructor.toString().indexOf("Array")}if(a=a||[],window.define||KISSY&&(window.define=function(a,b,c){function d(){var a=[].slice.call(arguments,1,arguments.length);return c.apply(window,a)}switch(arguments.length){case 2:c=b,b=a,KISSY.add(d,{requires:b});break;case 3:KISSY.add(a,d,{requires:b})}},window.define.kmd={},window.require||(window.require=function(a,b){function d(){var a=[].slice.call(arguments,1,arguments.length);return b.apply(window,a)}KISSY.use(c(a)?a.join(","):a,d)})),"function"==typeof define&&define.cmd){var d=define;window.define=function(a,c,e){return"string"==typeof a&&b(a)?d(a,c,function(a,b,d){for(var f=[],g=0,h=c.length;h>g;g++)f.push(a(c[g]));d.exports=e.apply(window,f)}):d.apply(window,arguments)},window.require||(window.require=seajs.use)}"function"==typeof define&&define.amd;for(var e=0,f=a.length;f>e;e++){var g=a[e].name.toString(),h=a[e].path;window.KISSY&&KISSY.config({packages:[{name:g,path:h,debug:Chartx._site.debug,combine:!Chartx._site.local}]});var i={};i[g]=h,window.seajs&&(i[g]=h+g,seajs.config({paths:i})),window.requirejs&&(i[g]=h+g,requirejs.config({paths:i}))}}}),Chartx._start&&Chartx._start(),define("chartx/chart/index",["canvax/index","canvax/core/Base"],function(a,b){var c=function(c,d,e){_&&!_.deepExtend&&b.setDeepExtend(),this.el=b.getEl(c),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax=new a({el:this.el}),this.stage=new a.Display.Stage({id:"main-chart-stage"+(new Date).getTime()}),this.canvax.addChild(this.stage),arguments.callee.superclass.constructor.apply(this,arguments),this.init.apply(this,arguments)};return c.Canvax=a,c.extend=function(a,c,d){var e=this,f=function(){e.apply(this,arguments),d&&d.apply(this,arguments)};return f.extend=e.extend,b.creatClass(f,e,a,c)},Chartx.extend=b.creatClass,b.creatClass(c,a.Event.EventDispatcher,{init:function(){},dataFrame:null,drawed:!1,draw:function(){},destroy:function(){this.clean(),this.el.innerHTML=""},clean:function(){_.each(this.canvax.children,function(a,b){a.removeAllChildren()})},resize:function(){this.clean(),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax.resize(),this.draw()},reset:function(a){a&&a.options&&(_.deepExtend(this,a.options),this.dataFrame&&(this.dataFrame=this._initData(this.dataFrame.org))),a&&a.data&&(this.dataFrame=this._initData(a.data)),this.clean(),this.draw()},_rotate:function(a){var b=this.width,c=this.height;this.width=c,this.height=b;var d=this;_.each(d.stage.children,function(e){e.context.rotation=a||-90,e.context.x=(b-c)/2,e.context.y=(c-b)/2,e.context.rotateOrigin.x=d.width*e.context.$model.scaleX/2,e.context.rotateOrigin.y=d.height*e.context.$model.scaleY/2})},_initData:function(a){return a}}),c}),define("chartx/components/anchor/Anchor",["canvax/index","canvax/shape/Line","canvax/shape/Circle"],function(a,b,c){var d=function(a){this.w=0,this.h=0,this.enabled=0,this.xAxis={lineWidth:1,fillStyle:"#cc3300"},this.yAxis={lineWidth:1,fillStyle:"#cc3300"},this.node={enabled:1,r:2,fillStyle:"#cc3300",strokeStyle:"#cc3300",lineWidth:4},this.pos={x:0,y:0},this.cross={x:0,y:0},this.sprite=null,this.init(a)};return d.prototype={init:function(b){b&&_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"AnchorSprite"})},draw:function(a){this._initConfig(a),this.sprite.context.x=this.pos.x,this.sprite.context.y=this.pos.y,this.enabled&&this._widget()},_initConfig:function(a){a&&_.deepExtend(this,a)},_widget:function(){var a=this,d=new b({id:"x",context:{xStart:0,yStart:a.cross.y,xEnd:a.w,yEnd:a.cross.y,lineWidth:a.xAxis.lineWidth,strokeStyle:a.xAxis.fillStyle}});this.sprite.addChild(d);var e=new b({id:"y",context:{xStart:a.cross.x,yStart:0,xEnd:a.cross.x,yEnd:a.h,lineWidth:a.yAxis.lineWidth,strokeStyle:a.yAxis.fillStyle}});this.sprite.addChild(e);var f=this.sprite.localToGlobal({x:this.cross.x,y:this.cross.y}),g=new c({context:{x:parseInt(f.x),y:parseInt(f.y),r:a._getProp(a.node.r),fillStyle:a._getProp(a.node.fillStyle)||"#ff0000",strokeStyle:a._getProp(a.node.strokeStyle)||"#cc3300",lineWidth:a._getProp(a.node.lineWidth)||4}});this.sprite.getStage().addChild(g)},_getProp:function(a){return _.isFunction(a)?a():a}},d}),define("chartx/components/back/Back",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a){this.w=0,this.h=0,this.pos={x:0,y:0},this.enabled=1,this.xOrigin={enabled:1,thinkness:1,strokeStyle:"#e5e5e5"},this.yOrigin={enabled:1,thinkness:1,strokeStyle:"#e5e5e5",biaxial:!1},this.xAxis={enabled:1,data:[],lineType:"solid",thinkness:1,strokeStyle:"#f5f5f5",filter:null},this.yAxis={enabled:0,data:[],lineType:"solid",thinkness:1,strokeStyle:"#f5f5f5",filter:null},this.sprite=null,this.xAxisSp=null,this.yAxisSp=null,this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){_.deepExtend(this,a),this._widget(),this.setX(this.pos.x),this.setY(this.pos.y)},update:function(a){this.sprite.removeAllChildren(),this.draw(a)},_widget:function(){var c=this;if(this.enabled){c.xAxisSp=new a.Display.Sprite,c.sprite.addChild(c.xAxisSp),c.yAxisSp=new a.Display.Sprite,c.sprite.addChild(c.yAxisSp);for(var d=c.xAxis.data,e=1,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:0,yStart:g.y,xEnd:c.w,yEnd:g.y,lineType:c.xAxis.lineType,lineWidth:c.xAxis.thinkness,strokeStyle:c.xAxis.strokeStyle}});c.xAxis.enabled&&(_.isFunction(c.xAxis.filter)&&c.xAxis.filter({layoutData:c.yAxis.data,index:e,line:h}),c.xAxisSp.addChild(h))}for(var d=c.yAxis.data,e=0,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:g.x,yStart:0,xEnd:g.x,yEnd:-c.h,lineType:c.yAxis.lineType,lineWidth:c.yAxis.thinkness,strokeStyle:c.yAxis.strokeStyle,visible:g.x?!0:!1}});c.yAxis.enabled&&(_.isFunction(c.yAxis.filter)&&c.yAxis.filter({layoutData:c.xAxis.data,index:e,line:h}),c.yAxisSp.addChild(h))}var h=new b({context:{xEnd:0,yEnd:-c.h,lineWidth:c.yOrigin.thinkness,strokeStyle:c.yOrigin.strokeStyle}});if(c.yOrigin.enabled&&c.sprite.addChild(h),c.yOrigin.biaxial){var i=new b({context:{xStart:c.w,xEnd:c.w,yEnd:-c.h,lineWidth:c.yOrigin.thinkness,strokeStyle:c.yOrigin.strokeStyle}});c.yOrigin.enabled&&c.sprite.addChild(i)}var h=new b({context:{xEnd:c.w,yEnd:0,lineWidth:c.xOrigin.thinkness,strokeStyle:c.xOrigin.strokeStyle}});c.xOrigin.enabled&&c.sprite.addChild(h)}}},d}),define("chartx/components/planet/Graphs",["canvax/index","canvax/shape/Rect","chartx/utils/tools","canvax/animation/Tween","chartx/components/planet/InfoCircle"],function(a,b,c,d,e){var f=function(a,b){this.root=b,this.data=[],this.sprite=null,this.event={enabled:1},this.init(a)};return f.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},getX:function(){return this.sprite.context.x},getY:function(){return this.sprite.context.y},draw:function(a){var b=this;_.deepExtend(this,a),b._widget()},_widget:function(){for(var b=this,c=0,d=b.data.length;d>c;c++){var f=new a.Display.Sprite;if(b.data[0].length>0)for(var g=0,h=b.data[c].length;h>g;g++){var i=b.data[c][g];i.event=i.event&&0==i.event.enabled||b.event;var j=i.x,k=i.y;i.x=0,i.y=0;var l=new e(i,b.root,{ringID:c,ID:g+1,x:j,y:k});l.setX(j),l.setY(k),0!=i.enabled&&f.addChild(l.sprite)}else{var i=b.data[c];i.event=b.event;var j=i.x,k=i.y;if(i.x=0,i.y=0,0!=i.enabled){var l=new e(i,b.root,{ringID:c,x:j,y:k});l.setX(j),l.setY(k),f.addChild(l.sprite)}}b.sprite.addChild(f)}}},f}),define("chartx/components/planet/InfoCircle",["canvax/index","canvax/shape/Circle","canvax/shape/Rect"],function(a,b,c){var d=function(a,b,c){this.root=b,this.fire=c,this.x=0,this.y=0,this.r={normal:30,over:3},this.fillStyle={normal:"#ff0000",over:"#ff0000"},this.strokeStyle={normal:"#000000",over:"#000000"},this.lineWidth={normal:0,over:0},this.globalAlpha={normal:1,over:1},this.text={content:"",place:"right",fillStyle:{normal:"#000000",over:"#000000"},fontSize:{normal:12,over:12}},this.event={enabled:0},this.sprite=null,this.circle=null,this.init(a)};return d.prototype={init:function(d){_.deepExtend(this,d);var e=this;e.sprite=new a.Display.Sprite;var f=new b({id:"circle",context:{x:e.x||0,y:e.y||0,r:e.r.normal||30,fillStyle:e.fillStyle.normal,strokeStyle:e.strokeStyle.normal||"000000",lineWidth:e.lineWidth.normal||0,globalAlpha:e.globalAlpha.normal,cursor:e.event.enabled?"pointer":""}});e.circle=f,e.sprite.addChild(f);var g=new a.Display.Text(e.text.content,{context:{fillStyle:e.text.fillStyle.normal,fontSize:e.text.fontSize.normal}});e.sprite.addChild(g);var h=e.r.normal+2,i=e.y-parseInt(g.getTextHeight()/2);if("center"==e.text.place&&(h=e.x-parseInt(g.getTextWidth()/2)),g.context.x=h,g.context.y=i,e.text.content){var j=new c({context:{x:h-2,y:i,width:g.getTextWidth()+2,height:g.getTextHeight(),fillStyle:"#000000",globalAlpha:0,cursor:e.event.enabled?"pointer":""}});e.sprite.addChild(j)}1==e.event.enabled&&(e._event(f),j&&e._event(j))},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},_event:function(a){var b=this;a.on("mouseover",function(a){b._mouseoverHandler(a)}),a.on("mouseout",function(a){b._mouseoutHandler(a)}),a.on("click",function(a){b._clickHandler(a)})},_mouseoverHandler:function(a){var b=this;b.sprite.parent.toFront(),b.fire.eventType="mouseover",b.root.event.onClick(b.fire),b._induce(!0)},_mouseoutHandler:function(a){var b=this;b.fire.eventType="mouseout",b.root.event.onClick(b.fire),b._induce(!1)},_clickHandler:function(a){var b=this;b.fire.eventType="click",b.root.event.onClick(b.fire)},_induce:function(a){var b=this,c=1.1;b.r.normal<=5&&(c=1.3);var d=a?c:1;b.circle.context.scaleX=b.circle.context.scaleY=d}},d}),define("chartx/components/tips/tip",["canvax/index","canvax/shape/Rect","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.enabled=!0,this.tipDomContainer=b,this.cW=0,this.cH=0,this.dW=0,this.dH=0,this.backR=5,this.sprite=null,this.content=null,this.fillStyle="#000000",this.text={fillStyle:"#ffffff"},this.strokeStyle=null,this.lineWidth=1,this.alpha=.5,this._tipDom=null,this._back=null,this.offset=10,this.tipsInfo={},this.prefix=[],this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"TipSprite"})},show:function(a){this.hide();var b=a.target.getStage();this.cW=b.context.width,this.cH=b.context.height,this._initContent(a),this._initBack(a),this.setPosition(a),this.sprite.toFront()},move:function(a){this._setContent(a),this._resetBackSize(a),this.setPosition(a)},hide:function(){this.sprite.removeAllChildren(),this._removeContent()},setPosition:function(a){if(this._tipDom){var b=a.pos||a.target.localToGlobal(a.point),c=this._checkX(b.x+this.offset),d=this._checkY(b.y+this.offset),e=this.sprite.parent.globalToLocal({x:c,y:d});this.sprite.context.x=e.x,this.sprite.context.y=e.y,this._tipDom.style.cssText+=";visibility:visible;left:"+c+"px;top:"+d+"px;"}},_initContent:function(a){this._tipDom=document.createElement("div"),this._tipDom.className="chart-tips",this._tipDom.style.cssText+=";visibility:hidden;position:absolute;display:inline-block;*display:inline;*zoom:1;padding:6px;color:white;line-height:1.5",this.tipDomContainer.appendChild(this._tipDom),this._setContent(a)},_removeContent:function(){this._tipDom&&(this.tipDomContainer.removeChild(this._tipDom),this._tipDom=null)},_setContent:function(a){this._tipDom&&(this._tipDom.innerHTML=this._getContent(a),this.dW=this._tipDom.offsetWidth,this.dH=this._tipDom.offsetHeight)},_getContent:function(a){_.deepExtend(this.tipsInfo,a.tipsInfo||{});var b=_.isFunction(this.content)?this.content(this.tipsInfo):this.content;return b||(b=this._getDefaultContent(this.tipsInfo)),b},_getDefaultContent:function(a){var b="<table>",d=this;return _.each(a.nodesInfoList,function(a,e){b+="<tr style='color:"+d.text.fillStyle+"'>";var f=d.prefix[e];f?b+="<td>"+f+"：</td>":a.field&&(b+="<td>"+a.field+"：</td>"),b+="<td>"+c.numAddSymbol(a.value)+"</td></tr>"}),b+="</table>"},_initBack:function(a){var c={x:0,y:0,width:this.dW,height:this.dH,lineWidth:this.lineWidth,fillStyle:this.fillStyle,radius:[this.backR],globalAlpha:this.alpha};this.strokeStyle&&(c.strokeStyle=this.strokeStyle),this._back=new b({id:"tipsBack",context:c}),this.sprite.addChild(this._back)},_resetBackSize:function(a){this._back.context.width=this.dW,this._back.context.height=this.dH},_checkX:function(a){var b=this.dW+2;return 0>a&&(a=0),a+b>this.cW&&(a=this.cW-b),a},_checkY:function(a){var b=this.dH+2;return 0>a&&(a=0),a+b>this.cH&&(a=this.cH-b),a}},d}),define("chartx/components/xaxis/xAxis",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.graphw=0,this.graphh=0,this.yAxisW=0,this.w=0,this.h=0,this.disY=1,this.dis=6,this.line={enabled:1,width:1,height:4,strokeStyle:"#cccccc"},this.text={fillStyle:"#999999",fontSize:12,rotation:0,format:null,textAlign:null},this.maxTxtH=0,this.pos={x:null,y:null},this.enabled=1,this.disXAxisLine=6,this.disOriginX=0,this.xGraphsWidth=0,this.dataOrg=[],this.dataSection=[],this.data=[],this.layoutData=[],this.sprite=null,this._textMaxWidth=0,this.leftDisX=0,this.filter=null,this.init(a,b)};return d.prototype={init:function(b,c){this.dataOrg=c.org,b&&_.deepExtend(this,b),0==this.dataSection.length&&(this.dataSection=this._initDataSection(this.dataOrg)),this.line.enabled||(this.line.height=1),this.sprite=new a.Display.Sprite({id:"xAxisSprite"}),this._getTextMaxWidth(),this._checkText()},_initDataSection:function(a){return _.flatten(a)},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){this._initConfig(a),this.data=this._trimXAxis(this.dataSection,this.xGraphsWidth),this._trimLayoutData(),this.setX(this.pos.x),this.setY(this.pos.y),this.enabled&&(this._widget(),this.text.rotation||this._layout())},_initConfig:function(a){a&&_.deepExtend(this,a),this.yAxisW=Math.max(this.yAxisW,this.leftDisX),this.w=this.graphw-this.yAxisW,null==this.pos.x&&(this.pos.x=this.yAxisW+this.disOriginX),null==this.pos.y&&(this.pos.y=this.graphh-this.h),this.xGraphsWidth=this.w-this._getXAxisDisLine(),this.disOriginX=parseInt((this.w-this.xGraphsWidth)/2)},_trimXAxis:function(a,b){for(var c=[],d=b/(a.length+1),e=0,f=a.length;f>e;e++){var g={content:a[e],x:parseInt(d*(e+1))};c.push(g)}return c},_getXAxisDisLine:function(){var a=this.disXAxisLine,b=2*a,c=a;return c=a+this.w%this.dataOrg.length,c=c>b?b:c,c=isNaN(c)?0:c},_checkText:function(){if(this.enabled){var b=new a.Display.Text(this.dataSection[0]||"test",{context:{fontSize:this.text.fontSize}});if(this.maxTxtH=b.getTextHeight(),this.text.rotation)if(this.text.rotation%90==0)this.h=this._textMaxWidth+this.line.height+this.disY+this.dis+3;else{var c=Math.sin(Math.abs(this.text.rotation)*Math.PI/180),d=Math.cos(Math.abs(this.text.rotation)*Math.PI/180);this.h=c*this._textMaxWidth+b.getTextHeight()+5,this.leftDisX=d*b.getTextWidth()+8}else this.h=this.disY+this.line.height+this.dis+this.maxTxtH,this.leftDisX=b.getTextWidth()/2}else this.dis=0,this.h=3},_getFormatText:function(a){return _.isFunction(this.text.format)?this.text.format(a):a},_widget:function(){for(var d=this.layoutData,e=0,f=d.length;f>e;e++){var g=new a.Display.Sprite({id:"xNode"+e}),h=d[e],i=h.x,j=this.disY+this.line.height+this.dis,k=h.content;k=_.isFunction(this.text.format)?this.text.format(k):c.numAddSymbol(k);var l=new a.Display.Text(k,{context:{x:i,y:j,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,rotation:-Math.abs(this.text.rotation),textAlign:this.text.textAlign||(this.text.rotation?"right":"center"),textBaseline:this.text.rotation?"middle":"top"}});if(g.addChild(l),this.text.rotation&&(l.context.x+=5,l.context.y+=3),this.line.enabled){var m=new b({context:{xStart:i,yStart:this.disY,xEnd:i,yEnd:this.line.height+this.disY,lineWidth:this.line.width,strokeStyle:this.line.strokeStyle}});g.addChild(m)}_.isFunction(this.filter)&&this.filter({layoutData:d,index:e,txt:l,line:m||null}),this.sprite.addChild(g)}},_layout:function(){if(0!=this.sprite.getNumChildren()){var a=this.sprite.getChildAt(this.sprite.getNumChildren()-1).getChildAt(0);if(a){var b=a.context;if("center"==b.textAlign&&b.x+a.context.width/2>this.w&&(b.x=this.w-a.context.width/2),"left"==b.textAlign&&b.x+a.context.width>this.w&&(b.x=this.w-a.context.width),this.sprite.getNumChildren()>=2){var c=this.sprite.getChildAt(this.sprite.getNumChildren()-2).getChildAt(0),d=c.context;d.visible&&b.x<d.x+d.width&&(b.visible=!1)}}}},_getTextMaxWidth:function(){for(var b=this.dataSection,c=b[0],d=0,e=b.length;e>d;d++)b[d].length>c.length&&(c=b[d]);var f=new a.Display.Text(c||"test",{context:{fillStyle:this.text.fillStyle,fontSize:this.text.fontSize}});return this._textMaxWidth=f.getTextWidth(),this._textMaxHeight=f.getTextHeight(),this._textMaxWidth},_trimLayoutData:function(){var a=[],b=this.data,c=this._textMaxWidth+10;this.text.rotation&&(c=1.5*this._textMaxHeight);var d=Math.min(Math.floor(this.w/c),b.length-1);if(d>=b.length-1)this.layoutData=b;else{for(var e=Math.max(Math.ceil(b.length/d-1),0),f=0;d>f;f++){var g=b[f+e*f];g&&a.push(g)}this.layoutData=a}}},d}),define("chartx/components/xaxis/xAxis_h",["canvax/index","canvax/shape/Line","chartx/utils/tools","chartx/utils/datasection"],function(a,b,c,d){var e=function(a,b){this.graphw=0,this.graphh=0,this.yAxisW=0,this.w=0,this.h=0,this.disY=0,this.dis=6,this.line={enabled:1,width:1,height:4,strokeStyle:"#cccccc"},this.text={dis:0,fillStyle:"#999999",fontSize:13,rotation:0},this.maxTxtH=0,this.pos={x:null,y:null},this.enabled=1,this.disXAxisLine=6,this.disOriginX=0,this.xGraphsWidth=0,this.dataOrg=[],this.dataSection=[],this.data=[],this.layoutData=[],this.sprite=null,this._textMaxWidth=0,this.leftDisX=0,this.textFormat=null,this.init(a,b)};return e.prototype={init:function(b,c){_.deepExtend(this,b),this._initData(c),this.text.rotation=-Math.abs(this.text.rotation),this.sprite=new a.Display.Sprite({id:"xAxisSprite"}),this._getTextMaxWidth(),this._checkText()},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){this._initConfig(a),this._trimXAxis(),this._trimLayoutData(),this.setX(this.pos.x),this.setY(this.pos.y),this.enabled&&(this._widget(),this.text.rotation||this._layout())},_initConfig:function(a){a&&_.deepExtend(this,a),this.yAxisW=Math.max(this.yAxisW,this.leftDisX),this.w=this.graphw-this.yAxisW,null==this.pos.x&&(this.pos.x=this.yAxisW+this.disOriginX),null==this.pos.y&&(this.pos.y=this.graphh-this.h),this.xGraphsWidth=this.w-this._getXAxisDisLine(),this.disOriginX=parseInt((this.w-this.xGraphsWidth)/2)},_trimXAxis:function(){for(var a=this.dataSection,b=[],c=this.dataSection[this.dataSection.length-1],d=0,e=a.length;e>d;d++){var f=a[d]/c*this.xGraphsWidth;f=isNaN(f)?0:parseInt(f),b[d]={content:this.dataSection[d],x:f}}this.data=b},_getXAxisDisLine:function(){var a=this.disXAxisLine,b=2*a,c=a;return c=a+this.w%this.dataSection.length,c=c>b?b:c,c=isNaN(c)?0:c},_initData:function(a){var b=_.flatten(a.org);this.dataOrg=a.org,this.dataSection=d.section(b,3)},_checkText:function(){if(this.enabled){var b=new a.Display.Text(this.dataSection[0],{context:{fontSize:this.text.fontSize}});this.maxTxtH=b.getTextHeight(),this.text.rotation?(this.h=Math.cos(Math.abs(this.text.rotation)*Math.PI/180)*this._textMaxWidth,this.leftDisX=Math.cos(Math.abs(this.text.rotation)*Math.PI/180)*b.getTextWidth()+8):(this.h=this.disY+this.line.height+this.dis+this.maxTxtH,this.leftDisX=b.getTextWidth()/2)}else this.h=this.dis},_widget:function(){for(var d=this.layoutData,e=0,f=d.length;f>e;e++){var g=new a.Display.Sprite({id:"xNode"+e}),h=d[e],i=h.x,j=this.disY+this.line.height+this.dis,k=c.numAddSymbol(h.content),l=new a.Display.Text(k,{context:{x:i,y:j,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,rotation:this.text.rotation,textAlign:this.text.rotation?"right":"left",textBaseline:this.text.rotation?"middle":"top"}});g.addChild(l),this.text.rotation?(l.context.x+=5,l.context.y+=3):l.context.x=parseInt(l.context.x-l.getTextWidth()/2);var m=new b({context:{xStart:i,yStart:this.disY,xEnd:i,yEnd:this.line.height+this.disY,lineWidth:this.line.width,strokeStyle:this.line.strokeStyle}});g.addChild(m),_.isFunction(this.filter)&&this.filter({layoutData:d,index:e,txt:l,line:m}),this.sprite.addChild(g)}},_layout:function(){var a=this.sprite.getChildAt(this.sprite.getNumChildren()-1).getChildAt(0);a&&Number(a.context.x+Number(a.getTextWidth()))>this.w&&(a.context.x=parseInt(this.w-a.getTextWidth()))},_getTextMaxWidth:function(){for(var b=this.dataSection,c=b[0],d=0,e=b.length;e>d;d++)b[d].length>c.length&&(c=b[d]);var f=new a.Display.Text(c,{context:{fillStyle:this.text.fillStyle,fontSize:this.text.fontSize}});return this._textMaxWidth=f.getTextWidth(),this._textMaxWidth},_trimLayoutData:function(){if(this.text.rotation)return void(this.layoutData=this.data);var a=[],b=this.data,c=Math.min(Math.floor(this.w/this._textMaxWidth),b.length),d=Math.max(Math.ceil(b.length/c-1),0);this.text.dis&&(d=this.text.dis);for(var e=0;c>e;e++){var f=b[e+d*e];f&&a.push(f)}this.layoutData=a}},e}),define("chartx/components/yaxis/yAxis",["canvax/index","canvax/shape/Line","chartx/utils/tools","chartx/utils/datasection"],function(a,b,c,d){var e=function(a,b){this.w=0,this.enabled=1,this.dis=6,this.line={enabled:1,width:6,lineWidth:3,strokeStyle:"#BEBEBE"},this.text={fillStyle:"#999999",fontSize:12,format:null},this.pos={x:0,y:0},this.place="left",this.biaxial=!1,this.layoutData=[],this.dataSection=[],this.dataOrg=[],this.sprite=null,this.x=0,this.y=0,this.disYAxisTopLine=6,this.yMaxHeight=0,this.yGraphsHeight=0,this.baseNumber=null,this.basePoint=null,this.filter=null,this.init(a,b)};return e.prototype={init:function(b,c){_.deepExtend(this,b),this._initData(c),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},setAllStyle:function(a){_.each(this.sprite.children,function(b){_.each(b.children,function(b){"text"==b.type?b.context.fillStyle=a:"line"==b.type&&(b.context.strokeStyle=a)})})},update:function(a,b){this.sprite.removeAllChildren(),this.dataSection=[],_.deepExtend(this,a),this._initData(b),this.draw()},draw:function(a){a&&_.deepExtend(this,a),this.yGraphsHeight=this.yMaxHeight-this._getYAxisDisLine(),this.setX(this.pos.x),this.setY(this.pos.y),this._trimYAxis(),this._widget()},_trimYAxis:function(){for(var a=this.dataSection[this.dataSection.length-1],b=[],c=0,d=this.dataSection.length;d>c;c++){var e=-(this.dataSection[c]-this._bottomNumber)/(a-this._bottomNumber)*this.yGraphsHeight;e=isNaN(e)?0:parseInt(e),b[c]={content:this.dataSection[c],y:e}}this.layoutData=b;var f=-(this.baseNumber-this._bottomNumber)/(a-this._bottomNumber)*this.yGraphsHeight;f=isNaN(f)?0:parseInt(f),this.basePoint={content:this.baseNumber,y:f}},_getYAxisDisLine:function(){var a=this.disYAxisTopLine,b=2*a,c=a;return c=a+this.yMaxHeight%this.dataSection.length,c=c>b?b:c},_setDataSection:function(a){var b=[];return b=this.biaxial?"left"==this.place?a.org[0]:a.org[1]:_.flatten(a.org)},_initData:function(a){var b=this._setDataSection(a);this.dataOrg=a.org,0==this.dataSection.length&&(this.dataSection=d.section(b,3)),0==this.dataSection.length&&(this.dataSection=[0]),this._bottomNumber=this.dataSection[0],1==b.length&&(this.dataSection[0]=2*b[0],this._bottomNumber=0),null==this.baseNumber&&(this.baseNumber=this._bottomNumber>0?this._bottomNumber:0)},resetWidth:function(a){var b=this;b.w=a,b.line.enabled?b.sprite.context.x=a-b.dis-b.line.width:b.sprite.context.x=a-b.dis},_widget:function(){var d=this;if(!d.enabled)return void(d.w=0);for(var e=this.layoutData,f=0,g=0,h=e.length;h>g;g++){var i=e[g],j=0,k=i.y,l=i.content;l=_.isFunction(d.text.format)?d.text.format(l):c.numAddSymbol(l);var m=new a.Display.Sprite({id:"yNode"+g}),n=new a.Display.Text(l,{context:{x:j+("left"==d.place?0:5),y:k+(0==g?-3:0)+(g==e.length-1?3:0),fillStyle:d.text.fillStyle,fontSize:d.text.fontSize,textAlign:"left"==d.place?"right":"left",textBaseline:"middle"}});if(m.addChild(n),f=Math.max(f,n.getTextWidth()),d.line.enabled){var o=new b({context:{x:0+("left"==d.place?1:-1)*d.dis,y:k,xEnd:d.line.width,yEnd:0,lineWidth:d.line.lineWidth,strokeStyle:d.line.strokeStyle}});m.addChild(o)}_.isFunction(d.filter)&&d.filter({layoutData:d.layoutData,index:g,txt:n,line:o}),d.sprite.addChild(m)}f+=d.dis,d.sprite.context.x=f,d.line.enabled?d.w=f+d.dis+d.line.width:d.w=f+d.dis}},e}),define("chartx/components/yaxis/yAxis_h",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.w=0,this.enabled=1,this.dis=6,this.line={enabled:1,width:6,height:3,strokeStyle:"#BEBEBE"},this.text={fillStyle:"#999999",fontSize:12},this.data=[],this.dataOrg=[],this.sprite=null,this.txtSp=null,this.lineSp=null,this.x=0,this.y=0,this.disYAxisTopLine=6,this.yMaxHeight=0,this.yGraphsHeight=0,this.yDis1=0,this.textFormat=null,this.init(a,b)};return d.prototype={init:function(b,c){_.deepExtend(this,b),this._initData(c),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},update:function(a,b){this.sprite.removeAllChildren(),_.deepExtend(this,a),this._initData(b),this.draw()},draw:function(a){a&&_.deepExtend(this,a),this.yGraphsHeight=this.yMaxHeight-this._getYAxisDisLine(),this.yDis1=this.yGraphsHeight/this.dataOrg.length,this.setX(this.pos.x),this.setY(this.pos.y),this._trimYAxis(),this._widget()},_trimYAxis:function(){for(var a=this.dataOrg,b=[],c=0,d=a.length;d>c;c++){var e=-(c+1)*this.yDis1+this.yDis1/2;e=isNaN(e)?0:parseInt(e),b[c]={content:this.dataOrg[c],y:e}}this.data=b},_getYAxisDisLine:function(){var a=this.disYAxisTopLine,b=2*a,c=a;return c=a+this.yMaxHeight%this.dataOrg.length,c=c>b?b:c},_initData:function(a){this.dataOrg=a.org[0]},_widget:function(){var d=this;if(!d.enabled)return void(d.w=0);d.txtSp=new a.Display.Sprite,d.sprite.addChild(d.txtSp),d.lineSp=new a.Display.Sprite,d.sprite.addChild(d.lineSp);for(var e=this.data,f=0,g=0,h=e.length;h>g;g++){var i=e[g],j=0,k=i.y,l=c.numAddSymbol(i.content);_.isFunction(d.textFormat)&&(l=d.textFormat(l));var m=new a.Display.Text(l,{context:{x:j,y:k,fillStyle:d.text.fillStyle,fontSize:d.text.fontSize,textAlign:"right",textBaseline:"middle"}});d.txtSp.addChild(m),f=Math.max(f,m.getTextWidth());var n=new b({id:g,context:{x:0,y:k,xEnd:d.line.width,yEnd:0,lineWidth:d.line.height,strokeStyle:d.line.strokeStyle}});d.lineSp.addChild(n)}d.txtSp.context.x=f,d.lineSp.context.x=f+d.dis,d.line.enabled?d.w=f+d.dis+d.line.width:(d.lineSp.context.visible=!1,d.w=f+d.dis)}},d});