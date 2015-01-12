define("chartx/components/tips/tip",["canvax/index","canvax/shape/Rect","chartx/utils/deep-extend"],function(a,b){var c=function(a,b){this.tipDomContainer=b,this.cW=0,this.cH=0,this.dW=0,this.dH=0,this.backR=3,this.sprite=null,this.context=null,this._tipDom=null,this._back=null,this.tipsInfo={nodesInfoList:[],iGroup:0,iNode:0},this.prefix=[],this.init(a)};return c.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"TipSprite"})},show:function(a){this.hide();var b=a.target.getStage();this.cW=b.context.width,this.cH=b.context.height,this._initContext(a),this._initBack(a),this.setPosition(a),this.sprite.toFront()},move:function(a){this._setContext(a),this._resetBackSize(a),this.setPosition(a)},hide:function(){this.sprite.removeAllChildren(),this._removeContext()},setPosition:function(a){if(this._tipDom){var b=a.pos||a.target.localToGlobal(a.point),c=this._checkX(b.x),d=this._checkY(b.y),e=this.sprite.parent.globalToLocal({x:c,y:d});this.sprite.context.x=e.x,this.sprite.context.y=e.y,this._tipDom.style.cssText+=";visibility:visible;left:"+c+"px;top:"+d+"px;"}},_initContext:function(a){this._tipDom=document.createElement("div"),this._tipDom.className="chart-tips",this._tipDom.style.cssText+=";visibility:hidden;position:absolute;display:inline-block;*display:inline;*zoom:1;padding:6px;",this.tipDomContainer.appendChild(this._tipDom),this._setContext(a)},_removeContext:function(){this._tipDom&&(this.tipDomContainer.removeChild(this._tipDom),this._tipDom=null)},_setContext:function(a){this._tipDom&&(this._tipDom.innerHTML=this._getContext(a),this.dW=this._tipDom.offsetWidth,this.dH=this._tipDom.offsetHeight)},_getContext:function(a){_.deepExtend(this.tipsInfo,a.tipsInfo||{});var b=_.isFunction(this.context)?this.context(this.tipsInfo):this.context;return b||(b=this._getDefaultContext(a)),b},_getDefaultContext:function(){var a="<table>",b=this;return _.each(b.tipsInfo.nodesInfoList,function(c,d){a+="<tr style='color:"+c.fillStyle+"'>";var e=b.prefix[d];e&&(a+="<td>"+e+"</td>"),a+="<td>"+c.value+"</td></tr>"}),a+="</table>"},_initBack:function(){var a={x:0,y:0,width:this.dW,height:this.dH,lineWidth:1,strokeStyle:"#333333",fillStyle:"#ffffff",radius:[this.backR]};this._back=new b({id:"tipsBack",context:a}),this.sprite.addChild(this._back)},_resetBackSize:function(){this._back.context.width=this.dW,this._back.context.height=this.dH},_checkX:function(a){var b=this.dW+2;return 0>a&&(a=0),a+b>this.cW&&(a=this.cW-b),a},_checkY:function(a){var b=this.dH+2;return 0>a&&(a=0),a+b>this.cH&&(a=this.cH-b),a}},c});