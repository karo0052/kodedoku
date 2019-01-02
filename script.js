// når DOM'en er loadet, kaldes funktionen sidenVises
document.addEventListener("DOMContentLoaded", sidenVises);

//Laver søgning i URL'en
let urlPrams = new URLSearchParams(window.location.search);
//Henter værdien "id" fra URL'en hvis den er tilstede
let id = urlPrams.get("id");
//console.log(id);


function sidenVises() {
    //    console.log("siden vises");

    //eventlistener, som lytter efter klik på menuknappen. Ved klik kaldes funktionen trykPaaMenubutton
    document.querySelector(".menubutton").addEventListener("click", trykPaaMenubutton);

    //hvis skærmen er større end 1100, så er menuen foldet ud hele tiden
    if (window.innerWidth >= 1100) {
        document.querySelector("nav").classList.remove("hidden");
    }

    // hvis der ikke er et id i URL'en - altså den er lig null, så angives menupunktet 'forside' som det aktive, der fremhæves
    if (id == null) {
        //        console.log("null virker");
        document.querySelector(".menupunkt_forside a").classList.add("menu_aktiv");
    }
    //hvis id'et fra URL'en er 1, så er det også forsiden, der markeres som aktiv
    if (id == 1) {
        //        console.log("1 virker");
        document.querySelector(".menupunkt_forside a").classList.add("menu_aktiv");
    }
    //hvis id'et fra URL'en er 2, så er det værker, der markeres som aktiv
    if (id == 2) {
        //        console.log("2 virker");
        document.querySelector(".menupunkt_galleri a").classList.add("menu_aktiv");
    }
    //hvis id'et fra URL'en er 3, så er det kunstneren, der markeres som aktiv
    if (id == 3) {
        //        console.log("3 virker");
        document.querySelector(".menupunkt_kunstneren a").classList.add("menu_aktiv");
    }

    //hvis id'et fra URL'en er 4, så er det kontakt, der markeres som aktiv
    if (id == 4) {
        //        console.log("4 virker");
        document.querySelector(".menupunkt_kontakt a").classList.add("menu_aktiv");
    }


    function trykPaaMenubutton() {
        //        console.log("der er trykket på menu");

        //tilføjer/fjerner klassen hidden på menuen
        document.querySelector("nav").classList.toggle("hidden");

        //skift knappen frem og tilbage mellem "burger" og kryds
        document.querySelector(".menubutton").classList.toggle("kryds");

        // viser/gemmer den grå box i baggrunden
        document.querySelector(".box").classList.toggle("none");

        //hvis der klikkes på den grå box, så kalder den funktionen trykPaaMenuButton igen. Idet funktionen toggler klasserne, og de er "på" mens den grå box er synlig, vil de altså "slås fra" ved klik på den grå box
        window.onclick = function (event) {
            if (event.target == document.querySelector(".box")) {
                //                console.log("test");
                trykPaaMenubutton();
            }
        }
    }
}
