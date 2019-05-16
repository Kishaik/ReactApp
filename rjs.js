class Comp0 extends React.Component {
  constructor() {
    super();
    this.state = {
      works: false
    };
    this.addImg = this.addImg.bind(this);
    this.addText = this.addText.bind(this);
  }
  addImg() {
  fabric.Image.fromURL('deluxe.jpg', function(myImg) {
  var img1 = myImg.set({ left: 0, top: 0 ,width:150,height:150});
  canvas.add(img1); 
});
}

  addText() {
   var newID = (new Date()).getTime().toString().substr(5);
   var text = new fabric.IText('New Text', {
        fontFamily: 'arial black',
        left: 100,
        top: 100,
        myid: newID,
        objecttype: 'text'
      });
      canvas.add(text);
    
}
  render() {
    return (
      <div>
          <button type="button" id="b1" className="btn btn-primary" onClick={this.addImg}>Add Image</button>
          <button type="button" id="b2" className="btn btn-primary" onClick={this.addText}>Add Text</button>

      </div>
    );
  }
}

ReactDOM.render(<Comp0 />, document.getElementById('add_img_text'));

class Comp1 extends React.Component {
  zoomIn() {
    $('#myCanvas').css('width', '700px');
    $('#myCanvas').css('height', '700px');
    $('#bleed').css('width', '750px');
    $('#bleed').css('height', '750px');
  }
  zoomOut() {
    $('#myCanvas').css('width', '595px');
    $('#myCanvas').css('height', '595px');
    $('#bleed').css('width', '700px');
    $('#bleed').css('height', '700px');
  }
  addSvg() {
    fabric.Image.fromURL('st-8446-v3-4x4-standard.svg', function(myImg) {
    var img1 = myImg.set({ left: 2, top: 2 ,width:590,height:590});
    canvas.add(img1); 
    });
  }

  render() {
    return (
      <div>
          <button type="button" id="b3" className="btn btn-info" onClick={this.zoomIn}>Zoom In</button>
          <button type="button" id="b4" className="btn btn-info" onClick={this.zoomOut}>Zoom Out</button>
          <button type="button" id="b6" className="btn btn-primary" onClick={this.addSvg}>Load SVG</button>
      </div>
    );
  }
}

ReactDOM.render(<Comp1 />, document.getElementById('zoom'));    

class Comp2 extends React.Component {
  render() {
    return (
      <div>
          <canvas id="myCanvas" width="595" height="595" style={{margin:'20px'}}>
          </canvas>
      </div>
    );
  }
}

ReactDOM.render(<Comp2 />, document.getElementById('c_canvas')); 


var canvas = new fabric.Canvas('myCanvas', {
  selection: false,
  uniScaleTransform: true
});
canvas.uniScaleTransform = true;

var appObject = function() {

  return {
    __canvas: canvas,
    __tmpgroup: {},

    addText: function() {
      var newID = (new Date()).getTime().toString().substr(5);
      var text = new fabric.IText('New Text', {
        fontFamily: 'arial black',
        left: 100,
        top: 100,
        myid: newID,
        objecttype: 'text'
      });

      this.__canvas.add(text);
      this.addLayer(newID, 'text');
    },
    setTextParam: function(param, value) {
      var obj = this.__canvas.getActiveObject();
      if (obj) {
        if (param == 'color') {
          obj.setColor(value);
        } else {
          obj.set(param, value);
        }
        this.__canvas.renderAll();
      }
    },
    setTextValue: function(value) {
      var obj = this.__canvas.getActiveObject();
      if (obj) {
        obj.setText(value);
        this.__canvas.renderAll();
      }
    },
    addLayer: function() {

    }

  };
}

$(document).ready(function() {

  var app = appObject();

  $('.font-change').change(function(event) {
    app.setTextParam($(this).data('type'), $(this).find('option:selected').val());
  });

  $('#add').click(function() {
    app.addText();
  });
  $('#text-cont').keyup(function() {
    app.setTextValue($(this).val());
  })

})

$('#myToggle').change(function(){
    if(this.checked) {
        $('#bleed').addClass("bleed");
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.lineWidth = "4";
        ctx.strokeStyle = "black";
        ctx.setLineDash([7]);
        ctx.strokeRect(0, 0, 595, 595);
    }
    else { 
        $('#bleed').removeClass("bleed");
    }
});

$('#fileupload').change(function(e){
            var fileName = e.target.files[0].name;
            fabric.Image.fromURL(fileName, function(myImg) {
            var img2 = myImg.set({ left: 0, top: 0 ,width:400,height:400});
            canvas.add(img2); 
            });
        });
        


