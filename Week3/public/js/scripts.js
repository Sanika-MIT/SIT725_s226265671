const loadBooks = () => {


    fetch("/api/books")

    .then(response => response.json())

    .then(data => {


        let books = data.data;


        books.forEach(book => {


            let card = `

            <div class="col s12 m4">

                <div class="card medium">


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


            $("#card-section").append(card);


        });


    });


};





const submitForm = () => {


    let formData = {};


    formData.first_name = $("#first_name").val();

    formData.last_name = $("#last_name").val();

    formData.email = $("#email").val();



    console.log(
        "Form Data Submitted:",
        formData
    );


};






$(document).ready(function(){



    // Load books from API

    loadBooks();



    // Enable Materialize modal

    $('.modal').modal();




    // Submit form

    $('#formSubmit').click(function(){


        submitForm();


    });



});