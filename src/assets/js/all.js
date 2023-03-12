let all = {
	// 判断身份证号
	isSfz(idcard) {
		var id =
			/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
		if (idcard === '') {

		} else if (!id.test(idcard)) {

			return false
		} else {
			return false
		}
	},
	// 判断是否是手机号   
	isPhone(val) {
		var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
		if (!patrn.test(val) || val === '') {
			alert('手机号码格式不正确')
			return false
		} else {
			return true
		}
	},
	// 判断邮箱
	isEmail(email) {
		if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
			return true;
		else
			return false;
	},
	// 时间戳转换时间
	timestampToTime(timestamp) {
		var date = new Date(timestamp*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return Y + M + D + h + m + s;
	},
	timeYear(timestamp) {
		var date = new Date(timestamp*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
		return Y + M + D;
	},
	timeYear2(timestamp) {
		var date = new Date(timestamp*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		return Y + M + D + h + m;
	},
	// 判断密码是否符合 至少8位,包括大小写字母、数字
	isPassword(val) {
		// var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]+$))^.{8,14}$/;
		var reg  = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,14}');
		if (val === '') {
			alert('请输入密码')
		} else if (!reg.test(val)) {
			alert('请输入8-14位密码,包括大小写字母、数字')
			return
		} else {
			return true
		}
	},
	//聊天时间戳格式化
	getTime(unix_stamp) { // unix_stamp 精确到微秒
		var _today_obj = new Date(),
			_today_date = {
				y : _today_obj.getFullYear(),
				m : ( _today_obj.getMonth() + 1 < 10 ? '0' + ( _today_obj.getMonth() - - 1 ) : (_today_obj.getMonth() - - 1) ),
				d : ( _today_obj.getDate() < 10 ? '0' + _today_obj.getDate() : _today_obj.getDate() )
			}

		var _today_stamp = Date.parse(_today_date.y + '/' + _today_date.m + '/' + _today_date.d + ' 00:00:00')

		var stamp = []
		stamp[0] = _today_stamp + 86400000
		stamp[1] = _today_stamp
		stamp[2] = _today_stamp - 86400000
		stamp[3] = _today_stamp - 172800000

		stamp[4] = _today_stamp - 518400000 // 7天

		stamp[5] = _today_stamp - 31536000000 // 365天

		var _compare_obj = new Date()
		_compare_obj.setTime(unix_stamp)

		var return_str

		if (unix_stamp >= stamp[1] && unix_stamp < stamp[0]) {
			return_str = _compare_obj.getHours() + ':' +  ( _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes() )
		} else if (unix_stamp >= stamp[2] && unix_stamp < stamp[1]) {
			var yesterdayText = '昨天'
			return_str = yesterdayText  + ' ' + _compare_obj.getHours() + ':' +
				( _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes() )
		} else if (unix_stamp >= stamp[3] && unix_stamp < stamp[2]) {
			var theDayBeforeYesterdayText = '前天'
			return_str = theDayBeforeYesterdayText  +  ' ' + _compare_obj.getHours() + ':' +
				( _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes() )

		} else if (unix_stamp >= stamp[4] && unix_stamp < stamp[3]) { // 7天内
			var daynames = ['天', '一', '二', '三', '四', '五', '六']
			var dathStr = '星期' + daynames[_compare_obj.getDay()]

			var SundayText = '星期天'
			var MondayText = '星期一'
			var TuesdayText = '星期二'
			var WednesdayText = '星期三'
			var ThursdayText = '星期四'
			var FridayText = '星期五'
			var SaturdayText = '星期六'

			var dathStr2

			switch (dathStr) {
				case '星期天':
					dathStr2 = SundayText
					break
				case '星期一':
					dathStr2 = MondayText
					break
				case '星期二':
					dathStr2 = TuesdayText
					break
				case '星期三':
					dathStr2 = WednesdayText
					break
				case '星期四':
					dathStr2 = ThursdayText
					break
				case '星期五':
					dathStr2 = FridayText
					break
				case '星期六':
					dathStr2 = SaturdayText
					break
				default:
					dathStr2 = dathStr
					break
			}

			return_str = dathStr2 + ' ' + _compare_obj.getHours() + ':' +
				( _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes() )
		} else if (unix_stamp >= stamp[5] && unix_stamp < stamp[4]) { // 365天内
			var monthText = '月'
			var dayText = '日'
			return_str = (_compare_obj.getMonth() - (-1)) + monthText + _compare_obj.getDate() + dayText + ' '
				+ _compare_obj.getHours() + ':' +  ( _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes() )

		} else {
			var yearText = '年'
			var monthText = '月'
			var dayText = '日'
			return_str = _compare_obj.getFullYear() + yearText + (_compare_obj.getMonth() - (-1)) +
				monthText + _compare_obj.getDate() + dayText + ' ' + _compare_obj.getHours() + ':' +
				( _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes() )
		}
		return return_str

	}
}

export default all;