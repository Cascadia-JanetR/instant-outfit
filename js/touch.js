$(document).ready(function() {
  $( init );
  function init() {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);   
  }
  $(function(){
  $(".drag")
  .bind( "dragstart", function( event ){
  // ref the "dragged" element, make a copy
  var $drag = $( this ), $proxy = $drag.clone();
  // modify the "dragged" source element
  $drag.addClass("outline");
  // insert and return the "proxy" element      
  return $proxy.appendTo( document.body ).addClass("ghost");
  })
  .bind( "drag", function( event ){
  // update the "proxy" element position
  $( event.dragProxy ).css({
  left: event.offsetX, 
  top: event.offsetY
  });
  })
  .bind( "dragend", function( event ){
  // remove the "proxy" element
$( event.dragProxy ).fadeOut( "normal", function(){
$( this ).remove();
});
// if there is no drop AND the target was previously dropped 
if ( !event.dropTarget && $(this).parent().is(".drop") ){
// output details of the action
$('#log').append('<div>Removed <b>'+ this.title +'</b> from <b>'+   
    this.parentNode.title +'</b></div>');
// put it in it's original <div>
$('#nodrop').append( this );
    }
// restore to a normal state
    $( this ).removeClass("outline");   
    });
    $('.drop')
.bind( "dropstart", function( event ){
// don't drop in itself
if ( this == event.dragTarget.parentNode ) return false;
// activate the "drop" target element
$( this ).addClass("active");
})
.bind( "drop", function( event ){
// if there was a drop, move some data...
$( this ).append( event.dragTarget );
// output details of the action...
$('#log').append('<div>Dropped <b>'+ event.dragTarget.title +'</b> into <b>'+ 
    this.title +'</b></div>');  
})
.bind( "dropend", function( event ){
// deactivate the "drop" target element
$( this ).removeClass("active");
    });
});
    function touchHandler(event)
    {
    var touches = event.changedTouches,
    first = touches[0],
    type = "";
    switch(event.type)
    {
    case "touchstart": type = "mousedown"; break;
    case "touchmove":  type="mousemove"; break;        
    case "touchend":   type="mouseup"; break;
    default: return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
           first.clientX, first.clientY, false,
                 false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
     event.preventDefault();
     return;
    }
    });