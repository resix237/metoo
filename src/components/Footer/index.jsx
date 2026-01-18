import React, { useEffect } from 'react';
import Image from "next/image";

function Footer() {
    const currentDate = new Date();
    useEffect(() => {

        var heuresDiv = document.querySelector('.heures');
        var dateDiv = document.querySelector('.date');

        var affichageHeure = function () {
            // Déclaration des variables qui seront utilisées : 
            var today, annee, listeMois, mois, listeJours, jourNUmero, jourNom, heures, minutes, secondes, deuxChiffres;

            // Récupérer la date actuelle : 
            today = new Date();

            // Récupérer l'année : 
            annee = today.getFullYear();

            //Récupérer le mois : 
            listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            mois = listeMois[today.getMonth()]; //getMonth() donne l'index 1 comme on est en Février, ce qui donne la valeur "Février" depuis notre liste

            // Récupérer le numéro du jour du mois : 
            jourNUmero = today.getDate(); //donne 29

            // Récupérer le jour. Attention la semaine commence un dimanche en Javascript : 
            listeJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            jourNom = listeJours[today.getDay()]; // getDay() donne index 6, donc samedi


            //Afficher les heures, minutes et secondes toujours avec deux chiffres : 
            deuxChiffres = function (element) {
                if (element < 10) {
                    return element = "0" + element;
                } else {
                    return element;
                }
            }

            // Récupérer les heures : 
            heures = deuxChiffres(today.getHours());

            // Récupérer les minutes : 
            minutes = deuxChiffres(today.getMinutes());

            // Récupérer les secondes : 
            secondes = deuxChiffres(today.getSeconds());

            //Affichage dans nos DIV du HTML : 
            heuresDiv.textContent = heures + ":" + minutes + ":" + secondes;
            dateDiv.textContent = jourNom + ", " + jourNUmero + " " + mois + " " + annee;

            // Lancer la fonction affichage heure toutes les 1000 ms, soit toute les secondes : 
            setTimeout(affichageHeure, 1000);
        }

        //Lancer la fonction une fois au début : 
        affichageHeure();
    }, [])
    return (
        <div className=' lg:flex relative font-Hind xl:px-64 px-5 lg:px-32 pb-3 lg:text-lg text-sm font-light text-white mt-40 '>
            <div className=' flex'>
                <div className="heures w-20 lg:w-40 "></div>
                <div className="date hidden"></div>
                <div className="">©Copyright {currentDate.getFullYear()} - Marc Fouda</div>
            </div>
            <div className='flex md:absolute right-5 top-0 self-end items-center gap-2'>
                <span className='text-sm'>
                    Number of visitors
                </span>
                <div align="center">
                    <a href='https://www.counter12.com'>
                        <img className=' h-3' src='https://www.counter12.com/img-d9cZ5dZC3ybzZAWA-79.gif' border='0' alt='free web counter' />
                    </a>
                    <script type='text/javascript' src='https://www.counter12.com/ad.js?id=d9cZ5dZC3ybzZAWA'>
                    </script>
                </div>
            </div>
        </div>
    )
}

export default Footer;