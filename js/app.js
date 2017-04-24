var dataTasks = []

var CheckTask = React.createClass({
    render: function() {
        return (
            <input type="checkbox" name="todolist"/>
        );
    }
});

var LabelTask = React.createClass({
    render: function() {
        return (
            <label></label>
        );
    }
});

var AllTasks = React.createClass({
    render: function() {
        var data = this.props.data;
        var tasksTemplate = data.map(function(item, index) {
            var thisCheckID = "check" + {index}.index;
            var thisDivID = "div" + {index}.index;
            return (
                <div id={thisDivID} className="display">
                    <input type="checkbox" name="todolist" id={thisCheckID}/>
                    <label htmlFor={thisCheckID}>{item.taskText}</label>
                </div>
            )
        })
        return (
            <div className="tasks">
                {tasksTemplate}
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <AllTasks data={dataTasks} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('list')
);

var Trash = React.createClass({
    TrashClicked:  function() {
        /*var checked = document.getElementById("check1").checked;
        alert(checked);
        dataTasks*/

        for (var i = 0; i < dataTasks.length; i++)
        {
            var thisCheckID = "check" + i;
            var thisDivID = "div" + i;
            var checked = document.getElementById(thisCheckID).checked;
            if (checked) document.getElementById(thisDivID).setAttribute("class", "display-none");
        }
    },
    render: function() {
        return (
            <div>
                TODO list
                <div className="delete" onClick={this.TrashClicked}></div>
            </div>
        )
    }
});

ReactDOM.render(
    <Trash/>,
    document.getElementById('header')
);

var Plus = React.createClass({
    PlusClicked:  function() {
        var valueTask = document.getElementById("newtask").value;
        if (valueTask.replace(/\s/g, '').length < 3) alert("Слишком короткое задание!");
        else
        {
            dataTasks[dataTasks.length] = {taskText: valueTask};
            document.getElementById("newtask").value = "";
            ReactDOM.render(
                <App />,
                document.getElementById('list')
            );
        }
    },
    render: function() {
        return (
            <div>
                <div className="plus" onClick={this.PlusClicked}></div>
                <input className="form-control" type="text" id="newtask"/>
            </div>
        )
    }
});

ReactDOM.render(
    <Plus/>,
    document.getElementById('newTaskDiv')
);

document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        var valueTask = document.getElementById("newtask").value;
        if (valueTask.replace(/\s/g, '').length < 3) alert("Слишком короткое задание!");
        else
        {
            dataTasks[dataTasks.length] = {taskText: valueTask};
            document.getElementById("newtask").value = "";
            ReactDOM.render(
                <App />,
                document.getElementById('list')
            );
        }
    }
    return false;
}
