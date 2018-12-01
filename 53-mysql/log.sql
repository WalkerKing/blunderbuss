mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hb                 |
| mysql              |
| performance_schema |
| sugar              |
| sys                |
+--------------------+
6 rows in set (0.02 sec)

mysql> use sugar;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+-------------------------------------------+
| Tables_in_sugar                           |
+-------------------------------------------+
| act_enroll                                |
| admin_group                               |
| admin_group_auth                          |
| admin_login_qrcode_log                    |
| admin_menu                                |
| admin_section                             |
| admin_shencha_user_auth                   |
| admin_user                                |
| admin_user_auth                           |
| admin_user_bind_wx                        |
| areas                                     |
| bank_code                                 |
| bank_sites                                |
| building_council                          |
| ceo_data                                  |
| ceo_month_data                            |
| ceo_user_login_log                        |
| credit_investigation                      |
| cu_customer_relation                      |
| cu_customer_user                          |
| customer_verification                     |
| dfp_admin_bind_telphone_out_sys           |
| dfp_order_suggest_detail                  |
| dfp_telphone_out_sys_record               |
| fh_activity                               |
| fh_activity_coupon                        |
| fh_activity_invite                        |
| fh_activity_invite_active_msg             |
| fh_activity_list                          |
| fh_activity_prize_option                  |
| fh_activity_prize_result                  |
| fh_admin_bind_telphone_out_sys            |
| fh_app_order_status                       |
| fh_audio_record                           |
| fh_auth_group_access                      |
| fh_baidu_request_report                   |
| fh_bank_code                              |
| fh_bank_kaihu                             |
| fh_baofei_plan                            |
| fh_baozhengjin_plan                       |
| fh_baozhengjin_split_plan                 |
| fh_bd                                     |
| fh_bd_auth_group_access                   |
| fh_bd_stat                                |
| fh_bdxd_funs_order                        |
| fh_bdxd_funs_order_attr                   |
| fh_bdxd_funs_order_log                    |
| fh_benjin_plan                            |
| fh_benjin_split_plan                      |
| fh_bind_card_record                       |
| fh_bjxt_bank_info                         |
| fh_bjxt_funs_order                        |
| fh_bjxt_funs_order_attr                   |
| fh_bjxt_funs_order_log                    |
| fh_bjxt_mortgage_info                     |
| fh_black_user                             |
| fh_borrower_user                          |
| fh_borrower_user_jkr__del_data            |
| fh_business_group                         |
| fh_business_user                          |
| fh_caiwuzhinajin_plan                     |
| fh_ceo_days_data                          |
| fh_ceo_son_order_id                       |
| fh_certification_user                     |
| fh_city_code                              |
| fh_contact_info                           |
| fh_contend_record                         |
| fh_contract_no_parser                     |
| fh_contract_template                      |
| fh_daihouzhinajin_plan                    |
| fh_dangan_data_config                     |
| fh_dangan_data_option                     |
| fh_dangan_mark                            |
| fh_dangan_option                          |
| fh_dangan_order                           |
| fh_dangan_remind_config                   |
| fh_deal_account                           |
| fh_device_token                           |
| fh_efficiency_stat                        |
| fh_everday_fangkuan_stat                  |
| fh_fangkuan_confirm                       |
| fh_fangkuan_stat                          |
| fh_fangkuanxiane                          |
| fh_feedback                               |
| fh_financing_allot                        |
| fh_financing_channel                      |
| fh_financing_huankuan_config              |
| fh_financing_month_plan                   |
| fh_financing_norm                         |
| fh_financing_plan                         |
| fh_financing_plan_operation               |
| fh_financing_product                      |
| fh_financing_rule                         |
| fh_financing_simulation_rule              |
| fh_funs_order                             |
| fh_funs_order_attr                        |
| fh_funs_order_log                         |
| fh_funs_order_plan                        |
| fh_gongzhengfei_split_plan                |
| fh_group_access                           |
| fh_gttk_bank_info                         |
| fh_gttk_funs_order                        |
| fh_gttk_funs_order_log                    |
| fh_gttk_funs_order_plan                   |
| fh_gttk_funs_tiqianhuankuan               |
| fh_gttk_funs_zhaizhuan                    |
| fh_gttk_mortgage_info                     |
| fh_guihuayongtu                           |
| fh_gz_days_data                           |
| fh_house_pic_category                     |
| fh_house_pic_category_detail              |
| fh_house_type                             |
| fh_huankuan_plan                          |
| fh_huankuan_split_plan                    |
| fh_huifu_bid                              |
| fh_huifu_info                             |
| fh_img                                    |
| fh_income_plan                            |
| fh_income_plan_promit_record              |
| fh_income_split_plan                      |
| fh_ip_whitelist                           |
| fh_jd_buy_back                            |
| fh_jd_huankuan_plan                       |
| fh_jd_huankuan_split_plan                 |
| fh_jd_repay_result_notify_log             |
| fh_jinjian_fangkuan_stat                  |
| fh_jubao                                  |
| fh_jubao_extend                           |
| fh_linshi_contract                        |
| fh_linshi_diya_contract                   |
| fh_linshi_weituo_contract                 |
| fh_liuzhuan_warning                       |
| fh_loaning_huankuan_plan                  |
| fh_loaning_income_plan                    |
| fh_loaning_lender_manage                  |
| fh_loaning_pingfang_conf                  |
| fh_message_center                         |
| fh_message_center_user                    |
| fh_message_center_user_read               |
| fh_message_center_user_tip                |
| fh_mianqian_fenpei_log                    |
| fh_online_bulletin                        |
| fh_online_bulletin_read_log               |
| fh_order                                  |
| fh_order_archives                         |
| fh_order_archives_borrow                  |
| fh_order_auto_stop                        |
| fh_order_baofei_info                      |
| fh_order_baozhengjin                      |
| fh_order_budoudi_info                     |
| fh_order_category_checklist               |
| fh_order_category_pic                     |
| fh_order_change_history                   |
| fh_order_chanquanren_info                 |
| fh_order_chuqin_info                      |
| fh_order_contact_person                   |
| fh_order_contract                         |
| fh_order_contract_template                |
| fh_order_copy                             |
| fh_order_credit                           |
| fh_order_cron                             |
| fh_order_customer_info                    |
| fh_order_daihou_collection_record         |
| fh_order_daihou_cuishou_info              |
| fh_order_daihou_cuishou_record            |
| fh_order_daihou_cuishou_status_change_log |
| fh_order_daihou_transfer_record           |
| fh_order_daihou_up_money_info             |
| fh_order_dfp                              |
| fh_order_draw_record                      |
| fh_order_entry_special                    |
| fh_order_entry_standard                   |
| fh_order_gongjie_company                  |
| fh_order_house_info                       |
| fh_order_house_pic                        |
| fh_order_img_info                         |
| fh_order_loaning_info                     |
| fh_order_loaning_plan                     |
| fh_order_loop_loan_info                   |
| fh_order_main                             |
| fh_order_material                         |
| fh_order_message_record                   |
| fh_order_mianshen_info                    |
| fh_order_msg_center                       |
| fh_order_msg_read                         |
| fh_order_nonrefund_city                   |
| fh_order_operation_record                 |
| fh_order_operation_time                   |
| fh_order_other_house_info                 |
| fh_order_other_one                        |
| fh_order_point_conf                       |
| fh_order_push_zxgz                        |
| fh_order_qiandao_info                     |
| fh_order_repeat_loan_fee                  |
| fh_order_score                            |
| fh_order_score_city_config                |
| fh_order_score_info                       |
| fh_order_score_rules                      |
| fh_order_score_rules_detail               |
| fh_order_shenpi_info                      |
| fh_order_songfangben_info                 |
| fh_order_suggest_detail                   |
| fh_order_syncon_record                    |
| fh_order_tag                              |
| fh_order_task_status                      |
| fh_order_task_submit                      |
| fh_order_temp_data                        |
| fh_order_tuifei_city                      |
| fh_order_user_kaihu                       |
| fh_order_warrant_info                     |
| fh_order_zhongjie_fanfei                  |
| fh_order_zhongjie_fanfei_v2               |
| fh_order_zhongjie_xinxi                   |
| fh_order_zhongjie_xinxi_v2                |
| fh_other_huankuan_plan                    |
| fh_other_huankuan_split_plan              |
| fh_other_payment_plan                     |
| fh_payment_fee                            |
| fh_payment_fee_config                     |
| fh_pingfang_conf                          |
| fh_position                               |
| fh_production                             |
| fh_push_message                           |
| fh_qingfen_pay_order                      |
| fh_qingfen_record                         |
| fh_resource                               |
| fh_service_fee                            |
| fh_shencha_tag_record                     |
| fh_sign_channel                           |
| fh_sign_contract_pic                      |
| fh_sms_send_record                        |
| fh_sms_template                           |
| fh_sms_template_config                    |
| fh_stat_order                             |
| fh_stat_production                        |
| fh_system_message                         |
| fh_telphone_out_sys_record                |
| fh_tmp_batch_validate                     |
| fh_transaction_flow_record                |
| fh_transaction_flow_record_copy           |
| fh_transaction_flow_record_wxpay          |
| fh_transaction_flow_refund_record_wxpay   |
| fh_user                                   |
| fh_user_active_data                       |
| fh_user_business_channel_relation         |
| fh_warrant_user                           |
| fh_wechat_msg_group                       |
| fh_weiyuejin_plan                         |
| fh_wx_message                             |
| fh_wx_message_log                         |
| fh_wx_openid                              |
| fh_yongjin_split_plan                     |
| fh_yuezonghe_split_plan                   |
| fh_zhaiquanbao                            |
| fh_zhanqi_huankuan_plan                   |
| fh_zhengxin                               |
| fh_zhengxin_credit_card                   |
| fh_zhengxin_credit_tips                   |
| fh_zhengxin_daila                         |
| fh_zhengxin_email_caiji                   |
| fh_zhengxin_guarantee_info                |
| fh_zhengxin_loan                          |
| fh_zhengxin_peiou                         |
| fh_zhengxin_profession_info               |
| fh_zhengxin_reside_info                   |
| fh_zhengxin_semi_credit_card              |
| fh_zhengxin_shenfen_info                  |
| fh_zhengxin_yuqi_summary                  |
| fh_zhonghang_contract_pdf                 |
| fh_zxbh_funs_huabo                        |
| fh_zxbh_funs_info                         |
| fh_zxbh_funs_risk_record                  |
| fh_zxbh_funs_status_sync_record           |
| goose_db_version                          |
| hzd_admin_user                            |
| hzd_award_money                           |
| hzd_bind_card_record                      |
| hzd_cai_yun                               |
| hzd_call_log                              |
| hzd_call_user                             |
| hzd_comment                               |
| hzd_extend_user                           |
| hzd_fgj_api_log                           |
| hzd_fgj_award                             |
| hzd_fgj_award_log                         |
| hzd_fgj_location                          |
| hzd_group                                 |
| hzd_hongbao_user                          |
| hzd_house                                 |
| hzd_order                                 |
| hzd_order_mark                            |
| hzd_order_reward                          |
| hzd_order_status_log                      |
| hzd_relation                              |
| hzd_sms_mobile_verify                     |
| hzd_stat_zhonghang_day                    |
| hzd_stat_zhonghang_week                   |
| hzd_third_admin                           |
| hzd_track_order                           |
| hzd_u51_log                               |
| hzd_user                                  |
| hzd_user_key                              |
| hzd_user_mark                             |
| import_order                              |
| migrations                                |
| p2p_data_archiving                        |
| p2p_data_pic                              |
| payment_trans                             |
| t                                         |
| tj_data_page                              |
| tj_data_statistics                        |
| trans_log                                 |
| users                                     |
| zb_duty                                   |
| zb_group                                  |
| zb_work_log                               |
| zb_worker                                 |
+-------------------------------------------+
317 rows in set (0.01 sec)

mysql> select * from zb_worker;
+----+-----------+-------------+-------------+--------+-------+--------+-------+------+
| id | name      | mobile      | mobile_bak  | group  | px_id | status | count | sid  |
+----+-----------+-------------+-------------+--------+-------+--------+-------+------+
|  1 | 杨东勇    | 13000003167 | 13500009757 | PHP    |     3 |      1 |     0 |    0 |
|  2 | 王明旭    | 18800008066 | 18800009025 | DPHP   |     3 |      0 |     0 |    4 |
|  3 | 孟维甫    | 18600005946 | 13600001597 | PHP    |     3 |      1 |     0 |    3 |
|  4 | 周洪伟    | 18600002151 | 13700009956 | PHP    |     1 |      0 |     0 |    1 |
|  5 | 杨振坤    | 18300009526 | 15200002500 | DPHP   |     2 |      0 |     0 |    2 |
|  6 | 陈玉明    | 13500009757 | 13400003386 | PHP    |     2 |      0 |     0 |    2 |
|  8 | 刘朝甲    | 13600000667 | 15300003512 | PHP    |     3 |      1 |     0 |    1 |
|  9 | 薛超华    | 18600009213 | 15800005901 | CESHI  |     1 |      0 |     0 |    0 |
| 10 | 何贞攀    | 18500004621 | 18500004621 | DCESHI |     2 |      0 |     0 |    1 |
| 11 | 杨立昆    | 18600002109 | 18500007354 | CESHI  |     3 |      0 |     0 |    1 |
| 12 | 陈玉成    | 18700003182 | 15200006860 | FRONT  |     1 |      0 |     0 |    1 |
| 13 | 王道汉    | 17600002913 | 15900002767 | FRONT  |     3 |      0 |     0 |    3 |
| 14 | 张岩      | 13700009953 | 13700009953 | FRONT  |     4 |      0 |     0 |    2 |
| 15 | 李民      | 15100007684 | 15100007684 | DPHP   |     1 |      0 |     0 |    1 |
| 16 | 杨林栋    | 13100009888 | 15700009020 | PHP    |     3 |      0 |     0 |    3 |
| 17 | 翟勇      | 15500005071 | 18500003162 | PHP    |     3 |      1 |     0 |    0 |
| 18 | 韩蔚娟    | 18500008619 | 18600002567 | FRONT  |     2 |      0 |     0 |    0 |
| 19 | 刘赟      | 18300007105 | 17600007020 | FRONT  |     1 |      0 |     0 |    1 |
| 20 | 张瑞芳    | 18200006559 | 17600003305 | FRONT  |     3 |      0 |     0 |    2 |
| 21 | 董明满    | 15800002129 | 15200009738 | FRONT  |     4 |      0 |     0 |    3 |
| 22 | 张佳琪    | 18200000501 | 18200000801 | PHP    |     2 |      0 |     0 |    2 |
| 23 | 张立伟    | 15000005313 | 18500000216 | DPHP   |     3 |      0 |     0 |    3 |
| 24 | 张志民    | 18300005857 | 13600009808 | CESHI  |     4 |      0 |     0 |    3 |
| 25 | 王东伟    | 13100006907 | 15700000386 | CESHI  |     2 |      0 |     0 |    2 |
| 26 | 杨悦      | 13100000518 | 13100000518 | DCESHI |     4 |      0 |     0 |    2 |
+----+-----------+-------------+-------------+--------+-------+--------+-------+------+
25 rows in set (0.00 sec)

mysql> select * from user;
ERROR 1146 (42S02): Table 'sugar.user' doesn't exist
mysql> select * from users;
Empty set (0.01 sec)

mysql> show tables;
+-------------------------------------------+
| Tables_in_sugar                           |
+-------------------------------------------+
| act_enroll                                |
| admin_group                               |
| admin_group_auth                          |
| admin_login_qrcode_log                    |
| admin_menu                                |
| admin_section                             |
| admin_shencha_user_auth                   |
| admin_user                                |
| admin_user_auth                           |
| admin_user_bind_wx                        |
| areas                                     |
| bank_code                                 |
| bank_sites                                |
| building_council                          |
| ceo_data                                  |
| ceo_month_data                            |
| ceo_user_login_log                        |
| credit_investigation                      |
| cu_customer_relation                      |
| cu_customer_user                          |
| customer_verification                     |
| dfp_admin_bind_telphone_out_sys           |
| dfp_order_suggest_detail                  |
| dfp_telphone_out_sys_record               |
| fh_activity                               |
| fh_activity_coupon                        |
| fh_activity_invite                        |
| fh_activity_invite_active_msg             |
| fh_activity_list                          |
| fh_activity_prize_option                  |
| fh_activity_prize_result                  |
| fh_admin_bind_telphone_out_sys            |
| fh_app_order_status                       |
| fh_audio_record                           |
| fh_auth_group_access                      |
| fh_baidu_request_report                   |
| fh_bank_code                              |
| fh_bank_kaihu                             |
| fh_baofei_plan                            |
| fh_baozhengjin_plan                       |
| fh_baozhengjin_split_plan                 |
| fh_bd                                     |
| fh_bd_auth_group_access                   |
| fh_bd_stat                                |
| fh_bdxd_funs_order                        |
| fh_bdxd_funs_order_attr                   |
| fh_bdxd_funs_order_log                    |
| fh_benjin_plan                            |
| fh_benjin_split_plan                      |
| fh_bind_card_record                       |
| fh_bjxt_bank_info                         |
| fh_bjxt_funs_order                        |
| fh_bjxt_funs_order_attr                   |
| fh_bjxt_funs_order_log                    |
| fh_bjxt_mortgage_info                     |
| fh_black_user                             |
| fh_borrower_user                          |
| fh_borrower_user_jkr__del_data            |
| fh_business_group                         |
| fh_business_user                          |
| fh_caiwuzhinajin_plan                     |
| fh_ceo_days_data                          |
| fh_ceo_son_order_id                       |
| fh_certification_user                     |
| fh_city_code                              |
| fh_contact_info                           |
| fh_contend_record                         |
| fh_contract_no_parser                     |
| fh_contract_template                      |
| fh_daihouzhinajin_plan                    |
| fh_dangan_data_config                     |
| fh_dangan_data_option                     |
| fh_dangan_mark                            |
| fh_dangan_option                          |
| fh_dangan_order                           |
| fh_dangan_remind_config                   |
| fh_deal_account                           |
| fh_device_token                           |
| fh_efficiency_stat                        |
| fh_everday_fangkuan_stat                  |
| fh_fangkuan_confirm                       |
| fh_fangkuan_stat                          |
| fh_fangkuanxiane                          |
| fh_feedback                               |
| fh_financing_allot                        |
| fh_financing_channel                      |
| fh_financing_huankuan_config              |
| fh_financing_month_plan                   |
| fh_financing_norm                         |
| fh_financing_plan                         |
| fh_financing_plan_operation               |
| fh_financing_product                      |
| fh_financing_rule                         |
| fh_financing_simulation_rule              |
| fh_funs_order                             |
| fh_funs_order_attr                        |
| fh_funs_order_log                         |
| fh_funs_order_plan                        |
| fh_gongzhengfei_split_plan                |
| fh_group_access                           |
| fh_gttk_bank_info                         |
| fh_gttk_funs_order                        |
| fh_gttk_funs_order_log                    |
| fh_gttk_funs_order_plan                   |
| fh_gttk_funs_tiqianhuankuan               |
| fh_gttk_funs_zhaizhuan                    |
| fh_gttk_mortgage_info                     |
| fh_guihuayongtu                           |
| fh_gz_days_data                           |
| fh_house_pic_category                     |
| fh_house_pic_category_detail              |
| fh_house_type                             |
| fh_huankuan_plan                          |
| fh_huankuan_split_plan                    |
| fh_huifu_bid                              |
| fh_huifu_info                             |
| fh_img                                    |
| fh_income_plan                            |
| fh_income_plan_promit_record              |
| fh_income_split_plan                      |
| fh_ip_whitelist                           |
| fh_jd_buy_back                            |
| fh_jd_huankuan_plan                       |
| fh_jd_huankuan_split_plan                 |
| fh_jd_repay_result_notify_log             |
| fh_jinjian_fangkuan_stat                  |
| fh_jubao                                  |
| fh_jubao_extend                           |
| fh_linshi_contract                        |
| fh_linshi_diya_contract                   |
| fh_linshi_weituo_contract                 |
| fh_liuzhuan_warning                       |
| fh_loaning_huankuan_plan                  |
| fh_loaning_income_plan                    |
| fh_loaning_lender_manage                  |
| fh_loaning_pingfang_conf                  |
| fh_message_center                         |
| fh_message_center_user                    |
| fh_message_center_user_read               |
| fh_message_center_user_tip                |
| fh_mianqian_fenpei_log                    |
| fh_online_bulletin                        |
| fh_online_bulletin_read_log               |
| fh_order                                  |
| fh_order_archives                         |
| fh_order_archives_borrow                  |
| fh_order_auto_stop                        |
| fh_order_baofei_info                      |
| fh_order_baozhengjin                      |
| fh_order_budoudi_info                     |
| fh_order_category_checklist               |
| fh_order_category_pic                     |
| fh_order_change_history                   |
| fh_order_chanquanren_info                 |
| fh_order_chuqin_info                      |
| fh_order_contact_person                   |
| fh_order_contract                         |
| fh_order_contract_template                |
| fh_order_copy                             |
| fh_order_credit                           |
| fh_order_cron                             |
| fh_order_customer_info                    |
| fh_order_daihou_collection_record         |
| fh_order_daihou_cuishou_info              |
| fh_order_daihou_cuishou_record            |
| fh_order_daihou_cuishou_status_change_log |
| fh_order_daihou_transfer_record           |
| fh_order_daihou_up_money_info             |
| fh_order_dfp                              |
| fh_order_draw_record                      |
| fh_order_entry_special                    |
| fh_order_entry_standard                   |
| fh_order_gongjie_company                  |
| fh_order_house_info                       |
| fh_order_house_pic                        |
| fh_order_img_info                         |
| fh_order_loaning_info                     |
| fh_order_loaning_plan                     |
| fh_order_loop_loan_info                   |
| fh_order_main                             |
| fh_order_material                         |
| fh_order_message_record                   |
| fh_order_mianshen_info                    |
| fh_order_msg_center                       |
| fh_order_msg_read                         |
| fh_order_nonrefund_city                   |
| fh_order_operation_record                 |
| fh_order_operation_time                   |
| fh_order_other_house_info                 |
| fh_order_other_one                        |
| fh_order_point_conf                       |
| fh_order_push_zxgz                        |
| fh_order_qiandao_info                     |
| fh_order_repeat_loan_fee                  |
| fh_order_score                            |
| fh_order_score_city_config                |
| fh_order_score_info                       |
| fh_order_score_rules                      |
| fh_order_score_rules_detail               |
| fh_order_shenpi_info                      |
| fh_order_songfangben_info                 |
| fh_order_suggest_detail                   |
| fh_order_syncon_record                    |
| fh_order_tag                              |
| fh_order_task_status                      |
| fh_order_task_submit                      |
| fh_order_temp_data                        |
| fh_order_tuifei_city                      |
| fh_order_user_kaihu                       |
| fh_order_warrant_info                     |
| fh_order_zhongjie_fanfei                  |
| fh_order_zhongjie_fanfei_v2               |
| fh_order_zhongjie_xinxi                   |
| fh_order_zhongjie_xinxi_v2                |
| fh_other_huankuan_plan                    |
| fh_other_huankuan_split_plan              |
| fh_other_payment_plan                     |
| fh_payment_fee                            |
| fh_payment_fee_config                     |
| fh_pingfang_conf                          |
| fh_position                               |
| fh_production                             |
| fh_push_message                           |
| fh_qingfen_pay_order                      |
| fh_qingfen_record                         |
| fh_resource                               |
| fh_service_fee                            |
| fh_shencha_tag_record                     |
| fh_sign_channel                           |
| fh_sign_contract_pic                      |
| fh_sms_send_record                        |
| fh_sms_template                           |
| fh_sms_template_config                    |
| fh_stat_order                             |
| fh_stat_production                        |
| fh_system_message                         |
| fh_telphone_out_sys_record                |
| fh_tmp_batch_validate                     |
| fh_transaction_flow_record                |
| fh_transaction_flow_record_copy           |
| fh_transaction_flow_record_wxpay          |
| fh_transaction_flow_refund_record_wxpay   |
| fh_user                                   |
| fh_user_active_data                       |
| fh_user_business_channel_relation         |
| fh_warrant_user                           |
| fh_wechat_msg_group                       |
| fh_weiyuejin_plan                         |
| fh_wx_message                             |
| fh_wx_message_log                         |
| fh_wx_openid                              |
| fh_yongjin_split_plan                     |
| fh_yuezonghe_split_plan                   |
| fh_zhaiquanbao                            |
| fh_zhanqi_huankuan_plan                   |
| fh_zhengxin                               |
| fh_zhengxin_credit_card                   |
| fh_zhengxin_credit_tips                   |
| fh_zhengxin_daila                         |
| fh_zhengxin_email_caiji                   |
| fh_zhengxin_guarantee_info                |
| fh_zhengxin_loan                          |
| fh_zhengxin_peiou                         |
| fh_zhengxin_profession_info               |
| fh_zhengxin_reside_info                   |
| fh_zhengxin_semi_credit_card              |
| fh_zhengxin_shenfen_info                  |
| fh_zhengxin_yuqi_summary                  |
| fh_zhonghang_contract_pdf                 |
| fh_zxbh_funs_huabo                        |
| fh_zxbh_funs_info                         |
| fh_zxbh_funs_risk_record                  |
| fh_zxbh_funs_status_sync_record           |
| goose_db_version                          |
| hzd_admin_user                            |
| hzd_award_money                           |
| hzd_bind_card_record                      |
| hzd_cai_yun                               |
| hzd_call_log                              |
| hzd_call_user                             |
| hzd_comment                               |
| hzd_extend_user                           |
| hzd_fgj_api_log                           |
| hzd_fgj_award                             |
| hzd_fgj_award_log                         |
| hzd_fgj_location                          |
| hzd_group                                 |
| hzd_hongbao_user                          |
| hzd_house                                 |
| hzd_order                                 |
| hzd_order_mark                            |
| hzd_order_reward                          |
| hzd_order_status_log                      |
| hzd_relation                              |
| hzd_sms_mobile_verify                     |
| hzd_stat_zhonghang_day                    |
| hzd_stat_zhonghang_week                   |
| hzd_third_admin                           |
| hzd_track_order                           |
| hzd_u51_log                               |
| hzd_user                                  |
| hzd_user_key                              |
| hzd_user_mark                             |
| import_order                              |
| migrations                                |
| p2p_data_archiving                        |
| p2p_data_pic                              |
| payment_trans                             |
| t                                         |
| tj_data_page                              |
| tj_data_statistics                        |
| trans_log                                 |
| users                                     |
| zb_duty                                   |
| zb_group                                  |
| zb_work_log                               |
| zb_worker                                 |
+-------------------------------------------+
317 rows in set (0.01 sec)

mysql> use hb;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tabls;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'tabls' at line 1
mysql> show tablesl
    -> ^C
mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| ca_test      |
| class        |
| product      |
| salary       |
| sessions     |
| user         |
+--------------+
7 rows in set (0.00 sec)

mysql> select * from class;
+------------+-----+-------+------+-------+
| sname      | age | score | age1 | snum  |
+------------+-----+-------+------+-------+
| 123        | 123 |     0 |    0 | 00000 |
| M的意思    |   0 |     0 |    3 | 00000 |
| 再看       |   0 |     0 |   99 | 00000 |
| zerofill   |   0 |     0 |    0 | 00222 |
+------------+-----+-------+------+-------+
4 rows in set (0.01 sec)

mysql> desc class;
+-------+-------------------------------+------+-----+---------+-------+
| Field | Type                          | Null | Key | Default | Extra |
+-------+-------------------------------+------+-----+---------+-------+
| sname | char(20)                      | NO   |     | NULL    |       |
| age   | tinyint(4)                    | NO   |     | 0       |       |
| score | tinyint(3) unsigned           | NO   |     | 0       |       |
| age1  | tinyint(1)                    | NO   |     | 0       |       |
| snum  | smallint(5) unsigned zerofill | NO   |     | 00000   |       |
+-------+-------------------------------+------+-----+---------+-------+
5 rows in set (0.01 sec)

mysql> insert into class(age1) values ('what', 128)
    -> ;
ERROR 1136 (21S01): Column count doesn't match value count at row 1
mysql> insert into class(sname, age1) values ('what', 128);
ERROR 1264 (22003): Out of range value for column 'age1' at row 1
mysql> insert into class(sname, age1) values ('what', 127);
Query OK, 1 row affected (0.01 sec)

mysql> insert into class(sname, age1) values ('what', -128);
Query OK, 1 row affected (0.00 sec)

mysql> insert into class(sname, age1) values ('what', -129);
ERROR 1264 (22003): Out of range value for column 'age1' at row 1
mysql> select * from class;
+------------+-----+-------+------+-------+
| sname      | age | score | age1 | snum  |
+------------+-----+-------+------+-------+
| 123        | 123 |     0 |    0 | 00000 |
| M的意思    |   0 |     0 |    3 | 00000 |
| 再看       |   0 |     0 |   99 | 00000 |
| zerofill   |   0 |     0 |    0 | 00222 |
| what       |   0 |     0 |  127 | 00000 |
| what       |   0 |     0 | -128 | 00000 |
+------------+-----+-------+------+-------+
6 rows in set (0.00 sec)

mysql> drop table class;
Query OK, 0 rows affected (0.02 sec)

mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| ca_test      |
| product      |
| salary       |
| sessions     |
| user         |
+--------------+
6 rows in set (0.00 sec)

mysql> create table class ('id' int unsigned not null auto_increment, user_name char(20) not null default '' comment '用户名')
    -> ；
    -> ^C
mysql> create table class ('id' int unsigned not null auto_increment, user_name char(20) not null default '' comment '用户名')engine=InnoDB auto_increment=0 default charset=utf8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''id' int unsigned not null auto_increment, user_name char(20) not null default '' at line 1
mysql> create table class (id int unsigned not null auto_increment, user_name char(20) not null default '' comment '用户名')engine=InnoDB auto_increment=0 default charset=utf8;
ERROR 1075 (42000): Incorrect table definition; there can be only one auto column and it must be defined as a key
mysql> create table class (id int unsigned not null auto_increment, user_name char(20) not null default '' comment '用户名', primary key(id))engine=InnoDB auto_increment=0 default charset=utf8;
Query OK, 0 rows affected (0.03 sec)

mysql> show tables;
+--------------+
| Tables_in_hb |
+--------------+
| admin_user   |
| ca_test      |
| class        |
| product      |
| salary       |
| sessions     |
| user         |
+--------------+
7 rows in set (0.00 sec)

mysql> desc class;
+-----------+------------------+------+-----+---------+----------------+
| Field     | Type             | Null | Key | Default | Extra          |
+-----------+------------------+------+-----+---------+----------------+
| id        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| user_name | char(20)         | NO   |     |         |                |
+-----------+------------------+------+-----+---------+----------------+
2 rows in set (0.01 sec)

mysql> inset into class (id, user_name) values ('', 'a8')
    -> ;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'inset into class (id, user_name) values ('', 'a8')' at line 1
mysql> inset into class(id, user_name) values ('', 'a8')
    -> ;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'inset into class(id, user_name) values ('', 'a8')' at line 1
mysql> insert into class (id, user_name) values ('', 'a8');
ERROR 1366 (HY000): Incorrect integer value: '' for column 'id' at row 1
mysql> insert into class (id, user_name) values (null, 'a8');
Query OK, 1 row affected (0.01 sec)

mysql> select * from class'
    '> ^C
mysql> select * from class;
+----+-----------+
| id | user_name |
+----+-----------+
|  1 | a8        |
+----+-----------+
1 row in set (0.00 sec)

mysql> alert table class add age tinyint unsigned not null default 0;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'alert table class add age tinyint unsigned not null default 0' at line 1
mysql> alter table class add age tinyint unsigned not null default 0;
Query OK, 0 rows affected (0.06 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> select * from class;
+----+-----------+-----+
| id | user_name | age |
+----+-----------+-----+
|  1 | a8        |   0 |
+----+-----------+-----+
1 row in set (0.00 sec)

mysql> insert into class (user_name, age) values('a9', 256)
    -> ;
ERROR 1264 (22003): Out of range value for column 'age' at row 1
mysql> insert into class (user_name, age) values('a9', 256);
ERROR 1264 (22003): Out of range value for column 'age' at row 1
mysql> insert into class (user_name, age) values('a9', 255);
Query OK, 1 row affected (0.00 sec)

mysql> select * from  class;
+----+-----------+-----+
| id | user_name | age |
+----+-----------+-----+
|  1 | a8        |   0 |
|  2 | a9        | 255 |
+----+-----------+-----+
2 rows in set (0.00 sec)

mysql> insert into class (user_name, age) values(a10, 1)
    -> ;
ERROR 1054 (42S22): Unknown column 'a10' in 'field list'
mysql> insert into class (user_name, age) values('a10', -1)
    -> ;
ERROR 1264 (22003): Out of range value for column 'age' at row 1
mysql> insert into class (user_name, age) values('a10', 0)
    -> ;
Query OK, 1 row affected (0.01 sec)

mysql> select * from class;
+----+-----------+-----+
| id | user_name | age |
+----+-----------+-----+
|  1 | a8        |   0 |
|  2 | a9        | 255 |
|  3 | a10       |   0 |
+----+-----------+-----+
3 rows in set (0.00 sec)

mysql> insert into class(user_name, age) values('q11', 34);
Query OK, 1 row affected (0.01 sec)

mysql> select * from class;
+----+-----------+-----+
| id | user_name | age |
+----+-----------+-----+
|  1 | a8        |   0 |
|  2 | a9        | 255 |
|  3 | a10       |   0 |
|  4 | q11       |  34 |
+----+-----------+-----+
4 rows in set (0.00 sec)

mysql> desc table class;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'table class' at line 1
mysql> desc class;
+-----------+---------------------+------+-----+---------+----------------+
| Field     | Type                | Null | Key | Default | Extra          |
+-----------+---------------------+------+-----+---------+----------------+
| id        | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
| user_name | char(20)            | NO   |     |         |                |
| age       | tinyint(3) unsigned | NO   |     | 0       |                |
+-----------+---------------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> insert into class(user_name, age) values('123456789012345678901', 12);
ERROR 1406 (22001): Data too long for column 'user_name' at row 1
mysql> insert into class(user_name, age) values('12345678901234567890', 12);
Query OK, 1 row affected (0.01 sec)

mysql> select * from class;
+----+----------------------+-----+
| id | user_name            | age |
+----+----------------------+-----+
|  1 | a8                   |   0 |
|  2 | a9                   | 255 |
|  3 | a10                  |   0 |
|  4 | q11                  |  34 |
|  5 | 12345678901234567890 |  12 |
+----+----------------------+-----+
5 rows in set (0.00 sec)

mysql> alter table class add snum smallint(5) unsigned zerofill not null default 0;
Query OK, 0 rows affected (0.05 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> select * from class;
+----+----------------------+-----+-------+
| id | user_name            | age | snum  |
+----+----------------------+-----+-------+
|  1 | a8                   |   0 | 00000 |
|  2 | a9                   | 255 | 00000 |
|  3 | a10                  |   0 | 00000 |
|  4 | q11                  |  34 | 00000 |
|  5 | 12345678901234567890 |  12 | 00000 |
+----+----------------------+-----+-------+
5 rows in set (0.00 sec)

mysql> insert into class (user_name, age, snum) values ('q12', 29, 12)
    -> ;
Query OK, 1 row affected (0.01 sec)

mysql> select * from class;
+----+----------------------+-----+-------+
| id | user_name            | age | snum  |
+----+----------------------+-----+-------+
|  1 | a8                   |   0 | 00000 |
|  2 | a9                   | 255 | 00000 |
|  3 | a10                  |   0 | 00000 |
|  4 | q11                  |  34 | 00000 |
|  5 | 12345678901234567890 |  12 | 00000 |
|  6 | q12                  |  29 | 00012 |
+----+----------------------+-----+-------+
6 rows in set (0.00 sec)

mysql> insert into class (user_name, snum) values('q13', 65536);
ERROR 1264 (22003): Out of range value for column 'snum' at row 1
mysql> insert into class (user_name, snum) values('q13', 65535);
Query OK, 1 row affected (0.01 sec)

mysql> insert into class (user_name, snum) values ('q13', 1123);
Query OK, 1 row affected (0.00 sec)

mysql> select * from class;
+----+----------------------+-----+-------+
| id | user_name            | age | snum  |
+----+----------------------+-----+-------+
|  1 | a8                   |   0 | 00000 |
|  2 | a9                   | 255 | 00000 |
|  3 | a10                  |   0 | 00000 |
|  4 | q11                  |  34 | 00000 |
|  5 | 12345678901234567890 |  12 | 00000 |
|  6 | q12                  |  29 | 00012 |
|  7 | q13                  |   0 | 65535 |
|  8 | q13                  |   0 | 01123 |
+----+----------------------+-----+-------+
8 rows in set (0.00 sec)

mysql> ^C
mysql> ^C
mysql> ^C
mysql> ^C
mysql> ^C
mysql> quit
