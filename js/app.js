var dataTasks = [
    {
        taskText: 'раз дело'
    },
    {
        taskText: '2 дело'
    },
    {
        taskText: '3 дело'
    },
    {
        taskText: '4 дело'
    },
    {
        taskText: '5 дело'
    }
]

/*alert(dataTasks[dataTasks.length-1].taskText);
var vallll = 'val etiti!!!';
dataTasks[dataTasks.length] = {taskText: vallll};
alert(dataTasks[dataTasks.length-1].taskText);*/

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

/*

ReactDOM.render(
    <PTask4/>,
    document.getElementById('list')
);
*/

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

/*
var PTask = React.createClass({
    render: function() {
        return (
            <p className="task">

            </p>
        );
    }
});*/

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

/*
var Trash = React.createClass({

/!*
    constructor(props) {
        super(props);
        this.state = {class: "off", label: "Нажми"};

        this.press = this.press.bind(this);
    }
*!/

    press(){
        var className = (this.state.className=="off")?"on":"off";
        this.setState({className: className});
    },
    render: function() {
        return (
            <button onClick={this.press} className={this.state.className}>чё-то</button>
        )
    }
});

ReactDOM.render(
    <Trash />,
    document.getElementById('list')
);*/

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
