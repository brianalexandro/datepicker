angular.module('ngApp').factory('dateService', function() {
	return {
		months : [
			{
				name  : 'January',
				value : '01'
			},
			{
				name  : 'February',
				value : '02'
			},
			{
				name  : 'March',
				value : '03'
			},
			{
				name  : 'April',
				value : '04'
			},
			{
				name  : 'May',
				value : '05'
			},
			{
				name  : 'June',
				value : '06'
			},
			{
				name  : 'July',
				value : '07'
			},
			{
				name  : 'August',
				value : '08'
			},
			{
				name  : 'September',
				value : '09'
			},
			{
				name  : 'October',
				value : '10'
			},
			{
				name  : 'November',
				value : '11'
			},
			{
				name  : 'December',
				value : '12'
			}
	    ],
		getTotalDaysInMonth: function (year, month) {
			return new Date(year, month, 0).getDate();
		},
		getDayNameByDate: function ( date ) {
			// EXPECTED DATE FORMAT = YYYY-MM-DD

			var arrDate         = date.split('-');
			var year            = arrDate[0];
			var month           = arrDate[1];
			var day             = arrDate[2];

			var lastTwoCharYear = year.substr(year.length - 2);
			var arrMonth        = [0,3,3,6,1,4,6,2,5,0,3,5];
			var arrCenturyCode  = [6,4,2,0];

			var yearCode     = ( parseInt(lastTwoCharYear) + (parseInt( lastTwoCharYear / 4 )) ) % 7;
			var monthCode    = arrMonth[ parseInt(month - 1) ];
			var centuryCode  = arrCenturyCode[ parseInt( year / 100 ) % 4 ];
			var leapYearCode = 0;

			if( this.isLeapYear(year) && month == '02' ) {
				leapYearCode = -1;
			}

			var result = ( yearCode + monthCode + centuryCode + parseInt(day) + leapYearCode ) % 7;

			return result;
		},
		isLeapYear : function( year ) {
			return ((year % 400 == 0 ) || ( year % 4 == 0 && year % 100 != 0 )) ? true : false;
		},
		getDayName: function( dayNumber ) {
			var arrDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return arrDays[dayNumber];
		},
		twoDigitFormat: function( mm ) {
			if( mm < 10 ) {
			    mm = '0' + mm;
			}

			return String(mm);
		},
		concatWithSeparator: function( arr, separator ) {
			return arr.join(separator);
		},
		toDateFormat: function( date, format ) {

			// EXPECTED DATE DEFAULT FORMAT = YYYY-MM-DD
			var arrDate         = date.split('-');
			var year            = arrDate[0];
			var month           = arrDate[1];
			var day             = arrDate[2];
			var lastTwoCharYear = year.substr(year.length - 2);

			switch( format ) {
				
				// SEPARATOR WITH DASH 

				case 'dd-m-yy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ day, month, lastTwoCharYear ], '-');
					break;
				case 'dd-mm-yy':
					date  = this.concatWithSeparator( [ day, month, lastTwoCharYear ], '-');
					break;
				case 'dd-mmm-yy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ day, month, lastTwoCharYear ], '-');
					break;
				case 'dd-m-yyyy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ day, month, year ], '-');
					break;
				case 'dd-mm-yyyy':
					date  = this.concatWithSeparator( [ day, month, year ], '-');
					break;
				case 'dd-mmm-yyyy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ day, month, year ], '-');
					break;
				case 'm-dd-yy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ month, day, lastTwoCharYear ], '-');
					break;
				case 'mm-dd-yy':
					date  = this.concatWithSeparator( [ month, day, lastTwoCharYear ], '-');
					break;
				case 'mmm-dd-yy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ month, day, lastTwoCharYear ], '-');
					break;
				case 'm-dd-yyyy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ month, day, year ], '-');
					break;
				case 'mm-dd-yyyy':
					date  = this.concatWithSeparator( [ month, day, year ], '-');
					break;
				case 'mmm-dd-yyyy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ month, day, year ], '-');
					break;
				case 'yy-m-dd':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ lastTwoCharYear, month, day ], '-');
					break;
				case 'yy-mm-dd':
					date  = this.concatWithSeparator( [ lastTwoCharYear, month, day ], '-');
					break;
				case 'yy-mmm-dd':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ lastTwoCharYear, month, day ], '-');
					break;
				case 'yyyy-m-dd':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ year, month, day ], '-');
					break;
				case 'yyyy-mm-dd':
					date  = this.concatWithSeparator( [ year, month, day ], '-');
					break;
				case 'yyyy-mmm-dd':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ year, month, day ], '-');
					break;

				// SEPARATOR WITH SLASH
				case 'dd/m/yy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ day, month, lastTwoCharYear ], '/');
					break;
				case 'dd/mm/yy':
					date  = this.concatWithSeparator( [ day, month, lastTwoCharYear ], '/');
					break;
				case 'dd/mmm/yy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ day, month, lastTwoCharYear ], '/');
					break;
				case 'dd/m/yyyy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ day, month, year ], '/');
					break;
				case 'dd/mm/yyyy':
					date  = this.concatWithSeparator( [ day, month, year ], '/');
					break;
				case 'dd/mmm/yyyy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ day, month, year ], '/');
					break;
				case 'm/dd/yy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ month, day, lastTwoCharYear ], '/');
					break;
				case 'mm/dd/yy':
					date  = this.concatWithSeparator( [ month, day, lastTwoCharYear ], '/');
					break;
				case 'mmm/dd/yy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ month, day, lastTwoCharYear ], '/');
					break;
				case 'm/dd/yyyy':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ month, day, year ], '/');
					break;
				case 'mm/dd/yyyy':
					date  = this.concatWithSeparator( [ month, day, year ], '/');
					break;
				case 'mmm/dd/yyyy':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ month, day, year ], '/');
					break;
				case 'yy/m/dd':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ lastTwoCharYear, month, day ], '/');
					break;
				case 'yy/mm/dd':
					date  = this.concatWithSeparator( [ lastTwoCharYear, month, day ], '/');
					break;
				case 'yy/mmm/dd':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ lastTwoCharYear, month, day ], '/');
					break;
				case 'yyyy/m/dd':
					month = this.months[parseInt(month) - 1].name;
					date  = this.concatWithSeparator( [ year, month, day ], '/');
					break;
				case 'yyyy/mm/dd':
					date  = this.concatWithSeparator( [ year, month, day ], '/');
					break;
				case 'yyyy/mmm/dd':
					month = this.months[parseInt(month) - 1].name;
					month = month.substr(0, 3);
					date  = this.concatWithSeparator( [ year, month, day ], '/');
					break;
			}

			return date;
		},
		toValidFormat: function( date ) {

			// EXPECTED DATE DEFAULT FORMAT = YYYY-MM-DD
			var arrDate         = date.split('-');
			var day             = parseInt(arrDate[2]);

			return arrDate[0] + '-' + arrDate[1] + '-' + day;
		},
		getTotalDaysPrevMonth: function( year, month ) {
			if( month == '01' ) {
				month  = '12';
				year  -= 1;
			} else {
				month = this.twoDigitFormat( parseInt(month) - 1 );
			}

			return {
				year      : year,
				month     : month,
				totalDays : this.getTotalDaysInMonth(year, month)
			}
		},
		getTotalDaysNextMonth: function( year, month ) {
			if( month == '12' ) {
				month = '01';
				year  += 1;
			} else {
				month = this.twoDigitFormat( parseInt(month) + 1 );
			}

			return {
				year      : year,
				month     : month
			}
		},
		getLastCountDaysOnPrevMonth: function(year, month, count) {
			var result    = this.getTotalDaysPrevMonth(year, month);
			var totalDays = result.totalDays;
			var start     = totalDays - ( count - 1 );
			var arrDays   = [];

			if( this.isLeapYear(year) && month == '01' ) {
				start = start + 1;
			}

			for( var n = start; n <= totalDays; n++ ) {
				arrDays.push(n);
			}

			return {
				year  : result.year,
				month : result.month,
				days  : arrDays
			};
		},
		getFirstCountDaysOnNextMonth: function(year, month, count) {
			var result    = this.getTotalDaysNextMonth(year, month);
			var arrDays   = [];

			if( this.isLeapYear(year) && month == '01' ) {
				count = count + 1;
			}

			for( var n = 1; n <= count; n++ ) {
				arrDays.push(n);
			}

			return {
				year  : result.year,
				month : result.month,
				days  : arrDays
			};
		}
	}
});