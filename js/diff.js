"use strict";
//���ڸ��������������бȶ�
//ʹ�÷���: ������������Դ��� source/index.htm ҳ�ż��� <script language="javascript" src="/js/diff.js"></script>
function loadJS(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
	script.charset = 'UTF-8';
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function() { //���������
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
function log(o){
	for(var i in arguments){
		console.log(arguments[i]);
	}
}
function go(){ //إ�Ľ����������������ȶ�
	var h = [];
	var c = 0; //1Ϊ���
	var start = 1457698.231017 - 14; //-721-12-17 - 14
	var year = 0;
	var fs = [];
	
	for0:for(var st=0; ; st++){
		if(start + st >= 2561118){ //2300-01-01
			log("End.");
			break;
		}
		
		var jd = start + st - 2451545;
		var W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355; //355��2000.12����,�õ��Ͽ���jd�Ķ�������ֵ
		if (SSQ.calc(W, '��') > jd) {
			W -= 365.2422;
		}

		var A = [];
		var B = [];
		for (var i = 0; i < 24; i++) {
			A[i] = SSQ.calc(W + 15.2184 * i, '��') + 2451545; //24������ʱ��(����ʱ��),�Ӷ�����ʼ����һ�������Ժ�
		}
		
		var [year] = p.Jtime(A[0]);
		var dj = p.GetAdjustedJQ(year, true);
		B[0] = dj[18];
		B[1] = dj[19];
		B[2] = dj[20];
		B[3] = dj[21];
		B[4] = dj[22];
		B[5] = dj[23];
		var dj = p.GetAdjustedJQ(year+1, true);
		for(var j=6; j<=23; j++){
			B[j] = dj[j-6];
		}
		for(var j=0; j<24; j++){

			var i = (18 + j)%24;
			
			var [yy, mm, dd, hh, mt, ss] = p.Jtime(A[j]);
			
			var [yy2, mm2, dd2, hh2, mt2, ss2] = p.Jtime(B[j]);
			
			if((yy != yy2) || (mm != mm2) || (dd != dd2)){
				if(j <= 5){
					var fy = year;
					var fi = j + 18;
				}
				if(j >= 6){
					var fy = year + 1;
					var fi = j - 6;
				}
				var fd = A[j] - p.Jdays(yy2, mm2, dd2, 12, 0, 0);
				
				if(fs[fy] == undefined){
					fs[fy] = new Array();
				}
				fs[fy][fi] = fd;
				
				//log(p.jq[i])
				
				log([yy, mm, dd, hh, mt, ss]);
				log([yy2, mm2, dd2, hh2, mt2, ss2]);
				break for0;
			}
		}
	}
	
	var sp = '';
	var sj = "var jqXFu = {\n";
	for(var year in fs){
		sp += (year + "=>[");
		sj += ((year<0?"'":"")+year+(year<0?"'":"") + ":{");
		for(var i in fs[year]){
			sp += (i+"=>"+fs[year][i]+",");
			sj += (i+":"+fs[year][i]+",");
		}
		sp = sp.substr(0, sp.length-1);
		sj = sj.substr(0, sj.length-1);
		sp += "],\n";
		sj += "},\n";
	}
	sj += "}\n";
	log(sp);
	log(sj)
}
function go2(){ //˷�����������������ȶ�(�ܺ�ʱ)
	var h = [];
	var c = 0; //1Ϊ���
	var start = 1457698.231017 - 14; //-721-12-17 - 14
	var year = 0;
	var fs = [];
	
	for0:for(var st=0; ; st++){
		if(start + st >=  2561118){ //2300-01-01
			log("End.");
			break;
		}
		var jd = start + st - 2451545;
		var W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355; //355��2000.12����,�õ��Ͽ���jd�Ķ�������ֵ
		if (SSQ.calc(W, '��') > jd) {
			W -= 365.2422;
		}

		var A = [];
		var B = [];
		for (var i = 0; i < 24; i++) {
			A[i] = SSQ.calc(W + 15.2184 * i, '��') + 2451545; //24������ʱ��(����ʱ��),�Ӷ�����ʼ����һ�������Ժ�
		}
		var w = SSQ.calc(A[0] - 2451545, '˷') + 2451545; //��Ͽ���������˷��
        if (w > A[0]) {
			w -= 29.53;
        }

		var A = [];
        //��������˷,����14���µ�ʼĩ
        for (i = 0; i <= 15; i++) {
            A[i] = SSQ.calc(w - 2451545 + 29.5306 * i, '˷') + 2451545;
        }

		var [year] = p.Jtime(A[0]);
		var B = p.GetSMsinceWinterSolstice(year+1, true);
		for(var j=0; j<16; j++){
			var [yy, mm, dd, hh, mt, ss] = p.Jtime(A[j]);
			var [yy2, mm2, dd2, hh2, mt2, ss2] = p.Jtime(B[j]);
			
			if((yy != yy2) || (mm != mm2) || (dd != dd2)){
				var fy = year + 1;
				var fi = j;

				var fd = A[j] - p.Jdays(yy2, mm2, dd2, 12, 0, 0);
				
				if(fs[fy] == undefined){
					fs[fy] = new Array();
				}
				fs[fy][fi] = fd;

				//log("����:",[yy, mm, dd, hh, mt, ss]);
				//log([yy2, mm2, dd2, hh2, mt2, ss2]);
				log(A);
				log(B);
		
				break for0;
			}
		}
	}

	var sp = '';
	var sj = "var smXFu = {\n";
	for(var year in fs){
		sp += (year + "=>[");
		sj += (year + ":{");
		for(var i in fs[year]){
			sp += (i+"=>"+fs[year][i]+",");
			sj += (i+":"+fs[year][i]+",");
		}
		sp = sp.substr(0, sp.length-1);
		sj = sj.substr(0, sj.length-1);
		sp += "],\n";
		sj += "},\n";
	}
	sj += "}\n";
	log(sp);
	log(sj)
}
function go3(){ //619-01-21��2300-01-01����˷��
	var tjd = new Array();
	var tjd2 = new Array();

	for(var jd = 1947148; jd <= 2561118; jd += 1){
		var [yy, mm, dd] = p.Jtime(jd);
		var jdnm = p.GetSMsinceWinterSolstice(yy, true);
		
		for(var i in jdnm){
			jdnm[i] = Math.floor(jdnm[i] + 0.5);
			if(tjd.indexOf(jdnm[i]) == -1){
				tjd.push(jdnm[i]);
			}
		}
	}
	
	var start = 1947148;
	var fs = [];
	for0:for(var st=0; ; st++){
		if(start + st >= 2561118){
			break;
		}
		var jd = start + st - 2451545;
		var W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355; //355��2000.12����,�õ��Ͽ���jd�Ķ�������ֵ
		if (SSQ.calc(W, '��') > jd) {
			W -= 365.2422;
		}

		var A = [];
		for (var i = 0; i < 24; i++) {
			A[i] = SSQ.calc(W + 15.2184 * i, '��') + 2451545; //24������ʱ��(����ʱ��),�Ӷ�����ʼ����һ�������Ժ�
		}
		var w = SSQ.calc(A[0] - 2451545, '˷') + 2451545; //��Ͽ���������˷��
        if (w > A[0]) {
			w -= 29.53;
        }
        //��������˷,����14���µ�ʼĩ
        for (i = 0; i <= 15; i++) {
            var moon = SSQ.calc(w - 2451545 + 29.5306 * i, '˷') + 2451545;
			if(tjd2.indexOf(moon) == -1){
				tjd2.push(moon);
			}
		}
	}
	log(tjd);
	log(tjd2);
}
loadJS('/js/paipan.js', function(){ //�����������������Ƚ�ũ������
		var ym = SSQ.ym.slice(2);
		
		p.debug = true;
		for(var Y=2100,M=1; Y <= 2300; M++){//break; //����תũ��֧��-721����2300��,��ũ����ת֧��-104����2300��
			for(var i = 0; i < 31; i++) {
				lun.lun[i] = new Object();
			}
			lun.yueLiCalc(Y, M);
			for(var i = 0; i <= 31; i++){
				var a = lun.lun[i];
				if(a == undefined){
					break;
				}
				if(Object.keys(a).length == 0){
					continue;
				}
				var [y, m, d, r, ob] = p.Solar2Lunar(a.y, a.m, a.d);
				ob.ym = ob.ym.replace("��",''); //��ob���ó��Ĳ��ܽ��бȶ�

				var y2 = a.Lyear0 + 1984;
				var m2 = a.Lmc;
				var d2 = a.Ldi+1;
				var r2 = a.Lleap == '' ? false : true;
				
				if(m2 == 'ʮ��' || m2 == '���'){
					r2 = true;
				}
				var flag = true;
				if(ob.yi != y2){
					flag = false;
				}
				if(ob.ym != m2){
					flag = false;
				}
				if(d != d2){
					flag = false;
				}
				if(r != r2){
					flag = false;
				}
				
				if(a.y > -104){ //��֮��Ĳ�����ת
					var [y3, m3, d3] = p.Lunar2Solar(y, m, d, r);
					if((y3 != a.y) || (m3 != a.m) || (d3 != a.d)){
						log("����: ũ��������ת.");
						flag = false;
					}
				}
				
				//log("����:"+a.y+"-"+a.m+"-"+a.d+":::::::::����:"+y2+"-"+m2+"-"+d2+":::::::::����:"+ob.yi+"-"+ob.ym+"-"+d+"-"+r+"::::"+flag);
				
				if(flag == false){

					log("����:"+a.y+"-"+a.m+"-"+a.d+":::::::::����:"+y2+"-"+m2+"-"+d2+":::::::::����:"+ob.yi+"-"+ob.ym+"-"+d+"-"+r+"::::"+flag);

					break;
				}
			}
			if(flag === false){
				break;
			}
			if(M >= 12){
				M = 0; 
				Y += 1;
				
				log(Y)
			}
		}
});

