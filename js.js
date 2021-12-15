// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];
//////Llamo a las funciones para dibujar el html segun el array de elementos
var primera =1;
if(primera){
crearEstancos ();
crearDivisiones();
crearSpan1();
crearSpan2();
crearOpcion();
primera =0;
}

function crearEstancos () {
    for(productos in products){
        i=productos;
        var divm = document.createElement("div");
        divm.setAttribute("class","cEstanco")
        divm.setAttribute("id","idEstanco"+i)
        var elementos = document.getElementById("idProductos");
        elementos.appendChild(divm);
    }
}
function crearDivisiones () {
    for(productos in products){
        i=productos;
        var divs1 = document.createElement("div");
        divs1.setAttribute("class","cEs1")
        divs1.setAttribute("id","idEs1"+i)
        var elementos1 = document.getElementById("idEstanco" + i);
        elementos1.appendChild(divs1);
        var divs2 = document.createElement("div");
        divs2.setAttribute("class","cEs2")
        divs2.setAttribute("id","idEs2"+i)
        var elementos1 = document.getElementById("idEstanco"+ i);
        elementos1.appendChild(divs2);
    }
}
function crearSpan1 () {
    for(productos in products){
        i=productos;
        var span1 = document.createElement("span");
        span1.setAttribute("class","cspan1")
        span1.setAttribute("id","idSpan1"+i)
        var s1 = document.getElementById("idEs1"+ i);
        s1.appendChild(span1);
        document.getElementById("idSpan1"+i).innerHTML =  parseInt(i) + parseInt(1) +".";
    }
}
function crearSpan2 () {
    for(productos in products){
        i=productos;
        var span2 = document.createElement("span");
        span2.setAttribute("class","cspan1")
        span2.setAttribute("id","idSpan2"+i)
        var s2 = document.getElementById("idEs2"+ i);
        s2.appendChild(span2);
        document.getElementById("idSpan2"+i).innerHTML = products[i].description + "-" + products[i].price +"€";
        var select = document.createElement("select");
        select.setAttribute("class","cSelect")
        select.setAttribute("id","idSelect"+i)
        var sl = document.getElementById("idEs2"+ i);
        sl.appendChild(select);
        console.log("idSelect"+i);
    }
}
////Creo opciones para el elemento select
function crearOpcion () {
    for(i=0;i<10;i++){
    for(productos in products){  
        j=productos;
        var opcion1 = document.createElement("option");
        opcion1.setAttribute("class","cOpcion")
        opcion1.setAttribute("id","idOpcion"+i)
        opcion1.setAttribute("value",i)
        opcion1.setAttribute("label",i)
        var op = document.getElementById("idSelect"+j);
        op.appendChild(opcion1);
    }
}
}

///////////CHEQUEO SI HAY EVENTOS 
//////Reviso si las cantidades los serectores han cambiado
for(productos in products){
    i=productos;
    document.getElementById("idSelect"+i).addEventListener("change",()=>activar());
}
//////Reviso si el cliente quiere saber el precio, en el caso de que haya productos seleccionados el boton se habilita y si lo pulsa muestro precios
document.getElementById("idCalcular").addEventListener("click",()=>calcularValores());



////Asigno valores al campo de cantidades del array y lo limito según stockaje
var asignarValores = (i)=>{
    if(document.getElementById("idSelect"+i).value > products[i].stock){
        if(window.confirm("Solo disponemos de "+ products[i].stock+" elementos en stock. Si quiere le podemos mandar" +" " +products[i].stock +" unidades.Perdone las molestias" )){
            document.getElementById("idSelect"+i).value = products[i].stock;
        }else{
            document.getElementById("idSelect"+i).value = 0;
        }
    }
    products[i].units = document.getElementById("idSelect"+i).value; 
}
/////En caso de que haya productos seleccionados activo el boton de calcular
var activar = () =>{
    console.log("activar");
    var cantt = 0;
    for(productos in products){
        asignarValores (productos);
        cantt = cantt + products[productos].units;
    }
    if(cantt==0){
        document.getElementById("idCalcular").disabled = true;
        mostrar (0,0,0);
     }else{document.getElementById("idCalcular").disabled = false;}  
}
/////En caso de que haya habilitado el boton de calcular y lo pulsa calculo los valores a mostrar
function calcularValores () {
       var subtotal = 0;
       for(productos in products){ subtotal =  subtotal + products[productos].price * products[productos].units;}
       iva = calcularIVA().toFixed(2)+ " €";
       total= parseFloat(subtotal.toFixed(2)) + parseFloat(iva);
       mostrar (subtotal.toFixed(2),calcularIVA().toFixed(2),total.toFixed(2))
}
/////Calculo en IVA según producto
var calcularIVA= () =>{
    var subtotal = 0;
    for(productos in products){
        i = productos;
        products[productos].units = document.getElementById("idSelect"+i).value; 
        subtotal =  subtotal + products[productos].price* (products[productos].tax/100)  * products[productos].units; 
     }
     return subtotal;
}
/////Mostrar precios
var mostrar = (sub, iba, tot) =>{
    document.getElementById("idSubtotali").innerHTML = sub + " €";
    document.getElementById("idIvai").innerHTML = iba + " €";
    document.getElementById("idTotali").innerHTML = tot + " €";
}
