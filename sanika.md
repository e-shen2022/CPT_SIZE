---
title: Database CRUD Operations
layout: default
description: An advanced example of do database operation asynchronously between JavaScript and Backend Database.
image: /images/database.png

---

<p>Enter product you want to find:</p>

<form action="javascript:create_user()">
    <p><label>
        Product:
        <input type="text" name="uid" id="uid" required>
    </label></p>
    <p><label>
        Ingredient:
        <input type="text" name="name" id="name" required>
    </label></p>
    <p>
        <button onclick="searchProd()">Check</button>
    </p>
</form>


<p>Database API</p>

<table>
  <thead>
  <tr>
    <th>Product</th>
    <th>Ingredients</th>
  </tr>
  </thead>
  <tbody id="results">
    <!-- javascript generated data -->
  </tbody>
</table>

<script>

  function searchProd() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("results");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
</script>
  }



<script>
  // prepare HTML result container for new output
  const resultContainer = document.getElementById("results");
  // prepare URL's to allow easy switch from deployment and localhost
  //const url = "http://localhost:8031/api/clients"
  const url = "http://localhost:8031/api/clients"
  const create_fetch = url + '/create';
  const read_fetch = url + '/';

  // Load users on page entry
  read_clients();


  // Display User Table, data is fetched from Backend Database
  function read_clients() {
    // prepare fetch options
    const read_options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
    };

    // fetch the data from API
    fetch(read_fetch, read_options)
      // response is a RESTful "promise" on any successful fetch
      .then(response => {
        // check for response errors
        if (response.status !== 200) {
            const errorMsg = 'Database read error: ' + response.status;
            console.log(errorMsg);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = errorMsg;
            tr.appendChild(td);
            resultContainer.appendChild(tr);
            return;
        }
        // valid response will have json data
        response.json().then(data => {
            console.log(data);
            for (let row in data) {
              console.log(data[row]);
              add_row(data[row]);
            }
        })
    })
    // catch fetch errors (ie ACCESS to server blocked)
    .catch(err => {
      console.error(err);
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.innerHTML = err;
      tr.appendChild(td);
      resultContainer.appendChild(tr);
    });
  }

  function create_client(){
    //Validate Password (must be 6-20 characters in len)
    //verifyPassword("click");
    const body = {
        product: document.getElementById("product").value,
        ingredients: document.getElementById("ingredients").value,
    };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer my-token',
        },
    };

    // URL for Create API
    // Fetch API call to the database to create a new user
    fetch(create_fetch, requestOptions)
      .then(response => {
        // trap error response from Web API
        if (response.status !== 200) {
          const errorMsg = 'Database create error: ' + response.status;
          console.log(errorMsg);
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.innerHTML = errorMsg;
          tr.appendChild(td);
          resultContainer.appendChild(tr);
          return;
        }
        // response contains valid result
        response.json().then(data => {
            console.log(data);
            //add a table row for the new/created userid
            add_row(data);
        })
    })
  }

  function add_row(data) {
    const tr = document.createElement("tr");
    const product = document.createElement("td");
    const ingredients = document.createElement("td");
  

    // obtain data that is specific to the API
    product.innerHTML = data.product; 
    ingredients.innerHTML = data.ingredients; 


    // add HTML to container
    tr.appendChild(product);
    tr.appendChild(ingredients);

    resultContainer.appendChild(tr);
  }

</script>

