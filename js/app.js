var dataTasks = [
	'ноль дело'
	,'раз дело'
	,'2 дело'
	,'3 дело'
	,'4 дело'
	,'5 дело'
];

var dataTasks1 = [
    'ноль дело измененное'
    ,'раз дело измененное'
    ,'2 дело измененное'
    ,'3 дело измененное'
    ,'4 дело измененное'
    ,'5 дело измененное'
];


class Task extends React.Component {
    render() {
        var thisData = this.props.data;
        var thisDivID = thisData.divID;
        var thisCheckID = thisData.checkID;
        var thisText = thisData.taskText;
        return (
            <div className="task" id={thisDivID}>
                <input type="checkbox" id={thisCheckID} />
                <label> {thisText} </label>
            </div>
        );
    }
}

class TaskList extends React.Component {
/*    renderTask() {
        //var thisData = this.props.data;
        return <Task /> //<Task data={thisData} />
    }*/

    render() {

        var data = this.props.data;
        var tasksTemplate = data.map(function(item, index) {
            var thisCheckID = "check" + {index}.index;
            var thisDivID = "div" + {index}.index;
            var thisText = item;
            var thisData = {taskText: thisText, divID: thisDivID, checkID: thisCheckID };
            return (
                <Task data={thisData} />
            )
        })

        return (
            <div className="TaskList">
                {tasksTemplate}
            </div>
        );
    }
}

class Delete extends React.Component {
    render() {
        return (
            <div className="Delete">
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <span class="h">
                    TODO list
                </span>
                <Delete />
            </div>
        );
    }
}

class New extends React.Component {

    constructor() {
        super();
        this.state = {
            newText: "  "
        };
    }

    PlusClick(valueTask) {
		//var valueTask = document.getElementById("newtaskinput").value;
		alert(valueTask); /*TODO: delete this line*/
        var thisData = this.props.data;
        var thisOnClick = thisData.onClick;

		if (valueTask.replace(/\s/g, '').length < 3) alert("Слишком короткое задание!");
		else
		{
			thisOnClick(valueTask);
			document.getElementById("newtaskinput").value = "";
		}
    }

    OnChangeHandle(event) {
        console.log('handleEmailChange', this); /*TODO delete this line*/
        this.setState({newText: event.target.value});
    }

    OnSubmitHandle(event) {
        event.preventDefault();
        console.log('form submitted and email value is', this.state.newText);
        alert('2form submitted and email value is' + this.state.newText);
        this.PlusClick(this.state.newText);
        return false;
    }

    render() {
        return (
            <form className="New"  onSubmit={this.OnSubmitHandle.bind(this)} >
                <div className="Plus" onClick={() => this.PlusClick(this.state.newText) }></div>
                <input className="form-control" type="text" id="newtaskinput" onChange={this.OnChangeHandle.bind(this)}/>
            </form>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: dataTasks,
        };
    }

    SetState(newText) {
        var dataTasks1 = this.state.tasks;
        dataTasks1[dataTasks1.length] = newText;
        this.setState({
            tasks: dataTasks1
        });

    }

    render() {
        var thisData = {onClick: this.SetState.bind(this)}
        return (
            <div class="App">
                <Header/>
                <TaskList data={this.state.tasks}/>
                <New data={thisData} />
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
