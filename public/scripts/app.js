$(document).ready(function() {

	$.ajax({
		method:"GET",
		url: '/api/styles',
		success: function(style) {
			renderStyles(style);
			renderListStyle(style);
		}
	})

	$('.addStyles').on('submit', addingStyle);
	$('.styleDisplay').on('click', '.delete-style', deletingStyle);

});


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




function renderStyles(style) {


	let styleHtml = `
	<!-- Style information -->

	<div class="card-header styleClass" data-styleid="${style._id}"><h1>${style.type}</h1>
		<div class="card-body">
			<p class="card-title">Description: ${style.description}</p>
			<p class="card-text">Comments: ${style.comments}</p>
			<p class="card-text"><a href="${style.link}">Wiki link</a></p>
			<div class="row">
				<div class="col-sm-2">
					<button class="btn-danger delete-style" data-id="${style._id}">Delete</button>
				</div>
				<div class="col-sm-2">
					<button class="btn-info">edit</button>
				</div>
			</div>
		</div>
		</div>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add school</button>
	

	`

	$('.styleDisplay').prepend(styleHtml);
}



function renderListStyle(style) {

	let styleHtml=`
	<a href="#" class="list-group-item list-group-item-action">${style.type}</a>
	`
	$('.list-group-style').prepend(styleHtml);

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






