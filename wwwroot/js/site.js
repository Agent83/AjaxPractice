﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


// Write your JavaScript code.
$(function () {
  $("#loaderbody").addClass('hide');

  $(document).bind('ajaxStart', function () {
    $("#loaderbody").removeClass('hide');
  }).bind('ajaxStop', function () {
    $("#loaderbody").addClass('hide');
  });
});



showInPopup = (url, title) => {
  $.ajax({
    type: "GET",
    url: url,
    success: function (response) {
      $("#form-modal .modal-body").html(response);
      $("#form-modal .modal-title").html(title);
      $("#form-modal").modal('show');
    }
  })
}

jQueryAjaxPost = form => {
  try {
    $.ajax({
      type: 'POST',
      url: form.action,
      data: new FormData(form),
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.isValid) {
          $("#view-all").html(response.html);
          $("#form-modal .modal-body").html('');
          $("#form-modal .modal-title").html('');
          $("#form-modal").modal('hide');
          $.notify('submittied successfully', { globalPosition: 'top center', className:'success' });
        }
        else
          $("#form-modal .modal-body").html(response.html);
      }
    })

  } catch (e) {
    console.log(e);
  }

  return false;
}

jQueryAjaxDelete = form => {
     if  (confirm('Confirm you would like to delete!'))  {
      try {
        $.ajax({
          type: 'POST',
          url: form.action,
          data: new FormData(form),
          contentType: false,
          processData: false,
          success: function (response) {
            $("#view-all").html(response.html);
            $.notify('deleted successfully', { globalPosition: 'top center', className:'success' });
          },
          error: function (err) {
            console.log(err);
          }
        })
            } catch (e) {
            console.log(e);
          }
  }
  return false;
}
