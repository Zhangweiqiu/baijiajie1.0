package com.example.demo.model.weixinmodel;
/**
 * 复杂按钮（父按钮）
 * @author qiuzhangwei
 *
 */
public class ComplexButton extends Button{
	private Button[] sub_button;
	
	public Button[] getSub_button() {
		return sub_button;
	}

	public void setSub_button(Button[] sub_button) {
		this.sub_button = sub_button;
	}
}
