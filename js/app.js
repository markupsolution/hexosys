var App = function() {

    var url = 'data/user.json';
    var users = [];
    var messages = {
        view: {
            failed : {
                text : "Request is failed!",
                class : "failed"
            }
        },
        remove: {
            success : {
                text : "Record removed successfully!",
                class : "success"
            },
            failed : {
                text : "Request is failed!",
                class : "failed"
            }
        }
    };

    function view(self) {
        var id = self.dataset.id; //please determine the id
        $.ajax({
            url: url,
            dataType: "json",
            error: function (){
                showStatusMsg(messages.view.failed);
            }
        }).done(function(data){
            var user_details = data.filter(function(row) {
                return row.id == id;
            });
            
            preaparePopup(user_details);

        });
    }

    function remove(self) {
        var id = self.dataset.id; //please determine the id
        $.ajax({
            url: url,
            dataType: "json",
            error: function (){
                showStatusMsg(messages.remove.failed);
            }
        }).done(function(data){
            var new_list = users.filter(function(row) {
                return row.id != id;
            });

            users = new_list;
            preapareList(users);
            showStatusMsg(messages.remove.success);
        });
    }

    function preapareList(data) {        
        var table='<table>';        
        table += '<tr><td>ID</td><td>Name</td><td>Age</td><td>Sex</td><td>Action</td></tr>';   // Creating user list table header
        
        $.each(data, function(index, item){
          table += '<tr><td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.sex + '</td><td><a href="javascript:;" class="button" data-id="' + item.id + '" onclick="App.view(this)">view</a> <a href="javascript:;" class="button" data-id="' + item.id + '" onclick="App.remove(this)">remove</a></td></tr>';       
        });

        table+='</table>';
        $(".datagrid").html(table);
    }

    function preaparePopup(user){
        console.log(user);
        var info = '<li><strong>ID: </strong>' + user[0].id + '</li><li><strong>Name: </strong>' + user[0].name + '</li><li><strong>Age: </strong>' + user[0].age + '</li><li><strong>Sex: </strong>' + user[0].sex + '</li>';
        $(".user-info").html(info);
        $(".popup-mask").fadeIn(200);
        $(".popup").fadeIn(300);
    }

    function showStatusMsg(status) {
        var msg_box = $("#response-message");
        msg_box.text(status.text).addClass(status.class).fadeIn();
        setTimeout(function(){ msg_box.fadeOut(1000)}, 5000)
    }

    function initialize() {
        $.getJSON(url, function(data) {
            users = data;
            preapareList(users);
        });
    }

    return {
        initialize,
        view,
        remove
    }

}();

App.initialize();

$(function() {
    $(".popup-close").on('click', function(){
        $(".user-info").html('');
        $(".popup-mask").fadeOut(300);
        $(".popup").fadeOut(200);
    })
});