window.onload = function () {
	var paper = new Raphael("clockPane", 400, 400);

	var c = paper.image("bg.jpg", 0, 0, 400, 400);

	var updated = false;
	var hChange = 0;
	var mChange = 0;
	var sChange = 0;
	var alarmHour = 8;
	var alarmMin = 0;
	var alarmSet = false;
	var timer = 0;
	var startTimer = false;
	var audioOn = false;
	var sound = new Audio("alarm.mp3"); // buffers automatically when created
	var alarmOn = false;

	var digTime = paper.text(200, 50, "time");
	digTime.attr( {
		"font-size":"30", fill:"white"
	});
	var dateToday = new Date();
	var datestring = dateToday.toString();
	var dateText = paper.text(200, 20, datestring.substring(0, 16));
	dateText.attr( {
		fill:"white", "font-size":"12"
	});

	var outerglow = paper.circle(200, 200, 130);
	outerglow.attr( {
		fill:"red", opacity:0.4
	});
	var outerFace = paper.circle(200, 200, 120);
	outerFace.attr( {
		fill: "white", stroke:"red", "stroke-width":"2"
	});
	var face = paper.circle(200, 200, 97);
	face.attr( {
		fill: "black", stroke:"red", "stroke-width":"1", opacity:"0.9"
	});
	
	var hours = paper.rect(197, 200, 6, 65, 150);
		hours.attr( {
			fill: "red"
	});
	var seconds = paper.rect(198.5, 200, 3, 95, 40);
	seconds.attr( {
		fill: "red"
	});
	var mins = paper.rect(197.5, 200, 5, 90, 45);
	mins.attr( {
		fill: "white"
	});
	
	 var midCircle = paper.circle(200, 200, 3);
	 midCircle.attr( {
		fill: "white"
	 });
	
	var t12 = paper.text(200, 92, "12");
	t12.attr( {
		'font-size':15, 'font-weight': 'bold'
	});
	var t1 = paper.text(251.7, 105.7, "1");
	t1.attr( {
		'font-size':13
	});
	var t2 = paper.text(293.3, 146, "2");
	t2.attr( {
		'font-size':13
	});
	var t3 = paper.text(308, 200, "3");
	t3.attr( {
		'font-size':15, 'font-weight': 'bold'
	});
	var t4 = paper.text(293.3, 254.7, "4");
	t4.attr( {
		'font-size':13
	});
	var t5 = paper.text(252.7, 295.3, "5");
	t5.attr( {
		'font-size':13
	});
	var t6 = paper.text(200, 308, "6");
	t6.attr( {
		'font-size':15, 'font-weight': 'bold'
	});
	var t7 = paper.text(143.3, 293.3, "7");
	t7.attr( {
		'font-size':13
	});
	var t8 = paper.text(105.7, 254.7, "8");
	t8.attr( {
		'font-size':13
	});
	var t9 = paper.text(92, 200, "9");
	t9.attr( {
		'font-size':15, 'font-weight': 'bold'
	});
	var t10 = paper.text(106.7, 145.3, "10");
	t10.attr( {
		'font-size':13
	});
	var t11 = paper.text(147.3, 105.7, "11");
	t11.attr( {
		'font-size':13
	});

	//Code for changing between numbers and roman numerals display
	var romanNum = paper.text(28, 200, "VI");
	romanNum.attr( {
		fill:"white", "font-size":"14"
	});
	romanNum.mousedown(function () {
		romanNum.attr( {
			fill:"red", "font-size":"16"
		});
		digitNum.attr( {
			fill:"white", "font-size":"14"
		});
		outerFace.attr( {
			r:122
		});
		t1.attr( {
			text:"I"
		});
		t2.attr( {
			text:"II"
		});
		t3.attr( {
			text:"III"
		});
		t4.attr( {
			text:"IV"
		});
		t5.attr( {
			text:"V"
		});
		t6.attr( {
			text:"VI"
		});
		t7.attr( {
			text:"VII"
		});
		t8.attr( {
			text:"VIII"
		});
		t9.attr( {
			text:"IX"
		});
		t10.attr( {
			text:"X"
		});
		t11.attr( {
			text:"XI"
		});
		t12.attr( {
			text:"XII"
		});
	});
	var sep = paper.text(40, 200, "/");
	sep.attr( {
		fill: "white", "font-size":"14"
	});
	var digitNum = paper.text(50, 200, "6");
	digitNum.attr( {
		fill:"red", "font-size":"16"
	});

	digitNum.mousedown(function () {
		romanNum.attr( {
			fill:"white", "font-size":"14"
		});
		digitNum.attr( {
			fill:"red", "font-size":"16"
		});
		outerFace.attr( {
			r:"120"
		});
		t1.attr( {
			text:"1"
		});
		t2.attr( {
			text:"2"
		});
		t3.attr( {
			text:"3"
		});
		t4.attr( {
			text:"4"
		});
		t5.attr( {
			text:"5"
		});
		t6.attr( {
			text:"6"
		});
		t7.attr( {
			text:"7"
		});
		t8.attr( {
			text:"8"
		});
		t9.attr( {
			text:"9"
		});
		t10.attr( {
			text:"10"
		});
		t11.attr( {
			text:"11"
		});
		t12.attr( {
			text:"12"
		});
	});
	
	//Code for changing time of clock
	var setText = paper.text(338, 303, "Set time");
	setText.attr( {
		fill:"white", "font-size":"18"
	});
	
	var setColons = paper.text(328,339,":");
	setColons.attr({"font-size":"12", fill:"white"});
	var setColons2 = paper.text(348,339,":");
	setColons2.attr({"font-size":"12", fill:"white"});

	var hourChange = paper.text(318, 340, "Change Hour");
	hourChange.attr( {
		fill: "white", "font-size":"14"
	});
	var plusH = paper.text(318, 325, "+");
	plusH.attr( {
		fill:"red", "font-size":"16"
	});
	plusH.mousedown(function () {
		hChange = hChange + 1;
		updated = true;

	});
	var minusH = paper.text(318, 352, "-");
	minusH.attr( {
		fill:"red", "font-size":"16"
	});
	minusH.mousedown(function () {
		hChange = hChange - 1;
		updated = true;
	});

	var minChange = paper.text(338, 340, "Change Mins");
	minChange.attr( {
		fill: "white", "font-size":"14"
	});
	var plusM = paper.text(338, 325, "+");
	plusM.attr( {
		fill:"red", "font-size":"16"
	});
	plusM.mousedown(function () {
		mChange = mChange + 1;
		updated = true;
	});
	var minusM = paper.text(338, 352, "-");
	minusM.attr( {
		fill:"red", "font-size":"16"
	});
	minusM.mousedown(function () {
		mChange = mChange - 1;
		updated = true;
	});

	var secChange = paper.text(358, 340, "Change Mins");
	secChange.attr( {
		fill: "white", "font-size":"14"
	});
	var plusS = paper.text(358, 325, "+");
	plusS.attr( {
		fill:"red", "font-size":"16"
	});
	plusS.mousedown(function () {
		sChange = sChange + 1;
		updated = true;
	});
	var minusS = paper.text(358, 352, "-");
	minusS.attr( {
		fill:"red", "font-size":"16"
	});
	minusS.mousedown(function () {
		sChange = sChange - 1;
		updated = true;
	});

	//Code for setting time to time zones
	var gmtBackground = paper.rect(284, 367, 32, 24, 4);
	gmtBackground.attr( {
		stroke:"red", fill:"red"
	});

	var gmtButton = paper.text(300, 379, "GMT");
	gmtButton.attr( {
		fill:"white", "font-size":"12"
	});
	gmtButton.mousedown(function () {
		updated = false;
		estBackground.attr( {
			fill:""
		});
		gmtBackground.attr( {
			fill:"red"
		});
		cetBackground.attr( {
			fill:""
		});
	});
	var estBackground = paper.rect(322, 367, 32, 24, 4);
	estBackground.attr( {
		stroke:"red"
	});

	var estButton = paper.text(338, 379, "EST");
	estButton.attr( {
		fill:"white", "font-size":"12"
	});
	estButton.mousedown(function () {
		updated = true;
		hChange = 22;
		mChange = 42;
		sChange = 0;
		estBackground.attr( {
			fill:"red"
		});
		gmtBackground.attr( {
			fill:""
		});
		cetBackground.attr( {
			fill:""
		});
	});

	var cetBackground = paper.rect(360, 367, 32, 24, 4);
	cetBackground.attr( {
		stroke:"red"
	});

	var cetButton = paper.text(376, 379, "CET");
	cetButton.attr( {
		fill:"white", "font-size":"12"
	});
	cetButton.mousedown(function () {
		updated = true;
		hChange = 1;
		mChange = 0;
		sChange = 0;

		cetBackground.attr( {
			fill:"red"
		});
		gmtBackground.attr( {
			fill:""
		});
		estBackground.attr( {
			fill:""
		});
	});

	//Code for setting alarm
	var alarmText = paper.text(60, 303, "Set Alarm");
	alarmText.attr( {
		fill:"white", "font-size":"18"
	})

		var hourAlarm = paper.text(48, 340, "07");
	hourAlarm.attr( {
		fill: "white", "font-size":"14"
	});
	var plusAH = paper.text(48, 325, "+");
	plusAH.attr( {
		fill:"red", "font-size":"14"
	});
	plusAH.mousedown(function () {
		alarmHour = alarmHour + 1;

	});
	var minusAH = paper.text(48, 352, "-");
	minusAH.attr( {
		fill:"red", "font-size":"14"
	});
	minusAH.mousedown(function () {
		alarmHour = alarmHour - 1;
	});
	var alarmColon = paper.text(60, 339, ":");
	alarmColon.attr( {
		fill:"white", "font-size":"14"
	});
	var minAlarm = paper.text(72, 340, "00");
	minAlarm.attr( {
		fill: "white", "font-size":"14"
	});
	var plusAM = paper.text(72, 325, "+");
	plusAM.attr( {
		fill:"red", "font-size":"14"
	});
	plusAM.mousedown(function () {
		alarmMin = alarmMin + 1;
	});
	var minusAM = paper.text(72, 352, "-");
	minusAM.attr( {
		fill:"red", "font-size":"14"
	});
	minusAM.mousedown(function () {
		alarmMin = alarmMin - 1;

	});
	var alarmButton = paper.rect(90, 330, 42, 20, 4);
	alarmButton.attr( {
		fill:"red"
	});
	var alarmBut = paper.text(110, 340, "Off");
	alarmBut.attr( {
		fill:"white", "font-size":"14"
	});
	alarmButton.mousedown(function () {
		if (alarmSet == false) {
			alarmSet = true;
			alarmBut.attr( {
				text:"On"
			});
		}
		else {
			alarmSet = false;
			alarmBut.attr( {
				text:"Off"
			});
			alarmMsg.attr( {
				text:""
			});
			alarmMsg2.attr( {
				text:""
			});
			pauseAlarm();
		}
	});
	alarmBut.mousedown(function () {
		if (alarmSet == false) {
			alarmSet = true;
			alarmBut.attr( {
				text:"On"
			});
		}
		else {
			alarmSet = false;
			alarmBut.attr( {
				text:"Off"
			});
			alarmMsg.attr( {
				text:""
			});
			alarmMsg2.attr( {
				text:""
			});
			pauseAlarm();

		}

	});

	//Code for setting timer
	var timerText = paper.text(30, 380, "Timer ");
	timerText.attr( {
		fill:"white", "font-size": "16"
	});
	timerText.mousedown(function () {
		timerDisplay.attr( {
			text:""
		});
		startTimer = false;
		timer10Bg.attr( {
			fill:""
		});
		timer30Bg.attr( {
			fill:""
		});
		timer1Bg.attr( {
			fill:""
		});
		timer5Bg.attr( {
			fill:""
		});


	});
	var timer10Bg = paper.rect(56, 368, 25, 24, 4);
	timer10Bg.attr( {
		stroke:"red"
	});
	var timer10But = paper.text(68, 380, "10s");
	timer10But.attr( {
		fill:"white", "font-size":"12"
	});
	timer10But.mousedown(function () {
		timer = 10;
		timerDisplay.attr( {
			text:timer
		});
		timer10Bg.attr( {
			fill:"red"
		});
		timer30Bg.attr( {
			fill : ""
		});
		timer1Bg.attr( {
			fill : ""
		});
		timer5Bg.attr( {
			fill : ""
		});
	});

	var timer30Bg = paper.rect(86, 368, 25, 24, 4);
	timer30Bg.attr( {
		stroke:"red"
	});
	var timer30But = paper.text(98, 380, "30s");
	timer30But.attr( {
		fill:"white", "font-size":"12"
	});
	timer30But.mousedown(function () {
		timer = 30;
		timer30Bg.attr( {
			fill:"red"
		});
		timerDisplay.attr( {
			text:timer
		});
		timer10Bg.attr( {
			fill : ""
		});
		timer1Bg.attr( {
			fill : ""
		});
		timer5Bg.attr( {
			fill : ""
		});
	});

	var timer1Bg = paper.rect(116, 368, 25, 24, 4);
	timer1Bg.attr( {
		stroke:"red"
	});
	var timer1But = paper.text(128, 380, "1m");
	timer1But.attr( {
		fill:"white", "font-size":"12"
	});
	timer1But.mousedown(function () {
		timer = 60;
		timer1Bg.attr( {
			fill:"red"
		});
		timerDisplay.attr( {
			text:timer
		});
		timer30Bg.attr( {
			fill : ""
		});
		timer10Bg.attr( {
			fill : ""
		});
		timer5Bg.attr( {
			fill : ""
		});
	});

	var timer5Bg = paper.rect(146, 368, 25, 24, 4);
	timer5Bg.attr( {
		stroke:"red"
	});
	var timer5But = paper.text(158, 380, "5m");
	timer5But.attr( {
		fill:"white", "font-size":"12"
	});
	timer5But.mousedown(function () {
		timer = 300;
		timer5Bg.attr( {
			fill:"red"
		});
		timerDisplay.attr( {
			text:timer
		});
		timer1Bg.attr( {
			fill : ""
		});
		timer10Bg.attr( {
			fill : ""
		});
		timer30Bg.attr( {
			fill : ""
		});
	});

	var timerButton = paper.rect(180, 368, 42, 25, 4);
	timerButton.attr( {
		fill:"red"
	});
	var timerBut = paper.text(200, 380, "Start");
	timerBut.attr( {
		fill:"white", "font-size":"14"
	});
	timerBut.mousedown(function () {
		if (startTimer == true) {
			startTimer = false;
			timerBut.attr( {
				text:"Start"
			});
		}
		else {
			startTimer = true;
			timerBut.attr( {
				text:"Stop"
			});
		}

	});
	timerButton.mousedown(function () {
		if (startTimer == true) {
			startTimer = false;
			timerBut.attr( {
				text:"Start"
			});
		}
		else {
			startTimer = true;
			timerBut.attr( {
				text:"Stop"
			});
		}

	});

	var timerDisplay = paper.text(200, 350, "");
	timerDisplay.attr( {
		fill:"white", "font-size":"20"
	});

	
	//Main function checks the current time, adjusts the clock and calls functions for alarm/timer/set time
	function startTime() {
		var today = new Date();
		if (updated == true) {
			gmtBackground.attr( {
				fill:""
			});
			var s = today.getSeconds() + Number(sChange);
			var m = Number(today.getMinutes()) + Number(mChange);
			var h = Number(today.getHours()) + Number(hChange);
			if (h == (today.getHours() + 1) && m == today.getMinutes() && s == today.getSeconds()) {
				cetBackground.attr( {
					fill:"red"
				});
				estBackground.attr( {
					fill:""
				});
				gmtBackground.attr( {
					fill:""
				});
			}
			if (h == (today.getHours() - 2) && m == (today.getMinutes() - 18) && s == today.getSeconds()) {
				estBackground.attr( {
					fill:"red"
				});
				cetBackground.attr( {
					fill:""
				});
				gmtBackground.attr( {
					fill:""
				});
			}
			if (h == today.getHours() && m == today.getMinutes() && s == today.getSeconds()) {
				gmtBackground.attr( {
					fill:"red"
				});
				cetBackground.attr( {
					fill:""
				});
				estBackground.attr( {
					fill:""
				});
			}
			var checkedtimes = checkT(s, m, h);
			s = checkedtimes[0];
			m = checkedtimes[1];
			h = checkedtimes[2];


		}
		else {
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
			mChange = 0;
			hChange = 0;
			sChange = 0;
		}
		wm = checkTime(m);
		ws = checkTime(s);
		wh = checkTime(h);
		var alarmchecked = checkT("0", alarmMin, alarmHour);
		alarmHour = alarmchecked[2];
		alarmMin = alarmchecked[1];
		var alHour = checkTime(alarmHour);
		var alMin = checkTime(alarmMin);
		hourAlarm.attr( {
			text: alHour
		});
		minAlarm.attr( {
			text: alMin
		});
		var dig = wh + ":" + wm + ":" + ws;
		digTime.attr( {
			text: dig
		});
		hourChange.attr( {
			text: wh
		});
		minChange.attr( {
			text: wm
		});
		secChange.attr( {
			text:ws
		});
		seconds.animate( {
			transform: ['r', 180 + (ws * 6), 200, 200]
		});
		mins.animate( {
			transform: ['r', 180 + (wm * 6) + (ws * 0.1), 200, 200]
		});
		hours.animate( {
			transform: ['r', 180 + (wh * 30) + (wm * 0.5), 200, 200]
		});
		if (alarmSet == true) {
			alarm(h, m);
		}
		if (startTimer == true) {
			timerDo();
		}
		setTimeout(function () {
			startTime()
		}, 1000);

	};

	//controls the alarm sound
	function playAlarm() {
		if (audioOn == false) {
			sound.play();
			audioOn = true;
		};
	}
	function pauseAlarm() {
		if (audioOn == true) {
			sound.pause();
			audioOn = false;
		}
	}
	
	var alarmMsg = paper.text(200, 160, "");
	var alarmMsg2 = paper.text(200, 200, "");

	//Code to perform alarm function; check if alarm set/is now and display warning when the time matches alarm
	function alarm(h, m) {
		if (alarmSet == true) {
			if ((alarmHour == h & alarmMin == m )|| alarmOn == true) {

				playAlarm();
				alarmOn = true;
				var alarmCover = paper.circle(200, 200, 125);
				alarmCover.attr( {
					stroke: "red", "stroke-width":"10", fill: "white", opacity: 0
				}).animate( {
					opacity: 1
				}, 1000, function () {
					this.animate( {
						opacity: 0.1
					}, 1500, function () {
						this.remove();
					});
				});

				alarmMsg.attr( {
					"font-size":"18"
				});
				alarmMsg.toFront();
				alarmMsg2.toFront();
				alarmMsg.attr( {
					text:"ALARM: " + h + ":" + m, "font-size":"16", "font-weight":"bold"
				});
				alarmMsg2.attr( {
					text:"Click HERE to return to clock ", "font-size":"14",
				});
				alarmMsg2.mousedown(function () {
					alarmMsg.attr( {
						text:""
					});
					alarmMsg2.attr( {
						text:""
					});
					alarmCover.attr( {
						fill:"red"
					});
					pauseAlarm();
					alarmSet = false;
					alarmOn = false;
				});
				alarmCover.mousedown(function () {


					alarmMsg.attr( {
						text:""
					});
					alarmMsg2.attr( {
						text:""
					});
					alarmCover.attr( {
						fill:"red"
					});
					pauseAlarm();
					alarmSet = false;
					alarmOn = false;
				});
			}
			else {
				alarmMsg.attr( {
					text:""
				});
				alarmMsg2.attr( {
					text: ""
				});
				pauseAlarm();
			}
		}
		else {
			alarmMsg.attr( {
				text:""
			});
			alarmMsg2.attr( {
				text:""
			});
			pauseAlarm();
		}
	}
	
	//Code to perform timer function; check if timer is set, if set then decrease timer by 1 each second and display warning when the timer runs out

	var timerMsg = paper.text(200, 170, "");
	var timerMsg2 = paper.text(200, 210, "");

	function timerDo() {
		if (startTimer == true) {
			if (timer > 0) {
				timer = timer - 1;
				timerDisplay.attr( {
					text:(timer)
				});
			}

			else {
				playAlarm();
				timerBut.attr( {
					text:"Start"
				});

				timerMsg.attr( {
					"font-size":"18"
				});
				var timerCover = paper.circle(200, 200, 125);
				timerCover.attr( {
					stroke: "red", "stroke-width":"10", fill: "white", opacity: 0
				}).animate( {
					opacity: 1
				}, 1000, function () {
					this.animate( {
						opacity: 0.1
					}, 1500, function () {
						this.remove();
					});
				});
				timerMsg.toFront();
				timerMsg2.toFront();
				timerMsg.attr( {
					text:"TIME IS UP!", "font-size":"16", "font-weight":"bold"
				});
				timerMsg2.attr( {
					text:"Click HERE to return to clock", "font-size":"14", "font-weight":"bold"
				});

				timerDisplay.attr( {
					text:""
				});

				timerMsg2.mousedown(function () {
					timerMsg.attr( {
						text:""
					});
					timerMsg2.attr( {
						text: ""
					});
					timerCover.attr( {
						fill:"red"
					});
					pauseAlarm();
					alarmBut.attr( {
						text:"Off"
					});
					startTimer = false;
				});
				timerCover.mousedown(function () {
					timerMsg.attr( {
						text: ""
					});
					timerMsg2.attr( {
						text: ""
					});
					timerCover.attr( {
						fill:"red"
					});
					pauseAlarm();
					alarmBut.attr( {
						text:"Off"
					});

					startTimer = false;
				});
			}
		}
		else {
			timerMsg.attr( {
				text:""
			});
			timerMsg2.attr( {
				text: ""
			});
			pauseAlarm();
			alarmBut.attr( {
				text:"Off"
			});

		}
	}

	
	function checkTime(i) {

	var iString = "" + i;
		var val1 = iString.length;

		if (i < 10 && val1 == 1) {
			i = "0" + i
		};  // add zero in front of numbers < 10
		return i;
	}
	
	//Fixes time to be valid i.e. 25hr is set back to 01hr
	function checkT(s, m, h) {
		
		if (s > 59) {
			s = s - 60;
			m = m + 1;
		}
		if (s < 0) {
			s = 59;
			m = m - 1;
		}
		if (m > 59) {
			m = m - 60;
			h = h + 1;
		}
		if (m < 0) {
			m = 59;
			h = h - 1;
		}
		if (h > 23) {
			h = h - 24;
		}
		if (h < 0) {
			h = 23;
		}
		var checkedtimes = [s, m, h];
		return checkedtimes;
	}
	
	startTime(); //Function call that starts the startTime function.
};
