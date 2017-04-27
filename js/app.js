/*var dataTasks = [
    {task: 'ноль дело', key: 1},
	,'раз дело'
	,'2 дело'
	,'3 дело'
	,'4 дело'
	,'5 дело'
];*/

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

var dataTasks1 = [
    'ноль дело измененное'
    ,'раз дело измененное'
    ,'2 дело измененное'
    ,'3 дело измененное'
    ,'4 дело измененное'
    ,'5 дело измененное'
];


class Task extends React.Component {

    ChangeCheckBoxHandle(event) {
        var thisData = this.props.data;
        var thisIndex = thisData.itemIndex;
        var thisChangeHandle = thisData.onChange;
        var isChecked = event.target.checked;

        //alert("mini checkbox" + thisIndex + "----" + isChecked);

        thisChangeHandle(thisIndex, isChecked);
    }

    render() {
        var thisData = this.props.data;
        var thisDivID = thisData.divID;
        var thisCheckID = thisData.checkID;
        var thisText = thisData.taskText.tasktext; /*TODO look here for changes*/
        var thisKey = thisData.taskText.key;
        //var thisIndex = thisData.itemIndex;
        //var thisChangeHandle = thisData.onChange;
        return (
            <div className="task" id={thisDivID}>
                <input key={thisKey} type="checkbox" id={thisCheckID} onChange={this.ChangeCheckBoxHandle.bind(this)}/>
                <label htmlFor={thisCheckID}> {thisText} </label>
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

/*
class Delete extends React.Component {
    render() {
        return (
            <div className="Delete">
            </div>
        );
    }
}
*/

class Header extends React.Component {

    DeleteClick(){
        //alert("delete!");
        var deleteHandle = this.props.onClick;

        deleteHandle();
    }

    render() {
        return (
            <div className="header">
                <span class="h">
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
		//var valueTask = document.getElementById("newtaskinput").value;
		//alert(valueTask); /*TODO: delete this line*/
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
        console.log('handleEmailChange', this); /*TODO delete this line*/
        this.setState({newText: event.target.value});
    }

    OnSubmitHandle(event) {
        event.preventDefault();
        console.log('form submitted and email value is', this.state.newText);
        //alert('2form submitted and email value is' + this.state.newText);
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
        //alert("And delete now:" + " " + arr);
        var dataTasks1 = [];

        for (var i = 0; i < this.state.tasks.length; i++) {
            var curIndex = this.state.tasks[i];
            //alert(i + "===> " + arr.indexOf(curIndex));
            if (arr.indexOf(i) == -1)
                dataTasks1[dataTasks1.length] = curIndex;
        }

        //alert("after delete datatasks1:" + " " + dataTasks1);
        arr =[];

        this.setState({
            tasks: dataTasks1,
            checkedItems: arr,
        });
        //alert("after " + this.state.tasks);
    }

    SuperChangeCheckboxHandle(i, toAdd) {
        var checkedItems1 = this.state.checkedItems;
        if (toAdd) {
            checkedItems1[checkedItems1.length] = i;
            //alert("Wow! super + change!" + i + toAdd + " " + checkedItems1);
        }
        else {
            //alert("Wow! super - change!" + i + toAdd);
            var j = checkedItems1.indexOf(i);
            //alert("indexof" + j);
            checkedItems1.splice(j, 1);
            //alert("And now:" + " " + checkedItems1);
        }

        this.setState({checkedItems: checkedItems1});
        //alert("And now:" + " " + this.state.checkedItems);
    }

    render() {
        var thisNewData = {onClick: this.SetState.bind(this)};
        var thisDeleteData = this.DeleteState.bind(this);
        return (
            <div class="App">
                <Header onClick={this.DeleteState.bind(this)} />
                <TaskList data={this.state.tasks} onChange={this.SuperChangeCheckboxHandle.bind(this)}/>
                <New data={thisNewData} />
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
