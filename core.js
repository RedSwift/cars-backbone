/* globals Backbone _ $*/
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

var currentCars = [car1, car2, car3, car4]

// single view
var CarView = Backbone.View.extend({
  model: new Car(),
  tagName: 'tr',
  template: _.template('<td><%= serial%></td>' + '<td><%= brand%></td>' + '<td><%= model%></td>' + '<td><%= year%></td>' + '<td><button class="btn btn-default">Edit</button> <button class="btn btn-default">Delete</button></td>'),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
    return this
  }
})

// collection & collection view
var CarList = Backbone.Collection.extend({model: Car})
var carList = new CarList()
carList.add(currentCars)

var CarListView = Backbone.View.extend({
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
  carListView.render()
})
