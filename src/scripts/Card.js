import React from 'react';
import ReactDOM from 'react-dom';
import CheckList from './CheckList';
import marked from 'marked';

class Card extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            showDetails: false
        };
    };

    toggleDetails()
    {
        this.setState({showDetails: !this.state.showDetails});
    };

    render()
    {
        let cardDetails;
        if (this.state.showDetails)
        {
            cardDetails = (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
                </div>
            )
        }

        return (
            <div className="card">
                <div className={this.state.showDetails ? "card__title card__title--is-open" :  "card__title"}
                     onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        );
    };
}

export default Card;
