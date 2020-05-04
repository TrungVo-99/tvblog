$(document).ready(function() {
  let html = `<% data.forEach(category=>{%>
    <li>
      <a href="#"><%- category.name %></a>
      <div class="uk-navbar-dropdown">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <% category.children.length > 0 && category.children.forEach(topic=>{%>
          <li><a href="#"><%- topic.name %></a></li>
          <%}) %>
        </ul>
      </div>
    </li>
    <%}) %>`;

  axios
    .get("/get-navbar")
    .then(res => {
      let navbar = ejs.render(html, { data: res.data });
      console.log(res);
      if (res) {
        $("#load-navbar").html(navbar);
      }
    })
    .catch(err => {
      console.log(err);
    });
});
