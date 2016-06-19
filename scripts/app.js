//import KanbanBoard from '/scripts/KanbanBoard';

let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the whole book",
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    }
];


var CheckList = React.createClass({
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
});

var Card = React.createClass({
    getInitialState: function(){
        return { showDetails: false }
    },
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    },
    render(){
        let cardDetails;
        if (this.state.showDetails){
            cardDetails =  (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            );
        };
        return (
            <div className="card">
                <div className={ this.state.showDetails? "card__title card__title--is-open" : "card__title"}
                     onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        );
    }
});

var List = React.createClass({
    render() {
        var cards = this.props.cards.map((card) => {
            return <Card key={card.id}
                         id={card.id}
                         title={card.title}
                         description={card.description}
                         tasks={card.tasks} />
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
});

var KanbanBoard = React.createClass({
    render(){
        return (
            <div className="app">
                <List id='todo' title="To Do" cards={this.props.cards.filter((card) => card.status === "todo")} />
                <List id='in-progress' title="In Progress" cards={this.props.cards.filter((card) => card.status === "in-progress")} />
                <List id='done' title='Done' cards={this.props.cards.filter((card) => card.status === "done")} />
            </div>
        );
    }
});

ReactDOM.render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));