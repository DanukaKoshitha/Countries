// ///////////////////////   01    /////////////////////////
//  let customer1 = {
//     name : "Danuka",
//     age :"20",
//     address :"Panadura",
//     item : [
//         {
//             itemCode : "c001",
//             qty : 5
//         },{
//             itemCode : "c002",
//             qty : 3
//         },{
//             itemCode : "c003",
//             qty : 8
//         }
//     ]
// };

// console.log(customer1.name);
// console.log(customer1.age);
// console.log(customer1.address);
// console.log(customer1.item);

// customer1.item.forEach(items => {
//     console.log(items.itemCode);

// });

// console.log(customer1["name"]);

// //////////////////////////    02     //////////////////////////////////

// let numbers = [10, 50, 75, 68, 100, 548, 900];

// numbers.forEach((ak) => {
//   console.log(ak);
// });

// numbers.push(800);
// console.log(numbers);

// numbers.pop();
// console.log(numbers);

// numbers.shift();
// console.log(numbers);

// let numbers2 = [23, 45, 57, "danuka"];
// let numbers3 = [true, 45, 89];

// let newAr = numbers.concat(numbers2, numbers3);
// console.log(newAr);

// console.log(numbers.reverse());

// console.log(numbers.toString());

// //////////////////////////////////    03     ///////////////////////////////////////

// let btn = document.getElementById('btn');
// let txtid = document.getElementById('ID');
// let txtName = document.getElementById('name');
// let txtaddress = document.getElementById('Address');
// let txtage = document.getElementById('age');
// let txtItem = document.getElementById('Item');
// let txtdes = document.getElementById('des');
// let txtqty = document.getElementById('qty');

// btn.addEventListener('click',()=>{
//     let newCustomer = {
//         id : txtid.value,
//         name:txtName.value,
//         address : txtaddress.value,
//         age : Number(txtage.value)
//     };

//     let newItem = {
//         itemCode : txtItem.value,
//         description :txtdes.value,
//         stock : Number(txtqty.value)
//     }

//     customers.push(newCustomer);
//     items.push(newItem);
//     console.log(customers);
//     console.log(items);

// });

// let customers=[
//     {
//         id:"C001",
//         name:"nimal",
//         address:"panadura",
//         age:12
//     }
// ];

// let items=[
//     {
//         itemCode:"I001",
//         description:"bla bla",
//         stock:20
//     }
// ];

// let orders=[
//     {
//         customerId:"C001",
//         cutomerName:"saman",
//         items:[
//             {
//                 itemCode:"I001",
//                 qty:2,
//                 total:2500.00
//             }
//         ]

//     }
// ];

// //////////////////////////////////     04      ////////////////////////////////////////////

loadItems();

async function loadItems() {
  let res = await fetch("https://restcountries.com/v3.1/all");
  let items = await res.json();
  let body = "";
  items.forEach((element) => {
    console.log(element);
    body += `
            <div class="col">
                <div class="card shadow-sm">
                  <img src=${element.flags.png} alt="" class="mx-auto" width=200px height=100px>
                  <div class="card-body">
                  <h2>${element.name.common}</h2>
                    <p class="card-text">Capital: ${element.capital}</p>
                    <p class="card-text">Region: ${element.region}</p>
                    <p class="card-text">Population: ${element.population}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary btn-info" 
                                onclick="window.open('${element.maps.googleMaps}', '_blank')">View in Map</button>
                      </div>
                      <small class="text-body-secondary"></small>
                    </div>
                  </div>
                </div>
              </div>
        `;
  });

  console.log(body);

  document.getElementById("row").innerHTML = body;
}


function searchCountry() {
  console.log("Search!!");
  let txtSearch = document.getElementById("txtSearch").value.trim(); // Trim whitespace

  if (txtSearch === "") {
    alert("Please enter a country name");
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${txtSearch}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Country not found"); // Handle if country is not found
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      let body = "";
      data.forEach(element => {
        body += `
          <div class="p-5 rounded" style="background-image: url(${element.flags.png}); background-repeat: no-repeat; background-size: cover; background-position: center;">
            <div class="col-sm-8 py-5 mx-auto bg-gradient rounded p-5">
              <h1 class="display-5 fw-normal text-white">${element.name.common}</h1>
              <p class="fs-5 text-white">${element.flags.alt}</p>
              <h2 class="text-white">${element.capital ? element.capital[0] : "N/A"}</h2>
              <p>From the top down, you'll see a dark navbar, light navbar, and a responsive navbar—each with offcanvases built in. Resize your browser window to the large breakpoint to see the toggle for the offcanvas.</p>
              <p>
                <a class="btn btn-primary" href="/docs/5.3/components/navbar/#offcanvas" role="button">Learn more about offcanvas navbars &raquo;</a>
              </p>
            </div>
          </div>
        `;
      });

      document.getElementById("row").innerHTML = body;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("row").innerHTML = `<p class="text-danger">Country not found. Please try again.</p>`;
    });
}
