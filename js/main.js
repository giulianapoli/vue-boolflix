// Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: Titolo Titolo Originale Lingua Voto

const rootApp = new Vue ({
  el:"#root",
  data: {
    insiemeFilms: [],
    api_key: '8cc3b039b9855e85a8632357051a68d3',
    ricercaTitolo: '',
    basePath: 'https://image.tmdb.org/t/p/w500/'
  },

  methods: {
    ricercaFilm() {
      axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          'api_key': this.api_key,
          query:this.ricercaTitolo
        }
      })
      .then(response => this.insiemeFilms = response.data.results);
    }
  }

})
