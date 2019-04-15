//var GPSceneUI = UIBase.extend({
var GPSceneUI = BasicDialogUI.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/GPSceneUI.json";
        this.setLocalZOrder(const_val.GameConfigZOrder);
    },

    initUI:function(){
        var player = h1global.player();
        var self = this;
        var playerInfoList = player.curGameRoom.playerInfoList;
        cc.log(playerInfoList);

        this.gps_panel = this.rootUINode.getChildByName("gps_panel");
        this.Avatar_panel=this.gps_panel.getChildByName("Avatar_panel");
        this.word_panel=this.gps_panel.getChildByName("word_panel");

        //this.Avatar_panel.setVisible(false);
        // this.head_frame0 = this.Avatar_panel.getChildByName("head_frame_img_0");
        // this.head_frame1 = this.Avatar_panel.getChildByName("head_frame_img_1");
        // this.head_frame2 = this.Avatar_panel.getChildByName("head_frame_img_2");
        // this.head_frame3 = this.Avatar_panel.getChildByName("head_frame_img_3");
        // this.alert0 = this.head_frame0.getChildByName("alert_img");
        // this.alert1 = this.head_frame1.getChildByName("alert_img");
        // this.alert2 = this.head_frame2.getChildByName("alert_img");
        // this.alert3 = this.head_frame3.getChildByName("alert_img");
        // this.alert0.setVisible(false);
        // this.alert1.setVisible(false);
        // this.alert2.setVisible(false);
        // this.alert3.setVisible(false);
        //
        // cutil.loadPortraitTexture(playerInfoList[0]["head_icon"], playerInfoList[0]["sex"], function(img){
        //     var portrait_sprite  = new cc.Sprite(img);
        //     self.head_frame0.addChild(portrait_sprite);
        //     portrait_sprite.setPosition(self.head_frame0.getPosition());
        //
        // });

        // cutil.loadPortraitTexture(playerInfoList[0]["head_icon"], playerInfoList[0]["sex"], function(img){
        //     if(h1global.curUIMgr.gpscene_ui && h1global.curUIMgr.gpscene_ui.is_show){
        //         if(self.head_frame0.getChildByName("portrait_sprite")){
        //             self.head_frame0.getChildByName("portrait_sprite").removeFromParent();
        //         }
        //         var portrait_sprite  = new cc.Sprite(img);
        //         portrait_sprite.setName("portrait_sprite");
        //         if(self.curRound > 0) {
        //             portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
        //         }else {
        //             portrait_sprite.setScale(100 / portrait_sprite.getContentSize().width);
        //         }
        //         portrait_sprite.x = player_info_panel.getContentSize().width * 0.5;
        //         portrait_sprite.y = player_info_panel.getContentSize().height * 0.5;
        //         player_info_panel.addChild(portrait_sprite);
        //         player_info_panel.reorderChild(portrait_sprite, -1);
        //     }
        // });
        for(var i = 0 ; i < playerInfoList.length ; i++){
            let idx = i;
            if(playerInfoList[i]==null){
                continue;
            }
            cutil.loadPortraitTexture(playerInfoList[i]["head_icon"], playerInfoList[i]["sex"], function(img){
                var portrait_sprite  = new cc.Sprite(img);
                portrait_sprite.setScale(100/portrait_sprite.getContentSize().width);
                var head_frame = self.Avatar_panel.getChildByName("head_frame_img_"+ idx.toString());
                head_frame.getChildByName("alert_img").setVisible(false);
                if(head_frame.getChildByName("portrait_sprite")){
                    head_frame.getChildByName("portrait_sprite").removeFromParent();
                }
                portrait_sprite.setName("portrait_sprite");
                head_frame.addChild(portrait_sprite);
                portrait_sprite.x+=69;
                portrait_sprite.y+=67;
            });
        }

        //var distance = parseInt(player.curGameRoom.playerDistanceList[player.serverSitNum][serverSitNum >= 10 ? serverSitNum - 10 : serverSitNum]);
        //self.word_panel.getChildByName("word_label_0").setString("距离：" + (distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "未知"));
        // for (var i=0;i<6;i++) {
        //     var distance = this.get_distance(0,3);
        //     this.word_panel.getChildByName("word_label_"+i.toString()).setString("距离" + (distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "未知"));
        // }
        var distance = this.get_distance(2,3);
        this.word_panel.getChildByName("word_label_0").setString(distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "距离未知");
        var distance = this.get_distance(1,3);
        this.word_panel.getChildByName("word_label_1").setString(distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "距离未知");
        var distance = this.get_distance(0,3);
        this.word_panel.getChildByName("word_label_2").setString(distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "距离未知");
        var distance = this.get_distance(0,2);
        this.word_panel.getChildByName("word_label_3").setString(distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "距离未知");
        var distance = this.get_distance(0,1);
        this.word_panel.getChildByName("word_label_4").setString(distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "距离未知");
        var distance = this.get_distance(1,2);
        this.word_panel.getChildByName("word_label_5").setString(distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "距离未知");
    },

    get_distance:function (serverSitNum1,serverSitNum2){
        var player = h1global.player();
        //cc.log(player.curGameRoom.playerDistanceList);
        //var playerDistanceList = [[-1,200,300,199999], [200,-1,250,199999], [300,250,-1,199999], [199999,199999,1999999,-1]];
        var playerDistanceList = player.curGameRoom.playerDistanceList;
        var distance1 = parseInt(playerDistanceList[serverSitNum1][serverSitNum2]);
        var distance2 = parseInt(playerDistanceList[serverSitNum2][serverSitNum1]);
        return distance1>distance2 ? distance1:distance2;
    }

});