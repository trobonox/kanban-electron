import Vue from 'vue'

Vue.directive('resizable', {
  inserted: function (el) {
    el.addEventListener('input', function (e) {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + 'px';
    });
  }
});
