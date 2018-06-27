$(document).on('click', '#add-conversionfactor', function(){
  // $("#conversion-container").clone(true).appendTo($("#conversionall"));
  var e = $(
    '<div id="conversion-container"><div class="sign">x</div> <div id="conversion-factor"><div id="drop" ondrop="drop(event)" ondragover="allowDrop(event)"><button id="x">&times;</button><button id="switch">⇵</button></div><button id="add-conversionfactor">+ Conversion Factor</button></div></div>'
  );
  $("#conversionall").append(e);
});

$(document).on('click', '#x', function(){
  $(this.parentNode.parentNode.parentNode).hide();
});


jQuery.fn.swapWith = function(to) {
  return this.each(function() {
    var copy_to = $(to).clone(true);
    var copy_from = $(this).clone(true);
    $(to).replaceWith(copy_from);
    $(this).replaceWith(copy_to);
  });
};

$(document).on('click', '#switch', function(){
  if ($(this.parentNode.lastChild).parents(this.parentNode).length == 7) {
    $(this.parentNode.lastChild.childNodes[1]).swapWith($(this.parentNode.lastChild.childNodes[3]));
  }
});


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

// function dragEnter(ev) {
//   if ($("#data1").parents("#conversion-container").length == 1) {
//     $(function() {
//       $("#conversionfactor-all").mouseenter(function(){
//         $("#conversion-container").hide();
//       });
//     });
//   }
// }

// $(function() {
//   $("#data1").draggable({
//     cursorAt: {
//         bottom: -10,
//         right: -10,
//     }
//   });
// });
