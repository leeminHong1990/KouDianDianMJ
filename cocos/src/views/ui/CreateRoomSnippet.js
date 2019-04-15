// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict"
var CreateRoomSnippet = UISnippet.extend({
	initUI:function(){
		var self = this;
		this.room_type = undefined;
		this.initCreateInfo();

        this.createroom_panel = this.rootUINode.getChildByName("createroom_panel");
        this.gamename_panel = this.createroom_panel.getChildByName("gamename_panel");

        this.updateCardDiamond();

        var group_parent_panel_list = [
            //this.gamename_panel.getChildByName("game_mode_panel"),
            //this.gamename_panel.getChildByName("game_max_lose_panel"),
            //this.gamename_panel.getChildByName("score_panel"),
            //this.gamename_panel.getChildByName("round_max_lose_panel"),
            this.gamename_panel.getChildByName("round_panel"),
            this.gamename_panel.getChildByName("mode_panel"),
            this.gamename_panel.getChildByName("play_panel"),
           // this.gamename_panel.getChildByName("play_panel"),
            this.gamename_panel.getChildByName("pay_panel"),
            this.gamename_panel.getChildByName("cost_panel"),
            this.gamename_panel.getChildByName("prepare_panel")

        ];
        //var group_chx_list = ["round_chx","game_mode_chx","king_mode_chx","reward_chx" ,"pay_mode_chx"];
        var group_chx_list = ["round_chx","game_mode_chx","king_mode_chx","pay_mode_chx"];
        var group_label_list = ["round_num_label_","game_mode_label_" ,"king_mode_label_", "pay_mode_label_"];
        var group_chx_num_list = [3,3,2,2];
        var group_chx_func_list = [
            //function (i) {self.game_mode = i; self.update_mode_option(); self.updateCardDiamond();},
            //function (i) {self.game_max_lose = 40 + i*10;self.updateCardDiamond();},
            //function (i) {self.base_score = i+1;},
            //function (i) {self.round_max_lose = i === 0 ? 0 : 10*Math.pow(2, i);},
            function (i) {self.game_round = 8*(i+1);self.updateCardDiamond();},
            function (i) {self.game_mode = i; self.update_mode_option(); self.updateCardDiamond();},
            function (i) {self.king_mode = i;},
            //function (i) {self.reward=i;},
            // function (i) {self.pay_mode=i;self.updateCardDiamond();},
            //function (i) {self.play_list[0] = i;},
            //function (i) {self.play_list[1] = i + 1;},
            //function (i) {self.play_list[2] = i;},
            function (i) {
        		if (self.room_type === const_val.CLUB_ROOM) {
					self.pay_mode = i === 0 ? const_val.CLUB_PAY_MODE : const_val.AA_PAY_MODE;
				} else if (self.room_type === const_val.AGENT_ROOM) {
					self.pay_mode = i === 0 ? const_val.AGENT_PAY_MODE : const_val.AA_PAY_MODE;
				} else {
        			self.pay_mode = i === 0 ? const_val.NORMAL_PAY_MODE : const_val.AA_PAY_MODE;
				}
				self.updateCardDiamond();
			}
        ];

        var group_select_list = [
            self.game_round/8 -1,
            self.game_mode,
            self.king_mode,
            //self.reward,
            self.pay_mode
        ];
        this.update_check_box_group_panel(group_parent_panel_list, group_chx_list, group_chx_num_list, group_chx_func_list, group_select_list, group_label_list);

        var single_parent_panel_list = [
	        this.gamename_panel.getChildByName("add_dealer_panel"),
	        this.gamename_panel.getChildByName("play_panel"),
            this.gamename_panel.getChildByName("prepare_panel"),
        ];
        var single_chx_list = ["add_dealer_chx","reward_chx","prepare_chx"];
        var single_label_list = ["add_dealer_label_1","reward_label_1","prepare_label"];
        var single_chx_func_list = [
	        function (is_select) {self.add_dealer = is_select ? 1 : 0;},
	        function (is_select) {self.reward = is_select ? 1 : 0;},
            function (is_select) {self.hand_prepare = is_select ? 0 : 1;}
        ];
        var single_select_list = [
	        self.add_dealer,
	        self.reward,
            self.hand_prepare ? 0 : 1,
        ];
        this.update_check_box_single_panel(single_parent_panel_list, single_chx_list, single_chx_func_list, single_select_list, single_label_list);
        this.update_mode_option();
	},

    initCreateInfo:function () {
        //cc.sys.localStorage.clear();
        var default_info_json = '{"game_mode":0, "game_round":8, "king_mode":0, "add_dealer":0, "reward":0, "pay_mode":0, "hand_prepare":0}';
        var info_json = cc.sys.localStorage.getItem(const_val.GAME_NAME + "_CREATE_INFO_JSON");
        if (!info_json){
            cc.sys.localStorage.setItem(const_val.GAME_NAME + "_CREATE_INFO_JSON", default_info_json);
            info_json = cc.sys.localStorage.getItem(const_val.GAME_NAME + "_CREATE_INFO_JSON");
        }
        var info_dict = eval("(" + info_json + ")");
        this.game_mode          =   info_dict["game_mode"]; 				    // 游戏模式，0代表普通模式，
        this.game_round         =   info_dict["game_round"]; 				    // 局数
        this.king_mode          =   info_dict["king_mode"];					// 耗子玩法
        this.reward             =   info_dict["reward"];				    // 赏金玩法
        this.add_dealer         =   info_dict["add_dealer"];				    // 加庄
        this.pay_mode           =   info_dict["pay_mode"];                     // 支付模式

        this.hand_prepare       =   info_dict["hand_prepare"];				    // 0代表需要手动准备，1代表不需要手动准备，因为在玩家的state中0代表没有准备,1代表已经准备
		switch (this.room_type) {
			case const_val.CLUB_ROOM:
				if (info_dict['pay_mode'] === const_val.AA_PAY_MODE) {
					this.pay_mode = const_val.AA_PAY_MODE;
				} else {
					this.pay_mode = const_val.CLUB_PAY_MODE;
				}
				break;
			case const_val.AGENT_ROOM:
				if (info_dict['pay_mode'] === const_val.AA_PAY_MODE) {
					this.pay_mode = const_val.AA_PAY_MODE;
				} else {
					this.pay_mode = const_val.AGENT_PAY_MODE;
				}
				break;
			default:
				if (info_dict['pay_mode'] === const_val.AA_PAY_MODE) {
					this.pay_mode = const_val.AA_PAY_MODE;
				} else {
					this.pay_mode = const_val.NORMAL_PAY_MODE;
				}
		}
	},

    setCreateInfo:function () {
        var attribute_list = [];
        attribute_list.push('"game_mode":'      + this.game_mode.toString());
        attribute_list.push('"game_round":'     + this.game_round.toString());
        attribute_list.push('"king_mode":'      + this.king_mode.toString());
        attribute_list.push('"reward":'         + this.reward.toString());
        attribute_list.push('"add_dealer":'     + this.add_dealer.toString());
        attribute_list.push('"pay_mode":'       + this.pay_mode.toString());
        attribute_list.push('"hand_prepare":'   + this.hand_prepare.toString());
        var json_str = "{" + attribute_list.join(",") + "}";
        cc.sys.localStorage.setItem(const_val.GAME_NAME + "_CREATE_INFO_JSON", json_str);
    },

    //参数分别是一种游戏的面板、复选框名字的列表、对应复选框的个数列表、对应要执行的语句的列表
    update_check_box_group_panel:function (parent_pane_list, chx_list, chx_num_list, chx_func_list, select_list, label_list) {
        var self = this;
        for(var i = 0 ; i < chx_list.length ; i++) {
            var select_idx = select_list ? select_list[i] : 0;
            UICommonWidget.create_check_box_group(parent_pane_list[i], chx_list[i], chx_num_list[i], chx_func_list[i], select_idx, label_list[i]);
        }
    },

    update_check_box_single_panel:function (parent_pane_list, chx_list, chx_func_list, select_list, label_list) {
        for(var i = 0 ; i < chx_list.length ; i++) {
            var is_select = select_list ? select_list[i] : 0;
            UICommonWidget.create_check_box_single(parent_pane_list[i], chx_list[i], chx_func_list[i], is_select, label_list[i]);
        }
    },

    updateCardDiamond:function() {
		var cost_num_label = this.gamename_panel.getChildByName("cost_panel").getChildByName("cost_num_label");
		var base =  this.game_round / 8;
		var val = undefined;
	    base = this.game_round / 8;

		if (this.pay_mode === const_val.AA_PAY_MODE) {
			val = "每人消耗 x " + base.toString();
		} else {
			if (this.room_type === const_val.CLUB_ROOM) {
				val = "楼主消耗 x " + (base * 4).toString();
			} else if (this.room_type === const_val.AGENT_ROOM) {
				val = "代理消耗 x " + (base * 4).toString();
			} else {
				val = "房主消耗 x " + (base * 4).toString();
			}
		}
		cost_num_label.setString(val.toString());
    },

    update_mode_option:function () {
        if(this.game_mode === const_val.KING_GAME_MODE){
            var play_panel = this.gamename_panel.getChildByName("play_panel");
            play_panel.setVisible(true);
	        play_panel.setTouchEnabled(false);

            var mode_panel = this.gamename_panel.getChildByName("mode_panel");
            var pay_panel = this.gamename_panel.getChildByName("pay_panel");
            var add_dealer_panel = this.gamename_panel.getChildByName("add_dealer_panel");
	        add_dealer_panel.setPositionY(play_panel.getPositionY());
	        add_dealer_panel.getChildByName("add_dealer_chx1").setPositionX(360);
	        add_dealer_panel.getChildByName("add_dealer_label_1").setPositionX(380);

            mode_panel.setPositionY(440);
            pay_panel.setPositionY(260);


        } else {
            var play_panel = this.gamename_panel.getChildByName("play_panel");
            play_panel.setVisible(false);
	        var add_dealer_panel = this.gamename_panel.getChildByName("add_dealer_panel");
	        add_dealer_panel.setPositionY(365);
	        add_dealer_panel.getChildByName("add_dealer_chx1").setPositionX(160);
	        add_dealer_panel.getChildByName("add_dealer_label_1").setPositionX(180);
            var mode_panel = this.gamename_panel.getChildByName("mode_panel");
            var pay_panel = this.gamename_panel.getChildByName("pay_panel");

            mode_panel.setPositionY(428);
            pay_panel.setPositionY(282);
        }
    },

	update_default_pay_mode: function () {
		switch (this.room_type) {
			case const_val.CLUB_ROOM:
				if (this.pay_mode !== const_val.AA_PAY_MODE) {
					this.pay_mode = const_val.CLUB_PAY_MODE;
				}
				break;
			case const_val.AGENT_ROOM:
				if (this.pay_mode !== const_val.AA_PAY_MODE) {
					this.pay_mode = const_val.AGENT_PAY_MODE;
				}
				break;
			default:
				if (this.pay_mode !== const_val.AA_PAY_MODE) {
					this.pay_mode = const_val.NORMAL_PAY_MODE;
				}
		}
	},

	getParameters: function () {
        this.setCreateInfo();
		return {
			"game_mode"		: this.game_mode,   //1.普通玩法    2.特殊牌型玩法    3.耗子玩法
			"game_round"	: this.game_round,  // 8   16  24
            "king_mode"     : this.king_mode,   //0是风耗子 1是随机耗子
            "reward"        : this.reward,      //0是无赏金 1是有赏金
            "add_dealer"    : this.add_dealer,      //0是不加庄 1是加庄
			"hand_prepare"	: this.hand_prepare,// 1.非自动准备  2.自动准备
			"pay_mode"		: this.pay_mode     // 1.房主支付   2.AA支付
		};
	},

    updateRoomType: function (r_type) {
        this.room_type = r_type;
		var pay_panel = this.gamename_panel.getChildByName("pay_panel");
		var label_1 = pay_panel.getChildByName("pay_mode_label_1");
		if (r_type === const_val.CLUB_ROOM) {
			label_1.setString("楼主支付");
		} else if (r_type === const_val.AGENT_ROOM) {
			label_1.setString("代理支付");
		} else {
			label_1.setString("房主支付");
		}
		this.update_default_pay_mode();
		// this.update_mode_option();
		this.updateCardDiamond();
	}
});