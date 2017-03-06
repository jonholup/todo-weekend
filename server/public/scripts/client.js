console.log('client.js here');

$(document).ready(function(){ // start document.ready
  console.log('jquery here');
  var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};
  var $checkboxes = $("#taskData :checkbox");
  getTasks();

  /////// Event Listeners ///////
  // #newTaskForm event listener
  $('#newTaskForm').on('submit', function(event) {
    console.log('clicking new task');
    event.preventDefault();
    var newTaskObject = {};
    var formFields = $(this).serializeArray();
    formFields.forEach(function (field) {
      newTaskObject[field.name] = field.value;
      console.log('forEach forfield:', field.name + " : " + field.value);
    });
    newTaskObject.complete = false;
    $.ajax({
      type: 'POST',
      url: '/tasks/newTask',
      data: newTaskObject,
      success: function(response){
        getTasks();
        $('#newTaskForm > input').val('');
      }
    });// end ajax POST
  }); // end newTaskForm event listener

  // Delete Button //
  $('#taskData').on('click', '.deleteButton', function(){
    var userConfirm = confirm('Are you sure you want to delete?');
    if (userConfirm == false) {
      return;
    } else {
    var idOfTaskToDelete = $(this).parent().parent().data().id;
    $.ajax({
      type: 'DELETE',
      url: '/tasks/delete/' + idOfTaskToDelete,
      success: function(response) {
        getTasks();
      }
    }) // end ajax
  };
  }); // end deleteButton click

  // Checkbox Click //
  $('#taskData').on('click', '.checkbox', function(){
    var idOfTaskToUpdate = $(this).parent().data().id;
    console.log($(this));
    var updateObject = {
      complete: $(this).is(':checked'),
      id: idOfTaskToUpdate
    };
    console.log(updateObject);

  $.ajax({
      type: 'PUT',
      url: 'tasks/update/' + idOfTaskToUpdate,
      data: updateObject,
      success: function(response){
        console.log(response);
        getTasks();
      }
    }) // end ajax
  }); //end Checkbox click



}); //end Document Ready




/////// Functions ///////
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response) {
      console.log('response', response); // response is an array of task objects
      $('#taskData').empty(); // clears the tasks in the #taskData
      for (var i = 0; i < response.length; i++) {
        var currentTask = response[i]; // Loops through tasks - This is an object
        var $newTask = $('<tr>'); // Creating a new row for each task
        $newTask.data('id', currentTask.id);
        var $newInput = $('<input type="checkbox" class="checkbox" data-id="' + currentTask.id + '">');
        if (currentTask.complete){
          $newInput.prop('checked', true);
          $newTask.addClass("redBackground");
        }
        $newTask.append($newInput);
        $newTask.append('<td>'+ currentTask.task + '</td>');
        $newTask.append('<td><button class="deleteButton">Delete</button></td>');
        $('#taskData').append($newTask);
      }
    }
  });  //closes ajax
}; // end getTasks function
