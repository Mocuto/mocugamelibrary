(function() {
    ShrioGame.Level1 = function (shrioState) {
        MocuGame.MocuGroup.call(this);
		var Object0 = new ShrioGame.Lo(new MocuGame.Point(3040 , 770.133333333338), 15, shrioState);
		var slot123 = new MocuGame.TimeSlot(123);	 //Start
		slot123.addEvent(new MocuGame.Event(Object0, "x", "current", 1515, 200));
		Object0.timeline.addSlot(slot123);
		var slot323 = new MocuGame.TimeSlot(323);	 //Pause
		slot323.addEvent(new MocuGame.Event(Object0, "velocity.x", 1, 0, 1));
		Object0.timeline.addSlot(slot323);
		var slot420 = new MocuGame.TimeSlot(420);	 //Exit
		slot420.addEvent(new MocuGame.Event(Object0, "velocity,y", 1, -3, 1));
		slot420.addEvent(new MocuGame.Event(Object0, "shooting", true, false, 1));
		Object0.timeline.addSlot(slot420);
		this.add(Object0);
		var Spin11 = new ShrioGame.Spinfodder(new MocuGame.Point(5133.66666666659 , 794.733333333334), 3, shrioState);
		Spin11.name = "Spin1"; 
		var slot640 = new MocuGame.TimeSlot(640);	 //Start
		slot640.addEvent(new MocuGame.Event(Spin11, "velocity.x", 1, -5, 1));
		Spin11.timeline.addSlot(slot640);
		this.add(Spin11);
		var Object2 = new ShrioGame.Lo(new MocuGame.Point(4643.33333333337 , 1133.46666666673), 3, shrioState);
		var slot504 = new MocuGame.TimeSlot(504);	 //Start
		slot504.addEvent(new MocuGame.Event(Object2, "x", "current", 1515, 120));
		Object2.timeline.addSlot(slot504);
		var slot624 = new MocuGame.TimeSlot(624);	 //Pause
		slot624.addEvent(new MocuGame.Event(Object2, "velocity.x", 1, 0, 1));
		Object2.timeline.addSlot(slot624);
		var slot740 = new MocuGame.TimeSlot(740);	 //Exit
		slot740.addEvent(new MocuGame.Event(Object2, "velocity.y", 1, 5, 1));
		slot740.addEvent(new MocuGame.Event(Object2, "shooting", true, false, 1));
		Object2.timeline.addSlot(slot740);
		this.add(Object2);
		var Object3 = new ShrioGame.Spinfodder(new MocuGame.Point(5620.33333333329 , 791.399999999997), 3, shrioState);
		var slot600 = new MocuGame.TimeSlot(600);	 //Start
		slot600.addEvent(new MocuGame.Event(Object3, "velocity.x", 1, -3, 1));
		Object3.timeline.addSlot(slot600);
		this.add(Object3);
		var Object4 = new ShrioGame.Lo(new MocuGame.Point(3666.66666666679 , 336.800000000004), 3, shrioState);
		var slot240 = new MocuGame.TimeSlot(240);	 //Start
		slot240.addEvent(new MocuGame.Event(Object4, "x", "current", 1515, 100));
		Object4.timeline.addSlot(slot240);
		var slot360 = new MocuGame.TimeSlot(360);	 //Pause
		slot360.addEvent(new MocuGame.Event(Object4, "velocity.x", 1, 0, 1));
		Object4.timeline.addSlot(slot360);
		var slot480 = new MocuGame.TimeSlot(480);	 //Exit
		slot480.addEvent(new MocuGame.Event(Object4, "velocity.x", 0, 1, 1));
		slot480.addEvent(new MocuGame.Event(Object4, "shooting", true, false, 1));
		Object4.timeline.addSlot(slot480);
		this.add(Object4);
		var Object5 = new ShrioGame.Lo(new MocuGame.Point(0 , 0), 3, shrioState);
		Object5.exists = false; 
		this.add(Object5);
		var Object6 = new ShrioGame.Lo(new MocuGame.Point(2732 , 0), 3, shrioState);
		Object6.exists = false; 
		this.add(Object6);
		var Object7 = new ShrioGame.Lo(new MocuGame.Point(2732 , 1536), 3, shrioState);
		Object7.exists = false; 
		this.add(Object7);
		var Object8 = new ShrioGame.Lo(new MocuGame.Point(0 , 1536), 3, shrioState);
		Object8.exists = false; 
		this.add(Object8);
		var Object9 = new ShrioGame.Lo(new MocuGame.Point(5550.00000000023 , 366.799999999999), 3, shrioState);
		var slot720 = new MocuGame.TimeSlot(720);	 //Start
		slot720.addEvent(new MocuGame.Event(Object9, "x", "current", 1515, 180));
		Object9.timeline.addSlot(slot720);
		var slot840 = new MocuGame.TimeSlot(840);	 //Pause
		slot840.addEvent(new MocuGame.Event(Object9, "velocity.x", 1, 0, 1));
		Object9.timeline.addSlot(slot840);
		var slot960 = new MocuGame.TimeSlot(960);	 //Exit
		slot960.addEvent(new MocuGame.Event(Object9, "velocity.y", 1, 5, 1));
		slot960.addEvent(new MocuGame.Event(Object9, "shooting", true, false, 1));
		Object9.timeline.addSlot(slot960);
		this.add(Object9);
		var Object10 = new ShrioGame.Lo(new MocuGame.Point(6030.00000000047 , 773.466666666733), 10, shrioState);
		var slot841 = new MocuGame.TimeSlot(841);	 //Start
		slot841.addEvent(new MocuGame.Event(Object10, "x", "current", 1515, 180));
		Object10.timeline.addSlot(slot841);
		var slot961 = new MocuGame.TimeSlot(961);	 //Pause
		slot961.addEvent(new MocuGame.Event(Object10, "velocity.x", 1, 0, 1));
		Object10.timeline.addSlot(slot961);
		var slot1080 = new MocuGame.TimeSlot(1080);	 //Exit
		slot1080.addEvent(new MocuGame.Event(Object10, "velocity.x", 1, -5, 1));
		slot1080.addEvent(new MocuGame.Event(Object10, "shooting", true, false, 1));
		Object10.timeline.addSlot(slot1080);
		this.add(Object10);
		var Object11 = new ShrioGame.Spinfodder(new MocuGame.Point(5880.33333333336 , 1218.06666666675), 3, shrioState);
		var slot660 = new MocuGame.TimeSlot(660);	 //Start
		slot660.addEvent(new MocuGame.Event(Object11, "velocity.x", 1, -3, 1));
		Object11.timeline.addSlot(slot660);
		this.add(Object11);
		var Object12 = new ShrioGame.Plano(new MocuGame.Point(4073.33333333333 , 463.733333333333), 3, shrioState);
		var slot300 = new MocuGame.TimeSlot(300);	 //Start
		slot300.addEvent(new MocuGame.Event(Object12, "moveSpeed", 3, 7, 1));
		Object12.timeline.addSlot(slot300);
		this.add(Object12);
		var Object13 = new ShrioGame.Plano(new MocuGame.Point(4306.66666666678 , 457.066666666666), 3, shrioState);
		var slot300 = new MocuGame.TimeSlot(300);	 //Start
		slot300.addEvent(new MocuGame.Event(Object13, "moveSpeed", 3, 7, 1));
		Object13.timeline.addSlot(slot300);
		this.add(Object13);
		var Object14 = new ShrioGame.Plano(new MocuGame.Point(4546.66666666676 , 463.733333333332), 3, shrioState);
		var slot300 = new MocuGame.TimeSlot(300);	 //Start
		slot300.addEvent(new MocuGame.Event(Object14, "moveSpeed", 3, 7, 1));
		Object14.timeline.addSlot(slot300);
		this.add(Object14);
		var Object15 = new ShrioGame.Plano(new MocuGame.Point(5000 , 1230), 3, shrioState);
		var slot500 = new MocuGame.TimeSlot(500);	 //Start
		slot500.addEvent(new MocuGame.Event(Object15, "moveSpeed", 3, 7, 1));
		Object15.timeline.addSlot(slot500);
		var slot700 = new MocuGame.TimeSlot(700);	 //Turn
		slot700.addEvent(new MocuGame.Event(Object15, "moveAngle", 180, 270, 30));
		Object15.timeline.addSlot(slot700);
		this.add(Object15);
		var Object16 = new ShrioGame.Plano(new MocuGame.Point(5180 , 1230), 3, shrioState);
		var slot500 = new MocuGame.TimeSlot(500);	 //Start
		slot500.addEvent(new MocuGame.Event(Object16, "moveSpeed", 3, 7, 1));
		Object16.timeline.addSlot(slot500);
		var slot760 = new MocuGame.TimeSlot(760);	 //Turn
		slot760.addEvent(new MocuGame.Event(Object16, "moveAngle", 180, 270, 30));
		Object16.timeline.addSlot(slot760);
		this.add(Object16);
		var Object17 = new ShrioGame.Plano(new MocuGame.Point(5369 , 1230), 3, shrioState);
		var slot500 = new MocuGame.TimeSlot(500);	 //Start
		slot500.addEvent(new MocuGame.Event(Object17, "moveSpeed", 3, 7, 1));
		Object17.timeline.addSlot(slot500);
		var slot800 = new MocuGame.TimeSlot(800);	 //Turn
		slot800.addEvent(new MocuGame.Event(Object17, "moveAngle", 180, 270, 30));
		Object17.timeline.addSlot(slot800);
		this.add(Object17);
		var Object18 = new ShrioGame.Plano(new MocuGame.Point(6120 , 530.399999999996), 3, shrioState);
		var slot620 = new MocuGame.TimeSlot(620);	 //Start
		slot620.addEvent(new MocuGame.Event(Object18, "moveSpeed", 3, 7, 1));
		Object18.timeline.addSlot(slot620);
		this.add(Object18);
		var Object19 = new ShrioGame.Plano(new MocuGame.Point(6360 , 530.399999999996), 3, shrioState);
		var slot620 = new MocuGame.TimeSlot(620);	 //Start
		slot620.addEvent(new MocuGame.Event(Object19, "moveSpeed", 3, 7, 1));
		Object19.timeline.addSlot(slot620);
		this.add(Object19);
		var Object20 = new ShrioGame.Plano(new MocuGame.Point(6600.00000000011 , 530.399999999996), 3, shrioState);
		var slot620 = new MocuGame.TimeSlot(620);	 //Start
		slot620.addEvent(new MocuGame.Event(Object20, "moveSpeed", 3, 7, 1));
		Object20.timeline.addSlot(slot620);
		this.add(Object20);
		var Object21 = new ShrioGame.Duspinfodder(new MocuGame.Point(6000 , 297.066666666666), 3, shrioState);
		Object21.hp = 10; 
		this.add(Object21);
		var Object22 = new ShrioGame.Dekplane(new MocuGame.Point(5993.33333333329 , 1057.0666666666), 10, shrioState);
		this.add(Object22);
		var Object23 = new ShrioGame.Plano(new MocuGame.Point(7380.00000000008 , 943.73333333333), 3, shrioState);
		var slot620 = new MocuGame.TimeSlot(620);	 //Start
		slot620.addEvent(new MocuGame.Event(Object23, "moveSpeed", 3, 7, 1));
		Object23.timeline.addSlot(slot620);
		this.add(Object23);
		var Object24 = new ShrioGame.Plano(new MocuGame.Point(6846.6666666668 , 537.066666666663), 3, shrioState);
		var slot620 = new MocuGame.TimeSlot(620);	 //Start
		slot620.addEvent(new MocuGame.Event(Object24, "moveSpeed", 3, 7, 1));
		Object24.timeline.addSlot(slot620);
		this.add(Object24);
		var Object25 = new ShrioGame.Plano(new MocuGame.Point(7113.33333333337 , 763.733333333331), 3, shrioState);
		var slot620 = new MocuGame.TimeSlot(620);	 //Start
		slot620.addEvent(new MocuGame.Event(Object25, "moveSpeed", 3, 7, 1));
		Object25.timeline.addSlot(slot620);
		this.add(Object25);
		var Object26 = new ShrioGame.Dekplane(new MocuGame.Point(6200 , -76.2666666666676), 3, shrioState);
		this.add(Object26);
		var Object27 = new ShrioGame.Duspinfodder(new MocuGame.Point(6573.33333333341 , 1163.73333333338), 3, shrioState);
		Object27.hp = 10; 
		this.add(Object27);
		var Object28 = new ShrioGame.Lo(new MocuGame.Point(4269.99999999991 , 813.466666666693), 3, shrioState);
		var slot300 = new MocuGame.TimeSlot(300);	 //Start
		slot300.addEvent(new MocuGame.Event(Object28, "x", "current", 1515, 120));
		Object28.timeline.addSlot(slot300);
		var slot500 = new MocuGame.TimeSlot(500);	 //Pause
		slot500.addEvent(new MocuGame.Event(Object28, "velocity.x", 1, 0, 1));
		Object28.timeline.addSlot(slot500);
		var slot700 = new MocuGame.TimeSlot(700);	 //Exit
		slot700.addEvent(new MocuGame.Event(Object28, "velocity.y", 1, 5, 1));
		slot700.addEvent(new MocuGame.Event(Object28, "shooting", true, false, 1));
		Object28.timeline.addSlot(slot700);
		this.add(Object28);
		var Object29 = new ShrioGame.Plano(new MocuGame.Point(4793.33333333355 , 463.733333333331), 3, shrioState);
		var slot300 = new MocuGame.TimeSlot(300);	 //Start
		slot300.addEvent(new MocuGame.Event(Object29, "moveSpeed", 3, 7, 1));
		Object29.timeline.addSlot(slot300);
		var slot480 = new MocuGame.TimeSlot(480);	 //Turn
		slot480.addEvent(new MocuGame.Event(Object29, "moveAngle", "current", 135, 60));
		Object29.timeline.addSlot(slot480);
		this.add(Object29);
		var Object30 = new ShrioGame.Plano(new MocuGame.Point(5040.00000000034 , 457.066666666665), 3, shrioState);
		var slot300 = new MocuGame.TimeSlot(300);	 //Start
		slot300.addEvent(new MocuGame.Event(Object30, "moveSpeed", 3, 7, 1));
		Object30.timeline.addSlot(slot300);
		var slot480 = new MocuGame.TimeSlot(480);	 //Turn
		slot480.addEvent(new MocuGame.Event(Object30, "moveAngle", "current", 215, 60));
		Object30.timeline.addSlot(slot480);
		this.add(Object30);
		var Object31 = new ShrioGame.Lo(new MocuGame.Point(5253.3333333333 , 1950.39999999989), 10, shrioState);
		var slot500 = new MocuGame.TimeSlot(500);	 //Start
		slot500.addEvent(new MocuGame.Event(Object31, "velocity.y", 1, -5, 1));
		Object31.timeline.addSlot(slot500);
		var slot700 = new MocuGame.TimeSlot(700);	 //Pause
		slot700.addEvent(new MocuGame.Event(Object31, "velocity.y", "current", 0, 1));
		Object31.timeline.addSlot(slot700);
		var slot900 = new MocuGame.TimeSlot(900);	 //Exit
		slot900.addEvent(new MocuGame.Event(Object31, "shooting", true, false, 1));
		slot900.addEvent(new MocuGame.Event(Object31, "velocity.x", "current", -5, 1));
		Object31.timeline.addSlot(slot900);
		this.add(Object31);
		var Object32 = new ShrioGame.Spinfodder(new MocuGame.Point(7866.66666666663 , 417.066666666671), 10, shrioState);
		var slot700 = new MocuGame.TimeSlot(700);	 //Start
		slot700.addEvent(new MocuGame.Event(Object32, "velocity.x", 1, -5, 1));
		Object32.timeline.addSlot(slot700);
		this.add(Object32);
		var Object33 = new ShrioGame.Spinfodder(new MocuGame.Point(7879.99999999993 , 1290.4), 10, shrioState);
		var slot700 = new MocuGame.TimeSlot(700);	 //Start
		slot700.addEvent(new MocuGame.Event(Object33, "velocity.x", 1, -5, 1));
		Object33.timeline.addSlot(slot700);
		this.add(Object33);
		var Object34 = new ShrioGame.Duspinfodder(new MocuGame.Point(7513.33333333315 , 810.400000000006), 3, shrioState);
		var slot650 = new MocuGame.TimeSlot(650);	 //Start
		slot650.addEvent(new MocuGame.Event(Object34, "velocity.x", "current", -5, 1));
		Object34.timeline.addSlot(slot650);
		this.add(Object34);
		var Object35 = new ShrioGame.Duspinfodder(new MocuGame.Point(8133.33333333343 , 890.4), 3, shrioState);
		var slot720 = new MocuGame.TimeSlot(720);	 //Start
		slot720.addEvent(new MocuGame.Event(Object35, "velocity.x", "current", -5, 1));
		Object35.timeline.addSlot(slot720);
		this.add(Object35);
		var Object36 = new ShrioGame.Dekplane(new MocuGame.Point(7740.00000000049 , 730.399999999984), 3, shrioState);
		var slot950 = new MocuGame.TimeSlot(950);	 //Start
		slot950.addEvent(new MocuGame.Event(Object36, "x", "current", 2732, 1));
		Object36.timeline.addSlot(slot950);
		this.add(Object36);
		var Object37 = new ShrioGame.Plano(new MocuGame.Point(8726 , 730.399999999998), 3, shrioState);
		Object37.velocity.x = 0; 
		var slot2000 = new MocuGame.TimeSlot(2000);	 //Start
		slot2000.addEvent(new MocuGame.Event(Object37, "moveSpeed", 1, 10, 10));
		slot2000.addEvent(new MocuGame.Event(Object37, "x", "current", 2732, 1));
		Object37.timeline.addSlot(slot2000);
		this.add(Object37);
		var Object38 = new ShrioGame.Plano(new MocuGame.Point(8992.66666666666 , 477.066666666665), 3, shrioState);
		Object38.velocity.x = 0; 
		var slot2060 = new MocuGame.TimeSlot(2060);	 //Start
		slot2060.addEvent(new MocuGame.Event(Object38, "moveSpeed", 1, 10, 10));
		slot2060.addEvent(new MocuGame.Event(Object38, "x", "current", 2732, 1));
		Object38.timeline.addSlot(slot2060);
		this.add(Object38);
		var Object39 = new ShrioGame.Plano(new MocuGame.Point(9006 , 977.066666666666), 3, shrioState);
		Object39.velocity.x = 0; 
		var slot2060 = new MocuGame.TimeSlot(2060);	 //Start
		slot2060.addEvent(new MocuGame.Event(Object39, "moveSpeed", 1, 10, 10));
		slot2060.addEvent(new MocuGame.Event(Object39, "x", "current", 2732, 1));
		Object39.timeline.addSlot(slot2060);
		this.add(Object39);
		var Object40 = new ShrioGame.Plano(new MocuGame.Point(9552.66666666668 , 710.399999999998), 3, shrioState);
		Object40.velocity.x = 0; 
		var slot2180 = new MocuGame.TimeSlot(2180);	 //Start
		slot2180.addEvent(new MocuGame.Event(Object40, "moveSpeed", 1, 10, 10));
		slot2180.addEvent(new MocuGame.Event(Object40, "x", "current", 2732, 1));
		Object40.timeline.addSlot(slot2180);
		this.add(Object40);
		var Object41 = new ShrioGame.Plano(new MocuGame.Point(9872.66666666667 , 463.733333333331), 3, shrioState);
		Object41.velocity.x = 0; 
		var slot2240 = new MocuGame.TimeSlot(2240);	 //Start
		slot2240.addEvent(new MocuGame.Event(Object41, "moveSpeed", 1, 10, 10));
		slot2240.addEvent(new MocuGame.Event(Object41, "x", "current", 2732, 1));
		Object41.timeline.addSlot(slot2240);
		this.add(Object41);
		var Object42 = new ShrioGame.Plano(new MocuGame.Point(9892.66666666668 , 997.066666666648), 3, shrioState);
		Object42.velocity.x = 0; 
		var slot2240 = new MocuGame.TimeSlot(2240);	 //Start
		slot2240.addEvent(new MocuGame.Event(Object42, "moveSpeed", 1, 10, 10));
		slot2240.addEvent(new MocuGame.Event(Object42, "x", "current", 2732, 1));
		Object42.timeline.addSlot(slot2240);
		this.add(Object42);
		var Object43 = new ShrioGame.Lo(new MocuGame.Point(9786.66666666666 , 490.399999999999), 3, shrioState);
		Object43.velocity.x = 0; 
		var slot2090 = new MocuGame.TimeSlot(2090);	 //Start
		slot2090.addEvent(new MocuGame.Event(Object43, "x", 2732, 2732-900, 200));
		Object43.timeline.addSlot(slot2090);
		var slot2490 = new MocuGame.TimeSlot(2490);	 //Exit
		slot2490.addEvent(new MocuGame.Event(Object43, "velocity.x", "current", -10, 1));
		slot2490.addEvent(new MocuGame.Event(Object43, "shooting", true, false, 1));
		Object43.timeline.addSlot(slot2490);
		this.add(Object43);
		var Object44 = new ShrioGame.Lo(new MocuGame.Point(9273.33333333333 , 670.399999999997), 3, shrioState);
		Object44.velocity.x = 0; 
		var slot2090 = new MocuGame.TimeSlot(2090);	 //Start
		slot2090.addEvent(new MocuGame.Event(Object44, "x", 2732, 2732-900, 200));
		Object44.timeline.addSlot(slot2090);
		var slot2490 = new MocuGame.TimeSlot(2490);	 //Exit
		slot2490.addEvent(new MocuGame.Event(Object44, "velocity.x", "current", -10, 1));
		slot2490.addEvent(new MocuGame.Event(Object44, "shooting", true, false, 1));
		Object44.timeline.addSlot(slot2490);
		this.add(Object44);
		var Object45 = new ShrioGame.Lo(new MocuGame.Point(9273.33333333332 , 1077.0666666667), 3, shrioState);
		Object45.velocity.x = 0; 
		var slot2090 = new MocuGame.TimeSlot(2090);	 //Start
		slot2090.addEvent(new MocuGame.Event(Object45, "x", 2732, 2732-900, 200));
		Object45.timeline.addSlot(slot2090);
		var slot2490 = new MocuGame.TimeSlot(2490);	 //Exit
		slot2490.addEvent(new MocuGame.Event(Object45, "velocity.x", "current", -10, 1));
		slot2490.addEvent(new MocuGame.Event(Object45, "shooting", true, false, 1));
		Object45.timeline.addSlot(slot2490);
		this.add(Object45);
		var Object46 = new ShrioGame.Spinfodder(new MocuGame.Point(10286.6666666667 , 270.4), 3, shrioState);
		var slot2360 = new MocuGame.TimeSlot(2360);	 //Start
		slot2360.addEvent(new MocuGame.Event(Object46, "x", "current", 2732, 1));
		slot2360.addEvent(new MocuGame.Event(Object46, "velocity.x", "current", -5, 1));
		Object46.timeline.addSlot(slot2360);
		this.add(Object46);
		var Object47 = new ShrioGame.Dudekplane(new MocuGame.Point(10186.6666666665 , 617.066666666663), 3, shrioState);
		var slot2360 = new MocuGame.TimeSlot(2360);	 //Start
		slot2360.addEvent(new MocuGame.Event(Object47, "x", "current", 2732-200, 1));
		Object47.timeline.addSlot(slot2360);
		this.add(Object47);
		var Object48 = new ShrioGame.Spinfodder(new MocuGame.Point(10259.9999999999 , 1143.73333333336), 3, shrioState);
		var slot2360 = new MocuGame.TimeSlot(2360);	 //Start
		slot2360.addEvent(new MocuGame.Event(Object48, "x", "current", 2732, 1));
		slot2360.addEvent(new MocuGame.Event(Object48, "velocity.x", "current", -5, 1));
		Object48.timeline.addSlot(slot2360);
		this.add(Object48);
		var Object49 = new ShrioGame.Plano(new MocuGame.Point(11000 , -482.933333333335), 3, shrioState);
		var slot2400 = new MocuGame.TimeSlot(2400);	 //Start
		slot2400.addEvent(new MocuGame.Event(Object49, "moveSpeed", 1, 5, 1));
		slot2400.addEvent(new MocuGame.Event(Object49, "x", "current", 2732, 1));
		Object49.timeline.addSlot(slot2400);
		var slot2520 = new MocuGame.TimeSlot(2520);	 //Turn
		slot2520.addEvent(new MocuGame.Event(Object49, "moveAngle", "current", 90, 30));
		Object49.timeline.addSlot(slot2520);
		this.add(Object49);
		var Object50 = new ShrioGame.Dekplane(new MocuGame.Point(8459.99999999977 , 257.066666666667), 3, shrioState);
		var slot2390 = new MocuGame.TimeSlot(2390);	 //Start
		slot2390.addEvent(new MocuGame.Event(Object50, "x", "current", 2732-200, 1));
		Object50.timeline.addSlot(slot2390);
		this.add(Object50);
		var Object51 = new ShrioGame.Dekplane(new MocuGame.Point(10799.9999999998 , 997.066666666676), 3, shrioState);
		var slot2390 = new MocuGame.TimeSlot(2390);	 //Start
		slot2390.addEvent(new MocuGame.Event(Object51, "x", "current", 2732-200, 1));
		Object51.timeline.addSlot(slot2390);
		this.add(Object51);
		var Object52 = new ShrioGame.Plano(new MocuGame.Point(11239.9999999999 , -469.600000000002), 3, shrioState);
		var slot2400 = new MocuGame.TimeSlot(2400);	 //Start
		slot2400.addEvent(new MocuGame.Event(Object52, "moveSpeed", 1, 5, 1));
		slot2400.addEvent(new MocuGame.Event(Object52, "x", "current", 2732, 1));
		Object52.timeline.addSlot(slot2400);
		var slot2550 = new MocuGame.TimeSlot(2550);	 //Turn
		slot2550.addEvent(new MocuGame.Event(Object52, "moveAngle", "current", 90, 30));
		Object52.timeline.addSlot(slot2550);
		this.add(Object52);
		var Object53 = new ShrioGame.Plano(new MocuGame.Point(11539.9999999999 , -476.266666666669), 3, shrioState);
		var slot2400 = new MocuGame.TimeSlot(2400);	 //Start
		slot2400.addEvent(new MocuGame.Event(Object53, "moveSpeed", 1, 5, 1));
		slot2400.addEvent(new MocuGame.Event(Object53, "x", "current", 2732, 1));
		Object53.timeline.addSlot(slot2400);
		var slot2580 = new MocuGame.TimeSlot(2580);	 //Turn
		slot2580.addEvent(new MocuGame.Event(Object53, "moveAngle", "current", 90, 30));
		Object53.timeline.addSlot(slot2580);
		this.add(Object53);
		var Object54 = new ShrioGame.Plano(new MocuGame.Point(11813.3333333335 , -482.933333333335), 3, shrioState);
		var slot2400 = new MocuGame.TimeSlot(2400);	 //Start
		slot2400.addEvent(new MocuGame.Event(Object54, "moveSpeed", 1, 5, 1));
		slot2400.addEvent(new MocuGame.Event(Object54, "x", "current", 2732, 1));
		Object54.timeline.addSlot(slot2400);
		var slot2610 = new MocuGame.TimeSlot(2610);	 //Turn
		slot2610.addEvent(new MocuGame.Event(Object54, "moveAngle", "current", 90, 30));
		Object54.timeline.addSlot(slot2610);
		this.add(Object54);
		var Object55 = new ShrioGame.Lo(new MocuGame.Point(5593.3333333334 , 1903.73333333327), 10, shrioState);
		var slot500 = new MocuGame.TimeSlot(500);	 //Start
		slot500.addEvent(new MocuGame.Event(Object55, "velocity.y", 1, -5, 1));
		Object55.timeline.addSlot(slot500);
		var slot700 = new MocuGame.TimeSlot(700);	 //Pause
		slot700.addEvent(new MocuGame.Event(Object55, "velocity.y", "current", 0, 1));
		Object55.timeline.addSlot(slot700);
		var slot900 = new MocuGame.TimeSlot(900);	 //Exit
		slot900.addEvent(new MocuGame.Event(Object55, "shooting", true, false, 1));
		slot900.addEvent(new MocuGame.Event(Object55, "velocity.x", "current", -5, 1));
		Object55.timeline.addSlot(slot900);
		this.add(Object55);
		var Object56 = new ShrioGame.Lo(new MocuGame.Point(5913.33333333347 , 1810.39999999991), 10, shrioState);
		var slot500 = new MocuGame.TimeSlot(500);	 //Start
		slot500.addEvent(new MocuGame.Event(Object56, "velocity.y", 1, -5, 1));
		Object56.timeline.addSlot(slot500);
		var slot700 = new MocuGame.TimeSlot(700);	 //Pause
		slot700.addEvent(new MocuGame.Event(Object56, "velocity.y", "current", 0, 1));
		Object56.timeline.addSlot(slot700);
		var slot900 = new MocuGame.TimeSlot(900);	 //Exit
		slot900.addEvent(new MocuGame.Event(Object56, "shooting", true, false, 1));
		slot900.addEvent(new MocuGame.Event(Object56, "velocity.x", "current", -5, 1));
		Object56.timeline.addSlot(slot900);
		this.add(Object56);
		var Object57 = new ShrioGame.Plano(new MocuGame.Point(11740.0000000004 , 763.733333333331), 3, shrioState);
		var slot2756 = new MocuGame.TimeSlot(2756);	 //Start
		slot2756.addEvent(new MocuGame.Event(Object57, "moveSpeed", "current", 7, 30));
		Object57.timeline.addSlot(slot2756);
		this.add(Object57);
		var Object58 = new ShrioGame.Plano(new MocuGame.Point(12006.6666666668 , 763.733333333334), 3, shrioState);
		var slot2816 = new MocuGame.TimeSlot(2816);	 //Start
		slot2816.addEvent(new MocuGame.Event(Object58, "moveSpeed", "current", 7, 30));
		Object58.timeline.addSlot(slot2816);
		this.add(Object58);
		var Object59 = new ShrioGame.Plano(new MocuGame.Point(12226.6666666681 , 763.733333333333), 3, shrioState);
		var slot2876 = new MocuGame.TimeSlot(2876);	 //Start
		slot2876.addEvent(new MocuGame.Event(Object59, "moveSpeed", "current", 7, 30));
		Object59.timeline.addSlot(slot2876);
		this.add(Object59);
		var Object60 = new ShrioGame.Lo(new MocuGame.Point(11930 , 403.733333333337), 3, shrioState);
		Object60.velocity.x = 0; 
		var slot3066 = new MocuGame.TimeSlot(3066);	 //Start
		slot3066.addEvent(new MocuGame.Event(Object60, "x", 2732, 2732-1000, 200));
		Object60.timeline.addSlot(slot3066);
		var slot3466 = new MocuGame.TimeSlot(3466);	 //Exit
		slot3466.addEvent(new MocuGame.Event(Object60, "shooting", true, false, 1));
		slot3466.addEvent(new MocuGame.Event(Object60, "velocity.x", "current", 10, 30));
		Object60.timeline.addSlot(slot3466);
		this.add(Object60);
		var Object61 = new ShrioGame.Lo(new MocuGame.Point(11930 , 1003.733333333337), 3, shrioState);
		Object61.velocity.x = 0; 
		var slot3066 = new MocuGame.TimeSlot(3066);	 //Start
		slot3066.addEvent(new MocuGame.Event(Object61, "x", 2732, 2732-1000, 200));
		Object61.timeline.addSlot(slot3066);
		var slot3466 = new MocuGame.TimeSlot(3466);	 //Exit
		slot3466.addEvent(new MocuGame.Event(Object61, "shooting", true, false, 1));
		slot3466.addEvent(new MocuGame.Event(Object61, "velocity.x", "current", 10, 30));
		Object61.timeline.addSlot(slot3466);
		this.add(Object61);
		var Object62 = new ShrioGame.Plano(new MocuGame.Point(11740.0000000004 , 1030.40000000001), 3, shrioState);
		var slot2756 = new MocuGame.TimeSlot(2756);	 //Start
		slot2756.addEvent(new MocuGame.Event(Object62, "moveSpeed", "current", 7, 30));
		Object62.timeline.addSlot(slot2756);
		this.add(Object62);
		var Object63 = new ShrioGame.Plano(new MocuGame.Point(11740.0000000004 , 763.733333333331), 3, shrioState);
		var slot2756 = new MocuGame.TimeSlot(2756);	 //Start
		slot2756.addEvent(new MocuGame.Event(Object63, "moveSpeed", "current", 7, 30));
		Object63.timeline.addSlot(slot2756);
		this.add(Object63);
		var Object64 = new ShrioGame.Plano(new MocuGame.Point(11733.3333333338 , 503.733333333328), 3, shrioState);
		var slot2756 = new MocuGame.TimeSlot(2756);	 //Start
		slot2756.addEvent(new MocuGame.Event(Object64, "moveSpeed", "current", 7, 30));
		Object64.timeline.addSlot(slot2756);
		this.add(Object64);
		var Object65 = new ShrioGame.Lo(new MocuGame.Point(12496.3333333334 , 1037.06666666664), 3, shrioState);
		Object65.velocity.x = 0; 
		var slot3240 = new MocuGame.TimeSlot(3240);	 //Start
		slot3240.addEvent(new MocuGame.Event(Object65, "x", 2732, 2732-500, 200));
		Object65.timeline.addSlot(slot3240);
		var slot3640 = new MocuGame.TimeSlot(3640);	 //Exit
		slot3640.addEvent(new MocuGame.Event(Object65, "shooting", true, false, 1));
		slot3640.addEvent(new MocuGame.Event(Object65, "velocity.x", "current", 10, 30));
		Object65.timeline.addSlot(slot3640);
		this.add(Object65);
		var Object66 = new ShrioGame.Lo(new MocuGame.Point(12523.0000000002 , 430.399999999976), 3, shrioState);
		Object66.velocity.x = 0; 
		var slot3240 = new MocuGame.TimeSlot(3240);	 //Start
		slot3240.addEvent(new MocuGame.Event(Object66, "x", 2732, 2732-500, 200));
		Object66.timeline.addSlot(slot3240);
		var slot3640 = new MocuGame.TimeSlot(3640);	 //Exit
		slot3640.addEvent(new MocuGame.Event(Object66, "shooting", true, false, 1));
		slot3640.addEvent(new MocuGame.Event(Object66, "velocity.x", "current", 10, 30));
		Object66.timeline.addSlot(slot3640);
		this.add(Object66);
		var Object67 = new ShrioGame.Dilo(new MocuGame.Point(12906.6666666678 , 583.733333333348), 75, shrioState);
		var slot3380 = new MocuGame.TimeSlot(3380);	 //Start
		slot3380.addEvent(new MocuGame.Event(Object67, "x", "current", 2732-580, 1));
		Object67.timeline.addSlot(slot3380);
		this.add(Object67);
		var Object68 = new ShrioGame.Dudekplane(new MocuGame.Point(12900 , 90.4000000000015), 3, shrioState);
		var slot3390 = new MocuGame.TimeSlot(3390);	 //Start
		slot3390.addEvent(new MocuGame.Event(Object68, "x", "current", 2732-512, 1));
		Object68.timeline.addSlot(slot3390);
		this.add(Object68);
		var Object69 = new ShrioGame.Dudekplane(new MocuGame.Point(12866.6666666665 , 1117.06666666665), 3, shrioState);
		var slot3390 = new MocuGame.TimeSlot(3390);	 //Start
		slot3390.addEvent(new MocuGame.Event(Object69, "x", "current", 2732-512, 1));
		Object69.timeline.addSlot(slot3390);
		this.add(Object69);
		var Object70 = new ShrioGame.Lo(new MocuGame.Point(13503.333333334 , 243.733333333332), 3, shrioState);
		Object70.velocity.x = 0; 
		var slot3612 = new MocuGame.TimeSlot(3612);	 //Start
		slot3612.addEvent(new MocuGame.Event(Object70, "x", 2732, 2732-1000, 200));
		Object70.timeline.addSlot(slot3612);
		var slot4012 = new MocuGame.TimeSlot(4012);	 //Exit
		slot4012.addEvent(new MocuGame.Event(Object70, "shooting", true, false, 1));
		slot4012.addEvent(new MocuGame.Event(Object70, "velocity.x", "current", 10, 30));
		Object70.timeline.addSlot(slot4012);
		this.add(Object70);
		var Object71 = new ShrioGame.Lo(new MocuGame.Point(13476.6666666673 , 1237.06666666669), 3, shrioState);
		Object71.velocity.x = 0; 
		var slot3612 = new MocuGame.TimeSlot(3612);	 //Start
		slot3612.addEvent(new MocuGame.Event(Object71, "x", 2732, 2732-1000, 200));
		Object71.timeline.addSlot(slot3612);
		var slot4012 = new MocuGame.TimeSlot(4012);	 //Exit
		slot4012.addEvent(new MocuGame.Event(Object71, "shooting", true, false, 1));
		slot4012.addEvent(new MocuGame.Event(Object71, "velocity.x", "current", 10, 30));
		Object71.timeline.addSlot(slot4012);
		this.add(Object71);
		var Object72 = new ShrioGame.Lo(new MocuGame.Point(13856.6666666675 , 237.06666666666), 3, shrioState);
		Object72.velocity.x = 0; 
		var slot3708 = new MocuGame.TimeSlot(3708);	 //Start
		slot3708.addEvent(new MocuGame.Event(Object72, "x", 2732, 2732-1000, 200));
		Object72.timeline.addSlot(slot3708);
		var slot4108 = new MocuGame.TimeSlot(4108);	 //Exit
		slot4108.addEvent(new MocuGame.Event(Object72, "shooting", true, false, 1));
		slot4108.addEvent(new MocuGame.Event(Object72, "velocity.x", "current", 10, 30));
		Object72.timeline.addSlot(slot4108);
		this.add(Object72);
		var Object73 = new ShrioGame.Lo(new MocuGame.Point(13823.3333333339 , 1250.40000000007), 3, shrioState);
		Object73.velocity.x = 0; 
		var slot3708 = new MocuGame.TimeSlot(3708);	 //Start
		slot3708.addEvent(new MocuGame.Event(Object73, "x", 2732, 2732-1000, 200));
		Object73.timeline.addSlot(slot3708);
		var slot4108 = new MocuGame.TimeSlot(4108);	 //Exit
		slot4108.addEvent(new MocuGame.Event(Object73, "shooting", true, false, 1));
		slot4108.addEvent(new MocuGame.Event(Object73, "velocity.x", "current", 10, 30));
		Object73.timeline.addSlot(slot4108);
		this.add(Object73);
		var Object74 = new ShrioGame.Duspinfodder(new MocuGame.Point(14600 , 777.066666666668), 3, shrioState);
		var slot3956 = new MocuGame.TimeSlot(3956);	 //Start
		slot3956.addEvent(new MocuGame.Event(Object74, "x", "current", 2732, 1));
		slot3956.addEvent(new MocuGame.Event(Object74, "velocity.x", "current", -5, 1));
		Object74.timeline.addSlot(slot3956);
		this.add(Object74);
		var Object75 = new ShrioGame.Duspinfodder(new MocuGame.Point(14613.3333333335 , 477.066666666664), 3, shrioState);
		var slot3956 = new MocuGame.TimeSlot(3956);	 //Start
		slot3956.addEvent(new MocuGame.Event(Object75, "x", "current", 2732-500, 1));
		slot3956.addEvent(new MocuGame.Event(Object75, "velocity.x", "current", -5, 1));
		Object75.timeline.addSlot(slot3956);
		this.add(Object75);
		var Object76 = new ShrioGame.Duspinfodder(new MocuGame.Point(14600.0000000012 , 1083.73333333328), 3, shrioState);
		var slot3956 = new MocuGame.TimeSlot(3956);	 //Start
		slot3956.addEvent(new MocuGame.Event(Object76, "x", "current", 2732-500, 1));
		slot3956.addEvent(new MocuGame.Event(Object76, "velocity.x", "current", -5, 1));
		Object76.timeline.addSlot(slot3956);
		this.add(Object76);
		var Object77 = new ShrioGame.Dilo(new MocuGame.Point(14906.6666666676 , 630.400000000036), 75, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object77, "x", "current", 2732-580, 1));
		Object77.timeline.addSlot(slot4062);
		this.add(Object77);
		var Object78 = new ShrioGame.Plano(new MocuGame.Point(14926.6666666667 , 410.400000000001), 3, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object78, "moveSpeed", "current", 10, 120));
		Object78.timeline.addSlot(slot4062);
		this.add(Object78);
		var Object79 = new ShrioGame.Plano(new MocuGame.Point(15173.3333333344 , 410.400000000009), 3, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object79, "moveSpeed", "current", 10, 120));
		Object79.timeline.addSlot(slot4062);
		this.add(Object79);
		var Object80 = new ShrioGame.Plano(new MocuGame.Point(15406.6666666686 , 417.066666666675), 3, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object80, "moveSpeed", "current", 10, 120));
		Object80.timeline.addSlot(slot4062);
		this.add(Object80);
		var Object81 = new ShrioGame.Plano(new MocuGame.Point(14913.3333333342 , 1137.06666666668), 3, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object81, "moveSpeed", "current", 10, 120));
		Object81.timeline.addSlot(slot4062);
		this.add(Object81);
		var Object82 = new ShrioGame.Plano(new MocuGame.Point(15206.6666666681 , 1123.73333333335), 3, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object82, "moveSpeed", "current", 10, 120));
		Object82.timeline.addSlot(slot4062);
		this.add(Object82);
		var Object83 = new ShrioGame.Plano(new MocuGame.Point(15466.6666666685 , 1163.73333333334), 3, shrioState);
		var slot4062 = new MocuGame.TimeSlot(4062);	 //Start
		slot4062.addEvent(new MocuGame.Event(Object83, "moveSpeed", "current", 10, 120));
		Object83.timeline.addSlot(slot4062);
		this.add(Object83);
		var Object84 = new ShrioGame.Dekta1(new MocuGame.Point(21383.3333333332 , 450.4), 300, shrioState);
		var slot5662 = new MocuGame.TimeSlot(5662);	 //Start
		slot5662.addEvent(new MocuGame.Event(Object84, "x", "current", MocuGame.gameWidth - 1, 1));
		Object84.timeline.addSlot(slot5662);
		this.add(Object84);
		var Object85 = new ShrioGame.Lo(new MocuGame.Point(18053.3333333333 , 403.733333333334), 3, shrioState);
		var slot5000 = new MocuGame.TimeSlot(5000);	 //Start
		slot5000.addEvent(new MocuGame.Event(Object85, "x", MocuGame.gameWidth, MocuGame.gameWidth-500, 90));
		slot5000.addEvent(new MocuGame.Event(Object85, "velocity.x", 1, 0, 1));
		Object85.timeline.addSlot(slot5000);
		var slot5090 = new MocuGame.TimeSlot(5090);	 //Pause
		slot5090.addEvent(new MocuGame.Event(Object85, "shooting", true, true, 1));
		Object85.timeline.addSlot(slot5090);
		var slot5210 = new MocuGame.TimeSlot(5210);	 //Exit
		slot5210.addEvent(new MocuGame.Event(Object85, "velocity.y", 0, -10, 1));
		Object85.timeline.addSlot(slot5210);
		this.add(Object85);
		var Object86 = new ShrioGame.Lo(new MocuGame.Point(18040 , 943.733333333325), 3, shrioState);
		var slot5000 = new MocuGame.TimeSlot(5000);	 //Start
		slot5000.addEvent(new MocuGame.Event(Object86, "x", MocuGame.gameWidth, MocuGame.gameWidth-500, 90));
		slot5000.addEvent(new MocuGame.Event(Object86, "velocity.x", 1, 0, 1));
		Object86.timeline.addSlot(slot5000);
		var slot5090 = new MocuGame.TimeSlot(5090);	 //Pause
		slot5090.addEvent(new MocuGame.Event(Object86, "shooting", true, true, 1));
		Object86.timeline.addSlot(slot5090);
		var slot5210 = new MocuGame.TimeSlot(5210);	 //Exit
		slot5210.addEvent(new MocuGame.Event(Object86, "velocity.y", 0, -10, 1));
		Object86.timeline.addSlot(slot5210);
		this.add(Object86);
		var Object87 = new ShrioGame.Lo(new MocuGame.Point(23520.0000000023 , 503.733333333331), 3, shrioState);
		var slot5840 = new MocuGame.TimeSlot(5840);	 //Start
		slot5840.addEvent(new MocuGame.Event(Object87, "x", MocuGame.gameWidth, MocuGame.gameWidth-500, 90));
		slot5840.addEvent(new MocuGame.Event(Object87, "velocity.x", 1, 0, 1));
		Object87.timeline.addSlot(slot5840);
		var slot5960 = new MocuGame.TimeSlot(5960);	 //Pause
		slot5960.addEvent(new MocuGame.Event(Object87, "shooting", true, true, 1));
		Object87.timeline.addSlot(slot5960);
		var slot6020 = new MocuGame.TimeSlot(6020);	 //Exit
		slot6020.addEvent(new MocuGame.Event(Object87, "velocity.y", 0, -10, 1));
		Object87.timeline.addSlot(slot6020);
		this.add(Object87);
		var Object88 = new ShrioGame.Lo(new MocuGame.Point(23520.0000000023 , 817.066666666659), 3, shrioState);
		var slot5840 = new MocuGame.TimeSlot(5840);	 //Start
		slot5840.addEvent(new MocuGame.Event(Object88, "x", MocuGame.gameWidth, MocuGame.gameWidth-500, 90));
		slot5840.addEvent(new MocuGame.Event(Object88, "velocity.x", 1, 0, 1));
		Object88.timeline.addSlot(slot5840);
		var slot5960 = new MocuGame.TimeSlot(5960);	 //Pause
		slot5960.addEvent(new MocuGame.Event(Object88, "shooting", true, true, 1));
		Object88.timeline.addSlot(slot5960);
		var slot6020 = new MocuGame.TimeSlot(6020);	 //Exit
		slot6020.addEvent(new MocuGame.Event(Object88, "velocity.y", 0, -10, 1));
		Object88.timeline.addSlot(slot6020);
		this.add(Object88);
		var Object89 = new ShrioGame.Plano(new MocuGame.Point(24260.0000000005 , 690.400000000006), 3, shrioState);
		var slot6090 = new MocuGame.TimeSlot(6090);	 //Start
		slot6090.addEvent(new MocuGame.Event(Object89, "x", "current", MocuGame.gameWidth, 1));
		slot6090.addEvent(new MocuGame.Event(Object89, "moveSpeed", 7, 7, 1));
		Object89.timeline.addSlot(slot6090);
		this.add(Object89);
		var Object90 = new ShrioGame.Plano(new MocuGame.Point(24580.0000000016 , 637.066666666673), 3, shrioState);
		var slot6090 = new MocuGame.TimeSlot(6090);	 //Start
		slot6090.addEvent(new MocuGame.Event(Object90, "x", "current", MocuGame.gameWidth + 1500, 1));
		slot6090.addEvent(new MocuGame.Event(Object90, "moveSpeed", 7, 7, 1));
		Object90.timeline.addSlot(slot6090);
		this.add(Object90);
		var Object91 = new ShrioGame.Plano(new MocuGame.Point(24933.3333333363 , 510.400000000012), 3, shrioState);
		var slot6090 = new MocuGame.TimeSlot(6090);	 //Start
		slot6090.addEvent(new MocuGame.Event(Object91, "x", "current", MocuGame.gameWidth, 1));
		slot6090.addEvent(new MocuGame.Event(Object91, "moveSpeed", 7, 7, 1));
		Object91.timeline.addSlot(slot6090);
		this.add(Object91);
		var Object92 = new ShrioGame.Plano(new MocuGame.Point(25113.3333333372 , 810.400000000025), 3, shrioState);
		var slot6090 = new MocuGame.TimeSlot(6090);	 //Start
		slot6090.addEvent(new MocuGame.Event(Object92, "x", "current", MocuGame.gameWidth, 1));
		slot6090.addEvent(new MocuGame.Event(Object92, "moveSpeed", 7, 7, 1));
		Object92.timeline.addSlot(slot6090);
		this.add(Object92);
		var Object93 = new ShrioGame.Lo(new MocuGame.Point(26240.0000000003 , 470.400000000003), 5, shrioState);
		var slot6210 = new MocuGame.TimeSlot(6210);	 //Start
		slot6210.addEvent(new MocuGame.Event(Object93, "velocity.x", 1, 0, 1));
		slot6210.addEvent(new MocuGame.Event(Object93, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object93.timeline.addSlot(slot6210);
		var slot6300 = new MocuGame.TimeSlot(6300);	 //Pause
		slot6300.addEvent(new MocuGame.Event(Object93, "shooting", false, false, 1));
		Object93.timeline.addSlot(slot6300);
		var slot6420 = new MocuGame.TimeSlot(6420);	 //Exit
		slot6420.addEvent(new MocuGame.Event(Object93, "velocity.x", "current", -10, 1));
		Object93.timeline.addSlot(slot6420);
		this.add(Object93);
		var Object94 = new ShrioGame.Dekplane(new MocuGame.Point(27416.666666667 , 17.066666666671), 3, shrioState);
		var slot6390 = new MocuGame.TimeSlot(6390);	 //Start
		slot6390.addEvent(new MocuGame.Event(Object94, "x", "current", MocuGame.gameWidth-200, 1));
		Object94.timeline.addSlot(slot6390);
		this.add(Object94);
		var Object95 = new ShrioGame.Lo(new MocuGame.Point(28373.3333333338 , 763.733333333329), 5, shrioState);
		var slot6630 = new MocuGame.TimeSlot(6630);	 //Start
		slot6630.addEvent(new MocuGame.Event(Object95, "velocity.x", 1, 0, 1));
		slot6630.addEvent(new MocuGame.Event(Object95, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object95.timeline.addSlot(slot6630);
		var slot6721 = new MocuGame.TimeSlot(6721);	 //Pause
		slot6721.addEvent(new MocuGame.Event(Object95, "shooting", false, false, 1));
		Object95.timeline.addSlot(slot6721);
		var slot6840 = new MocuGame.TimeSlot(6840);	 //Exit
		slot6840.addEvent(new MocuGame.Event(Object95, "velocity.x", "current", -10, 1));
		Object95.timeline.addSlot(slot6840);
		this.add(Object95);
		var Object96 = new ShrioGame.Plano(new MocuGame.Point(29026.6666666672 , 387.06666666667), 3, shrioState);
		var slot6660 = new MocuGame.TimeSlot(6660);	 //Start
		slot6660.addEvent(new MocuGame.Event(Object96, "x", "current", MocuGame.gameWidth, 1));
		Object96.timeline.addSlot(slot6660);
		this.add(Object96);
		var Object97 = new ShrioGame.Plano(new MocuGame.Point(29313.3333333334 , 373.73333333333), 3, shrioState);
		var slot6720 = new MocuGame.TimeSlot(6720);	 //Start
		slot6720.addEvent(new MocuGame.Event(Object97, "x", "current", MocuGame.gameWidth, 1));
		Object97.timeline.addSlot(slot6720);
		this.add(Object97);
		var Object98 = new ShrioGame.Plano(new MocuGame.Point(29629.9999999996 , 387.066666666667), 3, shrioState);
		var slot6780 = new MocuGame.TimeSlot(6780);	 //Start
		slot6780.addEvent(new MocuGame.Event(Object98, "x", "current", MocuGame.gameWidth, 1));
		Object98.timeline.addSlot(slot6780);
		this.add(Object98);
		var Object99 = new ShrioGame.Plano(new MocuGame.Point(28726.666666666 , 363.733333333353), 3, shrioState);
		var slot6840 = new MocuGame.TimeSlot(6840);	 //Start
		slot6840.addEvent(new MocuGame.Event(Object99, "x", "current", MocuGame.gameWidth, 1));
		Object99.timeline.addSlot(slot6840);
		this.add(Object99);
		var Object100 = new ShrioGame.Spinfodder(new MocuGame.Point(30243.3333333334 , 413.733333333332), 3, shrioState);
		var slot6910 = new MocuGame.TimeSlot(6910);	 //Start
		slot6910.addEvent(new MocuGame.Event(Object100, "x", "current", MocuGame.gameWidth, 1));
		slot6910.addEvent(new MocuGame.Event(Object100, "velocity.x", -5, -5, 1));
		Object100.timeline.addSlot(slot6910);
		this.add(Object100);
		var Object101 = new ShrioGame.Lo(new MocuGame.Point(30823.3333333332 , 687.066666666666), 3, shrioState);
		var slot7080 = new MocuGame.TimeSlot(7080);	 //Start
		slot7080.addEvent(new MocuGame.Event(Object101, "velocity.x", "current", 0, 1));
		slot7080.addEvent(new MocuGame.Event(Object101, "x", MocuGame.gameWidth, MocuGame.gameWidth/2, 180));
		Object101.timeline.addSlot(slot7080);
		var slot7260 = new MocuGame.TimeSlot(7260);	 //Pause
		slot7260.addEvent(new MocuGame.Event(Object101, "shooting", true, true, 1));
		Object101.timeline.addSlot(slot7260);
		var slot7440 = new MocuGame.TimeSlot(7440);	 //Exit
		slot7440.addEvent(new MocuGame.Event(Object101, "velocity.y", 0, -10, 1));
		Object101.timeline.addSlot(slot7440);
		this.add(Object101);
		var Object102 = new ShrioGame.Plano(new MocuGame.Point(32120 , 747.066666666645), 3, shrioState);
		var slot7360 = new MocuGame.TimeSlot(7360);	 //Start
		slot7360.addEvent(new MocuGame.Event(Object102, "x", "current", MocuGame.gameWidth, 1));
		slot7360.addEvent(new MocuGame.Event(Object102, "moveSpeed", 7, 7, 1));
		Object102.timeline.addSlot(slot7360);
		this.add(Object102);
		var Object103 = new ShrioGame.Lo(new MocuGame.Point(34716.6666666667 , -289.599999999999), 3, shrioState);
		var slot8120 = new MocuGame.TimeSlot(8120);	 //Start
		slot8120.addEvent(new MocuGame.Event(Object103, "velocity.x", "current", 0, 1));
		slot8120.addEvent(new MocuGame.Event(Object103, "x", MocuGame.gameWidth, 3*MocuGame.gameWidth/4, 180));
		slot8120.addEvent(new MocuGame.Event(Object103, "y", "current", MocuGame.gameHeight/2, 90));
		Object103.timeline.addSlot(slot8120);
		var slot8210 = new MocuGame.TimeSlot(8210);	 //Pause
		slot8210.addEvent(new MocuGame.Event(Object103, "shooting", true, true, 1));
		Object103.timeline.addSlot(slot8210);
		var slot8330 = new MocuGame.TimeSlot(8330);	 //Exit
		slot8330.addEvent(new MocuGame.Event(Object103, "velocity.x", "current", 5, 1));
		slot8330.addEvent(new MocuGame.Event(Object103, "shooting", false, false, 1));
		Object103.timeline.addSlot(slot8330);
		this.add(Object103);
		var Object104 = new ShrioGame.Lo(new MocuGame.Point(34723.3333333334 , -546.266666666664), 3, shrioState);
		var slot8120 = new MocuGame.TimeSlot(8120);	 //Start
		slot8120.addEvent(new MocuGame.Event(Object104, "velocity.x", "current", 0, 1));
		slot8120.addEvent(new MocuGame.Event(Object104, "x", MocuGame.gameWidth, 3*MocuGame.gameWidth/4, 180));
		slot8120.addEvent(new MocuGame.Event(Object104, "y", 0, 2*MocuGame.gameHeight/3 - 150, 180));
		Object104.timeline.addSlot(slot8120);
		var slot8210 = new MocuGame.TimeSlot(8210);	 //Pause
		slot8210.addEvent(new MocuGame.Event(Object104, "shooting", true, true, 1));
		Object104.timeline.addSlot(slot8210);
		var slot8330 = new MocuGame.TimeSlot(8330);	 //Exit
		slot8330.addEvent(new MocuGame.Event(Object104, "velocity.x", "current", 5, 1));
		slot8330.addEvent(new MocuGame.Event(Object104, "shooting", false, false, 1));
		Object104.timeline.addSlot(slot8330);
		this.add(Object104);
		var Object105 = new ShrioGame.Lo(new MocuGame.Point(34716.6666666667 , -36.266666666671), 3, shrioState);
		var slot8120 = new MocuGame.TimeSlot(8120);	 //Start
		slot8120.addEvent(new MocuGame.Event(Object105, "velocity.x", "current", 0, 1));
		slot8120.addEvent(new MocuGame.Event(Object105, "x", MocuGame.gameWidth, 3*MocuGame.gameWidth/4, 180));
		slot8120.addEvent(new MocuGame.Event(Object105, "y", 0, MocuGame.gameHeight/2, 180));
		Object105.timeline.addSlot(slot8120);
		var slot8210 = new MocuGame.TimeSlot(8210);	 //Pause
		slot8210.addEvent(new MocuGame.Event(Object105, "shooting", true, true, 1));
		Object105.timeline.addSlot(slot8210);
		var slot8330 = new MocuGame.TimeSlot(8330);	 //Exit
		slot8330.addEvent(new MocuGame.Event(Object105, "velocity.x", "current", 5, 1));
		slot8330.addEvent(new MocuGame.Event(Object105, "shooting", false, false, 1));
		Object105.timeline.addSlot(slot8330);
		this.add(Object105);
		var Object106 = new ShrioGame.Spinfodder(new MocuGame.Point(35536.6666666668 , 313.733333333343), 3, shrioState);
		var slot8300 = new MocuGame.TimeSlot(8300);	 //Start
		slot8300.addEvent(new MocuGame.Event(Object106, "x", "current", MocuGame.gameWidth, 1));
		Object106.timeline.addSlot(slot8300);
		this.add(Object106);
		var Object107 = new ShrioGame.Spinfodder(new MocuGame.Point(35590 , 870.400000000001), 3, shrioState);
		var slot8300 = new MocuGame.TimeSlot(8300);	 //Start
		slot8300.addEvent(new MocuGame.Event(Object107, "x", "current", MocuGame.gameWidth, 1));
		Object107.timeline.addSlot(slot8300);
		this.add(Object107);
		var Object108 = new ShrioGame.Lo(new MocuGame.Point(36779.9999999999 , 1143.73333333338), 3, shrioState);
		var slot8420 = new MocuGame.TimeSlot(8420);	 //Start
		slot8420.addEvent(new MocuGame.Event(Object108, "velocity.x", "current", 0, 1));
		slot8420.addEvent(new MocuGame.Event(Object108, "x", "current", MocuGame.gameWidth/2, 180));
		slot8420.addEvent(new MocuGame.Event(Object108, "y", "current", MocuGame.gameHeight/2, 180));
		Object108.timeline.addSlot(slot8420);
		var slot8510 = new MocuGame.TimeSlot(8510);	 //Pause
		slot8510.addEvent(new MocuGame.Event(Object108, "shooting", true, true, 1));
		Object108.timeline.addSlot(slot8510);
		var slot8630 = new MocuGame.TimeSlot(8630);	 //Exit
		slot8630.addEvent(new MocuGame.Event(Object108, "velocity.x", "current", 5, 1));
		Object108.timeline.addSlot(slot8630);
		this.add(Object108);
		var Object109 = new ShrioGame.Dekplane(new MocuGame.Point(36276.6666666669 , 590.40000000001), 3, shrioState);
		var slot7590 = new MocuGame.TimeSlot(7590);	 //Start
		slot7590.addEvent(new MocuGame.Event(Object109, "x", "current", MocuGame.gameWidth-200, 1));
		Object109.timeline.addSlot(slot7590);
		this.add(Object109);
		var Object110 = new ShrioGame.Lo(new MocuGame.Point(36483.3333333342 , 1127.06666666673), 3, shrioState);
		var slot8420 = new MocuGame.TimeSlot(8420);	 //Start
		slot8420.addEvent(new MocuGame.Event(Object110, "velocity.x", "current", 0, 1));
		slot8420.addEvent(new MocuGame.Event(Object110, "x", "current", MocuGame.gameWidth/2 - 150, 180));
		slot8420.addEvent(new MocuGame.Event(Object110, "y", "current", MocuGame.gameHeight/2, 180));
		Object110.timeline.addSlot(slot8420);
		var slot8510 = new MocuGame.TimeSlot(8510);	 //Pause
		slot8510.addEvent(new MocuGame.Event(Object110, "shooting", true, true, 1));
		Object110.timeline.addSlot(slot8510);
		var slot8630 = new MocuGame.TimeSlot(8630);	 //Exit
		slot8630.addEvent(new MocuGame.Event(Object110, "velocity.x", "current", 5, 1));
		Object110.timeline.addSlot(slot8630);
		this.add(Object110);
		var Object111 = new ShrioGame.Lo(new MocuGame.Point(37093.3333333326 , 1137.06666666671), 3, shrioState);
		var slot8420 = new MocuGame.TimeSlot(8420);	 //Start
		slot8420.addEvent(new MocuGame.Event(Object111, "velocity.x", "current", 0, 1));
		slot8420.addEvent(new MocuGame.Event(Object111, "x", "current", MocuGame.gameWidth/2 + 150, 180));
		slot8420.addEvent(new MocuGame.Event(Object111, "y", "current", MocuGame.gameHeight/2, 180));
		Object111.timeline.addSlot(slot8420);
		var slot8510 = new MocuGame.TimeSlot(8510);	 //Pause
		slot8510.addEvent(new MocuGame.Event(Object111, "shooting", true, true, 1));
		Object111.timeline.addSlot(slot8510);
		var slot8630 = new MocuGame.TimeSlot(8630);	 //Exit
		slot8630.addEvent(new MocuGame.Event(Object111, "velocity.x", "current", 5, 1));
		Object111.timeline.addSlot(slot8630);
		this.add(Object111);
		var Object112 = new ShrioGame.Plano(new MocuGame.Point(34263.3333333333 , 643.733333333335), 3, shrioState);
		var slot8040 = new MocuGame.TimeSlot(8040);	 //Start
		slot8040.addEvent(new MocuGame.Event(Object112, "x", "current", MocuGame.gameWidth, 1));
		slot8040.addEvent(new MocuGame.Event(Object112, "moveSpeed", 7, 7, 1));
		Object112.timeline.addSlot(slot8040);
		this.add(Object112);
		var Object113 = new ShrioGame.Plano(new MocuGame.Point(34753.3333333333 , 223.733333333333), 3, shrioState);
		var slot8160 = new MocuGame.TimeSlot(8160);	 //Start
		slot8160.addEvent(new MocuGame.Event(Object113, "x", "current", MocuGame.gameWidth, 1));
		slot8160.addEvent(new MocuGame.Event(Object113, "moveSpeed", 7, 7, 1));
		Object113.timeline.addSlot(slot8160);
		this.add(Object113);
		var Object114 = new ShrioGame.Plano(new MocuGame.Point(34743.3333333333 , 497.066666666669), 3, shrioState);
		var slot8160 = new MocuGame.TimeSlot(8160);	 //Start
		slot8160.addEvent(new MocuGame.Event(Object114, "x", "current", MocuGame.gameWidth, 1));
		slot8160.addEvent(new MocuGame.Event(Object114, "moveSpeed", 7, 7, 1));
		Object114.timeline.addSlot(slot8160);
		this.add(Object114);
		var Object115 = new ShrioGame.Plano(new MocuGame.Point(34753.3333333333 , 760.399999999949), 3, shrioState);
		var slot8160 = new MocuGame.TimeSlot(8160);	 //Start
		slot8160.addEvent(new MocuGame.Event(Object115, "x", "current", MocuGame.gameWidth, 1));
		slot8160.addEvent(new MocuGame.Event(Object115, "moveSpeed", 7, 7, 1));
		Object115.timeline.addSlot(slot8160);
		this.add(Object115);
		var Object116 = new ShrioGame.Duspinfodder(new MocuGame.Point(37663.3333333333 , 570.399999999999), 3, shrioState);
		var slot8600 = new MocuGame.TimeSlot(8600);	 //Start
		slot8600.addEvent(new MocuGame.Event(Object116, "x", "current", MocuGame.gameWidth, 1));
		slot8600.addEvent(new MocuGame.Event(Object116, "velocity.x", -5, -5, 1));
		Object116.timeline.addSlot(slot8600);
		this.add(Object116);
		var Object117 = new ShrioGame.Dilo(new MocuGame.Point(28736.666666665 , 717.066666666686), 75, shrioState);
		var slot6500 = new MocuGame.TimeSlot(6500);	 //Start
		slot6500.addEvent(new MocuGame.Event(Object117, "x", "current", MocuGame.gameWidth-580, 1));
		Object117.timeline.addSlot(slot6500);
		this.add(Object117);
		var Object118 = new ShrioGame.ModularSnake_Head(new MocuGame.Point(38130 , 583.733333333336), 3, shrioState);
		var slot8720 = new MocuGame.TimeSlot(8720);	 //Start
		slot8720.addEvent(new MocuGame.Event(Object118, "x", "current", MocuGame.gameWidth, 1));
		Object118.timeline.addSlot(slot8720);
		this.add(Object118);
		var Object119 = new ShrioGame.Lo(new MocuGame.Point(26223.3333333333 , 770.400000000002), 5, shrioState);
		var slot6210 = new MocuGame.TimeSlot(6210);	 //Start
		slot6210.addEvent(new MocuGame.Event(Object119, "velocity.x", 1, 0, 1));
		slot6210.addEvent(new MocuGame.Event(Object119, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object119.timeline.addSlot(slot6210);
		var slot6300 = new MocuGame.TimeSlot(6300);	 //Pause
		slot6300.addEvent(new MocuGame.Event(Object119, "shooting", false, false, 1));
		Object119.timeline.addSlot(slot6300);
		var slot6420 = new MocuGame.TimeSlot(6420);	 //Exit
		slot6420.addEvent(new MocuGame.Event(Object119, "velocity.x", "current", -10, 1));
		Object119.timeline.addSlot(slot6420);
		this.add(Object119);
		var Object120 = new ShrioGame.Lo(new MocuGame.Point(28373.3333333337 , 1070.40000000004), 5, shrioState);
		var slot6630 = new MocuGame.TimeSlot(6630);	 //Start
		slot6630.addEvent(new MocuGame.Event(Object120, "velocity.x", 1, 0, 1));
		slot6630.addEvent(new MocuGame.Event(Object120, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object120.timeline.addSlot(slot6630);
		var slot6721 = new MocuGame.TimeSlot(6721);	 //Pause
		slot6721.addEvent(new MocuGame.Event(Object120, "shooting", false, false, 1));
		Object120.timeline.addSlot(slot6721);
		var slot6840 = new MocuGame.TimeSlot(6840);	 //Exit
		slot6840.addEvent(new MocuGame.Event(Object120, "velocity.x", "current", -10, 1));
		Object120.timeline.addSlot(slot6840);
		this.add(Object120);
		var Object121 = new ShrioGame.Lo(new MocuGame.Point(27326.666666667 , 1143.73333333333), 5, shrioState);
		var slot6630 = new MocuGame.TimeSlot(6630);	 //Start
		slot6630.addEvent(new MocuGame.Event(Object121, "velocity.x", 1, 0, 1));
		slot6630.addEvent(new MocuGame.Event(Object121, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object121.timeline.addSlot(slot6630);
		var slot6721 = new MocuGame.TimeSlot(6721);	 //Pause
		slot6721.addEvent(new MocuGame.Event(Object121, "shooting", false, false, 1));
		Object121.timeline.addSlot(slot6721);
		var slot6840 = new MocuGame.TimeSlot(6840);	 //Exit
		slot6840.addEvent(new MocuGame.Event(Object121, "velocity.x", "current", -10, 1));
		Object121.timeline.addSlot(slot6840);
		this.add(Object121);
		var Object122 = new ShrioGame.Lo(new MocuGame.Point(31309.9999999999 , 297.066666666663), 3, shrioState);
		var slot7440 = new MocuGame.TimeSlot(7440);	 //Start
		slot7440.addEvent(new MocuGame.Event(Object122, "velocity.x", "current", 0, 1));
		slot7440.addEvent(new MocuGame.Event(Object122, "x", MocuGame.gameWidth, MocuGame.gameWidth/2, 180));
		Object122.timeline.addSlot(slot7440);
		var slot7620 = new MocuGame.TimeSlot(7620);	 //Pause
		slot7620.addEvent(new MocuGame.Event(Object122, "shooting", true, true, 1));
		Object122.timeline.addSlot(slot7620);
		var slot7800 = new MocuGame.TimeSlot(7800);	 //Exit
		slot7800.addEvent(new MocuGame.Event(Object122, "velocity.y", 0, -10, 1));
		Object122.timeline.addSlot(slot7800);
		this.add(Object122);
		var Object123 = new ShrioGame.Lo(new MocuGame.Point(31339.9999999998 , 997.066666666676), 3, shrioState);
		var slot7440 = new MocuGame.TimeSlot(7440);	 //Start
		slot7440.addEvent(new MocuGame.Event(Object123, "velocity.x", "current", 0, 1));
		slot7440.addEvent(new MocuGame.Event(Object123, "x", MocuGame.gameWidth, MocuGame.gameWidth/2, 180));
		Object123.timeline.addSlot(slot7440);
		var slot7620 = new MocuGame.TimeSlot(7620);	 //Pause
		slot7620.addEvent(new MocuGame.Event(Object123, "shooting", true, true, 1));
		Object123.timeline.addSlot(slot7620);
		var slot7800 = new MocuGame.TimeSlot(7800);	 //Exit
		slot7800.addEvent(new MocuGame.Event(Object123, "velocity.y", 0, -10, 1));
		Object123.timeline.addSlot(slot7800);
		this.add(Object123);
		var Object124 = new ShrioGame.Lo(new MocuGame.Point(39319.9999999998 , 503.73333333331), 5, shrioState);
		var slot8830 = new MocuGame.TimeSlot(8830);	 //Start
		slot8830.addEvent(new MocuGame.Event(Object124, "velocity.x", 1, 0, 1));
		slot8830.addEvent(new MocuGame.Event(Object124, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object124.timeline.addSlot(slot8830);
		var slot8921 = new MocuGame.TimeSlot(8921);	 //Pause
		slot8921.addEvent(new MocuGame.Event(Object124, "shooting", false, false, 1));
		Object124.timeline.addSlot(slot8921);
		var slot9040 = new MocuGame.TimeSlot(9040);	 //Exit
		slot9040.addEvent(new MocuGame.Event(Object124, "velocity.x", "current", -10, 1));
		slot9040.addEvent(new MocuGame.Event(Object124, "shooting", false, false, 1));
		Object124.timeline.addSlot(slot9040);
		this.add(Object124);
		var Object125 = new ShrioGame.Lo(new MocuGame.Point(39333.3333333334 , 863.733333333315), 5, shrioState);
		var slot8830 = new MocuGame.TimeSlot(8830);	 //Start
		slot8830.addEvent(new MocuGame.Event(Object125, "velocity.x", 1, 0, 1));
		slot8830.addEvent(new MocuGame.Event(Object125, "x", "current", MocuGame.gameWidth * (3/4), 120));
		Object125.timeline.addSlot(slot8830);
		var slot8921 = new MocuGame.TimeSlot(8921);	 //Pause
		slot8921.addEvent(new MocuGame.Event(Object125, "shooting", false, false, 1));
		Object125.timeline.addSlot(slot8921);
		var slot9040 = new MocuGame.TimeSlot(9040);	 //Exit
		slot9040.addEvent(new MocuGame.Event(Object125, "velocity.x", "current", -10, 1));
		slot9040.addEvent(new MocuGame.Event(Object125, "shooting", false, false, 1));
		Object125.timeline.addSlot(slot9040);
		this.add(Object125);
		var Object126 = new ShrioGame.Plano(new MocuGame.Point(39786.6666666661 , 670.400000000001), 3, shrioState);
		Object126.velocity.x = -6; 
		var slot9000 = new MocuGame.TimeSlot(9000);	 //Start
		slot9000.addEvent(new MocuGame.Event(Object126, "x", 0, MocuGame.gameWidth, 1));
		slot9000.addEvent(new MocuGame.Event(Object126, "moveSpeed", 7, 7, 1));
		Object126.timeline.addSlot(slot9000);
		this.add(Object126);
		var Object127 = new ShrioGame.Plano(new MocuGame.Point(41693.3333333338 , -356.266666666654), 3, shrioState);
		Object127.velocity.x = -6; 
		var slot9180 = new MocuGame.TimeSlot(9180);	 //Start
		slot9180.addEvent(new MocuGame.Event(Object127, "x", 0, MocuGame.gameWidth, 1));
		slot9180.addEvent(new MocuGame.Event(Object127, "moveAngle", "current", 180-45, 1));
		slot9180.addEvent(new MocuGame.Event(Object127, "moveSpeed", 7, 7, 1));
		Object127.timeline.addSlot(slot9180);
		this.add(Object127);
		var Object128 = new ShrioGame.Dudekplane(new MocuGame.Point(41727.3333333341 , 1055.73333333333), 3, shrioState);
		var slot9180 = new MocuGame.TimeSlot(9180);	 //Start
		slot9180.addEvent(new MocuGame.Event(Object128, "x", "current", MocuGame.gameWidth, 1));
		Object128.timeline.addSlot(slot9180);
		this.add(Object128);
		var Object129 = new ShrioGame.Spinfodder(new MocuGame.Point(41267.3333333318 , 649.066666666671), 3, shrioState);
		Object129.velocity.x = -6; 
		var slot9090 = new MocuGame.TimeSlot(9090);	 //Start
		slot9090.addEvent(new MocuGame.Event(Object129, "x", "current", MocuGame.gameWidth, 1));
		slot9090.addEvent(new MocuGame.Event(Object129, "velocity.x", -5, -5, 1));
		Object129.timeline.addSlot(slot9090);
		this.add(Object129);
		var Object130 = new ShrioGame.Dilo(new MocuGame.Point(42747.3333333326 , 515.733333333336), 75, shrioState);
		var slot9360 = new MocuGame.TimeSlot(9360);	 //Start
		slot9360.addEvent(new MocuGame.Event(Object130, "x", "current", MocuGame.gameWidth-580, 1));
		Object130.timeline.addSlot(slot9360);
		this.add(Object130);
		var Object131 = new ShrioGame.Lo(new MocuGame.Point(42773.9999999997 , 1022.39999999993), 3, shrioState);
		var slot9450 = new MocuGame.TimeSlot(9450);	 //Start
		slot9450.addEvent(new MocuGame.Event(Object131, "x", MocuGame.gameWidth, MocuGame.gameWidth - 400, 90));
		slot9450.addEvent(new MocuGame.Event(Object131, "velocity.x", "current", 0, 1));
		Object131.timeline.addSlot(slot9450);
		var slot9540 = new MocuGame.TimeSlot(9540);	 //Up
		slot9540.addEvent(new MocuGame.Event(Object131, "y", "current", MocuGame.gameHeight/2 + 100, 90));
		slot9540.addEvent(new MocuGame.Event(Object131, "shooting", false, true, 1));
		Object131.timeline.addSlot(slot9540);
		var slot9720 = new MocuGame.TimeSlot(9720);	 //Exit
		slot9720.addEvent(new MocuGame.Event(Object131, "shooting", false, false, 1));
		slot9720.addEvent(new MocuGame.Event(Object131, "velocity.x", 0, 5, 30));
		Object131.timeline.addSlot(slot9720);
		this.add(Object131);
		var Object132 = new ShrioGame.Lo(new MocuGame.Point(43214.0000000006 , 1029.06666666661), 3, shrioState);
		var slot9540 = new MocuGame.TimeSlot(9540);	 //Start
		slot9540.addEvent(new MocuGame.Event(Object132, "x", MocuGame.gameWidth, MocuGame.gameWidth - 400, 90));
		slot9540.addEvent(new MocuGame.Event(Object132, "velocity.x", "current", 0, 1));
		Object132.timeline.addSlot(slot9540);
		var slot9630 = new MocuGame.TimeSlot(9630);	 //Up
		slot9630.addEvent(new MocuGame.Event(Object132, "y", "current", MocuGame.gameHeight/2 + 300, 90));
		slot9630.addEvent(new MocuGame.Event(Object132, "shooting", false, true, 1));
		Object132.timeline.addSlot(slot9630);
		var slot9810 = new MocuGame.TimeSlot(9810);	 //Exit
		slot9810.addEvent(new MocuGame.Event(Object132, "shooting", false, false, 1));
		slot9810.addEvent(new MocuGame.Event(Object132, "velocity.x", 0, 5, 30));
		Object132.timeline.addSlot(slot9810);
		this.add(Object132);
		var Object133 = new ShrioGame.Plano(new MocuGame.Point(25426.6666666713 , 970.400000000026), 3, shrioState);
		var slot6180 = new MocuGame.TimeSlot(6180);	 //Start
		slot6180.addEvent(new MocuGame.Event(Object133, "x", "current", MocuGame.gameWidth, 1));
		slot6180.addEvent(new MocuGame.Event(Object133, "moveSpeed", 7, 7, 1));
		Object133.timeline.addSlot(slot6180);
		this.add(Object133);
		var Object134 = new ShrioGame.Plano(new MocuGame.Point(25720.0000000052 , 1130.40000000005), 3, shrioState);
		var slot6270 = new MocuGame.TimeSlot(6270);	 //Start
		slot6270.addEvent(new MocuGame.Event(Object134, "x", "current", MocuGame.gameWidth, 1));
		slot6270.addEvent(new MocuGame.Event(Object134, "moveSpeed", 7, 7, 1));
		Object134.timeline.addSlot(slot6270);
		this.add(Object134);
		var Object135 = new ShrioGame.Dekplane(new MocuGame.Point(27403.3333333335 , 550.400000000004), 3, shrioState);
		var slot6390 = new MocuGame.TimeSlot(6390);	 //Start
		slot6390.addEvent(new MocuGame.Event(Object135, "x", "current", MocuGame.gameWidth-200, 1));
		Object135.timeline.addSlot(slot6390);
		this.add(Object135);
		var Object136 = new ShrioGame.Plano(new MocuGame.Point(40253.3333333328 , 670.400000000001), 3, shrioState);
		Object136.velocity.x = -6; 
		var slot9090 = new MocuGame.TimeSlot(9090);	 //Start
		slot9090.addEvent(new MocuGame.Event(Object136, "x", 0, MocuGame.gameWidth, 1));
		slot9090.addEvent(new MocuGame.Event(Object136, "moveSpeed", 7, 7, 1));
		Object136.timeline.addSlot(slot9090);
		this.add(Object136);
		var Object137 = new ShrioGame.Plano(new MocuGame.Point(40259.9999999997 , 483.733333333332), 3, shrioState);
		Object137.velocity.x = -6; 
		var slot9090 = new MocuGame.TimeSlot(9090);	 //Start
		slot9090.addEvent(new MocuGame.Event(Object137, "x", 0, MocuGame.gameWidth, 1));
		slot9090.addEvent(new MocuGame.Event(Object137, "moveSpeed", 7, 7, 1));
		Object137.timeline.addSlot(slot9090);
		this.add(Object137);
		var Object138 = new ShrioGame.Plano(new MocuGame.Point(40259.9999999997 , 863.733333333334), 3, shrioState);
		Object138.velocity.x = -6; 
		var slot9090 = new MocuGame.TimeSlot(9090);	 //Start
		slot9090.addEvent(new MocuGame.Event(Object138, "x", 0, MocuGame.gameWidth, 1));
		slot9090.addEvent(new MocuGame.Event(Object138, "moveSpeed", 7, 7, 1));
		Object138.timeline.addSlot(slot9090);
		this.add(Object138);
		var Object139 = new ShrioGame.Plano(new MocuGame.Point(32439.9999999996 , 747.066666666646), 3, shrioState);
		var slot7450 = new MocuGame.TimeSlot(7450);	 //Start
		slot7450.addEvent(new MocuGame.Event(Object139, "x", "current", MocuGame.gameWidth, 1));
		slot7450.addEvent(new MocuGame.Event(Object139, "moveSpeed", 7, 7, 1));
		Object139.timeline.addSlot(slot7450);
		this.add(Object139);
		var Object140 = new ShrioGame.Plano(new MocuGame.Point(32759.9999999992 , 733.733333333313), 3, shrioState);
		var slot7540 = new MocuGame.TimeSlot(7540);	 //Start
		slot7540.addEvent(new MocuGame.Event(Object140, "x", "current", MocuGame.gameWidth, 1));
		slot7540.addEvent(new MocuGame.Event(Object140, "moveSpeed", 7, 7, 1));
		Object140.timeline.addSlot(slot7540);
		this.add(Object140);
		var Object141 = new ShrioGame.Plano(new MocuGame.Point(33053.3333333318 , 747.066666666646), 3, shrioState);
		var slot7630 = new MocuGame.TimeSlot(7630);	 //Start
		slot7630.addEvent(new MocuGame.Event(Object141, "x", "current", MocuGame.gameWidth, 1));
		slot7630.addEvent(new MocuGame.Event(Object141, "moveSpeed", 7, 7, 1));
		Object141.timeline.addSlot(slot7630);
		this.add(Object141);
		var Object142 = new ShrioGame.Spinfodder(new MocuGame.Point(41720.6666666645 , 435.733333333334), 3, shrioState);
		Object142.velocity.x = -6; 
		var slot9180 = new MocuGame.TimeSlot(9180);	 //Start
		slot9180.addEvent(new MocuGame.Event(Object142, "x", "current", MocuGame.gameWidth, 1));
		slot9180.addEvent(new MocuGame.Event(Object142, "velocity.x", -5, -5, 1));
		Object142.timeline.addSlot(slot9180);
		this.add(Object142);
		var Object143 = new ShrioGame.Spinfodder(new MocuGame.Point(41720.6666666642 , 755.733333333334), 3, shrioState);
		Object143.velocity.x = -6; 
		var slot9180 = new MocuGame.TimeSlot(9180);	 //Start
		slot9180.addEvent(new MocuGame.Event(Object143, "x", "current", MocuGame.gameWidth, 1));
		slot9180.addEvent(new MocuGame.Event(Object143, "velocity.x", -5, -5, 1));
		Object143.timeline.addSlot(slot9180);
		this.add(Object143);
		var Object144 = new ShrioGame.Lo(new MocuGame.Point(32679.9999999992 , -1072.53333333329), 3, shrioState);
		var slot7540 = new MocuGame.TimeSlot(7540);	 //Start
		slot7540.addEvent(new MocuGame.Event(Object144, "velocity.x", 1, 0, 1));
		slot7540.addEvent(new MocuGame.Event(Object144, "x", "current", MocuGame.gameWidth - 580, 1));
		slot7540.addEvent(new MocuGame.Event(Object144, "y", -300, 700, 120));
		Object144.timeline.addSlot(slot7540);
		var slot7660 = new MocuGame.TimeSlot(7660);	 //Pause
		slot7660.addEvent(new MocuGame.Event(Object144, "shooting", true, true, 1));
		Object144.timeline.addSlot(slot7660);
		var slot7780 = new MocuGame.TimeSlot(7780);	 //Exit
		slot7780.addEvent(new MocuGame.Event(Object144, "velocity.y", 7, 7, 1));
		slot7780.addEvent(new MocuGame.Event(Object144, "shooting", false, false, 1));
		Object144.timeline.addSlot(slot7780);
		this.add(Object144);
		var Object145 = new ShrioGame.Lo(new MocuGame.Point(33093.3333333319 , -1085.86666666661), 3, shrioState);
		var slot7630 = new MocuGame.TimeSlot(7630);	 //Start
		slot7630.addEvent(new MocuGame.Event(Object145, "velocity.x", 1, 0, 1));
		slot7630.addEvent(new MocuGame.Event(Object145, "x", "current", MocuGame.gameWidth - 780, 1));
		slot7630.addEvent(new MocuGame.Event(Object145, "y", -300, 700, 120));
		Object145.timeline.addSlot(slot7630);
		var slot7750 = new MocuGame.TimeSlot(7750);	 //Pause
		slot7750.addEvent(new MocuGame.Event(Object145, "shooting", true, true, 1));
		Object145.timeline.addSlot(slot7750);
		var slot7870 = new MocuGame.TimeSlot(7870);	 //Exit
		slot7870.addEvent(new MocuGame.Event(Object145, "velocity.y", 7, 7, 1));
		slot7870.addEvent(new MocuGame.Event(Object145, "shooting", false, false, 1));
		Object145.timeline.addSlot(slot7870);
		this.add(Object145);
		var Object146 = new ShrioGame.Lo(new MocuGame.Point(33493.3333333315 , -1112.53333333328), 3, shrioState);
		var slot7720 = new MocuGame.TimeSlot(7720);	 //Start
		slot7720.addEvent(new MocuGame.Event(Object146, "velocity.x", 1, 0, 1));
		slot7720.addEvent(new MocuGame.Event(Object146, "x", "current", MocuGame.gameWidth - 980, 1));
		slot7720.addEvent(new MocuGame.Event(Object146, "y", -300, 700, 120));
		Object146.timeline.addSlot(slot7720);
		var slot7840 = new MocuGame.TimeSlot(7840);	 //Pause
		slot7840.addEvent(new MocuGame.Event(Object146, "shooting", true, true, 1));
		Object146.timeline.addSlot(slot7840);
		var slot7960 = new MocuGame.TimeSlot(7960);	 //Exit
		slot7960.addEvent(new MocuGame.Event(Object146, "velocity.y", 7, 7, 1));
		slot7960.addEvent(new MocuGame.Event(Object146, "shooting", false, false, 1));
		Object146.timeline.addSlot(slot7960);
		this.add(Object146);
		var Object147 = new ShrioGame.Lo(new MocuGame.Point(36413.3333333322 , -1032.53333333329), 3, shrioState);
		var slot8540 = new MocuGame.TimeSlot(8540);	 //Start
		slot8540.addEvent(new MocuGame.Event(Object147, "velocity.x", 1, 0, 1));
		slot8540.addEvent(new MocuGame.Event(Object147, "x", "current", MocuGame.gameWidth - 580, 1));
		slot8540.addEvent(new MocuGame.Event(Object147, "y", -300, 700, 120));
		Object147.timeline.addSlot(slot8540);
		var slot8660 = new MocuGame.TimeSlot(8660);	 //Pause
		slot8660.addEvent(new MocuGame.Event(Object147, "shooting", true, true, 1));
		Object147.timeline.addSlot(slot8660);
		var slot8780 = new MocuGame.TimeSlot(8780);	 //Exit
		slot8780.addEvent(new MocuGame.Event(Object147, "velocity.y", 7, 7, 1));
		Object147.timeline.addSlot(slot8780);
		this.add(Object147);
		var Object148 = new ShrioGame.Lo(new MocuGame.Point(36786.6666666644 , -1059.19999999995), 3, shrioState);
		var slot9530 = new MocuGame.TimeSlot(9530);	 //Start
		slot9530.addEvent(new MocuGame.Event(Object148, "velocity.x", 1, 0, 1));
		slot9530.addEvent(new MocuGame.Event(Object148, "x", "current", MocuGame.gameWidth - 780, 1));
		slot9530.addEvent(new MocuGame.Event(Object148, "y", -300, 700, 120));
		Object148.timeline.addSlot(slot9530);
		var slot9650 = new MocuGame.TimeSlot(9650);	 //Pause
		slot9650.addEvent(new MocuGame.Event(Object148, "shooting", true, true, 1));
		Object148.timeline.addSlot(slot9650);
		var slot9770 = new MocuGame.TimeSlot(9770);	 //Exit
		slot9770.addEvent(new MocuGame.Event(Object148, "velocity.y", 7, 7, 1));
		Object148.timeline.addSlot(slot9770);
		this.add(Object148);
		var Object149 = new ShrioGame.Lo(new MocuGame.Point(37173.3333333312 , -1045.86666666661), 3, shrioState);
		var slot8720 = new MocuGame.TimeSlot(8720);	 //Start
		slot8720.addEvent(new MocuGame.Event(Object149, "velocity.x", 1, 0, 1));
		slot8720.addEvent(new MocuGame.Event(Object149, "x", "current", MocuGame.gameWidth - 900, 1));
		slot8720.addEvent(new MocuGame.Event(Object149, "y", -300, 700, 120));
		Object149.timeline.addSlot(slot8720);
		var slot8840 = new MocuGame.TimeSlot(8840);	 //Pause
		slot8840.addEvent(new MocuGame.Event(Object149, "shooting", true, true, 1));
		Object149.timeline.addSlot(slot8840);
		var slot8960 = new MocuGame.TimeSlot(8960);	 //Exit
		slot8960.addEvent(new MocuGame.Event(Object149, "velocity.y", 7, 7, 1));
		Object149.timeline.addSlot(slot8960);
		this.add(Object149);
		var Object150 = new ShrioGame.Dudekplane(new MocuGame.Point(37186.6666666663 , 47.4666666666602), 3, shrioState);
		var slot8420 = new MocuGame.TimeSlot(8420);	 //Start
		slot8420.addEvent(new MocuGame.Event(Object150, "x", "current", MocuGame.gameWidth-200, 1));
		Object150.timeline.addSlot(slot8420);
		this.add(Object150);
		var Object151 = new ShrioGame.Duspinfodder(new MocuGame.Point(38263.3333333335 , 210.399999999998), 3, shrioState);
		var slot8780 = new MocuGame.TimeSlot(8780);	 //Start
		slot8780.addEvent(new MocuGame.Event(Object151, "x", "current", MocuGame.gameWidth, 1));
		slot8780.addEvent(new MocuGame.Event(Object151, "velocity.x", -5, -5, 1));
		Object151.timeline.addSlot(slot8780);
		this.add(Object151);
		var Object152 = new ShrioGame.Duspinfodder(new MocuGame.Point(38890 , 783.733333333334), 3, shrioState);
		var slot8960 = new MocuGame.TimeSlot(8960);	 //Start
		slot8960.addEvent(new MocuGame.Event(Object152, "x", "current", MocuGame.gameWidth, 1));
		slot8960.addEvent(new MocuGame.Event(Object152, "velocity.x", -5, -5, 1));
		Object152.timeline.addSlot(slot8960);
		this.add(Object152);
		var Object153 = new ShrioGame.Plano(new MocuGame.Point(41960.0000000002 , -356.266666666654), 3, shrioState);
		Object153.velocity.x = -6; 
		var slot9270 = new MocuGame.TimeSlot(9270);	 //Start
		slot9270.addEvent(new MocuGame.Event(Object153, "x", 0, MocuGame.gameWidth, 1));
		slot9270.addEvent(new MocuGame.Event(Object153, "moveAngle", "current", 180-45, 1));
		slot9270.addEvent(new MocuGame.Event(Object153, "moveSpeed", 7, 7, 1));
		Object153.timeline.addSlot(slot9270);
		this.add(Object153);
		var Object154 = new ShrioGame.Plano(new MocuGame.Point(42226.6666666667 , -356.266666666654), 3, shrioState);
		Object154.velocity.x = -6; 
		var slot9360 = new MocuGame.TimeSlot(9360);	 //Start
		slot9360.addEvent(new MocuGame.Event(Object154, "x", 0, MocuGame.gameWidth, 1));
		slot9360.addEvent(new MocuGame.Event(Object154, "moveAngle", "current", 180-45, 1));
		slot9360.addEvent(new MocuGame.Event(Object154, "moveSpeed", 7, 7, 1));
		Object154.timeline.addSlot(slot9360);
		this.add(Object154);
		var Object155 = new ShrioGame.Plano(new MocuGame.Point(42493.3333333329 , -356.266666666654), 3, shrioState);
		Object155.velocity.x = -6; 
		var slot9450 = new MocuGame.TimeSlot(9450);	 //Start
		slot9450.addEvent(new MocuGame.Event(Object155, "x", 0, MocuGame.gameWidth, 1));
		slot9450.addEvent(new MocuGame.Event(Object155, "moveAngle", "current", 180-45, 1));
		slot9450.addEvent(new MocuGame.Event(Object155, "moveSpeed", 7, 7, 1));
		Object155.timeline.addSlot(slot9450);
		this.add(Object155);
		var Object156 = new ShrioGame.Plano(new MocuGame.Point(42759.9999999991 , -369.599999999989), 3, shrioState);
		Object156.velocity.x = -6; 
		var slot9540 = new MocuGame.TimeSlot(9540);	 //Start
		slot9540.addEvent(new MocuGame.Event(Object156, "x", 0, MocuGame.gameWidth, 1));
		slot9540.addEvent(new MocuGame.Event(Object156, "moveAngle", "current", 180-45, 1));
		slot9540.addEvent(new MocuGame.Event(Object156, "moveSpeed", 7, 7, 1));
		Object156.timeline.addSlot(slot9540);
		this.add(Object156);
		var Object157 = new ShrioGame.Plano(new MocuGame.Point(34693.3333333333 , -1142.93333333328), 3, shrioState);
		Object157.velocity.x = -6; 
		var slot8180 = new MocuGame.TimeSlot(8180);	 //Start
		slot8180.addEvent(new MocuGame.Event(Object157, "x", 0, MocuGame.gameWidth, 1));
		slot8180.addEvent(new MocuGame.Event(Object157, "moveAngle", "current", 180-45, 1));
		slot8180.addEvent(new MocuGame.Event(Object157, "moveSpeed", 7, 7, 1));
		Object157.timeline.addSlot(slot8180);
		this.add(Object157);
		var Object158 = new ShrioGame.Plano(new MocuGame.Point(35066.6666666664 , -1316.26666666659), 3, shrioState);
		Object158.velocity.x = -6; 
		var slot8270 = new MocuGame.TimeSlot(8270);	 //Start
		slot8270.addEvent(new MocuGame.Event(Object158, "x", 0, MocuGame.gameWidth, 1));
		slot8270.addEvent(new MocuGame.Event(Object158, "moveAngle", "current", 180-45, 1));
		slot8270.addEvent(new MocuGame.Event(Object158, "moveSpeed", 7, 7, 1));
		Object158.timeline.addSlot(slot8270);
		this.add(Object158);
		var Object159 = new ShrioGame.Plano(new MocuGame.Point(35400.0000000003 , -1489.59999999988), 3, shrioState);
		Object159.velocity.x = -6; 
		var slot8360 = new MocuGame.TimeSlot(8360);	 //Start
		slot8360.addEvent(new MocuGame.Event(Object159, "x", 0, MocuGame.gameWidth, 1));
		slot8360.addEvent(new MocuGame.Event(Object159, "moveAngle", "current", 180-45, 1));
		slot8360.addEvent(new MocuGame.Event(Object159, "moveSpeed", 7, 7, 1));
		Object159.timeline.addSlot(slot8360);
		this.add(Object159);
		var Object160 = new ShrioGame.Plano(new MocuGame.Point(34263.3333333332 , 897.066666666675), 3, shrioState);
		var slot8040 = new MocuGame.TimeSlot(8040);	 //Start
		slot8040.addEvent(new MocuGame.Event(Object160, "x", "current", MocuGame.gameWidth, 1));
		slot8040.addEvent(new MocuGame.Event(Object160, "moveSpeed", 7, 7, 1));
		Object160.timeline.addSlot(slot8040);
		this.add(Object160);
		var Object161 = new ShrioGame.Plano(new MocuGame.Point(34263.3333333332 , 1163.7333333333), 3, shrioState);
		var slot8040 = new MocuGame.TimeSlot(8040);	 //Start
		slot8040.addEvent(new MocuGame.Event(Object161, "x", "current", MocuGame.gameWidth, 1));
		slot8040.addEvent(new MocuGame.Event(Object161, "moveSpeed", 7, 7, 1));
		Object161.timeline.addSlot(slot8040);
		this.add(Object161);
		var Object162 = new ShrioGame.Plano(new MocuGame.Point(35979.9999999999 , 417.066666666701), 3, shrioState);
		var slot7456 = new MocuGame.TimeSlot(7456);	 //Start
		slot7456.addEvent(new MocuGame.Event(Object162, "moveSpeed", "current", 7, 30));
		Object162.timeline.addSlot(slot7456);
		this.add(Object162);
		var Object163 = new ShrioGame.Plano(new MocuGame.Point(35980 , 603.733333333371), 3, shrioState);
		var slot7456 = new MocuGame.TimeSlot(7456);	 //Start
		slot7456.addEvent(new MocuGame.Event(Object163, "moveSpeed", "current", 7, 30));
		Object163.timeline.addSlot(slot7456);
		this.add(Object163);
		var Object164 = new ShrioGame.Plano(new MocuGame.Point(35966.6666666667 , 190.400000000037), 3, shrioState);
		var slot7456 = new MocuGame.TimeSlot(7456);	 //Start
		slot7456.addEvent(new MocuGame.Event(Object164, "moveSpeed", "current", 7, 30));
		Object164.timeline.addSlot(slot7456);
		this.add(Object164);
		var Object165 = new ShrioGame.Plano(new MocuGame.Point(36166.6666666661 , 403.733333333365), 3, shrioState);
		var slot7546 = new MocuGame.TimeSlot(7546);	 //Start
		slot7546.addEvent(new MocuGame.Event(Object165, "moveSpeed", "current", 7, 30));
		Object165.timeline.addSlot(slot7546);
		this.add(Object165);
		var Object166 = new ShrioGame.Plano(new MocuGame.Point(36339.9999999991 , 390.40000000003), 3, shrioState);
		var slot7636 = new MocuGame.TimeSlot(7636);	 //Start
		slot7636.addEvent(new MocuGame.Event(Object166, "moveSpeed", "current", 7, 30));
		Object166.timeline.addSlot(slot7636);
		this.add(Object166);
		var Object167 = new ShrioGame.Dekplane(new MocuGame.Point(39813.3333333328 , -419.200000000009), 3, shrioState);
		var slot9000 = new MocuGame.TimeSlot(9000);	 //Start
		slot9000.addEvent(new MocuGame.Event(Object167, "x", "current", MocuGame.gameWidth-200, 1));
		Object167.timeline.addSlot(slot9000);
		this.add(Object167);
		var Object168 = new ShrioGame.ModularSnake_Head(new MocuGame.Point(32476.6666666672 , 210.399999999999), 3, shrioState);
		var slot7450 = new MocuGame.TimeSlot(7450);	 //Start
		slot7450.addEvent(new MocuGame.Event(Object168, "x", "current", MocuGame.gameWidth, 1));
		Object168.timeline.addSlot(slot7450);
		this.add(Object168);
		var Object169 = new ShrioGame.Sandisc(new MocuGame.Point(48210 , 600.4), 400, shrioState);
		Object169.velocity.x = 0; 
		var slot10000 = new MocuGame.TimeSlot(10000);	 //Start
		slot10000.addEvent(new MocuGame.Event(Object169, "x", "current", MocuGame.gameWidth-700, 1));
		slot10000.addEvent(new MocuGame.Event(Object169, "y", "current", 700, 1));
		Object169.timeline.addSlot(slot10000);
		this.add(Object169);
	}
	ShrioGame.Level1.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
	ShrioGame.Level1.constructor = ShrioGame.Level1;
})();