package com.example.demo.others;

import com.example.demo.model.weixinmodel.Button;
import com.example.demo.model.weixinmodel.CommonButton;
import com.example.demo.model.weixinmodel.ComplexButton;
import com.example.demo.model.weixinmodel.Menu;

public class CreateMenu {
	public static Menu getMenu() {
		CommonButton btn11 = new CommonButton(); 
		btn11.setName("🔥开始赚钱");
		btn11.setKey("11");
		btn11.setType("click");
		
		CommonButton btn12 = new CommonButton(); 
		btn12.setName("🔥邀请好友夺金榜");
		btn12.setKey("12");
		btn12.setType("click");
		
		CommonButton btn13 = new CommonButton(); 
		btn13.setName("🔥加入会员社群");
		btn13.setKey("13");
		btn13.setType("click");
		
		CommonButton btn14 = new CommonButton(); 
		btn14.setName("🔥我的邀请段位");
		btn14.setKey("14");
		btn14.setType("click");
		
		CommonButton btn21 = new CommonButton(); 
		btn21.setName("✅马上借款");
		btn21.setKey("21");
		btn21.setType("click");
		
		CommonButton btn22 = new CommonButton(); 
		btn22.setName("✅进入首页");
		btn22.setKey("22");
		btn22.setType("click");
		
		
		CommonButton btn23 = new CommonButton(); 
		btn23.setName("✅人工马上审核");
		btn23.setKey("23");
		btn23.setType("click");
		
		CommonButton btn31 = new CommonButton();
		btn31.setName(String.valueOf(Character.toChars(0x1F4B0))+"易富金融俱乐部");
		btn31.setType("click");
		btn31.setKey("31");
		
		CommonButton btn32 = new CommonButton();
		btn32.setName(String.valueOf(Character.toChars(0x1F4B0))+"佣金提现");
		btn32.setKey("32");
		btn32.setType("click");
		
		CommonButton btn33 = new CommonButton();
		btn33.setName(String.valueOf(Character.toChars(0x1F4B0))+"12月新口子");
		btn33.setKey("33");
		btn33.setType("click");
		
		CommonButton btn34 = new CommonButton();
		btn34.setName("🔥微信打条秒借🔥");
		btn34.setKey("34");
		btn34.setType("click");
		
		 ComplexButton mainBtn1 = new ComplexButton();  
	     mainBtn1.setName("🔥开始赚钱");  
	     mainBtn1.setSub_button(new CommonButton[] { btn11, btn12, btn13, btn14 });  
	 
        ComplexButton mainBtn2 = new ComplexButton();  
        mainBtn2.setName("开始借款");  
        mainBtn2.setSub_button(new CommonButton[] { btn21, btn22, btn23 });  
 
        ComplexButton mainBtn3 = new ComplexButton();  
        mainBtn3.setName("借款推荐");  
        mainBtn3.setSub_button(new CommonButton[] { btn31, btn32, btn33,btn34 });  
        
        Menu menu = new Menu();
        menu.setButton(new Button[] {mainBtn1,mainBtn2,mainBtn3});
        
        return menu;
		
	}
}
