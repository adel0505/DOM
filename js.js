/* header */
/* drop dowwn */
function fdropdown() {
  let dropdown_menu = document.getElementsByClassName("body dropdown-menu")[0];

    if (dropdown_menu.style.display == "block") {
      dropdown_menu.style.display = "none";
    } else {
      dropdown_menu.style.display = "block";
    }
  
}


function animate_like() {

  let tab_like = document.querySelectorAll('.like-btn');

  for (let i = 0; i < tab_like.length; i++) {
    tab_like[i].addEventListener('click', function () {
      tab_like[i].classList.toggle('is-active');
    })
  }
}
animate_like();

let tab_add = Array.from(document.getElementsByClassName('btn btn-primary add-to-cart'));
  let tab_description = document.getElementsByClassName('description');
  for (let i = 0; i < tab_add.length; i++) {
    tab_add[i].addEventListener('click', function () {
      remove_productbycmd(tab_description[i].children[0]);
      add_cmd(tab_add[i]);
    })
  }
function remove_productbycmd(id){
  let dropmenu=document.getElementsByClassName('body dropdown-menu')[0];
  let tab_productname_cmd=dropmenu.getElementsByClassName('product-name');
  for(let i=0;i<tab_productname_cmd.length;i++){
    if(tab_productname_cmd[i].innerHTML==id.innerHTML){
      tab_productname_cmd[i].parentNode.parentNode.remove();
    }
  }
}
function add_cmd(id) {
  //data commande
  var x = id.parentNode;
  var y = x.parentNode;


  var img_cmd = y.getElementsByClassName("image")[0].getElementsByTagName("img")[0];
  var quantity_wanted = y.getElementsByClassName("quantity")[0].getElementsByTagName("input")[0];
  var product_name = y.getElementsByClassName("description")[0].getElementsByTagName("span")[0];
  var product_color = y.getElementsByClassName("description")[0].getElementsByTagName("span")[2];
  var product_price = y.getElementsByClassName("unit-price")[0];
  var product_price_tot = y.getElementsByClassName("total-price")[0];
  // create div product-image img-responsive
  var wimg = document.createElement('img');
  wimg.className = "img_coproduct-image img-responsiventent";

  wimg.src = img_cmd.src;
  wimg.alt = img_cmd.alt;
  wimg.title = img_cmd.title;
  var wspan = document.createElement('span');
  wspan.className = "product-quantity";
  wspan.textContent = quantity_wanted.value + "x";
  var Div_img_content = document.createElement('div');
  Div_img_content.className = "img_content";
  Div_img_content.appendChild(wimg);
  Div_img_content.appendChild(wspan);
  // create div right_block
  var wspan2 = document.createElement('span');
  wspan2.className = "product-name";
  wspan2.textContent = product_name.textContent;
  var wspan3 = document.createElement('span');
  wspan3.className = "product-price";
  wspan3.textContent = product_price.textContent;
  var wspan31 = document.createElement('span');
  wspan31.className = "product-price-tot";
  wspan31.textContent = product_price_tot.textContent;
  var wi = document.createElement('i');
  wi.className = "fa-remove";

  wi.onclick = function () {
    remove_product_cmd(wi)
  };
  var wa = document.createElement('a');
  wa.className = "remove-from-cart";
  wa.rel = "nofollow";
  wa.href = "#";
  //wa.data-link-action="remove-from-cart";
  wa.title = "Retirer du panier";
  wa.appendChild(wi);
  Div_right_block = document.createElement('div');
  Div_right_block.className = "right_block";
  Div_right_block.appendChild(wspan2);
  Div_right_block.appendChild(wspan3);
  Div_right_block.appendChild(wspan31);
  Div_right_block.appendChild(wa);

  // create div attributes_content
  var wspan4 = document.createElement('span');
  var wstrong = document.createElement('strong');
  wstrong.textContent = "Color";
  wspan4.appendChild(wstrong);

  wspan4.textContent = ": " + product_color.textContent;
  var Div_attributes_content = document.createElement('div');
  Div_attributes_content.className = "attributes_content";
  Div_attributes_content.appendChild(wspan4);
  Div_right_block.appendChild(Div_attributes_content);

  //******** */
  var vli = document.createElement('li');
  vli.appendChild(Div_img_content);
  vli.appendChild(Div_right_block);
  var x = document.getElementsByClassName("body dropdown-menu")[0];
  var wul = x.getElementsByTagName("ul")[0];
  wul.appendChild(vli);
  calcul_total();
}

function calcul_total() {
  //**** */ calcul niveau dropmenu
  // item_total

  var x = document.getElementsByClassName("body dropdown-menu")[0];
  var wul = x.getElementsByTagName("ul")[0];
  document.getElementsByClassName("item_total")[0].textContent = wul.childElementCount;
  //Sous_total
  var Sous_total = 0;
  var vli;
  for (var i = 0; i < wul.childElementCount; i++) {
    vli = wul.getElementsByTagName("li")[i];
    Sous_total += parseFloat(vli.getElementsByClassName("product-price-tot")[0].textContent); 
    
  }
  document.getElementsByClassName("products price_inline")[0].getElementsByTagName("span")[1].textContent = Sous_total + "TND";
  document.getElementsByClassName("products price_inline")[1].getElementsByTagName("span")[1].textContent = Sous_total + "TND";
  //total
  if (Sous_total != 0) {
    document.getElementsByClassName("cart-total price_inline")[0].getElementsByTagName("span")[1].textContent = Sous_total +
      parseFloat(document.getElementsByClassName("shipping price_inline")[0].getElementsByTagName("span")[1].textContent) +
      "TND";
  } else {
    document.getElementsByClassName("cart-total price_inline")[0].getElementsByTagName("span")[1].textContent = 0;
  }

  return 0;
}

function remove_product_cmd(id) {
  var x = id.parentNode.parentNode.parentNode;
  x.remove();
  calcul_total();
}





//**** fonction minus quantite */

function min_quantity() {
  let tab_min = Array.from(document.querySelectorAll('.minus-btn'));
  let tab_quantity = document.getElementsByClassName('quantity');
  for (let i = 0; i < tab_min.length; i++) {
    tab_min[i].addEventListener('click', function () {
      let text_input = tab_quantity[i].getElementsByTagName('input')[0];
      if (text_input.value != NaN && text_input.value > 0) {
        text_input.value = parseInt(text_input.value) - 1;
      } else {
        text_input.value = 0;
      }
      total_price_byproduit();
    })
  }


};
min_quantity();
//**** fonction plus quantite */
function plus_quantity() {
  let tab_plus = document.querySelectorAll('.plus-btn');
  let tab_quantity = document.getElementsByClassName('quantity');
  for (let i = 0; i < tab_plus.length; i++) {
    tab_plus[i].addEventListener('click', function () {
      let text_input = tab_quantity[i].getElementsByTagName('input')[0];
      if (text_input.value != NaN && text_input.value >= 0) {
        text_input.value = parseInt(text_input.value) + 1;
      } else {
        text_input.value = 0;
      }
      total_price_byproduit();
    })
  }
};
plus_quantity();
//*** changes quantity */
function change_quantity() {
  let tab_quantity = document.getElementsByClassName('quantity');
  for (let i = 0; i < tab_quantity.length; i++) {
    let text_input = tab_quantity[i].getElementsByTagName('input')[0];
    text_input.addEventListener('change', function () {

      if (text_input.value != NaN && text_input.value >= 0) {
        text_input.value = parseInt(text_input.value);
      } else {
        text_input.value = 0;
      }
      total_price_byproduit();
    })
  }
};
change_quantity();
//**** fonction minplusus quantite */
function remove_quantity() {
  let tab_delete = document.querySelectorAll('.delete-btn');
  for (let i = 0; i < tab_delete.length; i++) {
    tab_delete[i].addEventListener('click', function () {

      let divproduct = tab_delete[i].parentNode.parentNode;
      let product_name = divproduct.getElementsByClassName("description")[0].getElementsByTagName("span")[0];
      let divcmd = document.getElementsByClassName("body dropdown-menu")[0].getElementsByTagName("ul")[0];
      for (let j = 0; j < divcmd.childElementCount; j++) {
        vli = divcmd.getElementsByTagName("li")[j];
        if (vli.getElementsByClassName("product-name")[0].textContent == product_name.textContent) {
          vli.remove();
        }
      }
      divproduct.remove();
      calcul_total();

    })

  }
};
remove_quantity();
//*****fonction total price by produit */
function total_price_byproduit() {
  let tab_quantity = document.getElementsByClassName('quantity');
  let tab_unitprice = document.querySelectorAll('.unit-price');
  let tab_totalprice = document.querySelectorAll('.total-price');
  let tab_btnadd = document.getElementsByClassName('btn btn-primary add-to-cart');

  for (let i = 0; i < tab_quantity.length; i++) {
    let text_input = tab_quantity[i].getElementsByTagName("input")[0];
    tab_totalprice[i].innerHTML = text_input.value * parseFloat(tab_unitprice[i].innerHTML) + "TND";
    if (text_input.value > 0) {
      tab_btnadd[i].disabled = false;
      tab_btnadd[i].className = 'btn btn-primary add-to-cart active';

    } else {
      tab_btnadd[i].disabled = true;
      tab_btnadd[i].className = 'btn btn-primary add-to-cart';
    }
  }

}