<h1 style = "text-align: center">Welcome!</h1>

<!-- Aside Section -->
<head> 
    <style>
    aside {
    width: 30%;
    padding-left: 15px;
    margin-left: 15px;
    float: right;
    font-style: italic;
    }
    </style>
</head>

<!-- Image Carousel -->
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {box-sizing: border-box;}
        .mySlides {display: none;}
        img {vertical-align: middle;}
        .slideshow-container {
        max-width: 1000px;
        position: relative;
        margin: auto;
        }
        .dot {
        height: 5px;
        width: 5px;
        margin: 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
        }
        .active {
        background-color: #717171;
        }
        .fade {
        animation-name: fade;
        animation-duration: 3s;
        }
        @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
        }
        @media only screen and (max-width: 300px) {
        .text {font-size: 11px}
        }
    </style>
</head>

<body>

<!-- <aside>
    <img src = "/images/HomepageImage.jpg" alt = "Homepage Image">
</aside> -->

<aside>
    <div class="slideshow-container">
        <div class="mySlides fade"><img src="/images/CarouselImage1.jpg" style="width:100%"></div>
        <div class="mySlides fade"><img src="/images/CarouselImage2.jpg" style="width:100%"></div>
        <div class="mySlides fade"><img src="/images/CarouselImage3.jpg" style="width:100%"></div>
    </div>
    <div style="text-align:center">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
    <!--  -->
    <script>
    let slideIndex = 0;
    showSlides();
    function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000);
    }
    </script>
</aside>

<p>We noticed that many people weren't able to find good skincare products or the ones they did find weren't effective. This inspired us to create this website in order to help those who wish to improve their skin.</p>

<h3><strong>Purpose</strong></h3>
<p>We strive to provide support to people of all ages with their dermatology needs and improve the condition of their skin and confidence.</p>
<h3><strong>Function</strong></h3>
<p>Fill out this quick form about you and your skin type so we can generate personalized recommendations for skin care products</p>

/*
<table>
    <tr>
        <th><label for="name">Name</label></th>
        <th><label for="email">Email</label></th>
        <th><label for="skin type">Skin Type</label></th>
        <th><label for="phone">Phone</label></th>
    </tr>
    <tr>
        <td><input type="text" name="name" id="name" required></td>
        <td><input type="email" name="email" id="email" placeholder="abc@xyz.org" required></td>
        <td><input type="skin type" name="skin type" id="skin type" required></td>
        <td><input type="tel" name="phone_num" id="phone_num"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="999-999-9999"></td>
        <td ><button onclick="create_User()">Create</button></td>
    </tr>
</table>
*/