export const countrySearch = {

    url: 'https://restcountries.com',
    parameters: ['name', 'capital', 'population', 'languages', 'flags'],
    toFind: '',
    
    fetchCountries() {
    return fetch(`${this.url}/v3.1/name/${this.toFind}?fields=${this.parameters.join(',')}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    },

};