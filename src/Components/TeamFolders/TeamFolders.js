import React, { Component } from 'react';
import './TeamFolders.css'

import axios from 'axios'

class TeamFolders extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div className="TeamFolders_container">
                Team Folders
            </div>
        )
    }
}

export default TeamFolders;