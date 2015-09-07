// Import Node Modules
var React = require('react')
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');


// The VineApplication Component
var VineApp = React.createClass({
  mixins: [ReactFireMixin], /* Awesome magical mixin */
  componentWillMount: function() {
    var ref = new Firebase("https://dazzling-fire-1284.firebaseio.com/vines");
    this.bindAsArray(ref, "vines");
  },
  render: function () {
    return (
      <div>
        <VineList items={this.state.vines} />
      </div>
    )
  }
});

// The VineList Component
var VineList = React.createClass({
  render: function(){
    var _this = this;
    var createItem = function(item){
      return (
        <li id={item.id} className="vineItem">
          @{item.star}
        </li>
      )
    };
    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

// Render the 
React.render(<VineApp />, document.querySelector('#content'));

document.getElementById('btnGet').addEventListener('click', function(){
  
  var xhr = new XMLHttpRequest();
  //https://vine.co/oembed.json?id=egXzgWMjrTj
  xhr.onReadyStateChange = function(){
    console.log("Status Code: " + xhr.status);
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    }
  }

  xhr.onError = function(e){

  }

  //var url = 'https://vine.co/oembed.json?id=egXzgWMjrTj';
  var url = 'http://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3DM3r2XDceM6A&format=json';

  xhr.open('GET', url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.setRequestHeader("Access-Control-Allow-Origin", "https://localhost:8000");
  xhr.send();

});