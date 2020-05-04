$(document).ready(() => {
  //
  $("#list-topic").hide();
  $(".btn-opt").click(() => {
    $(".alert-title").remove();

    var e = document.getElementById("list-category");
    var name = e.options[e.selectedIndex].value;
    axios
      .post("/admin/getData", {
        name: name
      })
      .then(res => {
        if (res.data.children.length > 0) {
          console.log(res, "in res");
          res.data.children.forEach(topic => {
            $("#list-topic").append(
              `<option value="${topic._id}">${topic.name}</option>`
            );
          });
          $("#list-topic").show(2000);
        } else {
          $("#list-topic").hide();
          $(".alert-title").remove();
          $("#form-topic").append(
            `<h3 class="alert-title"> you dont have anany topic</h3>`
          );
        }

        // $("#list-topic").append("<option> aa</option>");
        // console.log(res.data);
      });
  });

  // check 'OK' input
  $(".btn-remove").hide();
  $("#input-remove").prop("disabled", false);

  $(".btn-check").click(() => {
    if ($("#input-remove").val() == "OK") {
      $(".btn-remove").show();
      $(".btn-check").hide();
      $("#input-remove").attr("disabled", true);
    }
  });
});
