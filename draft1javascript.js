$(document).on('click', '#add-conversionfactor', function(){
  $(this).remove();

  var e = $(
    '<div id="conversion-container"><div class="sign">x</div> <div id="conversion-factor"><div id="drop" ondrop="drop(event)" ondragover="allowDrop(event)"><button id="x">&times;</button><button id="switch">⇵</button></div><button id="add-conversionfactor">+ Conversion Factor</button></div></div>'
  );

  $("#conversionall").append(e);
});

$(document).on('click', '#x', function(){
  var needsUpdate = false;
  if($(this).parent().parent().find("#drop")[0].lastElementChild.id.startsWith("data")) {
    for(var index = 0; index < 9; index++) {
      if($("#factor-container")[0].children[index].lastElementChild == null) {
        $($("#factor-container")[0].children[index]).append($($(this).parent().parent().find("#drop")[0].lastElementChild).clone(true));
        needsUpdate = true;
        break;
      }
    }
  }

  var hasAddButton = $(this).parent().parent().find("#add-conversionfactor").length == 1; // this check has to be done before the element is deleted in the next line
  $(this.parentNode.parentNode.parentNode).remove();
  if(hasAddButton) {
    $($("#conversionall")[0].lastElementChild.lastElementChild).append('<button id="add-conversionfactor">+ Conversion Factor</button>'); //this must be called after the deletion because of the lastElementChild references that are used
  }

  if(needsUpdate) {
    updateValue();
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
    updateValue();
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
  var inp = parseFloat($("#text-id").val());
  var allconv = $("#conversionall")[0];
  for(var index = 0; index < allconv.childElementCount;index++) {
    if(allconv.children[index].lastElementChild.firstElementChild.lastElementChild.id.startsWith("data")) {
      var num_s = allconv.children[index].lastElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML.split(" ")[0].split("x");
      var den_s = allconv.children[index].lastElementChild.firstElementChild.lastElementChild.lastElementChild.innerHTML.split(" ")[0].split("x");

      var num = parseFloat(num_s[0]);
      var den = parseFloat(den_s[0]);

      if(num_s.length > 1) {
        num = num * Math.pow(10, parseFloat(num_s[1].split(">")[1]));
      }

      if(den_s.length > 1) {
        den = den * Math.pow(10, parseFloat(den_s[1].split(">")[1]));
      }

      inp = inp * num;
      inp = inp / den;
    }
  }

  //console.log(allconv);

  $("#answer").html(inp + " " + $("#unit-id").val());

}
