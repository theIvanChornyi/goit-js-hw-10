export const countrySearch = {

    url: 'https://restcountries.com',
    parameters: ['name', 'capital', 'population', 'languages', 'flags'],
    toFind: '',
    
    fetchCountries() {
    return fetch(`${this.url}/v3.1/name/${this.toFind}?fields=${this.parameters.join(',')}`)
        .then(response => response.json())
        .catch(error => console.log(error)); 
    },

};