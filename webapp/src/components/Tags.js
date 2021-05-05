import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactTags from 'react-tag-autocomplete'
import Form from './Form';


class Tags extends React.Component {
  constructor(props, handleChangedTags, handleDeleteTags) {
    console.log(props)
    super(props);

    this.state = {
      tags: [],
      suggestions: [
        { id: 1, name: "Banana" },
        { id: 2, name: "Lemon" },
        { id: 3, name: "Chocolate" },
        { id: 4, name: "Vodka" },
        { id: 5, name: "Tequila" },
        { id: 6, name: "Gin" },
        { id: 7, name: "Rum" },
        { id: 8, name: "Vodka" },
        { id: 9, name: "Whiskey" },
        { id: 10, name: "Brandy" },
        { id: 11, name: "Wine" },
        { id: 12, name: "Coconut" },
        { id: 13, name: "Mango" },
        { id: 14, name: "Apple" },
        { id: 15, name: "Lime" },
        { id: 16, name: "Ginger" },
        { id: 17, name: "Strawberry" },
        { id: 18, name: "Orange" },
        { id: 19, name: "Gelatin" },
        { id: 20, name: "Milk" },
        { id: 21, name: "Cream" },
        { id: 22, name: "Syrup" },
        { id: 23, name: "Juice" },
        { id: 24, name: "Peach" },
        { id: 25, name: "Vanilla" },
        { id: 26, name: "Egg" },
        { id: 27, name: "Coffee" },
        { id: 28, name: "Espresso" },
        { id: 29, name: "Peppermint" },
        { id: 30, name: "Mint" },
      ]
    }
    // this.reactTags = React.createRef()
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    this.props.handleDeleteTags(i)
    console.log("delete", tags)
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    this.props.handleChangedTags(tag)
  }


  render() {
    return (
      <ReactTags
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)}
        // handleInputChange={this.handleInputChange.bind(this)}
      />
    );
  }
}

export default Tags;