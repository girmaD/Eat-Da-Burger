// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newBurger = {
          name: $("#burger").val().trim()                   
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });
    $(".devour_it").on("click", function(event) {
        let id = $(this).data("id");
        // let devoured = true;
        console.log(id)
    
        let devouredObj = {
          devoured: 1
        };
    
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: devouredObj
        }).then(
          function() {
            console.log("changed devoured to", devouredObj);
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });
    
})