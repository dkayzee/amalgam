import React from 'react'
import axios from 'axios'
import './TaskView.css'

const baseURL = 'https://yuuvis.io/api'

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comment:"Hey Dan, can you finish this by Monday?", assignee:"", dueBy:"", action:"", teamId:"1", teamName:"amalgam"}
    this.handleChange = this.handleChange.bind(this);
    this.parseRequest = this.parseRequest.bind(this);
    this.buildRequest = this.buildRequest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  parseRequest(e) {
    e.preventDefault();
    axios({method: 'post',
           url: 'http://127.0.0.1:5000/parser',
           data: {'string': this.state.comment}
         })
    .then((response) => {
      this.setState({assignee: response.data.name, dueBy: response.data.date, action: response.data.action});
    })
  }

  buildRequest() {
    var output = {};
    Object.keys(this.state).forEach((key) => {
      output["tenNyc058:"+key] = {"value": this.state[key]};
    })

    output = {
      "objects": [
        {
          "properties": output
        }
      ]
    }

    return output;
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({method: 'post',
           url: baseURL + '/dms/objects/' + this.props.objectID,
           headers: {'X-ID-TENANT-NAME': "nyc058"},
           auth: {
             username: 'admin',
             password: 'yWnWtJJYJGII'
           },
           data: this.buildRequest()
         });
  }

  render() {
    return (
      <div className="taskEdit">
        <form className="comment">
          <label for="comment">
            Details:
          </label>
          <input type="textarea" name="comment" id="comment" value={this.state.comment} onChange={this.handleChange} />
          <br />
          <button onClick={this.parseRequest}>Parse</button>
        </form>
        <form className="properties" onSubmit={this.handleSubmit}>
          <label for="assignee">
            Assignee:
          </label>
          <input type="text" name="assignee" id="assignee" value={this.state.assignee} onChange={this.handleChange} />
          <label for="action">
            Action:
          </label>
          <input type="text" name="action" id="action" value={this.state.action} onChange={this.handleChange} />
          <label>
            Due Date:
          </label>
          <input type="text" name="dueBy" id="action" value={this.state.dueBy} onChange={this.handleChange} />
          <input type="submit" value="submit" onSubmit={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}
export default TaskEdit;
