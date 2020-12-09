/* Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: Titolo Titolo Originale Lingua Voto */

/* Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P) --->OK

Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
bandiere= flat icons ---> OK

Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs */


const rootApp = new Vue ({
  el:"#root",
  data: {
    insiemeFilm: [],
    insiemeSerie: [],
    api_key: '8cc3b039b9855e85a8632357051a68d3',
    ricercaTitolo: '',
    basePath: 'https://image.tmdb.org/t/p/w500/',
    logoNetflixPath: 'wwemzKWzjKYJFfCeiB57q3r4Bcm.svg',
    hover: false,
    page: 1,
    searchInput: false,
  },

  mounted() {
    axios.get("https://api.themoviedb.org/3/movie/popular",
    {
      params: {
        'api_key': this.api_key,
        page: this.page
      }
    })
    .then(response => this.insiemeFilm = response.data.results);
  },


  methods: {
    ricercaFilm() {
      axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          'api_key': this.api_key,
          query:this.ricercaTitolo,
          page: this.page
        }
      })
      .then(response => this.insiemeFilm = response.data.results);
    },

    ricercaSerie() {
      axios.get("https://api.themoviedb.org/3/search/tv",
      {
        params: {
          'api_key': this.api_key,
          query:this.ricercaTitolo,
          page: this.page
        }
      })
      .then(response => this.insiemeSerie = response.data.results);
    },

    votazioneFilm(voto) {
      return Math.ceil(voto / 2);
    },

    cambioPagina() {
      this.page++;

      this.ricercaFilm();
      this.ricercaSerie();
    }
  }

});
