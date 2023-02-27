

<html>
<body>
<form id="uinput" action="#">
  Enter the ingredient you are allergy to: <input type="text" name="allergy"
  id="allergy"><br>
  Enter the product you were recommended: <input type="text" name="product" id="product"><br>
  <input type=button onclick="allergyCheck()" value="Submit">
</form>
</body>

<p id="out"></p>

<p>Products We Recommend!</p>

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
//sets variables and connects userinput through id
const table = document.getElementById('results');
const productIn = document.getElementById('product');
const allergyIn = document.getElementById('allergy');
const outputElement = document.querySelector('#out');

//creates function, which is activated by user clicking submit
function allergyCheck() {

    //changes user input to all lowercase (var allows for redefinition unlike const)
    var allergyl = allergyIn.value.toLowerCase();
    var productl = productIn.value.toLowerCase();

    //loops through rows in entire database table
    for (var i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];

        //loops through all cells in the table
        for (var j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];

            //determines where the product is in the table
            if (cell.innerText.toLowerCase().includes(productl)) {
                //outputs where product is present in console (for error management)
                console.log(`product found in row ${i}`);
                var rowIndex = i;
                var prodrow = table.rows[rowIndex];
                //defines row and column of product, so it can be looped through to find string of allergy
                var specrow = document.querySelector(`#results tr:nth-child(${i+1})`);
                var speccells = specrow.querySelectorAll("td");

                //loop through specific row and column
                for (var k = 1; k < speccells.length; k++) {
                    const prodcell = prodrow.cells[k];
                    console.log(speccells[k].innerText.toLowerCase());
                    console.log(allergyl);
                    //if this cell includes string inputted by user, output of where safe or not is returned in html
                    if (speccells[k].innerText.toLowerCase().includes(allergyl)) {
                        console.log('This product is unsafe and contains the ingredient you are allergic to.');
                        outputElement.textContent = 'This product is unsafe and contains the ingredient you are allergic to.';
                        return;
                    } else {
                        console.log('This product is safe for use! Enjoy!');
                        outputElement.textContent = 'This product is safe for use! Enjoy!';
                        return;
                    }
                }
            //will inform user if product is not in table/database yet
            } else {
                console.log('Product not in our database. Check spelling, or enter different product.');
                outputElement.textContent = 'Product not in our database. Check spelling, or enter different product.';
            }
        }
    }
}
            
</script>



<script>
  // prepare HTML result container for new output
  const resultContainer = document.getElementById("results");
  // prepare URL's to allow easy switch from deployment and localhost
  //const url = "https://cskinp.duckdns.org/api/clients"
  const url = "https://cskinp.duckdns.org/api/clients"
  const create_fetch = url + '/create';
  const read_fetch = url + '/';

  let allProducts;

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
        response.json().then(data => 
        {
            allProducts = data
            // console.log(data);
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
</html>