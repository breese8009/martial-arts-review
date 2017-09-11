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

	//edit/delete event handlers
	$('#schoolsAppended').on('click', '.school', handleSchoolEditClick);
	$('#schoolsAppended').on('click', '.delete-school', handleSchoolDeleteClick);
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
	//what to do when save is clicked after making edits click event
	$('#schoolsAppended').on('click','.save-school-edit', handleSaveEditSchool);
	// $('#schoolsAppended').on('click', '.save-school-edit', )
	$('.save-school').on('click', hideModal);
	
});

function hideModal(e) {
	$('#exampleModal').modal('hide');
}



////////////
//STYLES!//
///////////       
///////////


//renders list elements to html
function renderListStyle(style) {
	let styleHtml=`
	<a href="#" class="list-group-item list-group-item-action" data-id="${style._id}">${style.type}</a>
	`
	$('.list-group-style').prepend(styleHtml);
}








//renders appended data and elements to html
function renderStyles(style) {
	
	let styleHtml = `
	<!-- Style information -->

	<div class="card-header styleClass" data-styleid="${style._id}"><h1>${style.type}</h1>
		<div class="card-body-style">
		<label><b>Description:</b></label>
			<p class="card-title style-desc">${style.description}</p>
			<label><b>Comments:</b></label>
			<p class="card-text style-comm">${style.comments}</p>
			<p class="card-text style-link"><a href="${style.link}">Watch video</a></p>
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

//give class active to list element when selected, also gets schools and renders them schools
function activeStyles(e) {
    e.preventDefault();
    //get style id
    let style = $(this).data('id');
    //get current element
    let currentElem = $('.list-group-item[data-id='+style+']');
    //adding and removing active class from list elements
    $(this).parent().children().removeClass("active");
    currentElem.addClass('active');

    $('.styleDisplay .styleClass').not('[data-styleid=' + style +']').fadeOut();
    $('.styleDisplay .styleClass[data-styleid=' + style +']').fadeIn();

    $.ajax({
    	method: "GET",
    	url:'/api/styles/'+style+'/schools',
    	success: function(schools){
    		console.log(schools);
    		emptySchools();
    		schools.forEach((el)=>{   		
    		renderSchool(el);
    		})
    	},
    	error: function(err) {
    		console.log("error");
    		console.log(err);
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
			$('.addStyles').trigger('reset')
		}
	})
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


let link = styleElem.find('.style-link').attr('styleid');
console.log(link);
styleElem.find('.style-link').html('<input class="edit-style-link" value='+'"'+link+'"'+'/>');

//toggle between edit button and save button after edit is clicked
$(this).toggleClass('save-edit');
$('.save-style[data-id='+styleId+']').toggleClass('save-edit');

}





// after click of edit, this handles the save style click event to save the new changes
function handleSaveStyleClick(e) {
let styleId = $(this).attr("data-id");
let styleElem = $(this).closest('.styleClass');
console.log(styleElem);
console.log(styleElem.find('.edit-style-type'));
let data = {
	type: styleElem.find('.edit-style-type').val(),
	description: styleElem.find('.edit-style-desc').val(),
	comments: styleElem.find('.edit-style-comm').val(),
	link: styleElem.find('.edit-style-link').val()
}
console.log(data.type);

$.ajax({
	method: "PUT",
	url: "/api/styles/"+styleId,
	data: data,
	success: function(style) {
		
	// styleElem.remove();
		// renderStyles(style);

	}
})
}


////////////
//SCHOOLS!//
///////////       
///////////


// renders the schools to html


function renderSchool(school) {
	let html = `
			<div class="list-group school-select" data-id="${school._id}">
<div class="card" style="width: 20rem;">
  <img class="card-img-top school-image" src="${school.image}" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title school-name school-name">${school.name}</h4>
    <p class="card-text school-address school-address">${school.address}</p>
    <label><b>Comments</b></label>
     <p class="card-text school-reviews school-reviews">${school.reviews}</p>

      <a href="${school.link}" class="btn btn-info school-link .edit-school-link">Link</a>
    <a href="#" class="btn btn-info school">Edit</a>
     <a href="#" class="btn btn-info save-school-edit save-edit" data-id="${school._id}">Save</a>
    <a href="#" class="btn btn-danger delete-school">Delete</a>
  </div>
</div>
</div>
	`

	$('#schoolsAppended').append(html);

}



function handleSaveEditSchool(e) {
e.preventDefault();

let styleId = $('.list-group-item.active').data('id');
let schoolId = $(this).closest('.school-select').data('id')
let styleElem = $(this).closest('.school-select');


let data = {
	name: styleElem.find('.edit-school-name').val(),
	address: styleElem.find('.edit-school-address').val(),
	link: styleElem.find('.edit-school-link').val(),
	image: styleElem.find('.edit-school-image').val()

}

let schoolElem = $(this).closest('.school-select');
$.ajax({
	method:"PUT",
	url: '/api/styles/'+ styleId+'/schools/'+schoolId,
	data: data,
	success: function(school) {
		console.log(school)
		// window.location.reload();
		// saveBtn.toggleClass('save-edit');
schoolElem.remove();
renderSchool(school);


	},
	error: function(err) {
console.log('not updating edit');
console.log(err);
	}

})
}




function handleSchoolDeleteClick(e) {
e.preventDefault();
console.log('clicked');
let schoolId = $(this).closest('.school-select').data('id');
let styleId = $('.list-group-item.active').data('id');

$.ajax({
   method:"DELETE",
   url:'/api/styles/'+styleId+'/schools/'+schoolId,
   success: function() {
   	$('[data-id='+schoolId+"]").remove();

},
	error: function(err) {
		console.log("this didnt work"+err)

}
})
}







function handleSchoolEditClick(e) {
e.preventDefault();
let styleId = $(this).attr("data-id");
let styleElem = $(this).closest('.school-select');
let schoolId = $(this).closest('.school-select');

$('#schoolsAppended').find('.school-image').val();
let name = styleElem.find('.school-name').text();
styleElem.find('.school-name').html('<input class="edit-school-name" value='+'"'+name+'"'+'/>');
let address = styleElem.find('.school-address').text();
styleElem.find('.school-address').html('<input class="edit-school-address" value='+'"'+address+'"'+'/>')

let link = styleElem.find('.school-link').attr('href');
styleElem.find('.school-link').html('<input class="edit-school-link" value='+'"'+link+'"'+'/>')

let image = styleElem.find('.school-image').attr('src');
styleElem.find('.school-image').html('<input class="edit-school-image" value='+'"'+image+'"'+'/>')

let reviews = styleElem.find('.school-reviews').text();
styleElem.find('.school-reviews').html('<input class="edit-school-reviews" value='+'"'+reviews+'"'+'/>')
// $(this).toggleClass('save-edit');

$(this).toggleClass('save-edit')
$('.save-school-edit').toggleClass('save-edit');
// $('.save-school-edit[data-id='+schoolId+']').toggleClass('save-edit');

}




function handleSchoolAddClick() {
	let styleId = $(this).attr('data-id');
    $('.forms').attr('data-id', styleId)
    $.ajax({
    	method:"POST",
    	url: '/api/schools',
    	success: function(style) {
    		console.log(style);

    	}
    })
}





//saves school and post
function handleSaveSchoolClick(e) {
	e.preventDefault();
	console.log('got here');
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



//function used to empty schools
function emptySchools() {
	$('#schoolsAppended').empty();
}






