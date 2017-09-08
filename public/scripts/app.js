$(document).ready(function() {

	$.ajax({
		method:"GET",
		url: '/api/styles',
		success: function(styles) {
		  	styles.forEach(function(style) {
		  		renderStyles(style);
				renderListStyle(style);
		  	})

		  	$('.add-school').on('click', function() {
		       let styleId = $(this).closest('.styleClass').data('styleId');
		      // $('#exampleModal').modal();
		      renderAddschoolModal(styleId)
			});
			$('.save-school').on('click', handleSaveSchoolClick);
		}
	})

	$('.addStyles').on('submit', addingStyle);
	$('.styleDisplay').on('click', '.delete-style', deletingStyle);
	$('.styleDisplay').on('click', ".edit-style", handleStyleEditClick);
	$('.styleDisplay').on('click', '.save-style', handleSaveStyleClick);
	$('.school-form').on('submit', addSchool);
	$('.list-group-style').on('click', '.list-group-item', handleSaveSchoolClick);
	

});


function addingStyle(e) {
	e.preventDefault();
console.log('click');
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




function renderStyles(style) {
	
	let styleHtml = `
	<!-- Style information -->

	<div class="card-header styleClass" data-style-id="${style._id}"><h1>${style.type}</h1>
		<div class="card-body-style">
			<p class="card-title style-desc">${style.description}</p>
			<p class="card-text style-comm">${style.comments}</p>
			<p class="card-text style-link"><a href="${style.link}">Wiki link</a></p>
			<div class="row">
				<div class="col-sm-2">
					<button class="btn-danger delete-style" data-id="${style._id}">Delete</button>
				</div>
				<div class="col-sm-2">
					<button class="btn-info edit-style" data-id="${style._id}">edit</button>
					<button class="btn-info save-style save-edit" data-id="${style._id}">save</button>
				</div>
			</div>
		</div>
		<div>
		<button type="button" class="btn btn-primary add-school" data-id="${style._id}" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add school</button>
		</div>
	</div>

	`

	$('.styleDisplay').prepend(styleHtml);
}





function renderListStyle(style) {
	let styleHtml=`
	<a href="#" class="list-group-item list-group-item-action" data-id="${style._id}">${style.type}</a>
	`

	$('.list-group-style').prepend(styleHtml);

}



function selectStyleHandler(e) {
    e.preventDefault();
    console.log(`i got here`)
    let style = $(this).data('id');
    // let currentElem = $('.list-group-item[data-id='+style+']');

    let newActElem = $('.list-group-item[data-id='+style+']');
    let oldActElem = $(this).parent().children('.active');

console.log(newActElem);
console.log(oldActElem);


    // $(this).parent().children().removeClass("active");
    // let currentActiveElem = $(this).parent().children('.active');
   
    // currentElem.addClass('active');
    newActElem.addClass('active');
  

    $('.styleDisplay .styleClass').not('[data-styleid=' + style +']').fadeOut();
    $('.styleDisplay .styleClass[data-styleid=' + style +']').fadeIn();

 //    $.ajax({
	// 	method:"GET",
	// 	url: '/api/styles/'+styleId+'/schools',
	// 	success: renderSchools
	// })

}


	

	
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




function handleStyleEditClick(e) {
let styleId = $(this).attr("data-id");
let styleElem = $(this).closest('.styleClass');

let type = styleElem.find('h1').text();
styleElem.find('h1').html('<input class="edit-style-type" value='+'"'+type+'"'+'/>');

let desc = styleElem.find('.style-desc').text();
styleElem.find('.style-desc').html('<input class="edit-style-desc" value='+'"'+desc+'"'+'/>');

let comm = styleElem.find('.style-comm').text();
styleElem.find('.style-comm').html('<input class="edit-style-comm" value='+'"'+comm+'"'+'/>');


let link = styleElem.find('.style-link').text();
styleElem.find('.style-link').html('<input class="edit-style-link" value='+'"'+link+'"'+'/>');


$(this).toggleClass('save-edit');
$('.save-style[data-id='+styleId+']').toggleClass('save-edit');

}






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





// schools app.js

function renderSchools(school) {

	let html = `
			<div class="list-group" data-id="${school._id}">
<div class="card" style="width: 20rem;">
  <img class="card-img-top" src="${school.image}" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">${school.name}</h4>
    <p class="card-text">Address:</p>
    <a href="#" class="btn btn-primary">${school.link}</a>
    <a href="#" class="btn btn-info">Edit</a>
    <a href="#" class="btn btn-danger">Delete</a>
  </div>
</div>
</div>
	`
	$('#schoolsAppended').prepend(html);
}


function renderAddschoolModal(styleId) {
  let html = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Martial Arts School</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="school-form">
      <div class="modal-body">
        
          <div class="form-group">
            <label for="recipient-name" class="form-control-label">School name</label>
            <input type="text" class="form-control" name="name">
          </div>
          <div class="form-group">
            <label for="message-text" class="form-control-label">Address</label>
             <input type="text" class="form-control" name="address">
          </div>
          <div class="form-group">
            <label for="recipient-name" class="form-control-label">Link</label>
            <input type="text" class="form-control" name="link">
          </div>
          <div class="form-group">
            <label for="recipient-name" class="form-control-label">Image</label>
            <input type="text" class="form-control" name="image">
          </div>


       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary save-school" data-style-id="${styleId}">Save school</button>
      </div>
       </form>
    </div>
  </div>
</div>

`
$('body').append(html);

}



function addSchool(e) {
	e.preventDefault();
	let formData = $(this).serialize();
	
let styleId = $('.add-school').data('id');
console.log(styleId);
	$.ajax({
		method: "POST",
		url: '/api/styles/'+styleId+ '/schools',
		data: formData,
		success: renderSchools
})

	
}


function handleSaveSchoolClick(e) {
	e.preventDefault();
	
	console.log('clicked');
}






