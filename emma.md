<html>
<body>

<!--Display entire skin product data base here -->
<table>
  <thead>
  <tr>
    <th>Skin Type</th>
    <th>Moisturizer</th>
    <th>Face Cleanser</th>
    <th>Serum</th>
    <th>Sunscreen</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated the database and put it in "result" id -->
  </tbody>
  <tr style="display:none;" id="noresults">
 </tr>
</table>

<p>Please enter your skin type and product type, we will find your match:</p>

<form id="myForm1" action="#">
  Skin Type: <input type="text" name="skin_type" id="skin_type"><br>
  Skin Product Type: <input type="text" name="product_type" id="product_type"><br>
  <input type="button" onclick="findSkinProduct()" value="Submit">
</form>

<!--Show found skin product result based on skin type and product type input by user -->
<table>
  <thead>
  <tr>
    <th>Your skin product</th>
  </tr>
  </thead>
  <tbody id="skin_product">
    <!-- javascript generated the skin product search result in "skin_product" id -->
  </tbody>
  <tr style="display:none;" id="noresults">
 </tr>
</table>

<p>Update the Skin Product database:</p>

<form id="myForm2" action="#">
  Skin Type: <input type="text" name="skin_type2" id="skin_type2"><br>
  Moisturizer: <input type="text" name="moisturizer2" id="moisturizer2"><br>
  Face Cleanser: <input type="text" name="face_cleanser2" id="face_cleanser2"><br>
  Serum: <input type="text" name="serum2" id="serum2"><br>
  Sunscreen: <input type="text" name="sunscreen2" id="sunscreen2"><br>
  <div>
  <input type="button" onclick="create_skinproduct()" value="Create/Update">
  <input type="button" onclick="deleteProduct()" value="Delete">
  </div>
</form>

<script>
  // prepare HTML result container for skin product database
  const resultContainer = document.getElementById("result");
  const skin_product_result = document.getElementById("skin_product");

  // prepare URL's to allow easy switch from deployment and localhost
  const url = "https://csp.nighthawkcodingsociety.com/"
  //const url = "https://flask.nighthawkcodingsociety.com/api/skintype"
  const create_fetch = url + '/create';
  const read_fetch = url + '/';

  // Define a global variable to hold all skin products information
  let allSkinProducts;

  // Load skin product info on page entry
  read_skintypes();

  // Display Skin product Table, data is fetched from Backend Database
  function read_skintypes() {
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
      .then(response => 
      {
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
            //console.log(data);

            // Remember the data base in this global variable for search the skin product
            allSkinProducts = data;

            for (let row in data) 
            {
              //console.log(data[row]);
              add_row(data[row]);
            }
        })
    })
    // catch fetch errors (ie ACCESS to server blocked)
    .catch(err =>
    {
      console.error(err);
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.innerHTML = err;
      tr.appendChild(td);
      resultContainer.appendChild(tr);
    });
  }

  function add_row(data) {
    const tr = document.createElement("tr");
    const skintype = document.createElement("td");
    const moisturizer = document.createElement("td");
    const serum = document.createElement("td");
    const facecleanser = document.createElement("td");
    const sunscreen = document.createElement("td");

    // obtain data that is specific to the API
    skintype.innerHTML = data.skin_type; 
    moisturizer.innerHTML = data.moisturizer;
    facecleanser.innerHTML = data.face_cleanser; 
    serum.innerHTML = data.serum; 
    sunscreen.innerHTML = data.sunscreen; 

    // add HTML to container in the same order as HTML Table header
    tr.appendChild(skintype);
    tr.appendChild(moisturizer);
    tr.appendChild(facecleanser);
    tr.appendChild(serum);
    tr.appendChild(sunscreen);

    resultContainer.appendChild(tr);
  }

  function create_skinproduct()
  {
    // extract data from inputs
    const skin_type_input = document.getElementById('skin_type2').value;
    const moisturizer_input  = document.getElementById('moisturizer2').value;
    const facecleanser_input  = document.getElementById('face_cleanser2').value;
    const serum_input  = document.getElementById('serum2').value;
    const sunscreen_input  = document.getElementById('sunscreen2').value;

    var skin_type = skin_type_input.value;
    var moisturizer = moisturizer_input.value;
    var facecleanser = facecleanser_input.value;
    var serum = serum_input.value;
    var sunscreen = sunscreen_input.value;

    const requestOptions = 
    {
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer my-token'
        },
        body: JSON.stringify
        (                               // turns data into JSON string
          {
            "skin_type": skin_type,
            "moisturizer": moisturizer,
            "face_cleanser": facecleanser,
            "serum": serum,
            "sunscreen": sunscreen
          }
        )
    };

    //Async fetch API call to the database to create a new skin type
    fetch(create_fetch, requestOptions).then(response => 
    {
        // trap error response from Web API
        if (response.status !== 200) {
            const errorMsg = 'Database response error: ' + response.status;
            console.log(errorMsg);
            return;
        }
        // response contains valid result
        response.json().then(data => {
            console.log(data);
            //add a table row for the new/created userId
            const tr = document.createElement("tr");
            for (let row in data) 
            {
              //console.log(data[row]);
              add_row(data[row]);
            }
        })
    })
  }

  // This function will clear previous skin product search result
  function ClearSkinProductSearchResult() 
  {
    var row = skin_product_result.getElementsByTagName('tr');
    var rowCount = row.length;

    for (var x = rowCount-1; x >= 0; x--) 
    {
      skin_product_result.removeChild(row[x]);
    }
  }

  // This function will clear previous skin product table
  function ClearSkinProductTable() 
  {
    var row = resultContainer.getElementsByTagName('tr');
    var rowCount = row.length;

    for (var x = rowCount-1; x >= 0; x--) 
    {
      resultContainer.removeChild(row[x]);
    }
  }

  function findSkinProduct() 
  {
    var skin_type_input = document.getElementById('skin_type');
    var product_type_input = document.getElementById('product_type');

    // Convert it to all lower cases
    var skin_type = skin_type_input.value.toLowerCase();
    var product_type = product_type_input.value.toLowerCase();

    const tr = document.createElement("tr");
    const td = document.createElement("td");

    // Clear previous skin product search result first
    ClearSkinProductSearchResult();

    for (const eachskinproduct of allSkinProducts)
    {
      // when user input equal to certain skin type, we will output the skin product that matche that skin type - shows in console.log
      if (eachskinproduct["skin_type"] === skin_type)
      {
        console.log(eachskinproduct[product_type]);

        if (eachskinproduct[product_type] !== "undefined" )
        {
            td.innerHTML = eachskinproduct[product_type];
            tr.appendChild(td);
            skin_product_result.appendChild(tr);
            // We found the skin product, we can return now
            return;
        }
        else
        {
            //if skin product is not avaliable 
            td.innerHTML = "Can not find your skin product, please try again!";
            tr.appendChild(td);
            skin_product_result.appendChild(tr);
        }
      }
    }

    // If skin type is not avaliable 
    td.innerHTML = "Can not find your skin type, please try again!";
    tr.appendChild(td);
    skin_product_result.appendChild(tr);
  }

  function addProduct()
  {
    var skin_type_input = document.getElementById('skin_type2');
    var product_type_input = document.getElementById('product_type2');
    var product_name_input = document.getElementById('product_name');

    // Convert it to all lower cases
    var skin_type = skin_type_input.value.toLowerCase();
    var product_type = product_type_input.value.toLowerCase();
    var product_name = product_name_input.value;

    const skintype_td = document.createElement("td");
    const product_td = document.createElement("td");
    const tr = document.createElement("tr");

    for (const eachskinproduct of allSkinProducts)
    {
      // when user input equal to one of the product, we will perform update or add to this row
      if (eachskinproduct["skin_type"] === skin_type)
      {
        console.log(eachskinproduct[product_type]);

        // We already have this product type, we will update the current one with the new one
        if ( eachskinproduct[product_type] === product_type )
        {
          product_td.innerHTML = product_name;
          tr.appendChild(product_td);

          resultContainer.appendChild(tr);
          // We found the skin product, we can return now
          return;
        }
      }
    }

    // If we get here, this is a new skin type
    skintype_td.innerHTML = skin_type;

    product_td.innerHTML = product_name;
    tr.appendChild(skintype_td);
    tr.appendChild(product_td);
    resultContainer.appendChild(tr);
}

</script>

</body>
</html>