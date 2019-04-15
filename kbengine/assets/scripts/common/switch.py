# -*- coding: utf-8 -*-

DB_NAME = "kbe_KDDMJ"

PUBLISH_VERSION = 0

DEBUG_BASE = 1 # 0 真实环境 1 调试环境 2 测试环境

PHP_SERVER_URL = 'http://10.0.0.4:9981/api/'
PHP_SERVER_SECRET = "zDYnetiVvFgWCRMIBGwsAKaqPOUjfNXS"
ACCOUNT_LOGIN_SECRET = "KFZ<]~ct(uYHM%#LABX<>>O6-N(~F#GM" # 登录校验的密钥

PHP_DEBUG_URL = 'http://192.168.1.10:9080/index.php'
CLUB_CARD_MIN	= 24
CLUB_CARD_WARN	= 100

#计算消耗
def calc_cost(game_round, default_avg):
	pay_mode = default_avg['pay_mode']
	base = int(game_round / 8)
	if pay_mode == 1:
		# AA
		return base, 9999
	else:
		return base * 4, 9999
	return 9999, 9999