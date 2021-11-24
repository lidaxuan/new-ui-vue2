class HomeColorSetting {
    // 十六进制转rgba
    colorRgb(str,opacity){
        if(str){
            var sColor = str.toLowerCase();
            if(sColor){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var j=1; j<7; j+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(j,j+2)));
                }
                return "rgba(" + sColorChange.join(",")+","+opacity + ")";
            }else{
                return sColor;
            }
        }

    }
    // 全局设置
    serRootStyle(root, val, style) {
        let roots = document.querySelector(":" + root);
        return roots.style.setProperty(val, style);
    }
    setHomeThemeLayoutLeftInit(v){
        // Left
        this.serRootStyle('root','--homeSideMenuBg',"#ffffff");
        this.serRootStyle('root','--homeSideMenuSelected',v);
        this.serRootStyle('root','--homeSideMenuCollapseSelected',v);
        this.serRootStyle('root','--homeSideMenuColorFFF',"#ffffff");
        this.serRootStyle('root','--homeSideMenuColorF9F8FD','#F9F8FD');
        this.serRootStyle('root','--homeSideMenuColorF9F8FD-rgba',this.colorRgb("#F9F8FD",0.1));
        this.serRootStyle('root','--homeSideMenuColorIconfont',this.colorRgb("#F9F8FD",0.1));
        this.serRootStyle('root','--homeSideMenuColorArrow',"#7E84A3");
        this.serRootStyle('root','--homeSideMenuColor344563',"#344563");
        this.serRootStyle('root','--homeSideMenuColor7E84A3',"#7E84A3");
        this.serRootStyle('root','--homeRgba',this.colorRgb(v,0.1));
        this.serRootStyle('root','--homeBrNone','none');
        this.serRootStyle('root','--homeBgMoreBtnCol',"#ffffff");
    }
    setHomeThemeLayoutTopInit(v){
        // top
        this.serRootStyle('root','--homeBeacon',v);
        this.serRootStyle('root','--homeBeaconCol',"#2c3e50");
        this.serRootStyle('root','--homeTopMenuCol',"#7E84A3");
        this.serRootStyle('root','--homeBeaconBg',"#ffffff");
        this.serRootStyle('root','--homeBeaconBr',"rgba(21, 34, 50, 0.08)");
        this.serRootStyle('root','--homeTopMenuBg',"#ffffff");
        this.serRootStyle('root','--homeTopMenuIsActive',v);
        this.serRootStyle('root','--homeTopMenuBtn',v);
        this.serRootStyle('root','--homeTopMenuBtnCol',"#ffffff");
        this.serRootStyle('root','--homeTopBadgeCol',"#ffffff");
        this.serRootStyle('root','--homeTopBadge',v);

    }
    // 默认主题
    setHomeThemeLayoutDefault(v){
        this.setHomeColor(v);
        this.setHomeThemeLayoutLeftInit(v);
        this.setHomeThemeLayoutTopInit(v);
    }
    // 设置主题布局左侧菜单
    setHomeThemeLayoutLeft(v){
        this.setHomeThemeLayoutTopInit(v);
        this.serRootStyle('root','--homeSideMenuBg',v);
        this.serRootStyle('root','--homeSideMenuColorFFF',v);
        this.serRootStyle('root','--homeSideMenuColorF9F8FD',v);
        this.serRootStyle('root','--homeSideMenuCollapseSelected',v);
        this.serRootStyle('root','--homeBgMoreBtnCol',v);
        this.serRootStyle('root','--homeSideMenuColorF9F8FD-rgba',this.colorRgb("#F9F8FD",0.1));
        this.serRootStyle('root','--homeSideMenuColorIconfont',this.colorRgb("#F9F8FD",0.1));
        this.serRootStyle('root','--homeSideMenuSelected',"#fff");
        this.serRootStyle('root','--homeSideMenuColorArrow',"#fff");
        this.serRootStyle('root','--homeSideMenuColor344563',"#fff");
        this.serRootStyle('root','--homeSideMenuColor7E84A3',"#fff");
        this.serRootStyle('root','--homeBgMoreBtn',"#ffffff");
        this.serRootStyle('root','--homeRgba',this.colorRgb("#F9F8FD",0.1));
        this.serRootStyle('root','--homeV',"#ffffff");
    }
    // 设置主题布局左侧菜单
    setHomeThemeLayoutLeftAll(v){
        this.setHomeThemeLayoutTopInit(v);
        this.setHomeThemeLayoutLeft(v);
        this.serRootStyle('root','--homeBeaconCol',"#fff");
        this.serRootStyle('root','--homeBeaconBg',v);
        this.serRootStyle('root','--homeBeacon',"#fff");

    }
    // 主题布局左侧菜单
    setHomeThemeLayoutTop(v){
        this.setHomeThemeLayoutLeftInit(v);
        this.serRootStyle('root','--homeBeacon',"#fff");
        this.serRootStyle('root','--homeBeaconCol',"#fff");
        this.serRootStyle('root','--homeTopMenuCol',"#fff");
        this.serRootStyle('root','--homeTopMenuIsActive',"#fff");
        this.serRootStyle('root','--homeTopMenuBtn',"#fff");
        this.serRootStyle('root','--homeBeaconBg',v);
        this.serRootStyle('root','--homeTopMenuBtnCol',v);
        this.serRootStyle('root','--homeTopMenuBg',v);
        this.serRootStyle('root','--homeBeaconBr',this.colorRgb(v,0.1));
        this.serRootStyle('root','--homeBgMoreBtn',v);
        this.serRootStyle('root','--homeBgMoreBtnCol','#ffffff');
        this.serRootStyle('root','--homeTopBadgeCol',v);
        this.serRootStyle('root','--homeTopBadge','#ffffff');
        this.serRootStyle('root','--homeV',"#7D8DBF");
    }
    // 主题色系设置
    setHomeColor(v){
        this.serRootStyle('root','--homeSideMenuSelected',v);
        this.serRootStyle('root','--homeBg',v);
        this.serRootStyle('root','--homeBg-rgba',this.colorRgb(v,0.4));
        this.serRootStyle('root','--homeBgMoreBtn',v);
        this.serRootStyle('root','--homeTopMenuIsActive',v);
        this.serRootStyle('root','--homeTopMenuBtn',v);
        this.serRootStyle('root','--homeBeacon',v);
        this.serRootStyle('root','--homeBt',v);
        this.serRootStyle('root','--homeMsg',v);
        this.serRootStyle('root','--homeSet',v);
        this.serRootStyle('root','--homeV',"#7D8DBF");
        this.serRootStyle('root','--homeRgba',this.colorRgb(v,0.1));
        this.serRootStyle('root','--homeTopBadgeCol',"#ffffff");
        this.serRootStyle('root','--homeTopBadge',v);
        this.serRootStyle('root','--homeBrNone','none');
    }
    // 判断设置了那个主题
    isThemeLayout(value,color){
        if(value=="0"){
            this.setHomeThemeLayoutDefault(color);
        }else if(value=="1"){
            this.setHomeThemeLayoutLeft(color);
        }else if(value=="2"){
            this.setHomeThemeLayoutTop(color);
        }else if(value=="3"){
            this.setHomeThemeLayoutLeftAll(color);
        }
    }
}
export default new HomeColorSetting;
