---
title: Database CRUD Operations
layout: default
description: An advanced example of do database operation asynchronously between JavaScript and Backend Database. help
image: /images/database.png

---
<html>
<body>
<h1>Products:</h1>
<ul></ul>

<script>
function getProducts();
  fetch("http://localhost:8031/api/clients")
      .then(res => {
        return res.json();
      })
      .them(data => {
        console.log(data);
      });
  </script>
</body>
</html>
        
        
