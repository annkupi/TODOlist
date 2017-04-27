//Начальная инициализация

var curKEY = 0;

function createTask (text){
    var newTask = {tasktext: text, key: curKEY};
    curKEY++;
    return newTask;
}

var dataTasks = [];

dataTasks[dataTasks.length] = createTask('0 дело');
dataTasks[dataTasks.length] = createTask('1 дело');
dataTasks[dataTasks.length] = createTask('2 дело');
dataTasks[dataTasks.length] = createTask('3 дело');
dataTasks[dataTasks.length] = createTask('4 дело');
dataTasks[dataTasks.length] = createTask('5 дело');

var checkedItems = [];

class Task extends React.Component {

    ChangeCheckBoxHandle(event) {
        var thisData = this.props.data;
        var thisIndex = thisData.itemIndex;
        var thisChangeHandle = thisData.onChange;
        var isChecked = event.target.checked;

        thisChangeHandle(thisIndex, isChecked);
    }

    render() {
        var thisData = this.props.data;

        var thisDivID = thisData.divID;
        var thisCheckID = thisData.checkID;
        var thisText = thisData.taskText.tasktext;
        var thisKey = thisData.taskText.key;

        return (
            <div className="task" id={thisDivID}>
                <input key={thisKey} type="checkbox" id={thisCheckID} onChange={this.ChangeCheckBoxHandle.bind(this)}/>
                <label htmlFor={thisCheckID}> {thisText} </label>
            </div>
        );
    }
}

class TaskList extends React.Component {
    render() {

        var data = this.props.data;
        var changeHandle = this.props.onChange;

        var tasksTemplate = data.map(function(item, index) {
            var thisIndex = {index}.index;
            var thisCheckID = "check" + {index}.index;
            var thisDivID = "div" + {index}.index;
            var thisText = item;

            var thisData = {itemIndex: thisIndex, taskText: thisText, divID: thisDivID, checkID: thisCheckID, onChange: changeHandle };
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

class Header extends React.Component {

    DeleteClick(){
        var deleteHandle = this.props.onClick;

        deleteHandle();
    }

    render() {
        return (
            <div className="header modal-header small-padding bg-grey border-grey">
                <span className="h">
                    TODO list
                </span>
                <div className="Delete" onClick={() => this.DeleteClick() }>
                </div>
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

    NullState()
    {
        this.setState({newText: "  "})
    }

    PlusClick(valueTask) {
        var thisData = this.props.data;
        var thisOnClick = thisData.onClick;

		if (valueTask.replace(/\s/g, '').length < 3) alert("Слишком короткое задание!");
		else
		{
			thisOnClick(valueTask);
			this.NullState();
			document.getElementById("newtaskinput").value = "";
		}
    }

    OnChangeHandle(event) {
        this.setState({newText: event.target.value});
    }

    OnSubmitHandle(event) {
        event.preventDefault();
        this.PlusClick(this.state.newText);
        return false;
    }

    render() {
        return (
            <form className="New"  onSubmit={this.OnSubmitHandle.bind(this)} >
                <div className="Plus" onClick={() => this.PlusClick(this.state.newText) }></div>
                <input checked="false" className="form-control" type="text" id="newtaskinput" onChange={this.OnChangeHandle.bind(this)}/>
            </form>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: dataTasks,
            checkedItems: checkedItems,
        };
    }

    SetState(newText) {
        var dataTasks1 = this.state.tasks;
        var newTask = createTask(newText);
        dataTasks1[dataTasks1.length] = newTask;
        this.setState({
            tasks: dataTasks1
        });
    }

    DeleteState() {
        var arr = this.state.checkedItems;
        var dataTasks1 = [];

        for (var i = 0; i < this.state.tasks.length; i++) {
            var curIndex = this.state.tasks[i];
            if (arr.indexOf(i) == -1)
                dataTasks1[dataTasks1.length] = curIndex;
        }

        arr =[];

        this.setState({
            tasks: dataTasks1,
            checkedItems: arr,
        });
    }

    SuperChangeCheckboxHandle(i, toAdd) {
        var checkedItems1 = this.state.checkedItems;
        if (toAdd) {
            checkedItems1[checkedItems1.length] = i;
        }
        else {
            var j = checkedItems1.indexOf(i);
            checkedItems1.splice(j, 1);
        }

        this.setState({checkedItems: checkedItems1});
    }

    render() {
        var thisNewData = {onClick: this.SetState.bind(this)};
        return (
            <div className="App container main-container border-grey table-bordered img-rounded center-block">
                <div className="row maxheight row-centered ">
                    <Header onClick={this.DeleteState.bind(this)} />
                    <TaskList data={this.state.tasks} onChange={this.SuperChangeCheckboxHandle.bind(this)}/>
                    <New data={thisNewData} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
