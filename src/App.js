import './App.css';
import React from 'react'

// To do list
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name:"",
        city:"",
        age:null
      }, 
      users : [],
      pos:-1
    };
    
  }
  
  handleChange =(e)=>{
    const {name, value} = e.target;
    let user = {...this.state.user};
    user[name] = value;

    this.setState({
      user
    });

    //OR

    // this.setState({
    //   ...this.state, 
    //   user : {
    //     ...this.state.user,
    //     [e.target.name]:e.target.value
    //   }
    // });
  }

  clearForm = () => {
    this.setState({
      user: {
        name:"",
        city:"",
        age:null
      }
    });
  }

  handleSave = (index, remove) =>{
    let users = [...this.state.users];
    this.clearForm();

    if(remove)
      users.splice(index, 1);
    else if(index==-1)
      users.push(this.state.user);
    else if(index>-1)
      users[index] = this.state.user;

    console.log("users", users);
    this.setState({
      users,
      pos : -1,
    });
  }

  handleQuickEdit = (index) => {
    let users = [...this.state.users];
    this.setState({
      user : users[index],
      pos : index
    });
  }


  render(){
    return(
      <div className='App'>
          <form>
            <h1>FORM SUBMIT</h1>
            <label htmlFor="name"> Name : </label>
            <input type="text" name="name" value={this.state.user.name} onChange={(e)=>{this.handleChange(e)}} required/><br/><br/>
            <label htmlFor="city"> City : </label>
            <input type="text" name="city" value={this.state.user.city} onChange={(e)=>{this.handleChange(e)}} required /><br/><br/>
            <label htmlFor="age"> Age : </label>
            <input type="text" name="age" value={this.state.user.age?this.state.user.age:''} onChange={(e)=>this.handleChange(e)} required/><br/><br/>
            <input type="button" value="Submit" onClick={()=>{this.handleSave(this.state.pos)}}/>   <br/><br/> 
          </form>

          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>City</td>
                <td>Age</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
            {this.state.users.length 
              ?
                this.state.users.map((ele, index)=>{
                  return (
                      <tr key={index}>
                        <td>{ele.name}</td>
                        <td>{ele.city}</td>
                        <td>{ele.age}</td>
                        <td>
                          <div>
                              <button onClick={()=>{this.handleQuickEdit(index)}}>Edit</button>
                              <button onClick={()=>{this.handleSave(index, true);}}>Delete</button>
                          </div>
                        </td>
                      </tr>
                  )
                })
              :
                <tr>No data exists</tr>
            }
            </tbody>
          </table>
      </div>
    )
  }
}

export default App
