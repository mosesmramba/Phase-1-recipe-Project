//getting all the data
fetch("http://localhost:3000/RECIPES",{
  method:"GET"
})
.then((response)=>response.json())
.then((data)=>{
  console.log(data);
  const all_recipes=document.getElementById("all-recipes")

  data.map((element)=>{
    all_recipes.innerHTML += `<div id="food">
    <img onclick="displayFoodRecipe(${element.id})" src ="${element.image}"
    <h6>${element.Name}</h6>
    <button onclick="deleteRecipe(${element.id})" id="DelBtn">DELETE</button>
    <button onclick="edit(${element.id})" id="UpdBtn">EDIT</button>
    </div>`
  })
})

//displaying a specific food recipe 
function displayFoodRecipe(x){
 
 fetch(`http://localhost:3000/RECIPES/${x}`,{
  method:"GET"
})
.then((response)=>response.json())
.then((data)=>{
  const one_recipe=document.getElementById("one_recipe")
  one_recipe.innerHTML=`<div id="fontIn">
  <img src ="${data.image}"
  <h6>${data.Name}</h6>
  <p>${data.Description}</p>
  <li>${data.Ingredients}</li>
    <div id="space">
  <li>${data.Method}</li>
    </div>
  </div>`

  console.log(data)
})
}

//Deleting a specific food recipe 
function deleteRecipe(x){
 
  fetch(`http://localhost:3000/RECIPES/${x}`,{
   method:"DELETE"
 })
 .then((response)=>response.json())
 .then((data)=>{
  alert("Recipe Deleted")
  
 })
 }

 //Creating a new recipe 
  const addForm=document.getElementById("createForm")
  addForm.addEventListener("submit",function(event){
     event.preventDefault();

     const Name=document.getElementById("Name").value;
     const Description=document.getElementById("Description").value;
     const Ingredients=document.getElementById("Ingredients").value;
     const Method=document.getElementById("Method").value;
     const Image_url=document.getElementById("Image_url").value;

     fetch(`http://localhost:3000/RECIPES`,{
  method:"POST",
  body:JSON.stringify({
     Name:Name,
     Description:Description,
     Ingredients:Ingredients,
     Method:Method,
     image:Image_url
  }),
  headers :{
    "Content-Type": "application/json" 
  }
})
.then((response)=>response.json())
.then((data)=>{
  alert("New Recipe")

})
  })


 //Edit will recieve the id fetch a specific recipe and add it to a form
  function edit(x){
    fetch(`http://localhost:3000/RECIPES/${x}`,{
   method:"GET"
 })
 .then((response)=>response.json())
 .then((data)=>{
   console.log(data);
    const updateRec=document.getElementById("updateRec")
    updateRec.innerHTML=`
    <div>
    <input type="text" id="upd_Name" value="${data.Name}" placeholder="ENTER FOOD NAME">
    <input type="text" id="upd_Description" value="${data.Description}" placeholder="ENTER FOOD DESCRIPTION">
    <input type="text" id="upd_Ingredients" value="${data.Ingredients}" placeholder="ENTER INGREDIENTS LIST">
    <input type="text" id="upd_Method" value="${data.Method}" placeholder="ENTER MAKING METHOD">
    <input type="text" id="upd_Image_url" value="${data.image}" placeholder="ENTER IMAGE URL">
    <button onclick="update(${x})" type="submit">UPDATE</button>
  </div>
    `
 })
}
//updating recipe function
 function update(x){
     const upd_Name=document.getElementById("upd_Name").value;
     const upd_Description=document.getElementById("upd_Description").value;
     const upd_Ingredients=document.getElementById("upd_Ingredients").value;
     const upd_Method=document.getElementById("upd_Method").value;
     const upd_Image_url=document.getElementById("upd_Image_url").value;
//updating a recipe using PATCH 
     fetch(`http://localhost:3000/RECIPES/${x}`,{
        method:"PATCH",
        body:JSON.stringify({
         Name:upd_Name,
         Description:upd_Description,
         Ingredients:upd_Ingredients,
         Method:upd_Method,
         image:upd_Image_url
      }),
      headers :{
        "Content-Type": "application/json" 
      }
    })
    .then((response)=>response.json())
    .then((data)=>{
      alert("Recipe Updated")
    
    })

       console.log(updateForm)
 }
  