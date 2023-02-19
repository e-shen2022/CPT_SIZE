
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

<form id="myForm" action="#">
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


<script>
  // prepare HTML result container for skin product database
  const resultContainer = document.getElementById("result");
  const skin_product_result = document.getElementById("skin_product");

  // prepare URL's to allow easy switch from deployment and localhost
  const url = "http://localhost:8086/api/skintype"
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
    .catch(err => {
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
      // when user input equal to oily, will output serum that matche that skin type - shows in console.log
      if (eachskinproduct["skin_type"] === skin_type)
      {
        console.log(eachskinproduct[product_type]);

        td.innerHTML = eachskinproduct[product_type];
        tr.appendChild(td);

        skin_product_result.appendChild(tr);

        // We found the skin product, we can return now
        return;
      }
    }

    // If we get here, we didn't find the skin product
    td.innerHTML = "Can not find your skin product, please try again!";
    tr.appendChild(td);
    skin_product_result.appendChild(tr);
  }

</script>

</body>
</html>