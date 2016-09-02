/* globals Backbone _ $*/

// used to generate fake serial numbers
var serialNo = 5

// backbone Model
var Car = Backbone.Model.extend({
  defaults: {
    brand: '',
    model: '',
    year: ''
  }
})

var car1 = new Car({
  serial: 1,
  brand: 'Ford',
  model: 'Figo',
  year: '2016'
})

var car2 = new Car({
  serial: 2,
  brand: 'VW',
  model: 'Polo',
  year: '2014'
})

var car3 = new Car({
  serial: 3,
  brand: 'Toyoto',
  model: 'Corolla',
  year: '2015'
})

var car4 = new Car({
  serial: 4,
  brand: 'Hyundai',
  model: 'i20',
  year: '2016'
})

// collection declaration
var currentCars = [car1, car2, car3, car4]
var CarList = Backbone.Collection.extend({model: Car})
var carList = new CarList(currentCars)

// single car view
var CarView = Backbone.View.extend({
  events: {
    'click .edit-car': 'editCar',
    'click .save-edit': 'updateCar',
    'click .cancel-edit': 'cancel',
    'click .delete-car': 'deleteCar'
  },
  model: new Car(),
  tagName: 'tr',
  template: _.template(
    '<td><span class="serial"><%= serial%></span></td>' +
    '<td><span class="brand"><%= brand%></span></td>' +
    '<td><span class="model"><%= model%></span></td>' +
    '<td><span class="year"><%= year%></span></td>' +
    '<td><button class="btn btn-default edit-car">Edit</button>' +
    '<button class="btn btn-default save-edit" style="display:none">Save</button>' +
    '<button class="btn btn-default cancel-edit" style="display:none">Cancel</button>' +
    '<button class="btn btn-default delete-car">Delete</button></td>'
    ),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
    return this
  },

  editCar: function () {
    this.$('.edit-car').hide()
    this.$('.delete-car').hide()
    this.$('.save-edit').show()
    this.$('.cancel-edit').show()

    this.$('.brand').html('<input type="text" class="form-control brand-update" value="' + this.model.get('brand') + '">')
    this.$('.model').html('<input type="text" class="form-control model-update" value="' + this.model.get('model') + '">')
    this.$('.year').html('<input type="text" class="form-control year-update" value="' + this.model.get('year') + '">')
  },

  updateCar: function () {
    this.model.set({
      brand: $('.brand-update').val(),
      model: $('.model-update').val(),
      year: $('.year-update').val()
    })
    this.$('.edit-car').show()
    this.$('.delete-car').show()
    this.$('.cancel-edit').hide()
    this.$('.save-edit').hide()

    this.$('.brand').html($('<td><span class="brand">' + this.model.get('brand') + '</span></td>'))
    this.$('.model').html($('<td><span class="brand">' + this.model.get('model') + '</span></td>'))
    this.$('.year').html($('<td><span class="brand">' + this.model.get('year') + '</span></td>'))
  },

  cancel: function () {
    this.render()
  },

  deleteCar: function () {
    this.model.destroy()
    this.remove()
  }
})

// new car form
var NewCarForm = Backbone.View.extend({
  events: {
    'click .new-car': 'makeCar'
  },
  tagName: 'tr',
  template: _.template('<td></td>' + '<td><input type="text" class="form-control brand"></td>' + '<td><input type="text" class="form-control model"></td>' + '<td><input type="text" class="form-control year"></td>' + '<td><button class="btn btn-default new-car">Create</button></td>'),
  render: function () {
    this.$el.html(this.template)
    return this
  },
  makeCar: function () {
    var newCar = {
      serial: serialNo++,
      brand: $('.brand').val(),
      model: $('.model').val(),
      year: $('.year').val()
    }
    carList.add(newCar)
  }
})

var newCarForm = new NewCarForm()

// all car view
var CarListView = Backbone.View.extend({
  model: carList,
  initialize: function () {
    this.model.on('add', this.addOne, this)
  },
  render: function () {
    this.collection.forEach(this.addOne, this)
    return this
  },
  addOne: function (car) {
    var carView = new CarView({model: car})
    $('.cars-list').append(carView.render().el)
  }

})
var carListView = new CarListView({collection: carList})

$(function () {
  $('.cars-list').append(newCarForm.render().el)
  carListView.render()
})
