$(document).on('click', '#add-conversionfactor', function(){
  $(this).remove();

  var e = $(
    '<div id="conversion-container"><div class="sign">x</div> <div id="conversion-factor"><div id="drop" ondrop="drop(event)" ondragover="allowDrop(event)"><button id="x">&times;</button><button id="switch">⇵</button></div><button id="add-conversionfactor">+ Conversion Factor</button></div></div>'
  );

  $("#conversionall").append(e);
});

$(document).on('click', '#x', function(){
  var hasAddButton = $(this).parent().parent().find("#add-conversionfactor").length == 1; // this check has to be done before the element is deleted in the next line
  $(this.parentNode.parentNode.parentNode).remove();
  if(hasAddButton) {
    $($("#conversionall")[0].lastElementChild.lastElementChild).append('<button id="add-conversionfactor">+ Conversion Factor</button>'); //this must be called after the deletion because of the lastElementChild references that are used
  }
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
  updateValue();
}

function updateValue() {
  $("#answer").html($("#text-id").val() + " " + $("#unit-id").val());

}
