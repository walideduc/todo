/**
 * Created by walid on 23/01/16.
 */
var app = angular.module('todo',['LocalStorageModule']);
app.config(function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('todo-local-abu');
    localStorageServiceProvider.setStorageType('localStorage');//You could change web storage type to localStorage or sessionStorage

});
app.controller('TodoCtrl',function($scope,filterFilter,localStorageService){

    //$scope.todos = [
    //    {name : 'Tâche completé', completed : true},
    //    {name : 'Tâche incompleté', completed : false},
    //    ];
    getTodos = function(){
        todo = localStorageService.get('todo');
        if(todo === null){
            return [];
        }
        return todo;
    };
    updateTodos = function(){
        localStorageService.set('todo',$scope.todos);
    };
    $scope.todos =  getTodos();

    //if(localStorageService.isSupported){
    //    localStorageService.set('todo',$scope.todos)
    //    console.log(localStorageService.get('todo1'));
    //    console.log(localStorageService.keys());
    //}

    $scope.$watch('todos',function(){
        $scope.remaining =filterFilter($scope.todos,{completed :false}).length;
        $scope.allchecked = !$scope.remaining;
    },true);


    $scope.removeTodo = function(index){
        $scope.todos.splice(index,1);
        updateTodos();
    }


    $scope.addTodo = function(){
        $scope.todos.push({
            name: $scope.newTodo,
            completed: false
        });
        updateTodos();
        $scope.newTodo = '';
    }


    $scope.checkAllTodo = function(allChecked){
        angular.forEach($scope.todos,function(todo){
          todo.completed = allChecked ;
        })
        updateTodos();
    }

    $scope.checkTodo = function(index,checked){
        console.log(index);
        console.log(checked);
        $scope.todos[index].completed= checked;
        updateTodos();

    }

});

