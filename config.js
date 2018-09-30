/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "http://47.97.181.243"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  //根据经纬度获取企业列表
  // articleListUrl: `${host}/enterprise/list_near_enterprise`,

  //文章列表
  articleListUrl: `${host}/article/list`,

  //文章详情
  articleDetailUrl: `${host}/article/detail`,

  //寿险文章详情
  insuranceDetailUrl: `${host}/insurance/detail`,

  //分类列表
  list_all: `${host}/article/categories/list_all`,

  //寿险服务列表
  insuranceListUrl: `${host}/insurance/list`,

  //投保预约
  InsureUrl: `${host}/insurance/information/save`,

  //点赞
  getpoint: `${host}/point/log/get_point`,

  //修改个人信息
  updateUrl: `${host}/sys/user/update`,

  //获取个人信息
  infoUrl: `${host}/sys/user/detail`,

  //企业入驻
  enterpriseSave: `${host}/enterprise/save`,

  //上传
  upload: `${host}/common/sysFile/upload`,

  //最近的三家洗车
  nearEnterprise: `${host}/enterprise/list_near_enterprise`,

  //预约救援信息
  resueSave: `${host}/road/resue/save`,

  //道路救援信息列表
  rescueList: `${host}/road/rescue/list`,

  //兑换明细列表
  exchangeList: `${host}/enterprise/exchange/list`,

  //订单列表
  orderList: `${host}/order/list`,

  //获取个人的详细信息
  userIdUrl: `${host}/user/get_by_open_id`,

   //卡劵列表
  cardList: `${host}/card/list`,

   //现金券兑换
  exchangeSave: `${host}/enterprise/exchange/save`,
   //商品列表
  goodsList: `${host}/goods/list`,
  //购买商品
  goodsBuy: `${host}/card/save`

};

module.exports = config