import React, { Component } from 'react';
import ToDoListItem from "./ToDoListItem.js"
import './App.css';

class App extends Component {
    
  constructor() {
    super();
    this.state = {
      toDoList: [
        {
          title: "to do 1",
          description: "description 1"
        },
      ],
      item: {
          title: '',
          description: '',
      },
    }
  }    
  
  handleTitleEdit(e) {
    this.state.item.title = e.target.value;
    this.setState({item: this.state.item});
  }
  
  handleDesEdit(e) {
    this.state.item.description = e.target.value;
    this.setState({item: this.state.item});
  }
  
  handleAddItem() {
    this.setState({toDoList: [...this.state.toDoList, this.state.item]}, () => {
      localStorage.setItem("toDoList", JSON.stringify(this.state.toDoList))
    });
  }
  
  handleDeleteItem(index) {
    this.state.toDoList.splice(index, 1);
    this.setState({toDoList: this.state.toDoList});
  }
  
  handleSubmit(e) {
    this.handleAddItem();
    e.preventDefault();
    this.setState({
        item: {
            title: '',
            description: ''
        }
    })
  }
    
  render() {
      
    let items = this.state.toDoList.map((item,index) => {
        return (
            <ToDoListItem
                key = {index}
                title = {item.title}
                description = {item.description}
                handleDelete = {()=>this.handleDeleteItem(index)}
            />
        )
    });
        
      
    return (
      <div className="App">
        
        <div>
          <form className="App-form" onSubmit={(e)=>this.handleSubmit(e)}>
            <input 
              id="title"    
              type="text"
              value={this.state.item.title}
              onChange={(e)=>this.handleTitleEdit(e)}
              placeholder="タイトル"
              required
            />
            <textarea
              id="des"
              value={this.state.item.description}
              onChange={(e)=>this.handleDesEdit(e)}
              placeholder="デスクリプション"
            />
            <button type="submit"
              //onClick={(e)=>this.handleSubmit(e)}
            >
                登録
            </button>
          </form>
        </div>
        
        <div>
          {items}
        </div>
        
      </div>
    );
  }
}

export default App;