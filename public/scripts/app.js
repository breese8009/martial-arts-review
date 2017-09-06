$(document).ready(function() {


$('.addStyles').on('submit', addingStyle);

});


function addingStyle(e) {
	e.preventDefault();

	let formData = $(this).serialize();
	console.log(formData);
$.ajax({
		method: "POST",
		url: '/api/styles',
		data: formData,
		success: renderStyles
	})
}


function renderStyles(style) {

let styleHtml = `
	
  <a href="#" class="list-group-item list-group-item-action">${style.type}</a>

<!-- Style information -->
<div class="card bg-light mb-3 styleDisplay">
  <div class="card-header"><h1>${style.type}</h1></div>
  <div class="card-body">
    <p class="card-title">Description: ${style.description}</p>
    <p class="card-text">Comments: ${style.comments}</p>
    <p class="card-text"><a href="${style.link}">Wiki link</a></p>
    <div class="row">
    <div class="col-sm-2">
<button class="btn-danger">Delete</button>
</div>
<div class="col-sm-2">
<button class="btn-info">edit</button>
</div>
</div>
  </div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add school</button>
</div>

`
$('.list-group').prepend(styleHtml);
}