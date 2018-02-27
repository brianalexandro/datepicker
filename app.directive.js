angular.module('ngApp').directive('uiDatepicker', function($document, $filter, $timeout, dateService) {
	return {
		transclude : true,
		replace    : true,
		restrict   : 'E',
		scope	   : {
			selectedDate : "=drModel",
			initMinDate  : "=?",
			initMaxDate  : "=?",
			formatDate   : "@?",
			onChangeDate : "&?",
			className    : "@?",
			isDisabled   : "=?",
			isRequired   : "=?",
			inputName    : "@?drName"
        },
        template : function(element, attrs) {

        	if( !attrs.className ) {
        		attrs.className = '';
        	}

        	return `<div class="wrapper-datepicker">
        				<div class="wrapper-input">
							<input type="text" ng-disabled="isDisabled" ng-model="formattedSelectedDate" ng-attr-name="{{ inputName }}" ng-required="isRequired" ng-focus="isOpen = true" readonly class="form-control ${attrs.className}" />
						</div>
						<div class="wrapper-outer" ng-show="isOpen == true">
							<div class="datepicker">
								<div class="header">
									<div class="left" title="Prev" ng-click="prevMonth()" ng-style="{ visibility : isEnabledPrevMonth() ? 'visible' : 'hidden' }">
										&laquo;
									</div>

									<div class="middle part month">
										<select ng-model="selectedMonth" ng-change="render()" ng-options="row.value as row.name for row in months">
										</select>
									</div>

									<div class="middle part year">
										<select ng-model="selectedYear" ng-change="render()" ng-options="n for n in years">
										</select>
									</div>
									
									<div class="right" title="Next" ng-click="nextMonth()" ng-style="{ visibility : isEnabledNextMonth() ? 'visible' : 'hidden' }">
										&raquo;
									</div>
								</div>
								<div class="content-datepicker">
									<ul class="wrapper-day">
										<li>
											<span>Su</span>
										</li>
										<li>
											<span>Mo</span>
										</li>
										<li>
											<span>Tu</span>
										</li>
										<li>
											<span>We</span>
										</li>
										<li>
											<span>Th</span>
										</li>
										<li>
											<span>Fr</span>
										</li>
										<li>
											<span>Sa</span>
										</li>
									</ul>
									<ul class="wrapper-date">
										<li ng-repeat="row in data" ng-click="!row.disabled && row.isValid && setSelectedDate(row.year, row.month, row.dayNumber)" ng-class="{ valid : row.isValid, active : ( row.year + '-' + row.month + '-' + row.dayNumber == selectedDate ) , holiday : row.dayOfWeek == 0, disabled : row.disabled == true, diffmonth : row.diffMonth == true, 'today' : ( row.year + '-' + row.month + '-' + row.dayNumber == today ) }" title="{{ row.title }}">
											<span ng-bind="{{ row.dayNumber }}">-</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>`;
        },
		link : function($scope, element, attrs) {

			/* 
				EXPECTED directive-model = STRING in YYYY-MM-DD
			*/

	        $scope.init = function() {

	        	element.bind("$destroy", function() {
		            $scope.$destroy();
		        });

	        	$scope.onClickDirective = function(e) {
                   	if( element !== e.target && !element[0].contains(e.target) ) {
                        $scope.$apply(function () {
                        	$scope.isOpen = false;
                        });
                    }
               	};
				$document.on('click', $scope.onClickDirective);

				$scope.$on('$destroy', function() {
			        angular.element(document).off('click', $scope.onClickDirective);
			    });

			    $scope.$watch("initMinDate", function(newValue, oldValue) {
		        	if( newValue != oldValue ) {
		        		if( newValue ) {

							$scope.minDate               = newValue;
							
							if( $scope.selectedDate === undefined ) {
								newValue                     = newValue.split('-');
								$scope.selectedMonth         = newValue[1];
								$scope.selectedYear          = parseInt(newValue[0]);
							}

							if( new Date(newValue) > new Date($scope.selectedDate) ) {
								$scope.selectedDate          = undefined;
								$scope.formattedSelectedDate = undefined;
							}

		        			$scope.render();
		        		}
		        	}
		        });

		        $scope.$watch("initMaxDate", function(newValue, oldValue) {
		        	if( newValue != oldValue ) {
		        		if( newValue ) {
							$scope.maxDate = newValue;

							if( new Date($scope.selectedDate) > new Date(newValue) ) {
								$scope.selectedDate          = undefined;
								$scope.formattedSelectedDate = undefined;
							}

		        			$scope.render();
		        		}
		        	}
		        });

				$scope.$watch("selectedDate", function(newValue, oldValue) {

					var hasChanged = false;

					if( $scope.initMinDate ) {
						$scope.minDate       = $scope.initMinDate;
						
						var Value            = $scope.initMinDate.split('-');
						$scope.selectedMonth = Value[1];
						$scope.selectedYear  = parseInt(Value[0]);

						$scope.render();

						hasChanged = true;
					}

					if( $scope.initMaxDate ) {
						$scope.maxDate = $scope.initMaxDate;
						$scope.render();

						hasChanged = true;
					}

		        	if( newValue != oldValue ) {

		        		if( !hasChanged ) {
		        			if( newValue ) {
			        			newValue             = newValue.split('-');
				        		$scope.selectedMonth = newValue[1];
				        		$scope.selectedYear  = parseInt(newValue[0]);
			        		} else {
			        			$scope.selectedMonth = dateService.twoDigitFormat( new Date().getMonth() + 1 );
								$scope.selectedYear  = new Date().getFullYear();
			        		}
		        		}

		        		$scope.render();
		        	}
		        });

		        // DATE CONFIGURATION

				$scope.isDisabled    = $scope.isDisabled || false;
				$scope.isRequired    = $scope.isRequired || false;
				$scope.inputName     = $scope.inputName  || '';

				$scope.isOpen        = false;
				$scope.months        = dateService.months;

				$scope.selectedMonth = dateService.twoDigitFormat( new Date().getMonth() + 1 );
				$scope.selectedYear  = new Date().getFullYear();

				var minYear          = 1900;
				var maxYear          = $scope.selectedYear + 5;

				$scope.years = [];
				for( var n = minYear; n <= maxYear; n++ ) {
      				$scope.years.push(n); 
				}

				if( $scope.minDate ) {
					$scope.minDate = dateService.toValidFormat($scope.minDate);
				}

				if( $scope.maxDate ) {
					$scope.maxDate = dateService.toValidFormat($scope.maxDate);
				}

				$scope.minDate = $scope.minDate || minYear + '-01-1';
				$scope.maxDate = $scope.maxDate || maxYear + '-12-31';
				
				$scope.defaultFormat = $scope.formatDate || 'dd-mm-yyyy';
				$scope.today         = new Date().toJSON().slice(0,10);
			}

			$scope.prevMonth = function(){
				if( $scope.selectedMonth == '01' ) {
					$scope.selectedMonth  = '12';
					$scope.selectedYear  -= 1;
				} else {
					$scope.selectedMonth = dateService.twoDigitFormat( parseInt($scope.selectedMonth) - 1 );
				}

				$scope.render();
			}

			$scope.nextMonth = function(){
				if( $scope.selectedMonth == '12' ) {
					$scope.selectedMonth  = '01';
					$scope.selectedYear  += 1;
				} else {
					$scope.selectedMonth = dateService.twoDigitFormat( parseInt($scope.selectedMonth) + 1 );
				}

				$scope.render();
			}

			$scope.isEnabledPrevMonth = function(){

				var prevMonth, prevYear;

				if( $scope.selectedMonth == '01' ) {
					prevMonth  = '12';
					prevYear   = $scope.selectedYear - 1; 
				} else {
					prevMonth = dateService.twoDigitFormat( parseInt($scope.selectedMonth) - 1 );
					prevYear  = $scope.selectedYear;
				}

				var prevDate = new Date( prevYear + '-' + prevMonth + '-' + dateService.getTotalDaysInMonth(prevYear, prevMonth));
				return ( prevDate >= new Date( $scope.minDate ));
			}

			$scope.isEnabledNextMonth = function(){

				var nextMonth, nextYear;

				if( $scope.selectedMonth == '12' ) {
					nextMonth  = '01';
					nextYear   = $scope.selectedYear + 1; 
				} else {
					nextMonth = dateService.twoDigitFormat( parseInt( $scope.selectedMonth ) + 1);
					nextYear  = $scope.selectedYear;
				}

				var nextDate = new Date( nextYear + '-' + nextMonth + '-1');
				return ( new Date( $scope.maxDate ) >= nextDate );
			}

			$scope.setSelectedDate = function( year, month, day ) {
				$scope.selectedYear          = year;
				$scope.selectedMonth         = month;

				$scope.selectedDate          = $scope.selectedYear + '-' + $scope.selectedMonth + '-' + day;
				$scope.formattedSelectedDate = dateService.toDateFormat( $scope.selectedYear + '-' + $scope.selectedMonth + '-' + day, $scope.defaultFormat );

				$timeout(function(){
				  	if( $scope.onChangeDate ) {
	        			$scope.onChangeDate();
	        		}
				});
			}

			$scope.render = function() {

				var dd                           = 1;
				var mm                           = $scope.selectedMonth;
				var yyyy                         = $scope.selectedYear;

				var arrSelectedDate              = yyyy + '-' + mm + '-' + dd;
				var dayOfWeek                    = dateService.getDayNameByDate(arrSelectedDate);
				
				var totalDays                    = dateService.getTotalDaysInMonth(yyyy, mm);
				var firstCountDaysNextMonth      = 42 - ( dayOfWeek + totalDays - 1 );
				var arrDate                      = [];

				var objLastCountDaysOnPrevMonth  = dateService.getLastCountDaysOnPrevMonth(yyyy, mm, dayOfWeek);
				var objFirstCountDaysOnNextMonth = dateService.getFirstCountDaysOnNextMonth(yyyy, mm, firstCountDaysNextMonth);

				var minDate                      = $scope.minDate;
				var maxDate                      = $scope.maxDate;

				// GET LIST DATE BEFORE CURRENT MONTH
				for( var i = 0; i < objLastCountDaysOnPrevMonth.days.length; i++ ) {

					var n               = objLastCountDaysOnPrevMonth.days[i];
					var year            = objLastCountDaysOnPrevMonth.year;
					var month           = objLastCountDaysOnPrevMonth.month;

					var arrSelectedDate = year + '-' + month + '-' + dd;
					var prevDayOfWeek   = dateService.getDayNameByDate(arrSelectedDate);

					if( dateService.isLeapYear(yyyy) && (mm == '02') ) {
						prevDayOfWeek = prevDayOfWeek - 1;
					} 

					var curDayOfWeek    = (n - 1 + prevDayOfWeek) % 7;
					
					if( n < 10 ) {
						n = '0' + n;
					}

					var curDay          = year + '-' + month + '-' + n;
					var isDisabled      = false;

					if( minDate !== undefined && maxDate !== undefined ) {
						isDisabled = ( new Date(curDay) < new Date(minDate) || new Date(curDay) > new Date(maxDate) );
					}

					arrDate.push({
						year       : year,
						month      : month,
						dayNumber  : n,
						isValid    : true,
						disabled   : isDisabled,
						title      : dateService.getDayName( curDayOfWeek ) + ', ' + $filter('filter')(dateService.months, { value: month }, true)[0].name + ' ' + n,
						dayOfWeek  : curDayOfWeek,
						weekNumber : Math.ceil( (n + (dayOfWeek)) / 7 ),
						diffMonth  : true
					});
				}

				// GET LIST DATE FOR CURRENT MONTH
				for( var n = 1; n <= totalDays; n++ ) {

					var arrSelectedDate = yyyy + '-' + mm + '-' + dd;
					var currentDayOfWeek       = dateService.getDayNameByDate(arrSelectedDate);

					if( dateService.isLeapYear(yyyy) && mm == '01' ) {
						currentDayOfWeek = currentDayOfWeek - 1;
					}

					var curDayOfWeek    = (n - 1 + currentDayOfWeek) % 7;

					if( n < 10 ) {
						n = '0' + n;
					}
					
					var curDay          = $scope.selectedYear + '-' + mm + '-' + n;
					var isDisabled      = false;

					if( minDate !== undefined && maxDate !== undefined ) {
						isDisabled = ( new Date(curDay) < new Date(minDate) || new Date(curDay) > new Date(maxDate) );
					}					

					arrDate.push({
						year       : $scope.selectedYear,
						month      : $scope.selectedMonth,
						dayNumber  : n,
						isValid    : true,
						disabled   : isDisabled,
						title      : dateService.getDayName( curDayOfWeek ) + ', ' + $filter('filter')(dateService.months, { value: $scope.selectedMonth }, true)[0].name + ' ' + n,
						dayOfWeek  : curDayOfWeek,
						weekNumber : Math.ceil( (n + (currentDayOfWeek)) / 7 ),
						diffMonth  : false
					});
				}

				// GET LIST DATE AFTER CURRENT MONTH
				for( var n = 1; n < objFirstCountDaysOnNextMonth.days.length; n++ ) {

					var year            = objFirstCountDaysOnNextMonth.year;
					var month           = objFirstCountDaysOnNextMonth.month;

					var arrSelectedDate = year + '-' + month + '-' + dd;
					var nextDayOfWeek   = dateService.getDayNameByDate(arrSelectedDate);

					if( dateService.isLeapYear(year) && mm == '12' ) {
						nextDayOfWeek = nextDayOfWeek - 1;
					}

					var curDayOfWeek    = (n - 1 + nextDayOfWeek) % 7;
					
					if( n < 10 ) {
						n = '0' + n;
					}

					var curDay          = year + '-' + month + '-' + n;
					var isDisabled      = false;

					if( minDate !== undefined && maxDate !== undefined ) {
						isDisabled = ( new Date(curDay) < new Date(minDate) || new Date(curDay) > new Date(maxDate) );
					}

					arrDate.push({
						year       : year,
						month      : month,
						dayNumber  : n,
						isValid    : true,
						disabled   : isDisabled,
						title      : dateService.getDayName( curDayOfWeek ) + ', ' + $filter('filter')(dateService.months, { value: month }, true)[0].name + ' ' + n,
						dayOfWeek  : curDayOfWeek,
						weekNumber : Math.ceil( (n + (dayOfWeek)) / 7 ),
						diffMonth  : true
					});
				}

				$scope.data = arrDate;

				// WORK AROUND TO SET INITIAL SELECTED DATE
				$timeout(function(){
					if( $scope.selectedDate ) {
						$scope.selectedDate          = $scope.selectedDate.substring(0,10);
						$scope.formattedSelectedDate = dateService.toDateFormat( $scope.selectedDate, $scope.defaultFormat );
					} else {
						$scope.formattedSelectedDate = '';
					}
				}, 0);
			}

			$scope.init();
			$scope.render();
	    }
	};
});