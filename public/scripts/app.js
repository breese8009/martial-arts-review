$(document).ready(function() {

	$.ajax({
		method:"GET",
		url: '/api/styles',
		success: function(styles) {
		  styles.forEach(function(style) {
		  		renderStyles(style);
			renderListStyle(style);
		  })
		  	
		  
		}
	})

	//click event for  the add school button inside the modal
	$('.add-school').on('click', handleSchoolAddClick);
	//POST style elemnt
	$('.addStyles').on('submit', addingStyle);
	//delete button click event for style
	$('.styleDisplay').on('click', '.delete-style', deletingStyle);
	//edit button click event for style, gives input to change text
	$('.styleDisplay').on('click', ".edit-style", handleStyleEditClick);
	//toggled save button click event to save style after changes
	$('.styleDisplay').on('click', '.save-style', handleSaveStyleClick);
	//on submit of the form of modal
	$('.forms').on('submit', handleSaveSchoolClick);
	//click event for when style list element is clicked, 
	//give class active and shows only styles that match list element
	$('.list-group-style').on('click', '.list-group-item', activeStyles);
});


//renders list elements to html
function renderListStyle(style) {
	let styleHtml=`
	<a href="#" class="list-group-item list-group-item-action" data-id="${style._id}">${style.type}</a>
	`
	$('.list-group-style').prepend(styleHtml);
}




//give class active to list element when selected, also posts schools
function activeStyles(e) {
    e.preventDefault();
    let style = $(this).data('id');
    console.log(style);
    let currentElem = $('.list-group-item[data-id='+style+']');
    $(this).parent().children().removeClass("active");
    currentElem.addClass('active');

    $('.styleDisplay .styleClass').not('[data-styleid=' + style +']').fadeOut();
    $('.styleDisplay .styleClass[data-styleid=' + style +']').fadeIn();

    $.ajax({
    	method: "GET",
    	url:'/api/styles/'+style+'/schools',
    	success: function(styl){
    		console.log(styl);
    		renderSchool(styl);
    	}
    })


}



//adds style element and appended data 
function addingStyle(e) {
	e.preventDefault();
	let formData = $(this).serialize();
	console.log(formData);
	$.ajax({
		method: "POST",
		url: '/api/styles',
		data: formData,
		success: function(style) {
			renderStyles(style);
			renderListStyle(style);
		}
	})
}



//renders appended data and elements to html
function renderStyles(style) {
	
	let styleHtml = `
	<!-- Style information -->

	<div class="card-header styleClass" data-styleid="${style._id}"><h1>${style.type}</h1>
		<div class="card-body-style">
			<p class="card-title style-desc">${style.description}</p>
			<p class="card-text style-comm">${style.comments}</p>
			<p class="card-text style-link"><a href="${style.link}"></a></p>
			<div class="row">
				<div class="col-sm-2">
					<button class="btn-danger delete-style" data-id="${style._id}">Delete</button>
				</div>
				<div class="col-sm-2">
					<button class="btn-info edit-style" data-id="${style._id}">Edit</button>
					<button class="btn-info save-style save-edit" data-id="${style._id}">Save</button>
				</div>
			</div>
		</div>
		<div>
		<button type="button" class="btn btn-primary add-school" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" data-id="${style._id}">Add school</button>
		</div>
	</div>

	`

	$('.styleDisplay').prepend(styleHtml);
}




	

	// deletes style 
function deletingStyle(e) {
	e.preventDefault();
let styleId = $(this).attr("data-id");
console.log(styleId);
$.ajax({
	url: '/api/styles/'+styleId,
	method:'DELETE',
	success: function() {
	$('[data-styleid=' + styleId +']').remove();

	},
	error: function() {
		console.log("did not work ");
	}
})
}


//handles edit button click on style element


function handleStyleEditClick(e) {
let styleId = $(this).attr("data-id");
let styleElem = $(this).closest('.styleClass');

// add input field to elements with its current text value
let type = styleElem.find('h1').text();
styleElem.find('h1').html('<input class="edit-style-type" value='+'"'+type+'"'+'/>');

let desc = styleElem.find('.style-desc').text();
styleElem.find('.style-desc').html('<input class="edit-style-desc" value='+'"'+desc+'"'+'/>');

let comm = styleElem.find('.style-comm').text();
styleElem.find('.style-comm').html('<input class="edit-style-comm" value='+'"'+comm+'"'+'/>');


let link = styleElem.find('.style-link').text();
styleElem.find('.style-link').html('<input class="edit-style-link" value='+'"'+link+'"'+'/>');

//toggle between edit button and save button after edit is clicked
$(this).toggleClass('save-edit');
$('.save-style[data-id='+styleId+']').toggleClass('save-edit');

}





// after click of edit, this handles the save style click event to save the new changes
function handleSaveStyleClick(e) {
let styleId = $(this).attr("data-id");
let styleElem = $(this).closest('.styleClass');
let data = {
	type: styleElem.find('.edit-style-type').val(),
	description: styleElem.find('.edit-style-desc').val(),
	comments: styleElem.find('.edit-style-comm').val(),
	link: styleElem.find('.edit-style-link').val()
}
$.ajax({
	method: "PUT",
	url: "/api/styles/"+styleId,
	data: data,
	success: function() {
		window.location = window.location;
	}
})
}


















// renders the schools to html

function renderSchool(school) {

	let html = `
			<div class="list-group" data-id="${school._id}">
<div class="card" style="width: 20rem;">
  <img class="card-img-top" src="${school.image}" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">${school.name}</h4>
    <p class="card-text">Address:</p>
    
    <a href="#" class="btn btn-info">Edit</a>
    <a href="#" class="btn btn-danger">Delete</a>
  </div>
</div>
</div>
	`

	$('#schoolsAppended').append(html);

}






function handleSchoolAddClick() {
	let styleId = $(this).attr('data-id');
    $('.forms').attr('data-id', styleId)
    $.ajax({
    	method:"POST",
    	url: '/api/schools',
    	success: function(style) {
    		console.log(style)
    	}
    })
}






function handleSaveSchoolClick(e) {
	e.preventDefault();
	let formData = $(this).serialize();
	let styleId = $('.list-group-item.active').data('id');
console.log(styleId);
	$.ajax({
		method: "POST",
		url: '/api/styles/'+styleId+'/schools',
		data: formData,
		success: function(school) {
			console.log(school);
			renderSchool(school);
	}
})
}








