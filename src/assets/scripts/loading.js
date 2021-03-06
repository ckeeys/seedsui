//Loading
(function(window,document,undefined){
	
	window.Loading=function(params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
			container:null,

			containerClass:["mask","loading-mask"],

			html:'<div class="loading-spinning">'+
		            '<div class="loading-spinning-wrapper"></div>'+
		        '</div>',

		    isClickAllow:false,
			clickAllowClass:"loading-clickallow",

			activeClass:"active"
			/*
            Callbacks:
            onClick:function(Loading)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		s.container;
		//Container
		s.createContainer=function(){
			var container=document.createElement("div");
            container.classList.add.apply(container.classList,s.params.containerClass);
            container.innerHTML=s.params.html;
            if(s.params.isClickAllow)container.classList.add(s.params.clickAllowClass);
            return container;
		}
		s.create=function(){
			if(s.params.container){
				s.container=typeof s.params.container=="string"?document.querySelector(s.params.container):s.params.container;
				if(s.container)return;
			}
			console.log("SeedsUI Error：未找到Loading的DOM对象，请检查传入参数是否正确");
			s.container=s.createContainer();
			s.parent.appendChild(s.container);
		}
		s.create();
		/*================
		Method
		================*/
		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
        	s.container.classList.remove(s.params.activeClass);
		};
		s.show=function(){
			s.isHid=false;
            s.container.classList.add(s.params.activeClass);
		};
		s.destroy=function(){
			//移动事件监听
			s.detach();
			//移除遮罩
			s.parent.removeChild(s.container);
		};
		//动态设置
		s.setOnClick=function(fn){
        	s.params.onClick=fn;
        }
		/*================
		Control
		================*/
        s.events=function(detach){
            var touchTarget=s.container;
            var action=detach?"removeEventListener":"addEventListener";
            touchTarget[action]("click",s.onClick,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
		s.onClick=function(e){
			s.target=e.target;
			if(s.params.onClick)s.params.onClick(s);
		}
		/*================
		Init
		================*/
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);