import React, { useState, useMemo } from 'react';
import { Calendar, BarChart3, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

const rawData2 = [
    { "id" : 337, "klient" : "BOOKOLIKA SP. Z O.O.", "data_spedycji" : "2026-02-27", "przeloty_druku" : 35620, "przeloty_druku_zakonczone" : 0, "przeloty_falc" : 30000, "przeloty_falc_zakonczone" : 0 },
    { "id" : 524, "klient" : "BAKS Kazimierz Sielski", "data_spedycji" : "2026-02-20", "przeloty_druku" : 391145, "przeloty_druku_zakonczone" : 0, "przeloty_falc" : 350000, "przeloty_falc_zakonczone" : 0 },
    { "id" : 986, "klient" : "STURMER MASZYNY Sp. z o.o.", "data_spedycji" : "2026-02-13", "przeloty_druku" : 428120, "przeloty_druku_zakonczone" : 0, "przeloty_falc" : 410000, "przeloty_falc_zakonczone" : 0 },
    { "id" : 1153, "klient" : "WSIP S.A.", "data_spedycji" : "2026-03-02", "przeloty_druku" : 396340, "przeloty_druku_zakonczone" : 0, "przeloty_falc" : 360000, "przeloty_falc_zakonczone" : 0 },
    { "id" : 1181, "klient" : "WSIP S.A.", "data_spedycji" : "2026-02-23", "przeloty_druku" : 589730, "przeloty_druku_zakonczone" : 0, "przeloty_falc" : 575000, "przeloty_falc_zakonczone" : 0 },
    { "id" : 1197, "klient" : "Agencja Wydawnicza Tomczak Grzegorz", "data_spedycji" : "2026-02-05", "przeloty_druku" : 7520, "przeloty_druku_zakonczone" : 0, "przeloty_falc" : 4800, "przeloty_falc_zakonczone" : 0 }
];

const rawData = [
	{
		"id" : 337,
		"klient_id" : 82,
		"klient" : "BOOKOLIKA SP. Z O.O.",
		"firma_nazwa" : "BOOKOLIKA",
		"data_spedycji" : "2026-02-27",
		"etap" : 2,
		"przeloty_druku" : 35620,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 30000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 524,
		"klient_id" : 146,
		"klient" : "BAKS Kazimierz Sielski",
		"firma_nazwa" : "BAKS",
		"data_spedycji" : "2026-02-20",
		"etap" : 2,
		"przeloty_druku" : 391145,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 350000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 986,
		"klient_id" : 180,
		"klient" : "STURMER MASZYNY Sp. z o.o.",
		"firma_nazwa" : "STURMER",
		"data_spedycji" : "2026-02-13",
		"etap" : 2,
		"przeloty_druku" : 428120,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 410000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1153,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-03-02",
		"etap" : 2,
		"przeloty_druku" : 396340,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 360000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1181,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-02-23",
		"etap" : 2,
		"przeloty_druku" : 589730,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 575000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1197,
		"klient_id" : 148,
		"klient" : "Agencja Wydawnicza Tomczak Grzegorz",
		"firma_nazwa" : " Tomczak",
		"data_spedycji" : "2026-02-05",
		"etap" : 2,
		"przeloty_druku" : 7520,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 4800,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1207,
		"klient_id" : 48,
		"klient" : "Instytut Zarządzania Informacją Sp. zoo",
		"firma_nazwa" : "IZI",
		"data_spedycji" : "2026-02-13",
		"etap" : 2,
		"przeloty_druku" : 67720,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 60890,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1234,
		"klient_id" : 71,
		"klient" : "Stowarzyszenie Filmowców Polskich",
		"firma_nazwa" : "SFP",
		"data_spedycji" : "2026-02-13",
		"etap" : 2,
		"przeloty_druku" : 14320,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 13200,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1236,
		"klient_id" : 65,
		"klient" : "Wojskowy Instytut Wydawniczy w Warszawie",
		"firma_nazwa" : "WIW",
		"data_spedycji" : "2026-02-06",
		"etap" : 2,
		"przeloty_druku" : 135300,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 132000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1221,
		"klient_id" : 80,
		"klient" : "Wydawnictwa Komunikacji i Łączności ",
		"firma_nazwa" : "WKL",
		"data_spedycji" : "2026-02-12",
		"etap" : 3,
		"przeloty_druku" : 11680,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 9000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 990,
		"klient_id" : 2,
		"klient" : "Realise",
		"firma_nazwa" : "Realise",
		"data_spedycji" : "2026-02-18",
		"etap" : 4,
		"przeloty_druku" : 237620,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 221000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1167,
		"klient_id" : 45,
		"klient" : "KLETT POLSKA SPZOO",
		"firma_nazwa" : "Klett",
		"data_spedycji" : "2026-04-09",
		"etap" : 4,
		"przeloty_druku" : 97560,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 89600,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1226,
		"klient_id" : 107,
		"klient" : "Nowa Era Sp. z o.o.",
		"firma_nazwa" : "Nowa Era",
		"data_spedycji" : "2026-02-13",
		"etap" : 4,
		"przeloty_druku" : 45280,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 40000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1229,
		"klient_id" : 56,
		"klient" : "PrintCare Majewski Grzelak sp.k.",
		"firma_nazwa" : "PrintCare",
		"data_spedycji" : "2026-02-09",
		"etap" : 4,
		"przeloty_druku" : 2450,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 3000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1230,
		"klient_id" : 56,
		"klient" : "PrintCare Majewski Grzelak sp.k.",
		"firma_nazwa" : "PrintCare",
		"data_spedycji" : "2026-02-09",
		"etap" : 4,
		"przeloty_druku" : 2700,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 3000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1235,
		"klient_id" : 1,
		"klient" : "DESA Unicum",
		"firma_nazwa" : "DESA",
		"data_spedycji" : "2026-02-05",
		"etap" : 4,
		"przeloty_druku" : 7995,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 4900,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1166,
		"klient_id" : 45,
		"klient" : "KLETT POLSKA SPZOO",
		"firma_nazwa" : "Klett",
		"data_spedycji" : "2026-02-16",
		"etap" : 6,
		"przeloty_druku" : 37260,
		"przeloty_druku_zakonczone" : 35160,
		"przeloty_falc" : 32400,
		"przeloty_falc_zakonczone" : 27000,
		"wydrukowano_procent" : 95
	},
	{
		"id" : 1169,
		"klient_id" : 45,
		"klient" : "KLETT POLSKA SPZOO",
		"firma_nazwa" : "Klett",
		"data_spedycji" : "2026-02-16",
		"etap" : 6,
		"przeloty_druku" : 84200,
		"przeloty_druku_zakonczone" : 82000,
		"przeloty_falc" : 77000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 98
	},
	{
		"id" : 1208,
		"klient_id" : 138,
		"klient" : "PRACOWNIA C C Sp. z o.o.",
		"firma_nazwa" : "PRACOWNIA C C",
		"data_spedycji" : "2026-02-06",
		"etap" : 6,
		"przeloty_druku" : 2830,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 1800,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1217,
		"klient_id" : 107,
		"klient" : "Nowa Era Sp. z o.o.",
		"firma_nazwa" : "Nowa Era",
		"data_spedycji" : "2026-02-19",
		"etap" : 6,
		"przeloty_druku" : 116220,
		"przeloty_druku_zakonczone" : 49140,
		"przeloty_falc" : 105000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 43
	},
	{
		"id" : 1220,
		"klient_id" : 107,
		"klient" : "Nowa Era Sp. z o.o.",
		"firma_nazwa" : "Nowa Era",
		"data_spedycji" : "2026-02-19",
		"etap" : 6,
		"przeloty_druku" : 159900,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 145000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1223,
		"klient_id" : 45,
		"klient" : "KLETT POLSKA SPZOO",
		"firma_nazwa" : "Klett",
		"data_spedycji" : "2026-02-13",
		"etap" : 6,
		"przeloty_druku" : 62140,
		"przeloty_druku_zakonczone" : 8200,
		"przeloty_falc" : 77000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 14
	},
	{
		"id" : 1225,
		"klient_id" : 82,
		"klient" : "BOOKOLIKA SP. Z O.O.",
		"firma_nazwa" : "BOOKOLIKA",
		"data_spedycji" : "2026-02-06",
		"etap" : 6,
		"przeloty_druku" : 19420,
		"przeloty_druku_zakonczone" : 16570,
		"przeloty_falc" : 20000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 86
	},
	{
		"id" : 1233,
		"klient_id" : 69,
		"klient" : "AVT- Korporacja Sp z o.o.",
		"firma_nazwa" : "AVT",
		"data_spedycji" : "2026-02-09",
		"etap" : 6,
		"przeloty_druku" : 21420,
		"przeloty_druku_zakonczone" : 0,
		"przeloty_falc" : 16560,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 0
	},
	{
		"id" : 1082,
		"klient_id" : 2,
		"klient" : "Realise",
		"firma_nazwa" : "Realise",
		"data_spedycji" : "2026-02-04",
		"etap" : 8,
		"przeloty_druku" : 239400,
		"przeloty_druku_zakonczone" : 239400,
		"przeloty_falc" : 228000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1123,
		"klient_id" : 57,
		"klient" : "Macmillan Polska Sp. z o.o.",
		"firma_nazwa" : "Macmillan",
		"data_spedycji" : "2026-02-18",
		"etap" : 8,
		"przeloty_druku" : 354380,
		"przeloty_druku_zakonczone" : 354380,
		"przeloty_falc" : 342000,
		"przeloty_falc_zakonczone" : 198000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1132,
		"klient_id" : 157,
		"klient" : "Wydawnictwo „TALES” Krzysztof Konkel",
		"firma_nazwa" : "TALES Konkel",
		"data_spedycji" : "2026-02-02",
		"etap" : 8,
		"przeloty_druku" : 56160,
		"przeloty_druku_zakonczone" : 56160,
		"przeloty_falc" : 50000,
		"przeloty_falc_zakonczone" : 20000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1133,
		"klient_id" : 156,
		"klient" : "Wydawnictwo „TALES” Marek Doliński",
		"firma_nazwa" : "TALES Doliński",
		"data_spedycji" : "2026-02-02",
		"etap" : 8,
		"przeloty_druku" : 56160,
		"przeloty_druku_zakonczone" : 56160,
		"przeloty_falc" : 50000,
		"przeloty_falc_zakonczone" : 15000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1134,
		"klient_id" : 156,
		"klient" : "Wydawnictwo „TALES” Marek Doliński",
		"firma_nazwa" : "TALES Doliński",
		"data_spedycji" : "2026-02-09",
		"etap" : 8,
		"przeloty_druku" : 64480,
		"przeloty_druku_zakonczone" : 64480,
		"przeloty_falc" : 60000,
		"przeloty_falc_zakonczone" : 25000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1135,
		"klient_id" : 157,
		"klient" : "Wydawnictwo „TALES” Krzysztof Konkel",
		"firma_nazwa" : "TALES Konkel",
		"data_spedycji" : "2026-02-09",
		"etap" : 8,
		"przeloty_druku" : 64480,
		"przeloty_druku_zakonczone" : 64480,
		"przeloty_falc" : 60000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1154,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-29",
		"etap" : 8,
		"przeloty_druku" : 96200,
		"przeloty_druku_zakonczone" : 96200,
		"przeloty_falc" : 0,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1155,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-30",
		"etap" : 8,
		"przeloty_druku" : 73853,
		"przeloty_druku_zakonczone" : 73853,
		"przeloty_falc" : 87800,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1164,
		"klient_id" : 45,
		"klient" : "KLETT POLSKA SPZOO",
		"firma_nazwa" : "Klett",
		"data_spedycji" : "2026-02-16",
		"etap" : 8,
		"przeloty_druku" : 81390,
		"przeloty_druku_zakonczone" : 81390,
		"przeloty_falc" : 74400,
		"przeloty_falc_zakonczone" : 46500,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1179,
		"klient_id" : 159,
		"klient" : "Miłosz Łuniewski",
		"firma_nazwa" : "Miłosz Łuniewski",
		"data_spedycji" : "2026-01-22",
		"etap" : 8,
		"przeloty_druku" : 6800,
		"przeloty_druku_zakonczone" : 6800,
		"przeloty_falc" : 0,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1180,
		"klient_id" : 201,
		"klient" : "PANORAMA",
		"firma_nazwa" : "PANORAMA",
		"data_spedycji" : "2026-01-26",
		"etap" : 8,
		"przeloty_druku" : 700,
		"przeloty_druku_zakonczone" : 700,
		"przeloty_falc" : 0,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1183,
		"klient_id" : 128,
		"klient" : "Italian Fashion by Guazzone Sp. zo.o.",
		"firma_nazwa" : "Italian ",
		"data_spedycji" : "2026-02-04",
		"etap" : 8,
		"przeloty_druku" : 10190,
		"przeloty_druku_zakonczone" : 10190,
		"przeloty_falc" : 4000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1185,
		"klient_id" : 149,
		"klient" : "Grafdrukpol Poligrafia Wróblewski P., Siemieniuk B., Bajszczak W. Spółka Jawna",
		"firma_nazwa" : "Grafdrukpol",
		"data_spedycji" : "2026-01-26",
		"etap" : 8,
		"przeloty_druku" : 600,
		"przeloty_druku_zakonczone" : 600,
		"przeloty_falc" : 0,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1186,
		"klient_id" : 80,
		"klient" : "Wydawnictwa Komunikacji i Łączności ",
		"firma_nazwa" : "WKL",
		"data_spedycji" : "2026-02-05",
		"etap" : 8,
		"przeloty_druku" : 41675,
		"przeloty_druku_zakonczone" : 41675,
		"przeloty_falc" : 42000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1193,
		"klient_id" : 63,
		"klient" : "Medical Tribune Polska Sp. z o.o.",
		"firma_nazwa" : "Medical Trib",
		"data_spedycji" : "2026-02-02",
		"etap" : 8,
		"przeloty_druku" : 5020,
		"przeloty_druku_zakonczone" : 5020,
		"przeloty_falc" : 3300,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1194,
		"klient_id" : 63,
		"klient" : "Medical Tribune Polska Sp. z o.o.",
		"firma_nazwa" : "Medical Trib",
		"data_spedycji" : "2026-02-02",
		"etap" : 8,
		"przeloty_druku" : 3870,
		"przeloty_druku_zakonczone" : 3870,
		"przeloty_falc" : 2400,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1195,
		"klient_id" : 63,
		"klient" : "Medical Tribune Polska Sp. z o.o.",
		"firma_nazwa" : "Medical Trib",
		"data_spedycji" : "2026-02-02",
		"etap" : 8,
		"przeloty_druku" : 7210,
		"przeloty_druku_zakonczone" : 7210,
		"przeloty_falc" : 5100,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1198,
		"klient_id" : 6,
		"klient" : "Magnum X Sp. z o.o.",
		"firma_nazwa" : "Magnum X",
		"data_spedycji" : "2026-01-29",
		"etap" : 8,
		"przeloty_druku" : 27753,
		"przeloty_druku_zakonczone" : 27753,
		"przeloty_falc" : 26100,
		"przeloty_falc_zakonczone" : 17400,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1205,
		"klient_id" : 49,
		"klient" : "VIRIDIA AB SP.Z O.O.",
		"firma_nazwa" : "VIRIDIA",
		"data_spedycji" : "2026-02-03",
		"etap" : 8,
		"przeloty_druku" : 5960,
		"przeloty_druku_zakonczone" : 5960,
		"przeloty_falc" : 10000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1206,
		"klient_id" : 50,
		"klient" : "Kagero Publishing",
		"firma_nazwa" : "Kagero",
		"data_spedycji" : "2026-02-03",
		"etap" : 8,
		"przeloty_druku" : 21570,
		"przeloty_druku_zakonczone" : 21570,
		"przeloty_falc" : 17500,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1211,
		"klient_id" : 189,
		"klient" : "Europrint Media Andrzej Oset",
		"firma_nazwa" : "Europrint ",
		"data_spedycji" : "2026-02-13",
		"etap" : 8,
		"przeloty_druku" : 17333,
		"przeloty_druku_zakonczone" : 17333,
		"przeloty_falc" : 17500,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1218,
		"klient_id" : 150,
		"klient" : "KRM Druk Miller  sp. k.",
		"firma_nazwa" : "KRM Druk Miller",
		"data_spedycji" : "2026-02-02",
		"etap" : 8,
		"przeloty_druku" : 21480,
		"przeloty_druku_zakonczone" : 21480,
		"przeloty_falc" : 0,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1224,
		"klient_id" : 145,
		"klient" : "BETA GRAF Beata Karpińska",
		"firma_nazwa" : "BETA GRAF",
		"data_spedycji" : "2026-02-04",
		"etap" : 8,
		"przeloty_druku" : 2580,
		"przeloty_druku_zakonczone" : 2580,
		"przeloty_falc" : 2000,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1228,
		"klient_id" : 56,
		"klient" : "PrintCare Majewski Grzelak sp.k.",
		"firma_nazwa" : "PrintCare",
		"data_spedycji" : "2026-02-06",
		"etap" : 8,
		"przeloty_druku" : 38220,
		"przeloty_druku_zakonczone" : 38220,
		"przeloty_falc" : 32400,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1087,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-23",
		"etap" : 10,
		"przeloty_druku" : 276120,
		"przeloty_druku_zakonczone" : 276120,
		"przeloty_falc" : 1075000,
		"przeloty_falc_zakonczone" : 1075000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1088,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-23",
		"etap" : 10,
		"przeloty_druku" : 531900,
		"przeloty_druku_zakonczone" : 531900,
		"przeloty_falc" : 2254000,
		"przeloty_falc_zakonczone" : 2254000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1091,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-23",
		"etap" : 10,
		"przeloty_druku" : 7660,
		"przeloty_druku_zakonczone" : 7660,
		"przeloty_falc" : 15000,
		"przeloty_falc_zakonczone" : 15000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1121,
		"klient_id" : 55,
		"klient" : "AgroHorti Media Sp. z o.o.",
		"firma_nazwa" : "AgroHorti",
		"data_spedycji" : "2026-01-19",
		"etap" : 10,
		"przeloty_druku" : 23810,
		"przeloty_druku_zakonczone" : 23810,
		"przeloty_falc" : 22000,
		"przeloty_falc_zakonczone" : 22000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1147,
		"klient_id" : 199,
		"klient" : "300GOSPODARKA Sp. z o.o.",
		"firma_nazwa" : "300GOSPODARKA",
		"data_spedycji" : "2026-01-23",
		"etap" : 10,
		"przeloty_druku" : 9620,
		"przeloty_druku_zakonczone" : 9620,
		"przeloty_falc" : 8000,
		"przeloty_falc_zakonczone" : 8000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1162,
		"klient_id" : 164,
		"klient" : "Polski Związek Piłki Nożnej",
		"firma_nazwa" : "PZPN",
		"data_spedycji" : "2026-01-30",
		"etap" : 10,
		"przeloty_druku" : 49920,
		"przeloty_druku_zakonczone" : 49920,
		"przeloty_falc" : 44000,
		"przeloty_falc_zakonczone" : 44000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 936,
		"klient_id" : 138,
		"klient" : "PRACOWNIA C C Sp. z o.o.",
		"firma_nazwa" : "PRACOWNIA C C",
		"data_spedycji" : "2025-11-25",
		"etap" : 11,
		"przeloty_druku" : 59335,
		"przeloty_druku_zakonczone" : 59335,
		"przeloty_falc" : 55500,
		"przeloty_falc_zakonczone" : 55500,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 974,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-01-08",
		"etap" : 11,
		"przeloty_druku" : 41240,
		"przeloty_druku_zakonczone" : 41240,
		"przeloty_falc" : 36000,
		"przeloty_falc_zakonczone" : 36000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 975,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-01-08",
		"etap" : 11,
		"przeloty_druku" : 61340,
		"przeloty_druku_zakonczone" : 61340,
		"przeloty_falc" : 54000,
		"przeloty_falc_zakonczone" : 54000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1003,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-01-08",
		"etap" : 11,
		"przeloty_druku" : 84755,
		"przeloty_druku_zakonczone" : 84755,
		"przeloty_falc" : 75300,
		"przeloty_falc_zakonczone" : 75300,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1007,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-01-08",
		"etap" : 11,
		"przeloty_druku" : 84755,
		"przeloty_druku_zakonczone" : 84755,
		"przeloty_falc" : 75300,
		"przeloty_falc_zakonczone" : 75300,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1084,
		"klient_id" : 62,
		"klient" : "WSIP S.A.",
		"firma_nazwa" : "WSIP",
		"data_spedycji" : "2026-01-14",
		"etap" : 11,
		"przeloty_druku" : 180060,
		"przeloty_druku_zakonczone" : 180060,
		"przeloty_falc" : 154000,
		"przeloty_falc_zakonczone" : 154000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1089,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-23",
		"etap" : 11,
		"przeloty_druku" : 77000,
		"przeloty_druku_zakonczone" : 77000,
		"przeloty_falc" : 315000,
		"przeloty_falc_zakonczone" : 315000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1090,
		"klient_id" : 194,
		"klient" : "VPRINT",
		"firma_nazwa" : "VPRINT",
		"data_spedycji" : "2026-01-23",
		"etap" : 11,
		"przeloty_druku" : 1160,
		"przeloty_druku_zakonczone" : 1160,
		"przeloty_falc" : 1500,
		"przeloty_falc_zakonczone" : 1500,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1111,
		"klient_id" : 63,
		"klient" : "Medical Tribune Polska Sp. z o.o.",
		"firma_nazwa" : "Medical Trib",
		"data_spedycji" : "2026-01-15",
		"etap" : 11,
		"przeloty_druku" : 4220,
		"przeloty_druku_zakonczone" : 4220,
		"przeloty_falc" : 2700,
		"przeloty_falc_zakonczone" : 2700,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1117,
		"klient_id" : 69,
		"klient" : "AVT- Korporacja Sp z o.o.",
		"firma_nazwa" : "AVT",
		"data_spedycji" : "2026-01-14",
		"etap" : 11,
		"przeloty_druku" : 6220,
		"przeloty_druku_zakonczone" : 6220,
		"przeloty_falc" : 5000,
		"przeloty_falc_zakonczone" : 5000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1172,
		"klient_id" : 107,
		"klient" : "Nowa Era Sp. z o.o.",
		"firma_nazwa" : "Nowa Era",
		"data_spedycji" : "2026-02-06",
		"etap" : 11,
		"przeloty_druku" : 54520,
		"przeloty_druku_zakonczone" : 54520,
		"przeloty_falc" : 60000,
		"przeloty_falc_zakonczone" : 30000,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1187,
		"klient_id" : 48,
		"klient" : "Instytut Zarządzania Informacją Sp. zoo",
		"firma_nazwa" : "IZI",
		"data_spedycji" : "2026-01-30",
		"etap" : 11,
		"przeloty_druku" : 39840,
		"przeloty_druku_zakonczone" : 39840,
		"przeloty_falc" : 35240,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	},
	{
		"id" : 1219,
		"klient_id" : 69,
		"klient" : "AVT- Korporacja Sp z o.o.",
		"firma_nazwa" : "AVT",
		"data_spedycji" : "2026-02-03",
		"etap" : 11,
		"przeloty_druku" : 9480,
		"przeloty_druku_zakonczone" : 9480,
		"przeloty_falc" : 6440,
		"przeloty_falc_zakonczone" : 0,
		"wydrukowano_procent" : 100
	}
]
;

const Wykres = () => {
  const [viewType, setViewType] = useState('daily');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem',
      fontFamily: 'sans-serif',
      color: '#0f172a'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    titleSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    mainTitle: {
      fontSize: '1.875rem',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: 0
    },
    subTitle: {
      color: '#64748b',
      marginTop: '0.25rem',
      fontWeight: '500'
    },
    buttonGroup: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: '0.25rem',
      borderRadius: '0.75rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    navButton: (active) => ({
      padding: '0.5rem 1.25rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '700',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: active ? '#4f46e5' : 'transparent',
      color: active ? '#fff' : '#64748b',
      transition: 'all 0.2s'
    }),
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: '#fff',
      padding: '1.25rem',
      borderRadius: '1rem',
      border: '1px solid #f1f5f9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    iconBox: (color) => ({
      padding: '0.75rem',
      borderRadius: '0.75rem',
      backgroundColor: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    chartCard: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '1.5rem',
      border: '1px solid #f1f5f9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2.5rem'
    },
    legend: {
      display: 'flex',
      gap: '1rem',
      fontSize: '0.75rem',
      fontWeight: '700'
    },
    chartViewport: {
      position: 'relative',
      height: '384px',
      display: 'flex',
      alignItems: 'end',
      gap: '1.5rem',
      padding: '0 2rem',
      borderBottom: '1px solid #f1f5f9'
    },
    yAxis: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontSize: '10px',
      fontWeight: '700',
      color: '#cbd5e1',
      pointerEvents: 'none'
    },
    barContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'end',
      position: 'relative'
    },
    barGroup: {
      display: 'flex',
      alignItems: 'end',
      gap: '4px',
      width: '100%',
      maxWidth: '60px',
      height: '100%'
    },
    bar: (height, color) => ({
      flex: 1,
      backgroundColor: color,
      height: `${height}%`,
      borderRadius: '2px 2px 0 0',
      transition: 'height 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    }),
    label: {
      position: 'absolute',
      bottom: '-30px',
      fontSize: '10px',
      fontWeight: '700',
      color: '#94a3b8',
      whiteSpace: 'nowrap'
    }
  };

  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const processedData = useMemo(() => {
    const groups = {};
    rawData.forEach(item => {
      const date = new Date(item.data_spedycji);
      let key;
      if (viewType === 'daily') key = item.data_spedycji;
      else if (viewType === 'weekly') key = `Tydzień ${getWeekNumber(date)}`;
      else key = `${date.toLocaleString('pl-PL', { month: 'long' })}`;

      if (!groups[key]) {
        groups[key] = { label: key, druku: 0, falc: 0, timestamp: date.getTime() };
      }
      groups[key].druku += item.przeloty_druku;
      groups[key].falc += item.przeloty_falc;
    });
    return Object.values(groups).sort((a, b) => a.timestamp - b.timestamp);
  }, [viewType]);

  const maxVal = useMemo(() => {
    const allValues = processedData.flatMap(d => [d.druku, d.falc]);
    return Math.max(...allValues, 1000);
  }, [processedData]);

  const stats = useMemo(() => {
    return rawData.reduce((acc, curr) => ({
      druku: acc.druku + curr.przeloty_druku,
      falc: acc.falc + curr.przeloty_falc,
      druku_zak: acc.druku_zak + curr.przeloty_druku_zakonczone,
      falc_zak: acc.falc_zak + curr.przeloty_falc_zakonczone,
    }), { druku: 0, falc: 0, druku_zak: 0, falc_zak: 0 });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>
              <BarChart3 size={32} color="#4f46e5" /> Raport Produkcji
            </h1>
            <span style={styles.subTitle}>Zestawienie przelotów (Stylizacja Inline React)</span>
          </div>

          <div style={styles.buttonGroup}>
            {['daily', 'weekly', 'monthly'].map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                style={styles.navButton(viewType === type)}
              >
                {type === 'daily' ? 'Dzienny' : type === 'weekly' ? 'Tygodniowy' : 'Miesięczny'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#2563eb')}><BarChart3 size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase'}}>Suma Druku</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.druku.toLocaleString()}</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#10b981')}><CheckCircle2 size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase'}}>Druk Gotowy</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.druku_zak.toLocaleString()}</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#f59e0b')}><Clock size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase'}}>Suma Falc</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.falc.toLocaleString()}</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.iconBox('#14b8a6')}><CheckCircle2 size={20}/></div>
            <div>
              <div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase'}}>Falc Gotowy</div>
              <div style={{fontSize: '1.25rem', fontWeight: 900}}>{stats.falc_zak.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h2 style={{fontSize: '1.125rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Calendar size={18} color="#6366f1" /> Harmonogram Spedycji
            </h2>
            <div style={styles.legend}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6'}}></div> Druk
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b'}}></div> Falc
              </div>
            </div>
          </div>

          <div style={styles.chartViewport}>
            <div style={styles.yAxis}>
              <span>{maxVal.toLocaleString()}</span>
              <span>{(maxVal/2).toLocaleString()}</span>
              <span>0</span>
            </div>

            {processedData.map((group, idx) => (
              <div key={idx} style={styles.barContainer}>
                <div style={styles.barGroup}>
                  <div 
                    title={`Druk: ${group.druku}`}
                    style={styles.bar((group.druku / maxVal) * 100, '#3b82f6')}
                  ></div>
                  <div 
                    title={`Falc: ${group.falc}`}
                    style={styles.bar((group.falc / maxVal) * 100, '#f59e0b')}
                  ></div>
                </div>
                <div style={styles.label}>{group.label}</div>
              </div>
            ))}
          </div>
          <div style={{height: '40px'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Wykres;