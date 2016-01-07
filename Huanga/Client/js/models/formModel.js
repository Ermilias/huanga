app.models.FormModel = (function() {
    var Observable = app.libs.Observable;

    function FormModel(name) {
        Observable.call(this);
        // here goes attributes;
        this.name = name;
        this.data = {};

    }
    FormModel.prototype = Object.create(Observable.prototype);
    FormModel.prototype.constructor = FormModel;

    return FormModel;
}).call(this);

app.models.FormModel.prototype.template = {
    'radioForm': {
        labels: [{
           val: 'Low : ',
           to: '32',
           br: true
        },{
           val: 'Medium : ',
           to: '64',
           br: true
        },{
           val: 'High : ',
           to: '128',
           br: true
        },{
           br: true
        }],
        body: [{
            appendTo: 'check-reso',
            formId: 'resolution'
        }, {
            name: 'reso',
            value: 32,
            'class': 'not-prevented',
            type: 'radio'
        }, {
            name: 'reso',
            value: 64,
            'class': 'not-prevented',
            checked : true,
            type: 'radio'
        }, {
            name: 'reso',
            value: 128,
            'class': 'not-prevented',
            type: 'radio'
        }, {
            value: 'Apply',
            id: 'apply-reso',
            type: 'button'
            }
        ]
    },
};

app.models.FormModel.prototype.setForm = function(formName,id) {
    id = id || undefined;
    this.notify({
        cmd: 'newForm',
        val: {
            form: this.template[formName],
            id: id
        }
    });
};
app.models.FormModel.prototype.addData = function(data) {
  for(key in data){
    console.log(typeof data[key]);
    if (key.indexOf('Form') === -1){
      this.data[key] = this.data[key] ? this.data[key] : [];
      if (typeof data[key] !== 'string'){
        var length = data[key].length;
        for (var i = 0; i < length; i++){
          this.data[key].push(data[key][i]);
        }   
      } else {
        this.data[key].push(data[key]);
      }
    }
  }
        console.log(this.data);
};