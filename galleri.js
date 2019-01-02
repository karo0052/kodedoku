// når DOM'en er loadet kaldes funktionen getJSON
document.addEventListener("DOMContentLoaded", getJSON);

//variabel for det filter, som filtrerer efter, hvorvidt værket er til salg eller ej. Fra start er filteret sat til "ja", da programmet som udgangspunkt skal vise de værker, der er til salg
let kategoriFilter = "Ja";

//variabel for subfiltreringen - altså maleri, tegning eller keramik
let kategoriFilterSub;

// variabel for data fra JSON fil
let myArt;

// variabel for destinationen - altså den div i galleri.html, som har klassen "data-content" - hvor data fra Wordpress indsættes
let dest = document.querySelector(".data-content");

//variabel for den div - med id'et "modal" - hvori info tilhørende modal indsættes
let modal = document.querySelector("#modal");

//variabel for det klikkede element i subfiltreringen
let selected;

//Henter wordpress data og konverterer til JSON
async function getJSON() {

    let myJSON = await fetch("https://www.lowson.dk/kea/2Sem/02_sem_eksamen_GR_17/wordpress//wp-json/wp/v2/vaerker?per_page=100");
    myArt = await myJSON.json();

    //    console.log(myArt);
    // kalder funktionen visSide direkte
    visSide();
}

function visSide() {
    // tilføjer klassen "active" til "dropdown_salg" for at subfiltreringen for værker til salg er synlig som udgangspunkt
    document.querySelector(".dropdown_salg").classList.add("active");

    // hvis skærmen er større end 1100, skal der ske følgende:
    if (window.innerWidth >= 1100) {
        // tilføjer en klasse til knappen 'tidligere', så den får en ny position for ikke at lægge sig bag subfiltreringen fra værker til salg
        document.querySelector(".ikke_salg").classList.add("position2");
    }
    // eventlistener, som lytter på, hvorvidt der bliver klikket på knappen 'til salg'. Hvis der bliver klikket medfører det:
    document.querySelector(".salg").addEventListener("click", () => {
        // at subfiltreringen for tidligere værker klappes sammen
        document.querySelector(".dropdown_ikke_salg").classList.remove("active");


        //        ER DENNE OVERFLØDIG?document.querySelector(".dropdown_ikke_salg").classList.remove("filtrering_aktiv");


        // at det lyserøde penselstrøg fjernes fra knappen tidligere værker
        document.querySelector(".ikke_salg").classList.remove("filtrering_aktiv");
        // fjerner klassen pink, som gør skriften pink i værker, der ikke er til salg
        document.querySelector(".ikke_salg").classList.remove("pink");
        // toggler (tilføjer/fjerner) klassen "active" - altså viser/gemmer subfiltreringen
        document.querySelector(".dropdown_salg").classList.toggle("active");

        //  ER DENNE OVERFLØDIG?      document.querySelector(".salg").classList.toggle("pink");

        //tilføjer det lyserøde penselstrøg
        document.querySelector(".salg").classList.add("filtrering_aktiv");

        // hvis skærmen er større end 1100, skal der ske følgende:
        if (window.innerWidth >= 1100) {
            // knappen 'tidligere' tilføjes/fjernes klassen 'position2' alt afhængig af om subfiltreringen for værker til salg er åben eller ej
            document.querySelector(".ikke_salg").classList.toggle("position2");
        }

    });

    //eventlistener som lytter på, om der bliver trykket på knappen 'tidligere'. Hvis der bliver klikket medfører det:
    document.querySelector(".ikke_salg").addEventListener("click", () => {


        //   ER DENNE OVERFLØDIG?     document.querySelector(".salg").classList.remove("pink");

        // gemmer subfiltreringen for værker, der er til salg
        document.querySelector(".dropdown_salg").classList.remove("active");

        // fjerner det lyserøde penselstrøg på 'til salg'
        document.querySelector(".salg").classList.remove("filtrering_aktiv");

        // toggler (tilføjer/fjerner) klassen "active" - altså viser/gemmer subfiltreringen
        document.querySelector(".dropdown_ikke_salg").classList.toggle("active");


        //  ER DENNE OVERFLØDIG?      document.querySelector(".ikke_salg").classList.toggle("pink");

        //tilføjer det lyserøde penselstrøg
        document.querySelector(".ikke_salg").classList.add("filtrering_aktiv");

        // hvis skærmen er større end 1100, skal der ske følgende:
        if (window.innerWidth >= 1100) {
            // rykker positionen for subfiltreringen tilhørende knappen 'tidligere'
            document.querySelector(".ikke_salg").classList.remove("position2");
        }
    });

    //filter på top niveau
    //eventlistener, som lytter på, hvorvidt der bliver klikket på 'til salg' eller 'tidligere'. Hvis der gør, kaldes funktionen filtrering
    document.querySelectorAll(".menu-item").forEach(knap => {
        knap.addEventListener("click", filtrering);
    });

    // funktion der filtrerer efter om værkerne er til salg eller ej
    function filtrering() {
        //fjerner den pink farve i subfiltreringen - fordi der som udgangspunkt vises alle værker til salg - eller alle værker, der ikke er til salg - ved klik på en af knapperne.
        document.querySelectorAll(".sub-item").forEach(punkt => {
            punkt.classList.remove("pink");
        })
        // "tavlen viskes ren". Alt indhold i destinationen i HTML fjernes, før det bliver udfyldt
        dest.textContent = "";
        //kategorifilteret sættes lig med værdien af attributten, data-kategori, for det HTML-element, der klikkes på.
        kategoriFilter = this.getAttribute("data-kategori");

        //        console.log("kategoriFilter");

        //kalder funktionen showArt direkte
        showArt();
    }
    //filter på under niveau
    //eventlistener, som lytter på, hvorvidt der klikkes på en af knapperne i subfiltreringen. Hvis der gør, kaldes funktionen subFiltrering.
    document.querySelectorAll(".sub-item").forEach(knap => {
        knap.addEventListener("click", subfiltrering);
    });


    function subfiltrering() {
        document.querySelectorAll(".sub-item").forEach(punkt => {
            // tavlen viskes ren. Den pink farve fjernes fra alle knapper i subfiltreringen
            punkt.classList.remove("pink");
        })

        // variablen selected sættes lig med det klikkede element
        selected = event.target;
        // det klikkede element tilføjes klassen pink, så skriftfarven bliver pink
        selected.classList.add("pink");


        //        console.log("subfiltrering?");

        // "tavlen viskes ren". Alt indhold i destinationen i HTML fjernes, før det bliver udfyldt
        dest.textContent = "";

        //kategorisubfilteret sættes lig med værdien af attributten, data-kategori, for det HTML-element, der klikkes på.
        kategoriFilterSub = this.getAttribute("data-kategori");
        //        console.log(kategoriFilterSub);

        // kalder funktionen showArtSub
        showArtSub();
    }

    //kør en foreach loop igennem arrayet og find defineret data og indsæt i template
    function showArt() {
        // scroller til toppen af siden hver gang den funktion kaldes
        window.scrollTo(0, 0);
        // variabel for den template som udfyldes og kopieres for hvert værk
        let myTemplate = document.querySelector("#data-template");
        // for hvert værk fra wordpress:
        myArt.forEach(artwork => {
            // if statements bruges til at filtrere indholdet ud fra om det er til salg eller ej. Hvis kategorifilteret er 'ja', så vises alle værker til salg - hvis 'nej', vises tidligere værker. Kategorifilterets værdi afgøres af, hvilken knap, der er klikket på. Hvis der ikke er kliket, så er det som udgangspunkt 'ja', da det er angivet øverst, hvor variablen erklæres
            if (artwork.acf.er_vaerket_til_salg == kategoriFilter) {
                //                console.log(kategoriFilter);
                let klon = myTemplate.cloneNode(true).content;
                //indsætter billede af værket
                klon.querySelector("img").src = artwork.acf.billede_af_vaerk;
                //indsætter alt-tekst til billedet
                klon.querySelector("img").alt = artwork.type + " " + artwork.acf.kategori + " " + artwork.acf.vaerkets_navn;
                //eventlistener, som lytter på, om der bliver klikket på billederne af værkerne. Hvis der gør, kaldes funktionen visModal
                klon.querySelector("img").addEventListener("click", () => {
                    visModal(artwork);
                });
                // if og else statement der sørger for at hente værkets navn, og hvis værket ikke har et navn, skriver den "unavngivet værk"
                if (artwork.acf.vaerkets_navn != "") {
                    klon.querySelector("h2").innerHTML = artwork.acf.vaerkets_navn;
                } else {
                    klon.querySelector("h2").innerHTML = '"Unavngivet værk"';
                }
                // hvis værket har en bredde og højde hentes disse
                if (artwork.acf.bredde != "" || artwork.acf.hojde != "") {
                    klon.querySelector(".data-size").innerHTML = artwork.acf.bredde + " x " + artwork.acf.hojde + " cm  ";
                }
                // hvis værket har en bredde OG en beskrivelse af materiale hentes disse og indsættes samme sted
                if (artwork.acf.bredde != "" && artwork.acf.materiale != "") {
                    klon.querySelector(".data-size").innerHTML = artwork.acf.bredde + " x " + artwork.acf.hojde + " cm  " + " -  " + artwork.acf.materiale;
                }
                // hvis værket har en diameter hentes denne
                if (artwork.acf.diameter != "") {
                    klon.querySelector(".data-diametri").innerHTML = "Diameter: " + artwork.acf.diameter + " cm";
                }
                // hvis værket har en pris hentes denne
                if (artwork.acf.pris != "") {
                    klon.querySelector(".data-pris").innerHTML = "Pris: " + artwork.acf.pris + " kr.";
                }
                // placerer klonen i den angivede destination i HTML-koden
                dest.appendChild(klon);
            }
        })
    }

    function showArtSub() {
        //        console.log("show art sub");
        //        console.log(kategoriFilter);
        //        console.log(kategoriFilterSub);

        //visker tavlen ren, inden indhold udfyldes
        dest.textContent = "";

        // scroller til toppen af siden
        window.scrollTo(0, 0);
        // variabel for den template som udfyldes og kopieres for hvert værk
        let myTemplate = document.querySelector("#data-template");
        // for hvert værk fra wordpress:
        myArt.forEach(artwork => {
            //if statement som tager højde for både filtreringen og subfiltreringen - altså 'ja' eller 'nej' (kategoriFilter) OG 'maleri', 'tegning' eller 'keramik' (kategoriFilterSub)
            if (artwork.acf.er_vaerket_til_salg == kategoriFilter && kategoriFilterSub == artwork.acf.kategori) {
                let klon = myTemplate.cloneNode(true).content;
                //indsætter billede af værk
                klon.querySelector("img").src = artwork.acf.billede_af_vaerk;
                //indsætter alt-tekst til billede
                klon.querySelector("img").alt = artwork.type + " " + artwork.acf.kategori + " " + artwork.acf.vaerkets_navn;
                //eventlistener, der lytter på, hvorvidt der bliver klikket på et af billederne, hvorefter visModal for det klikkede værk vises
                klon.querySelector("img").addEventListener("click", () => {
                    visModal(artwork);
                });
                // hvis værket har et navn indsættes dette
                if (artwork.acf.vaerkets_navn != "") {
                    klon.querySelector("h2").innerHTML = artwork.acf.vaerkets_navn;
                } else {
                    //ellers skriver den unavngivet værk
                    klon.querySelector("h2").innerHTML = '"Unavngivet værk"';
                }
                // hvis værket har en bredde og højde hentes disse
                if (artwork.acf.bredde != "" || artwork.acf.hojde != "") {
                    klon.querySelector(".data-size").innerHTML = artwork.acf.bredde + " x " + artwork.acf.hojde + " cm  ";
                }
                // hvis værket har en bredde OG en beskrivelse af materiale hentes disse og indsættes samme sted
                if (artwork.acf.bredde != "" && artwork.acf.materiale != "") {
                    klon.querySelector(".data-size").innerHTML = artwork.acf.bredde + " x " + artwork.acf.hojde + " cm  " + " -  " + artwork.acf.materiale;
                }
                // hvis værket har en diameter hentes denne
                if (artwork.acf.diameter != "") {
                    klon.querySelector(".data-diametri").innerHTML = "Diameter: " + artwork.acf.diameter + " cm";
                }
                // hvis værket har en pris hentes denne
                if (artwork.acf.pris != "") {
                    klon.querySelector(".data-pris").innerHTML = "Pris: " + artwork.acf.pris + " kr.";
                }
                // placerer klonen i den angivede destination i HTML-koden
                dest.appendChild(klon);
            }
        })
    }

    function visModal(art) {
        // gør modalen synlig
        modal.classList.add("show");

        // visker tavlen ren
        modal.querySelector("h2").innerHTML = "";
        modal.querySelector(".data-size").innerHTML = "";
        modal.querySelector(".data-diametri").innerHTML = "";
        modal.querySelector(".data-pris").innerHTML = "";

        // indsætter billede
        modal.querySelector("img").src = art.acf.billede_af_vaerk;
        // indsætter alt-tekst til billede
        modal.querySelector("img").alt = art.type + " " + art.acf.kategori + " " + art.acf.vaerkets_navn;
        // indsætter værkets navn
        modal.querySelector("h2").innerHTML = art.acf.vaerkets_navn;

        // hvis værket har en højde og bredde indsættes disse
        if (art.acf.bredde != "" || art.acf.hojde != "") {
            modal.querySelector(".data-size").innerHTML = art.acf.bredde + " x " + art.acf.hojde + " cm";
        }
        // hvis værket har en bredde OG en beskrivelse af materiale hentes disse og indsættes samme sted
        if (art.acf.bredde != "" && art.acf.materiale != "") {
            modal.querySelector(".data-size").innerHTML = art.acf.bredde + " x " + art.acf.hojde + " cm - " + art.acf.materiale;
        }
        // hvis værket har en diameter hentes denne
        if (art.acf.diameter != "") {
            modal.querySelector(".data-diametri").innerHTML = "Diameter: " + art.acf.diameter + " cm";
        }
        // hvis værket har en pris hentes denne
        if (art.acf.pris != "") {
            modal.querySelector(".data-pris").innerHTML = "Pris: " + art.acf.pris + " kr.";
        }
        //eventlistener, som lytter på, hvorvidt der klikkes på luk-krydset i modalvinduet. Hvis der gør kaldes funktionen hideModal
        modal.querySelector(".modal_knap").addEventListener("click", hideModal);

        // hvis der klikkes på modalvinduet - IKKE den hvide boks, billede, tekst eller andet - men den mørke boks, så kaldes funktionen hideModal også.
        window.onclick = function (event) {
            if (event.target == modal) {
                hideModal();
            }

        }
    }

    function hideModal() {
        // skjuler modalvinduet
        modal.classList.remove("show");
    }
    //kalder funktionen showArt - altså køres den funktion af sig selv, når du kommer ind på siden inden du har klikket på noget
    showArt();
}
