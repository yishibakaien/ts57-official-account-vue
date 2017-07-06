/* 针对字典的过滤
规定字典格式：
  是否有库存
  isStock: [
    {
      label: '需要开机',
      value: '0'
    }, {
      label: '有库存',
      value: '1'
    }
  ], */
export const filterDict = (val, $arr, label = 'label') => {
  try {
    if (!val && val.length === 0) {
      return val;
    }
    let filter = $arr.filter(item => item.dicValue.toString() === val.toString());
    return filter[0][label];
  } catch (e) {}
};
// 时间转换
export const filterDate = (value, type = 'dateTime') => {
  if (value) {
    let tmpDate = new Date(value);
    let year = tmpDate.getFullYear();
    let mathon = tmpDate.getMonth() + 1 < 10
      ? `0${tmpDate.getMonth()}`
      : tmpDate.getMonth();
    let day = tmpDate.getDate() < 10
      ? `0${tmpDate.getDate()}`
      : tmpDate.getDate();
    let hour = tmpDate.getHours();
    let minutes = tmpDate.getMinutes() < 10
      ? `0${tmpDate.getMinutes()}`
      : tmpDate.getMinutes();
    let seconds = tmpDate.getSeconds() < 10
      ? `0${tmpDate.getSeconds()}`
      : tmpDate.getSeconds();
    if (type === 'dateTime') {
      return `${year}-${mathon}-${day} ${hour}:${minutes}:${seconds}`;
    } else {
      return `${year}-${mathon}-${day}`;
    }
  } else {
    return '';
  }
};
// 自定义时间
export const customTime = item => {
  // =======now
  let nowTime = new Date().getTime();
  let minuteTime = 60 * 1000;
  let hourTime = 60 * minuteTime;
  let dayTime = 24 * hourTime;
  let monthTime = dayTime * 30;
  let yearTime = monthTime * 12;
  // =======history
  let publish = new Date(item);
  let publishTime = publish.getTime();
  let date = publish.getDate();
  let year = publish.getFullYear();
  let month = publish.getMonth() < 9
    ? `0${publish.getMonth() + 1}`
    : publish.getMonth() + 1;
  let historyTime = parseInt(nowTime) - parseInt(publishTime);
  let descTime;
  if (historyTime >= yearTime) {
    // 按年算
    descTime = `${year}-${month}-${date}`;
  } else if (historyTime < yearTime && historyTime >= monthTime) {
    // 按月算
    descTime = `${month}-${date}`;
  } else if (historyTime < monthTime && historyTime >= dayTime) {
    // 按天算
    descTime = parseInt(historyTime / dayTime) + '天前';
  } else if (historyTime < dayTime && historyTime >= hourTime) {
    // 按小时算
    descTime = parseInt(historyTime / hourTime) + '小时前';
  } else if (historyTime < hourTime && historyTime >= minuteTime) {
    // 按分钟算
    descTime = parseInt(historyTime / minuteTime) + '分钟前';
  } else {
    descTime = '刚刚';
  }
  return descTime;
};

// 单位转换
export const unit = item => {
	let unitStr;
	if (item === 400010) {
		unitStr = '码';
	}
	if (item === 400011) {
		unitStr = '公斤';
	}
	if (item === 400012) {
		unitStr = '条';
	}
	return unitStr;
};

// 类型转换
export const type = item => {
	let typeStr;
	if (item === 100010) {
		typeStr = '面料';
	}
	if (item === 100011) {
		typeStr = '大边';
	}
	if (item === 100012) {
		typeStr = '小边';
	}
	if (item === 100013) {
		typeStr = '睫毛';
	}
	return typeStr;
};

// 是否接受开机
export const isStartUp = item => {
	let isStartUpStr;
	if (item === 1) {
		isStartUpStr = '接受开机';
	}
	if (item === 0) {
		isStartUpStr = '不接受开机';
	}
	return isStartUpStr;
};

// 求购状态
export const buyStatus = item => {
	let buyStatusStr;
	if (item === 0) {
		buyStatusStr = '已删除';
	}
	if (item === 1) {
		buyStatusStr = '求购中';
	}
	if (item === 2) {
		buyStatusStr = '已完成';
	}
	if (item === 3) {
		buyStatusStr = '已关闭';
	}
	return buyStatusStr;
};

// 供应状态
export const supplyStatus = item => {
	let supplyStatusStr;
	if (item === 0) {
		supplyStatusStr = '已删除';
	}
	if (item === 1) {
		supplyStatusStr = '供应中';
	}
	if (item === 2) {
		supplyStatusStr = '已关闭';
	}
	return supplyStatusStr;
};

// 现货或做货
export const productStatus = item => {
	let productStatusStr;
	if (item === 200012) {
		productStatusStr = '现货';
	}
	if (item === 200013) {
		productStatusStr = '做货';
	}
	return productStatusStr;
};

// 是否有库存
export const isStock = item => {
	let isStockStr;
	if (item === 1) {
		isStockStr = '有库存';
	}
	if (item === 0) {
		isStockStr = '需要开机';
	}
	return isStockStr;
};

// 大伙类型
export const buyShape = item => {
	let buyShapeStr;
	if (item === 200010) {
		buyShapeStr = '胚布';
	}
	if (item === 200011) {
		buyShapeStr = '成品';
	}
	return buyShapeStr;
};

// 格式化价格
export function formatMoney(price, unit) {
    // 金额以 分 作为单位
    price = Number(price);
    if (price < 0.1) {
        return '价格面议';
    }
    unit = Number(unit);
    var _unit = '';
    if (unit === 400010) {
        _unit = '码';
    } else if (unit === 400011) {
        _unit = '公斤';
    } else if (unit === 400012) {
        _unit = '条';
    }
    return '￥ ' + (price / 100) + ' / ' + _unit;
}

// 格式化图片
export function miniPic() {
    var url = Array.prototype.shift.call(arguments);
    // 判断参数
    if (url.indexOf('?x-oss-process=image') === -1) {
        url += '?x-oss-process=image';
    }
    var options = Array.prototype.shift.call(arguments);
    if (Object.prototype.toString.apply(options) === '[object Object]') {
        return url + '/resize,w_' + options.w + ',h_' + options.h;
    }
    if (/(number|string)/.test(typeof options)) {
        return url + '/resize,w_' + options + ',h_' + options;
    }
    // 默认缩小为 300 * 300
    return url + '/resize,w_300,h_300';
}
