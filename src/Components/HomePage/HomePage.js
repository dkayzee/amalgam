import React, { Component } from 'react';
import './HomePage.css'

import TeamFolders from '../TeamFolders/TeamFolders.js'
import RecentFiles from '../RecentFiles/RecentFiles.js'

class HomePage extends Component{
    render(){
        return(
            <div className="HomePage_container">
                <TeamFolders />
                <RecentFiles />
            </div>
        )
    }
}

export default HomePage;