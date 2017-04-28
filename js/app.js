/**
 * Created by walid on 23/01/16.
 */
var app = angular.module('todo',['LocalStorageModule']);
app.config(function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('todo-local-abu');
    localStorageServiceProvider.setStorageType('localStorage');//You could change web storage type to localStorage or sessionStorage

});
app.directive('snBlur',function(){
    return function (scope,element,attrs){
        //console.log(scope);
        element.bind('blur',function(){
            scope.$apply(attrs.snBlur);
        });
    }
});
app.controller('TodoCtrl',function($scope,filterFilter,localStorageService,$location){
    $scope.done = false;
    $scope.placeholder = " Ajouter une nouvelle tàche ";
    $scope.status = {}
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
    $scope.editTodo = function(todo){
        todo.editing = false ;
        updateTodos();
    };

    if($location.path() == ''){$location.path('/')}
    $scope.location = $location ;
    $scope.$watch('location.path()',function(newValue){
        //alert($location.path());
        $scope.status = newValue == '/' ? {} : newValue == '/active' ? {completed : false} : {completed : true}
    },true);




    //$scope.todos = [
    //    {name : 'Tâche completé', completed : true},
    //    {name : 'Tâche incompleté', completed : false},
    //    ];

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
        $scope.todos[index].completed= checked;
        updateTodos();

    }

});

