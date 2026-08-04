const addCards = (books) => {

    let cardContainer = document.getElementById("card-section");

    cardContainer.innerHTML = "";

    books.forEach((book) => {

        let card = `
        <div class="col s12 m4">
            <div class="card">

                <div class="card-image">
                    <img src="${book.image}">
                </div>

                <div class="card-content">

                    <span class="card-title">
                        ${book.title}
                    </span>

                    <p>
                        <b>Author:</b> ${book.author}
                    </p>

                    <p>
                        ${book.description}
                    </p>

                </div>

            </div>
        </div>
        `;

        cardContainer.innerHTML += card;

    });

};


// Get books from server API

const loadBooks = () => {

    fetch("/api/books")

    .then((response) => response.json())

    .then((result) => {

        console.log(result);

        if(result.statusCode === 200){

            addCards(result.data);

        }

    })

    .catch((error)=>{

        console.log("Error loading books:", error);

    });

};


// Run when page loads

document.addEventListener("DOMContentLoaded", () => {

    loadBooks();

});
document.addEventListener('DOMContentLoaded', function() {

    // Load books
    loadBooks();

    // Initialize Materialize modal
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

});