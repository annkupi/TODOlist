var CheckTasks = [
    {
        id: 'check1'
    },
    {
        id: 'check2'
    },
    {
        id: 'check3'
    },
    {
        id: 'check4'
    },
    {
        id: 'check5'
    }
];

var LabelTasks = [
    {
        htmlFor: 'CheckTask1',
        taskText: 'раз дело'
    },
    {
        htmlFor: 'CheckTask2',
        taskText: '2 дело'
    },
    {
        htmlFor: 'CheckTask3',
        taskText: '3 дело'
    },
    {
        htmlFor: 'CheckTask4',
        taskText: '4 дело'
    },
    {
        htmlFor: 'CheckTask5',
        taskText: '5 дело'
    }
]

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
            var thisID = "check" + {index}.index;
            return (
                <div key={index} className="display">
                    <input type="checkbox" name="todolist" id={thisID}/>
                    <label htmlFor={thisID}>{item.taskText}</label>
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
        var checked = document.getElementById("check1").checked;
        alert(checked);
        dataTasks
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