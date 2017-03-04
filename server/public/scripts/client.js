console.log('client.js here');
  $(document).ready(function(){ // start document.ready
  console.log('jquery here');
  getTasks();

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
            $newTask.append('<input type="checkbox" data-id="' + currentTask.id + '">');
            $newTask.append('<td>'+ currentTask.task + '</td>');
            $newTask.append('<td><button class="deleteButton">Delete</button></td>');
            $('#taskData').append($newTask);
          }
        }
      });  //closes ajax
    }; // end getTasks()

  }); //end Document Ready
