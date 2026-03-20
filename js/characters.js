// ==========================================
// FILE: js/characters.js
// FUNGSI: Database Karakter (Jalur Cepat)
// ==========================================

const charData = [
    {
        id: "char_banggo",
        name: "BANGGO",
        gender: "PRIA",
        rarity: "N",
        img: "assets/images/banggo.png", 
        skillTitle: "LARI LINTANG PUKANG",
        skillDesc: "Meningkatkan kecepatan gerak dasar sebesar 10% karena terbiasa dikejar-kejar warga yang salah paham.",
        lore: { 
            id: "Lahir di suku Vandar sang penjelajah lincah. Ayahnya menamainya dari pelat besi rongsokan bertuliskan 'Project B.A.N.G.G.O - 004'. Kini, ia berburu mati-matian bukan cuma untuk melindungi desa dari pencurian, tapi karena dendam kesumat namanya dijiplak oleh hama mesin itu!", 
            en: "Born in the agile Vandar tribe, his father named him after a scrap plate reading 'Project B.A.N.G.G.O - 004'. Now, he hunts fiercely not just to protect the village, but out of pure spite because the machine pests stole his name!", 
            mk: "Lahir di suku Vandar. Bapakna na-arengi pole plat rombeng tulisan 'Project B.A.N.G.G.O - 004'. Anjallo berburu mati-matian, baji' untu' jaga kampong, na pole dendam gara-gara arengna naciplak burung rombeng itu!" 
        }
    },
    {
        id: "char_eab",
        name: "EAB",
        gender: "PRIA",
        rarity: "SR",
        img: "assets/images/eab.png",
        skillTitle: "MANIPULASI WAKTU",
        skillDesc: "Memberikan tambahan waktu +3 detik di awal permainan mode Frenzy Rush.",
        lore: { 
            id: "Pemuda jenius dari suku Torra yang tinggal di tebing tinggi dan memuja 'Roh Mesin'. Ia merakit alat pengendali waktu dari inti energi B.A.N.G.G.O yang jatuh saat 'Hujan Besi'. Ia berburu untuk membedah rahasia teknologi Tana Bassi.", 
            en: "A genius youth from the Torra tribe who reveres 'Machine Spirits'. He built a time-control device from a B.A.N.G.G.O core that fell during the Scrap Rain. He hunts to reverse-engineer the tech of Tana Bassi.", 
            mk: "Anak muda palanro pole suku Torra yang puji 'Roh Mesin'. Napare' alat pengendali wattu pole inti B.A.N.G.G.O yang jatuh pas Hujan Bassi. Berburu ki untu' palajari teknologi Tana Bassi." 
        }
    },
    {
        id: "char_edy",
        name: "EDY",
        gender: "PRIA",
        rarity: "SSR",
        img: "assets/images/edy.png",
        skillTitle: "SAUDAGAR LICIK",
        skillDesc: "Meningkatkan perolehan Banggo Coin sebesar 15% setiap kali menyelesaikan pertandingan.",
        lore: { 
            id: "Saudagar licik dari suku Uggi, penguasa mutlak 'Pasar Karat'. Baginya, kawanan B.A.N.G.G.O adalah pundi-pundi koin emas yang terbang bebas. Ia mendanai ekspedisi perburuan demi memonopoli suplai Bulu Emas di seluruh penjuru bumi.", 
            en: "A cunning merchant from the Uggi tribe, absolute ruler of the Rust Market. To him, B.A.N.G.G.O flocks are free-flying gold pouches. He funds hunting expeditions to monopolize the Golden Feather supply.", 
            mk: "Pabisnis licik pole suku Uggi, penguasa Pasar Karat. Untu' ia, B.A.N.G.G.O itu koin eja yang lari-lari di langi'. Nabayari orang berburu untu' kuasai semua Bulu Eja di pasaran." 
        }
    },
    {
        id: "char_ikra",
        name: "IKRA",
        gender: "PRIA",
        rarity: "R",
        img: "assets/images/ikra.png",
        skillTitle: "HOKI TINGKAT DEWA",
        skillDesc: "Peluru yang meleset memiliki peluang 5% untuk memantul dan tetap mengenai target.",
        lore: { 
            id: "Pemuda suku Vandar yang ceroboh dengan senapan rakitan dari pipa curian B.A.N.G.G.O. Meski bidikannya ngawur dan sering tersandung, ia punya keberuntungan aneh yang membuat pelurunya magis selalu mengenai mesin pencuri.", 
            en: "A clumsy Vandar youth with a homemade rifle built from pipes stolen back from B.A.N.G.G.O. Though his aim is terrible, he has bizarre luck that magically guides his bullets to the thieving machines.", 
            mk: "Anak muda Vandar yang saring kana sial, pake bedil rakitan pole pipa curian B.A.N.G.G.O. Biar tembakanna sembarang, hoki na kelewatan selalu kena itu burung pancuri." 
        }
    },
    {
        id: "char_risa",
        name: "RISA",
        gender: "WANITA",
        rarity: "SR",
        img: "assets/images/risa.png",
        skillTitle: "FOKUS EWAKO",
        skillDesc: "Meningkatkan skor dasar dari setiap burung mesin yang ditembak sebesar 10%.",
        lore: { 
            id: "Penembak jitu lincah dari suku Makkaz yang hiper-kompetitif. Ia tak peduli soal logam curian; baginya mencegat mesin-mesin gesit ini adalah olahraga ekstrem untuk membuktikan siapa petarung paling 'Ewako' di sukunya.", 
            en: "A hyper-competitive agile sniper from the Makkaz tribe. She doesn't care about stolen scrap; to her, intercepting these fast machines is an extreme sport to prove who is the ultimate 'Ewako' warrior.", 
            mk: "Penembak jitu lincah pole Makkaz. Tena na urus itu rombeng curian, untu' ia tembak jatuh ini mesin gappa-gappa itu olahraga ekstrem untu' buktiin inai kaminang 'Ewako'." 
        }
    },
    {
        id: "char_remi",
        name: "REMI",
        gender: "WANITA",
        rarity: "R",
        img: "assets/images/remi.png",
        skillTitle: "SUPLAI AMUNISI",
        skillDesc: "Meningkatkan kapasitas maksimal amunisi senapan laras panjang sebanyak 2 peluru.",
        lore: { 
            id: "Mekanik dan pelayan setia Jack. Ia tak peduli soal adat empat suku; fokus utamanya hanyalah memastikan pasokan peluru tuannya tak pernah habis saat tuannya sedang mengamuk menembaki kawanan mesin dari Tana Bassi.", 
            en: "Jack's fiercely loyal mechanic and maid. She cares little for tribal customs; her only focus is ensuring her master's ammo never runs dry while he goes on a rampage against the machines from Tana Bassi.", 
            mk: "Mekanik siagang pelayan setia Jack. Tena na pusing urusan adat suku; fokusna cuman pastikang peluru tuanna tena na habis pas ngamuk nembaki itu burung rombeng." 
        }
    },
    {
        id: "char_lyra",
        name: "LYRA",
        gender: "WANITA",
        rarity: "SSR",
        img: "assets/images/lyra.png",
        skillTitle: "MATA PERTAPA",
        skillDesc: "Memperlambat kecepatan terbang B.A.N.G.G.O raksasa (Boss) sebesar 15%.",
        lore: { 
            id: "Sang pertapa dari tebing tertinggi suku Torra. Ia berburu mesin dengan ketenangan luar biasa demi menghentikan rongsokan 'Hujan Besi' yang perlahan menghancurkan ukiran-ukiran kayu suci peninggalan leluhurnya.", 
            en: "The ascetic from the highest cliffs of Torra. She hunts machines with extraordinary calmness to stop the 'Scrap Rain' that is slowly destroying her ancestors' sacred wooden carvings.", 
            mk: "Pertapa pole tebing tinggi Torra. Berburu mesin siagang tenang dudu untu' kassi brenti 'Hujan Bassi' yang hancuruki patung kayu suci leluhurna." 
        }
    },
    {
        id: "char_elena",
        name: "ELENA",
        gender: "WANITA",
        rarity: "SR",
        img: "assets/images/elena.png",
        skillTitle: "AURA BANGSAWAN",
        skillDesc: "Meningkatkan persentase *drop rate* Golden Feather saat B.A.N.G.G.O emas hancur.",
        lore: { 
            id: "Bangsawan elit Uggi yang menganggap perburuan sebagai hiburan mewah. Ia sengaja mencegat jalur migrasi ke Tana Bassi hanya untuk menembak B.A.N.G.G.O dan mengoleksi Bulu Emas sebagai perhiasan busananya yang elegan.", 
            en: "An elite Uggi noble who considers hunting a luxurious pastime. She intercepts the migration routes to Tana Bassi simply to shoot B.A.N.G.G.O and collect Golden Feathers as high-fashion jewelry.", 
            mk: "Bangsawan elit Uggi yang anggap berburu itu hiburan caradde'. Sengaja na hadang jalurna B.A.N.G.G.O cuman untu' kumpul Bulu Eja dipake baju pamer." 
        }
    },
    {
        id: "char_jack",
        name: "JACK",
        gender: "PRIA",
        rarity: "SSR",
        img: "assets/images/jack.png",
        skillTitle: "AMARAH PALLUBASA",
        skillDesc: "Meningkatkan daya hancur senjata berat (Gatling/Meriam) terhadap B.A.N.G.G.O berzirah tebal.",
        lore: { 
            id: "Mantan petarung garis depan suku Makkaz. Ia mengamuk dan membawa Gatling Gun kesayangannya karena seekor kawanan B.A.N.G.G.O raksasa mencuri panci besi kesayangannya tepat saat ia sedang memasak daging.", 
            en: "A former frontline fighter of the Makkaz tribe. He went on a rampage with his beloved Gatling Gun because a giant B.A.N.G.G.O flock stole his favorite iron pot right while he was cooking meat.", 
            mk: "Mantan petarung paleng depan suku Makkaz. Ngamuk ki bawa Gatling Gun kesayanganna gara-gara ada B.A.N.G.G.O lompo pancuri panci bassi kesayanganna pas lagi masak pallubasa." 
        }
    },
    {
        id: "char_silas",
        name: "SILAS",
        gender: "PRIA",
        rarity: "UR",
        img: "assets/images/silas.png",
        skillTitle: "MEMORI DUNIA LAMA",
        skillDesc: "Mendeteksi B.A.N.G.G.O langka yang membawa Memory Drive (memberikan skor masif).",
        lore: { 
            id: "Wajah lama dari peradaban masa lalu yang tak pernah menua. Ia berkeliaran menembak jatuh B.A.N.G.G.O sekadar untuk mencari sebuah memori drive kuno yang tak sengaja terbawa oleh mesin-mesin klepto tersebut berabad-abad lalu.", 
            en: "An old face from the past civilization who never ages. He wanders around shooting down B.A.N.G.G.O merely to find an ancient memory drive accidentally carried away by the klepto machines centuries ago.", 
            mk: "Tau toayya pole peradaban dulu yang tena na bisa tua. Natembak jatuh B.A.N.G.G.O untu' cari memori drive kuno yang tak sengaja nabawa lari kawanan mesin itu dari dulu." 
        }
    }
];
