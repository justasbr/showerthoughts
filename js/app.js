var app = angular.module("myApp", []);

app.controller('MainController', function ($scope, redditService) {
  this.title = 'Thought of the day';
  this.posts = [];
  var self = this;

  redditService.getAll(function (data) {
    self.posts = data.data.data.children;
    self.update();
  });

  this.update = function () {
    if (self.posts.length) {
      var randomIndex = Math.floor(Math.random() * self.posts.length);
      self.post = self.posts[randomIndex].data;
      self.posts.splice(randomIndex, 1);
      console.log(self.post);
    }
  }
});


app.service('redditService', function ($http) {
  return {
    getAll: function (callback) {
      $http.get('https://www.reddit.com/r/showerthoughts.json').then(callback);
    }
  }
});

app.directive('randomColor', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      scope.$watch('main.post', function () {
        element.css('color', getRandomColor());
      })
    }
  }
});