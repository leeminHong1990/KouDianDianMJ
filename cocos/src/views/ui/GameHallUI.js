"use strict"
var GameHallUI = UIBase.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/GameHallUI.json";
    },
    initUI:function(){
        var bg_img = ccui.helper.seekWidgetByName(this.rootUINode, "bg_img");
        var bg_img_content_size = bg_img.getContentSize();
        var scale = cc.winSize.width/bg_img_content_size.width;
        if (cc.winSize.height/bg_img_content_size.height > scale){
            scale = cc.winSize.height/bg_img_content_size.height;
        }
        bg_img.setScale(scale);

        // this.init_character_anim();
        this.init_character_panel();
        this.init_function_panel();
        this.init_top_panel();
        this.init_game_panel();
        this.init_roomcard_panel();
    },

	init_roomcard_panel:function () {
		var roomcard_panel = this.rootUINode.getChildByName("roomcard_panel");
		var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
		var roomcard_label = roomcard_panel.getChildByName("card_label");
		roomcard_label.setString("— —");
		function update_card_diamond(){
			cutil.get_user_info("wx_" + info_dict["unionid"], function(content){
				if(content[0] != '{'){
					return
				}
				var info = eval('(' + content + ')');
				roomcard_label.setString(info["card"].toString());
			});
		}

		update_card_diamond();
		//商城
		roomcard_panel.getChildByName("buy_btn").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
					h1global.curUIMgr.shop_ui.show();
				} else {
					// h1global.globalUIMgr.info_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值");
					h1global.curUIMgr.publicnum_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值\r\n或扫以下二维码直接进入公众号进行充值");
				}
			}
		});
	},

    // init_character_anim:function () {
    //     UICommonWidget.load_effect_plist('eye');
    //
    //     let character_img = this.rootUINode.getChildByName('character_img');
    //     let eye_node = character_img.getChildByName('eye_node');
    //     let eye_sprite = cc.Sprite.create();
    //     eye_sprite.setVisible(false);
    //     character_img.addChild(eye_sprite);
    //     eye_sprite.setPosition(eye_node.getPosition());
    //     let eye_action = UICommonWidget.create_effect_action_ugly({"TIME": 0.2, "NAME": "Eye/eye", "FRAMENUM": 2}, eye_sprite);
    //     eye_sprite.runAction(cc.repeatForever(cc.sequence(cc.delayTime(4), cc.show(), eye_action, cc.hide())));
    //     eye_node.removeFromParent();
    // },

    init_character_panel:function(){
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var name_label = character_panel.getChildByName("name_label");
        name_label.setString(info_dict["nickname"]);
        var id_label = character_panel.getChildByName("id_label");
        id_label.setString("ID:" + info_dict["user_id"]);
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString("— —");
        var frame_img = ccui.helper.seekWidgetByName(character_panel, "frame_img");
        character_panel.reorderChild(frame_img, 1);
        frame_img.addTouchEventListener(function(sender, eventType){
            h1global.curUIMgr.playerinfo_ui.show();
        });
        frame_img.setTouchEnabled(true);
        cutil.loadPortraitTexture(info_dict["headimgurl"], info_dict["sex"], function(img){
            if(h1global.curUIMgr.gamehall_ui && h1global.curUIMgr.gamehall_ui.is_show){
                h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("character_panel").getChildByName("portrait_sprite").removeFromParent();
                var portrait_sprite  = new cc.Sprite(img);
                portrait_sprite.setScale(102/portrait_sprite.getContentSize().width);
                var stencil = new cc.Sprite("res/ui/GameHallUI/mask.png"); // 遮罩模板 -- 就是你想把图片变成的形状
                var clipnode = new cc.ClippingNode();
                clipnode.x = 64;
                clipnode.y = 64;
                clipnode.setInverted(false);
                clipnode.setAlphaThreshold(0.5);
                clipnode.setStencil(stencil);
                clipnode.addChild(portrait_sprite);
                h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("character_panel").addChild(clipnode);
            }
        });

        function update_card_diamond(){
            cutil.get_user_info("wx_" + info_dict["unionid"], function(content){
                if(content[0] != '{'){
                    return
                }
                var info = eval('(' + content + ')');
                roomcard_label.setString(info["card"].toString());
            });
        }

        update_card_diamond();

        //认证
        character_panel.getChildByName("authenticate_btn").setVisible(false);
        character_panel.getChildByName("authenticate_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.authentucate_ui.show();
            }
        });

        //商城
        character_panel.getChildByName("buy_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
                    h1global.curUIMgr.shop_ui.show();
                } else {
                    // h1global.globalUIMgr.info_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值");
                    h1global.curUIMgr.publicnum_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值\r\n或扫以下二维码直接进入公众号进行充值");
                }
            }
        });
    },

    updateCharacterCard: function () {
	    var roomcard_panel = this.rootUINode.getChildByName("roomcard_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var roomcard_label = roomcard_panel.getChildByName("card_label");
        roomcard_label.setString("— —");

        function update_card_diamond(){
            cutil.get_user_info("wx_" + info_dict["unionid"],

                function(content){
                    if(content[0] !== '{'){
                        return
                    }
                    var info = eval('(' + content + ')');
                    roomcard_label.setString(info["card"].toString());
                });
        }

        update_card_diamond();
    },

    update_roomcard:function(cards){
	    var roomcard_panel = this.rootUINode.getChildByName("roomcard_panel");
        var roomcard_label = roomcard_panel.getChildByName("card_label");
        roomcard_label.setString(cards);
    },

    init_top_panel:function(){
        var top_panel = ccui.helper.seekWidgetByName(this.rootUINode, "top_panel");

        var code_btn = top_panel.getChildByName("code_btn");
        var free_card_btn = top_panel.getChildByName("free_card_btn");
        var public_btn = top_panel.getChildByName("public_btn");

        //赚钱码
        code_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                // h1global.curUIMgr.addmine_ui.show();
                h1global.curUIMgr.gamehallshare_ui.show();
            }
        });

        //免费房卡
        free_card_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                // if(h1global.curUIMgr.webview_ui) {
                //     h1global.curUIMgr.webview_ui.show_by_info("http://" + switches.gameEngName + "update.zjfeixia.com/agent.html");
                // }
                // h1global.curUIMgr.gamehallshare_ui.show();
                h1global.curUIMgr.sharecircle_ui.show();
            }
        });

        //公众号
        public_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                h1global.curUIMgr.addmine_ui.show();
            }
        });
	    public_btn.setVisible(true);

        // // 代开房
        // agent_room_btn.addTouchEventListener(function (sender, eventType) {
        //     if (eventType === ccui.Widget.TOUCH_ENDED) {
        //         h1global.curUIMgr.createagentroom_ui.show(function () {
        //             h1global.player().getPlayingRoomInfo();
        //         });
        //     }
        // });


		if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            top_panel.setVisible(false);
		}
    },

    init_function_panel:function(){
        var function_panel = ccui.helper.seekWidgetByName(this.rootUINode, "function_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');

        //公告
        function_panel.getChildByName("notice_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.activity_ui.show();
            }
        });

        //战绩
        function_panel.getChildByName("score_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.record_ui.show();
            }
        });

        //客服
        function_panel.getChildByName("customerservice_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                // h1global.curUIMgr.customerservice_ui.show();
                h1global.curUIMgr.cs_ui.show();
            }
        });

        //玩法
        function_panel.getChildByName("intro_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.help_ui.show_by_info();
            }
        });

        //设置
        function_panel.getChildByName("config_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.config_ui.show();
            }
        });

        // //分享
        // function_panel.getChildByName("share_btn").addTouchEventListener(function(sender, eventType){
        //     if(eventType == ccui.Widget.TOUCH_ENDED){
        //         h1global.curUIMgr.gamehallshare_ui.show();
        //     }
        // });

        // //获取
        // function_panel.getChildByName("obtain_btn").addTouchEventListener(function(sender, eventType){
        //     if(eventType == ccui.Widget.TOUCH_ENDED){
        //         if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
        //             h1global.curUIMgr.shop_ui.show();
        //         } else {
        //             h1global.curUIMgr.obtain_ui.show();
        //         }
        //     }
        // });


        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            function_panel.getChildByName("customerservice_btn").setVisible(false);
            // function_panel.getChildByName("notice_btn").setPositionX(function_panel.getContentSize().width * 0.18);
            function_panel.getChildByName("score_btn").setPositionX(function_panel.getContentSize().width * 0.39);
            function_panel.getChildByName("intro_btn").setPositionX(function_panel.getContentSize().width * 0.51);
            // function_panel.getChildByName("config_btn").setPositionX(function_panel.getContentSize().width * 0.82);
		}
	},

    init_game_panel:function(){
        var game_panel = ccui.helper.seekWidgetByName(this.rootUINode, "game_panel");

        var create_club_btn = game_panel.getChildByName("create_club_btn");
	    var create_club_btn_bg = create_club_btn.getChildByName("club_btn_bg");
        function create_club_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if (h1global.player().isAgent !== 1) {
                    h1global.globalUIMgr.info_ui.show_by_info("您不是代理，不能创建茶楼");
                    create_club_btn_bg.setVisible(false);
                    return;
                }
                if(h1global.player().club_entity_list.length >= const_val.CLUB_NUM_LIMIT){
                    if(h1global.globalUIMgr.info_ui && !h1global.globalUIMgr.info_ui.is_show){
                        h1global.globalUIMgr.info_ui.show_by_info("加入茶楼数量已达到上限");
                    }
                } else {
                    if(h1global.curUIMgr.createclub_ui && !h1global.curUIMgr.createclub_ui.is_show){
                        h1global.curUIMgr.createclub_ui.show()
                        let player = h1global.entityManager.player();
                        if (player) {
                            player.upLocationInfo();
                        } else {
                            cc.log('player undefined');
                        }
                    }
                }
	            create_club_btn_bg.setVisible(false);
            } else if (eventType === ccui.Widget.TOUCH_CANCELED) {
	            create_club_btn_bg.setVisible(false);
            } else {
	            create_club_btn_bg.setVisible(true);
            }
        }
	    create_club_btn.addTouchEventListener(create_club_btn_event);
	    UICommonWidget.load_effect_plist("create_club_btn");
	    var create_club_btn_effect = cc.Sprite.create();
        create_club_btn_effect.setBlendFunc(cc.ONE, cc.ONE_MINUS_SRC_ALPHA);
	    create_club_btn_effect.setPosition(cc.p(create_club_btn.getContentSize().width * 0.5, create_club_btn.getContentSize().height * 0.5));
        create_club_btn_effect.runAction(cc.repeatForever(cc.sequence(UICommonWidget.create_effect_action({"FRAMENUM":10, "TIME":1.5, "NAME":"createClubBtn/create_club_btn_"}), cc.delayTime(3.0))));
	    create_club_btn.addChild(create_club_btn_effect);
	    create_club_btn_effect.setOpacity(255 * 0.7);

        var join_club_btn = game_panel.getChildByName("join_club_btn");
        var join_club_text = join_club_btn.getChildByName("join_club_text");
        var join_club_btn_bg = join_club_btn.getChildByName("club_btn_bg");
        function join_club_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if(h1global.curUIMgr.joinclub_ui && !h1global.curUIMgr.joinclub_ui.is_show){
                    h1global.curUIMgr.joinclub_ui.show();
                    let player = h1global.entityManager.player();
                    if (player) {
                        player.upLocationInfo();
                    } else {
                        cc.log('player undefined');
                    }
                }
	            join_club_btn_bg.setVisible(false);
            } else if (eventType === ccui.Widget.TOUCH_CANCELED) {
	            join_club_btn_bg.setVisible(false);
            } else {
	            join_club_btn_bg.setVisible(true);
            }
        }
        join_club_btn.addTouchEventListener(join_club_btn_event);
	    UICommonWidget.load_effect_plist("join_club_btn");
	    var join_club_btn_effect = cc.Sprite.create();
        join_club_btn_effect.setBlendFunc(cc.ONE, cc.ONE_MINUS_SRC_ALPHA);
        join_club_btn_effect.runAction(cc.sequence(
            cc.delayTime(1.5),
            cc.callFunc(function () {
                join_club_btn_effect.runAction(cc.repeatForever(cc.sequence(UICommonWidget.create_effect_action({"FRAMENUM":10, "TIME":1.5, "NAME":"joinClubBtn/join_club_btn_"}), cc.delayTime(3.0))));
            })
        ));
	    join_club_btn_effect.setPosition(cc.p(join_club_btn.getContentSize().width * 0.5, join_club_btn.getContentSize().height * 0.5));
	    join_club_btn.addChild(join_club_btn_effect);
	    join_club_btn_effect.setOpacity(255 * 0.7);
	    join_club_text.setLocalZOrder(join_club_btn_effect.getLocalZOrder() + 1);
	    join_club_btn_bg.setLocalZOrder(join_club_text.getLocalZOrder() + 1);

        var create_room_btn = game_panel.getChildByName("create_room_btn");
        function create_room_btn_event(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.createroom_ui.show();
                let player = h1global.player();
                if (player) {
                    player.upLocationInfo();
                } else {
                    cc.log('player undefined');
                }
            }
        }
        // create_room_btn.addTouchEventListener(create_room_btn_event);

        // var join_room_btn = game_panel.getChildByName("join_room_btn");
        function join_room_btn_event(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.joinroom_ui.show();
                let player = h1global.player();
                if (player) {
                    player.upLocationInfo();
                } else {
                    cc.log('player undefined');
                }
            }
        }
        // join_room_btn.addTouchEventListener(join_room_btn_event);

	    UICommonWidget.load_effect_plist("create_btn");
	    var create_btn_effect = cc.Sprite.create();
        create_btn_effect.setBlendFunc(cc.ONE, cc.ONE_MINUS_SRC_ALPHA);
	    create_btn_effect.runAction(cc.RepeatForever.create(cc.sequence(cc.callFunc(function () {
		    // create_btn_effect.setVisible(true);
		    create_btn_effect.runAction(cc.fadeIn(0.5));
	    }),UICommonWidget.create_effect_action({"FRAMENUM":20, "TIME":1.0, "NAME":"createBtn/create_btn_"}), cc.callFunc(function () {
		    create_btn_effect.runAction(cc.fadeOut(0.5));
		    // create_btn_effect.setVisible(false);
	    }), cc.delayTime(3.0))));
	    create_btn_effect.setPosition(cc.p(create_room_btn.getContentSize().width * 0.5, create_room_btn.getContentSize().height * 0.5));
	    create_btn_effect.setOpacity(255 * 0.7);
	    create_room_btn.addChild(create_btn_effect);
        var create_room_bg = create_room_btn.getChildByName("create_room_bg");
        var join_room_bg = create_room_btn.getChildByName("join_room_bg");
        create_room_btn.addTouchEventListener(function (sender, type) {
	        var p = sender.getTouchBeganPosition();
	        p = sender.convertToNodeSpace(p);
	        var width = sender.getContentSize().width;
            if (type === ccui.Widget.TOUCH_ENDED) {
		        if (p.x > width * 0.34) {
			        join_room_btn_event(sender , type);
		        }else{
			        create_room_btn_event(sender , type);
		        }
	            join_room_bg.setVisible(false);
	            create_room_bg.setVisible(false);
	        } else if (type === ccui.Widget.TOUCH_CANCELED) {
	            join_room_bg.setVisible(false);
	            create_room_bg.setVisible(false);
            } else {
		        if (p.x > width * 0.34) {
			        join_room_bg.setVisible(true);
			        create_room_bg.setVisible(false);
		        } else {
			        join_room_bg.setVisible(false);
			        create_room_bg.setVisible(true);
		        }
	        }
        });

        create_club_btn.setPositionX(create_room_btn.getPositionX() + cc.winSize.width * 0.0103);
        join_club_btn.setPositionX(create_club_btn.getPositionX() + 276);
        // create_club_btn.setPositionX(join_club_btn.getPositionX() + cc.winSize.width * 0.0103);
        // join_club_btn.setPositionX(create_club_btn.getPositionX() + 276);
    }
});