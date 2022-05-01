/********************************************************************************************/
let image_input = document.getElementById('image')
let image_url = document.getElementById('image_url')
let input_form = document.getElementById('form_crear')
let btn_cancelar_foto = document.getElementById('cancelar_foto')
const div_lista_con_imagenes = document.getElementById('lista_con_imagenes')
const btn_enviar_foto = document.getElementById("enviar_foto");
let pagination_element = document.getElementById("pagination");
let flecha_izq = document.getElementById('flecha_izq')
let flecha_der = document.getElementById('flecha_der')

let images = []
let current_page = 1;
let elements = 6;
let id = 0;

/********************************************************************************************/
image_input.addEventListener("change", () => {
    image_url.value = "";
    image_url.placeholder = image_input.files[0].name;
    image_url.disabled = true;
})


btn_cancelar_foto.addEventListener('click', () => {
    recorrerInputs(input => {
        input.value = ''
    })
    image_url.placeholder = 'https://example.com';
    image_url.disabled = false;
})

/********************************************************************************************/
btn_enviar_foto.addEventListener('click', () => {
    let image_input = document.querySelectorAll('input')
    let fReader = new FileReader();
    let img = image_input[0]

    //validaciones de los campos
    if (image_input[2].value == '') {
        alert('Proporciona una descripción')
    }

    if (img.files[0] == null && image_input[1].value == '') {
        alert('Añada una imágen')
    }
    //mandar imagees a el arreglo
    if (img.files[0] != null && image_input[2].value != '') {
            fReader.readAsDataURL(img.files[0])
            fReader.onloadend = function (event) {
                img = [event.target.result, image_input[2].value]
                images.push(img)
                display(images, div_lista_con_imagenes, elements, current_page)
                btn_cancelar_foto.click()
                SetupPagination2(images, pagination_element, elements)
        }
    } else if (image_input[1].value != '' && image_input[2].value != '') {
            img = [image_input[1].value, image_input[2].value]
            images.push(img);
            display(images, div_lista_con_imagenes, elements, current_page)
            btn_cancelar_foto.click()
            SetupPagination2(images, pagination_element, elements)

    }
})


function recorrerInputs(tarea) {
    let vector_inputs = document.querySelectorAll("input");

    vector_inputs.forEach((input) => {
        tarea(input);
    });
}



function display(items, wrapper, items_per_page, page) {
    if (current_page == 1) {
        flecha_izq.style.display = 'none'
    } else {
        flecha_izq.style.display = 'block'
    }
    if (items.length != 0 && current_page < Math.ceil((items.length / elements))) {
        flecha_der.style.display = 'block'
    } else {
        flecha_der.style.display = 'none'
    }
    if (items.length == 0) {
        div_lista_con_imagenes.style.display = 'none'
    } else {
        div_lista_con_imagenes.style.display = 'grid'

    }

    wrapper.innerHTML = "";
    page--;
    loop_start = items_per_page * page;
    let paginatedItems = items.slice(loop_start, loop_start + items_per_page)
    paginatedItems.forEach((element) => {
        let template_registro = `
        <div class="bg-neutral-50 shadow-sky-800 shadow-2xl 
                            rounded-lg">
            <figure class="mx-8 mt-4">
                <img src="${element[0]}" 
                    class="w-full h-52 border-1 rounded-lg
                            shadow-lg shadow-white-800
                            hover:shadow-white-800"
                    alt=""/>
                <figcaption class="my-1">${element[1]}</figcaption>
            </figure>
        </div>
        `

        div_lista_con_imagenes.innerHTML = div_lista_con_imagenes.innerHTML + template_registro
    })

}





function SetupPagination(items, wrapper, items_per_page) {
    let page_count = Math.ceil(items.length / items_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButtons(i, items);
        wrapper.appendChild(btn)
    }
}

function SetupPagination2(items, wrapper, items_per_page) {
    page = Math.floor((items.length / items_per_page) + 1)
    new_button = items.slice(items.length - (items.length % items_per_page), items.length)
    if (new_button.length == 1) {
        let btn = PaginationButtons(page, items)
        wrapper.appendChild(btn)
    }
}


function PaginationButtons(page, items) {
    let button = document.createElement("button");
    button.classList.add("px-5", "rounded-lg", "hover:bg-blue-400", "text-center", "hover:text-neutral-50")
    button.innerText = page
    if (current_page == page) {
        button.classList.add("active", "bg-blue-200");}

    button.addEventListener("click", function () {
        current_page = page;
        display(items, div_lista_con_imagenes, elements, current_page);
        let current_btn = document.getElementsByClassName('active')
        current_btn[0].classList.remove("bg-blue-400");
        current_btn[0].classList.remove("active");
        button.classList.add("active", "bg-blue-400");

    });
    return button;
}

    if (current_page == 1) {
        flecha_izq.style.display = 'none'
    } else {
        flecha_izq.style.display = 'block'
    }
    if (images.length != 0 && current_page < Math.ceil((images.length / elements))) {
        flecha_der.style.display = 'block'
    } else {
        flecha_der.style.display = 'none'
    }


    display(images, div_lista_con_imagenes, elements, current_page)
    SetupPagination(images, pagination_element, elements)



flecha_izq.addEventListener('click', () => {
    if (current_page - 1 > 0) {
        current_page = current_page - 1
        display(images, div_lista_con_imagenes, elements, current_page)
    }

})

flecha_der.addEventListener('click', () => {
    if (current_page < Math.ceil((images.length / elements))) {
        current_page = current_page + 1
        display(images, div_lista_con_imagenes, elements, current_page)
    }
})



