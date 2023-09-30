class CarBrandsApp {
    constructor() {
        this.apiUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
        this.carBrandsList = document.getElementById('carBrandsList');
    }

    // Fetch car brands from the API using Promise
    fetchCarBrands() {
        return new Promise((resolve, reject) => {
            fetch(this.apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    // Render car brands on the webpage
    renderCarBrands(carBrands) {
        carBrands.forEach(brand => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `${brand.nome} (${brand.codigo})`;
            this.carBrandsList.appendChild(listItem);
        });
    }

    // Handle errors and display a message
    handleFetchError(error) {
        console.error('Error fetching data:', error);
        this.carBrandsList.innerHTML = '<li class="list-group-item text-danger">Error fetching data. Please try again later.</li>';
    }

    // Initialize the application
    init() {
        this.fetchCarBrands()
            .then(carBrands => this.renderCarBrands(carBrands))
            .catch(error => this.handleFetchError(error));
    }
}

// Create an instance of the CarBrandsApp and initialize
const carBrandsApp = new CarBrandsApp();
document.addEventListener('DOMContentLoaded', () => {
    carBrandsApp.init();
});
